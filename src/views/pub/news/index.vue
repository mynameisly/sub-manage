<template>
  <div id="news">
    <div class="container">
      <el-form :inline="true" :model="searchForm">
        <el-form-item :label="$t('news.searchForm.news_time.label')">
          <el-input
            v-model="searchForm.news_time"
            :placeholder="$t('news.searchForm.news_time.placeholder')">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" size="medium"  icon="el-icon-search" @click="onSearch">{{ $t("news.searchForm.searchdata.name") }}</el-button>
          <el-button type="primary" size="medium" icon="el-icon-plus" @click="$refs.addDialog.open(null)">{{ $t("news.button.addone") }}</el-button>
          <el-button type="warning" size="medium"  icon="el-icon-download" @click="handleDownload">{{ $t("news.button.bulkImport") }}</el-button>
          <span>{{ $t('news.total') }} {{ newsList.length }} 条</span>
        </el-form-item>
      </el-form>
      <div class="news-content">
        <el-table :data="newsList" border @cell-mouse-enter="mouseEnter">
            <el-table-column
            :label="$t('news.table.id.name')"
            type="index"
            width="55"
          />
      <!-- <template scope="scope"> -->
            <!-- (当前页 - 1) * 当前显示数据条数 + 当前行数据的索引 + 1 -->
            <!-- <span>{{ (page.currentPage - 1) * page.pageSize + scope.$index + 1 }}</span> -->
          <!-- </template> -->
            <el-table-column
              :label="$t('news.table.id.name')"
              prop="news_img"
            />
            <el-table-column
              :label="$t('news.table.news_title.name')"
              prop="news_title"
            />
            <el-table-column
              :label="$t('news.table.news_intro.name')"
              prop="news_intro"
            />
            <el-table-column
              :label="$t('news.table.operate')"
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
              <template>
                <el-button
                  type="danger"
                  size="mini"
                  class="el-icon-delete"
                  @click.stop="deleteNews()"
                >删除</el-button>
              </template>
            </el-table-column>
        </el-table>
      </div>
      <div class="paginationDad">
        <page-component :total="newsList.length" @pageChange="(item)=>handlePageChange(item)" />
      </div>
      <add-dialog ref="addDialog" title="添加新闻" @OnConfirm="(item)=>addOne(item,'post')" />
      <add-dialog ref="updateDialog" title="修改新闻" @OnConfirm="(item)=>addOne(item,'post')" />
    </div>
  </div>
</template>
<script>
// import { getinfolist, getclientlist } from "@/api/deliver";
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
        news_time: ''
      },
      newsList: [],
      focusedRecord: {},
      addForm: {
      }
    }
  },
  mounted () {
    this.getinfolist()
  },
  methods: {
    addOne (data, method) {
      console.log(data, method)
      this.infoList.push(data)
      // 发送添加请求
    },
    mouseEnter (data) {
      // console.log(data);//这里可以打印每一行的内容
      // 点击编辑
      this.dialogFormVisible = true // 显示弹框
      // let _row = row
      // 将每一行的数据赋值给dialog弹框
      this.focusedRecord = Object.assign({}, data)// focusedRecord是弹框的data
    },
    // 获取记录日志
    getinfolist () {
      // const item = {
      //   id: '1',
      //   news_img: '新闻部分内容', // 首页竞赛新闻图片
      //   news_title: '新闻部分内容', // 首页竞赛新闻标题
      //   news_intro: '新闻部分内容', // 首页竞赛新闻简介
      //   news_content: '新闻部分内容', // 二级新闻公告竞赛新闻内容
      //   news_time: '新闻部分内容', // 二级新闻公告竞赛新闻时间
      //   notice_content: '新闻部分内容', // 二级新闻公告通知公告内容
      //   notice_time: '新闻部分内容'// 二级新闻公告通知公告时间
      // }

      // for (let i = 0; i < 5; i++) {
      //   this.newsList.push(item)
      // }
    },
    onSearch () {
      console.log(this.searchForm)
    // 发送搜索请求
    },
    handlePageChange (item) {
      console.log(item.pageSize, item.currentPage)
      // 发送分页查询请求
    },
    handleDownload () {
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = [
          '日期',
          '员工姓名',
          '职位',
          '部门',
          '加班类型',
          '加班时段',
          '加班时长',
          '加班事由',
          '部门审批',
          '审批人'
        ]
        const filterVal = ['date', 'name', 'position', 'department', 'type', 'datetimeperiod', 'totaltime', 'reasons', 'authorize1', 'approver'
        ]
        const list = this.infoList
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType
        })
        this.downloadLoading = false
      })
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === 'enddate' || j === 'stadate') {
            return this.timestampToTime(v[j])
          } else {
            return v[j]
          }
        })
      )
    },
    // 删除表格一条数据
    deleteNews () {
      // 发送删除请求
      this.$confirm('确认删除吗？', '询问', {
        cancelButtonText: '取消',
        confirmButtonText: '确认',
        lockScroll: false,
        closeOnClickModal: false,
        type: 'warning'
      }).catch(() => { return false })
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
.news-content{
  width:100%;
  height:81%;
  overflow-y: scroll;
  overflow-x:hidden;
  @include scrollBar(8px);
}
</style>
