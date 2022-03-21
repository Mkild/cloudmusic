<template>
  <!-- 推荐歌单 -->
  <div class="RecommendPlaylists">
    <Title :index="'/discovery/playlists'">推荐歌单 <Icon type="forward" /></Title>
    <div class="list-wrap">
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
  import PlaylistCard from '@/components/PlaylistCard'
  import { getPersonalized } from '@/api'

  export default {
    name: 'RecommendPlaylists',
    components: { PlaylistCard },
    async created() {
      const { result } = await getPersonalized({ limit: 12 })
      this.list = result
    },
    data() {
      return {
        list: [],
      }
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
