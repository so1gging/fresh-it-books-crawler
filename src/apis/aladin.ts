import { getCherrioAPI, getHtml } from '../utils/functions'
import { GetBookInfo } from '../utils/types'
import fs from 'fs'

const URL = 'https://www.aladin.co.kr/shop/common/wnew.aspx?NewType=SpecialNew&BranchType=1&CID=351'

export default async function getAladinList() {
  let page = 1
  const list = new Array<GetBookInfo>()

  while (true) {
    const html = await getHtml(URL + `&page=${page}`)
    const $ = getCherrioAPI(html?.data)

    const $booklist = $('form#Myform').children('div.ss_book_box')

    if ($booklist.length === 0) {
      break
    }

    $booklist.each((i, elem) => {
      const subjects = $(elem).find('.ss_book_list').first().find('ul>li>a.bo3').text()
      const image = $(elem).find('.flipcover_in>img').attr('src')
      list.push({
        name: subjects,
        imageUrl: image,
      })
    })

    page += 1
  }

  const jsonString = JSON.stringify(list)
  fs.writeFile('src/data/aladin.json', jsonString, (err) => {
    if (err) return console.log('❌ ERROR :', err)
    console.log(`📌 총 ${list.length}건의 알라딘 신간 정보를 저장했어요 !`)
  })
}
