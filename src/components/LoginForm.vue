<template>
  <div class="user-avatar">
    <el-dialog :modal="false" :visible.sync="visible" title="手机号登录" width="20%">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" status-icon>
        <el-form-item prop="phone">
          <el-input
            @blur="onInputBlur"
            @focus="onInputFocus"
            v-model.number="ruleForm.phone"
            placeholder="请输入中国大陆手机号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            @blur="onInputBlur"
            @focus="onInputFocus"
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            placeholder="请输入密码"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button :loading="loading" type="primary" @click="submitForm('ruleForm')">登录</el-button>
          <el-button type="warning" @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import { confirm } from '@/base/confirm'
  import { mapActions, mapState, mapGetters } from '@/store/helper/user'
  import { mapMutations as mapMusicMutations } from '@/store/helper/music'
  import { notify, isTel } from '@/utils'

  export default {
    name: 'LoginForm',
    data() {
      const checkPhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号'))
        } else if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'))
        } else if (!isTel(value)) {
          callback(new Error('请正确输入中国大陆手机号'))
        } else {
          callback()
        }
      }
      const checkPassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          callback()
        }
      }

      return {
        visible: false,
        loading: false,
        uid: '',
        ruleForm: {
          phone: '',
          password: '',
        },
        rules: {
          phone: [{ validator: checkPhone, trigger: 'blur' }],
          password: [
            { validator: checkPassword, trigger: 'blur' },
            {
              min: 8,
              max: 20,
              message: '密码长度应为8~20位',
              trigger: 'blur',
            },
          ],
        },
      }
    },
    methods: {
      onOpenDialog() {
        this.visible = true
      },
      onCloseDialog() {
        this.visible = false
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.onlogin()
          } else {
            notify.error('登录失败')
            return false
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      async onlogin() {
        this.loading = true
        const success = await this.login(this.ruleForm).finally(() => {
          this.loading = false
        })
        if (success) {
          this.resetForm('ruleForm')
          this.onCloseDialog()
        }
      },
      onInputFocus() {
        this.inputFocus = true
        this.setInputFocus(true)
      },
      onInputBlur() {
        this.inputFocus = false
        this.setInputFocus(false)
      },
      onLogout() {
        confirm('确定要退出登录吗？', () => {
          this.logout()
        })
      },

      ...mapActions(['login', 'loginByUid', 'logout']),
      ...mapMusicMutations(['setInputFocus']),
    },
    computed: {
      ...mapState(['user']),
      ...mapGetters(['isLogin']),
    },
  }
</script>
