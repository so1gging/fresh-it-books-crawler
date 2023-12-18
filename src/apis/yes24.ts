import { getCherrioAPI, getHtml } from '../utils/functions'
import { GetBookInfo } from '../utils/types'
import fs from 'fs'
const URL = 'https://www.yes24.com/24/Category/NewProductList/001001003020?sumGb=04'

export default async function getYes24() {
  let page = 1
  const list = new Array<GetBookInfo>()

  while (true) {
    const html = await getHtml(URL + `&PageNumber=${page}`)
    const $ = getCherrioAPI(html?.data, 'euc-kr')
    const $booklist = $('table#category_layout>tbody').children('tr')

    if ($booklist.length === 0) {
      break
    }

    $booklist.each((i, elem) => {
      const subjects = $(elem).find('.goodsTxtInfo').first().find('a').first().text()
      const image = $(elem).find('.goodsImgW>a').first().find('img').attr('src')
      list.push({
        name: subjects,
        imageUrl: image,
      })
    })

    page += 1
  }

  const jsonString = JSON.stringify(list)
  fs.writeFile('src/data/yes24.json', jsonString, (err) => {
    if (err) return console.log('❌ ERROR :', err)
    console.log(`📌 총 ${list.length}건의 yes24 신간 정보를 저장했어요 !`)
  })
}
