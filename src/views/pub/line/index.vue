<template>
  <div id="line">
    <div class="container">
      <el-form :inline="true" :model="searchForm">
        <el-form-item :label="$t('line.searchForm.line_year.label')">
          <el-input
            v-model="searchForm.line_year"
            :placeholder="$t('line.searchForm.line_year.placeholder')"
            clearable>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" size="medium" icon="el-icon-search" @click="onSearch">{{ $t("line.searchForm.searchdata.name") }}</el-button>
          <el-button type="primary" size="medium" icon="el-icon-plus" @click="$refs.addDialog.open(null)">{{ $t("line.button.addone") }}</el-button>
          <el-button type="danger" size="medium" icon="el-icon-delete" @click="deleteLine">{{ $t("line.button.deleteselectd") }}</el-button>
          <el-button type="warning" size="medium" icon="el-icon-download" @click="handleDownload">{{ $t("line.button.bulkImport") }}</el-button>
          <span>{{ $t('line.total') }} {{ lineList.length }} 条</span>
        </el-form-item>
      </el-form>
      <div class="line-content">
        <el-table
          :data="lineList"
          border
          stripe
          height="395"
          v-loading="loading"
          element-loading-text="拼命加载中"
          :default-sort="{prop: 'line_year',order: 'descending'}"
          @cell-mouse-enter="mouseEnter"
          @selection-change="handleSelectionChange">
          <el-table-column type="selection" align="center" />
          <el-table-column
            :label="$t('line.table.id.name')"
            type="index"
            width="55"
          />
          <!-- <template slot-scope="scope"> -->
          <!-- (当前页 - 1) * 当前显示数据条数 + 当前行数据的索引 + 1 -->
            <!-- <span>{{ (page.currentPage - 1) * page.pageSize + scope.$index + 1 }}</span> -->
          <!-- </template> -->
          <el-table-column
            :label="$t('line.table.line_year.name')"
            prop="line_year"
            sortable
          />
          <el-table-column
            :label="$t('line.table.line_title.name')"
            prop="line_title"
          />
          <el-table-column
            :label="$t('line.table.line_intro.name')"
            prop="line_intro"
          />
          <el-table-column
            :label="$t('line.table.line_img.name')"
            prop="line_img"
          />
          <el-table-column
            :label="$t('line.table.operate')"
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
        <add-dialog ref="addDialog" title="添加竞赛历程" @OnConfirm="(item)=>addOne(item)" />
        <add-dialog ref="updateDialog" title="修改竞赛历程" @OnConfirm="(item)=>updateOne(item)" />
      </div>
    </div>
  </div>
</template>
<script>
// import { getlineList, getclientlist } from "@/api/deliver";
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
      loading: true,
      searchForm: {
        line_year: ''
      },
      lineList: [],
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
    this.getlineList()
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
    // 获取记录日志
    getlineList () {
      // const item = {
      //   id: '1',
      //   line_year: '二级竞赛历程内容。。。', //二级竞赛历程年份
      //   line_title: '二级竞赛历程内容。。。',//二级竞赛大赛名称
      //   line_img: '二级竞赛历程内容。。。',//二级竞赛图片
      //   line_intro: '二级竞赛历程内容。。。',//二级竞赛简介
      // };
      // this.lineList.push(item)
      axios.get('/sub/line/findAllLine?page=1&pageSize=10').then((res) => {
        this.page.currentPage = res.data.data.currentPage
        this.page.pageSize = res.data.data.size
        this.page.totalPage = res.data.data.pages
        this.page.totalSize = res.data.data.total
        this.lineList = res.data.data.list
        console.log(res.data.data.list)
        this.loading = false
      })
    },
    addOne (item) {
      console.log(item)
      axios.post('/sub/line/addLine?line_year=' + item.line_year + '&line_title=' + item.line_title +
      '&line_img=' + item.line_img + '&line_intro=' + item.line_intro + '&create_name=ly' + item.create_name +
      '&update_name=ly' + item.update_name + '&remarks=test' + item.remarks).then((res) => {
        if (res.data.code === 200) {
          this.$message({
            type: 'success',
            message: '新增成功'
          })
        }
        this.getlineList()
      })
    },
    updateOne (item) {
      axios.post('/sub/line/updateLineInfo?line_id=' + item.line_id + '&line_year=' + item.line_year + '&line_title=' + item.line_title +
      '&line_img=' + item.line_img + '&line_intro=' + item.line_intro + '&create_name=ly' + item.create_name +
      '&update_name=ly' + item.update_name + '&remarks=test' + item.remarks).then((res) => {
        if (res.data.code === 200) {
          this.$message({
            type: 'success',
            message: '修改成功'
          })
          console.log('进入到竞赛历程修改', res.data.data.list)
        }
        this.getlineList()
      })
    },
    onSearch () {
      console.log(this.searchForm)
    // 发送搜索请求
    },
    handlePageChange (item) {
      console.log('分页查询请求', item)
      // 发送分页查询请求
      axios.get('/sub/line/findAllLine?page=' + item.currentPage + '&pageSize=' + item.pageSize).then((res) => {
        this.page.currentPage = res.data.data.currentPage
        this.page.pageSize = res.data.data.size
        this.page.totalPage = res.data.data.pages
        this.page.totalSize = res.data.data.total
        this.lineList = res.data.data.list
      })
    },
    handleDownload () {
      // 导出到excel
    },
    deleteLine () {
      if (this.multipleSelection.length) {
        let ids = [] // 保存选中的数据的id
        for (let i = 0; i < this.multipleSelection.length; i++) {
          ids.push(this.multipleSelection[i].line_id)
        }
        this.$confirm('此操作将永久删除该数据，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then((res) => {
          axios.get('/sub/line/deleteLineById?line_id=' + ids).then((res) => {
            if (res.data.code === 200) {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              this.getlineList()
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
.line-content{
  width:100%;
  height:81%;
  overflow-y: scroll;
  overflow-x:hidden;
  @include scrollBar(8px);
}
</style>
