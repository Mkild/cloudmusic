<template>
  <div v-show="goTopShow" class="gotop" @click="goTop">
    <Icon type="gotop" color="font" :size="20" />
  </div>
</template>

<script>
  import { mapState } from '@/store/helper/music'

  export default {
    name: 'GoTop',
    data() {
      return {
        scrollTop: '',
        goTopShow: false,
      }
    },
    mounted() {
      this.addScrollEvent()
    },
    beforeDestroy() {
      this.removeScrollEvent()
    },
    methods: {
      addScrollEvent() {
        this.$parent.$el.addEventListener('scroll', this.handleScroll)
      },
      removeScrollEvent() {
        this.$parent.$el.removeEventListener('scroll', this.handleScroll)
      },
      handleScroll() {
        this.scrollTop = this.$parent.$el.scrollTop
      },
      goTop() {
        this.$parent.$el.scrollTop = 0
      },
    },
    computed: {
      ...mapState(['isPlayerShow']),
    },
    watch: {
      scrollTop() {
        this.scrollTop > 0 ? (this.goTopShow = true) : (this.goTopShow = false)
      },
      isPlayerShow(show) {
        if (show) {
          this.addScrollEvent()
        } else {
          this.removeScrollEvent()
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .gotop {
    @include flex-center();
    width: 40px;
    height: 40px;
    cursor: pointer;
    position: fixed;
    left: 50%;
    margin-left: 500px;
    bottom: 100px;
    border-radius: 50%;
    background: #eeeeee;

    &:hover {
      background: #e0e0e0;
    }
  }
</style>
