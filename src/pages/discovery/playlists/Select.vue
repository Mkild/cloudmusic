<template>
  <div class="select">
    <div @click.stop="toggleSelectList" class="button">{{ activeButtonTitle }} <Icon type="forward" /></div>

    <div v-show="isSelectListShow" class="select-list">
      <div class="header">
        <div @click="onChangeTab(all)" :class="getItemCls(all)" class="header-tab">全部歌单</div>
      </div>
      <div class="content">
        <!-- 语种 -->
        <div class="category">
          <div class="label">
            <div class="text">
              <Icon class="icon" type="earth" color="grey" :size="24" />
              &nbsp;<span class="title">语种</span>
            </div>
          </div>
          <div class="tabs">
            <li v-for="tab in languages" :key="tab.id" @click="onChangeTab(tab)">
              <span :class="getItemCls(tab)" class="title">{{ tab.title }}</span>
            </li>
          </div>
        </div>
        <!-- 风格 -->
        <div class="category">
          <div class="label">
            <div class="text">
              <Icon class="icon" type="piano" color="grey" :size="24" />
              &nbsp;<span class="title">风格</span>
            </div>
          </div>
          <div class="tabs">
            <li v-for="tab in styles" :key="tab.id" @click="onChangeTab(tab)">
              <span :class="getItemCls(tab)" class="title">{{ tab.title }}</span>
            </li>
          </div>
        </div>
        <!-- 场景 -->
        <div class="category">
          <div class="label">
            <div class="text">
              <Icon class="icon" type="tea" color="grey" :size="24" />
              &nbsp;<span class="title">场景</span>
            </div>
          </div>
          <div class="tabs">
            <li v-for="tab in scenes" :key="tab.id" @click="onChangeTab(tab)">
              <span :class="getItemCls(tab)" class="title">{{ tab.title }}</span>
            </li>
          </div>
        </div>
        <!-- 情感 -->
        <div class="category">
          <div class="label">
            <div class="text">
              <Icon class="icon" type="smile" color="grey" :size="24" />
              &nbsp;<span class="title">情感</span>
            </div>
          </div>
          <div class="tabs">
            <li v-for="tab in emotions" :key="tab.id" @click="onChangeTab(tab)">
              <span :class="getItemCls(tab)" class="title">{{ tab.title }}</span>
            </li>
          </div>
        </div>
        <!-- 主题 -->
        <div class="category">
          <div class="label">
            <div class="text">
              <Icon class="icon" type="type_theme" color="grey" :size="24" />
              &nbsp;<span class="title">主题</span>
            </div>
          </div>
          <div class="tabs">
            <li v-for="tab in themes" :key="tab.id" @click="onChangeTab(tab)">
              <span :class="getItemCls(tab)" class="title">{{ tab.title }}</span>
            </li>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { isDef } from '@/utils'

  const ACTIVE_PROP = 'active'
  const ACTIVE_CHANGE = 'tabChange'

  export default {
    name: 'Select',
    props: {
      [ACTIVE_PROP]: {
        type: String,
        default: '全部',
      },
    },
    model: {
      prop: ACTIVE_PROP,
      event: ACTIVE_CHANGE,
    },
    beforeDestroy() {
      document.removeEventListener('click', this.handleClick)
    },
    data() {
      return {
        activeButtonTitle: '全部歌单',
        isSelectListShow: false,
        all: { id: 0, title: '全部', buttonTitle: '全部歌单' },
        languages: [
          { id: 1, title: '华语', buttonTitle: '华语' },
          { id: 2, title: '欧美', buttonTitle: '欧美' },
          { id: 3, title: '日语', buttonTitle: '日语' },
          { id: 4, title: '韩语', buttonTitle: '韩语' },
          { id: 5, title: '粤语', buttonTitle: '粤语' },
        ],
        styles: [
          { id: 6, title: '流行', buttonTitle: '流行' },
          { id: 7, title: '摇滚', buttonTitle: '摇滚' },
          { id: 8, title: '民谣', buttonTitle: '民谣' },
          { id: 9, title: '电子', buttonTitle: '电子' },
          { id: 10, title: '舞曲', buttonTitle: '舞曲' },
          { id: 11, title: '说唱', buttonTitle: '说唱' },
          { id: 12, title: '轻音乐', buttonTitle: '轻音乐' },
          { id: 13, title: '爵士', buttonTitle: '爵士' },
          { id: 14, title: '乡村', buttonTitle: '乡村' },
          { id: 15, title: 'R&B/Soul', buttonTitle: 'R&B/Soul' },
          { id: 16, title: '古典', buttonTitle: '古典' },
          { id: 17, title: '民族', buttonTitle: '民族' },
          { id: 18, title: '英伦', buttonTitle: '英伦' },
          { id: 19, title: '金属', buttonTitle: '金属' },
          { id: 20, title: '蓝调', buttonTitle: '蓝调' },
          { id: 21, title: '雷鬼', buttonTitle: '雷鬼' },
          { id: 22, title: '世界音乐', buttonTitle: '世界音乐' },
          { id: 23, title: '拉丁', buttonTitle: '拉丁' },
          { id: 24, title: 'New Age', buttonTitle: 'New Age' },
          { id: 25, title: '古风', buttonTitle: '古风' },
          { id: 26, title: 'Bossa Nova', buttonTitle: 'Bossa' },
        ],
        scenes: [
          { id: 27, title: '清晨', buttonTitle: '清晨' },
          { id: 28, title: '夜晚', buttonTitle: '夜晚' },
          { id: 29, title: '学习', buttonTitle: '学习' },
          { id: 30, title: '工作', buttonTitle: '工作' },
          { id: 31, title: '午休', buttonTitle: '午休' },
          { id: 32, title: '下午茶', buttonTitle: '下午茶' },
          { id: 33, title: '地铁', buttonTitle: '地铁' },
          { id: 34, title: '驾车', buttonTitle: '驾车' },
          { id: 35, title: '运动', buttonTitle: '运动' },
          { id: 36, title: '旅行', buttonTitle: '旅行' },
          { id: 37, title: '散步', buttonTitle: '散步' },
          { id: 38, title: '酒吧', buttonTitle: '酒吧' },
        ],
        emotions: [
          { id: 39, title: '怀旧', buttonTitle: '怀旧' },
          { id: 40, title: '浪漫', buttonTitle: '浪漫' },
          { id: 41, title: '清新', buttonTitle: '清新' },
          { id: 42, title: '伤感', buttonTitle: '伤感' },
          { id: 43, title: '治愈', buttonTitle: '治愈' },
          { id: 44, title: '放松', buttonTitle: '放松' },
          { id: 45, title: '孤独', buttonTitle: '孤独' },
          { id: 46, title: '感动', buttonTitle: '感动' },
          { id: 47, title: '兴奋', buttonTitle: '兴奋' },
          { id: 48, title: '快乐', buttonTitle: '快乐' },
          { id: 49, title: '安静', buttonTitle: '安静' },
          { id: 50, title: '思念', buttonTitle: '思念' },
        ],
        themes: [
          { id: 51, title: '综艺', buttonTitle: '综艺' },
          { id: 52, title: '影视原声', buttonTitle: '影视原声' },
          { id: 53, title: 'ACG', buttonTitle: 'ACG' },
          { id: 54, title: '儿童', buttonTitle: '儿童' },
          { id: 55, title: '校园', buttonTitle: '校园' },
          { id: 56, title: '游戏', buttonTitle: '游戏' },
          { id: 57, title: '70后', buttonTitle: '70后' },
          { id: 58, title: '80后', buttonTitle: '80后' },
          { id: 59, title: '90后', buttonTitle: '90后' },
          { id: 60, title: '网络歌曲', buttonTitle: '网络歌曲' },
          { id: 61, title: 'KTV', buttonTitle: 'KTV' },
          { id: 62, title: '经典', buttonTitle: '经典' },
          { id: 63, title: '翻唱', buttonTitle: '翻唱' },
          { id: 64, title: '吉他', buttonTitle: '吉他' },
          { id: 65, title: '钢琴', buttonTitle: '钢琴' },
          { id: 66, title: '器乐', buttonTitle: '器乐' },
          { id: 67, title: '榜单', buttonTitle: '榜单' },
          { id: 68, title: '00后', buttonTitle: '00后' },
        ],
      }
    },
    methods: {
      handleClick(e) {
        const SelectList = document.getElementsByClassName('select-list')[0]
        if (SelectList) {
          // 当点击到SelectList元素以外的区域时
          if (!SelectList.contains(e.target)) {
            this.isSelectListShow = false
          }
        }
      },
      toggleSelectList() {
        this.isSelectListShow = !this.isSelectListShow
        if (this.isSelectListShow) {
          document.addEventListener('click', this.handleClick)
        }
      },
      onChangeTab(tab) {
        this.$emit(ACTIVE_CHANGE, tab.title)
        this.isSelectListShow = false
      },
      isActive(tab) {
        const cat = this.$route.query.cat
        if (isDef(cat)) {
          return tab.title === cat
        } else {
          return tab.title === this[ACTIVE_PROP]
        }
      },
      getItemCls(tab) {
        let base = []
        if (this.isActive(tab)) {
          base.push('active')
          this.activeButtonTitle = tab.buttonTitle
        }
        return base
      },
    },
    watch: {
      isSelectListShow(show) {
        if (!show) {
          document.removeEventListener('click', this.handleClick)
        }
      },
    },
  }
</script>

<style lang="scss">
  .select {
    z-index: $select-z-index;

    .button {
      min-width: 110px;
      text-align: center;
      white-space: nowrap;
      padding: 6px 12px;
      margin-bottom: 16px;
      border: 1px solid #cecece;
      border-radius: 25px;
      cursor: pointer;
      user-select: none;

      &:hover {
        background: #f0f0f0;
      }
    }
  }

  .select-list {
    position: absolute;
    top: 50px;
    background: #ffffff;
    @include box-shadow;
    border-radius: 4px;

    .header {
      border-bottom: 1px solid $border-color;

      .header-tab {
        width: 90px;
        text-align: center;
        padding: 6px 0px;
        margin: 10px 16px;
        border-radius: 25px;
        cursor: pointer;
        user-select: none;

        &.active {
          color: $theme-color;
          background: #f3e9ff;
        }

        &:hover {
          color: $theme-color;
        }
      }
    }

    .content {
      margin-top: 10px;

      .category {
        display: flex;
        align-items: flex-start;
        margin-bottom: 20px;

        .label {
          display: inline-block;
          width: 120px;
          padding: 6px 16px;

          .text {
            display: flex;
            align-items: center;

            .icon {
              cursor: default;
            }

            .title {
              color: #d8d4d4;
            }
          }
        }

        .tabs {
          display: inline-block;
          width: 600px;

          li {
            display: inline-block;
            width: 100px;
            margin: 8px 0;
            cursor: pointer;

            &:hover {
              color: $theme-color;
            }
          }

          .title {
            display: inline-block;
            text-align: center;
            padding: 4px 6px;
            border-radius: 11px;
            user-select: none;

            &.active {
              color: $theme-color;
              background: #f3e9ff;
            }
          }
        }
      }
    }
  }
</style>
