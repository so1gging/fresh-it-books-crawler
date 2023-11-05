import axios from 'axios'
import * as cheerio from 'cheerio'
import { getCherrioAPI } from './utils/functions'

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

  $booklist.each((i, elem) => {
    const subjects = $(elem).find('.ss_book_list').first().find('ul>li').text()
    const image = $(elem).find('.flipcover_in>img').attr('src')
    console.log(subjects, image)
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
