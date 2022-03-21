import { request } from '@/utils'

// 获取歌单详情
export const getListDetail = (params) => request.get('/playlist/detail', { params })

// 获取歌单收藏者
export const getListSubscribers = (params) => request.get('/playlist/subscribers', { params })
