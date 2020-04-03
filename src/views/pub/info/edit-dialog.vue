<template>
  <el-dialog id="edit-dialog" :title="title" :visible.sync="visable" :lock-scroll="false" center width="60%" top="5.5rem" :close-on-click-modal="false">
    <el-form ref="dataForm" :model="item" :rules="rules" label-width="100px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="比赛名称:" prop="info_title">
            <el-input v-model="item.subject_title" placeholder="请输入比赛名称" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="比赛状态:" prop="info_state">
            <el-input v-model="item.subject_state" placeholder="请输入比赛状态" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="比赛icon:" prop="info_icon">
            <el-input v-model="item.subject_icon" placeholder="请上传比赛icon" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="比赛简介:" prop="info_intro">
            <el-input type="textarea" v-model="item.subject_intro" placeholder="请输入比赛简介" />
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
    return {
      visable: false,
      item: {
        subject_icon: '',
        subject_title: '',
        subject_intro: '',
        subject_state: ''
      },
      rules: {
        subject_icon: [
          { required: true, message: '请上传比赛icon', trigger: 'blur' }
        ],
        subject_title: [
          { required: true, message: '请输入比赛名称', trigger: 'blur' }
        ],
        subject_intro: [
          { required: true, message: '请输入比赛简介', trigger: 'change' }
        ],
        subject_state: [
          { required: true, message: '请输入比赛状态', trigger: 'change' }
        ]
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
      }
    },
    getLineById () {
      axios.get('/sub/subject/findSubjectById?subject_id=' + this.item.subject_id).then((res) => {
        this.item = res.data.data
      })
    },
    submitForm (dataForm) {
      console.log('用户提交了信息了')
      console.log(this.$refs)
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认保存吗？', '询问', {
            cancelButtonText: '取消',
            cancelButtonClass: 'cancelButton',
            confirmButtonText: '确认',
            lockScroll: false,
            type: 'warning'
          }).then(() => {
            console.log('enter then')
            console.log(this)
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
