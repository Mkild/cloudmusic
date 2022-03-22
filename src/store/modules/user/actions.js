import storage from 'good-storage'
import md5 from 'js-md5'
import { UID_KEY, COOKIE_KEY } from '@/utils'
import { notify, isUndef, sleep } from '@/utils'
import { loginByPhone, getUserDetail, getUserPlaylist } from '@/api'

export default {
  // 使用手机号登录
  async login({ commit }, formData) {
    const error = () => {
      notify.error('登录失败，手机号或密码有误。')
      return false
    }

    if (isUndef(formData.phone) || isUndef(formData.password)) {
      return error('登录失败，参数错误')
    }

    let uid
    try {
      const md5_password = md5(formData.password)
      const timestamp = new Date().getTime()
      const user = await loginByPhone(formData.phone, md5_password, timestamp)
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
    } catch (e) {
      return error()
    }

    const { playlist } = await getUserPlaylist(uid)
    commit('setUserPlaylist', playlist)
    return true
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
    commit('setUser', {})
    commit('setUserPlaylist', [])
    commit('setCookie', null)
    storage.remove(UID_KEY)
    storage.remove(COOKIE_KEY)
    window.location.replace('/')
  },
}
