<template>
  <div id="suctwo">
    <div class="container">
      <el-form :inline="true" :model="searchForm">
        <el-form-item :label="$t('suctwo.searchForm.suctwo_title.label')">
          <el-input
            v-model="searchForm.suctwo_title"
            :placeholder="$t('suctwo.searchForm.suctwo_title.placeholder')">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" size="medium" icon="el-icon-search" @click="onSearch">{{ $t("suctwo.searchForm.searchdata.name") }}</el-button>
          <el-button type="primary" size="medium" icon="el-icon-plus" @click="$refs.addDialog.open(null)">{{ $t("suctwo.button.addone") }}</el-button>
          <el-button type="danger" size="medium" icon="el-icon-delete" @click="deletesuctwo">{{ $t("newstwo.button.deleteselectd") }}</el-button>
          <el-button type="warning" size="medium" icon="el-icon-download" @click="handleDownload">{{ $t("suctwo.button.bulkImport") }}</el-button>
          <span>{{ $t('suctwo.total') }} {{ suctwoList.length }} 条</span>
        </el-form-item>
      </el-form>
      <div class="suctwo-content">
        <el-table
          :data="suctwoList"
          border
          stripe
          height="395"
          v-loading="loading"
          element-loading-text="拼命加载中"
          @cell-mouse-enter="mouseEnter"
          @selection-change="handleSelectionChange">
          <el-table-column type="selection" align="center" />
          <el-table-column
            :label="$t('suctwo.table.id.name')"
            type="index"
            width="55"
          />
      <!-- <template scope="scope"> -->
            <!-- (当前页 - 1) * 当前显示数据条数 + 当前行数据的索引 + 1 -->
            <!-- <span>{{ (page.currentPage - 1) * page.pageSize + scope.$index + 1 }}</span> -->
          <!-- </template> -->
          <el-table-column
            :label="$t('suctwo.table.suctwo_title.name')"
            prop="suctwo_title"
          />
          <el-table-column
            :label="$t('suctwo.table.suctwo_img.name')"
            prop="suctwo_img"
          />
          <el-table-column
            :label="$t('suctwo.table.suctwo_person.name')"
            prop="suctwo_person"
          />
          <el-table-column
            :label="$t('suctwo.table.suctwo_prize.name')"
            prop="suctwo_prize"
          />
          <el-table-column
            :label="$t('suctwo.table.operate')"
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
        <add-dialog ref="addDialog" title="添加成果" @OnConfirm="(item)=>addOne(item)" />
        <add-dialog ref="updateDialog" title="修改成果" @OnConfirm="(item)=>updateOne(item)" />
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
        suctwo_title: ''
      },
      suctwoList: [],
      addForm: {
      },
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
    this.getsuctwoList()
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
    getsuctwoList () {
      // const item = {
      //   suctwo_title: '二级成果展示标题。。。',
      //   suctwo_img: '二级成果展示图片地址。。。',
      //   suctwo_person: '二级成果展示参赛人。。。',
      //   suctwo_prize: '二级成果展示奖项。。。'
      // }

      // for (let i = 0; i < 5; i++) {
      //   this.suctwoList.push(item)
      // }
      axios.get('/sub/train/findAllSucTwo?page=1&pageSize=10').then((res) => {
        this.page.currentPage = res.data.data.currentPage
        this.page.pageSize = res.data.data.size
        this.page.totalPage = res.data.data.pages
        this.page.totalSize = res.data.data.total
        this.suctwoList = res.data.data.list
        // console.log(res.data.data.list)
        this.loading = false
      })
    },
    handleDownload () {

    },
    onSearch () {
      console.log(this.searchForm)
    // 发送搜索请求
    },
    addOne (item) {
      axios.post('/sub/train/addSucTwo?suctwo_img=' + item.suctwo_img + '&suctwo_title=' + item.suctwo_title +
      '&suctwo_person=' + item.suctwo_person + '&suctwo_prize=' + item.suctwo_prize + '&create_name=ly' + item.create_name +
      '&update_name=ly' + item.update_name + '&remarks=test' + item.remarks).then((res) => {
        if (res.data.code === 200) {
          this.$message({
            type: 'success',
            message: '新增成功'
          })
        }
        this.getsuctwoList()
      })
    },
    updateOne (item) {
      axios.post('/sub/train/updateSucTwoInfo?suctwo_id=' + item.suctwo_id +
      '&suctwo_title=' + item.suctwo_title + '&suctwo_img=' + item.suctwo_img +
      '&suctwo_person=' + item.suctwo_person + '&suctwo_prize=' + item.suctwo_prize +
      '&update_name=ly' + item.update_name + '&remarks=test' + item.remarks).then((res) => {
        if (res.data.code === 200) {
          this.$message({
            type: 'success',
            message: '修改成功'
          })
        }
        this.getsuctwoList()
      })
    },
    handlePageChange (item) {
      axios.get('/sub/train/findAllSucTwo?page=' + item.currentPage + '&pageSize=' + item.pageSize).then((res) => {
        this.page.currentPage = res.data.data.currentPage
        this.page.pageSize = res.data.data.size
        this.page.totalPage = res.data.data.pages
        this.page.totalSize = res.data.data.total
        this.suctwoList = res.data.data.list
      })
    },
    deletesuctwo () {
      if (this.multipleSelection.length) {
        let ids = [] // 保存选中的数据的id
        for (let i = 0; i < this.multipleSelection.length; i++) {
          ids.push(this.multipleSelection[i].suctwo_id)
        }
        this.$confirm('此操作将永久删除该数据，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then((res) => {
          axios.get('/sub/train/deleteSucTwoById?suctwo_id=' + ids).then((res) => {
            if (res.data.code === 200) {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              this.getsuctwoList()
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
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.suctwo-content{
  width:100%;
  height:81%;
  overflow-y: scroll;
  overflow-x:hidden;
  @include scrollBar(8px);
}
</style>
