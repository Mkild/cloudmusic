<template>
  <header>
    <el-menu
      :default-active="this.$route.meta.index"
      class="el-menu"
      mode="horizontal"
      @select="handleSelect"
      background-color="#6f00ff"
      text-color="#cdcdcd"
      active-text-color="#ffffff"
      router
    >
      <!-- 网站logo和标题  -->
      <div class="logo" @click="onClickLogo">
        <el-image :src="require('@/assets/image/logo.png')" fit="cover"></el-image>
        <img class="img" src="@/assets/image/header-title.png" alt="网易云音乐" />
      </div>

      <!-- 路由栏 -->
      <div class="route">
        <!-- 路由按钮 -->
        <transition name="route" mode="out-in">
          <div class="header-routes" v-show="!isPlayerShow"><Routes /></div>
        </transition>
        <!-- 收起播放器 -->
        <transition name="shrink">
          <div class="shrink-player" title="收起播放器" @click="onClickDown" v-if="isPlayerShow">
            <Icon :backdrop="true" type="down" />
          </div>
        </transition>
      </div>

      <!-- 菜单选项 -->
      <el-menu-item index="/discovery">发现音乐</el-menu-item>
      <el-menu-item index="/mymusic" :route="mymusicPath">我的音乐</el-menu-item>
      <el-menu-item index="/download">客户端下载</el-menu-item>

      <!-- 用户栏 -->
      <UserAvatar class="user" />

      <!-- 最右侧功能区 -->
      <div class="right">
        <div class="buttons">
          <div @click="onClickLogo" class="mac-button red">
            <Icon title="返回首页" :size="9" type="home" />
          </div>
          <div @click="exitFullscreen" class="mac-button yellow">
            <Icon title="退出全屏" :size="9" type="minus" />
          </div>
          <div @click="fullscreen" class="mac-button green">
            <Icon title="全屏模式" :size="9" type="fullscreen" />
          </div>
        </div>
      </div>
    </el-menu>
  </header>
</template>

<!--suppress JSAnnotator -->
<script>
  import Routes from '@/components/Routes'
  import UserAvatar from '@/components/UserAvatar'
  import { mapState, mapMutations } from '@/store/helper/music'
  import { mapGetters as mapUserGetters } from '@/store/helper/user'
  import { requestFullScreen, exitFullscreen, isFullscreen, isDef } from '@/utils'

  export default {
    name: 'Header',
    components: { Routes, UserAvatar },
    data() {
      return {
        activeIndex: '',
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath)
      },
      // 返回首页
      onClickLogo() {
        this.$router.push('/discovery')
      },
      // 收起播放器
      onClickDown() {
        this.setPlayerShow(false)
      },
      // 全屏模式
      fullscreen() {
        requestFullScreen(document.documentElement)
      },
      // 退出全屏
      exitFullscreen() {
        if (isFullscreen()) {
          exitFullscreen()
        }
      },
      toggleFullscreen() {
        this.isFullscreen = !this.isFullscreen
      },
      ...mapMutations(['setPlayerShow']),
    },
    computed: {
      mymusicPath() {
        if (isDef(this.likePlaylistId)) {
          return '/mymusic/playlist/' + this.likePlaylistId
        } else {
          return '/mymusic'
        }
      },

      ...mapState(['isPlayerShow']),
      ...mapUserGetters(['likePlaylistId']),
    },
  }
</script>

<style lang="scss" scoped>
  header {
    width: 100%;
    height: $header-height;
    z-index: $header-z-index !important;
  }

  // header字体大小
  .el-menu {
    &::v-deep .el-menu-item {
      font-size: 13px;
    }
  }

  // Header
  .el-menu {
    display: flex;
    align-items: center;
    border: none;

    a {
      text-decoration: none; // 去除默认的下划线
    }

    // 菜单选项
    .el-menu-item {
      border-bottom: none;

      &:hover {
        color: #ffffff !important;
      }
    }

    // 栏目被选中时的样式
    .el-menu-item.is-active {
      background-color: $theme-hover !important;
    }

    // 网站logo和标题
    .logo {
      min-width: 160px;
      margin-left: 20px;
      margin-right: 50px;
      height: $header-height;
      display: flex;
      align-items: center;
      cursor: pointer;

      .el-image {
        width: 40px;
        height: 40px;
      }

      .img {
        margin-left: 4px;
        height: 21px;
      }
    }

    // 用户栏
    .user {
      display: flex;
      margin-left: auto;
      margin-right: 60px;
    }

    .route {
      display: flex;
      flex-direction: column;

      .route-enter-active,
      .shrink-enter-active {
        transition: all 0.5s;
      }

      .route-leave-active,
      .shrink-leave-active {
        transition: all 0.2s;
      }

      .route-enter {
        opacity: 0;
        transform: translateY(-60px);
      }
      .route-leave-to {
        opacity: 0;
        transform: translateY(-60px);
      }

      .shrink-enter {
        opacity: 0;
        transform: translateY(60px);
      }
      .shrink-leave-to {
        opacity: 0;
        transform: translateY(60px);
      }
    }

    .shrink-player {
      margin-right: 64.9px;
      color: $gray;
    }

    // 路由按钮
    .header-routes {
      margin-right: 30px;
      color: $gray;
    }

    // 最右侧功能区
    .right {
      display: flex;
      justify-self: flex-end;
      margin-bottom: 30px;

      .font-weight {
        white-space: nowrap;
      }

      // 三个按钮的样式
      .buttons {
        display: flex;
        flex: 1;
        text-align: right;
        &:hover {
          .mac-button > i {
            opacity: 1;
          }
        }
        .mac-button {
          @include round(13px);
          @include flex-center;
          margin-right: 8px;
          cursor: pointer;
          &.red {
            background: #df453b;
          }
          &.green {
            background: #78c949;
          }
          &.yellow {
            background: #f8d249;
          }
          i {
            opacity: 0;
            transition: opacity 0.3s;
            color: $black;
            font-weight: $font-weight-bold;
            transform-origin: center center;
          }
        }
      }
    }
  }
</style>
