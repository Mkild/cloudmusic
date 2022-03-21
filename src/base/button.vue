<template>
  <div @click="onClick" class="n-button">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'NButton',
    props: {
      type: {
        type: String,
        default: 'common',
      },
    },
    methods: {
      onClick(e) {
        this.$emit('click', e)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .n-button {
    display: inline-block;
    padding: 5px 16px;
    border: 1px solid $button-border-color;
    border-radius: 2px;
    text-align: center;
    cursor: pointer;

    &:hover {
      background: $button-hover-bgcolor;
    }
  }
</style>
