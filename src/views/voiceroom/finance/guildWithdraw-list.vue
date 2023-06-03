// 充值记录
<template>
  <div class="finance-guildWithdraw-list">
    <div class="model">
      <span>充值人数{{ ruleForm.recharge_user_count || 0 }}人</span>
      <span>已支付金额{{ Number(ruleForm.recharge_amount) / 100 || 0 }}元</span>
      <span>已退款金额{{ Number(ruleForm.refund_amount) / 100 || 0 }}元</span>
      <span
        >未支付金额{{ Number(ruleForm.no_recharge_amount) / 100 || 0 }}元</span
      >
    </div>
    <div class="searchParams">
      <SearchPanel
        v-model="searchParams"
        :forms="forms"
        :show-reset="true"
        :show-search-btn="true"
        :showYesterday="true"
        :showBigBeforeYesterday="true"
        :showCurrentWeek="true"
        :showToday="true"
        :show-batch-rurn="true"
        :showBeforeYesterday="true"
        batchRurnName="导出EXCEL"
        @onReset="reset"
        @onSearch="onSearch"
        @yesterday="yesterday"
        @bigBeforeYesterday="bigBeforeYesterday"
        @currentWeek="currentWeek"
        @today="today"
        @BatchRurn="BatchRurn"
        @beforeYesterday="beforeYesterday"

        :show-custom="true"
        custom-name="批量查单"
        @custom="handleBatchQurtyOrder"
      ></SearchPanel>
    </div>
    <div class="tableList">
      <tableList
        :cfgs="cfgs"
        ref="tableList"
        @selectionChange="selectionChange"
        @saleAmunt="saleAmunt"
        layout="total, sizes, prev, pager, next, jumper"
      ></tableList>
    </div>

    <!-- 批量查单 -->
    <el-dialog title="批量查询反馈" width="30%" :visible.sync="batchDialogVisible">
      <div style="padding: 10px;">
        查询出共{{ batchResultData && batchResultData.length }}条数据已支付成功
      </div>
      <div style="padding: 10px;" v-if="batchResultData && batchResultData.length">
      <div>详情：</div>
        <div v-for="(item, index) in batchResultData" :key="index"><span>{{ item.trade_no }}</span></div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 引入api
import { diamondRechargeAll, getMerchantList, wxMerchantList, queryPayStatus } from "@/api/finance.js";
// 引入列表组件
import tableList from "@/components/tableList/TableList.vue";
// 引入菜单组件
import SearchPanel from "@/components/SearchPanel/final.vue";
// 引入公共参数
import mixins from "@/utils/mixins.js";
// 引入api
import REQUEST from "@/request/index.js";
// 引入公共方法
import { timeFormat, exportTableData } from "@/utils/common.js";
// 引入公共map
import MAPDATA from "@/utils/jsonMap.js";
import moment from "moment";

export default {
  components: {
    tableList,
    SearchPanel,
  },
  mixins: [mixins],
  computed: {
    forms() {
      return [
        {
          name: "user_number",
          type: "input",
          value: "",
          label: "用户ID",
          isNum: true,
          placeholder: "请输入用户ID",
        },
        {
          name: "amount",
          type: "input",
          value: "",
          label: "充值金额",
          placeholder: "请输入充值金额",
        },
        {
          name: "channel",
          type: "select",
          value: "",
          keyName: "value",
          optionLabel: "name",
          label: "充值平台",
          placeholder: "请选择",
          options: MAPDATA.INSTITUTION,
        },
        {
          name: "status",
          type: "select",
          value: "1",
          keyName: "value",
          optionLabel: "name",
          label: "充值状态",
          placeholder: "请选择",
          options: MAPDATA.ORDERSTATUS,
          handler: {
            change: (val) => {
              this.topupStatus = val;
           }
          }
        },
        {
          name: "purpose",
          type: "select",
          value: "",
          keyName: "value",
          optionLabel: "name",
          label: "充值类型",
          placeholder: "请选择",
          options: MAPDATA.RECHARGEHISTORYTYPELIST,
        },
        {
          name: "trade_no",
          type: "input",
          value: "",
          label: "商户/支付单号",
          placeholder: "请输入商户/支付单号",
        },
        {
          name: "wx_merchant_id",
          type: "select",
          value: "",
          keyName: "value",
          optionLabel: "name",
          label: "商户",
          clearable: true,
          placeholder: "请选择",
          options: this.merchantIdList,
          handler: {
            change: (v) => {
              if (!v) {
                this.$set(this.searchParams, "risk_status", "");
              }
           }
          }
        },
        {
          name: "risk_status",
          type: "select",
          value: "",
          keyName: "value",
          optionLabel: "name",
          label: "风控等级",
          placeholder: "请选择",
          options: MAPDATA.IDENTIFICATION,
          // disabled: () => {
          //   return this.searchParams.appid === "";
          // }
        },
        // {
        //     name: 'time',
        //     type: 'dateControl',
        //     label: '时间选择',
        // },
        {
          name: "dateTimeParams",
          type: "datePicker",
          dateType: "datetimerange",
          format: "yyyy-MM-dd HH:mm:ss",
          label: "时间选择",
          value: "",
          handler: {
            change: (v) => {
              this.emptyDateTime();
              this.setDateTime(v);
              this.getList();
            },
            selectChange: (v, key) => {
              this.emptyDateTime();
              this.getList();
            },
          },
        },
      ];
    },
    cfgs() {
      return {
        vm: this,
        url: REQUEST.diamondRecharge.list,
        search: {
          sizes: [10, 30, 50, 100,999,9999]
        },
        isShowCheckbox: true,
        columns: [
          {
            label: "订单时间",
            minWidth: "160px",
            render: (h, params) => {
              return h(
                "span",
                params.row.create_time
                  ? timeFormat(
                      params.row.create_time,
                      "YYYY-MM-DD HH:mm:ss",
                      true
                    )
                  : "无"
              );
            },
          },
          {
            label: "到账时间",
            minWidth: "160px",
            render: (h, params) => {
              return h(
                "span",
                params.row.pay_time
                  ? timeFormat(params.row.pay_time, "YYYY-MM-DD HH:mm:ss", true)
                  : "无"
              );
            },
          },
          {
            label: "用户ID",
            minWidth: "100px",
            render: (h, params) => {
              return h("span", params.row.user_number || "无");
            },
          },
          {
            label: "用户昵称",
            minWidth: "120px",
            render: (h, params) => {
              return h("span", params.row.nickname || "无");
            },
          },
          {
            label: "充值金额（元）",
            minWidth: "150px",
            prop: "amount",
            sortable: "custom",
            render: (h, params) => {
              return h("span", params.row.amount / 100);
            },
          },
          {
            label: "充值类型",
            minWidth: "80px",
            render: (h, params) => {
              let data = MAPDATA.RECHARGEHISTORYTYPELIST.find((item) => {
                return item.value === params.row.purpose;
              });
              return h("span", data ? data.name : "无");
            },
          },
          {
            label: "充值说明",
            minWidth: "120px",
            prop: "remark",
            render: (h, params) => {
              return h("span", params.row.remark || "无");
            },
          },
          {
            label: "充值平台",
            minWidth: "80px",
            render: (h, params) => {
              return h("span", params.row.channel);
            },
          },
          {
            label: "微信/支付宝支付标识",
            minWidth: "430px",
            render: (h, params) => {
              const data = MAPDATA.IDENTIFICATION.find((item) => {
                return item.value === ((params.row.wx_merchant_status >= 0) ? params.row.wx_merchant_status : params.row.ali_merchant_status);
              });
              return (data && params.row.buyer_id) ? (
                <div style="text-align: left;" title={data.name}>
                  <el-tag type={data.type}>
                    {params.row.buyer_id ? params.row.buyer_id : "-"}
                    <span>
                      （{params.row.wx_merchant ? params.row.wx_merchant : ( params.row.ali_merchant ? params.row.ali_merchant : "-")}
                      ）
                    </span>
                  </el-tag>
                </div>
              ) : (
                <div>无</div>
              );
            },
          },
          // {
          //   label: "支付宝标识号",
          //   minWidth: "430px",
          //   render: (h, params) => {
          //     const data = MAPDATA.IDENTIFICATION.find((item) => {
          //       return item.value === params.row.ali_merchant_status;
          //     });
          //     return (data && params.row.buyer_id && params.row.ali_merchant) ? (
          //       <div style="text-align: left;" title={data.name}>
          //         <el-tag type={data.type}>
          //           {params.row.buyer_id ? params.row.buyer_id : "-"}
          //           <span>
          //             （
          //             {params.row.ali_merchant ? params.row.ali_merchant : "-"}
          //             ）
          //           </span>
          //         </el-tag>
          //       </div>
          //     ) : (
          //       <div>无</div>
          //     );
          //   },
          // },
          {
            label: "充值状态",
            minWidth: "100px",
            render: (h, params) => {
              if (params.row.status === 1 && params.row.refund_status === 1) {
                return h("span", "已支付");
              } else if (
                params.row.status === 1 &&
                params.row.refund_status === 2
              ) {
                return h("div", [
                  h("span", "已支付（"),
                  h(
                    "span",
                    {
                      style: {
                        color: "#FF4949",
                        fontWeight: 600,
                      },
                    },
                    "全额退款"
                  ),
                  h("span", "）"),
                ]);
              } else if (params.row.status === 3) {
                return h("span", "未支付");
              } else if (params.row.status === 4) {
                return h("span", "已退款");
              }
            },
          },
          // {
          //     label: '到账时间',
          //     minWidth: '150px',
          //     render: (h, params) => {
          //         return h('span', params.row.pay_time ? timeFormat(params.row.pay_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
          //     }
          // },
          {
            label: "商户单号",
            minWidth: "200px",
            prop: "trade_no",
          },
          {
            label: "支付单号",
            minWidth: "240px",
            prop: "out_trade_no",
            render: (h, params) => {
                return h('span', params.row.out_trade_no || '无')
            }
          },
          {
            label: "充值人IP",
            render: (h, params) => {
              return h("span", params.row.ip ? params.row.ip : '无');
            },
          },
          {
            label: "地区",
            render: (h, params) => {
              return h("span", params.row.addr ? params.row.addr : '未知');
            },
          },
          // {
          //     label: '商户单号',
          //     minWidth: '150px',
          //     render: (h, params) => {
          //         return h('span', params.row.out_trade_no || '无')
          //     }
          // }
          {
            label: "操作",
            fixed: "right",
            minWidth: "120px",
            render: (h, params) => {
                return h("div", [
                  h("el-button", {
                    props: { type: "primary" },
                    style: {
                        display: params.row.status === 3 ? 'unset' : 'none'
                    },
                    on: { click: () => { this.handleQueryOrder(params.row) } }
                  }, "查单")
                ])
            }
          }
        ],
      };
    },
  },
  data() {
    return {
      ruleForm: {
        allMoney: null,
      },
      searchParams: {
        dateTimeParams: ["", ""],
        status: "1",
      },
      dateTimeParams: {
        start_time: null,
        end_time: null,
      },
      guildTypeList: [],
      merchantIdList: [],
      list: [],
      topupStatus: null,
      batchDialogVisible: false,
      batchResultData: []
    };
  },
  methods: {
    // 今日
    today() {
      this.changeIndex(0);
    },
    // 昨日
    yesterday() {
      this.changeIndex(1);
    },
    // 前天
    beforeYesterday() {
      this.changeIndex(2);
    },
    // 大前天
    bigBeforeYesterday() {
      this.changeIndex(3);
    },
    // 本周
    currentWeek() {
      this.changeIndex(4);
    },
    // 更改日期
    changeIndex(index) {
      let date = new Date();
      let now, now1, start, end;
      switch (index) {
        case 0:
          now1 = timeFormat(date, "YYYY-MM-DD", false);
          now = timeFormat(date, "YYYY-MM-DD", false);
          break;
        case 1:
          now1 = timeFormat(date - 3600 * 1000 * 24 * 1, "YYYY-MM-DD", false);
          now = timeFormat(date - 3600 * 1000 * 24 * 1, "YYYY-MM-DD", false);
          break;
        case 2:
          now1 = timeFormat(date - 3600 * 1000 * 24 * 2, "YYYY-MM-DD", false);
          now = timeFormat(date - 3600 * 1000 * 24 * 2, "YYYY-MM-DD", false);
          break;
        case 3:
          now1 = timeFormat(date - 3600 * 1000 * 24 * 3, "YYYY-MM-DD", false);
          now = timeFormat(date - 3600 * 1000 * 24 * 3, "YYYY-MM-DD", false);
          break;
        case 4:
          let week = this.getCurrWeekDays();
          now1 = week.endtime;
          now = week.starttime;
          break;
      }
      start = new Date(now + " 00:00:00");
      if (index == 0) {
        end = new Date(timeFormat(date, "YYYY-MM-DD HH:mm:ss", false));
      } else {
        end = new Date(now1 + " 23:59:59");
      }

      let time = [start.getTime(), end.getTime()];
      this.searchParams.dateTimeParams = time;
      this.dateTimeParams.start_time = time[0];
      this.dateTimeParams.end_time = time[1];
      this.getList();
    },
    // 刷新列表
    getList() {
      this.$refs.tableList.getData();
    },
    // 配置参数
    beforeSearch(params) {
      let s = { ...this.searchParams, ...this.dateTimeParams };
      return {
        page: params ? params.page : null,
        pagesize: params ? params.size : null,
        user_number: s.user_number,
        channel: s.channel,
        status: s.status,
        amount: s.amount ? Number(s.amount) * 100 : s.amount,
        start_time: Math.floor(s.start_time / 1000),
        end_time: Math.floor(s.end_time / 1000),
        trade_no: s.trade_no,
        purpose: s.purpose,
        risk_status: s.risk_status,
        wx_merchant_id: s.wx_merchant_id,
      };
    },
    // 设置时间段
    setDateTime(arr) {
      const date = arr
        ? {
            start_time: arr[0],
            end_time: arr[1],
          }
        : {};
      this.$set(this, "dateTimeParams", date);
    },
    // 清空日期选择
    emptyDateTime() {
      this.dateTimeParams = {};
    },
    // 重置
    reset() {
      this.searchParams = {
        status: "1",
      };
      this.dateTimeParams = {};
      this.changeIndex(0);
      this.getList();
    },
    // 查询
    onSearch() {
      this.getList();
    },
    // 列表返回数据
    saleAmunt(data) {
      this.ruleForm = { ...data };
      let timer = JSON.parse(JSON.stringify(this.dateTimeParams));
      let start_time = timer.start_time;
      let end_time = new Date(timer.end_time).getTime();
      this.$set(this.searchParams, "dateTimeParams", [start_time,end_time]);
    },
    // 导出excel
    async BatchRurn() {
      let s = this.beforeSearch();

      delete s.page;

      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })

      let res = await diamondRechargeAll(s);
      try {
        let arr = JSON.parse(JSON.stringify(res.data.list));
        if (arr.length <= 0) return this.$warning("当前没有数据可以导出");
        arr = arr.map((item, index) => {
          let name = MAPDATA.RECHARGEHISTORYTYPELIST.find((a) => {
            return a.value === item.purpose;
          });
          let status = MAPDATA.ORDERSTATUS.find((a) => {
            return a.value.indexOf(item.status) !== -1;
          });
          let params = {
            create_time: timeFormat(
              item.create_time,
              "YYYY-MM-DD HH:mm:ss",
              true
            )+';',
            pay_time: timeFormat(item.pay_time, "YYYY-MM-DD HH:mm:ss", true)+';',
            user_number: item.user_number,
            nickname: item.nickname,
            amount: item.amount / 100,
            type: name.name,
            remark: item.remark,
            channel: item.channel,
            identity: `${item.buyer_id ? item.buyer_id : "-"}(${item.wx_merchant ? item.wx_merchant : (item.ali_merchant ? item.ali_merchant : "-")})`,
            status: status.name,
            trade_no: item.trade_no,
            ip: item.ip,
            addr: item.addr,
          };
          return params;
        });
        let nameList = [
          "订单时间",
          "到账时间",
          "用户ID",
          "用户昵称",
          "充值金额（元）",
          "充值类型",
          "充值说明",
          "充值平台",
          "微信/支付宝支付标识",
          "充值状态",
          "交易单号",
          "充值人IP",
          "地区"
        ];
        exportTableData(arr, nameList, "充值记录");
        loading.close();
      } catch (error) {
         console.log(error);
         loading.close();
      }
    },
    // 获取当前周的开始结束时间
    getCurrWeekDays() {
      let obj = {
        starttime: "",
        endtime: "",
      };
      // obj.starttime = moment(moment().week(moment().week()).startOf('week').add(1, 'days').valueOf()).format('YYYY-MM-DD')
      // obj.endtime = moment(moment().week(moment().week()).endOf('week').add(1, 'days').valueOf()).format('YYYY-MM-DD');
      obj.starttime = moment().startOf("isoWeek").format("YYYY-MM-DD"); //本周一
      obj.endtime = moment().endOf("isoWeek").format("YYYY-MM-DD"); //本周日
      return obj;
    },
    // 获取公会类型
    async getTypeList() {
      const response = await getMerchantList();
      if (response.code === 2000) {
        const tempArr = Array.from(
          Array.isArray(response.data) ? response.data : []
        );
        this.guildTypeList =
          tempArr.reduce((prev, curr) => {
            prev.push({
              name: `${curr.merchant_name}-(${
                curr.channel + "" === "2"
                  ? "微信"
                  : curr.channel + "" === "3"
                  ? "阿里"
                  : "无"
              })`,
              value: curr.appid,
            });
            return prev;
          }, []) || [];

          this.guildTypeList.unshift({
            name: "全部",
            value: ""
          })
      }
    },
    // 获取商户号
    async getWXMerchantList() {
      const response = await wxMerchantList();
      if (response.code === 2000) {
        const tempArr = Array.from(
          Array.isArray(response.data) ? response.data : []
        );
        this.merchantIdList =
          tempArr.reduce((prev, curr) => {
            prev.push({
              name: curr.merchant_name,
              value: curr.merchant_id,
            });
            return prev;
          }, []) || [];

          this.merchantIdList.unshift({
            name: "全部",
            value: ""
          })
      }
    },
    // 查询充值订单支付状态
    async handleQueryOrder(row) {
      const response = await queryPayStatus({ trade_no: row.trade_no })
      this.$notify.warning({
        title: '消息',
        message: response.data && response.data.list[0].msg,
      });
      this.getList();
    },
    // 选中
    selectionChange(val) {
      this.list = val
    },
    // 批量查单
    handleBatchQurtyOrder() {

      if (this.topupStatus + '' !== '3') {
        this.$warning('未支付状态才能批量查单')
        return
      }

      if (!(this.list && this.list.length)) {
        this.$warning('请至少选择一条数据')
        return
      }

      const result = this.list.reduce((prev, curr) => {
        prev.push(curr.trade_no)
        return prev;
      }, []).join(",");

      const loading = this.$loading({
         lock: true,
         text: 'Loading',
         spinner: 'el-icon-loading',
         background: 'rgba(0, 0, 0, 0.7)'
       })

        queryPayStatus({ trade_no: result }).then(response => {
          if (response.code + "" === "2000") {
            this.batchDialogVisible = true;
            this.batchResultData = response.data && response.data.list.reduce((prev, curr) => {
              if (curr.status + "" === "1") {
                prev.push(curr)
              }
              return prev;
            }, [])
            this.getList();
            loading.close();
          }
        }).catch(error => {
          console.log(error);
          loading.close();
        })

    },
  },
  created() {
    let time = new Date();
    let date = timeFormat(time, "YYYY-MM-DD", false);
    let start = new Date(date + " 00:00:00").getTime();
    let end = new Date(timeFormat(time, "YYYY-MM-DD HH:mm:ss", false));
    this.searchParams.dateTimeParams = [start, end];
    this.dateTimeParams = {
      start_time: start,
      end_time: end,
    };
    this.getTypeList();
    this.getWXMerchantList();
  },
  mounted(){},
};
</script>

<style lang="scss">
.finance-guildWithdraw-list {
  padding: 20px;
  box-sizing: border-box;
  .model {
    width: 100%;
    height: 40px;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    padding: 0px 30px;
    box-sizing: border-box;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.15);
    margin-bottom: 20px;
    > span {
      font-size: 15px;
      color: #fff;
      margin-right: 100px;
    }
  }
  ::-webkit-scrollbar {
    height: 10px;
    width: 10px;
    background: #e8e8e8;
  }

  ::-webkit-scrollbar-thumb {
    background: #c7c7c7;
    border-radius: 5px;
  }
}
.el-table__fixed-body-wrapper{
  bottom: 0;
}
</style>
