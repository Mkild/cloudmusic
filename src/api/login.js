import { requestWithoutLoading } from '@/utils'
import { requestWithoutLoadingVercel } from '@/utils/vercelaxios'
import qs from 'qs'

// 访客登录(获取访客cookie避免报错)
export const visitorLogin = () => {
  return requestWithoutLoadingVercel.get('/register/anonimous')
}

// 手机登录
export const loginByPhone = (phone, md5_password) => {
  return requestWithoutLoadingVercel.post(
    `/login/cellphone?timestamp=${Date.now()}`,
    qs.stringify({ phone, md5_password })
  )
}

// 校验手机号是否注册
export const verifyPhone = (phone) => {
  return requestWithoutLoading.get(`/cellphone/existence/check?phone=${phone}`)
}

// 发送登录验证码
export const sentLoginCaptcha = (phone) => {
  return requestWithoutLoading.get(`/captcha/sent?phone=${phone}`)
}

// 手机登录(验证码)
export const loginByCaptcha = (phone, captcha) => {
  return requestWithoutLoadingVercel.post(`/login/cellphone?timestamp=${Date.now()}`, qs.stringify({ phone, captcha }))
}

// 邮箱登录
export const loginByEmail = (email, md5_password) => {
  return requestWithoutLoadingVercel.post(`/login?timestamp=${Date.now()}`, qs.stringify({ email, md5_password }))
}

// 生成二维码key
export const getQrKey = () => {
  return requestWithoutLoading.get(`/login/qr/key?timestamp=${Date.now()}`)
}

// 生成二维码
export const getQr = (key) => {
  return requestWithoutLoading.get(`/login/qr/create?key=${key}&timestamp=${Date.now()}`)
}

/* 检测二维码扫码状态
轮询此接口可获取二维码扫码状态
800 为二维码过期,801 为等待扫码,802 为待确认,803 为授权登录成功(803 状态码下会返回 cookies) */
export const checkQrStatus = (key) => {
  return requestWithoutLoadingVercel.get(`/login/qr/check?key=${key}&timerstamp=${Date.now()}`)
}

// 获取登录状态
export const getLoginStatus = (cookie) => requestWithoutLoadingVercel.get(`/login/status?cookie=${cookie}`)

// 刷新登录状态
export const refreshLogin = () => requestWithoutLoading.get('/login/refresh')

// 退出登录
export const logout = () => requestWithoutLoading.get('/logout')
