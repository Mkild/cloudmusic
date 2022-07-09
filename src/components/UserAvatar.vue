<template>
  <div class="user-avatar">
    <div class="user">
      <div v-if="!isLogin" class="avatar" @click="openDialog">
        <el-avatar><Icon type="avatar" :size="28" /></el-avatar>
        <span class="username">未登录</span>
        <Icon type="arrowdownb" :size="12" />
      </div>
      <el-dropdown v-else size="large" trigger="click">
        <div class="avatar">
          <el-avatar :src="user.avatarUrl"></el-avatar>
          <span class="username">{{ user.nickname }}</span>
          <Icon type="arrowdownb" :size="12" />
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-avatar-menu">
            <el-dropdown-item>我的主页</el-dropdown-item>
            <el-dropdown-item @click.native="onLogout" divided>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
  import { confirm } from '@/base/confirm'
  import { mapActions, mapState, mapGetters } from '@/store/helper/user'
  import storage from 'good-storage'
  import { UID_KEY, VISITOR_COOKIE_KEY, isDef, isUndef } from '@/utils'

  export default {
    name: 'UserAvatar',
    // 自动登录
    created() {
      const uid = storage.get(UID_KEY)
      if (isDef(uid)) {
        this.autoLogin(uid)
        return
      }
      const visitorCookie = storage.get(VISITOR_COOKIE_KEY)
      if (isUndef(visitorCookie)) {
        this.loginForVisitor()
      }
    },
    data() {
      return {
        loading: false,
      }
    },
    methods: {
      openDialog() {
        this.openLoginDialog()
      },
      async autoLogin(uid) {
        this.loading = true
        const success = await this.loginByUid(uid).finally(() => {
          this.loading = false
        })
        if (success) {
          this.closeLoginDialog()
        }
      },
      onLogout() {
        confirm('确定要退出登录吗？', () => {
          this.logout()
        })
      },

      ...mapActions(['loginForVisitor', 'loginByUid', 'logout']),
    },
    computed: {
      ...mapState(['user']),
      ...mapGetters(['isLogin']),
    },
  }
</script>

<style lang="scss" scoped>
  .user {
    display: flex;
    align-items: center;
    color: $font-color-white;
    cursor: pointer;
    user-select: none;

    .avatar {
      display: flex;
      align-items: center;
      color: $font-color-white;

      .el-avatar {
        display: inline-block;
      }
      .username {
        font-size: 13px;
        margin: 4px;
        @include text-ellipsis;
      }

      &:hover {
        color: #ffffff;
      }
    }
  }
</style>
