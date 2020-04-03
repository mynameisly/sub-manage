<template>
  <el-dialog id="edit-dialog" :title="title" :visible.sync="visable" :lock-scroll="false" center width="60%" top="5.5rem" :close-on-click-modal="false">
    <el-form ref="dataForm" :model="item" :rules="rules" label-width="220px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="首页竞赛新闻图片:" prop="news_img">
            <el-input v-model="item.news_img" placeholder="请上传首页竞赛新闻图片" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="首页竞赛新闻标题:" prop="news_title">
            <el-input v-model="item.news_title" placeholder="请输入首页竞赛新闻标题" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="首页竞赛新闻简介:" prop="news_intro">
            <el-input type='textarea' v-model="item.news_intro" placeholder="请输入首页竞赛新闻简介" />
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
      item: {
        news_img: '',
        news_title: '',
        news_intro: '',
        news_content: '',
        news_time: '',
        notice_content: '',
        notice_time: ''
      },
      rules: {
        news_img: [
          { required: true, message: '请上传首页竞赛新闻图片', trigger: 'blur' }
        ],
        news_title: [
          { required: true, message: '请输入首页竞赛新闻标题', trigger: 'blur' }
        ],
        news_intro: [
          { required: true, message: '请输入首页竞赛新闻简介', trigger: 'change' }
        ],
        news_content: [
          { required: true, message: '请输入二级新闻公告竞赛新闻内容', trigger: 'change' }
        ],
        news_time: [
          { required: true, message: '请输入二级新闻公告竞赛新闻时间', trigger: 'blur' }
        ],
        notice_content: [
          { required: true, message: '请输入二级新闻公告通知公告内容', trigger: 'change' }
        ],
        notice_time: [
          { required: true, message: '请输入二级新闻公告通知公告时间', trigger: 'change' }
        ]
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
        this.type = this.item.type;
      }
    },
    submitForm(dataForm) {
      console.log('用户提交了信息了');
      console.log(this.$refs);
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          this.$confirm("确认保存吗？", "询问", {
            cancelButtonText: "取消",
            cancelButtonClass: "cancelButton",
            confirmButtonText: "确认",
            lockScroll: false,
            type: "warning"
          }).then(() => {
            console.log('enter then');
            console.log(this);
            this.$emit("OnConfirm", this.item);// 子组件可以使用 $emit 触发父组件的自定义事件,这里是OnConfirm事件
            this.item.totaltime = this.totaltime;// 加班总时长
            this.visable = false;// 关闭dialog弹窗后重置form，不能在这里重置，函数执行完之后才把数据添加的父元素table中
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    resetForm(dataForm) {
      this.$nextTick(() => {
        this.$refs[dataForm].clearValidate();
      })
      this.visable = false;
      this.totaltime = '';// 这个不是表单元素，而是通过js脚本计算出的，就单独重置
    }

  }
}
</script>
<style lang="scss" scoped>

</style>
