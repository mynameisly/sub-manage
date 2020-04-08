<template>
  <div id="train">
    <div class="container">
      <el-form :inline="true">
        <el-form-item>
          <el-button type="primary" size="medium" icon="el-icon-plus" @click="$refs.addDialog.open(null)">{{ $t("train.button.addone") }}</el-button>
          <el-button type="warning" size="medium" icon="el-icon-download" @click="handleDownload">{{ $t("train.button.bulkImport") }}</el-button>
          <el-button type="danger" size="medium" icon="el-icon-delete" @click="deleteTrain">{{ $t("newstwo.button.deleteselectd") }}</el-button>
          <span>{{ $t('train.total') }} {{ trainList.length }} 条</span>
        </el-form-item>
      </el-form>
      <div class="train-content">
        <el-table
          :data="trainList"
          border
          stripe
          height="395"
          v-loading="loading"
          :default-sort = "{prop: 'train_time', order: 'descending'}"
          element-loading-text="拼命加载中"
          @cell-mouse-enter="mouseEnter"
          @selection-change="handleSelectionChange">
          <el-table-column type="selection" align="center" />
          <el-table-column
            :label="$t('train.table.id.name')"
            type="index"
            width="55"
          />
    <!-- <template scope="scope"> -->
          <!-- (当前页 - 1) * 当前显示数据条数 + 当前行数据的索引 + 1 -->
          <!-- <span>{{ (page.currentPage - 1) * page.pageSize + scope.$index + 1 }}</span> -->
        <!-- </template> -->
          <el-table-column
            :label="$t('train.table.train_content.name')"
            prop="train_content"
          />
          <el-table-column
            :label="$t('train.table.train_time.name')"
            prop="train_time"
            sortable
          />
          <el-table-column
            :label="$t('train.table.operate')"
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
        <add-dialog ref="addDialog" title="添加团队建设信息" @OnConfirm="(item)=>addOne(item)" />
        <add-dialog ref="updateDialog" title="修改团队建设信息" @OnConfirm="(item)=>updateOne(item)" />
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
      trainList: [],
      addForm: {
      },
      excelData: [],
      loading: true,
      focusedRecord: {},
      multipleSelection: [], // 批量删除
      page: {
        currentPage: 0, // 当前页
        pageSize: 0, // 每页条数
        totalSize: 0, // 总条数
        totalPage: 0 // 总页数
      }
    }
  },
  mounted () {
    this.gettrainList()
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
    // 获取记录日志
    gettrainList () {
      // const item = {
      //   id: '1',
      //   train_content: '竞赛培训内容。。。。',
      //   train_time: '竞赛培训内容。。。。',
      //   lunbo_img: '首页轮播。。。。。',
      //   down_content: '二级资料内容下载。。。。。'
      // }

      // for (let i = 0; i < 5; i++) {
      //   this.trainList.push(item)
      // }
      axios.get('/sub/train/findAllTrain?page=1&pageSize=10').then((res) => {
        this.page.currentPage = res.data.data.currentPage
        this.page.pageSize = res.data.data.size
        this.page.totalPage = res.data.data.pages
        this.page.totalSize = res.data.data.total
        this.trainList = res.data.data.list
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
      axios.post('/sub/train/addTrain?train_content=' + item.train_content + '&train_time=' + item.train_time +
      '&create_name=ly' + item.create_name +
      '&update_name=ly' + item.update_name + '&remarks=test' + item.remarks).then((res) => {
        if (res.data.code === 200) {
          this.$message({
            type: 'success',
            message: '新增成功'
          })
        }
        this.gettrainList()
      })
    },
    updateOne (item) {
      axios.post('/sub/train/updateTrainInfo?train_id=' + item.train_id +
      '&train_content=' + item.train_content + '&train_time=' + item.train_time +
      '&update_name=ly' + item.update_name + '&remarks=test' + item.remarks).then((res) => {
        if (res.data.code === 200) {
          this.$message({
            type: 'success',
            message: '修改成功'
          })
        }
        this.gettrainList()
      })
    },
    handlePageChange (item) {
      axios.get('/sub/train/findAllTrain?page=' + item.currentPage + '&pageSize=' + item.pageSize).then((res) => {
        this.page.currentPage = res.data.data.currentPage
        this.page.pageSize = res.data.data.size
        this.page.totalPage = res.data.data.pages
        this.page.totalSize = res.data.data.total
        this.trainList = res.data.data.list
      })
    },
    deleteTrain () { // 删除请求的id是suc_id，实际上传的是train_id
      if (this.multipleSelection.length) {
        let ids = [] // 保存选中的数据的id
        for (let i = 0; i < this.multipleSelection.length; i++) {
          ids.push(this.multipleSelection[i].train_id)
        }
        this.$confirm('此操作将永久删除该数据，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then((res) => {
          axios.get('/sub/train/deleteTrainById?suc_id=' + ids).then((res) => {
            if (res.data.code === 200) {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              this.gettrainList()
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
.train-content{
  width:100%;
  height:81%;
  overflow-y: scroll;
  overflow-x:hidden;
  @include scrollBar(8px);
}
</style>
