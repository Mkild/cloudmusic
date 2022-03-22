<template>
  <!-- 推荐歌单 -->
  <div class="RecommendPlaylists">
    <Title :index="'/discovery/playlists'">推荐歌单 <Icon type="forward" /></Title>
    <div class="list-wrap">
      <DailySongCard v-if="isLogin" />
      <PlaylistCard
        v-for="item in list"
        :id="item.id"
        :img="item.picUrl"
        :key="item.id"
        :name="item.name"
        :count="item.playCount"
      />
    </div>
  </div>
</template>

<script>
  import { mapGetters } from '@/store/helper/user'
  import PlaylistCard from '@/components/PlaylistCard'
  import DailySongCard from '@/components/DailySongCard'
  import { getPersonalized, getRecommendPlaylist } from '@/api'

  export default {
    name: 'RecommendPlaylists',
    components: { PlaylistCard, DailySongCard },
    async created() {
      if (this.isLogin) {
        await this.getRecommendData()
      } else {
        await this.getPersonalizedData()
      }
    },
    data() {
      return {
        list: [],
      }
    },
    methods: {
      // 获取未登录推荐歌单
      async getPersonalizedData() {
        const { result } = await getPersonalized({ limit: 12 })
        this.list = result
      },
      // 获取登录后推荐歌单
      async getRecommendData() {
        const { recommend } = await getRecommendPlaylist({ limit: 12 })
        this.list = recommend
      },
    },
    computed: {
      ...mapGetters(['isLogin']),
    },
    watch: {
      isLogin(newValue) {
        if (newValue === true) {
          this.getRecommendData()
        } else {
          this.getPersonalizedData()
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .list-wrap {
    margin: 0 -10px;
    display: flex;
    flex-wrap: wrap;
  }
</style>
