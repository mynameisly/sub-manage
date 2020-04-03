<template>
  <el-dialog id="edit-dialog" :title="title" :visible.sync="visable" :lock-scroll="false" center width="60%" top="5.5rem" :close-on-click-modal="false">
    <el-form ref="dataForm" :model="item" :rules="rules" label-width="100px">

      <el-row>
        <el-col :span="24">
          <el-form-item label="标题:" prop="suctwo_title">
            <el-input v-model="item.suctwo_title" placeholder="请输入成果展示标题" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="图片地址:" prop="suctwo_img">
            <el-input v-model="item.suctwo_img" placeholder="请输入成果展示图片地址" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="参赛人员:" prop="suctwo_person">
            <el-input type="textarea" v-model="item.suctwo_person" placeholder="请输入参赛人员" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="奖项:" prop="suctwo_prize">
            <el-input v-model="item.suctwo_prize" placeholder="请输入奖项" />
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
        suctwo_title: '',
        suctwo_img: '',
        suctwo_person: '',
        suctwo_prize: ''
      },
      rules: {
        suctwo_title: [
          { required: true, message: '请输入成果展示标题 ', trigger: 'blur' }
        ],
        suctwo_img: [
          { required: true, message: '请输入成果展示图片地址', trigger: 'blur' }
        ],
        suctwo_person: [
          { required: true, message: '请输入参赛人员 ', trigger: 'blur' }
        ],
        suctwo_prize: [
          { required: true, message: '请输入奖项', trigger: 'blur' }
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
        this.getSucTwoById()
      }
    },
    getSucTwoById () {
      axios.get('/sub/train/findSucTwoById?suctwo_id=' + this.item.suctwo_id).then((res) => {
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
