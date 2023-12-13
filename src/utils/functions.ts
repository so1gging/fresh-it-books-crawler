import axios from 'axios'
import * as cheerio from 'cheerio'

export const getHtml = async (url: string) => {
  try {
    return await axios.get(url, { responseType: 'arraybuffer', responseEncoding: 'binary' })
  } catch (e) {
    console.log(e)
  }
}

export const getCherrioAPI = (data?: AllowSharedBufferSource, encoding = 'utf-8') => {
  const decoder = new TextDecoder(encoding)
  const decodeHtmlDoc = decoder.decode(data)
  return cheerio.load(decodeHtmlDoc)
}
