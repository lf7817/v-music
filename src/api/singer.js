import Jsonp from '../common/jsonp'
import { commonParams, options } from './config'
import { API_SINGER_ADDRESS, API_SINGER_DETAIL_ADDRESS } from '../constant'

export const getSingerList = () => {
  const data = {
    ...commonParams,
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq'
  }

  return Jsonp(API_SINGER_ADDRESS, data, options)
}

export const getSingerDetail = singerId => {
  const data = {
    ...commonParams,
    needNewCode: 0,
    platform: 'yqq',
    order: 'listen',
    begin: 0,
    num: 80,
    songstatus: 1,
    singermid: singerId
  }
  return Jsonp(API_SINGER_DETAIL_ADDRESS, data, options)
}