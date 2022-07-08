<template>
  <div class="albums">
    <Title class="title" type="default">新碟上架</Title>
    <div class="tabs">
      <RouteTabs :tabs="tabs" tabType="album" @tabChange="onTabChange" type="bolder" v-model="activeTabArea" />
    </div>
    <ul class="infinite-list" style="overflow: auto">
      <li v-for="album in albums" :key="album.id" class="infinite-list-item">{{ album.name }}</li>
    </ul>
  </div>
</template>

<script>
  import { getAllAlbums } from '@/api'
  import { scrollInto } from '@/utils'

  export default {
    name: 'Albums',
    metaInfo() {
      return {
        title: '新碟上架 - 网易云音乐',
      }
    },
    created() {
      this.tabs = [
        { id: 0, title: '全部', area: 'ALL' },
        { id: 1, title: '华语', area: 'ZH' },
        { id: 2, title: '欧美', area: 'EA' },
        { id: 3, title: '韩国', area: 'KR' },
        { id: 4, title: '日本', area: 'JP' },
      ]
      this.getAlbums()
    },
    data() {
      return {
        activeTabArea: 'ALL',
        albums: [],
        albumData: [],
      }
    },
    methods: {
      async getAlbums() {
        const { albums } = await getAllAlbums({
          limit: 10,
          area: this.$route.query.area || 'ALL',
        })
        this.albums = albums
        this.$set(this.albumData, 0, albums)
      },
      onTabChange() {
        this.$router.push({
          query: {
            area: this.activeTabArea,
          },
        })
      },
    },
    computed: {
      getDataParams() {
        return {
          area: this.$route.query.area || 'ALL',
        }
      },
    },
    watch: {
      getDataParams: {
        handler() {
          this.getAlbums()
          scrollInto(this.$el.parentElement)
        },
        deep: true,
      },
    },
  }
</script>

<style lang="scss" scoped>
  .albums {
    .title {
      margin-bottom: 20px;
    }

    .hover-div {
      background: red;
      &:hover {
        cursor: pointer;
      }
    }

    .tabs {
      position: relative;
      display: flex;
      align-items: center;
      margin-bottom: 24px;

      .right-tab {
        position: absolute;
        right: 10px;
      }
    }
  }
</style>
