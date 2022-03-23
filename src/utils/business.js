/**
 * 业务工具方法
 */
import { getAlbum, getMvDetail, getSongDetail, getSongUrl } from '@/api'
import router from '@/router'
import { isDef, notify } from './common'
import store from '@/store'

export function createSong(song, privilege = []) {
  const { id, name, img, alia, artists, duration, albumId, albumName, mvId, vip, ...rest } = song
  const { playMaxbr, fl } = privilege.find(({ id: songId }) => songId === id) || []

  return {
    id,
    name,
    img,
    alia,
    artists,
    duration,
    albumName,
    url: genSongPlayUrl(id),
    artistsText: genArtistisText(artists),
    durationSecond: duration / 1000,
    // 专辑 如果需要额外请求封面的话必须加上
    albumId,
    // mv的id 如果有的话 会在songTable组件中加上mv链接。
    mvId,
    // 会员 为1时表示是会员专享歌曲
    vip,
    // 最大码率 为0时表示无音源
    // 等于320000时表示是HQ歌曲
    // 等于999000时表示是SQ歌曲
    playMaxbr,
    // 码率 为0时表示无音源
    // 等于320000时表示是HQ歌曲
    fl,
    ...rest,
  }
}

export async function getSongImg(id, albumId) {
  if (!isDef(albumId)) {
    throw new Error('need albumId')
  }
  const { songs } = await getAlbum(albumId)
  const {
    al: { picUrl },
  } = songs.find(({ id: songId }) => songId === id) || {}
  return picUrl
}

export async function genSongDetail(id) {
  if (!isDef(id)) {
    throw new Error('need songId')
  }
  const { songs, privileges } = await getSongDetail(id)
  let {
    alia,
    al: { name },
    fee,
  } = songs.find(({ id: songId }) => songId === id) || {}
  const privilege = privileges.find(({ id: songId }) => songId === id) || []
  if (alia.length == 0) {
    alia = ''
  } else {
    alia = alia[0]
  }
  return {
    alia,
    name,
    fee,
    playMaxbr: privilege.playMaxbr,
    fl: privilege.fl,
  }
}

export function filterPlaylist(playlist) {
  if (!store.getters['user/isVip']) {
    return playlist.filter(({ fl }) => fl !== 0)
  } else {
    return playlist.filter(({ vip, fl }) => {
      if (vip !== 1) {
        return fl !== 0
      } else {
        return playlist
      }
    })
  }
}

export function genArtistisText(artists) {
  return (artists || []).map(({ name }) => name).join('/')
}

// 有时候虽然有mvId 但是请求却404 所以跳转前先请求一把
export async function goMvWithCheck(id) {
  try {
    await getMvDetail(id)
    goMv(id)
  } catch (error) {
    notify('mv获取失败', 'error')
  }
}

export function goMv(id) {
  router.push(`/mv/${id}`)
}

export async function getSongPlayUrl(id) {
  const { data } = await getSongUrl(id)
  return data[0].url
}

function genSongPlayUrl(id) {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`
}
