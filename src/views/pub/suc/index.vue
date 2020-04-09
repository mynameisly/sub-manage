<template>
  <div id="suc">
    <div class="container">
      <el-form :inline="true" :model="searchForm">
        <el-form-item :label="$t('suc.searchForm.suc_title.label')">
          <el-input
            v-model="searchForm.suc_title"
            :placeholder="$t('suc.searchForm.suc_title.placeholder')">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" size="medium" icon="el-icon-search" @click="onSearch">{{ $t("suc.searchForm.searchdata.name") }}</el-button>
          <el-button type="primary" size="medium" icon="el-icon-plus" @click="$refs.addDialog.open(null)">{{ $t("suc.button.addone") }}</el-button>
          <el-button type="danger" size="medium" icon="el-icon-delete" @click="deleteSuc">删除所选</el-button>
          <el-button type="warning" size="medium" icon="el-icon-download" @click="handleDownload">{{ $t("suc.button.bulkImport") }}</el-button>
          <span>{{ $t('suc.total') }} {{ sucList.length }} 条</span>
        </el-form-item>
      </el-form>
      <div class="suc-content">
        <el-table
          :data="sucList"
          border
          stripe
          height="395"
          v-loading="loading"
          element-loading-text="拼命加载中"
          @cell-mouse-enter="mouseEnter"
          @selection-change="handleSelectionChange">
          <el-table-column type="selection" align="center" />
          <el-table-column
            :label="$t('suc.table.id.name')"
            type="index"
            width="55"
          />
      <!-- <template scope="scope"> -->
            <!-- (当前页 - 1) * 当前显示数据条数 + 当前行数据的索引 + 1 -->
            <!-- <span>{{ (page.currentPage - 1) * page.pageSize + scope.$index + 1 }}</span> -->
          <!-- </template> -->
          <el-table-column
            :label="$t('suc.table.suc_video.name')"
            prop="suc_video"
          />
          <el-table-column
            :label="$t('suc.table.suc_title.name')"
            prop="suc_title"
          />
          <el-table-column
            :label="$t('suc.table.operate')"
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
        <add-dialog ref="addDialog" title="添加竞赛成果信息" @OnConfirm="(item)=>addOne(item)" />
        <add-dialog ref="updateDialog" title="修改竞赛成果信息" @OnConfirm="(item)=>updateOne(item)" />
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
        suc_title: ''
      },
      sucList: [],
      addForm: {
      },
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
    this.getsucList()
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
    getsucList () {
      // const item = {
      //   suc_video: '成果展示内容。。。',// 首页成果展示大赛视频
      //   suc_title: '成果展示内容。。。'// 首页成果展示标题
      // }

      // for (let i = 0; i < 5; i++) {
      //   this.sucList.push(item)
      // }
      axios.get('/sub/suc/findAllSuc?page=1&pageSize=10').then((res) => {
        this.page.currentPage = res.data.data.currentPage
        this.page.pageSize = res.data.data.size
        this.page.totalPage = res.data.data.pages
        this.page.totalSize = res.data.data.total
        this.sucList = res.data.data.list
        // console.log(res.data.data.list)
        this.loading = false
      })
    },
    onSearch () { // 发送搜索请求
      // console.log(this.searchForm)
    },
    handleDownload () {

    },
    addOne (item) {
      axios.post('/sub/suc/addSuc?suc_video=' + item.suc_video + '&suc_title=' + item.suc_title +
      '&create_name=ly' + item.create_name +
      '&update_name=ly' + item.update_name + '&remarks=test' + item.remarks).then((res) => {
        if (res.data.code === 200) {
          this.$message({
            type: 'success',
            message: '新增成功'
          })
        }
        this.getsucList()
      })
    },
    updateOne (item) {
      axios.post('/sub/suc/updateSucInfo?suc_id=' + item.suc_id +
      '&suc_video=' + item.suc_video + '&suc_title=' + item.suc_title +
      '&update_name=ly' + item.update_name + '&remarks=test' + item.remarks).then((res) => {
        if (res.data.code === 200) {
          this.$message({
            type: 'success',
            message: '修改成功'
          })
          console.log('11', res.data.data)
        }
        this.getsucList()
      })
    },
    handlePageChange (item) {
      axios.get('/sub/suc/findAllSuc?page=' + item.currentPage + '&pageSize=' + item.pageSize).then((res) => {
        this.page.currentPage = res.data.data.currentPage
        this.page.pageSize = res.data.data.size
        this.page.totalPage = res.data.data.pages
        this.page.totalSize = res.data.data.total
        this.sucList = res.data.data.list
      })
    },
    deleteSuc () {
      if (this.multipleSelection.length) {
        let ids = [] // 保存选中的数据的id
        for (let i = 0; i < this.multipleSelection.length; i++) {
          ids.push(this.multipleSelection[i].suc_id)
        }
        this.$confirm('此操作将永久删除该数据，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then((res) => {
          axios.get('/sub/suc/deleteSucById?suc_id=' + ids).then((res) => {
            if (res.data.code === 200) {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              this.getsucList()
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
.suc-content{
  width:100%;
  height:81%;
  overflow-y: scroll;
  overflow-x:hidden;
  @include scrollBar(8px);
}
</style>
