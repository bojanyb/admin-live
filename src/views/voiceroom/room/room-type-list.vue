<template>
  <div class="room-type-list-box">
    <div class="addBox">
      <el-button type="success" @click="add">新 增</el-button>
    </div>

    <tableList :cfgs="cfgs" ref="tableList"></tableList>

    <!-- 编辑组件 -->
    <roomTypeComp v-if="isDestoryComp" ref="roomTypeComp" @destoryComp="destoryComp" @getList="getList"></roomTypeComp>
  </div>
</template>

<script>
// 引入api
import { getRoomGenreSave } from '@/api/videoRoom'
// 引入编辑组件
import roomTypeComp from './components/roomTypeComp.vue'
// 引入列表组件
import tableList from '@/components/tableList/TableList.vue'
// 引入api
import REQUEST from '@/request/index.js'
// 引入公共方法
import { timeFormat } from '@/utils/common.js'
// 引入公共参数
import mixins from '@/utils/mixins.js'
export default {
  mixins: [mixins],
  components: {
    tableList,
    roomTypeComp
  },
  computed: {
    cfgs() {
      return {
        vm: this,
        url: REQUEST.room.genre,
        columns: [
          {
            label: '序号',
            prop: 'sort'
          },
          {
            label: '类型名称',
            prop: 'name'
          },
          {
            label: '创建时间',
            render: (h, params) => {
              return h('span', params.row.create_time ? timeFormat(params.row.create_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
            }
          },
          {
            label: '开始时间',
            render: (h, params) => {
              return h('span', params.row.start_time ? timeFormat(params.row.start_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
            }
          },
          {
            label: '操作',
            render: (h, params) => {
              return h('div', [
                h('el-button', { props: { type: 'primary'}, on: {click:()=>{this.update(params.row)}}},'修改'),
                h('el-button', { props: { type: 'danger'}, on: {click:()=>{this.deleteParams(params.row)}}},'删除')
              ])
            }
          }
        ]
      }
    }
  },
  data() {
    return {
      isDestoryComp: false, // 是否销毁组件
    }
  },
  methods: {
    // 配置参数
    beforeSearch(params) {
      return {
        page: params.page,
        pagesize: params.size
      }
    },
    // 刷新列表
    getList() {
      this.$refs.tableList.getData()
    },
    // 重置
    reset() {
      this.getList()
    },
    // 查询
    onSearch() {
      this.getList()
    },
    // 销毁组件
    destoryComp() {
      this.isDestoryComp = false
    },
    // 新增
    add() {
      this.load('add')
    },
    // 修改
    update(row) {
      this.load('update', row)
    },
    load(status, row) {
      this.isDestoryComp = true
      setTimeout(() => {
        this.$refs.roomTypeComp.loadParams(status, row)
      }, 50);
    },
    async deleteParams(row) {
      this.$confirm('确定删除该类型名称吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let params = {
          id: row.id,
          start_time: row.start_time,
          sort: row.sort,
          name: row.name,
          is_del: 2
        }
        let res = await getRoomGenreSave(params)
        if(res.code === 2000) {
          this.$message.success('删除成功')
        }
        this.getList()
      }).catch(() => {});
    }
  }
}
</script>

<style lang="scss">
.room-type-list-box {
  padding: 20px;
  box-sizing: border-box;
  .addBox {
    margin-bottom: 20px;
  }
}
</style>
