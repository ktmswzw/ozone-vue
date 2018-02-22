<template>
  <div class="content has-text-centered">
    <p class="is-title">
      <img width="100" src="~assets/logo.png">
    </p>

    <div class="columns is-vcentered">
      <div class="column is-6 is-offset-3">
        <div class="box">
          <el-form :model="ruleForm" :rules="rules" ref="loginForm" label-width="0px">
            <el-form-item prop="phone">
              <el-input name="phone" id="phone" type="text" v-model="ruleForm.phone" autoComplete="on"
                        placeholder="手机号码"></el-input>
            </el-form-item>

            <el-form-item prop="password">
              <el-input name="password" id="password" type="password" v-model="ruleForm.password" autoComplete="on"
                        placeholder="密码"
                        @keyup.enter.native="submitForm('ruleForm')"
              ></el-input>
            </el-form-item>

            <hr>
            <p class="control">
              <button type="button" class="button is-primary" @click="submitForm('ruleForm')">Login</button>
              <button type="button" class="button is-default" @click="goHome()">Go Web</button>
            </p>
          </el-form>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="content footerLogin">
        <p id="copyright">NINGBO LONGFA INDUSTRY & TRADE CO., LTD.</p>.
        <p>&copy; 2008~2017 </p>
      </div>
    </div>

  </div>


</template>

<script>

  import { isPhone } from '../../utils/validate'
  import { notice } from '../../utils/notification'

  export default {
    data () {
      const validateEmail = (rule, value, callback) => {
        if (!isPhone(value)) {
          callback(new Error('请输入手机号码'))
        } else {
          callback()
        }
      }
      const validatePass = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('密码不能小于6位'))
        } else {
          callback()
        }
      }
      return {
        ruleForm: {
          phone: '',
          password: ''
        },
        rules: {
          phone: [
            {required: true, message: '请输入用户名', trigger: 'blur', validator: validateEmail}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur', validator: validatePass}
          ]
        }
      }
    },
    mounted () {
    },
    methods: {
      submitForm () {
        const self = this
        self.$refs.loginForm.validate((valid) => {
          if (valid) {
            self.$store.dispatch('LoginByPhone', this.ruleForm).then(() => {
              self.loading = false
              notice({
                message: '登陆成功'
              })
              self.$router.push({path: '/layout'})
            }).catch(err => {
              console.error(err)
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      goHome () {
        this.$router.push({path: '/'})
      }
    }
  }

</script>

<style lang="scss" scoped>
  .is-title {
    padding-top: 100px;
  }
  .is-vcentered {
    padding: 50px;
  }
  .control{
    text-align: center;
  }
  .footerLogin {
    font-size: smaller;
    bottom: 0px;
  }
</style>
