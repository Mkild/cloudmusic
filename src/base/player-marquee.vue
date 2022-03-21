<template>
  <div class="player-marquee" @mouseenter="marquee">
    <div class="player-marquee-wrapper" ref="wrapper">
      <div class="player-marquee-text" ref="text" :style="{ left: textLeft, transition: textTransition }">
        {{ text }}
        <span v-if="showText2" class="norem-player-text2" ref="text2">
          {{ text }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapMutations } from '@/store/helper/music'

  export default {
    name: 'PlayerMarquee',
    data() {
      return {
        textLeft: '',
        textTransition: '',
        isMarqueeOn: false, // Marquee是否处于滚动状态
        showText2: false, // 是否显示第二文本，滚动的条件
      }
    },
    props: {
      text: {
        type: String,
        default: '',
      },
    },
    mounted() {
      this.controlText2()
    },
    methods: {
      // 判断文本长度绝对是否显示第二文本
      controlText2() {
        this.showText2 = false
        this.$nextTick(() => {
          const wrapperWidth = this.$refs.wrapper.clientWidth // 容器的总宽度
          const textWidth = this.$refs.text.clientWidth // 文本的总宽度
          if (textWidth <= wrapperWidth) {
            this.showText2 = false
            this.setMarqueeOpen(false)
          } else {
            this.showText2 = true
            this.setMarqueeOpen(true)
          }
        })
      },
      marquee() {
        if (this.isMarqueeOn === true) return // 避免重复触发滚动
        const _this = this
        const textWidth = this.$refs.text.clientWidth + 10 // 文本的总宽度 + 两段文本的间距10
        if (this.showText2 === false) return
        const transTime = textWidth / 50 // 根据文本宽度设置过渡时间
        const againTime = transTime * 1000 // 重新开始滚动时间计算(动态)
        this.textLeft = 0 + 'px' // 开始滚动前设定文本在容器最右侧以外

        if (this.isMarqueeOn === false) {
          setTimeout(() => {
            _this.isMarqueeOn = true
            textRoll()
          }, 0)
        }

        function textRoll() {
          _this.textTransition = 'left ' + transTime + 's linear' // 滚动前绑定过渡属性
          _this.textLeft = -textWidth + 'px' // 向容器最左移动
          _this.timer = setTimeout(() => {
            // 还原文本位置
            _this.textTransition = 'none' // 还原前需清除过渡
            _this.textLeft = 0 + 'px'
            _this.isMarqueeOn = false
            clearTimeout(_this.timer)
          }, againTime / 2)
        }
      },

      ...mapMutations(['setMarqueeOpen']),
    },
    computed: {
      ...mapState(['currentSong']),
    },
    watch: {
      currentSong() {
        // 切换歌曲时清除定时器
        if (this.timer) {
          clearTimeout(this.timer)
          // 还原文本位置
          this.textTransition = 'none' // 还原前需清除过渡
          this.textLeft = 0 + 'px'
          this.isMarqueeOn = false
        }
        this.setMarqueeOpen(true)
        this.controlText2()
      },
    },
  }
</script>

<style lang="scss" scoped>
  .player-marquee {
    display: flex;
    align-items: center;
    font-size: 14px;
  }

  .player-marquee-wrapper {
    flex: 1;
    height: 26px;
    overflow: hidden;
    position: relative;
  }

  .player-marquee-text {
    color: $font-color-gray;
    white-space: nowrap;
    line-height: 26px;
    position: absolute;
  }

  .norem-player-text2 {
    margin-left: 10px;
  }
</style>
