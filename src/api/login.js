import { requestWithoutLoading } from '@/utils'
import qs from 'qs'

// 手机登录
export const loginByPhone = (phone, md5_password, timestamp) => {
  return requestWithoutLoading.post(`/login/cellphone?timestamp=${timestamp}`, qs.stringify({ phone, md5_password }))
}

// 邮箱登录
export const loginByEmail = (email, md5_password, timestamp) => {
  return requestWithoutLoading.post(`/login?timestamp=${timestamp}`, qs.stringify({ email, md5_password }))
}

// 刷新登录状态
export const refreshLogin = () => requestWithoutLoading.get('/login/refresh')

// 退出登录
export const logout = () => requestWithoutLoading.get('/logout')
