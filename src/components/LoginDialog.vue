<template>
  <div class="user-avatar">
    <el-dialog :modal="false" :visible.sync="visible" :title="title" width="25%">
      <div class="qrForm" v-if="isQrLogin">
        <div class="content">
          <img
            class="phone-qr"
            src="https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/9643571155/525c/faac/2dc6/fe695c03c7c358ddaa4651736b26a55f.png"
            alt="扫码登录"
          />
          <div class="right">
            <h2 class="title">扫码登录</h2>
            <QrCode class="qrcode" :value="qrUrl" :size="120" level="H" />
            <span class="text">使用<router-link class="link" to="/download"> 网易云音乐APP </router-link>扫码登录</span>
          </div>
        </div>
        <NButton class="button" @click="usePhoneLogin">使用手机号登录</NButton>
      </div>
      <template v-else>
        <el-form class="login-form" ref="ruleForm" :model="ruleForm" :rules="rules" status-icon>
          <el-form-item prop="phone">
            <el-input
              @blur="onInputBlur"
              @focus="onInputFocus"
              v-model.number="ruleForm.phone"
              placeholder="请输入中国大陆手机号"
              :maxlength="11"
            />
          </el-form-item>
          <template v-if="isCodeLogin">
            <el-form-item prop="code">
              <el-input
                class="input-code"
                @blur="onInputBlur"
                @focus="onInputFocus"
                v-model="ruleForm.code"
                autocomplete="off"
                :maxlength="4"
                placeholder="请输入验证码"
              />
              <span v-if="flag" class="get-code" @click="getCode" :class="{ active: ruleForm.phone }">获取验证码</span>
              <span v-else class="get-code">重新获取({{ second }}S)</span>
            </el-form-item>
            <span v-if="isCodeLogin" class="login-type" @click="changeLoginType">密码登录</span>
          </template>
          <template v-else>
            <el-form-item prop="password">
              <el-input
                @blur="onInputBlur"
                @focus="onInputFocus"
                type="password"
                v-model="ruleForm.password"
                autocomplete="off"
                placeholder="请输入密码"
                show-password
              />
            </el-form-item>
            <span class="login-type" @click="changeLoginType">验证码登录</span>
          </template>
          <el-form-item>
            <el-button :loading="loading" type="primary" @click="submitForm()">登录</el-button>
            <el-button type="warning" @click="resetForm()">重置</el-button>
          </el-form-item>
        </el-form>
        <img
          class="qr-login"
          src="https://p6.music.126.net/obj/wo3DlcOGw6DClTvDisK1/9656441793/9f07/c197/3af2/f07b8d6ef20964be159ce812841fc9d2.png"
          alt="二维码登录"
          @click="useQrLogin"
        />
      </template>
    </el-dialog>
  </div>
</template>

<script>
  import QrCode from 'qrcode.vue'
  import { confirm } from '@/base/confirm'
  import { mapActions, mapState, mapGetters } from '@/store/helper/user'
  import { mapMutations as mapMusicMutations } from '@/store/helper/music'
  import { verifyPhone, sentLoginCaptcha, getQrKey, getQr } from '@/api'
  import { notify, isTel, isCode } from '@/utils'

  export default {
    name: 'LoginDialog',
    components: { QrCode },
    beforeDestroy() {
      this.timer = null
      clearInterval(this.timer)
    },
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
      const checkCode = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入验证码'))
        } else if (!isCode(value)) {
          callback(new Error('请输入正确的验证码'))
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
        title: '二维码登录',
        visible: false,
        loading: false,
        // 是否为二维码登录
        isQrLogin: true,
        // 是否为验证码登录
        isCodeLogin: true,
        qrKey: '',
        qrUrl: '',
        timer: null,
        flag: true,
        second: 59,
        ruleForm: {
          phone: '',
          code: '',
          password: '',
        },
        rules: {
          phone: [{ validator: checkPhone, trigger: 'blur' }],
          code: [
            { validator: checkCode, trigger: 'blur' },
            {
              min: 1,
              max: 4,
              message: '验证码错误',
              trigger: 'blur',
            },
          ],
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
      async createQr() {
        const error = (msg = '网络请求失败') => {
          notify.error(msg)
          return
        }

        try {
          const keyRes = await getQrKey()
          if (keyRes.code === 200) {
            this.qrKey = keyRes.data.unikey
          } else {
            return error('获取验证码失败')
          }
          if (!this.qrKey) return
          const qrRes = await getQr(this.qrKey)
          if (qrRes.code === 200) {
            this.qrUrl = qrRes.data.qrurl
          } else {
            return error('获取验证码失败')
          }
        } catch (error) {
          error()
        }
      },
      qrLogin() {
        this.timer = setInterval(async () => {
          const success = await this.loginByQr(this.qrKey)
          if (success === true || success === false) {
            clearInterval(this.timer)
            this.onCloseDialog()
          }
        }, 3000)
      },
      usePhoneLogin() {
        clearInterval(this.timer)
        this.title = '手机号登录'
        this.isQrLogin = false
      },
      useQrLogin() {
        this.createQr()
        this.qrLogin()
        this.title = '二维码登录'
        this.isQrLogin = true
      },
      // 切换登录方式
      changeLoginType() {
        this.ruleForm.code = ''
        this.ruleForm.password = ''
        // 移除表单项的校验结果
        this.$refs.ruleForm.clearValidate(['code', 'password'])
        this.isCodeLogin = !this.isCodeLogin
      },
      // 校验手机号是否注册
      async checkPhone(phone) {
        try {
          const res = await verifyPhone(phone)
          if (res.exist !== 1) {
            notify.error('该手机号尚未注册')
          } else {
            return true
          }
        } catch (err) {
          notify.error('网络请求失败')
        }
        return false
      },
      submitForm() {
        this.$refs.ruleForm.validate(async (valid) => {
          if (valid) {
            const isPhoneExist = await this.checkPhone(this.ruleForm.phone)
            if (isPhoneExist) this.onlogin()
          } else {
            notify.error('登录失败')
            return false
          }
        })
      },
      resetForm() {
        this.$refs.ruleForm.resetFields()
      },
      async onlogin() {
        this.loading = true
        const success = await this.login(this.ruleForm, this.isCodeLogin).finally(() => {
          this.loading = false
        })
        if (success) {
          this.resetForm()
          this.onCloseDialog()
        }
      },
      async getCode() {
        const phone = this.ruleForm.phone
        if (!phone) return
        if (!isTel(phone)) {
          notify.error('请输入正确的手机号')
          return
        }

        // 校验手机号是否注册
        const isPhoneExist = await this.checkPhone(phone)
        if (!isPhoneExist) return

        this.flag = false // 验证码发送失败时再赋值为false
        const codeInterval = setInterval(() => {
          if (this.second-- <= 1) {
            this.second = 59
            this.flag = true
            clearInterval(codeInterval)
          }
        }, 1000)
        // 发送验证码
        sentLoginCaptcha(phone)
          .then((res) => {
            if (res.code === 200) {
              notify.success('验证码发送成功')
            } else {
              clearInterval(codeInterval)
              this.flag = true
              notify.error(res.message)
            }
          })
          .catch(() => {
            clearInterval(codeInterval)
            this.flag = true
            notify.error('网络请求失败')
          })
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

      ...mapActions(['login', 'loginByQr', 'loginByUid', 'logout']),
      ...mapMusicMutations(['setInputFocus']),
    },
    computed: {
      ...mapState(['user']),
      ...mapGetters(['isLogin']),
    },
    watch: {
      visible(newValue) {
        if (newValue) {
          this.createQr()
          this.qrLogin()
        } else {
          clearInterval(this.timer)
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .qrForm {
    display: flex;
    flex-direction: column;
    padding: 0 20px;

    .button {
      border-radius: 20px;
      margin-top: 20px;
    }

    .content {
      display: flex;

      .phone-qr {
        width: 125px;
        height: 220px;
      }

      .right {
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;

        .title {
          font-size: 16px;
        }

        .qrcode {
          margin: 20px auto;
        }

        .text {
          font-size: 12px;

          .link {
            color: $blue;
            cursor: pointer;
            text-decoration: none;

            &:hover {
              color: $blue-hover;
            }
          }
        }
      }
    }
  }

  .login-form {
    padding: 0 20px;

    .login-type {
      display: inline-block;
      margin-bottom: 20px;
      color: $blue;
      font-size: $font-size-medium-sm;
      cursor: pointer;

      &:hover {
        color: $blue-hover;
        text-decoration: underline;
      }
    }

    .input-code {
      width: 170px;
    }

    .get-code {
      display: inline-block;
      cursor: pointer;
      position: absolute;
      top: 3px;
      right: 0;
      width: 140px;
      height: 26px;
      line-height: 26px;
      text-align: center;
      color: $white;
      border-radius: 25px;
      background-color: #d3d3d3;
      font-size: $font-size-medium-sm;

      &.active {
        color: #ffffff;
        background-color: $button-hover-bgcolor;
      }
    }
  }

  .qr-login {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 60px;
    height: 60px;
    cursor: pointer;
  }
</style>
