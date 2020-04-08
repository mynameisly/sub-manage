<template>
  <div id='down'>
    <div class='container'>
      <el-form :inline='true' :model='searchForm'>
        <el-form-item :label="$t('down.searchForm.down_content.label')">
          <el-input
            v-model='searchForm.down_content'
            :placeholder="$t('down.searchForm.down_content.placeholder')">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type='success' size='medium' icon='el-icon-search' @click='onSearch'>{{ $t('down.searchForm.searchdata.name') }}</el-button>
          <el-button type='primary' size='medium' icon='el-icon-plus' @click='$refs.addDialog.open(null)'>{{ $t('down.button.addone') }}</el-button>
          <span>{{ $t('down.total') }}{{ downList.length }} 条</span>
        </el-form-item>
      </el-form>
      <div class='down-content'>
        <el-table 
         :data="downList"
         height="390"
         border
         @cell-mouse-enter='mouseEnter'>
          <el-table-column 
            :label="$t('down.table.id.name')"
            type='index' 
            width='55'
          />
      <!-- <template scope='scope'> -->
            <!-- (当前页 - 1) * 当前显示数据条数 + 当前行数据的索引 + 1 -->
            <!-- <span>{{ (page.currentPage - 1) * page.pageSize + scope.$index + 1 }}</span> -->
          <!-- </template> -->
            <el-table-column
              :label="$t('down.table.down_content.name')"
              prop='down_content'
            />
            <el-table-column
              :label="$t('down.table.operate')"
              prop='operation'
              align='center'
              width='200'
            >
              <template slot-scope="scope">
                <el-button
                  type='primary'
                  size='mini'
                  class='el-icon-download'
                  @click.stop='$refs.updateDialog.open(focusedRecord)'
                >下载</el-button>
              </template>
              <template>
                <el-button
                  type='danger'
                  size='mini'
                  class='el-icon-delete'
                  @click.stop='deletedown()'
                >删除</el-button>
              </template>
            </el-table-column>
        </el-table>
      </div>
      <page-component :total="page.totalSize" :page="page" @pageChange="(item)=>handlePageChange(item)" />
      <add-dialog ref='addDialog' title='新增文件' @OnConfirm="(item)=>addOne(item,'post')" />
      <add-dialog ref='updateDialog' title='修改文件' @OnConfirm="(item)=>addOne(item,'post')" />
    </div>
  </div>
</template>
<script>
// import { getdownlist, getclientlist } from '@/api/deliver';
import AddDialog from './edit-dialog';
import PageComponent from '@/components/pagination/index'
export default {
  components: {
    AddDialog,
    PageComponent
  },
  data() {
    return {
      searchForm: {
        down_content: ''
      },
      downList: [
        {
          down_content: 'JavaScript犀牛书'
        },
        {
          down_content: 'JavaScript高级程序设计'
        }
      ],
      focusedRecord: {},
      page: {
        currentPage: 0, // 当前页
        pageSize: 0, // 每页条数
        totalSize: 0, // 总条数
        totalPage: 0 // 总页数
      }
    }
  },
  mounted() {
    this.getdownlist();
  },
  methods: {
    addOne(data, method) {
      console.log(data, method);
      this.downList.push(data)
      // 发送添加请求
    },
    onSearch() {
      console.log(this.searchForm);
    // 发送搜索请求
    },
    getdownlist() {

    },
    mouseEnter(data) {
      // console.log(data);//这里可以打印每一行的内容
      // 点击编辑
      this.dialogFormVisible = true // 显示弹框
      // let _row = row
      // 将每一行的数据赋值给dialog弹框
      this.focusedRecord = Object.assign({}, data);// focusedRecord是弹框的data
    },
    handlePageChange (item) {
      // axios.get('/sub/line/findAllLine?page=' + item.currentPage + '&pageSize=' + item.pageSize).then((res) => {
      //   this.page.currentPage = res.data.data.currentPage
      //   this.page.pageSize = res.data.data.size
      //   this.page.totalPage = res.data.data.pages
      //   this.page.totalSize = res.data.data.total
      //   this.downList = res.data.data.list
      // })
    },
    //删除表格一条数据
    deletedown() {
        //发送删除请求
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
<style lang='scss' scoped>
@import '~@/styles/mixin.scss';
.down-content{
  width:100%;
  height:81%;
  overflow-y: scroll;
  overflow-x:hidden;
  @include scrollBar(8px);
}
</style>
