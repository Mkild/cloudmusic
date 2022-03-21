import { shallowEqual, PLAY_MODE_KEY, PLAY_LIST_KEY, filterPlaylist } from '@/utils'
import storage from 'good-storage'

export default {
  setCurrentSong(state, song) {
    state.currentSong = song
  },
  setCurrentTime(state, time) {
    state.currentTime = time
  },
  setPlayingState(state, playing) {
    state.playing = playing
  },
  setPlayMode(state, mode) {
    state.playMode = mode
    storage.set(PLAY_MODE_KEY, mode)
  },
  setPlaylistShow(state, show) {
    state.isPlaylistShow = show
  },
  setPlayerShow(state, show) {
    state.isPlayerShow = show
  },
  setPlaylistPromptShow(state, show) {
    state.isPlaylistPromptShow = show
  },
  setPlaylist(state, playlist) {
    const { isPlaylistShow, playlist: oldPlaylist } = state
    // 过滤没有音源的歌曲
    const newPlaylist = filterPlaylist(playlist)
    state.playlist = newPlaylist
    // 播放列表未显示 并且两次播放列表的不一样 则弹出提示
    if (!isPlaylistShow && !shallowEqual(oldPlaylist, newPlaylist, 'id')) {
      state.isPlaylistPromptShow = true
      storage.set(PLAY_LIST_KEY, newPlaylist)
      setTimeout(() => {
        state.isPlaylistPromptShow = false
      }, 2000)
    }
  },
  setPlayHistory(state, history) {
    state.playHistory = history
  },
  setMenuShow(state, show) {
    state.isMenuShow = show
  },
  setMarqueeOpen(state, open) {
    state.isMarqueeOpen = open
  },
  setInputFocus(state, focus) {
    state.isInputFocus = focus
  },
  setProgressDown(state, down) {
    state.isProgressDown = down
  },
}
