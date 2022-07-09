export default {
  setUser(state, user) {
    state.user = user
  },
  setUid(state, uid) {
    state.uid = uid
  },
  setUserPlaylist(state, playlist) {
    state.userPlaylist = playlist
  },
  setVisitorCookie(state, visitorCookie) {
    state.visitorCookie = visitorCookie
  },
  setCookie(state, cookie) {
    state.cookie = cookie
  },
  setNowPlaylistId(state, id) {
    state.nowPlaylistId = id
  },
  clearUserState(state) {
    state.user = {}
    state.uid = null
    state.userPlaylist = []
    state.cookie = null
    state.nowPlaylistId = null
  },
}
