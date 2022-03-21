import { request } from '@/utils'

// 获取热搜列表（简略）
export const getSearchHot = () => request.get('/search/hot')

// 获取搜索建议
export const getSearchSuggest = (keywords) => request.get('/search/suggest', { params: { keywords } })

// 获取搜索内容
export const getSearch = (params) => request.get('/search', { params })
