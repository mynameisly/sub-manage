<template>
  <div id="team">
    <div class="container">
      <el-form :inline="true" :model="searchForm">
        <el-form-item :label="$t('team.searchForm.team_teacher.label')">
          <el-input
            v-model="searchForm.team_teacher"
            :placeholder="$t('team.searchForm.team_teacher.placeholder')">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" size="medium" icon="el-icon-search" @click="onSearch">{{ $t("team.searchForm.searchdata.name") }}</el-button>
          <el-button type="primary" size="medium" icon="el-icon-plus" @click="$refs.addDialog.open(null)">{{ $t("team.button.addone") }}</el-button>
          <el-button type="danger" size="medium" icon="el-icon-delete" @click="deleteTeam">{{ $t("newstwo.button.deleteselectd") }}</el-button>
          <el-button type="warning" size="medium" icon="el-icon-download" @click="handleDownload">{{ $t("team.button.bulkImport") }}</el-button>
          <span>{{ $t('team.total') }} {{ teamList.length }} 条</span>
        </el-form-item>
      </el-form>
      <div class="team-content">
        <el-table
          :data="teamList"
          border
          stripe
          height="395"
          v-loading="loading"
          element-loading-text="拼命加载中"
          @cell-mouse-enter="mouseEnter"
          @selection-change="handleSelectionChange">
          <el-table-column type="selection" align="center" />
          <el-table-column
            :label="$t('team.table.id.name')"
            type="index"
            width="55"
          />
      <!-- <template scope="scope"> -->
            <!-- (当前页 - 1) * 当前显示数据条数 + 当前行数据的索引 + 1 -->
            <!-- <span>{{ (page.currentPage - 1) * page.pageSize + scope.$index + 1 }}</span> -->
          <!-- </template> -->
            <el-table-column
              :label="$t('team.table.team_img.name')"
              prop="team_img"
            />
            <el-table-column
              :label="$t('team.table.team_teacher.name')"
              prop="team_teacher"
            />
            <el-table-column
              :label="$t('team.table.team_person.name')"
              prop="team_person"
            />
            <el-table-column
              :label="$t('team.table.team_comment.name')"
              prop="team_comment"
            />
            <el-table-column
              :label="$t('team.table.operate')"
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
      searchForm: {
        team_teacher: ''
      },
      teamList: [],
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
    this.getteamList()
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
    getteamList () {
      // const item = {
      //   team_img: '二级团队建设内容。。。',
      //   team_teacher: '二级团队建设内容。。。',
      //   team_person: '二级团队建设内容。。。',
      //   team_comment: '二级团队建设内容。。。'
      // }

      // for (let i = 0; i < 5; i++) {
      //   this.teamList.push(item)
      // }

      axios.get('/sub/team/findAllTeam?page=1&pageSize=10').then((res) => {
        this.page.currentPage = res.data.data.currentPage
        this.page.pageSize = res.data.data.size
        this.page.totalPage = res.data.data.pages
        this.page.totalSize = res.data.data.total
        this.teamList = res.data.data.list
        // console.log(res.data.data.list)
        this.loading = false
      })
    },
    onSearch () {
      console.log(this.searchForm)
    // 发送搜索请求
    },
    addOne (item) {
      axios.post('/sub/team/addTeam?team_img=' + item.team_img + '&team_teacher=' + item.team_teacher +
      '&team_person=' + item.team_person + '&team_comment=' + item.team_comment + '&create_name=ly' + item.create_name +
      '&update_name=ly' + item.update_name + '&remarks=test' + item.remarks).then((res) => {
        if (res.data.code === 200) {
          this.$message({
            type: 'success',
            message: '新增成功'
          })
        }
        this.getteamList()
      })
    },
    updateOne (item) {
      axios.post('/sub/team/updateTeamInfo?team_id=' + item.team_id +
      '&team_img=' + item.team_img + '&team_teacher=' + item.team_teacher +
      '&team_person=' + item.team_person + '&team_comment=' + item.team_comment +
      '&update_name=ly' + item.update_name + '&remarks=test' + item.remarks).then((res) => {
        if (res.data.code === 200) {
          this.$message({
            type: 'success',
            message: '修改成功'
          })
        }
        this.getteamList()
      })
    },
    handleDownload () {

    },
    handlePageChange (item) {
      axios.get('/sub/team/findAllTeam?page=' + item.currentPage + '&pageSize=' + item.pageSize).then((res) => {
        this.page.currentPage = res.data.data.currentPage
        this.page.pageSize = res.data.data.size
        this.page.totalPage = res.data.data.pages
        this.page.totalSize = res.data.data.total
        this.teamList = res.data.data.list
      })
    },
    deleteTeam () {
      if (this.multipleSelection.length) {
        let ids = [] // 保存选中的数据的id
        for (let i = 0; i < this.multipleSelection.length; i++) {
          ids.push(this.multipleSelection[i].team_id)
        }
        this.$confirm('此操作将永久删除该数据，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then((res) => {
          axios.get('/sub/team/deleteTeamById?team_id=' + ids).then((res) => {
            if (res.data.code === 200) {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              this.getteamList()
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
.team-content{
  width:100%;
  height:81%;
  overflow-y: scroll;
  overflow-x:hidden;
  @include scrollBar(8px);
}
</style>
