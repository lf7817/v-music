/* eslint-disable no-undef */
let host = ''
if (process.env.NODE_ENV === 'development') {
  host = '/api'
} else {
  host = 'http://47.98.156.114:4000/api'
}

export const HOST = 'http://47.98.156.114:4000/api'
// 错误码
export const ERR_OK = 0
// 推荐歌单地址
export const API_RECOMMEND_ADDRESS = 'http://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
// 歌手地址
export const API_SINGER_ADDRESS = 'http://c.y.qq.com/v8/fcg-bin/v8.fcg'
// 歌手详情地址
export const API_SINGER_DETAIL_ADDRESS = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
