<template>
  <el-dialog id="edit-dialog" :title="title" :visible.sync="visable" :lock-scroll="false" center width="60%" top="5.5rem" :close-on-click-modal="false">
    <el-form ref="dataForm" :model="item" :rules="rules" label-width="100px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="图片:" prop="team_img">
            <el-input v-model="item.team_img" placeholder="请上传二级团队建设图片" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="指导老师:" prop="team_teacher">
            <el-input v-model="item.team_teacher" placeholder="请输入二级团队建设指导老师" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="团队成员" prop="team_person">
            <el-input v-model="item.team_person" placeholder="请输入二级团队成员" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="项目评价:" prop="team_comment">
            <el-input type="textarea" v-model="item.team_comment" placeholder="请输入二级团队项目评价" />
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
      item: {},
      form: {
        team_img: '', // 二级团队建设图片
        team_teacher: '', // 二级团队建设指导老师
        team_person: '', // 二级团队成员
        team_comment: ''// 二级团队项目评价
      },
      rules: {
        team_img: [
          { required: true, message: '请上传二级团队建设图片 ', trigger: 'blur' }
        ],
        team_teacher: [
          { required: true, message: '请输入二级团队建设指导老师', trigger: 'blur' }
        ],
        team_person: [
          { required: true, message: '请输入二级团队成员', trigger: 'blur' }
        ],
        team_comment: [
          { required: true, message: '请输入二级团队项目评价', trigger: 'blur' }
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
        this.getTeamById()
      }
    },
    getTeamById () {
      axios.get('/sub/team/findTeamById?team_id=' + this.item.team_id).then((res) => {
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
