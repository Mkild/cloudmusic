import Vue from 'vue'
import VueRouter from 'vue-router'

const Discovery = () => import('@/pages/discovery') // 首页-发现音乐
const Homelist = () => import('@/pages/discovery/homelist') //  首页-发现音乐-个性推荐
const Playlists = () => import('@/pages/discovery/playlists') //  首页-发现音乐-歌单
const Toplists = () => import('@/pages/discovery/toplists') //  首页-发现音乐-排行榜
const Songs = () => import('@/pages/discovery/songs') //  首页-发现音乐-最新音乐
const Albums = () => import('@/pages/discovery/albums') //  首页-发现音乐-新碟上架
const Mvs = () => import('@/pages/discovery/mvs') // 首页-发现音乐-MV
const Mymusic = () => import('@/pages/mymusic') // 我的音乐
const MenuPlaylistDetail = () => import('@/pages/menu-playlist-detail') // 我的音乐-歌单详情
const Download = () => import('@/pages/download') // 下载客户端
const Aside = () => import('@/layout/Aside') // 侧边栏
const DailyPlaylistDetail = () => import('@/pages/daily-playlist-detail') // 日推歌单详情
const PlaylistDetail = () => import('@/pages/playlist-detail') // 歌单详情
const Mv = () => import('@/pages/mv') // MV详情
const Notfound = () => import('@/pages/notfound') // 404NotFound

Vue.use(VueRouter)

// 侧边栏
export const menuRoutes = [
  {
    path: '/discovery',
    name: 'menuDiscovery',
    meta: {
      title: '发现音乐',
      icon: 'music',
    },
  },
  {
    path: '/discovery/playlists',
    name: 'menuPlaylists',
    meta: {
      title: '推荐歌单',
      icon: 'playlist-menu',
    },
  },
  {
    path: '/discovery/songs',
    name: 'menuSongs',
    meta: {
      title: '最新音乐',
      icon: 'yinyue',
    },
  },
  {
    path: '/discovery/mvs',
    name: 'menuMvs',
    meta: {
      title: '推荐MV',
      icon: 'mv',
    },
  },
]

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/discovery',
  },
  {
    path: '/discovery',
    components: {
      main: Discovery,
    },
    meta: { index: '/discovery' },
    children: [
      {
        path: '',
        name: 'homelist',
        component: Homelist,
        meta: { index: '/discovery' },
      },
      {
        path: 'homelist',
        redirect: '/discovery',
      },
      {
        path: 'playlists',
        name: 'playlists',
        component: Playlists,
        meta: { index: '/discovery' },
      },
      {
        path: 'toplists',
        name: 'toplists',
        component: Toplists,
        meta: { index: '/discovery' },
      },
      {
        path: 'songs',
        name: 'songs',
        component: Songs,
        meta: { index: '/discovery' },
      },
      {
        path: 'albums',
        name: 'albums',
        component: Albums,
        meta: { index: '/discovery' },
      },
      {
        path: 'mvs',
        name: 'mvs',
        component: Mvs,
        meta: { index: '/discovery' },
      },
    ],
  },
  {
    path: '/dailyplaylist',
    name: 'dailyplaylistdetail',
    components: {
      main: DailyPlaylistDetail,
    },
    meta: { index: '/discovery' },
  },
  {
    path: '/playlist/:id',
    name: 'playlistdetail',
    components: {
      main: PlaylistDetail,
    },
    meta: { index: '/discovery' },
  },
  {
    path: '/mv/:id',
    name: 'mv',
    components: {
      main: Mv,
    },
    props: { main: (route) => ({ id: +route.params.id }) },
    meta: { index: '/discovery' },
  },
  {
    path: '/mymusic',
    name: 'mymusic',
    components: {
      main: Mymusic,
      aside: Aside,
    },
    meta: { index: '/mymusic' },
    children: [
      {
        path: 'playlist/:id',
        name: 'menuplaylistdetail',
        component: MenuPlaylistDetail,
        meta: { index: '/mymusic' },
      },
    ],
  },
  {
    path: '/download',
    name: 'download',
    components: {
      main: Download,
    },
    meta: { index: '/download' },
  },
  {
    path: '*',
    name: 'notfound',
    components: {
      main: Notfound,
    },
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
})

// 捕获路由错误
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch((err) => err)
}

export default router
