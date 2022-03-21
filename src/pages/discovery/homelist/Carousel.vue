<template>
  <!-- 轮播图 -->
  <div class="banner-carousel">
    <el-carousel :interval="5000" type="card">
      <el-carousel-item v-for="banner in banners" :key="banner.scm">
        <div class="img-box">
          <img :src="banner.imageUrl" />
          <span class="tag" :class="[banner.titleColor]" effect="dark">
            {{ banner.typeTitle }}
          </span>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
  import { getBanner } from '@/api'

  export default {
    name: 'Carousel',
    async created() {
      const { banners } = await getBanner()
      this.banners = banners
    },
    data() {
      return {
        banners: [],
      }
    },
  }
</script>

<style lang="scss">
  // 未选中状态
  .el-carousel__indicator .el-carousel__button {
    background: #cdcdcd;
    border-radius: 50%;
    height: 7px;
    width: 7px;
  }
  // 选中状态
  .el-carousel__indicator.is-active .el-carousel__button {
    background-color: $theme-color;
  }

  // 轮播图
  .banner-carousel {
    width: $discovery-tabs-width;

    .el-carousel__container {
      height: 230px;
    }

    // 图片容器
    .img-box {
      text-decoration: none;
      position: relative;
      height: 230px;

      // 图片
      img {
        border-radius: 8px;
        width: 100%;
        height: 230px;
      }

      // 标签
      .tag {
        display: inline-block;
        width: 70px;
        height: 24px;
        position: absolute;
        right: 0%;
        bottom: 0%;
        border-radius: 8px 0 8px 0;
        font-size: 12px;
        line-height: 24px;
        text-align: center;
        color: #f1f1f1;

        &.blue {
          background-color: #5a76d3;
        }
        &.red {
          background-color: #c74949;
        }
      }
    }
  }
</style>
