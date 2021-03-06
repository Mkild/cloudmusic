import { UID_KEY, VISITOR_COOKIE_KEY, COOKIE_KEY } from '@/utils'
import storage from 'good-storage'

export default {
  // 登录用户
  user: {},
  // 登录用户uid
  uid: storage.get(UID_KEY, null),
  // 登录用户歌单
  userPlaylist: [],
  // 登录后返回的cookie
  cookie: storage.get(COOKIE_KEY, null),
  visitorCookie: storage.get(VISITOR_COOKIE_KEY, null),
  // 用户正在浏览的歌单id
  nowPlaylistId: null,
}
