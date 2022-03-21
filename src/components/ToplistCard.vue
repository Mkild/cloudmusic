<template>
  <div class="toplist-card">
    <div class="list-wrap">
      <PlaylistCard
        :id="list.id"
        :img="list.coverImgUrl"
        :key="list.id"
        :updateTime="list.updateTime"
        :center="true"
        class="playlist-card"
      />
      <SongTable :songs="songs" :artistsWidth="200" :hideColumns="['img']" :showHeader="false" class="table" />
      <span class="all" @click="onClickCard">查看全部 <Icon type="forward" :size="12" /></span>
    </div>
  </div>
</template>

<script>
  import PlaylistCard from '@/components/PlaylistCard'
  import SongTable from '@/components/SongTable'
  import { createSong } from '@/utils'
  import { getListDetail, getSongDetail } from '@/api'

  const MAX = 5

  export default {
    name: 'ToplistCard',
    components: { PlaylistCard, SongTable },
    props: {
      list: {
        type: Object,
        default: () => {},
      },
    },
    mounted() {
      this.init()
    },
    data() {
      return {
        playlist: {},
        songs: [],
      }
    },
    methods: {
      async init() {
        const { playlist } = await getListDetail({ id: this.id })
        this.playlist = playlist
        this.genSonglist(playlist)
      },
      async genSonglist(playlist) {
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
        this.songs = songs
      },
      onClickCard() {
        this.$router.push(`/playlist/${this.id}`)
      },
    },
    computed: {
      id() {
        return Number(this.list.id)
      },
    },
  }
</script>
<style lang="scss">
  .toplist-card {
    .list-wrap {
      position: relative;
      display: flex;

      .playlist-card {
        margin: 0;
      }

      .el-table {
        margin-left: 50px;
      }

      .el-table__row {
        height: 40px;

        td:first-child {
          border-radius: 5px 0 0 5px;
        }

        td:last-child {
          border-radius: 0 5px 5px 0;
        }

        .index-wrap {
          font-weight: bold;
        }

        &:nth-child(-n + 3) {
          .index-wrap {
            color: $theme-color;
          }
        }
      }

      .all {
        position: absolute;
        left: 272px;
        bottom: -18px;
        font-size: 13px;
        cursor: pointer;
        color: #707070;

        &:hover {
          color: #000000;
        }
      }
    }
  }
</style>
