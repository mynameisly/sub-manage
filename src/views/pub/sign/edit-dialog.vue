<template>
  <el-dialog id="edit-dialog" :title="title" :visible.sync="visable" :lock-scroll="false" center width="60%" top="5.5rem" :close-on-click-modal="false">
    <el-form ref="dataForm" :model="item" :rules="rules" label-width="140px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="比赛图片:" prop="sign_img">
            <el-input v-model="item.sign_img" placeholder="请上传比赛图片" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="比赛标题:" prop="sign_title">
            <el-input v-model="item.sign_title" placeholder="请输入比赛标题" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="报名开始时间:" prop="sign_stime">
            <el-date-picker
              v-model="item.sign_stime"
              type="datetime"
              placeholder="请输入比赛报名开始时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="报名结束时间:" prop="sign_etime">
            <el-date-picker
              v-model="item.sign_etime"
              type="datetime"
              placeholder="请输入比赛报名结束时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="比赛开始时间:" prop="sign_sm_time">
            <el-date-picker
              v-model="item.sign_sm_time"
              type="datetime"
              placeholder="请输入比赛开始时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="比赛结束时间:" prop="sign_em_time">
            <el-date-picker
              v-model="item.sign_em_time"
              type="datetime"
              placeholder="请输入比赛结束时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="比赛主办方:" prop="sign_sponsor">
            <el-input v-model="item.sign_sponsor" placeholder="请输入比赛主办方" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="比赛总时长:" prop="total_time">
            <el-input v-model="item.total_time" placeholder="请输入比赛总时长" />
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
        sign_img: '',
        sign_title: '',
        sign_stime: '',
        sign_etime: '',
        sign_sm_time: '',
        sign_em_time: '',
        sign_sponsor: '',
        total_time: ''
      },
      rules: {
        sign_img: [
          { required: true, message: '请上传比赛图片 ', trigger: 'blur' }
        ],
        sign_title: [
          { required: true, message: '请输入比赛标题', trigger: 'blur' }
        ],
        sign_stime: [
          { required: true, message: '请输入比赛报名开始时间', trigger: 'blur' }
        ],
        sign_etime: [
          { required: true, message: '请输入比赛报名结束时间', trigger: 'blur' }
        ],
        sign_sm_time: [
          { required: true, message: '请输入比赛开始时间', trigger: 'blur' }
        ],
        sign_em_time: [
          { required: true, message: '请输入比赛结束时间', trigger: 'blur' }
        ],
        sign_sponsor: [
          { required: true, message: '请输入比赛主办方', trigger: 'blur' }
        ],
        total_time: [
          { required: true, message: '请输入比赛总时长', trigger: 'blur' }
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
        this.getSignById()
      }
    },
    getSignById () {
      axios.get('/sub/sign/findSignById?sign_id=' + this.item.sign_id).then((res) => {
        this.item = res.data.data
      })
    },
    submitForm (dataForm) {
      // console.log('用户提交了信息了')
      this.item.sign_stime = this.formateDate(this.item.sign_stime)
      this.item.sign_etime = this.formateDate(this.item.sign_etime)
      this.item.sign_sm_time = this.formateDate(this.item.sign_sm_time)
      this.item.sign_em_time = this.formateDate(this.item.sign_em_time)
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
      this.totaltime = ''// 这个不是表单元素，而是通过js脚本计算出的，就单独重置
    }

  }
}
</script>
<style lang="scss" scoped>
</style>
