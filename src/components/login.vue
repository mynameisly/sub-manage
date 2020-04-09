<template>
  <div id="particlesId">
    <h1 class="title">四川工商学院科研管理系统</h1>
    <div class="login-warp">
      <el-form :model="loginForm">
        <el-form-item prop="username" label="用户名：">
          <i class="el-icon-user"></i>
          <el-input
            v-model="loginForm.username"
            placeholder="用户名长度必须在6-16之间，且不能包含非法字符*#@" />
        </el-form-item>
        <el-form-item prop="password"  label="密码：">
          <i class="el-icon-key"></i>
          <el-input
            v-model="loginForm.password"
            show-password
            placeholder="密码长度必须在6-16之间，且必须包含数字和字母" />
        </el-form-item>
        <el-form-item prop="checkcode" label="验证码：">
          <i class="el-icon-folder-checked"></i>
          <el-input
            v-model="loginForm.checkcode"
            placeholder="请输入验证码"
            @keydown.enter.native="login('loginForm')">
          </el-input>
          <span class="checkcode" @click="createCode">{{ ckcode }}</span>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login('loginForm')">登录</el-button>
        </el-form-item>
        <div class="login-foot">
          <a @click="go" class="pwd">立即注册</a>
          <a href="" class="pwd">忘记密码？</a>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import particlesConfig from '@/assets/particleConfig.json'
import apis from '../apis/apis';
export default {
    name: 'login',
    data() {
        const validateNumber = (rule, value, callback) => {
        var reg = /^[0-9a-zA-Z]{6,16}$/ // 账号长度必须在6-16之间，且不能包含非法字符*#@
        if (value === '' || value === undefined) {
          callback(new Error('请输入用户名'))
        } else if (value.length < 6 || value.length > 18) {
          callback(new Error('用户名长度必须在6-16之间'))
        } else if (value.indexOf('*') > 0 || value.indexOf('#') > 0 || value.indexOf('@') > 0) {
          callback(new Error('用户名不能含有非法字符*#@'))
        } else {
          if (reg.test(value)) {
            callback()
          }
        }
      }
      const validatePass = (rule, value, callback) => {
        var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9a-zA-Z]{6,}$/ // 密码长度必须在6-16之间，且必须包含数字和字母
        if (value === '' || value === undefined) {
          callback(new Error('请输入密码'))
        } else if (value.length < 6 || value.length > 18) {
          callback(new Error('密码长度必须在6-16之间'))
        } else if (/^[a-z]+$/.test(value) || /^[0-9]+$/.test(value)) {
          callback(new Error('密码必须同时包含数字和字母'))
        } else {
          if (reg.test(value)) {
            callback()
          }
        }
      }
      return {
        loginForm: {
          username: '',
          password: '',
          checkcode: ''
        },
        ckcode: '',
        rules: {
          username: [{ required: true, validator: validateNumber, trigger: 'blur' }],
          password: [{ required: true, validator: validatePass, trigger: 'blur' }],
          checkcode: [{ require: true, message: '请输入验证码', trigger: 'blur' }]
        }
      }
    },
    mounted() {
      this.init()
      this.createCode()
        // document.onkeydown = (event) => {
        //     var router=this.$route.path;
        //     var e = event || window.event || arguments.callee.caller.arguments[0];
        //     if (e && e.keyCode == 13&&this.$route.path=='/login') { // enter 键 
        //         this.login();
        //     }
        // };
        //  var loginLog = {
        //         ip: returnCitySN["cip"],
        //         city: returnCitySN["cname"] + '-' + '进入首页'
        //     };

        //     apis.shiroApi.loginLog(loginLog);
    },
    methods: {
      go() {
        this.$router.push({path: 'register'})
      },
      init () {
        particlesJS('particlesId', particlesConfig)
      },
      createCode () { // 前端生成验证码
        let code = ''
        let codeLength = 4 // 验证码的长度
        let random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z') // 随机数
        for (let i = 0; i < codeLength; i++) { // 循环操作
          let index = Math.floor(Math.random() * 36) // 取得随机数的索引（0~35）
          code += random[index] // 根据索引取得随机数加到code上
        }
        this.ckcode = code // 把code值赋给验证码
      },
      login() {
        const username = this.loginForm.username
        const password = this.loginForm.password
        // 验证成功后发送请求，返回的数据就是information学籍信息
        axios.get('/sub/userInfo/login?username=' + username + '&password=' + password).then(res => {
          console.log(' login success')
          console.log(res.data)
          console.log(res.data.data)
          if (res.data.code === 200) {
            this.$message({
              type: 'success',
              message: '登录成功'
            })
            this.$router.push({path: '/index'})
            // const user = res.data.userInfo.username
            sessionStorage.setItem('username', this.loginForm.username)
            // this.setUser({ user })
            //存入菜单,渲染菜单
            this.$store.dispatch("add_Menus",json.data.sysMenuVoList);
              //动态设置路由
            this.$store.dispatch("add_Routes", json.data.sysMenuVoList);
            //存储按钮权限
            this.$store.dispatch("add_Permissions", json.data.rolePermissionVoList);
            this.$router.replace({ path: "/index" });
          } else if (res.data.msg === '密码错误') {
            this.$message({
              type: 'warning',
              message: '登录失败，密码错误'
            })
          } else {
            this.$message({
              type: 'warning',
              message: '登录失败，用户名或密码错误'
            })
          }
        })
      }
    }
}
</script>

<style lang="scss" scoped>
#particlesId{
  width: 100%;
  min-height: 100vh;
  display: flex;
  background-color: #000000;
}
.particles-js-canvas-el{
  height: 100vh!important;
}
#particlesId .title{
  position: absolute;
  left: 50%;
  top: 12%;
  transform: translate(-50%, -50%);
  color: #fff;
}
.login-warp{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 50px 0;
  padding-right: 30px;
  width: 450px;
  color: #fff;
  background-color: rgba(49,143,254,.4);
  border-radius: 5px;
  box-shadow: 0px 0px 5px lavenderblush;
}
.el-button{
  width: 90%;
  margin-left: 45px;
  font-size: 14px;
  padding: 10px 0;
}
.el-icon-user, .el-icon-key, .el-icon-folder-checked{
  color: #fff;
  font-size: 35px;
  padding: 0 5px;
}
.checkcode{
  color: #fff;
}
.login-foot{
  display: flex;
  justify-content: space-between;
  margin-left: 45px;
}
.login-foot a{
  color: #fff;
  text-decoration: none;
}
</style>

<style lang="">
.el-form-item__content{
  display: flex;
  margin-bottom: 15px;
}
.el-form-item__label {
  color: #fff!important;
  padding: 0 15px!important;
}
</style>
