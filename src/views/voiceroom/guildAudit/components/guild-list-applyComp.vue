<template>
    <div class="guild-apply-list-box">
        <div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset" @onSearch="onSearch"></SearchPanel>
        </div>
        <tableList :cfgs="cfgs" ref="tableList"></tableList>
    </div>
</template>

<script>
// 引入api
import { newGuildApplyCheck, getGuildType } from '@/api/videoRoom'
// 引入列表组件
import tableList from '@/components/tableList/TableList.vue'
// 引入菜单组件
import SearchPanel from '@/components/SearchPanel/final.vue'
// 引入公共参数
import mixins from '@/utils/mixins.js'
// 引入api
import REQUEST from '@/request/index.js'
// 引入公共方法
import { timeFormat } from '@/utils/common.js'
// 引入公共map
import MAPDATA from '@/utils/jsonMap.js'
export default {
    data() {
      return {
        guildTypeList: [], // 公会类型
      };
    },
    components: {
        tableList,
        SearchPanel
    },
    mixins: [mixins],
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
                    name: 'guild_type',
                    type: 'select',
                    value: '',
                    keyName: 'value',
                    optionLabel: 'name',
                    label: '申请公会类型',
                    placeholder: '请选择',
                    options: this.guildTypeList
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
                url: REQUEST.guild.newGuildApplyList,
                columns: [
                    {
                        label: '申请时间',
                        render: (h, params) => {
                            return h('span', params.row.create_time ? timeFormat(params.row.create_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
                        }
                    },
                    {
                        label: '用户ID',
                        showOverFlow: true,
                        render: (h, params) => {
                            return h('span', params.row.user_number || '无')
                        }
                    },
                    {
                        label: '用户昵称',
                        showOverFlow: true,
                        render: (h, params) => {
                            return h('span', params.row.guild_name || '无')
                        }
                    },
                    {
                        label: '申请公会类型',
                        showOverFlow: true,
                        render: (h, params) => {
                            return h('span', params.row.guild_type_name || '无')
                        }
                    },
                    {
                        label: '主播数量',
                        showOverFlow: true,
                        render: (h, params) => {
                            return h('span', params.row.question.question1 || '无')
                        }
                    },
                    {
                        label: '曾经的合作平台',
                        showOverFlow: true,
                        render: (h, params) => {
                            return h('span', params.row.question.question2 || '无')
                        }
                    },
                    {
                        label: '联系方式',
                        showOverFlow: true,
                        render: (h, params) => {
                            return h('span', params.row.contact_way || '无')
                        }
                    },
                    // {
                    //     label: '操作',
                    //     fixed: 'right',
                    //     minWidth: '100px',
                    //     render: (h, params) => {
                    //         return h('div', [
                    //             h('el-button', { props: { type: 'primary'}, style: {
                    //                 display: params.row.status === 1 ? 'unset' : 'none'
                    //             }, on: {click:()=>{this.clickFunc(params.row.id, 2)}}}, '通过'),
                    //             h('el-button', { props: { type: 'danger'}, style: {
                    //                 display: params.row.status === 1 ? 'unset' : 'none'
                    //             }, on: {click:()=>{this.clickFunc(params.row.id, 3)}}}, '驳回'),
                    //             h('el-button', { props: { type: 'success'}, style: {
                    //                 display: params.row.status === 2 ? 'unset' : 'none'
                    //             }, on: {click:()=>{}}}, '已通过'),
                    //             h('el-button', { props: { type: 'danger'}, style: {
                    //                 display: params.row.status === 3 ? 'unset' : 'none'
                    //             }, on: {click:()=>{}}}, '已拒绝')
                    //         ])
                    //     }
                    // }
                ]
            }
        }
    },
    created() {
      this.getTypeList()
    },
    methods: {
        // 刷新列表
        getList() {
            this.$refs.tableList.getData()
        },
        // 配置参数
        beforeSearch(params) {
            let s = { ...this.searchParams, ...this.dateTimeParams }
            return {
                page: params.page,
                pagesize: params.size,
                user_number: s.user_number,
                guild_type: s.guild_type,
                start_time: s.start_time ? Math.floor(s.start_time / 1000) : '',
                end_time: s.end_time ? Math.floor(s.end_time / 1000) : '',
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
        // 重置
        reset() {
            this.searchParams = {}
            this.dateTimeParams = {}
            this.getList()
        },
        // 查询
        onSearch() {
            this.getList()
        },
        // 联系 - 驳回
        async clickFunc(id, status) {
            if(status === 2) {
                let res = await newGuildApplyCheck({ id, status })
                if(res.code === 2000) {
                    this.$message.success('审核通过')
                    this.getList()
                }
            } else {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    let res = await newGuildApplyCheck({ id, status })
                    if(res.code === 2000) {
                        this.$message.success('驳回成功')
                        this.getList()
                    }
                }).catch(() => {});
            }
        },
        // 获取公会类型
        async getTypeList() {
          const response = await getGuildType()
          if (response.code === 2000) {
            const tempArr = Array.from(
              Array.isArray(response.data.list) ? response.data.list : []
            )
            this.guildTypeList = tempArr.reduce((prev, curr) => {
              prev.push({
                name: curr.remark,
                value: curr.type
              })
              return prev
            }, []) || []
            // 模拟全部,避免切换其他之后无法切换查看到全部
            let all = {
              name : "全部",
              value : ""
            }
            this.guildTypeList.unshift(all)
          }
        },
    }
}
</script>

<style lang="scss">
.guild-apply-list-box {
    padding: 20px;
    box-sizing: border-box;
}
</style>
