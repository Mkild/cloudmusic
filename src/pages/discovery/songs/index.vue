// 最新音乐页面
<template>
  <div class="songs">
    <Title class="title" type="default">最新音乐</Title>
    <div class="tabs">
      <RouteTabs :tabs="tabs" tabType="song" @tabChange="onTabChange" type="bolder" v-model="activeTabType" />
      <NButton @click="playAll" class="button">
        <Icon class="icon middle" color="gray" type="play-round" />
        <span class="middle">播放全部</span>
      </NButton>
    </div>
    <SongTable class="song-table" :songs="songs" :artistsWidth="260" :showHeader="false" />
  </div>
</template>

<script>
  import { getTopSongs } from '@/api'
  import { scrollInto, createSong } from '@/utils'
  import SongTable from '@/components/SongTable'
  import { mapActions, mapMutations } from '@/store/helper/music'

  export default {
    name: 'Songs',
    components: { SongTable },
    metaInfo() {
      return {
        title: '最新音乐 - 网易云音乐',
      }
    },
    async created() {
      this.tabs = [
        { id: 0, title: '全部', type: 0 },
        { id: 1, title: '华语', type: 7 },
        { id: 2, title: '欧美', type: 96 },
        { id: 3, title: '韩国', type: 16 },
        { id: 4, title: '日本', type: 8 },
      ]

      this.getSongs()
    },
    data() {
      return {
        activeTabType: 0,
        songs: [],
      }
    },
    methods: {
      async getSongs() {
        const { data } = await getTopSongs(this.$route.query.type || 0)
        this.songs = data.map((song) => {
          const {
            id,
            name,
            alias,
            artists,
            duration,
            mvid,
            fee,
            privilege: { fl, maxbr },
            album: { picUrl, name: albumName },
          } = song
          return createSong({
            id,
            name,
            alia: alias[0],
            artists,
            duration,
            albumName,
            img: picUrl,
            mvId: mvid,
            vip: fee,
            playMaxbr: maxbr,
            fl,
          })
        })
      },
      onTabChange() {
        this.currentPage = 1
        this.$router.push({
          query: {
            type: this.activeTabType,
          },
        })
      },
      playAll() {
        this.startSong(this.songs.find(({ fl }) => fl !== 0))
        this.setPlaylist(this.songs)
      },

      ...mapMutations(['setPlaylist']),
      ...mapActions(['startSong']),
    },
    computed: {
      getDataParams() {
        return {
          type: this.$route.query.type || 0,
        }
      },
    },
    watch: {
      getDataParams: {
        deep: true,
        handler() {
          this.getSongs()
          scrollInto(this.$el.parentElement)
        },
      },
    },
  }
</script>

<style lang="scss" scoped>
  .songs {
    .title {
      margin-bottom: 20px;
    }

    .tabs {
      position: relative;
      display: flex;
      align-items: center;
      margin-bottom: 24px;

      .button {
        position: absolute;
        right: 10px;
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

    .song-table {
      margin-bottom: 70px;
    }
  }
</style>
