import { isDef } from '@/utils'

export const isLogin = (state) => isDef(state.user.userId)

export const isVip = (state) => {
  return isDef(state.user.userId) && state.user.vipType !== 0
}

export const likePlaylistId = (state) => {
  if (state.userPlaylist.length !== 0) {
    return state.userPlaylist[0].id
  } else {
    return null
  }
}

// 根据用户请求的数据整合出菜单
export const userMenus = (state) => {
  const { user, userPlaylist } = state
  const retMenus = []
  const userCreateList = []
  const userCollectList = []

  userPlaylist.forEach((playlist) => {
    const { userId } = playlist
    if (user.userId === userId) {
      userCreateList.push(playlist)
    } else {
      userCollectList.push(playlist)
    }
  })

  const genPlaylistChildren = (playlist) => {
    const myPlaylist = playlist.map(({ id, name }) => ({
      path: `/mymusic/playlist/${id}`,
      meta: {
        title: name,
        icon: 'playlist-menu',
      },
    }))
    if (myPlaylist[0].meta.title.indexOf('喜欢的音乐') !== -1) {
      myPlaylist[0].meta.icon = 'heart'
    }
    return myPlaylist
  }

  if (userCreateList.length) {
    retMenus.push({
      type: 'playlist',
      title: '创建的歌单',
      children: genPlaylistChildren(userCreateList),
    })
  }

  if (userCollectList.length) {
    retMenus.push({
      type: 'playlist',
      title: '收藏的歌单',
      children: genPlaylistChildren(userCollectList),
    })
  }

  return retMenus
}
