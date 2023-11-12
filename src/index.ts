import axios from 'axios'
import * as cheerio from 'cheerio'
import { getCherrioAPI } from './utils/functions'
import { GetBookInfo } from './utils/types'
import * as fs from 'fs'

export const getHtml = async (url: string) => {
  try {
    return await axios.get(url, { responseType: 'arraybuffer', responseEncoding: 'binary' })
  } catch (e) {
    console.log(e)
  }
}

const aladin = async () => {
  const url = 'https://www.aladin.co.kr/shop/common/wnew.aspx?NewType=SpecialNew&BranchType=1&CID=351'
  const html = await getHtml(url)

  const $ = getCherrioAPI(html?.data)

  const $booklist = $('form#Myform').children('div.ss_book_box')

  const list = new Array<GetBookInfo>()
  $booklist.each((i, elem) => {
    const subjects = $(elem).find('.ss_book_list').first().find('ul>li>a.bo3').text()
    const image = $(elem).find('.flipcover_in>img').attr('src')
    list.push({
      name: subjects,
      imageUrl: image,
    })
  })

  const jsonString = JSON.stringify(list)
  fs.writeFile('src/data/aladin.json', jsonString, (err) => {
    console.log(err)
    console.log('아라?')
  })
}

const yes24 = async () => {
  const url = 'https://www.yes24.com/24/Category/NewProductList/001001003020?sumGb=04'
  const html = await getHtml(url)

  const decoder = new TextDecoder('euc-kr')

  const $ = cheerio.load(decoder.decode(html?.data))
  const $booklist = $('table#category_layout>tbody').children('tr')

  $booklist.each((i, elem) => {
    const subjects = $(elem).find('.goodsTxtInfo>p').text()
    const image = $(elem).find('.goodsImgW>a').first().find('img').attr('src')
    console.log(subjects, image)
  })
}

aladin()
