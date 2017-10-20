import jsonp from '@/common/jsonp'
import { options, commonParams } from './config'

export const getSingerList = () => {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
  const data = {
    ...commonParams,
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    g_tk: 1664029744
  }

  return jsonp(url, data, options)
}

export const getSingerDetail = singerId => {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

  const data = {
    ...commonParams,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    order: 'listen',
    begin: 0,
    num: 80,
    songstatus: 1,
    singermid: singerId
  }

  return jsonp(url, data, options)
}

