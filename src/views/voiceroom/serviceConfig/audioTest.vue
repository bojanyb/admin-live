<template>
    <div class="serviceConfig-audioTest-box">
        <menuComp ref="menuComp" :menuList="menuList" v-model="tabIndex"></menuComp>
        <div class="searchParams">
            <SearchPanel
              v-model="searchParams"
              :forms="forms"
              :show-reset="true"
              :show-search-btn="true"
              :show-export="true"
              :show-batch-pass="true"
              batch-func-name="批量待复审"
              @onReset="reset"
              @onSearch="onSearch"
              @export="handleExport"
              @batchPass="handleBatchPendingReview"></SearchPanel>
        </div>

		<tableList :cfgs="cfgs" ref="tableList" layout="total, sizes, prev, pager, next, jumper" @selectionChange="selectionChange"></tableList>

        <!-- 详情组件 -->
        <audioComp v-if="isDestoryComp" ref="audioComp" @destoryComp="destoryComp" :tabIndex="tabIndex"></audioComp>

        <!-- 处罚组件 -->
        <userComp v-if="isUserDestoryComp" ref="userComp" @destoryComp="destoryComp" @getList="getList" isDetection ></userComp>

        <!-- 警告组件 -->
        <warnComp v-if="isWarnDestoryComp" ref="warnComp" @destoryComp="destoryComp" @getList="getList"></warnComp>

        <!-- 警告组件 -->
        <reviewComp v-if="isReviewDestoryComp" ref="reviewComp" @destoryComp="destoryComp" @getList="getList"></reviewComp>
    </div>
</template>

<script>
// 引入api
import {
  guildRoomType,
  getTencentLabel,
  getCheckOperator
} from "@/api/videoRoom.js";
// 引入api
import {
  exprotAudio
} from "@/api/risk.js";
// 引入详情组件
import audioComp from './components/audioComp.vue'
// 引入tab菜单组件
import menuComp from '@/components/menuComp/index.vue'
// 引入菜单组件
import SearchPanel from '@/components/SearchPanel/final.vue'
// 引入列表组件
import tableList from '@/components/tableList/TableList.vue'
// 引入处罚组件
import userComp from './components/userComp.vue'
// 引入警告组件
import warnComp from './components/warnComp.vue'
// 引入警告组件
import reviewComp from './components/reviewComp.vue'
// 引入api
import REQUEST from '@/request/index.js'
// 引入公共方法
import { timeFormat, exportTableData } from '@/utils/common.js'
// 引入公共参数
import mixins from '@/utils/mixins.js'
// 引入公共map
import MAPDATA from '@/utils/jsonMap.js'
export default {
    mixins: [mixins],
    components: {
        SearchPanel,
        tableList,
        menuComp,
        audioComp,
        userComp,
        warnComp,
        reviewComp
    },
    data() {
        return {
            menuList: [
                {
                    name: '派对间'
                },
                {
                    name: '直播间'
                }
            ],
            isDestoryComp: false, // 是否销毁组件
            isUserDestoryComp: false,
            isWarnDestoryComp: false,
            isReviewDestoryComp: false,
            tabIndex: '0',
            roomTypeList: [], // 房间类型
            options: [],
            selectionList: [],
            checkOperatorList: [],
            dateCheckTimeParams: {}
        };
    },
    computed: {
        forms() {
            return [
                {
                    name: 'user_number',
                    type: 'input',
                    value: '',
                    label: '用户ID',
                    isNum: true,
                    placeholder: '请输入用户ID'
                },
                {
                    name: 'room_number',
                    type: 'input',
                    value: '',
                    label: '房间ID',
                    isNum: true,
                    placeholder: '请输入房间ID'
                },
                {
                    name: 'keywords',
                    type: 'input',
                    value: '',
                    label: '关键词',
                    placeholder: '请输入关键词'
                },
                {
                  name: 'status',
                  type: 'select',
                  value: '',
                  keyName: 'value',
                  optionLabel: 'name',
                  label: '待复审',
                  placeholder: '请选择',
                  clearable: true,
                  options: MAPDATA.REVIEWSTATUSLIST
                },
                {
                  name: 'operator_id',
                  type: 'select',
                  value: '',
                  keyName: 'value',
                  optionLabel: 'name',
                  label: '复审操作审核人',
                  placeholder: '请选择',
                  clearable: true,
                  options: this.checkOperatorList
                },
                {
                    name: 'risk_type',
                    type: 'cascader',
                    value: null,
                    keyName: 'value',
                    optionLabel: 'label',
                    label: '风险类型',
                    placeholder: '请选择',
                    filterable: true,
                    clearable: true,
                    options: this.options,
                },
                {
                  name: 'room_category_id',
                  type: 'select',
                  value: '',
                  keyName: 'value',
                  optionLabel: 'name',
                  label: '房间类型',
                  placeholder: '请选择',
                  clearable: true,
                  options: this.roomTypeList
                },
                // {
                //     name: 'risk_type',
                //     type: 'select',
                //     value: null,
                //     keyName: 'value',
                //     optionLabel: 'name',
                //     label: '风险类型',
                //     placeholder: '请选择',
                //     options: MAPDATA.RISKSYSTEMTYPELIST
                // },
                {
                    name: 'dateCheckTimeParams',
                    type: 'datePicker',
                    dateType: 'datetimerange',
                    format: "yyyy-MM-dd HH:mm:ss",
                    label: '复审操作时间',
                    value: '',
                    handler: {
                        change: v => {
                            this.emptyCheckDateTime()
                            this.setCheckDateTime(v)
                        },
                        selectChange: (v, key) => {
                            this.emptyCheckDateTime()
                        }
                    }
                },
                {
                    name: 'dateTimeParams',
                    type: 'datePicker',
                    dateType: 'datetimerange',
                    format: "yyyy-MM-dd HH:mm:ss",
                    label: '创建时间选择',
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
                },
            ]
        },
        cfgs() {
            return {
                vm: this,
                url: REQUEST.risk.audioStreamDefyList,
                isShowCheckbox: true,
                search: {
                  sizes: [10, 30, 50, 100]
                },
                columns: [
                    {
                        label: '创建时间',
                        width: '160px',
                        render: (h, params) => {
                            return h('span', params.row.start_time ? timeFormat(params.row.start_time, 'YYYY-MM-DD HH:mm:ss', true) : '--')
                        }
                    },
                    {
                        label: '复审操作时间',
                        width: '160px',
                        render: (h, params) => {
                            return h('span', params.row.operator_time ? timeFormat(params.row.operator_time, 'YYYY-MM-DD HH:mm:ss', true) : '--')
                        }
                    },
                    {
                        label: '复审人',
                        prop: 'operator',
                        minWidth: '90px',
                        render: (h, params) => {
                            return h('span', params.row.operator ? params.row.operator : '--')
                        }
                    },
                    {
                        label: '用户',
                        width: '100px',
                        render: (h, params) => {
                            return h('div', [
                                h('div', params.row.nickname),
                                h('div', params.row.user_number)
                            ])
                        }
                    },
                    {
                      label: "房间类型",
                      width: '80px',
                      render: (h, params) => {
                        let data = this.roomTypeList.find((item) => {
                          return item.value === params.row.room_category_id;
                        });
                        return h("span", data ? data.name : "--");
                      },
                    },
                    {
                        label: '用户等级',
                        width: '110px',
                        render: (h, params) => {
                            return h('div', [
                                h('div', `用户等级: ${params.row.user_rank}`),
                                h('div', `魅力等级: ${params.row.live_rank}`),
                            ])
                        }
                    },
                    {
                        label: '用户所属公会',
                        width: '110px',
                        render: (h, params) => {
                            return h('div', [
                                h('div', params.row.guild_name),
                            ])
                        }
                    },
                    {
                        label: '用户当前状态',
                        width: '110px',
                        render: (h, params) => {
                            return h('div', [
                                h('div', params.row.punish_status),
                            ])
                        }
                    },
                    {
                        label: '用户麦位',
                        prop: 'sort_number',
                        minWidth: '80px',
                        // render: (h, params) => {
                        //     let data = MAPDATA.RISKSYSTEMROLELIST.find(item => { return item.value === params.row.user_role })
                        //     return h('span', data ? data.name : '无')
                        // }
                    },
                    {
                        label: '房间ID',
                        prop: 'room_number',
                        minWidth: '90px',
                    },
                    {
                        label: '风险类型',
                        minWidth: '130px',
                        render: (h, params) => {
                            return h('div', [
                                h('div', `${params.row.label || '--'}/${params.row.sub_label || '--'}`),
                            ])
                        }
                    },
                    {
                        label: '复审结果',
                        minWidth: '130px',
                        render: (h, params) => {
                            let data = MAPDATA.REVIEWSTATUSLIST.find(item => { return item.value === params.row.status })
                            return h('span', data ? data.name : '无')
                        }
                    },
                    {
                        label: '腾讯审核结果',
                        minWidth: '130px',
                        prop: 'suggestion',
                    },
                    {
                        label: '音频',
                        isimg: true,
                        prop: 'url',
                        imgWidth: '50px',
                        imgHeight: '50px',
                        minWidth: '300px'
                    },
                    {
                        label: '音转文',
                        prop: 'content',
                        minWidth: '160px',
                        render: (h, params) => {
                          return (
                            <span
                              domPropsInnerHTML={this.replaceReplyMethod(
                                params.row.content,
                                params.row.keywords ? params.row.keywords : ''
                              )}
                            />
                          );
                        },
                    },
                    {
                        label: '操作',
                        width: '270px',
                        fixed: 'right',
                        render: (h, params) => {
                            return h('div', [
                                h('el-button', { props: { type: 'warning'}, on: {click:()=>{this.handleOperation('warn', params.row)}}}, '警告'),
                                h('el-button', { props: { type: 'danger' }, on: { click: () => { this.handleOperation('add', params.row) } } }, '封禁'),
                              h('el-button', {
                                props: { type: 'success' },
                                style: {
                                   display: params.row.status === 1 ? 'unset' : 'none'
                                },
                                on: { click: () => { this.handleOperation('review', params.row) } }
                              }, '待复审')
                            ])
                        }
                    }
                ]
            }
        }
    },
    watch: {
        tabIndex: {
            handler(n) {
                if(n) {
                    this.getList()
                }
            },
            deep: true
        }
    },
    methods: {
        // 配置参数
        beforeSearch(params) {
            let s = { ...this.searchParams, ...this.dateTimeParams, ...this.dateCheckTimeParams }
            return {
                page: params ? params.page : null,
                pagesize: params ? params.size : null,
                type: this.tabIndex === '0' ? 2 : 1,
                // risk_type: s.risk_type,
                label: s.risk_type ? s.risk_type[0] : '',
                sub_label: s.risk_type ? s.risk_type[1] : '',
                room_category_id: s.room_category_id,
                keywords: s.keywords,
                start_time: s.start_time ? Math.floor(s.start_time / 1000) : '',
                end_time: s.end_time ? Math.floor(s.end_time / 1000) : '',
                operate_start_time: s.operate_start_time ? Math.floor(s.operate_start_time / 1000) : '',
                operate_end_time: s.operate_end_time ? Math.floor(s.operate_end_time / 1000) : '',
                room_number: s.room_number,
                user_number: s.user_number,
                status: s.status
            }
        },
        load(status, row) {
            if (status === 'add') {
              this.isUserDestoryComp = true
              setTimeout(() => {
                this.$refs.userComp.loadParams(status, row)
            }, 50);
            } else if (status === 'warn') {
              this.isWarnDestoryComp = true
              setTimeout(() => {
                this.$refs.warnComp.loadParams(status, row)
            }, 50);
            } else if (status === 'review') {
              this.isReviewDestoryComp = true
              setTimeout(() => {
                this.$refs.reviewComp.loadParams(status, row)
            }, 50);
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
        // 清空日期选择
        emptyCheckDateTime() {
            this.dateCheckTimeParams = {}
        },
        // 设置时间段
        setCheckDateTime(arr) {
            const date = arr ? {
                operate_start_time: arr[0],
                operate_end_time: arr[1]
            } : {}
            this.$set(this, 'dateCheckTimeParams', date)
        },
        // 重置
        reset() {
            this.searchParams = {}
            this.dateTimeParams = {}
            this.dateCheckTimeParams = {}
            this.getList()
        },
        // 查询
        onSearch() {
            this.getList()
        },
        destoryComp() {
            this.isDestoryComp = false
            this.isUserDestoryComp = false
            this.isWarnDestoryComp = false
            this.isReviewDestoryComp = false
        },
        handleOperation(status, user_number) {
          this.load(status, user_number);
      },
      // 获取房间类型
      async getRoomTypeList() {
        const response = await guildRoomType();
        if (response.code + "" === "2000") {
          const tempArr = Array.from(
            Array.isArray(response.data.list) ? response.data.list : []
          );
          this.roomTypeList =
            tempArr.reduce((prev, curr) => {
              prev.push({
                name: curr.name,
                value: curr.id,
              });
              return prev;
            }, []) || [];
        }
      },
      // 获取复审操作人
      async getCheckOperatorList() {
        const response = await getCheckOperator();
        if (response.code + "" === "2000") {
          const tempArr = Array.from(
            Array.isArray(response.data) ? response.data : []
          );
          this.checkOperatorList =
            tempArr.reduce((prev, curr) => {
              prev.push({
                name: curr.operator,
                value: curr.operator_id,
              });
              return prev;
            }, []) || [];
        }
      },
      // 关键词高亮
      replaceReplyMethod(value, keywords) {
        if (keywords && keywords.length) {
          let replyList = value.split("");
          keywords.forEach(item => {
            let quickWord = item.split("");
            for (let index = 0; index < replyList.length; index++) {
              quickWord.forEach((subItem) => {
                let replaceString = "" + `(${subItem})`;
                let replaceReg = new RegExp(replaceString, "gi");
                if (replyList[index].indexOf("span") === -1) {
                  replyList[index] = replyList[index].replace(
                    replaceReg,
                    "<span style='color: red;'>$1</span>"
                  );
                }
              });
            }
          })
          return replyList.join("");
        } else {
          return value
        }
      },
      // 获取风险类型
      async getRiskLabel() {
        const response = await getTencentLabel();
        if (response.code + "" === "2000") {
          this.options = response.data;
        }
      },
      // 导出
      async handleExport() {
         let s = this.beforeSearch();
          delete s.page;
          s.is_all = "1";
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          let res = await exprotAudio(s);
          try {
            let arr = JSON.parse(JSON.stringify(res.data.list));
              if (arr.length <= 0) return this.$warning("当前没有数据可以导出");
              arr = arr.map((item, index) => {

              let room_category_id = this.roomTypeList.find((v) => {
                return v.value === item.room_category_id;
              });


              let status = MAPDATA.REVIEWSTATUSLIST.find((v) => {
                return v.value === item.status;
              });

              let params = {
                start_time: timeFormat(item.start_time, 'YYYY-MM-DD HH:mm:ss', true) || '--',
                operator_time: timeFormat(item.operator_time, 'YYYY-MM-DD HH:mm:ss', true) || '--',
                operator: item.operator || '--',
                user_number: item.user_number || '--',
                nickname: item.nickname || '--',
                room_category_id: room_category_id ? room_category_id.name : '--',
                user_rank: `用户等级: ${item.user_rank}; 魅力等级: ${item.live_rank}`,
                guild_name: item.guild_name || '--',
                punish_status: item.punish_status,
                sort_number: item.sort_number || '--',
                room_number: item.room_number || '--',
                label: `${item.label}/${item.sub_label}`,
                label1: status ? status.name : '--',
                suggestion: item.suggestion || '--',
                content: item.content || '--',
                keywords: item.keywords || '--',
              };
              return params;
            });
            let nameList = [
              "创建时间",
              "复审操作时间",
              "复审人",
              "用户ID",
              "用户昵称",
              "房间类型",
              "用户等级",
              "用户所属公会",
              "用户当前状态",
              "用户麦位",
              "房间ID",
              "风险类型",
              "复审结果",
              "腾讯审核结果",
              "音转文",
              "音转文关键词",
            ];
            exportTableData(arr, nameList, "公会房间列表");
            loading.close();
          } catch (error) {
            console.log(error);
            loading.close();
          }
      },

    // 选择
    selectionChange(callbackList) {
      const res = callbackList.reduce((prev, curr) => {
        prev.push(curr);
        return prev;
      }, []);

      this.selectionList = res;
    },

      // 批量待复审
      handleBatchPendingReview() {
        this.isReviewDestoryComp = true
        setTimeout(() => {
          this.$refs.reviewComp.loadParams('batchReview', this.selectionList)
        }, 50);
      }
  },
    created() {
      this.getRoomTypeList()
      this.getRiskLabel()
      this.getCheckOperatorList()
    },
}
</script>

<style lang="scss">
.serviceConfig-audioTest-box {
    padding: 10px 20px 20px 20px;
    box-sizing: border-box;
    .share-table-list-box .el-table__body-wrapper {
      max-height: none  !important;
    }
}
</style>
