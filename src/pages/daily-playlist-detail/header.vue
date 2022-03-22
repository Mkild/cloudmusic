<template>
  <div class="header">
    <div class="img-wrap">
      <div class="mask">
        <img
          v-lazy="$utils.genImgUrl('https://p1.music.126.net/u-yLpj_PuG6lCQLNSpxyNA==/109951165018412936.jpg', 300)"
        />
      </div>
      <span class="today">{{ new Date().getDate() }}</span>
      <Icon class="icon" type="calendar" :size="140" />
    </div>
    <div class="content">
      <div class="title">
        <Title type="default">每日歌曲推荐</Title>
        <span class="text">根据你的音乐口味生成，每天6:00更新</span>
      </div>
      <div class="action-wrap">
        <NButton @click="playAll" class="button">
          <Icon class="icon middle" color="gray" type="play-round" />
          <span class="middle">播放全部</span>
        </NButton>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapMutations } from '@/store/helper/music'

  export default {
    name: 'DailySongHeader',
    props: {
      songs: {
        type: Array,
        default: () => [],
      },
    },
    methods: {
      playAll() {
        this.startSong(this.songs.find(({ vip, fl }) => vip !== 1 && fl !== 0))
        this.setPlaylist(this.songs)
      },
      ...mapMutations(['setPlaylist']),
      ...mapActions(['startSong']),
    },
  }
</script>

<style lang="scss" scoped>
  .header {
    display: flex;
    padding: 36px;

    .img-wrap {
      position: relative;
      width: 200px;
      height: 200px;
      margin-right: 24px;
      overflow: hidden;

      .mask {
        @include abs-stretch;
        background: rgba(0, 0, 0, 0.8);
        filter: blur(3px);
      }

      img {
        width: 100%;
        height: 100%;
        border-radius: 4px;
      }

      .today {
        @include abs-center;
        margin-top: 18px;
        font-size: 28px;
        font-weight: bolder;
        color: $white;
      }

      .icon {
        @include abs-center;
        color: $white;
      }
    }

    .content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;

      .title {
        .text {
          font-size: $font-size-medium-sm;
          color: $font-color-grey-shallow;
        }
      }
    }

    .action-wrap {
      margin-bottom: 18px;

      .button {
        background: #6f00ff;
        background: linear-gradient(to right, #6f00ff, #7700ff, #5b00d1);
        color: $gray;
        border: none;
        border-radius: 20px;

        .icon {
          margin-right: 4px;
        }

        .middle {
          vertical-align: middle;
        }

        &:hover {
          background: $theme-hover;
        }
      }
    }
  }
</style>
