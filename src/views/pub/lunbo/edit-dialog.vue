<template>
  <el-dialog id="edit-dialog" title="添加信息" :visible.sync="visable" :lock-scroll="false" center width="60%" top="5.5rem" :close-on-click-modal="false">
    <el-form ref="uploadForm" :model="item" :rules="rules" label-width="100px">
      <el-row>
        <!-- <el-col :span="24">
          <el-form-item label="轮播名称:" prop="lunbo_name">
            <el-input v-model="item.lunbo_name" placeholder="请输入轮播名称" />
          </el-form-item>
        </el-col> -->
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="图片:" prop="lunbo_img">
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
    </el-form>

    <span slot="footer">
      <el-button type="primary" @click="submitForm('uploadForm')">提交</el-button>
      <el-button type="primary" @click="resetForm('uploadForm')">取消</el-button>
    </span>
  </el-dialog>
</template>
<script>
import axios from 'axios'
export default {
  props: {
    title: {
      type: String,
      default: "title"
    }
  },
  data() {
    return {
      visable: false,
      item: {},
      form: {
        lunbo_img: '',
        lunbo_name: ''
      },
      rules: {
        // lunbo_img: [
        //   { required: true, message: '请输入轮播图片地址', trigger: 'blur' }
        // ],
        // lunbo_name: [
        //   { required: true, message: '请输入轮播名称', trigger: 'blur' }
        // ]
      }
    }
  },
  methods: {
    open (item) {
      this.visable = true;
      if (item === undefined || item === null) {
        this.item = {};
      } else {
        this.item = item;
      }
    },
    beforeupload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if(!isLt2M) {
        this.$message.error('上传图片不能超过2M!')
      }
      if(!isJPG && !isPNG) {
        this.$message.error('上传图片只能是jpg或者png格式')
      }
    },
    submitForm (uploadForm) {
      
    },
    resetForm(uploadForm) {
      this.$nextTick(() => {
        this.$refs[uploadForm].clearValidate();
      })
      this.visable = false;
    }

  }
}
</script>
<style lang="scss" scoped>
</style>
