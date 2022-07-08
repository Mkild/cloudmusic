import { requestWithoutLoading } from '@/utils'

// 获取用户信息
export const getUserDetail = (uid) => requestWithoutLoading.get('/user/detail', { params: { uid } })

// 获取用户收藏歌单
const PLAYLIST_LIMIT = 1000
export const getUserPlaylist = (uid) => {
  return requestWithoutLoading.get('/user/playlist', { params: { uid, limit: PLAYLIST_LIMIT } })
}
