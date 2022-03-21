// 推荐歌单页面
<template>
  <div class="playlists">
    <div class="top-play-list-card" v-if="topPlaylist.id">
      <TopPlaylistCard
        :desc="topPlaylist.description"
        :id="topPlaylist.id"
        :img="topPlaylist.coverImgUrl"
        :name="topPlaylist.name"
      />
    </div>
    <div class="tabs">
      <Select @tabChange="onTabChange" v-model="activeTabTitle" class="select-wrap" />
      <RouteTabs
        :tabs="tabs"
        tabType="playlist"
        @tabChange="onTabChange"
        align="right"
        type="small"
        v-model="activeTabTitle"
      />
    </div>
    <div class="playlist-cards">
      <PlaylistCard
        :id="item.id"
        :img="item.coverImgUrl"
        :key="index"
        :name="item.name"
        :count="item.playCount"
        :creator="item.creator"
        v-for="(item, index) in playlists"
      />
    </div>
    <Pagination
      :current-page.sync="currentPage"
      :page-size="PAGE_SIZE"
      :total="total"
      @current-change="onPageChange"
      class="pagination"
    ></Pagination>
  </div>
</template>

<script>
  import { getPlaylists, getTopPlaylists } from '@/api'
  import Select from './Select'
  import PlaylistCard from '@/components/PlaylistCard'
  import TopPlaylistCard from '@/components/TopPlaylistCard'
  import { isDef, getPageOffset, scrollInto } from '@/utils'

  const PAGE_SIZE = 90

  export default {
    name: 'Playlists',
    components: { Select, TopPlaylistCard, PlaylistCard },
    metaInfo() {
      return {
        title: `${this.getDataParams.cat}歌单 - 歌单 - 网易云音乐`,
      }
    },
    async created() {
      this.PAGE_SIZE = PAGE_SIZE
      this.AllTabs = [
        { id: 0, title: '全部' },
        { id: 1, title: '华语' },
        { id: 2, title: '欧美' },
        { id: 3, title: '日语' },
        { id: 4, title: '韩语' },
        { id: 5, title: '粤语' },
        { id: 6, title: '流行' },
        { id: 7, title: '摇滚' },
        { id: 8, title: '民谣' },
        { id: 9, title: '电子' },
        { id: 10, title: '舞曲' },
        { id: 11, title: '说唱' },
        { id: 12, title: '轻音乐' },
        { id: 13, title: '爵士' },
        { id: 14, title: '乡村' },
        { id: 15, title: 'R&B/Soul' },
        { id: 16, title: '古典' },
        { id: 17, title: '民族' },
        { id: 18, title: '英伦' },
        { id: 19, title: '金属' },
        { id: 20, title: '蓝调' },
        { id: 21, title: '雷鬼' },
        { id: 22, title: '世界音乐' },
        { id: 23, title: '拉丁' },
        { id: 24, title: 'New Age' },
        { id: 25, title: '古风' },
        { id: 26, title: 'Bossa Nova' },
        { id: 27, title: '清晨' },
        { id: 28, title: '夜晚' },
        { id: 29, title: '学习' },
        { id: 30, title: '工作' },
        { id: 31, title: '午休' },
        { id: 32, title: '下午茶' },
        { id: 33, title: '地铁' },
        { id: 34, title: '驾车' },
        { id: 35, title: '运动' },
        { id: 36, title: '旅行' },
        { id: 37, title: '散步' },
        { id: 38, title: '酒吧' },
        { id: 39, title: '怀旧' },
        { id: 40, title: '浪漫' },
        { id: 41, title: '清新' },
        { id: 42, title: '伤感' },
        { id: 43, title: '治愈' },
        { id: 44, title: '放松' },
        { id: 45, title: '孤独' },
        { id: 46, title: '感动' },
        { id: 47, title: '兴奋' },
        { id: 48, title: '快乐' },
        { id: 49, title: '安静' },
        { id: 50, title: '思念' },
        { id: 51, title: '综艺' },
        { id: 51, title: '影视原声' },
        { id: 52, title: 'ACG' },
        { id: 53, title: '儿童' },
        { id: 54, title: '校园' },
        { id: 55, title: '游戏' },
        { id: 56, title: '70后' },
        { id: 57, title: '80后' },
        { id: 58, title: '90后' },
        { id: 59, title: '网络歌曲' },
        { id: 60, title: 'KTV' },
        { id: 61, title: '经典' },
        { id: 62, title: '翻唱' },
        { id: 63, title: '吉他' },
        { id: 64, title: '钢琴' },
        { id: 65, title: '器乐' },
        { id: 66, title: '榜单' },
        { id: 67, title: '00后' },
      ]
      this.initData()
    },
    data() {
      return {
        activeTabTitle: '全部',
        playlists: [],
        currentPage: 1,
        total: 0,
        topPlaylist: {},
        tabs: [
          { id: 0, title: '全部' },
          { id: 2, title: '欧美' },
          { id: 1, title: '华语' },
          { id: 6, title: '流行' },
          { id: 11, title: '说唱' },
          { id: 7, title: '摇滚' },
          { id: 8, title: '民谣' },
          { id: 9, title: '电子' },
          { id: 12, title: '轻音乐' },
          { id: 52, title: '影视原声' },
          { id: 53, title: 'ACG' },
          { id: 39, title: '怀旧' },
          { id: 43, title: '治愈' },
          { id: 36, title: '旅行' },
        ],
      }
    },
    methods: {
      // 获取歌单和精品歌单
      async initData() {
        this.getPlaylists()
        this.getTopPlaylists()
      },
      async getPlaylists() {
        if (isDef(this.$route.query.page)) {
          this.currentPage = parseInt(this.$route.query.page)
        }
        const { playlists, total } = await getPlaylists({
          limit: PAGE_SIZE,
          offset: getPageOffset(this.currentPage, PAGE_SIZE),
          cat: this.$route.query.cat || this.activeTabTitle,
        })
        this.playlists = playlists
        this.total = total
      },
      async getTopPlaylists() {
        const { playlists } = await getTopPlaylists({
          limit: 1,
          cat: this.$route.query.cat || this.activeTabTitle,
        })
        this.topPlaylist = playlists[0] || {}
      },
      // 分页只重新获取歌单
      async onPageChange(page) {
        this.currentPage = page
        this.$router.push({
          query: {
            cat: this.$route.query.cat,
            page: this.currentPage,
          },
        })
      },
      onTabChange() {
        this.currentPage = 1
        this.$router.push({
          query: {
            cat: this.activeTabTitle,
          },
        })
      },
    },
    computed: {
      getDataParams() {
        return {
          cat: this.$route.query.cat || '全部',
        }
      },
    },
    watch: {
      getDataParams: {
        deep: true,
        handler() {
          if (!isDef(this.$route.query.page)) {
            this.initData()
          } else {
            this.getPlaylists()
          }
          scrollInto(this.$el.parentElement)
        },
      },
    },
  }
</script>

<style lang="scss" scoped>
  .playlists {
    margin-top: 20px;

    .tabs {
      position: relative;
      margin-top: 40px;

      .select-wrap {
        position: absolute;
        left: 65px;
        top: 60%;
        transform: translate(-50%, -50%);
      }
    }

    .top-play-list-card {
      margin-bottom: 16px;
    }

    .playlist-cards {
      margin: 0 -10px;
      display: flex;
      flex-wrap: wrap;
    }

    .pagination {
      display: flex;
      justify-content: center;
      margin-top: 20px;
      margin-bottom: 60px;
    }
  }
</style>
