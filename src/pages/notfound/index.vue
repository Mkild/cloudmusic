<template>
  <div class="notfound">
    <div class="layout">
      <img class="image" src="@/assets/image/404notfound.png" />
    </div>
    <Footer />
  </div>
</template>

<script>
  import Footer from '@/components/Footer'

  export default {
    name: 'Notfound',
    components: { Footer },
    metaInfo() {
      return {
        title: '找不到页面 - 网易云音乐',
      }
    },
  }
</script>

<style lang="scss" scoped>
  .notfound {
    width: 100%;

    .layout {
      @include flex-center;

      .image {
        height: 580px;
        object-fit: fill;
      }
    }
  }
</style>
