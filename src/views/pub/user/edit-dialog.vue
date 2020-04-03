<template>
  <el-dialog id="edit-dialog" :title="title" :visible.sync="visable" :lock-scroll="false" center width="60%" top="5.5rem" :close-on-click-modal="false">
    <el-form ref="dataForm" :model="item" :rules="rules" label-width="100px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="用户名:" prop="username">
            <el-input v-model="item.username" placeholder="请输入用户名" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="密码:" prop="password">
            <el-input v-model="item.password" placeholder="请输入密码" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <span slot="footer">
      <el-button type="success" plain @click="submitForm('dataForm')">提交</el-button>
      <el-button type="warning" plain @click="resetForm('dataForm')">取消</el-button>
    </span>
  </el-dialog>
</template>
<script>
import axios from 'axios'
export default {
  props: {
    title: {
      type: String,
      default: 'title'
    }
  },
  data () {
    const validateNumber = (rule, value, callback) => {
      var reg = /^[0-9a-zA-Z]{6,16}$/; // 账号长度必须在6-16之间，且不能包含非法字符*#@
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
      visable: false,
      item: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ required: true, validator: validateNumber, trigger: 'blur' }],
        password: [{ required: true, validator: validatePass, trigger: 'blur' }]
      }
    }
  },
  methods: {
    open (item) {
      this.visable = true
      if (item === undefined || item === null) {
        this.item = {}
      } else {
        this.item = item
        this.getUserById()
      }
    },
    getUserById () {
      axios.get('/sub/userInfo/findUserById?user_id=' + this.item.user_id).then((res) => {
        this.item = res.data.data
      })
    },
    submitForm (dataForm) {
      // console.log('用户提交了信息了')
      // console.log(this.$refs)
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认保存吗？', '询问', {
            cancelButtonText: '取消',
            cancelButtonClass: 'cancelButton',
            confirmButtonText: '确认',
            lockScroll: false,
            type: 'warning'
          }).then(() => {
            // console.log('enter then')
            // console.log(this)
            this.$emit('OnConfirm', this.item)
            this.visable = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    resetForm (dataForm) {
      this.$nextTick(() => {
        this.$refs[dataForm].clearValidate()
      })
      this.visable = false
    }

  }
}
</script>
<style lang="scss" scoped>
</style>
