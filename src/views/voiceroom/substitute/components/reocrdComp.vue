<!-- 红钻明细组件 -->
<template>
    <div class="record-box">
        <el-Dialog
        class="recordPop"
        :size="'1200'"
        :visible.sync="drawer"
        :wrapperClosable="false"
        :destroy-on-close="true"
        @closed="closed">
        <div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset" @onSearch="onSearch"></SearchPanel>
        </div>
        <tableList :cfgs="cfgs" ref="tableList"></tableList>

        </el-Dialog>
    </div>
</template>

<script>
// 引入api
import REQUEST from '@/request/index.js'
import {} from '@/api/substitute'
// 引入菜单组件
import SearchPanel from '@/components/SearchPanel/final.vue'
// 引入列表组件
import tableList from '@/components/tableList/TableList.vue'
// 引入公共方法
import { timeFormat } from '@/utils/common.js'
export default {
    data() {
        return {
            drawer: false,
            form: {},
            searchParams: {},
            dateTimeParams: {},
            typeList: [
                {
                    id: 1,
                    name: "红钻充值"
                },
                {
                    id: 2,
                    name: "红钻扣款"
                },
                {
                    id: 3,
                    name: "金币充值"
                },
                {
                    id: 4,
                    name: "金豆兑换红钻"
                },
                {
                    id: 0,
                    name: "其他"
                },
            ]
        };
    },
    components: {
        SearchPanel,
        tableList,
    },
    computed: {
    forms() {
      return [
        {
            name: 'user_number',
            type: 'input',
            value: '',
            label: '用户ID',
            placeholder: '请输入用户ID'
        },
        {
            name: 'dateTimeParams',
            type: 'datePicker',
            dateType: 'datetimerange',
            format: "yyyy-MM-dd HH:mm:ss",
            label: '时间选择',
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
        url: REQUEST.substitute.rechargeLog,
        columns: [
          {
            label: '充值用户ID',
            prop: 'user_number'
          },
          {
            label: '充值用户昵称',
            prop: ''
          },
          {
            label: '到账钻石',
            prop: 'red_diamond'
          },
          {
            label: '变动时间',
            prop: 'create_time',
            render: (h, params) => {
              return h('span', params.row.create_time ? timeFormat(params.row.create_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
            }
          },
        ]
      }
    }
  },
    methods: {
        // 获取数据
        loadParams(row) {
            this.drawer = true;
            this.form = row;
        },
        // 配置参数
        beforeSearch(params) {
        let s = { ...this.searchParams,...this.dateTimeParams};
        return {
            page: params.page ? params.page : 1,
            pagesize: params.pagesize ? params.pagesize : 10,
            user_number: s.user_number ? s.user_number : "",
            start_time: Math.floor(s.start_time / 1000),
            end_time: Math.floor(s.end_time / 1000),
        }
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
        // 查询
        onSearch() {
            this.getList()
        },
        // 刷新列表
        getList() {
            this.$refs.tableList.getData()
        },
        // 重置
        reset() {
            this.searchParams = {}
            this.getList()
        },
        // 销毁组件
        closed() {
            this.$emit('handleRecordFun')
        }
    }
}
</script>