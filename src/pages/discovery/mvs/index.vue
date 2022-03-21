<template>
  <div class="mvs">
    <Title class="title" type="default">全部MV</Title>
    <div class="tabs-wrap">
      <span class="tabs-type">地区：</span>
      <RouteTabs :tabs="areaTabs" class="tabs" tabType="mv" type="split" />
    </div>
    <div class="tabs-wrap">
      <span class="tabs-type">类型：</span>
      <RouteTabs :tabs="typeTabs" class="tabs" tabType="mv" type="split" />
    </div>
    <div class="tabs-wrap">
      <span class="tabs-type">排序：</span>
      <RouteTabs :tabs="sortTabs" class="tabs" tabType="mv" type="split" />
    </div>
    <WithPagination
      :getData="getAllMvs"
      :getDataParams="getDataParams"
      :limit="40"
      :scrollTarget="this.scrollDom"
      :total="mvCount"
      @getDataSuccess="onGetMvs"
    >
      <ul class="list-wrap">
        <li :key="mv.id" class="list-item" v-for="mv in mvs">
          <MvCard
            :author="mv.artistName"
            :duration="mv.duration"
            :id="mv.id"
            :img="mv.cover"
            :name="mv.name"
            :playCount="mv.playCount"
            :iconSize="48"
          />
        </li>
      </ul>
    </WithPagination>
  </div>
</template>

<script>
  import { getAllMvs } from '@/api'
  import MvCard from '@/components/MvCard'
  import WithPagination from '@/components/with-pagination'

  const areaTabs = [
    { id: 0, title: '全部', type: 'area' },
    { id: 1, title: '内地', type: 'area' },
    { id: 2, title: '港台', type: 'area' },
    { id: 3, title: '欧美', type: 'area' },
    { id: 4, title: '韩国', type: 'area' },
    { id: 5, title: '日本', type: 'area' },
  ]
  const typeTabs = [
    { id: 6, title: '全部', type: 'type' },
    { id: 7, title: '官方版', type: 'type' },
    { id: 8, title: '原声', type: 'type' },
    { id: 9, title: '现场版', type: 'type' },
    { id: 10, title: '网易出品', type: 'type' },
  ]
  const sortTabs = [
    { id: 11, title: '上升最快', type: 'sort' },
    { id: 12, title: '最热', type: 'sort' },
    { id: 13, title: '最新', type: 'sort' },
  ]

  export default {
    name: 'Mvs',
    components: { WithPagination, MvCard },
    metaInfo() {
      return {
        title: `${this.getDataParams.area} | ${this.getDataParams.type} | ${this.getDataParams.order}MV - MV - 网易云音乐`,
      }
    },
    created() {
      this.areaTabs = areaTabs
      this.typeTabs = typeTabs
      this.sortTabs = sortTabs
      this.getAllMvs = getAllMvs
    },
    mounted() {
      this.scrollDom = this.$el.parentElement
    },
    data() {
      return {
        mvs: [],
        mvCount: 0,
        scrollDom: this.$el,
      }
    },
    methods: {
      onGetMvs({ data, count }) {
        this.mvs = data
        if (count) {
          this.mvCount = count
        }
      },
    },
    computed: {
      getDataParams() {
        return {
          area: this.$route.query.area || '全部',
          type: this.$route.query.type || '全部',
          order: this.$route.query.order || '上升最快',
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .mvs {
    margin: 0 auto;

    .title {
      margin-bottom: 20px;
    }

    .tabs-wrap {
      margin-bottom: 16px;
      display: flex;
      align-items: center;

      .tabs-type {
        font-size: $font-size-sm;
      }
    }

    @include list(25%);
  }
</style>
