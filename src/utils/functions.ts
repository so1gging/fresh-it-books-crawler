import axios from 'axios'
import * as cheerio from 'cheerio'

export const getHtml = async (url: string) => {
  try {
    return await axios.get(url, { responseType: 'arraybuffer', responseEncoding: 'binary' })
  } catch (e) {
    console.log(e)
  }
}

export const getCherrioAPI = (data?: AllowSharedBufferSource) => {
  const decoder = new TextDecoder('utf-8')
  const decodeHtmlDoc = decoder.decode(data)
  return cheerio.load(decodeHtmlDoc)
}
