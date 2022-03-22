<template>
  <div @click="onClickCard" class="daily-song-card">
    <div class="img-wrap">
      <div class="mask">
        <img
          v-lazy="$utils.genImgUrl('https://p1.music.126.net/u-yLpj_PuG6lCQLNSpxyNA==/109951165018412936.jpg', 300)"
        />
      </div>
      <span class="today">{{ new Date().getDate() }}</span>
      <Icon class="icon" type="calendar" :size="140" />
      <div @click.stop="onClickPlayIcon">
        <PlayIcon v-if="center" :size="42" class="center-play-icon" />
        <PlayIcon v-else :size="42" class="play-icon" />
      </div>
      <div class="desc-wrap">
        <span class="desc">根据你的音乐口味生成<br />每日更新</span>
      </div>
    </div>
    <p class="name">每日歌曲推荐</p>
  </div>
</template>

<script>
  import { mapActions, mapMutations } from '@/store/helper/music'
  import { createSong } from '@/utils'
  import { getDailySongs, getSongDetail } from '@/api'

  const MAX = 500

  export default {
    name: 'DailySongCard',
    props: ['center'],
    methods: {
      onClickCard() {
        this.$router.push('/dailyplaylist')
      },
      async getFirstSong() {
        const {
          data: { dailySongs },
        } = await getDailySongs()
        const trackIds = dailySongs.map(({ id }) => id)
        const songDetails = await getSongDetail(trackIds.slice(0, MAX))
        const songs = songDetails.songs.map(({ id, name, alia, fee, al, ar, mv, dt }) =>
          createSong(
            {
              id,
              name,
              alia: alia[0],
              vip: fee,
              artists: ar,
              duration: dt,
              mvId: mv,
              albumName: al.name,
              img: al.picUrl,
            },
            songDetails.privileges
          )
        )
        this.startSong(songs[0])
        this.setPlaylist(songs)
      },
      onClickPlayIcon() {
        this.getFirstSong()
      },

      ...mapMutations(['setPlaylist']),
      ...mapActions(['startSong']),
    },
  }
</script>

<style lang="scss" scoped>
  .daily-song-card {
    position: relative;
    width: calc(17% - 25px);
    margin: 10px 10px 20px;
    cursor: pointer;

    .img-wrap {
      position: relative;
      width: 100%;
      padding-top: 100%;
      margin-bottom: 8px;
      border-radius: 4px;
      overflow: hidden;

      .mask {
        @include abs-stretch;
        background: rgba(0, 0, 0, 0.8);
        filter: blur(8px);
      }

      img {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }

      .desc-wrap {
        position: absolute;
        padding: 20px;
        left: 0;
        right: 0;
        top: 0;
        background-image: linear-gradient(rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.8));
        transform: translateY(-100%);
        transition: all 0.3s;

        .desc {
          color: $white;
          font-size: $font-size-medium-sm;
        }
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

      .play-icon {
        opacity: 0;
        position: absolute;
        right: 15px;
        bottom: 15px;
        font-size: 24px;
        transition: all 0.7s;
        color: $white;
      }

      .center-play-icon {
        opacity: 0;
        @include abs-center;
        font-size: 24px;
        transition: all 0.7s;
        color: $white;
      }

      &:hover {
        .desc-wrap {
          transform: translateY(0);
        }

        .play-icon {
          opacity: 1;
        }

        .center-play-icon {
          opacity: 1;
        }
      }
    }

    .name {
      font-size: $font-size-medium;
      color: $font-color;
      @include text-ellipsis-multi(2);

      &:hover {
        color: #000000;
      }
    }
  }
</style>
