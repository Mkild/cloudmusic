<template>
  <div class="song-card">
    <div class="order-wrap">
      <span class="order">{{ $utils.pad(order) }}</span>
    </div>
    <div class="img-wrap">
      <img v-lazy="$utils.genImgUrl(img, 120)" />
      <PlayIcon class="play-icon" />
    </div>
    <div class="song-content">
      <p class="song-name">
        {{ name }}<span class="alia" v-if="alia">({{ alia }})</span>
      </p>
      <p class="singer-content">
        <Icon v-if="vip === 1" class="vip-icon" type="vip" color="red" :size="20" />
        <Icon v-if="playMaxbr === 320000 && fl" class="hq-icon" type="hq" color="theme" :size="20" />
        <Icon v-if="playMaxbr === 999000 && fl" class="sq-icon" type="sq" color="theme" :size="22" />
        <Icon v-if="mvId" class="mv-icon" @click.stop="onGoMv" type="mv01" color="theme" :size="18" />
        <span class="singer">{{ artistsText }}</span>
      </p>
    </div>
  </div>
</template>

<script>
  import { goMvWithCheck } from '@/utils'

  export default {
    name: 'SongCard',
    props: ['order', 'name', 'alia', 'img', 'artistsText', 'mvId', 'vip', 'playMaxbr', 'fl'],
    methods: {
      onGoMv() {
        goMvWithCheck(this.mvId)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .song-card {
    display: flex;
    padding: 8px;
    font-size: $font-size-medium-sm;
    cursor: pointer;

    div {
      flex-shrink: 0;
    }

    &:hover {
      background: $grey;
      border-radius: 6px;
    }
    .order-wrap {
      @include flex-center();
      width: 30px;
      margin-right: 8px;
    }

    .img-wrap {
      position: relative;
      width: 60px;
      height: 60px;
      margin-right: 8px;
      img {
        width: 100%;
        height: 100%;
      }

      .play-icon {
        @include abs-center;
      }
    }

    .song-content {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      flex: 1;
      overflow: hidden;

      .song-name {
        flex-shrink: 1;
        @include text-ellipsis;
        color: $font-color;

        &:hover {
          color: #000000;
        }
      }

      .alia {
        margin-left: 4px;
        color: $font-color-gray-shallow;
        flex-shrink: 10000;
        @include text-ellipsis;
      }

      .singer-content {
        display: flex;
        align-content: center;
        @include text-ellipsis;
        color: $font-color-gray-shallow;
        font-size: $font-size-sm;

        .vip-icon {
          margin-right: 2px;
          cursor: default;
        }

        .hq-icon {
          margin-right: 2px;
          cursor: default;
        }

        .sq-icon {
          margin-right: 2px;
          cursor: default;
        }

        .mv-icon {
          margin-top: 3px;
          margin-right: 2px;

          &:hover {
            text-shadow: 0 0 0.6px #c875ff;
          }
        }

        .singer {
          @include text-ellipsis;
          display: inline-block;
          margin: auto 0;
        }
      }
    }
  }
</style>
