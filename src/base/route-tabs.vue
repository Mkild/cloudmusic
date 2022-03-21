<template>
  <ul :class="{ [align]: true }" class="tab-wrap">
    <!-- playlist -->
    <template v-if="tabType === 'playlist'">
      <li
        :class="getItemCls(tab, index)"
        :key="tab.id"
        :style="getItemStyle(tab, index)"
        @click="onChangeTabPlaylist(tab)"
        class="tab-item"
        v-for="(tab, index) in tabs"
      >
        <span class="title">{{ tab.title }}</span>
      </li>
    </template>
    <!-- song -->
    <template v-if="tabType === 'song'">
      <li
        :class="getItemCls(tab, index)"
        :key="tab.id"
        :style="getItemStyle(tab, index)"
        @click="onChangeTabSong(tab)"
        class="tab-item"
        v-for="(tab, index) in tabs"
      >
        <span class="title">{{ tab.title }}</span>
      </li>
    </template>
    <!-- mv -->
    <template v-if="tabType === 'mv'">
      <li
        :class="getItemCls(tab, index)"
        :key="tab.id"
        :style="getItemStyle(tab, index)"
        @click="onChangeTabMv(tab)"
        class="tab-item"
        v-for="(tab, index) in tabs"
      >
        <span class="title">{{ tab.title }}</span>
      </li>
    </template>
  </ul>
</template>

<script>
  import { isDef } from '@/utils'

  const ACTIVE_PROP = 'active'
  const ACTIVE_CHANGE = 'tabChange'
  const ROUTE_ACTIVE_CLS = 'active'

  export default {
    name: 'RouteTabs',
    props: {
      [ACTIVE_PROP]: {
        default: '全部',
      },
      // 必须传
      // playlist对应精品歌单
      // mv对应全部MV
      tabType: {
        type: String,
        require: true,
      },
      tabs: {
        type: Array,
        default: () => [],
      },
      align: {
        type: String,
        default: 'left',
      },
      itemStyle: {
        type: Object,
        default: () => ({}),
      },
      activeItemStyle: {
        type: Object,
        default: () => ({}),
      },
      itemClass: {
        type: String,
      },
      activeItemClass: {
        type: String,
      },
      // 不传的话对应大号字体 高亮加粗
      // small对应小号字体 高亮红色
      // split对应小号字体 分割线分隔 高亮背景色变灰文字变红
      type: {
        type: String,
      },
    },
    model: {
      prop: ACTIVE_PROP,
      event: ACTIVE_CHANGE,
    },
    created() {
      this.ROUTE_ACTIVE_CLS = ROUTE_ACTIVE_CLS
    },
    methods: {
      onChangeTabPlaylist(tab) {
        this.$emit(ACTIVE_CHANGE, tab.title)
      },
      onChangeTabSong(tab) {
        this.$emit(ACTIVE_CHANGE, tab.type)
      },
      onChangeTabMv(tab) {
        if (tab.type === 'area') {
          this.$router.push({
            path: '/discovery/mvs',
            query: {
              area: tab.title,
              type: this.$route.query.type,
              order: this.$route.query.order,
            },
          })
        }
        if (tab.type === 'type') {
          this.$router.push({
            path: '/discovery/mvs',
            query: {
              area: this.$route.query.area,
              type: tab.title,
              order: this.$route.query.order,
            },
          })
        }
        if (tab.type === 'sort') {
          this.$router.push({
            path: '/discovery/mvs',
            query: {
              area: this.$route.query.area,
              type: this.$route.query.type,
              order: tab.title,
            },
          })
        }
      },
      isActivePlaylist(tab) {
        const cat = this.$route.query.cat
        if (isDef(cat)) {
          return tab.title === cat
        } else {
          return tab.title === this[ACTIVE_PROP]
        }
      },
      isActiveSong(tab) {
        const type = this.$route.query.type
        if (isDef(type)) {
          return tab.type == type
        } else {
          return tab.type === this[ACTIVE_PROP]
        }
      },
      isActiveMv(tab) {
        if (this.tabType === 'mv') {
          const area = this.$route.query.area
          const type = this.$route.query.type
          const sort = this.$route.query.order
          if (tab.type === 'area') {
            if (isDef(area)) {
              return tab.title === area
            } else {
              return tab.title === '全部'
            }
          }
          if (tab.type === 'type') {
            if (isDef(type)) {
              return tab.title === type
            } else {
              return tab.title === '全部'
            }
          }
          if (tab.type === 'sort') {
            if (isDef(sort)) {
              return tab.title === sort
            } else {
              return tab.title === '上升最快'
            }
          }
        }
      },
      isActive(tab) {
        if (this.tabType === 'playlist') {
          return this.isActivePlaylist(tab)
        }
        if (this.tabType === 'song') {
          return this.isActiveSong(tab)
        }
        if (this.tabType === 'mv') {
          return this.isActiveMv(tab)
        }
      },
      getItemCls(tab, index) {
        let base = []
        if (this.itemClass) {
          base.push(this.itemClass)
        }
        if (this.type) {
          base.push(this.type)
        }
        if (this.isActive(tab, index)) {
          if (this.activeItemClass) {
            base.push(this.activeItemClass)
          }
          base.push('active')
        }
        return base.join(' ')
      },
      getItemStyle(tab, index) {
        return Object.assign(
          {},
          this.itemStyle,
          this.isActive(tab, index) ? Object.assign({}, this.activeItemStyle) : null
        )
      },
    },
  }
</script>

<style lang="scss" scoped>
  .tab-wrap {
    display: flex;

    &.center {
      justify-content: center;
    }

    &.right {
      justify-content: flex-end;
    }

    .tab-item {
      padding: 12px 0;
      margin: 10px 12px;
      color: $tab-item-color;
      font-size: $font-size-lg;
      white-space: nowrap;
      cursor: pointer;

      &.active {
        color: $tab-item-active-color;

        &:hover {
          color: $tab-item-active-color;
        }
      }

      // 对应prop中的type字段
      &.small {
        display: inline-block;
        @include flex-center();
        font-size: $font-size-medium-sm;
        font-weight: normal;
        height: 13px;
        line-height: 13px;
        padding: 10px 8px;

        &.active {
          color: $theme-color;
          background: $light-theme-bgcolor;
          border-radius: 10px;
        }
      }

      &.theme {
        font-size: 16px;
        color: $font-color;

        &.active {
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

      &.bolder {
        font-size: 16px;
        color: $font-color;

        &.active {
          font-weight: bolder;
        }
      }

      &.split {
        font-size: $font-size-sm;
        padding: 4px 12px;
        margin: 0 16px;
        border-radius: 999em;

        &.active {
          color: $theme-color;
          background: $light-theme-bgcolor;
        }

        &:not(:last-child) {
          &::after {
            position: relative;
            left: 28px;
            width: 1px;
            height: 100%;
            background: $border-color;
            display: inline-block;
            vertical-align: middle;
            content: ' ';
          }

          .title {
            vertical-align: middle;
          }
        }
      }

      &:hover {
        color: #000000;
      }
    }
  }
</style>
