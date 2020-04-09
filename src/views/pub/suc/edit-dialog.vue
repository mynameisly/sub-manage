<template>
  <el-dialog id="edit-dialog" :title="title" :visible.sync="visable" :lock-scroll="false" center width="60%" top="5.5rem" :close-on-click-modal="false">
    <el-form ref="dataForm" :model="item" :rules="rules" label-width="120px">

      <el-row>
        <el-col :span="24">
          <el-form-item label="比赛视频:" prop="suc_video">
            <el-upload
              ref="upload"
              action="none"
              drag
              list-type="text"
              :auto-upload="false"
              :before-upload="beforeupload"
              >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="比赛标题:" prop="suc_title">
            <el-input v-model="item.suc_title" placeholder="请输入首页成果展示标题" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <span slot="footer">
      <el-button type="primary" @click="submitForm('dataForm')">提交</el-button>
      <el-button type="primary" @click="resetForm('dataForm')">取消</el-button>
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
        suc_video: '', // 首页成果展示大赛视频
        suc_title: ''// 首页成果展示标题
      },
      rules: {
        suc_video: [
          { required: true, message: '请上传首页成果展示大赛视频 ', trigger: 'blur' }
        ],
        suc_title: [
          { required: true, message: '请上传首页成果展示标题', trigger: 'blur' }
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
        this.getSucById()
      }
    },
    getSucById () {
      axios.get('/sub/suc/findSucById?suc_id=' + this.item.suc_id).then((res) => {
        this.item = res.data.data
      })
    },
    beforeupload(file) {

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
