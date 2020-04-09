<template>
  <div id="lunbo">
    <div class="container">
      <el-form :inline="true">
          <el-button type="primary" size="medium" icon="el-icon-plus" @click="$refs.addDialog.open(null)">{{ $t("lunbo.button.addone") }}</el-button>
          <el-button type="danger" size="medium" icon="el-icon-delete" @click="deleteLunbo">{{ $t("newstwo.button.deleteselectd") }}</el-button>
          <span>{{ $t('lunbo.total') }} {{ lunboList.length }} 条</span>
      </el-form>
      <div class="lunbo-content">
        <el-table
          :data="lunboList"
          height="465"
          stripe>
            <el-table-column
            :label="$t('lunbo.table.id.name')"
            type="index"
            width="55"
          />
            <!-- <template slot-scope="scope">
            (当前页 - 1) * 当前显示数据条数 + 当前行数据的索引 + 1 
            <span>{{ (page.currentPage - 1) * page.pageSize + scope.$index + 1 }}</span>
            </template> -->
            <!-- <el-table-column
              :label="$t('lunbo.table.lunbo_name.name')"
              prop="lunbo_name"
            /> -->
            <el-table-column
              :label="$t('lunbo.table.lunbo_img.name')"
              prop="lunbo_img"
            />
            <el-table-column
              :label="$t('lunbo.table.operate')"
              prop="operation"
              align="center"
              width="200"
            >
              <template slot-scope="scope">
                <el-button
                  type="danger"
                  size="mini"
                  class="el-icon-delete"
                  @click.stop="deleteLunbo()"
                >删除</el-button>
              </template>
            </el-table-column>
        </el-table>
        <!-- <page-component :total="page.totalSize" :page="page" @pageChange="(item)=>handlePageChange(item)" /> -->
        <add-dialog ref="addDialog" title="新增轮播图" @OnConfirm="(item)=>addOne(item)" />
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
      lunboList: []
    }
  },
  mounted () {
    this.getlunboList()
  },
  methods: {
    getlunboList () {
      axios.get('/sub/line/findAllLine?page=1&pageSize=10').then((res) => {
        this.page.currentPage = res.data.data.currentPage
        this.page.pageSize = res.data.data.size
        this.page.totalPage = res.data.data.pages
        this.page.totalSize = res.data.data.total
        this.lunboList = res.data.data.list

        console.log(res.data.data.list)
        console.log(this.lunboList)
        // this.loading = false
      })
    },
    handlePageChange (item) {
      console.log(item.pageSize, item.currentPage)
      // 发送分页查询请求
    },
    // 删除表格一条数据
    deleteLunbo () {
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
.lunbo-content{
  width:100%;
  height:81%;
  overflow-y: scroll;
  overflow-x:hidden;
  @include scrollBar(8px);
}
</style>
