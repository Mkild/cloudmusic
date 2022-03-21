<template>
  <div class="toplists">
    <Title class="title" type="default">官方榜</Title>
    <ToplistCard v-for="item in officialList" :key="item.id" :list="item" class="toplist-card" />
    <Title class="title" type="default">全球榜</Title>
    <div class="list-wrap">
      <PlaylistCard
        v-for="item in globalList"
        :key="item.id"
        :id="item.id"
        :img="item.coverImgUrl"
        :name="item.name"
        :count="item.playCount"
        :center="true"
        class="playlist-card"
      />
    </div>
  </div>
</template>

<script>
  import ToplistCard from '@/components/ToplistCard'
  import PlaylistCard from '@/components/PlaylistCard'
  import { getToplists } from '@/api'

  export default {
    name: 'Toplists',
    components: { ToplistCard, PlaylistCard },
    metaInfo() {
      return {
        title: '排行榜 - 网易云音乐',
      }
    },
    async created() {
      const { list } = await getToplists()
      this.officialList = list.splice(0, 4)
      this.globalList = list
    },
    data() {
      return {
        officialList: [],
        globalList: [],
      }
    },
  }
</script>

<style lang="scss" scoped>
  .toplists {
    .title {
      margin-bottom: 10px;
    }

    .toplist-card {
      margin-bottom: 60px;
    }

    .list-wrap {
      margin: 0 -10px;
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 50px;
    }
  }
</style>
