<template>
  <div class="foldtext" ref="wrapper">
    <span :class="isFold ? 'text1' : 'text2'" ref="text">
      <slot></slot>
      {{ text }}
    </span>
    <div v-show="isShowIcon" @click="toggleFold" class="icon" ref="icon">
      <Icon v-show="isFold" type="arrow_down" color="grey" :size="14" />
      <Icon v-show="!isFold" type="arrow_up" color="grey" :size="14" />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'FoldText',
    data() {
      return {
        isFold: false,
        isShowIcon: false,
      }
    },
    props: ['text'],
    mounted() {
      this.controlFold()
    },
    methods: {
      controlFold() {
        this.$nextTick(() => {
          const wrapperWidth = this.$refs.wrapper.clientWidth // 容器的总宽度
          const textWidth = this.$refs.text.clientWidth // 文本的总宽度
          const iconWidth = this.$refs.icon.clientWidth // 图标的总宽度
          if (textWidth < wrapperWidth - iconWidth - 2) {
            this.isFold = false
            this.isShowIcon = false
          } else {
            this.isFold = true
            this.isShowIcon = true
          }
        })
      },
      toggleFold() {
        this.isFold = !this.isFold
      },
    },
    watch: {
      text: {
        handler() {
          this.controlFold()
        },
      },
    },
  }
</script>

<style lang="scss" scoped>
  .foldtext {
    display: flex;
    position: relative;

    .text1 {
      display: inline-block;
      color: $font-color-grey-shallow;
      @include text-ellipsis-multi(1);
      text-align: justify;
    }

    .text2 {
      display: inline-block;
      color: $font-color-grey-shallow;
      text-align: justify;
    }

    .icon {
      display: inline-block;
    }
  }
</style>
