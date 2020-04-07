<template>
  <div id="notice">
    <div class="container">
      <el-form :inline="true" :model="searchForm">
        <el-form-item :label="$t('notice.searchForm.noticedate.label')">
            <el-date-picker
            v-model="searchForm.noticedate"
            type="date"
            :placeholder="$t('notice.searchForm.noticedate.placeholder')">
            </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="success" size="medium"  icon="el-icon-search" @click="onSearch">{{ $t("notice.searchForm.searchdata.name") }}</el-button>
          <el-button type="primary" size="medium" icon="el-icon-plus" @click="$refs.addDialog.open(null)">{{ $t("notice.button.addone") }}</el-button>
          <el-button type="danger" size="medium" icon="el-icon-delete" @click="deletenotice">{{ $t("newstwo.button.deleteselectd") }}</el-button>
          <span>{{ $t('notice.total') }} {{ noticeList.length }} 条</span>
        </el-form-item>
      </el-form>
      <div class="notice-content">
        <el-table
          :data="noticeList"
          border
          stripe
          height="80%"
          v-loading="loading"
          element-loading-text="拼命加载中"
          :default-sort="{prop:'notice_time', order:'descending'}"
          @cell-mouse-enter="mouseEnter"
          @selection-change="handleSelectionChange">
            <el-table-column type="selection" align="center" />
            <el-table-column
              :label="$t('notice.table.id.name')"
              type="index"
              width="55"
            />
      <!-- <template scope="scope"> -->
            <!-- (当前页 - 1) * 当前显示数据条数 + 当前行数据的索引 + 1 -->
            <!-- <span>{{ (page.currentPage - 1) * page.pageSize + scope.$index + 1 }}</span> -->
          <!-- </template> -->
            <el-table-column
              :label="$t('notice.table.notice_content.name')"
              prop="notice_content"
              width="500"
            />
            <el-table-column
              :label="$t('notice.table.notice_time.name')"
              prop="notice_time"
              sortable
            />
            <el-table-column
              :label="$t('notice.table.operate')"
              prop="operation"
              align="center"
              width="200"
            >
            <template>
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
        <add-dialog ref="addDialog" title="添加公告" @OnConfirm="(item)=>addOne(item)" />
        <add-dialog ref="updateDialog" title="修改公告" @OnConfirm="(item)=>updateOne(item)" />
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
  data () {
    return {
      searchForm: {
        noticedate: ''
      },
      noticeList: [],
      loading: true,
      focusedRecord: {},
      multipleSelection: [], // 批量删除
      newstwoList: [],
      page: {
        currentPage: 0, // 当前页
        pageSize: 0, // 每页条数
        totalSize: 0, // 总条数
        totalPage: 0 // 总页数
      }
    }
  },
  mounted () {
    this.getnoticeList()
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
      this.focusedRecord = Object.assign({}, data) // focusedRecord是弹框的data
    },
    getnoticeList () {
      // const item = {
      //   notice_content: '新闻部分内容',  //二级新闻公告通知公告内容
      //   notice_time: '新闻部分内容',//二级新闻公告通知公告时间
      // }

      // for (let i = 0; i < 5; i++) {
      //   this.noticeList.push(item)
      // }
      axios.get('/sub/notice/findAllNotice?page=1&pageSize=10').then((res) => {
        this.page.currentPage = res.data.data.currentPage
        this.page.pageSize = res.data.data.size
        this.page.totalPage = res.data.data.pages
        this.page.totalSize = res.data.data.total
        this.noticeList = res.data.data.list
        // console.log(res.data.data.list)
        this.loading = false
      })
    },
    onSearch () { // 发送搜索请求
      // console.log(this.searchForm)
    },
    addOne (item) {
      axios.post('/sub/notice/addNotice?notice_content=' + item.notice_content + '&notice_time=' + item.notice_time +
      '&create_name=ly' + item.create_name +
      '&update_name=ly' + item.update_name + '&remarks=test' + item.remarks).then((res) => {
        if (res.data.code === 200) {
          this.$message({
            type: 'success',
            message: '新增成功'
          })
        }
        this.getnoticeList()
      })
    },
    updateOne (item) {
      axios.post('/sub/notice/updateNoticeInfo?notice_id=' + item.notice_id +
      '&notice_content=' + item.notice_content + '&notice_time=' + item.notice_time +
      '&update_name=ly' + item.update_name + '&remarks=test' + item.remarks).then((res) => {
        if (res.data.code === 200) {
          this.$message({
            type: 'success',
            message: '修改成功'
          })
        }
        this.getnoticeList()
      })
    },
    handlePageChange (item) {
      axios.get('/sub/notice/findAllNotice?page=' + item.currentPage + '&pageSize=' + item.pageSize).then((res) => {
        this.page.currentPage = res.data.data.currentPage
        this.page.pageSize = res.data.data.size
        this.page.totalPage = res.data.data.pages
        this.page.totalSize = res.data.data.total
        this.noticeList = res.data.data.list
      })
    },
    deletenotice () {
      if (this.multipleSelection.length) {
        let ids = [] // 保存选中的数据的id
        for (let i = 0; i < this.multipleSelection.length; i++) {
          ids.push(this.multipleSelection[i].notice_id)
        }
        this.$confirm('此操作将永久删除该数据，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then((res) => {
          axios.get('/sub/notice/deleteNoticeById?notice_id=' + ids).then((res) => {
            if (res.data.code === 200) {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              this.getnoticeList()
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
.notice-content{
  width:100%;
  height:81%;
  overflow-y: scroll;
  overflow-x:hidden;
  @include scrollBar(8px);
}
</style>
