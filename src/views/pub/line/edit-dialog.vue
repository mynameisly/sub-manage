<template>
  <el-dialog id="edit-dialog" :title="title" :visible.sync="visable" :lock-scroll="false" center width="60%" top="5.5rem" :close-on-click-modal="false">
    <el-form ref="dataForm" :model="item" :rules="rules" label-width="100px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="竞赛年份:" prop="line_year">
            <el-input v-model="item.line_year" placeholder="请输入竞赛年份" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="竞赛名称:" prop="line_title">
            <el-input v-model="item.line_title" placeholder="请输入竞赛名称" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="竞赛图片:" prop="line_img">
            <el-input v-model="item.line_img" placeholder="请上传竞赛图片" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="竞赛简介:" prop="line_intro">
            <el-input type="textarea" v-model="item.line_intro" placeholder="请输入竞赛简介" />
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
        // line_year: '',//二级竞赛历程年份
        // line_title: '',//二级竞赛大赛名称
        // line_img: '',//二级竞赛图片
        // line_intro: '',//二级竞赛简介
      },
      rules: {
        line_year: [
          { required: true, message: '请输入竞赛历程年份', trigger: 'blur' }
        ],
        line_title: [
          { required: true, message: '请输入竞赛名称', trigger: 'blur' }
        ],
        line_img: [
          { required: true, message: '请上传竞赛图片', trigger: 'blur' }
        ],
        line_intro: [
          { required: true, message: '请输入竞赛简介', trigger: 'blur' }
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
        this.getLineById()
      }
    },
    getLineById () {
      axios.get('/sub/line/findLineById?line_id=' + this.item.line_id).then((res) => {
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
    }

  }
}
</script>
<style lang="scss" scoped>
</style>
