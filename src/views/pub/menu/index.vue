<template>
  <div id="menu">
    <div class="container">
      <el-form :inline="true">
        <el-button type="primary" size="medium" icon="el-icon-plus" @click="$refs.addDialog.open(null)">{{ $t("menu.button.addone") }}</el-button>
        <el-button type="danger" size="medium" icon="el-icon-delete" @click="deletemenu">{{ $t("newstwo.button.deleteselectd") }}</el-button>
        <span>{{ $t('menu.total') }} {{ menuList.length }} 条</span>
      </el-form>
      <div class="menu-content">
        <el-table
        :data="menuList"
        border
        stripe
        height="80%"
        v-loading="loading"
        element-loading-text="拼命加载中"
        @cell-mouse-enter="mouseEnter"
        @selection-change="handleSelectionChange">
          <el-table-column type="selection" align="center" />
          <el-table-column
            :label="$t('menu.table.id.name')"
            type="index"
            width="55"
          />
            <!-- <template slot-scope="scope"> -->
              <!-- (当前页 - 1) * 当前显示数据条数 + 当前行数据的索引 + 1 -->
              <!-- <span>{{ (page.currentPage - 1) * page.pageSize + scope.$index + 1 }}</span> -->
            <!-- </template> -->
            <el-table-column
              :label="$t('menu.table.menu_name.name')"
              prop="menu_name"
            />
            <el-table-column
              :label="$t('menu.table.operate')"
              prop="operation"
              align="center"
              width="100"
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
        <add-dialog ref="addDialog" title="新增菜单" @OnConfirm="(item)=>addOne(item)" />
        <add-dialog ref="updateDialog" title="修改菜单" @OnConfirm="(item)=>updateOne(item)" />
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
      menuList: [],
      focusedRecord: {},
      loading: true,
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
    this.getmenuList()
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    getmenuList () {
      // const item = {
      //   menu_name: '菜单名称'
      // };

      // for (let i = 0; i < 5; i++) {
      //   this.menuList.push(item)
      // }
      axios.get('/sub/menu/findAllMenu?page=1&pageSize=10').then((res) => {
        this.page.currentPage = res.data.data.currentPage
        this.page.pageSize = res.data.data.size
        this.page.totalPage = res.data.data.pages
        this.page.totalSize = res.data.data.total
        this.menuList = res.data.data.list
        console.log('进入到菜单所有数据')
        console.log(res.data.data.list)
        this.loading = false
      })
    },
    mouseEnter (data) {
      // console.log(data);//这里可以打印每一行的内容
      // 点击编辑
      this.dialogFormVisible = true // 显示弹框
      // let _row = row
      // 将每一行的数据赋值给dialog弹框
      this.focusedRecord = Object.assign({}, data)// focusedRecord是弹框的data
    },
    addOne (item) {
      // console.log(item)
      axios.post('/sub/menu/addMenu?menu_name=' + item.menu_name + '&create_name=ly' + item.create_name +
      '&update_name=ly' + item.update_name + '&remarks=test' + item.remarks).then((res) => {
        if (res.data.code === 200) {
          this.$message({
            type: 'success',
            message: '新增成功'
          })
        }
        this.getmenuList()
      })
    },
    updateOne (item) {
      axios.post('/sub/menu/updateMenuInfo?menu_id=' + item.menu_id + '&menu_name=' + item.menu_name +
      '&update_name=ly' + item.update_name + '&remarks=test' + item.remarks).then((res) => {
        if (res.data.code === 200) {
          this.$message({
            type: 'success',
            message: '修改成功'
          })
        }
        this.getmenuList()
      })
    },
    // 删除表格一条数据
    deletemenu () {
      if (this.multipleSelection.length) {
        let ids = [] // 保存选中的数据的id
        for (let i = 0; i < this.multipleSelection.length; i++) {
          ids.push(this.multipleSelection[i].menu_id)
        }
        this.$confirm('此操作将永久删除该数据，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then((res) => { // 这里的接口名字叫user_id？
          axios.get('/sub/menu/deleteMenuById?user_id=' + ids).then((res) => {
            if (res.data.code === 200) {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              this.getmenuList()
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
.menu-content{
  width:100%;
  height:81%;
  overflow-y: scroll;
  overflow-x:hidden;
  @include scrollBar(8px);
}
</style>
