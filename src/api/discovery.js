import { request } from '@/utils'

// 获取轮播图
export const getBanner = () => request.get('/banner?type=0')

// 获取最新音乐
export const getNewSongs = (params) => request.get('/personalized/newsong', { params })

// 获取推荐歌单
export const getPersonalized = (params) => request.get('/personalized', { params })

// 获取推荐MV
export const getPersonalizedMv = () => request.get('/personalized/mv')
