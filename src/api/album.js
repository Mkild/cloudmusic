import { request } from '@/utils'

// 获取专辑内容
export const getAlbum = (id) => request.get(`/album?id=${id}`)

// 获取新碟上架
export const getNewAlbums = (params) => request.get('/top/album', { params })

// 获取全部新碟
export const getAllAlbums = (params) => request.get('/album/new', { params })
