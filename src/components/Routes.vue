<template>
  <div class="routes">
    <Icon title="后退" class="icon" :backdrop="true" type="back" @click="back" />
    <Icon title="前进" :backdrop="true" type="forward" @click="forward" />
  </div>
</template>

<script>
  export default {
    name: 'Routes',
    methods: {
      // 后退
      back() {
        this.$router.back()
      },
      // 前进
      forward() {
        this.$router.forward()
      },
    },
  }
</script>

<style lang="scss" scoped>
  .routes {
    display: flex;
    align-items: center;

    .icon {
      margin-right: 10px;
    }
  }
</style>
