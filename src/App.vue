<template>
  <div id="app">
    <Header />
    <el-container>
      <keep-alive include="Aside">
        <router-view name="aside"></router-view>
      </keep-alive>
      <router-view name="main"></router-view>
      <router-view name="detail"></router-view>
    </el-container>
    <Player />
    <MiniPlayer />
    <Playlist />
    <ShareReader />
  </div>
</template>

<script>
  import Header from '@/layout/Header'
  import Player from '@/components/Player'
  import MiniPlayer from '@/components/MiniPlayer'
  import Playlist from '@/components/Playlist'
  import ShareReader from '@/components/ShareReader'

  export default {
    name: 'App',
    components: { Header, MiniPlayer, Playlist, Player, ShareReader },
    metaInfo() {
      return {
        title: '网易云音乐',
      }
    },
  }
</script>

<style lang="scss">
  #app {
    font-size: $font-size;
    height: 100%;
  }

  .el-container {
    height: calc(100% - #{$header-height + $mini-player-height});
    overflow: auto;
    overflow-x: hidden;
  }
</style>
