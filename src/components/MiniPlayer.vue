// 底部播放栏组件
<template>
  <div class="mini-player" id="mini-player">
    <!-- 歌曲内容 -->
    <div class="song">
      <template v-if="hasCurrentSong">
        <div
          @click="togglePlayerShow"
          @mouseenter="showControlIcon"
          @mouseleave="hiddenControlIcon"
          class="img-wrap"
          :title="playControlIconTitle"
        >
          <div class="mask">
            <div v-show="isShowControlIcon" class="player-control">
              <Icon :size="24" :type="playControlIcon" color="white" />
            </div>
          </div>
          <img v-lazy="$utils.genImgUrl(currentSong.img, 80)" />
        </div>
        <div class="content">
          <div class="top">
            <Marquee class="norem-name" :text="currentSong.name" :alia="currentSong.alia"></Marquee>
          </div>
          <div class="bottom">
            <Marquee class="norem-artists" :text="currentSong.artistsText"></Marquee>
          </div>
        </div>
      </template>
    </div>
    <!-- 控制台 -->
    <div class="control">
      <div class="control-icon" @keyup.ctrl.left="prev" @keyup.ctrl.right="next">
        <Icon :size="20" @click="prev" class="icon" title="上一首 (Ctrl + Left)" type="prev" />
        <el-popover :value="isPlayErrorPromptShow" placement="top" trigger="manual">
          <p>播放失败</p>
          <div
            @click="togglePlaying"
            @keyup.p="togglePlaying"
            class="play-icon"
            :title="playIconTitle"
            slot="reference"
            ref="playEl"
          >
            <Icon :size="24" :type="playIcon" />
          </div>
        </el-popover>
        <Icon :size="20" @click="next" class="icon" title="下一首 (Ctrl + Right)" type="next" />
      </div>
      <div class="progress-bar-wrap">
        <span class="played-time">{{ $utils.formatTime(currentTime) }}</span>
        <ProgressBar :disabled="!hasCurrentSong" :percent="playedPercent" @percentChange="onProgressChange" />
        <span class="total-time">{{ $utils.formatTime(currentSong.duration / 1000) }}</span>
      </div>
    </div>
    <div class="mode">
      <Share :shareUrl="shareUrl" class="mode-item" title="分享" v-show="hasCurrentSong" />
      <!-- 模式 -->
      <el-popover placement="top" trigger="hover">
        <p>{{ playModeText }}</p>
        <Icon :size="20" :type="modeIcon" @click="onChangePlayMode" class="mode-item" slot="reference" />
      </el-popover>
      <!-- 播放列表 -->
      <el-popover :value="isPlaylistPromptShow" placement="top" trigger="manual" width="160">
        <p>已更新歌单</p>
        <Icon
          :size="20"
          @click="togglePlaylistShow"
          class="mode-item"
          :title="playListTitle"
          slot="reference"
          type="playlist"
        />
      </el-popover>
      <!-- 音量 -->
      <div class="volume-item">
        <Volume :volume="volume" @volumeChange="onVolumeChange" />
      </div>
      <!-- eva图标 -->
      <img class="eva" src="@/assets/image/rei.png" />
    </div>
    <audio :src="currentSong.url" @canplay="ready" @ended="end" @timeupdate="updateTime" ref="audio"></audio>
  </div>
</template>

<script>
  import { mapState, mapMutations, mapGetters, mapActions } from '@/store/helper/music'
  import Storage from 'good-storage'
  import Share from '@/components/Share'
  import { VOLUME_KEY, playModeMap, isDef } from '@/utils'

  const DEFAULT_VOLUME = 0.75

  export default {
    name: 'MiniPlayer',
    components: { Share },
    metaInfo() {
      return {
        title: this.title,
      }
    },
    data() {
      return {
        title: this.$route.meta.title,
        isShowControlIcon: false,
        isPlayErrorPromptShow: false,
        songReady: false,
        volume: Storage.get(VOLUME_KEY, DEFAULT_VOLUME),
      }
    },
    mounted() {
      this.audio.volume = this.volume
      this.addKeydownEvent()
    },
    beforeDestroy() {
      this.removeKeydownEvent()
    },
    methods: {
      addKeydownEvent() {
        document.addEventListener('keydown', this.focusPlayIcon)
      },
      removeKeydownEvent() {
        document.removeEventListener('keydown', this.focusPlayIcon)
      },
      focusPlayIcon() {
        this.$refs.playEl.focus()
      },
      showControlIcon() {
        this.isShowControlIcon = true
      },
      hiddenControlIcon() {
        this.isShowControlIcon = false
      },
      togglePlaying() {
        if (!this.currentSong.id) {
          return
        }
        this.setPlayingState(!this.playing)
      },
      ready() {
        this.songReady = true
      },
      async play() {
        if (this.songReady) {
          try {
            await this.audio.play()
            this.title = this.currentSong.name
            if (this.isPlayErrorPromptShow) {
              this.isPlayErrorPromptShow = false
            }
          } catch (error) {
            // 提示用户手动播放
            this.isPlayErrorPromptShow = true
            this.setPlayingState(false)
          }
        }
      },
      pause() {
        this.audio.pause()
        this.title = this.$route.meta.title
      },
      updateTime(e) {
        if (!this.isProgressDown) {
          const time = e.target.currentTime
          this.setCurrentTime(time)
        }
      },
      prev() {
        if (this.songReady) {
          this.startSong(this.prevSong)
        }
      },
      next() {
        if (this.songReady) {
          this.startSong(this.nextSong)
        }
      },
      end() {
        this.next()
      },
      onProgressChange(percent) {
        if (this.isProgressDown) {
          this.setCurrentTime(this.currentSong.durationSecond * percent)
        } else {
          this.audio.currentTime = this.currentSong.durationSecond * percent
        }
      },
      onVolumeChange(percent) {
        this.audio.volume = percent
        Storage.set(VOLUME_KEY, percent)
      },
      onChangePlayMode() {
        const modeKeys = Object.keys(playModeMap)
        const currentModeIndex = modeKeys.findIndex((key) => playModeMap[key].code === this.playMode)
        const nextIndex = (currentModeIndex + 1) % modeKeys.length
        const nextModeKey = modeKeys[nextIndex]
        const nextMode = playModeMap[nextModeKey]
        this.setPlayMode(nextMode.code)
      },
      togglePlaylistShow() {
        this.setPlaylistShow(!this.isPlaylistShow)
      },
      togglePlayerShow() {
        this.setPlayerShow(!this.isPlayerShow)
      },

      ...mapMutations(['setCurrentTime', 'setPlayingState', 'setPlayMode', 'setPlaylistShow', 'setPlayerShow']),
      ...mapActions(['startSong']),
    },
    watch: {
      currentSong(newSong, oldSong) {
        // 清空了歌曲
        if (!newSong.id) {
          this.audio.pause()
          this.audio.currentTime = 0
          return
        }
        // 跳过无音源歌曲
        if (this.Timer) {
          clearTimeout(this.Timer)
        }
        if (!newSong.url) {
          this.setPlayingState(false)
          this.$notify({
            title: '找不到音源',
            message: '将自动播放下一首歌曲',
            type: 'warning',
            offset: 100,
          })
          this.Timer = setTimeout(() => {
            this.next()
            clearTimeout(this.Timer)
          }, 4000)
          return
        }
        // 单曲循环
        if (oldSong && newSong.id === oldSong.id) {
          this.setCurrentTime(0)
          this.audio.currentTime = 0
          this.play()
          return
        }
        this.songReady = false
        if (this.timer) {
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
          this.play()
          clearTimeout(this.timer)
        }, 1000)
      },
      playing(newPlaying) {
        this.$nextTick(() => {
          newPlaying ? this.play() : this.pause()
        })
      },
      isInputFocus(focus) {
        focus ? this.removeKeydownEvent() : this.addKeydownEvent()
      },
    },
    computed: {
      hasCurrentSong() {
        return isDef(this.currentSong.id)
      },
      playIconTitle() {
        return this.playing ? '暂停 (P)' : '播放 (P)'
      },
      playIcon() {
        return this.playing ? 'pause' : 'play'
      },
      currentMode() {
        return playModeMap[this.playMode]
      },
      modeIcon() {
        return this.currentMode.icon
      },
      playModeText() {
        return this.currentMode.name
      },
      playListTitle() {
        return this.isPlaylistShow ? '关闭播放列表' : '打开播放列表'
      },
      audio() {
        return this.$refs.audio
      },
      // 播放的进度百分比
      playedPercent() {
        const { durationSecond } = this.currentSong
        return Math.min(this.currentTime / durationSecond, 1) || 0
      },
      playControlIcon() {
        return this.isPlayerShow ? 'shrink' : 'open'
      },
      playControlIconTitle() {
        return this.isPlayerShow ? '收起播放器' : '展开播放器'
      },
      shareUrl() {
        return `${window.location.origin}/#/discovery?shareMusicId=${this.currentSong.id}`
      },

      ...mapState([
        'currentSong',
        'currentTime',
        'playing',
        'playMode',
        'isPlaylistShow',
        'isPlaylistPromptShow',
        'isPlayerShow',
        'isInputFocus',
        'isProgressDown',
      ]),
      ...mapGetters(['prevSong', 'nextSong']),
    },
  }
</script>

<style lang="scss" scoped>
  .mini-player {
    position: relative;
    position: fixed;
    z-index: $mini-player-z-index;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    height: $mini-player-height;
    padding: 8px 16px;
    padding-right: 24px;
    background: $bg-color;
    border-top: 1px solid #d3d3d3;
    min-width: $mini-player-min-width;

    .song {
      display: flex;
      flex: 4;
      overflow: hidden;
      align-items: center;

      .img-wrap {
        position: relative;
        margin-right: 8px;
        border-radius: 6px;
        overflow: hidden;
        cursor: pointer;
        @include img-wrap(50px);

        .player-control {
          @include abs-center;
        }

        .mask {
          @include abs-stretch;
          &:hover {
            background: rgba(0, 0, 0, 0.4);
            backdrop-filter: blur(2px);
          }
        }
      }

      .content {
        flex: 1;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        .top {
          display: flex;
          align-items: flex-end;
          white-space: nowrap;

          .norem-name {
            width: 150px;
            color: $font-color-gray;
            @include text-ellipsis;
            cursor: default;
          }

          .split {
            font-size: $font-size-xs;
            margin: 0 4px;
          }
        }

        .bottom {
          display: flex;
          align-items: flex-end;
          white-space: nowrap;

          .norem-artists {
            width: 160px;
            color: $font-color-gray;
            font-size: $font-size-sm;
            @include text-ellipsis;
            margin-top: 8px;
            cursor: default;
          }
        }
      }
    }

    .control {
      position: absolute;
      height: 80%;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 480px;
      @include flex-center(column);

      .control-icon {
        @include flex-center();
      }

      .play-icon {
        @include flex-center();
        position: relative;
        width: 35px;
        height: 35px;
        margin: 0 25px;
        border-radius: 50%;
        background: #eeeeee;
        cursor: pointer;
        &:hover {
          background: #dfdfdf;
        }

        i {
          color: $font-color;
        }
        .icon-play {
          transform: translateX(1px);
        }
      }

      .icon {
        color: #515151;

        &:hover {
          color: $theme-color;
        }
      }

      .progress-bar-wrap {
        position: absolute;
        left: 0;
        right: 0;
        bottom: -14px;
        @include flex-center();
        font-size: $font-size-sm;
        color: $font-color-gray-shallow;

        .played-time {
          user-select: none;
          margin-right: 5px;
        }

        .total-time {
          user-select: none;
          margin-left: 5px;
        }
      }
    }

    .mode {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      flex: 6;

      .mode-item {
        display: block;
        margin-right: 16px;
        width: 22px;
        color: $font-color;

        &:hover {
          color: $theme-color;
        }
      }

      .volume-item {
        margin-right: 22px;
      }
    }

    .eva {
      width: 83px;
      height: 65px;
      object-fit: contain;
    }
  }

  .icon {
    color: $font-color;
    cursor: pointer;
  }
</style>
