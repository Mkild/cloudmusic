import storage from 'good-storage'
import md5 from 'js-md5'
import { UID_KEY, COOKIE_KEY } from '@/utils'
import { notify, isUndef, sleep } from '@/utils'
import { loginByPhone, loginByCaptcha, checkQrStatus, getLoginStatus, getUserDetail, getUserPlaylist } from '@/api'

export default {
  // 使用手机号登录 isCodeLogin: 是否使用验证码方式
  async login({ commit }, formData, isCodeLogin = true) {
    const error = () => {
      notify.error('登录失败，手机号或密码有误')
      return false
    }
    const { phone, code, password } = formData

    if (isCodeLogin) {
      if (isUndef(phone) || isUndef(code)) {
        return error()
      }
    } else {
      if (isUndef(phone) || isUndef(password)) {
        return error()
      }
    }

    let uid
    try {
      let user
      if (isCodeLogin) {
        user = await loginByCaptcha(phone, code)
      } else {
        const md5_password = md5(password)
        user = await loginByPhone(phone, md5_password)
      }
      if (!user) {
        return error()
      }
      const { profile, cookie } = user
      uid = profile.userId
      const encodeCookie = encodeURIComponent(cookie)
      commit('setUser', profile)
      commit('setCookie', encodeCookie)
      storage.set(UID_KEY, uid)
      storage.set(COOKIE_KEY, encodeCookie)

      const { playlist } = await getUserPlaylist(uid)
      commit('setUserPlaylist', playlist)
      return true
    } catch (e) {
      notify.error('网络请求失败')
      return false
    }
  },

  // 使用二维码登录
  async loginByQr({ commit }, key) {
    try {
      const res = await checkQrStatus(key)
      if (res.code === 800) {
        notify.error('二维码已过期,请重新获取')
        return false
      }
      if (res.code === 803) {
        const encodeCookie = encodeURIComponent(res.cookie)
        const statusRes = await getLoginStatus(encodeCookie)
        if (isUndef(statusRes)) {
          notify.error('登录失败')
          return false
        }
        const uid = statusRes.data.profile.userId
        commit('setUser', statusRes.data.profile)
        commit('setCookie', encodeCookie)
        storage.set(UID_KEY, uid)
        storage.set(COOKIE_KEY, encodeCookie)

        const { playlist } = await getUserPlaylist(uid)
        commit('setUserPlaylist', playlist)
        return true
      }
    } catch (error) {
      notify.error('网络请求失败')
      return false
    }
  },

  // 使用uid登录
  async loginByUid({ commit }, uid) {
    const error = () => {
      notify.error('自动登录失败')
      return false
    }

    if (isUndef(uid)) {
      return error()
    }

    try {
      const user = await getUserDetail(uid)
      const { profile } = user
      commit('setUser', profile)
      storage.set(UID_KEY, profile.userId)
    } catch (e) {
      return error()
    }

    const { playlist } = await getUserPlaylist(uid)
    commit('setUserPlaylist', playlist)
    /* 阻塞执行，防止太快return导致getters还未获取到store
    不阻塞可能会导致用户进入《我的音乐》拿不到用户喜欢的音乐歌单id实现跳转 */
    sleep(1000)
    return true
  },

  // 退出登录
  logout({ commit }) {
    // 清空state中关于登录的数据
    commit('clearUserState')
    storage.remove(UID_KEY)
    storage.remove(COOKIE_KEY)
    window.location.replace('/')
  },
}
