<template>
  <div class="albums">
    <Title class="title" type="default">新碟上架</Title>
  </div>
</template>

<script>
  export default {
    name: 'Albums',
    metaInfo() {
      return {
        title: '新碟上架 - 网易云音乐',
      }
    },
  }
</script>

<style lang="scss" scoped>
  .albums {
    .title {
      margin-bottom: 20px;
    }
  }
</style>
