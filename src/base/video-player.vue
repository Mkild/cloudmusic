<template>
  <div class="video-player" ref="player"></div>
</template>

<script>
  import Player from 'xgplayer/dist/simple_player'
  import volume from 'xgplayer/dist/controls/volume'
  import download from 'xgplayer/dist/controls/download'
  import cssFullscreen from 'xgplayer/dist/controls/cssFullscreen'
  import pip from 'xgplayer/dist/controls/pip'
  import keyboard from 'xgplayer/dist/controls/keyboard'
  import { toRem } from '@/utils'

  export default {
    name: 'VideoPlayer',
    props: ['url', 'poster'],
    mounted() {
      this.initPlayer()
      this.transferRem()
    },
    methods: {
      initPlayer() {
        if (!this.url) return
        this.player = new Player({
          el: this.$refs.player,
          url: this.url,
          poster: this.poster,
          videoInit: true,
          lang: 'zh-cn',
          width: '100%',
          cssFullscreen: true,
          pip: true,
          download: true,
          keyShortcut: 'on',
          keyShortcutStep: {
            //设置调整步长
            currentTime: 10, //播放进度调整步长，默认10秒
            volume: 0.2, //音量调整步长，默认0.1
          },
          controlPlugins: [volume, download, pip, keyboard, cssFullscreen],
        })
      },
      transferRem() {
        this.player.on('ready', () => {
          const videoWrapper = this.$refs.player
          const height = videoWrapper.style.height
          const remHeight = toRem(Number(height.replace('px', '')))
          videoWrapper.style.height = remHeight
        })
      },
    },
    watch: {
      url(url, oldUrl) {
        if (url && url !== oldUrl) {
          if (!this.player) {
            this.initPlayer()
          } else {
            this.player.src = url
            this.player.reload()
          }
        }
      },
    },
  }
</script>

<style>
  .xgplayer-error {
    display: none;
  }
</style>
