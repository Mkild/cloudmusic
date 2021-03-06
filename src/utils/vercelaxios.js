import axios from 'axios'
import { Loading } from 'element-ui'
import { confirm } from '@/base/confirm'
import store from '@/store'

const BASE_URL = 'https://netease-cloud-music-api-mkild.vercel.app/'

// 不带全局loading的请求实例
export const requestWithoutLoadingVercel = createBaseInstance()

// 带全局loading的请求实例
// 传入函数是因为需要在处理请求结果handleResponse之前处理loading
// 所以要在内部插入loading拦截器的处理逻辑
export const requestVercel = createBaseInstance()
mixinLoading(requestVercel.interceptors)

// 通用的axios实例
function createBaseInstance() {
  const instance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
  })

  instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
  // 拦截请求
  instance.interceptors.request.use(handleRequest, throwError)
  // 拦截响应
  instance.interceptors.response.use(handleResponse, handleError)
  return instance
}

function throwError(e) {
  throw e
}

function handleError(e) {
  confirm(e.message, '出错了')
  throw e
}

function handleRequest(request) {
  const cookie = store.state.user.cookie
  if (cookie) {
    // 设置cookie
    request.params = {
      cookie,
      ...request.params,
    }
  }
  return request
}

function handleResponse(response) {
  return response.data
}

let loading
let loadingCount = 0
const SET_AXIOS_LOADING = 'global/setAxiosLoading'
function mixinLoading(interceptors) {
  interceptors.request.use(loadingRequestInterceptor)
  interceptors.response.use(loadingResponseInterceptor, loadingResponseErrorInterceptor)

  function loadingRequestInterceptor(config) {
    if (!loading) {
      loading = Loading.service({
        target: 'body',
        background: 'transparent',
        text: '载入中',
      })
      store.commit(SET_AXIOS_LOADING, true)
    }
    loadingCount++

    return config
  }

  function handleResponseLoading() {
    loadingCount--
    if (loadingCount === 0) {
      loading.close()
      loading = null
      store.commit(SET_AXIOS_LOADING, false)
    }
  }

  function loadingResponseInterceptor(response) {
    handleResponseLoading()
    return response
  }

  function loadingResponseErrorInterceptor(e) {
    handleResponseLoading()
    throw e
  }
}
