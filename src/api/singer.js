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
