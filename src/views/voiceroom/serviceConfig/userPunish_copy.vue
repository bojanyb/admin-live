<template>
    <div class="app-container serviceConfig-userPunish-box">
        <div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" :show-add="permissionArr.includes('UserPunishLog@add')" :show-batch-rurn="true" @onReset="reset" @onSearch="onSearch" @add="add" batchRurnName="导出EXCEL" @BatchRurn="BatchRurn"></SearchPanel>
        </div>
		    <tableList :cfgs="cfgs" ref="tableList"></tableList>
        <!-- 新增组件 -->
        <userComp v-if="isDestoryComp" ref="userComp" @destoryComp="destoryComp" @getList="getList"></userComp>
        <!-- 修改证据弹窗 -->
        <uploadImg v-if="isDestoryComp" ref="uploadImg" @destoryComp="destoryComp" @getList="getList"></uploadImg>
        <!-- 操作日志 -->
	    	<operationLogComp ref="operationLogComp"></operationLogComp>
    </div>
</template>

<script>
// 引入api
import { removeUser, removeUserPunish, passUserPunish, UserPunishLog, acceptPunish } from '@/api/risk'
// 引入api
import { getPunishTypeList } from '@/api/videoRoom'
// 引入新增组件
import userComp from './components/userComp.vue'
// 引入修改证据弹窗
import uploadImg from './components/uploadImg.vue'
// 引入菜单组件
import SearchPanel from '@/components/SearchPanel/final.vue'
// 引入列表组件
import tableList from '@/components/tableList/TableList.vue'
// 引入api
import REQUEST from '@/request/index.js'
// 引入公共参数
import mixins from '@/utils/mixins.js'
// 引入公共map
import MAPDATA from '@/utils/jsonMap.js'
// 引入公共方法
import { exportTableData } from "@/utils/common.js";
import { mapState } from 'vuex'
// 引入操作日志组件
import operationLogComp from "./components/operationLogComp.vue";
export default {
    mixins: [mixins],
    components: {
        SearchPanel,
        tableList,
        userComp,
        uploadImg,
        operationLogComp
    },
    data() {
        return {
            isDestoryComp: false, // 是否销毁组件
            searchParams: {
              status: -1
            },
            punishTypeList: []
        };
    },
    computed: {
        // ...mapState({
        //   permissionArr: state => state.permission.permissionArr,
        // }),
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
                    name: 'guild_number',
                    type: 'input',
                    value: '',
                    label: '公会ID',
                    isNum: true,
                    placeholder: '请输入公会ID'
                },
                {
                    name: 'guild_name',
                    type: 'input',
                    value: '',
                    label: '所属公会',
                    placeholder: '请输入所属公会'
                },
                {
                    name: 'report_user_number',
                    type: 'input',
                    value: '',
                    label: '举报人ID',
                    isNum: true,
                    placeholder: '请输入举报人ID'
                },
                {
                    name: 'operator',
                    type: 'input',
                    value: '',
                    label: '操作人',
                    placeholder: '请输入操作人'
                },
                // {
                //     name: 'type',
                //     type: 'select',
                //     value: '',
                //     keyName: 'value',
                //     optionLabel: 'name',
                //     label: '处罚类型',
                //     placeholder: '请选择',
                //     options: MAPDATA.USERPUNISHTYPELISTCOPY
                // },
                {
                    name: 'punish_type_id',
                    type: 'select',
                    value: '',
                    keyName: 'value',
                    optionLabel: 'name',
                    label: '处罚类别',
                    placeholder: '请选择',
                    options: this.punishTypeList
                },
                {
                    name: 'status',
                    type: 'select',
                    value: -1,
                    keyName: 'value',
                    optionLabel: 'name',
                    label: '处罚状态',
                    placeholder: '请选择',
                    options: MAPDATA.USERPUNISHSTATUSLISTCOPY
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
          const arr = [
                    {
                        label: '时间',
                        prop: 'create_time',
                        minWidth: '160px'
                    },
                    {
                        label: '来源',
                        minWidth: '100px',
                        render: (h, params) => {
                            return h('span', params.row.from || '无')
                        }
                    },
                    {
                        label: '用户',
                        minWidth: '120px',
                        render: (h, params) => {
                            return h('div', [
                                h('div', params.row.punished_user_nickname),
                                h('div', params.row.punished_user_number || '无')
                            ])
                        }
                    },
                    {
                        label: '被举报用户所属公会',
                        minWidth: '150px',
                        render: (h, params) => {
                          if(params.row.punished_user_guild_number && params.row.punished_user_guild_number !== '无' ){
                            return h('div', [
                                h('div', params.row.punished_user_guild_name),
                                h('div', params.row.punished_user_guild_number || '无')
                            ])
                          }else{
                            return h('div', '无')
                          }
                        }
                    },
                    {
                        label: '被举报用户所属公会状态',
                        minWidth: '180px',
                        render: (h, params) => {
                            return h('div', [
                                h('div', params.row.punished_user_guild_status || '无')
                            ])
                        }
                    },
                    {
                        label: '被举报用户加入公会时间',
                        prop: 'punished_user_guild_join_time',
                        minWidth: '180px'
                    },
                    {
                      label: '被举报用户所属运营',
                      minWidth: '150px',
                      render: (h, params) => {
                          return h('div', [
                              h('div', params.row.punished_user_guild_operator_user_name || '无')
                          ])
                      }
                    },
                    {
                      label: '举报类型',
                      minWidth: '130px',
                      render: (h, params) => {
                          return h('span', params.row.genre || '无')
                      },
                      showOverFlow: true
                    },
                    {
                      label: '举报说明',
                      minWidth: '100px',
                      render: (h, params) => {
                          return h('span', params.row.content || '无')
                      },
                      showOverFlow: true
                    },
                    {
                      label: '举报证据',
                      isimgList: true,
                      prop: 'img_path',
                      propCopy: 'video_path',
                      imgWidth: '70px',
                      imgHeight: '70px',
                      width: '200px'
                    },
                    {
                      label: '举报用户',
                      minWidth: '160px',
                      render: (h, params) => {
                          return h('div', [
                              h('div', params.row.report_user_nickname || '无')
                          ])
                      }
                    },
                    {
                        label: '举报用户所属公会',
                        minWidth: '140px',
                        render: (h, params) => {
                          if(params.row.report_user_guild_number && params.row.report_user_guild_number !== '无'){
                              return h('div', [
                                h('div', params.row.report_user_guild_name),
                                h('div', params.row.report_user_guild_number || '无')
                            ])
                          }else{
                            return h('div', '无')
                          }
                        }
                    },
                    {
                      label: '举报用户所属公会状态',
                      minWidth: '160px',
                      render: (h, params) => {
                          return h('div', [
                              h('div', params.row.report_user_guild_status || '无')
                          ])
                      }
                    },
                    {
                      label: '举报用户所属运营',
                      minWidth: '140px',
                      render: (h, params) => {
                          return h('div', [
                              h('div', params.row.report_user_guild_operator_user_name || '无')
                          ])
                      }
                    },
                    {
                      label: '处理状态',
                      minWidth: '100px',
                      render: (h, params) => {
                          let data = MAPDATA.USERPUNISHSTATUSLISTCOPY.find(item => { return item.value === params.row.status })
                          return h('span', data ? data.name : '无')
                      }
                    },
                    {
                      label: '处罚类别',
                      minWidth: '100px',
                      prop: 'punish_type_str'
                    },
                    {
                      label: '处罚结果',
                      minWidth: '520px',
                      render: (h, params) => {
                        const vnode = params.row.res && params.row.res.length && params.row.res.map(item => {
                          return h('span', `${item};` || '无')
                        })
                        return h('div', vnode || '无')
                      },
                      showOverFlow: true
                    },
                    {
                      label: '解除时间',
                      minWidth: '170px',
                      render: (h, params) => {
                          return h('span', params.row.remove_time || '无')
                      }
                    },
                    {
                      label: '处罚操作人',
                      minWidth: '120px',
                      render: (h, params) => {
                          return h('span', params.row.penalty_admin || '无')
                      }
                    },
                    {
                      label: '解除操作人',
                      minWidth: '120px',
                      render: (h, params) => {
                          return h('span', params.row.undo_admin || '无')
                      }
                    },
                    {
                      label: '忽略操作人',
                      minWidth: '120px',
                      render: (h, params) => {
                          return h('span', params.row.ignore_admin || '无')
                      }
                    },
                    {
                      label: '受理操作人',
                      minWidth: '120px',
                      render: (h, params) => {
                          return h('span', params.row.accept_admin || '无')
                      }
                    },
                    {
                      label: '修改证据人',
                      minWidth: '120px',
                      render: (h, params) => {
                          return h('span', params.row.admin || '无')
                      }
                    },
                    {
                      label: '备注说明',
                      minWidth: '180px',
                      render: (h, params) => {
                          return h('span', params.row.remark || '无')
                      },
                      showOverFlow: true
                    },
                    {
                      label: '操作',
                      minWidth: '430px',
                      fixed: 'right',
                      render: (h, params) => {
                          return h('div', [
                              h('el-button', { props: { type: (params.row.accept_type === 0) ? 'danger' : 'info'}, style: {
                                  display: (params.row.status || params.row.status === 0) ? 'unset' : 'none'
                              }, on: {click:()=>{this.handleControl(params.row)}}}, `${(params.row.accept_type === 0) ? '未受理' : '已受理'}`),
                              h('el-button', { props: { type: 'success'}, style: {
                                  display: (params.row.status === 1 && this.permissionArr.includes('UserPunishLog@remove')) ? 'unset' : 'none'
                              }, on: {click:()=>{this.relieve(params.row)}}}, '解除'),
                              h('el-button', { props: { type: 'danger'}, style: {
                                  display: (params.row.status === 0 && this.permissionArr.includes('UserPunishLog@save')) ? 'unset' : 'none'
                              }, on: {click:()=>{this.blocked(params.row)}}}, '封禁'),
                              h('el-button', { props: { type: 'primary'}, style: {
                                  display: (params.row.status === 0 && this.permissionArr.includes('UserPunishLog@pass')) ? 'unset' : 'none'
                              }, on: {click:()=>{this.neglect(params.row.id)}}}, '忽略'),
                              h('el-button', { props: { type: 'primary'}, style: {
                                  display: (params.row.from === '后台处罚' && params.row.status === 1 && this.permissionArr.includes('UserPunishLog@updateSource')) ? 'unset' : 'none'
                              }, on: {click:()=>{this.update(params.row)}}}, '修改证据'),
                              h('el-button', { props: { type: 'primary'}, style: {
                                  display: (params.row.status || params.row.status === 0) ? 'unset' : 'none'
                              }, on: {click:()=>{this.handleOperationLog(params.row)}}}, '操作日志'),
                          ])
                      }
                    }
                  ]
            return {
                vm: this,
                url: REQUEST.risk.UserPunishLog,
                columns: this.permissionArr.includes('UserPunishLog@index') ? arr : []
            }
        }
    },
    // mounted() {
    //   const { fullPath } = this.$route;
    //   this.$store.commit('permission/SET_CUR_BTN', fullPath)
    //   console.log(this.permissionArr, 'permissionArr');
    // },
    methods: {
        // 配置参数
        beforeSearch(params) {
            let s = { ...this.searchParams, ...this.dateTimeParams }
            return {
                page: params ? params.page : 1,
                page_size: params ? params.size : 10,
                user_number: s.user_number,
                status: s.status,
                guild_number:s.guild_number,
                guild_name:s.guild_name,
                operator:s.operator,
                report_user_number:s.report_user_number,
                start_time: s.start_time ? Math.floor(s.start_time / 1000) : s.start_time,
                end_time: s.end_time ? Math.floor(s.end_time / 1000) : s.end_time,
                punish_type_id: s.punish_type_id
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
            this.searchParams = {
                status: -1
            }
            this.dateTimeParams = {}
            this.getList()
        },
        // 查询
        onSearch() {
            this.getList()
        },
        // 新增
        add() {
            this.load('add')
        },
        // 封禁
        blocked(row) {
            this.load('blocked', row)
        },
        // 修改
        update(row) {
            this.isDestoryComp = true
            setTimeout(() => {
                this.$refs.uploadImg.loadParams(row)
            }, 50);
        },
        load(status, row) {
            this.isDestoryComp = true
            setTimeout(() => {
                this.$refs.userComp.loadParams(status, row)
            }, 50);
        },
        // 解除
      async relieve(row) {
        const temp = {}
        if (row.id_array.length > 1) {
          temp.ids = row.id_array;
        } else {
          temp.id = row.id_array.join();
        }
        this.$confirm('是否确认解除当前封禁用户?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(async () => {
            let res = await removeUserPunish(temp)
            if(res.code === 2000) {
                this.$success('解除成功')
                this.getList()
            }
        }).catch(() => {});
      },
        // 忽略
        async neglect(id) {
            let res = await passUserPunish({ id })
            if(res.code === 2000) {
                this.$success('操作成功')
                this.getList()
            }
        },
        // 导出excel
        async BatchRurn() {
          let s = this.beforeSearch();
          s.is_all = 1; // 导出数据时传1
          let res = await UserPunishLog(s);
          let arr = JSON.parse(JSON.stringify(res.data.list));
          if (arr.length <= 0) return this.$warning("当前没有数据可以导出");
          arr = arr.map((item, index) => {
            let data = MAPDATA.USERPUNISHSTATUSLISTCOPY.find((v) => {
                return v.value === item.status;
            });
            let params = {
              create_time: item.create_time,
              from: item.from,
              punished_user_number: item.punished_user_number,
              punished_user_nickname: item.punished_user_nickname,
              punished_user_guild_number : item.punished_user_guild_number,
              punished_user_guild_name : item.punished_user_guild_name,
              punished_user_guild_status : item.punished_user_guild_status,
              punished_user_guild_join_time: item.punished_user_guild_join_time,
              punished_user_guild_operator_user_name: item.punished_user_guild_operator_user_name,
              genre: item.genre,
              content: item.content,
              report_user_number: item.report_user_number,
              report_user_nickname: item.report_user_nickname,
              report_user_guild_number : item.report_user_guild_number,
              report_user_guild_name : item.report_user_guild_name,
              report_user_guild_status: item.report_user_guild_status,
              report_user_guild_operator_user_name : item.report_user_guild_operator_user_name,
              status : data ? data.name : '无',
              punish_type_str: item.punish_type_str,
              res : item.res,
              remove_time: item.remove_time,
              penalty_admin : item.penalty_admin || '无',
              undo_admin : item.undo_admin || '无',
              ignore_admin : item.ignore_admin || '无',
              accept_admin : item.accept_admin || '无',
              admin : item.admin || '无',
              remark : item.remark
            };
            return params;
          });
          let nameList = [
            "时间",
            "来源",
            "用户ID",
            "用户昵称",
            "被举报用户所属公会ID",
            "被举报用户所属公会昵称",
            "被举报用户所属公会状态",
            "被举报用户加入公会时间",
            "被举报用户所属运营",
            "举报类型",
            "举报说明",
            "举报用户ID",
            "举报用户昵称",
            "举报用户所属公会ID",
            "举报用户所属公会昵称",
            "举报用户所属公会状态",
            "举报用户所属运营",
            "处理状态",
            "处罚类别",
            "处罚结果",
            "解除时间",
            "处罚操作人",
            "解除操作人",
            "忽略操作人",
            "受理操作人",
            "修改证据人",
            "备注说明"
          ];
          exportTableData(arr, nameList, "处罚举报记录");
        },
        // 销毁组件
        destoryComp() {
            this.isDestoryComp = false
        },
        // 获取处罚类别
        async getPunishType(params) {
          const response = await getPunishTypeList(params);
          if (response.code == 2000) {
            const tempArr = Array.from(
              Array.isArray(response.data) ? response.data : []
            );
            this.punishTypeList =
              tempArr.reduce((prev, curr) => {
                prev.push({
                  name: curr.name,
                  value: curr.id,
                });
                return prev;
              }, []) || [];
            this.punishTypeList.unshift({ name: "全部", value: '' })
          }
        },
        // 操作日志
        handleOperationLog(row) {
          setTimeout(() => {
            this.$refs.operationLogComp.load(row);
          }, 100);
        },
        // 受理
      async handleControl(row) {
          const response = await acceptPunish({ id: row.report_event_id });
          if (response.code == 2000) {
            this.$success('受理成功');
            this.getList();
          }
        },
    },
    created() {
      this.getPunishType();
    },
}
</script>

<style lang="scss" scoped>

.serviceConfig-userPunish-box {
  ::v-deep .share-table-list-box .el-table__body-wrapper  {
    max-height: none !important;
    overflow-y: none !important;
}
}

</style>
