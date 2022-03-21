<template>
  <div @click="goMv" class="mv-card">
    <div class="img-wrap">
      <img v-lazy="$utils.genImgUrl(img, 500, 260)" />
      <div class="play-count-wrap" v-if="playCount">
        <span class="count"><Icon type="play" /> {{ $utils.formatNumber(playCount) }}</span>
      </div>
      <div class="play-icon-wrap">
        <PlayIcon :size="iconSize" class="play-icon" />
      </div>
      <div class="duration-wrap" v-if="duration">
        {{ $utils.formatTime(duration / 1000) }}
      </div>
    </div>
    <p class="name" v-if="name">{{ name }}</p>
    <p class="author" v-if="author">{{ author }}</p>
  </div>
</template>

<script>
  import { isDef } from '@/utils'

  export default {
    name: 'MvCard',
    props: ['id', 'img', 'duration', 'playCount', 'name', 'author', 'iconSize'],
    methods: {
      goMv() {
        // 如果传入id 则点击直接跳转mv页面
        if (isDef(this.id)) {
          this.$router.push(`/mv/${this.id}`)
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .mv-card {
    min-width: 140px;
    cursor: pointer;

    .img-wrap {
      position: relative;
      padding-top: 56%;

      img {
        @include abs-stretch();
        width: 100%;
        height: 100%;
        border-radius: 4px;
      }

      .play-icon-wrap {
        @include abs-stretch;

        &:hover {
          .play-icon {
            opacity: 1;
          }
        }

        .play-icon {
          @include abs-center;
          opacity: 0;
          transition: opacity 0.7s;
        }
      }

      .play-count-wrap {
        position: absolute;
        padding: 1px 6px;
        left: 0;
        right: 0;
        top: 0;
        background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.01));

        .count {
          display: flex;
          align-items: center;
          font-size: $font-size-sm;
          color: $white;
          float: right;
        }
      }

      .duration-wrap {
        position: absolute;
        right: 5px;
        bottom: 2px;
        font-size: $font-size-sm;
        color: $white;
      }
    }

    .name {
      margin-top: 8px;
      @include text-ellipsis;
      font-size: $font-size-medium;
      color: $font-color;

      &:hover {
        color: #000000;
      }
    }

    .author {
      margin-top: 4px;
      @include text-ellipsis;
      font-size: $font-size-sm;
      color: $font-color-gray-shallow;
    }
  }
</style>
