<template>
  <div id="info">
    <div class="container">
      <el-form :inline="true" :model="searchForm">
        <el-form-item :label="$t('info.searchForm.info_state.label')">
          <el-input
            v-model="searchForm.info_state"
            :placeholder="$t('info.searchForm.info_state.placeholder')">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" size="medium" icon="el-icon-search" @click="onSearch">{{ $t("info.searchForm.searchdata.name") }}</el-button>
          <el-button type="primary" size="medium" icon="el-icon-plus" @click="$refs.addDialog.open(null)">{{ $t("info.button.addone") }}</el-button>
          <el-button type="danger" size="medium" icon="el-icon-delete" @click="deleteInfo">{{ $t("newstwo.button.deleteselectd") }}</el-button>
          <el-button type="warning" size="medium" icon="el-icon-download" @click="handleDownload">{{ $t("info.button.bulkImport") }}</el-button>
          <span>{{ $t('info.total') }} {{ infoList.length }} 条</span>
        </el-form-item>
      </el-form>
      <div class="info-content">
        <el-table
          :data="infoList"
          border
          stripe
          height="395"
          v-loading="loading"
          element-loading-text="拼命加载中"
          @cell-mouse-enter="mouseEnter"
          @selection-change="handleSelectionChange"
          >
          <el-table-column type="selection" align="center"/>
          <el-table-column
            :label="$t('info.table.id.name')"
            type="index"
            width="55"
          />
            <!-- <template slot-scope="scope"> -->
              <!-- (当前页 - 1) * 当前显示数据条数 + 当前行数据的索引 + 1 -->
              <!-- <span>{{ (page.currentPage - 1) * page.pageSize + scope.$index + 1 }}</span> -->
            <!-- </template> -->
            <el-table-column
              :label="$t('info.table.info_icon.name')"
              prop="subject_icon"
            />
            <el-table-column
              :label="$t('info.table.info_title.name')"
              prop="subject_title"
            />
            <el-table-column
              :label="$t('info.table.info_intro.name')"
              prop="subject_intro"
            />
            <el-table-column
              :label="$t('info.table.info_state.name')"
              prop="subject_state"
            />
            <el-table-column
              :label="$t('info.table.operate')"
              prop="operation"
              align="center"
              width="100"
            >
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="mini"
                  class="el-icon-edit"
                  @click.stop="$refs.updateDialog.open(focusedRecord)"
                >修改</el-button>
              </template>
            </el-table-column>
        </el-table>
        <page-component :total="page.totalSize" :page="page" @pageChange="(item)=>handlePageChange(item)" />
        <add-dialog ref="addDialog" title="添加信息" @OnConfirm="(item)=>addOne(item)" />
        <add-dialog ref="updateDialog" title="修改信息" @OnConfirm="(item)=>updateOne(item)" />
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import AddDialog from './edit-dialog'
import PageComponent from '@/components/pagination/index'
export default {
  components: {
    AddDialog,
    PageComponent
  },
  data () { // 这个的接口是subject-controller,table原本的字段全部改成以subject开头
    return {
      loading: true,
      searchForm: {
        subject_state: ''
      },
      infoList: [],
      focusedRecord: {},
      multipleSelection: [], // 批量删除
      addForm: {
      },
      page: {
        currentPage: 0, // 当前页
        pageSize: 0, // 每页条数
        totalSize: 0, // 总条数
        totalPage: 0 // 总页数
      }
    }
  },
  mounted () {
    this.getinfolist()
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    mouseEnter (data) {
      // console.log(data);//这里可以打印每一行的内容
      // 点击编辑
      this.dialogFormVisible = true // 显示弹框
      // let _row = row
      // 将每一行的数据赋值给dialog弹框
      this.focusedRecord = Object.assign({}, data)// focusedRecord是弹框的data
    },
    getinfolist () {
      // const item = {
      //   id: '1',
      //   subject_icon: '路径。。。',
      //   subject_title: '标题。。。',
      //   subject_intro: '简介。。。',
      //   subject_state: '火热报名中'
      // }

      // for (let i = 0; i < 5; i++) {
      //   this.infoList.push(item)
      // }

      axios.get('/sub/subject/findAllSubject?page=1&pageSize=10').then((res) => {
        this.page.currentPage = res.data.data.currentPage
        this.page.pageSize = res.data.data.size
        this.page.totalPage = res.data.data.pages
        this.page.totalSize = res.data.data.total
        this.infoList = res.data.data.list
        console.log(res.data.data.list)
        this.loading = false
      })
    },
    onSearch () {
      console.log(this.searchForm)
    // 发送搜索请求
    },
    handleDownload () {
    // 导出EXCEL
    },
    addOne (item) {
      console.log(item)
      axios.post('/sub/subject/addSubject?subject_icon=' + item.subject_icon + '&subject_title=' + item.subject_title +
      '&subject_intro=' + item.subject_intro + '&create_name=ly' + item.create_name +
      '&update_name=ly' + item.update_name + '&remarks=test' + item.remarks).then((res) => {
        if (res.data.code === 200) {
          this.$message({
            type: 'success',
            message: '新增成功'
          })
        }
        this.getinfolist()
      })
    },
    updateOne (item) {
      axios.post('/sub/subject/updateSubjectInfo?subject_id' + item.subject_id + '&subject_icon=' + item.subject_icon +
      '&subject_title=' + item.subject_title + '&subject_state=' + item.subject_state + '&subject_intro=' + item.subject_intro +
      '&update_name=ly' + item.update_name + '&remarks=test' + item.remarks).then((res) => {
        if (res.data.code === 200) {
          this.$message({
            type: 'success',
            message: '修改成功'
          })
          console.log(res.data.data.list)
        }
        this.getinfolist()
      })
    },
    handlePageChange (item) {
      console.log('111111', item)
      // 发送分页查询请求
      axios.get('/sub/subject/findAllSubject?page=' + item.currentPage + '&pageSize=' + item.pageSize).then((res) => {
        this.page.currentPage = res.data.data.currentPage
        this.page.pageSize = res.data.data.size
        this.page.totalPage = res.data.data.pages
        this.page.totalSize = res.data.data.total
        this.infoList = res.data.data.list
      })
    },
    deleteInfo () {
      if (this.multipleSelection.length) {
        let ids = [] // 保存选中的数据的id
        for (let i = 0; i < this.multipleSelection.length; i++) {
          ids.push(this.multipleSelection[i].subject_id)
        }
        console.log(ids)
        this.$confirm('此操作将永久删除该数据，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then((res) => {
          axios.get('/sub/subject/deleteSubjectById?user_id=' + ids).then((res) => {
            if (res.data.code === 200) {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              this.getinfolist()
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      } else {
        this.$message({
          type: 'warning',
          message: '至少选择一项'
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.demo-form-inline{
  margin:0 0 0 0;
  display:flex;
  justify-content: center;
}
.el-date-editor .el-range-input{
  margin:3px!important;
}
.info-content{
  width:100%;
  height:81%;
  overflow-y: scroll;
  overflow-x:hidden;
  @include scrollBar(8px);
}
</style>
