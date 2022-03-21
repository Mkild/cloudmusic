<template>
  <!-- 推荐MV -->
  <div class="new-mvs" v-if="mvs.length">
    <Title :index="'/discovery/mvs'">推荐MV <Icon type="forward" /></Title>
    <ul class="list-wrap">
      <li :key="mv.id" class="list-item" v-for="mv in mvs">
        <MvCard
          :author="mv.artistName"
          :id="mv.id"
          :img="mv.picUrl"
          :name="mv.name"
          :playCount="mv.playCount"
          :iconSize="48"
        />
      </li>
    </ul>
  </div>
</template>

<script>
  import { getPersonalizedMv } from '@/api'
  import MvCard from '@/components/MvCard'

  export default {
    name: 'NewMvs',
    components: { MvCard },
    async created() {
      const { result } = await getPersonalizedMv()
      this.mvs = result
    },
    data() {
      return {
        mvs: [],
      }
    },
  }
</script>

<style lang="scss" scoped>
  .new-mvs {
    @include list(25%);
  }
</style>
