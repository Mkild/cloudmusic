import { request } from '@/utils'

// 获取MV详情
export const getMvDetail = (id) => request.get(`/mv/detail?mvid=${id}`)

// 获取MVurl
export const getMvUrl = (id) => request.get(`/mv/url?id=${id}`)

// 获取相似MV
export const getSimiMv = (id) => request.get(`/simi/mv?mvid=${id}`)

// 获取所有MV
export const getAllMvs = (params) => request.get('/mv/all', { params })
