import storage from 'good-storage'
import { confirm } from '@/base/confirm'
import { PLAY_SONG_KEY, PLAY_LIST_KEY, PLAY_HISTORY_KEY, getSongImg, getSongPlayUrl } from '@/utils'

export default {
  // 整合歌曲信息 并且开始播放
  async startSong({ commit, state }, rawSong) {
    // 浅拷贝一份 改变引用
    // 1.不污染元数据
    // 2.单曲循环为了触发watch
    const song = Object.assign({}, rawSong)
    if (!song.img) {
      if (song.albumId) {
        song.img = await getSongImg(song.id, song.albumId)
      }
    }
    const url = await getSongPlayUrl(song.id)
    if (url) {
      song.url = url
      song.fl = 1
    } else {
      confirm('因版权方要求，该资源暂时无法播放', '当前歌曲暂无音源')
      return
    }
    commit('setCurrentSong', song)
    commit('setPlayingState', true)
    storage.set(PLAY_SONG_KEY, song)
    // 历史记录
    const { playHistory } = state
    const playHistoryCopy = playHistory.slice()
    const findedIndex = playHistoryCopy.findIndex(({ id }) => song.id === id)
    if (findedIndex !== -1) {
      // 删除旧那一项, 插入到最前面
      playHistoryCopy.splice(findedIndex, 1)
    }
    playHistoryCopy.unshift(song)
    commit('setPlayHistory', playHistoryCopy)
    storage.set(PLAY_HISTORY_KEY, playHistoryCopy)
  },
  clearCurrentSong({ commit }) {
    commit('setCurrentSong', {})
    commit('setPlayingState', false)
    commit('setCurrentTime', 0)
  },
  clearPlaylist({ commit, dispatch }) {
    commit('setPlaylist', [])
    dispatch('clearCurrentSong')
    storage.set(PLAY_LIST_KEY, [])
    storage.set(PLAY_SONG_KEY, [])
  },
  clearHistory({ commit }) {
    commit('setPlayHistory', [])
    storage.set(PLAY_HISTORY_KEY, [])
  },
  addToPlaylist({ commit, state }, song) {
    const { playlist } = state
    const copy = playlist.slice()
    if (!copy.find(({ id }) => id === song.id)) {
      copy.unshift(song)
      commit('setPlaylist', copy)
    }
  },
}
