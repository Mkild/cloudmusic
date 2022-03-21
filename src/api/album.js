import { request } from '@/utils'

// 获取专辑内容
export const getAlbum = (id) => request.get(`/album?id=${id}`)
