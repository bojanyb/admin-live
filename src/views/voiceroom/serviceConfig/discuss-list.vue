<template>
  <div class="app-container discuss-list-box">
      <div class="searchParams">
          <SearchPanel v-model="searchParams"
          :forms="forms"
          :show-reset="true"
          :show-search-btn="true"
          :showYesterday="true"
          :showRecentSeven="true"
          :showToday="true"
          :batchRurnName = "'一键删除评论'"
          @onReset="reset"
          @onSearch="onSearch"
          @yesterday="yesterday"
          @recentSeven="recentSeven"
          @today="today"
          @BatchRurn="BatchRurn"
          ></SearchPanel>
      </div>
      <tableList :cfgs="cfgs" ref="tableList"  @selectionChange="selectionChange"></tableList>
  </div>
</template>

<script>
// 引入api
import { delMoments } from '@/api/dynamic'
// 引入菜单组件
import SearchPanel from '@/components/SearchPanel/final.vue'
// 引入列表组件
import tableList from '@/components/tableList/TableList.vue'
// 引入api
import REQUEST from '@/request/index.js'
// 引入公共参数
import mixins from '@/utils/mixins.js'
// 引入公共方法
import { timeFormat } from '@/utils/common.js'
export default {
  mixins: [mixins],
  components: {
      SearchPanel,
      tableList,
  },
  data() {
      return {
          msg_id: null,
          searchParams: {
              dateTimeParams: []
          },
          dateTimeParams: {
              start_time: null,
              end_time: null
          },
          delList : []
      };
  },
  computed: {
      forms() {
          return [
              {
                  name: 'user_number',
                  type: 'input',
                  value: '',
                  label: '评论者ID',
                  isNum: true,
                  placeholder: '请输入评论者ID'
              },
              {
                  name: 'dateTimeParams',
                  type: 'datePicker',
                  dateType: 'datetimerange',
                  format: "yyyy-MM-dd HH:mm:ss",
                  label: '评论时间',
                  value: '',
                  handler: {
                      change: v => {
                          this.emptyDateTime()
                          this.setDateTime(v)
                      },
                      selectChange: (v, key) => {
                          this.emptyDateTime()
                      }
                  }
              }
          ]
      },
      cfgs() {
          return {
              vm: this,
              isShowCheckbox: true,
              url: REQUEST.dynamic.getMoments,
              columns: [
                  {
                      label: '评论者ID',
                      prop: 'user_number'
                  },
                  {
                      label: '评论者昵称',
                      prop: 'user_nickname'
                  },
                  {
                      label: '评论内容',
                      minWidth: '120px',
                      showOverFlow: true,
                      render: (h, params) => {
                          return h('span', params.row.content || '无')
                      }
                  },
                  {
                      label: '评论时间',
                      prop: 'create_time',
                      minWidth: '100px'
                  },
                  {
                      label: '发布者ID',
                      prop: 'user_number'
                  },
                  {
                      label: '发布动态内容',
                      prop: 'user_number'
                  },
                  {
                      label: '操作',
                      minWidth: '100px',
                      render: (h, params) => {
                          return h('div', [
                              h('el-button', { props: { type: 'danger'}, on: {click:()=>{this.deleteParams(params.row.id)}}}, '删除')
                          ])
                      }
                  }
              ]
          }
      }
  },
  methods: {
      // 今日
      today() {
          this.changeIndex(0)
          this.getList()
      },
      // 昨日
      yesterday() {
          this.changeIndex(1)
          this.getList()
      },
      // 最近七日
      recentSeven() {
          this.changeIndex(2)
          this.getList()
      },
      // 更改日期
      changeIndex(index) {
          let date = new Date()
          let now, now1, start, end;
          switch (index) {
              case 0:
                  now1 = timeFormat(date, 'YYYY-MM-DD', false)
                  now = timeFormat(date, 'YYYY-MM-DD', false)
                  break;
              case 1:
                  now1 = timeFormat(date - 3600 * 1000 * 24 * 1, 'YYYY-MM-DD', false)
                  now = timeFormat(date - 3600 * 1000 * 24 * 1, 'YYYY-MM-DD', false)
                  break;
              case 2:
                  now1 = timeFormat(date, 'YYYY-MM-DD', false)
                  now = timeFormat(date - 3600 * 1000 * 24 * 6, 'YYYY-MM-DD', false)
                  break;
          }
          start = new Date(now + ' 00:00:00')
          end = new Date(now1 + ' 23:59:59')

          let time = [start.getTime(), end.getTime()]
          this.searchParams.dateTimeParams = time
          this.dateTimeParams.start_time = time[0]
          this.dateTimeParams.end_time = time[1]
      },
      // 配置参数
      beforeSearch(params) {
          let s = { ...this.searchParams, ...this.dateTimeParams }
          return {
              page: params.page,
              pagesize: params.size,
              start_time: s.start_time ? Math.floor(s.start_time / 1000) : s.start_time,
              end_time: s.end_time ? Math.floor(s.end_time / 1000) : s.end_time,
              user_number: s.user_number
          }
      },
      // 刷新列表
      getList() {
          this.$refs.tableList.getData()
      },
      // 设置时间段
      setDateTime(arr) {
          const date = arr ? {
              start_time: arr[0],
              end_time: arr[1]
          } : {}
          this.$set(this, 'dateTimeParams', date)
      },
      // 清空日期选择
      emptyDateTime() {
          this.dateTimeParams = {}
      },
      // 重置
      reset() {
          this.searchParams = {}
          // this.dateTimeParams = {}
          this.changeIndex(0)
          this.getList()
      },
      // 删除
      async deleteParams(id) {
          this.$confirm('确认删除当前动态吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
          }).then(async () => {
              let res = await delMoments({ ids: id })
              if(res.code === 2000) {
                  this.$success('删除成功')
                  this.getList()
              }
          }).catch(() => {});
      },
      // 查询
      onSearch() {
          this.getList()
      },
      // 选择
      selectionChange(v){
        this.delList = v;
      },
      // 一键删除评论
      BatchRurn(){
        console.log("一键删除评论");
      },
  },
  created() {
      this.changeIndex(0)
  }
}
</script>

<style lang="scss" scoped>
  
</style>