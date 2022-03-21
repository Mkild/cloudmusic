<template>
  <div class="my-music" ref="mymusic">
    <router-view></router-view>
    <EmptyPage v-if="!isLogin" />
  </div>
</template>

<script>
  import EmptyPage from './EmptyPage'
  import { mapGetters } from '@/store/helper/user'
  import { isDef } from '@/utils'

  export default {
    name: 'Mymusic',
    components: { EmptyPage },
    data() {
      return {
        offsetTop: 0,
      }
    },
    computed: {
      ...mapGetters(['isLogin', 'likePlaylistId']),
    },
    watch: {
      likePlaylistId(id) {
        if (isDef(id)) {
          this.$router.push('/mymusic/playlist/' + id)
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .my-music {
    width: calc(100% - #{$aside-width});
    min-width: $mini-player-min-width;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }
</style>
