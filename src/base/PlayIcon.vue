<template>
  <div :style="wrapStyle" class="play-icon-wrap">
    <Icon :size="iconSize" class="play-icon" type="play" />
  </div>
</template>

<script>
  import { toRem } from '@/utils'

  export default {
    name: 'PlayIcon',
    props: {
      size: {
        type: Number,
        default: 24,
      },
    },
    computed: {
      wrapStyle() {
        return { width: `${toRem(this.size)}`, height: `${toRem(this.size)}` }
      },
      iconSize() {
        const iconSize = this.size * 0.6
        return iconSize
      },
    },
  }
</script>

<style lang="scss" scoped>
  .play-icon-wrap {
    @include flex-center();
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.8);

    .play-icon {
      color: $theme-color;
    }
  }
</style>
