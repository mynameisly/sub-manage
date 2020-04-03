<template>
  <el-dialog id="edit-dialog" :title="title" :visible.sync="visable" :lock-scroll="false" center width="60%" top="5.5rem" :close-on-click-modal="false">
    <el-form ref="dataForm" :model="item" :rules="rules" label-width="140px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="竞赛培训时间:" prop="train_time">
            <el-date-picker
              v-model="item.train_time"
              type="datetime"
              placeholder="请输入竞赛培训时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="竞赛培训内容:" prop="train_content">
            <el-input v-model="item.train_content" placeholder="请输入竞赛培训内容" />
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
      item: {},
      form: {
        train_content: '', // 竞赛培训内容
        train_time: '' // 竞赛培训时间
      },
      rules: {
        train_content: [
          { required: true, message: '请输入竞赛培训内容', trigger: 'blur' }
        ],
        train_time: [
          { required: true, message: '请输入竞赛培训时间', trigger: 'blur' }
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
        this.getTrainById()
      }
    },
    getTrainById () {
      axios.get('/sub/train/findTrainById?train_id=' + this.item.train_id).then((res) => {
        this.item = res.data.data
      })
    },
    submitForm (dataForm) {
      // console.log('用户提交了信息了')
      // console.log(this.$refs)
      this.item.train_time = this.formateDate(this.item.train_time)
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
