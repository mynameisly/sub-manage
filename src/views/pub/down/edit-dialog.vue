<template>
  <el-dialog id='edit-dialog' :title='title' :visible.sync='visable' :lock-scroll='false' center width='60%' top='5.5rem' :close-on-click-modal='false'>
    <el-form ref='dataForm' :model='item' :rules='rules' label-width='100px'>
      <el-row>
        <el-col :span='24'>
          <el-form-item label='比赛名称:' prop='info_title'>
            <el-upload
                ref='upload'
                action='https://jsonplaceholder.typicode.com/posts/'
                :on-preview='handlePreview'
                :on-remove='handleRemove'
                :file-list='fileList'
                :auto-upload='false'>
                <el-button slot='trigger' plain type='success' @click='submitUpload'>上传文件</el-button>
                <el-button type='warning' plain @click="resetForm('dataForm')">取消</el-button>
                <div slot='tip' class='el-upload__tip'>只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot='footer'>
      <el-button type='success' plain @click="submitForm('dataForm')">提交</el-button>
      <el-button type='warning' plain @click="resetForm('dataForm')">取消</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: 'title'
    }
  },
  data() {
    return {
      visable: false,
      item: {},
      fileList: [
          {
            name: 'food.jpeg', 
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          },
          {
            name: 'food2.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          }
        ],
      rules: {
    //     info_icon: [
    //       { required: true, message: '请上传比赛icon', trigger: 'blur' }
    //     ]
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
        this.type = this.item.type
      }
    },
    submitUpload() {
        this.$refs.upload.submit()
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
      },
      handleRemove(file, fileList) {
        console.log(file, fileList)
      },
      handlePreview(file) {
        console.log(file)
      },
    resetForm(dataForm) {
      this.$nextTick(() => {
        this.$refs[dataForm].clearValidate()
      })
      this.visable = false
    }

  }
}
</script>
<style lang='scss' scoped>
</style>
