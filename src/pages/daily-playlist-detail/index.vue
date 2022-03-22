// 歌单详情页面
<template>
  <div class="playlist-detail">
    <div class="playlist-detail-content">
      <DailySongHeader ref="header" :songs="songs" />
      <div class="tabs-wrap">
        <el-input
          :class="getInputCls()"
          @blur="onInputBlur"
          @focus="onInputFocus"
          class="input"
          placeholder="搜索歌单音乐"
          prefix-icon="el-icon-search"
          v-model="searchValue"
        >
        </el-input>
      </div>
      <div class="empty" v-if="searchValue && !filteredSongs.length">
        未能找到和
        <span class="keyword">“{{ searchValue }}”</span>
        相关的任何音乐
      </div>
      <SongTable :highlightText="searchValue" :songs="filteredSongs" :artistsWidth="260" class="table" />
    </div>
  </div>
</template>

<script>
  import DailySongHeader from './header'
  import SongTable from '@/components/SongTable'
  import { createSong, scrollInto } from '@/utils'
  import { getSongDetail, getDailySongs } from '@/api'
  import { mapMutations } from '@/store/helper/music'

  const MAX = 500

  export default {
    name: 'DailyPlaylistDetail',
    components: { DailySongHeader, SongTable },
    metaInfo() {
      return {
        title: '每日歌曲推荐',
      }
    },
    created() {
      this.init()
    },
    data() {
      return {
        songs: [],
        searchValue: '',
        inputFocus: false,
      }
    },
    methods: {
      async init() {
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
        this.songs = songs
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
      filteredSongs() {
        return this.songs.filter(({ name, artistsText, albumName }) =>
          `${name}${artistsText}${albumName}`.toLowerCase().includes(this.searchValue.toLowerCase())
        )
      },
    },
  }
</script>

<style lang="scss" scoped>
  .playlist-detail {
    width: 100%;
    padding: 0 100px;

    .playlist-detail-content {
      width: $discovery-tabs-width;
    }

    .tabs-wrap {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin: 0 24px;
      border-bottom: 1px solid $border-color;

      .input {
        width: 125px;
        margin-bottom: 10px;

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

    .table {
      padding-bottom: 70px;
    }
  }
</style>
