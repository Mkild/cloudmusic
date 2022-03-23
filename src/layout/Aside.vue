<template>
  <div class="menu">
    <div class="menu-wrap" ref="menu">
      <div :key="index" class="menu-block" v-for="(menu, index) in menusWithPlaylist">
        <p class="menu-block-title" v-if="menu.title">
          {{ menu.title }}
          <template v-if="index === 1">
            <Icon v-show="!isList1Fold" type="arrowdownb" :size="12" @click="foldMenu('list' + index)" />
            <Icon v-show="isList1Fold" type="arrowleftb" :size="12" @click="expandMenu('list' + index)" />
          </template>
          <template v-if="index === 2">
            <Icon v-show="!isList2Fold" type="arrowdownb" :size="12" @click="foldMenu('list' + index)" />
            <Icon v-show="isList2Fold" type="arrowleftb" :size="12" @click="expandMenu('list' + index)" />
          </template>
        </p>
        <ul class="menu-list" :id="'list' + index">
          <router-link
            :key="index"
            :to="item.path"
            active-class="menu-item-active"
            custom
            v-slot="{ isActive, navigate }"
            v-for="(item, index) in menu.children"
          >
            <li :class="['menu-item', isActive ? 'menu-item-active' : '']" @click="navigate">
              <Icon :size="16" :type="item.meta.icon" class="iconfont" />
              <span class="menu-title">{{ item.meta.title }}</span>
            </li>
          </router-link>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapMutations } from '@/store/helper/user'
  import { menuRoutes } from '@/router'

  export default {
    name: 'Aside',
    activated() {
      // 页面进入时设置滚动高度
      this.$refs.menu.scrollTop = this.offsetTop
    },
    beforeRouteLeave(to, from, next) {
      // 组件离开时，保存页面滚动高度
      this.offsetTop = this.$refs.menu.scrollTop
      if (this.isLogin) {
        this.setNowPlaylistId(this.$route.params.id)
      }
      next()
    },
    data() {
      return {
        isList1Fold: false,
        isList2Fold: false,
        menus: [
          {
            type: 'root',
            children: menuRoutes,
          },
        ],
      }
    },
    methods: {
      // 折叠菜单
      foldMenu(domId) {
        if (domId) {
          switch (domId) {
            case 'list1':
              this.isList1Fold = true
              break
            case 'list2':
              this.isList2Fold = true
              break
            default:
              break
          }
          document.getElementById(domId).style.display = 'none'
        }
      },
      // 展开菜单
      expandMenu(domId) {
        if (domId) {
          switch (domId) {
            case 'list1':
              this.isList1Fold = false
              break
            case 'list2':
              this.isList2Fold = false
              break
            default:
              break
          }
          document.getElementById(domId).style.display = 'block'
        }
      },

      ...mapMutations(['setNowPlaylistId']),
    },
    computed: {
      // 组合登录后的歌单
      menusWithPlaylist() {
        return this.isLogin && this.userMenus.length ? this.menus.concat(this.userMenus) : this.menus
      },
      ...mapState(['userPlaylist']),
      ...mapGetters(['isLogin', 'userMenus']),
    },
  }
</script>

<style lang="scss" scoped>
  .menu {
    width: $aside-width;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: $white;
    border-right: 1px solid #d3d3d3;

    .menu-wrap {
      flex: 1;
      overflow: hidden;
      overflow-y: auto;

      .menu-block {
        margin-top: 16px;
        margin-bottom: 16px;

        .menu-block-title {
          font-size: $font-size-medium-sm;
          color: $font-color-grey2;
          padding-left: 16px;
          margin-bottom: 8px;
        }

        .menu-list {
          padding-left: 12px;
          padding-right: 4px;
          .menu-item {
            @include text-ellipsis;
            padding: 12px 18px;
            border-radius: 4px;
            cursor: pointer;

            &:hover {
              color: $black;
              background: $gray;

              i {
                color: $black;
              }
            }

            &-active {
              color: $black;
              background: $gray;

              i {
                color: $black;
              }
            }

            .iconfont {
              font-size: $font-size;
            }

            .menu-title {
              font-size: $font-size;
              margin-left: 8px;
            }
          }
        }
      }
    }

    // 滚动条
    ::-webkit-scrollbar-track {
      background-color: transparent;
    }

    ::-webkit-scrollbar {
      width: 6px;
      height: 12px;
    }

    ::-webkit-scrollbar-thumb {
      background-color: rgba(50, 50, 50, 0.25);
      border-radius: 10px;
      background-clip: padding-box;
      visibility: hidden;

      &:hover {
        background-color: rgba(50, 50, 50, 0.445);
      }
    }

    &:hover {
      ::-webkit-scrollbar-thumb {
        visibility: initial;
      }
    }
  }
</style>
