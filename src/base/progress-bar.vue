<template>
  <div @mousedown="progressDown" class="progress-bar" ref="progressBar">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper" ref="progressBtn">
        <div :class="{ show: alwaysShowBtn }" :style="{ display: ShowBtn }" class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import { prefixStyle, toCurrentRem } from '@/utils'
  import { mapMutations } from '@/store/helper/music'

  const transform = prefixStyle('transform')

  export default {
    name: 'ProgressBar',
    props: {
      percent: {
        type: Number,
        default: 0,
      },
      alwaysShowBtn: {
        type: Boolean,
        default: false,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
    },
    created() {
      this.touch = {}
    },
    mounted() {
      if (this.percent > 0) {
        this.setProgressOffset(this.percent)
      }
    },
    data() {
      return {
        isprogressDown: false,
        ShowBtn: this.alwaysShowBtn,
      }
    },
    methods: {
      progressClick(e) {
        if (!this.disabled) {
          const rect = this.$refs.progressBar.getBoundingClientRect()
          const offsetWidth = Math.max(0, Math.min(e.pageX - rect.left, this.$refs.progressBar.clientWidth))
          this._offset(offsetWidth)
          // 这里当我们点击 progressBtn 的时候，e.offsetX 获取不对
          // this._offset(e.offsetX)
          this._triggerPercent()
        }
      },
      progressDown(e) {
        if (!this.disabled) {
          this.ShowBtn = 'block'
          this.isprogressDown = true
          this.setProgressDown(true)
          const rect = this.$refs.progressBar.getBoundingClientRect()
          const offsetWidth = Math.max(0, Math.min(e.pageX - rect.left, this.$refs.progressBar.clientWidth))
          this._offset(offsetWidth)
          const that = this

          // 鼠标移动时
          document.onmousemove = function (e) {
            const rect = that.$refs.progressBar.getBoundingClientRect()
            const offsetWidth = Math.max(0, Math.min(e.pageX - rect.left, that.$refs.progressBar.clientWidth))
            that._offset(offsetWidth)
            that._triggerPercent()
          }

          //鼠标抬起时
          document.onmouseup = function () {
            that.ShowBtn = 'none'
            that.isprogressDown = false
            that.setProgressDown(false)
            that._triggerPercent()
            document.onmousemove = null
            document.onmouseup = null
          }
        }
      },
      setProgressOffset(percent) {
        if (percent >= 0 && !this.touch.initiated) {
          const barWidth = this.$refs.progressBar.clientWidth
          const offsetWidth = percent * barWidth
          this._offset(offsetWidth)
        }
      },
      _triggerPercent() {
        this.$emit('percentChange', this._getPercent())
      },
      _offset(offsetWidth) {
        const offsetRem = toCurrentRem(offsetWidth)
        this.$refs.progress.style.width = `${offsetRem}`
        this.$refs.progressBtn.style[transform] = `translate3d(${offsetRem},0,0)`
      },
      _getPercent() {
        const barWidth = this.$refs.progressBar.clientWidth
        return this.$refs.progress.clientWidth / barWidth
      },

      ...mapMutations(['setProgressDown']),
    },
    watch: {
      percent(newPercent) {
        if (!this.isprogressDown) this.setProgressOffset(newPercent)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .progress-bar {
    height: 10px;
    cursor: pointer;
    width: 70%;
    margin-bottom: 20px;

    .bar-inner {
      position: relative;
      top: 14px;
      height: 3px;
      background: $progress-bgcolor;

      .progress {
        position: absolute;
        height: 100%;
        background: $theme-color;
      }

      .progress-btn-wrapper {
        position: absolute;
        left: -15px;
        top: -13px;
        width: 30px;
        height: 30px;

        .progress-btn {
          display: none;
          position: relative;
          top: 8px;
          left: 9px;
          box-sizing: border-box;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: $theme-color;

          &.show {
            display: block !important;
          }
        }
      }
    }

    &:hover {
      .progress-btn {
        display: block !important;
      }
    }
  }
</style>
