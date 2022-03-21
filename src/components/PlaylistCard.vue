<template>
  <div @click="onClickCard" class="playlist-card">
    <div class="img-wrap">
      <img v-lazy="$utils.genImgUrl(img, 300)" />
      <div class="count-wrap" v-if="count">
        <span class="count"><i class="el-icon-headset"></i> {{ $utils.formatNumber(count) }}</span>
      </div>
      <div @click.stop="onClickPlayIcon">
        <PlayIcon v-if="center" :size="42" class="center-play-icon" />
        <PlayIcon v-else :size="42" class="play-icon" />
      </div>
      <span class="update-time" v-if="updateTime">{{ $utils.formatDate(updateTime, 'MM月dd日') }}更新</span>
      <div class="creator-wrap" v-if="creator" :title="creator.nickname">
        <span class="creator"><i class="el-icon-user"></i> {{ creator.nickname }}</span>
      </div>
    </div>
    <p class="name" v-if="name">{{ name }}</p>
  </div>
</template>

<script>
  import { mapActions, mapMutations } from '@/store/helper/music'
  import { createSong } from '@/utils'
  import { getListDetail, getSongDetail } from '@/api'

  const MAX = 500

  export default {
    name: 'PlaylistCard',
    props: ['id', 'img', 'name', 'count', 'creator', 'center', 'updateTime'],
    methods: {
      onClickCard() {
        this.$router.push(`/playlist/${this.id}`)
      },
      async getFirstSong() {
        const { playlist } = await getListDetail({ id: this.id })
        const trackIds = playlist.trackIds.map(({ id }) => id)
        const songDetails = await getSongDetail(trackIds.slice(0, MAX))
        let songs = songDetails.songs.map(({ id, name, alia, fee, al, ar, mv, dt }) =>
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
  .playlist-card {
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

      img {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }

      .count-wrap {
        position: absolute;
        padding: 6px;
        left: 0;
        right: 0;
        top: 0;
        background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.01));
        // transform: translateY(-100%);
        // transition: all 0.3s;

        .count {
          color: $white;
          font-size: $font-size-sm;
          float: right;
        }
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

      .update-time {
        position: absolute;
        left: 50%;
        top: 70%;
        transform: translate(-50%, -50%);
        color: $white;
      }

      .creator-wrap {
        position: absolute;
        padding: 6px;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.5));

        .creator {
          color: $white;
          font-size: $font-size-sm;
          float: left;
        }
      }

      &:hover {
        // .count-wrap {
        //   transform: translateY(0);
        // }

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
