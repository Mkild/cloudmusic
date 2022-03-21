<template>
  <div>
    <Carousel class="carousel" />
    <RecommendPlaylists />
    <NewSongs />
    <NewMvs />
  </div>
</template>

<script>
  import Carousel from '@/pages/discovery/homelist/Carousel'
  import RecommendPlaylists from '@/pages/discovery/homelist/RecommendPlaylists'
  import NewSongs from '@/pages/discovery/homelist/NewSongs'
  import NewMvs from '@/pages/discovery/homelist/NewMvs'

  export default {
    name: 'Homelist',
    components: { Carousel, RecommendPlaylists, NewSongs, NewMvs },
  }
</script>

<style lang="scss" scoped>
  .carousel {
    margin-top: 20px;
  }
</style>
