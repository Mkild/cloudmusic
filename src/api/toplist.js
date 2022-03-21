import { request } from '@/utils'

// 获取所有榜单
export const getToplists = (params) => request.get('/toplist', { params })
