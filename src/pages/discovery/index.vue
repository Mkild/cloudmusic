<template>
  <!-- 发现音乐 -->
  <div class="discovery">
    <div class="discovery-layout">
      <!-- 标签页 -->
      <div class="tab">
        <div class="tab-content">
          <!-- 标签栏 -->
          <div class="nav">
            <div class="nav-tab">
              <router-link to="/discovery" exact>个性推荐</router-link>
              <router-link to="/discovery/playlists">歌单</router-link>
              <router-link to="/discovery/toplists">排行榜</router-link>
              <router-link to="/discovery/songs">最新音乐</router-link>
              <router-link to="/discovery/albums">新碟上架</router-link>
              <router-link to="/discovery/mvs">MV</router-link>
            </div>
          </div>
          <!-- 标签内容 -->
          <router-view></router-view>
        </div>
      </div>
    </div>
    <!-- 页脚 -->
    <Footer />
  </div>
</template>

<script>
  import Footer from '@/components/Footer'

  export default {
    name: 'Discovery',
    components: { Footer },
  }
</script>

<style lang="scss" scoped>
  .discovery {
    width: 100%;
  }

  .discovery-layout {
    width: 100%;
    margin: 0 auto;
    max-width: $discovery-content-max-width;
    min-width: $discovery-content-min-width;
    min-height: calc(100% - #{$footer-height});
  }

  .tab {
    width: 100%;
    margin-left: 40px;
    margin-right: 40px;

    .tab-content {
      width: $discovery-tabs-width;
    }

    .nav {
      width: $discovery-tabs-width;
      position: sticky;
      top: 0;
      -ms-transform-origin-y: 40px;
      -ms-position: fixed;
      z-index: $discovery-nav-z-index;
      background: #ffffff;
      height: 50px;
    }

    .nav-tab {
      position: absolute;
      top: 14px;

      a {
        text-decoration: none;
        margin-right: 30px;
        cursor: pointer;
        color: $font-color;
        font-size: 16px;
        display: inline-block;

        &:hover {
          color: #000000;
        }
      }

      .router-link-active {
        font-size: $font-size-title;
        font-weight: bolder;

        &:after {
          content: '';
          width: 75%;
          height: 2px;
          display: block;
          margin: 0 auto;
          border-bottom: 4px solid $theme-color;
        }
      }
    }
  }
</style>
