// 提现申请
<template>
    <div class="finance-embodyApply">
        <div class="model" v-if="tabIndex === '0'">
            <span>未处理申请：{{ ruleForm.count || 0 }}条</span>
            <span>提现金额：{{ ruleForm.totalMoney / 100 || 0 }}元</span>
            <span>手续费：{{ ruleForm.totalMoneyRate / 100 || 0 }}元</span>
            <span>到账金额：{{ Number(((ruleForm.totalMoney - ruleForm.totalMoneyRate) / 100).toFixed(2)) || 0 }}元</span>
            <span>当前页到账金额：{{ Number(((ruleForm.realMoneyTotal) / 100).toFixed(2)) || 0 }}元</span>
        </div>
        <!-- <menuComp ref="menuComp" :menuList="menuList" v-model="tabIndex"></menuComp> -->
        <div class="searchParams" v-if="tabIndex === '0'">
            <SearchPanel
              v-model="searchParams"
              :forms="forms"
              :showExport="true"
              :show-search-btn="true"
              :showYesterday="true"
              :showRecentSeven="true"
              :showToday="true"
              @onSearch="onSearch"
              :show-batch-pass="true"
              @export="handleExcelExport"
              @batchPass="batchPass"
              :show-batch-rurn="true"
              :showBeforeYesterday="true"
              @BatchRurn="BatchRurn"
              @yesterday="yesterday"
              @recentSeven="recentSeven"
              @today="today"
              @beforeYesterday="beforeYesterday"

              :show-custom="true"
              custom-name="批量支付(小猪)"
              @custom="handleBatchTopUp"
              ></SearchPanel>
        </div>
        <div class="tableList">
            <tableList :cfgs="cfgs" ref="tableList" @selectionChange="selectionChange" @saleAmunt="saleAmunt" layout="total, sizes, prev, pager, next, jumper"></tableList>
        </div>
    </div>
</template>

<script>
// 引入tab菜单组件
import menuComp from '@/components/menuComp/index.vue'
// 引入api
import { doCash, exprotCash, batchCash } from '@/api/finance'
// 引入列表组件
import tableList from '@/components/tableList/TableList.vue'
// 引入菜单组件
import SearchPanel from '@/components/SearchPanel/final.vue'
// 引入公共参数
import mixins from '@/utils/mixins.js'
// 引入api
import REQUEST from '@/request/index.js'
// 引入公共方法
import { timeFormat, exportTableData } from '@/utils/common.js'
// 引入公共map
import MAPDATA from '@/utils/jsonMap.js'

export default {
    components: {
        tableList,
        SearchPanel,
        menuComp
    },
    mixins: [mixins],
    computed: {
        forms() {
            return [
                {
                    name: 'user_id',
                    type: 'input',
                    value: '',
                    label: '用户ID',
                    isNum: true,
                    placeholder: '请输入用户ID'
                },
                {
                    name: 'channel',
                    type: 'select',
                    value: '',
                    keyName: 'value',
                    optionLabel: 'name',
                    label: '提现通道',
                    placeholder: '请选择',
                    clearable: true,
                    options: MAPDATA.CASHCHANNEL
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
                            this.getList()
                        },
                        selectChange: (v, key) => {
                            this.emptyDateTime()
                            this.getList()
                        }
                    }
                }
            ]
        },
        cfgs() {
            let arr = [
                {
                    label: '提现时间',
                    width: '160px',
                    render: (h, params) => {
                        return h('span', params.row.addtime ? timeFormat(params.row.addtime, 'YYYY-MM-DD HH:mm:ss', true) : '--')
                    }
                },
                {
                    label: '用户',
                    width: '160px',
                    render: (h, params) => {
                        return h('div', [
                            h('div', params.row.nickname),
                            h('div', params.row.user_number)
                        ])
                    }
                },
                {
                    label: '用户角色',
                    prop: 'role',
                },
                {
                    label: '喵粮',
                    prop: 'money',
                },
                {
                    label: '提现金额',
                    render: (h, params) => {
                        return h('span', params.row.money / 100)
                    }
                },
                {
                    label: '手续费',
                    prop: 'cash_rate',
                    render: (h, params) => {
                        let money = Math.floor((params.row.money / 10000 * params.row.cash_rate).toFixed(5) * 100) / 100
                        return h('span', money)
                    }
                },
                {
                    label: '到账金额',
                    render: (h, params) => {
                        return h('span', params.row.real_money / 100)
                    }
                },
                {
                    label: '提现账号',
                    width: '160px',
                    prop: 'card_id'
                },
                {
                    label: '本次提现通道',
                    width: '160px',
                    prop: 'channel',
                    render: (h, params) => {
                      let data = MAPDATA.CASHCHANNEL.find((item) => {
                        return item.value === params.row.channel;
                      });
                      return h("span", data ? data.name : "无");
                    },
                },
                {
                    label: '提现状态',
                    render: (h, params) => {
                        let paramsData = MAPDATA.STATUSLIST.find(item => { return item.value === params.row.status })
                        return h('span', paramsData ? paramsData.name : '--')
                    }
                },
                {
                    label: '今日次数',
                    prop: 'today_count',
                    render: (h, params) => {
                        return h('span', `第${params.row.today_count}次`)
                    }
                },
                // {
                //     label: '风控等级',
                //     render: (h, params) => {
                //     const data = MAPDATA.IDENTIFICATION.find((item) => {
                //       return item.value === params.row.risk_status;
                //     });
                //       return data ? <el-tag type={data.type}>{data.name}</el-tag> : <div>无</div>
                //     }
                // },
                {
                    label: '备注说明',
                    width: '160px',
                    render: (h, params) => {
                        return h('span', params.row.remark || '无')
                    },
                    showOverFlow: true
                },
                {
                    label: '操作',
                    width: '200px',
                    render: (h, params) => {
                        return h('div', [
                            h('el-button', { props: { type: 'primary'}, on: {click:()=>{this.doCashFunc(params.row, 'success')}}}, '通过'),
                            h('el-button', { props: { type: 'danger'}, on: {click:()=>{this.doCashFunc(params.row, 'reject')}}}, '退回')
                        ])
                    }
                }
            ]
            let arr1 = [
                {
                    label: '主体',
                    prop: 'user_id'
                },
                {
                    label: '供应商',
                    prop: 'user_id'
                },
                {
                    label: '手续费',
                    prop: 'user_id'
                },
                {
                    label: '操作',
                    render: (h, params) => {
                        return h('div', [
                            h('el-button', { props: { type: 'primary'}, style: {
                                display: params.row.status === 0 ? 'unset' : 'none'
                            }, on: {click:()=>{this.audit(params.row.id, 1)}}}, '通过')
                        ])
                    }
                },
            ]
            return {
                vm: this,
                url: REQUEST.CashHisity.apply,
                search: {
                  sizes: [10, 30, 50, 100]
                },
                keyId: 'id',
                isShowCheckbox: this.tabIndex === '0' ? true : false,
                columns: this.tabIndex === '0' ? [ ...arr ] : [ ...arr1 ]
            }
        }
    },
    data() {
        return {
            menuList: [
                {
                    name: '提现申请'
                },
                {
                    name: '提现付款账户设置'
                }
            ],
            tabIndex: '0',
            ruleForm: {
                untreated: null
            },
            list: [],
            arr: [],
            isType: '',
            searchParams: {
                dateTimeParams: ['', '']
            },
            dateTimeParams: {
                start_time: null,
                end_time: null
            }
        };
    },
    watch: {
        arr: {
            handler(n) {
                if(n) {
                    if(this.arr.length > 0) {
                        let params = this.arr[0]
                        this.doCashFunc(params, this.isType, 'batch')
                    }
                }
            },
            deep: true
        }
    },
    methods: {
        // 今日
        today() {
            this.changeIndex(0)
        },
        // 昨日
        yesterday() {
            this.changeIndex(1)
        },
        // 前天
        beforeYesterday() {
            this.changeIndex(2)
        },
        // 最近七日
        recentSeven() {
            this.changeIndex(3)
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
                    now1 = timeFormat(date - 3600 * 1000 * 24 * 2, 'YYYY-MM-DD', false)
                    now = timeFormat(date - 3600 * 1000 * 24 * 2, 'YYYY-MM-DD', false)
                    break;
                case 3:
                    now1 = timeFormat(date, 'YYYY-MM-DD', false)
                    now = timeFormat(date - 3600 * 1000 * 24 * 6, 'YYYY-MM-DD', false)
                    break;
            }
            start = new Date(now + ' 00:00:00')
            if( index == 0) {
                end = new Date(timeFormat(date, 'YYYY-MM-DD HH:mm:ss', false))
            } else {
                end = new Date(now1 + ' 23:59:59')
            }

            let time = [start.getTime(), end.getTime()]
            this.searchParams.dateTimeParams = time
            this.dateTimeParams.start_time = time[0]
            this.dateTimeParams.end_time = time[1]
            this.getList()
        },
        // 获取活动类型
        doCashFunc(row, type, batch) {
            let params = {
                id: row.id,
                status: type === 'success' ? 2 : 3
            }
            doCash(params).then(res => {
                if(res.code === 2000) {
                    let message = type === 'success' ? '通过审核' : '退回成功'
                    this.$success(message)
                    if(batch) {
                        this.arr.splice(0, 1)
                        if(this.arr.length <= 0) {
                            this.getList()
                        }
                    } else {
                        this.getList()
                    }
                }
            }).catch(err => {
                if(batch) {
                    this.arr.splice(0, 1)
                    if(this.arr.length <= 0) {
                        this.getList()
                    }
                }
            })
        },
        // 刷新列表
        getList() {
            this.$refs.tableList.getData()
        },
        // 配置参数
        beforeSearch(params) {
            let s = {...this.searchParams, ...this.dateTimeParams}
            return {
                page: params ? params.page : null,
                pagesize: params ? params.size : null,
                channel: s.channel,
                user_id: s.user_id,
                start_time: s.start_time ? Math.floor(s.start_time / 1000) : '',
                end_time: s.end_time ? Math.floor(s.end_time / 1000) : ''
            }
        },
        // 选中
        selectionChange(val) {
            this.list = val
        },
        // 批量通过
        batchPass() {
            if(this.list.length > 0) {
                this.arr = JSON.parse(JSON.stringify(this.list))
                this.isType = 'success'
            } else {
                this.$warning('请至少选择一条数据')
            }
        },
        // 批量拒绝
        BatchRurn() {
            if(this.list.length > 0) {
                this.arr = JSON.parse(JSON.stringify(this.list))
                this.isType = 'error'
            } else {
                this.$warning('请至少选择一条数据')
            }
        },
        // 导出
      async  handleExcelExport() {
          let s = this.beforeSearch();
          console.log(s, 's');
          delete s.page;
          s.is_all = "1";
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          let res = await exprotCash(s);
          try {
            let arr = JSON.parse(JSON.stringify(res.data.list));
              if (arr.length <= 0) return this.$warning("当前没有数据可以导出");
              arr = arr.map((item, index) => {
              let data = MAPDATA.CASHCHANNEL.find((v) => {
                return v.value === item.channel;
              });
              let data1 = MAPDATA.STATUSLIST.find((v) => {
                return v.value === item.status;
              });
              let params = {
                addtime: timeFormat(item.addtime, 'YYYY-MM-DD HH:mm:ss', true) || '--',
                room_number: item.user_number || '--',
                role: item.role || '--',
                money: item.money || '--',
                cash: item.money / 100 || '--',
                cash_rate: Math.floor((item.money / 10000 * item.cash_rate).toFixed(5) * 100) / 100 || '--',
                real_money: item.real_money / 100 || '--',
                card_id: item.card_id || '--',
                channel: data ? data.name : '--',
                status: data1 ? data1.name : '--',
                today_count: `第${item.today_count}次` || '--',
                remark: item.remark || '无',
              };
              return params;
            });
            let nameList = [
              "提现时间",
              "用户ID",
              "用户角色",
              "喵粮",
              "提现金额",
              "手续费",
              "到账金额",
              "提现账号",
              "本次提现通道",
              "提现状态",

              "今日次数",
              "备注说明",
            ];
            exportTableData(arr, nameList, "公会房间列表");
            loading.close();
          } catch (error) {
            console.log(error);
            loading.close();
          }
        },
        // 批量支付
      handleBatchTopUp() {

        if (!(this.list && this.list.length)) {
          this.$warning('请至少选择一条数据')
          return
        }

        const result = this.list.reduce((prev, curr) => {
          prev.push(curr.id)
          return prev;
        }, []).join(",");

       const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })

        batchCash({ id: result, channel: 4 }).then(response => {
          if (response.code + "" === "2000") {
            this.$success(response.msg || "操作成功");
            this.getList();
            loading.close();
          }
        }).catch(error => {
          console.log(error);
          loading.close();
        })

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
        // 列表返回数据
        saleAmunt(data) {
            const result = data.list.reduce((prev, curr) => {
              prev += curr.real_money ? +curr.real_money : 0
              return prev;
            }, 0)

            this.ruleForm = {
              ...data,
              realMoneyTotal: result
            }
        }
    },
    created() {
        let time = new Date()
        let date = timeFormat(time, 'YYYY-MM-DD', false)
        let start = new Date(date + ' 00:00:00').getTime()
        let end = new Date(timeFormat(time, 'YYYY-MM-DD HH:mm:ss', false))
        this.searchParams.dateTimeParams = [start, end]
        this.dateTimeParams = {
            start_time: start,
            end_time: end
        }
    }
}
</script>

<style lang="scss">
.finance-embodyApply {
    // padding: 20px;
    // box-sizing: border-box;
    .model {
        width: 100%;
        height: 40px;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        padding: 0px 30px;
        box-sizing: border-box;
        box-shadow: 0 0 4px rgba(0, 0, 0, 0.15);
        margin-bottom: 20px;
        >span {
            font-size: 15px;
            color: #fff;
            margin-right: 100px;
        }
    }
}
</style>
