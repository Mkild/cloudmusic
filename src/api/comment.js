import { requestWithoutLoading } from '@/utils'

// 获取歌曲评论
export const getSongComment = (params) => requestWithoutLoading.get('/comment/music', { params })

// 获取歌单评论
export const getPlaylistComment = (params) => requestWithoutLoading.get('/comment/playlist', { params })

// 获取热门评论
export const getHotComment = (params) => requestWithoutLoading.get('/comment/hot', { params })

// 获取MV评论
export const getMvComment = (params) => requestWithoutLoading.get('/comment/mv', { params })
