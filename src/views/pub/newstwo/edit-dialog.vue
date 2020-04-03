<template>
  <el-dialog id="edit-dialog" :title="title" :visible.sync="visable" :lock-scroll="false" center width="60%" top="5.5rem" :close-on-click-modal="false">
    <el-form ref="dataForm" :model="item" :rules="rules" label-width="120px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="新闻时间:" prop="newstwo_time">
            <el-date-picker
              v-model="item.newstwo_time"
              type="datetime"
              placeholder="请输入新闻时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="新闻内容:" prop="newstwo_content">
            <el-input type='textarea' v-model="item.newstwo_content" placeholder="请输入新闻内容" />
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
import { formateDate } from '@/utils/formateDate.js'
export default {
  props: {
    title: {
      type: String,
      default: 'title'
    }
  },
  data () {
    return {
      visable: false,
      item: {
        newstwo_time: '',
        newstwo_content: ''
      },
      rules: {
        newstwo_time: [
          { required: true, message: '请输入新闻时间', trigger: 'blur' }
        ],
        newstwo_content: [
          { required: true, message: '请输入新闻内容', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    formateDate,
    open (item) {
      this.visable = true
      if (item === undefined || item === null) {
        this.item = {}
      } else {
        this.item = item
        this.getNewsTwoById()
      }
    },
    getNewsTwoById () {
      axios.get('/sub/newTwo/findNewsTwoById?newstwo_id=' + this.item.newstwo_id).then((res) => {
        this.item = res.data.data
      })
    },
    submitForm (dataForm) {
      // console.log('用户提交了信息了')
      this.item.newstwo_time = this.formateDate(this.item.newstwo_time)
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
            this.visable = false// 关闭dialog弹窗后重置form，不能在这里重置，函数执行完之后才把数据添加的父元素table中
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
