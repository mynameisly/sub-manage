<template>
  <div id="sign">
    <div class="container">
      <el-form :inline="true" :model="searchForm">
        <el-form-item :label="$t('sign.searchForm.sign_stime.label')">
          <el-input
            v-model="searchForm.sign_stime"
            :placeholder="$t('sign.searchForm.sign_stime.placeholder')">
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('sign.searchForm.sign_etime.label')">
          <el-input
            v-model="searchForm.sign_etime"
            :placeholder="$t('sign.searchForm.sign_etime.placeholder')">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" size="medium"  icon="el-icon-search" @click="onSearch">{{ $t("sign.searchForm.searchdata.name") }}</el-button>
          <el-button type="primary" size="medium" icon="el-icon-plus" @click="$refs.addDialog.open(null)">{{ $t("sign.button.addone") }}</el-button>
          <el-button type="danger" size="medium" icon="el-icon-delete" @click="deleteSign">{{ $t("newstwo.button.deleteselectd") }}</el-button>
          <el-button type="warning" size="medium"  icon="el-icon-download" @click="handleDownload">{{ $t("sign.button.bulkImport") }}</el-button>
          <span>{{ $t('sign.total') }} {{ signList.length }} 条</span>
        </el-form-item>
      </el-form>
      <div class="sign-content">
        <el-table
          :data="signList"
          border
          stripe
          height="80%"
          v-loading="loading"
          element-loading-text="拼命加载中"
          :default-sort="{prop: 'sign_stime', order: 'descending'}"
          :header-cell-class-name="handleHeaderCellClass"
          @cell-mouse-enter="mouseEnter"
          @selection-change="handleSelectionChange">
            <el-table-column type="selection" align="center" />
            <el-table-column
            :label="$t('sign.table.id.name')"
            type="index"
            width="55"
          />
      <!-- <template scope="scope"> -->
            <!-- (当前页 - 1) * 当前显示数据条数 + 当前行数据的索引 + 1 -->
            <!-- <span>{{ (page.currentPage - 1) * page.pageSize + scope.$index + 1 }}</span> -->
          <!-- </template> -->
            <el-table-column
              :label="$t('sign.table.sign_img.name')"
              prop="sign_img"
            />
            <el-table-column
              :label="$t('sign.table.sign_title.name')"
              prop="sign_title"
            />
            <el-table-column
              :label="$t('sign.table.sign_stime.name')"
              prop="sign_stime"
              sortable
            />
            <el-table-column
              :label="$t('sign.table.sign_etime.name')"
              prop="sign_etime"
            />
            <el-table-column
              :label="$t('sign.table.sign_sm_time.name')"
              prop="sign_sm_time"
            />
            <el-table-column
              :label="$t('sign.table.sign_em_time.name')"
              prop="sign_em_time"
            />
            <el-table-column
              :label="$t('sign.table.totle_time.name')"
              prop="total_time"
            />
            <el-table-column
              :label="$t('sign.table.sign_sponsor.name')"
              prop="sign_sponsor"
            />
            <el-table-column
              :label="$t('sign.table.operate')"
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
        <add-dialog ref="addDialog" title="添加竞赛报名" @OnConfirm="(item)=>addOne(item)" />
        <add-dialog ref="updateDialog" title="修改竞赛报名" @OnConfirm="(item)=>updateOne(item)" />
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
  data () { // 这个接口多了一个比赛状态，原来的没有这个sign_status字段的
    return {
      searchForm: {
        sign_stime: '',
        sign_etime: ''
      },
      signList: [],
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
    this.getsignList()
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
    getsignList () {
      // const item = {
      //   sign_img: '竞赛报名内容。。。', // 二级竞赛报名大赛图片
      //   sign_title: '竞赛报名内容。。。', // 二级竞赛报名大赛标题
      //   sign_stime: '竞赛报名内容。。。', // 二级竞赛报名开始时间
      //   sign_etime: '竞赛报名内容。。。', // 二级竞赛报名结束时间
      //   sign_sm_time: '竞赛报名内容。。。', // 二级竞赛比赛开始时间
      //   sign_em_time: '竞赛报名内容。。。', // 二级竞赛比赛结束时间
      //   sign_sponsor: '竞赛报名内容。。。', // 二级竞赛大赛主办方
      //   total_time: '竞赛报名内容。。。' // 二级竞赛大赛比赛总时长
      // }

      // for (let i = 0; i < 5; i++) {
      //   this.signList.push(item)
      // }

      axios.get('/sub/sign/findAllSign?page=1&pageSize=10').then((res) => {
        this.page.currentPage = res.data.data.currentPage
        this.page.pageSize = res.data.data.size
        this.page.totalPage = res.data.data.pages
        this.page.totalSize = res.data.data.total
        this.signList = res.data.data.list
        console.log('111111111',res.data.data.list)
        this.loading = false
      })
    },
    onSearch () {
      console.log(this.searchForm)
    // 发送搜索请求
    },
    handleDownload () {

    },
    addOne (item) {
      axios.post('/sub/sign/addSign?sign_img=' + item.sign_img + '&sign_title=' + item.sign_title +
      '&sign_stime=' + item.sign_stime + '&sign_etime=' + item.sign_etime +
      '&sign_sm_time=' + item.sign_sm_time + '&sign_em_time=' + item.sign_em_time +
      '&sign_sponsor=' + item.sign_sponsor + '&total_time=' + item.total_time + '&sign_status=0' + item.sign_status +
      '&create_name=ly' + item.create_name + '&update_name=ly' + item.update_name + '&remarks=test' + item.remarks).then((res) => {
        if (res.data.code === 200) {
          this.$message({
            type: 'success',
            message: '新增成功'
          })
        }
        this.getsignList()
      })
    },
    updateOne (item) {
      axios.post('/sub/sign/updateSignInfo?sign_id=' + item.sign_id + '&sign_img=' + item.sign_img + '&sign_title=' + item.sign_title +
      '&sign_stime=' + item.sign_stime + '&sign_etime=' + item.sign_etime +
      '&sign_sm_time=' + item.sign_sm_time + '&sign_em_time=' + item.sign_em_time +
      '&sign_sponsor=' + item.sign_sponsor + '&total_time=' + item.total_time + '&sign_status=0' + item.sign_status +
      '&update_name=ly' + item.update_name + '&remarks=test' + item.remarks).then((res) => {
        if (res.data.code === 200) {
          this.$message({
            type: 'success',
            message: '修改成功'
          })
        }
        this.getsignList()
      })
    },
    handlePageChange (item) {
      axios.get('/sub/sign/findAllSign?page=' + item.currentPage + '&pageSize=' + item.pageSize).then((res) => {
        this.page.currentPage = res.data.data.currentPage
        this.page.pageSize = res.data.data.size
        this.page.totalPage = res.data.data.pages
        this.page.totalSize = res.data.data.total
        this.signList = res.data.data.list
      })
    },
    deleteSign () {
      if (this.multipleSelection.length) {
        let ids = [] // 保存选中的数据的id
        for (let i = 0; i < this.multipleSelection.length; i++) {
          ids.push(this.multipleSelection[i].sign_id)
        }
        this.$confirm('此操作将永久删除该数据，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then((res) => {
          axios.get('/sub/sign/deleteSignById?sign_id=' + ids).then((res) => {
            if (res.data.code === 200) {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              this.getsignList()
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
.sign-content{
  width:100%;
  height:81%;
  overflow-y: scroll;
  overflow-x:hidden;
  @include scrollBar(8px);
}
</style>
