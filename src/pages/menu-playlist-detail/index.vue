// 歌单详情页面
<template>
  <div class="playlist-detail" v-if="playlist.id">
    <div class="playlist-detail-content">
      <MenuDetailHeader ref="header" :playlist="playlist" :songs="songs" />
      <div class="tabs-wrap">
        <Tabs :tabs="tabs" type="theme" v-model="activeTab" />
        <el-input
          :class="getInputCls()"
          @blur="onInputBlur"
          @focus="onInputFocus"
          class="input"
          placeholder="搜索歌单音乐"
          prefix-icon="el-icon-search"
          v-model="searchValue"
          v-show="activeTab === SONG_IDX"
        >
        </el-input>
      </div>
      <div class="empty" v-if="searchValue && !filteredSongs.length">
        未能找到和
        <span class="keyword">“{{ searchValue }}”</span>
        相关的任何音乐
      </div>
      <SongTable
        :highlightText="searchValue"
        :songs="filteredSongs"
        :artistsWidth="260"
        :hideColumns="['img']"
        class="menu-table"
        v-show="activeTab === SONG_IDX"
      />
      <div class="comments" v-show="activeTab === COMMENT_IDX">
        <Comments :id="id" @update="onCommentsUpdate" type="playlist" />
      </div>
      <div class="subscribers" v-show="activeTab === SUBSCRIBER_IDX">
        <Subscribers :id="id" />
      </div>
    </div>
  </div>
</template>

<script>
  import MenuDetailHeader from './header'
  import SongTable from '@/components/SongTable'
  import Comments from '@/components/Comments'
  import Subscribers from '@/components/Subscribers'
  import { createSong, scrollInto } from '@/utils'
  import { getListDetail, getSongDetail } from '@/api'
  import { mapMutations } from '@/store/helper/music'

  const MAX = 500
  const SONG_IDX = 0
  const COMMENT_IDX = 1
  const SUBSCRIBER_IDX = 2

  export default {
    name: 'MenuPlaylistDetail',
    components: { MenuDetailHeader, SongTable, Comments, Subscribers },
    metaInfo() {
      return {
        title: this.playlist.name,
      }
    },
    async created() {
      this.SONG_IDX = SONG_IDX
      this.COMMENT_IDX = COMMENT_IDX
      this.SUBSCRIBER_IDX = SUBSCRIBER_IDX
    },
    data() {
      return {
        tabs: ['歌曲列表', '评论', '收藏者'],
        activeTab: SONG_IDX,
        playlist: {},
        songs: [],
        searchValue: '',
        inputFocus: false,
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
      onCommentsUpdate({ total }) {
        this.tabs.splice(COMMENT_IDX, 1, `评论(${total})`)
      },
      onInputFocus() {
        this.inputFocus = true
        this.setInputFocus(true)
      },
      onInputBlur() {
        this.inputFocus = false
        this.setInputFocus(false)
      },
      getInputCls() {
        return !this.inputFocus ? 'inactive' : ''
      },
      scrollToHeader() {
        const { header } = this.$refs
        if (header) {
          scrollInto(header.$el)
        }
      },

      ...mapMutations(['setInputFocus']),
    },
    computed: {
      id() {
        return Number(this.$route.params.id)
      },
      filteredSongs() {
        return this.songs.filter(({ name, artistsText, albumName }) =>
          `${name}${artistsText}${albumName}`.toLowerCase().includes(this.searchValue.toLowerCase())
        )
      },
    },
    watch: {
      id: {
        handler() {
          this.searchValue = ''
          this.init()
          this.scrollToHeader()
        },
        immediate: true,
      },
    },
  }
</script>

<style lang="scss">
  .playlist-detail {
    .el-table__row {
      height: 38px;
    }
  }
</style>

<style lang="scss" scoped>
  .playlist-detail {
    width: 100%;

    .playlist-detail-content {
      width: 100%;
    }

    .tabs-wrap {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 24px;
      border-bottom: 1px solid $border-color;

      .input {
        width: 125px;

        &:not(:hover) {
          &.inactive {
            &::v-deep .el-input__inner {
              background: transparent !important;
            }
          }
        }
      }
    }

    .empty {
      @include flex-center;
      height: 200px;

      .keyword {
        color: $green;
      }
    }

    .menu-table {
      padding-bottom: 25px;
    }

    .comments {
      padding: 0 16px;
      padding-top: 16px;
    }
    .subscribers {
      padding: 0 16px;
      padding-top: 16px;
    }
  }
</style>
