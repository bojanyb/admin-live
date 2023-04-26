<template>
    <div class="guild-apply-list-box">
        <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset" @onSearch="onSearch"  @add="add"></SearchPanel>
        <tableList :cfgs="cfgs" ref="tableList"></tableList>
    </div>
</template>

<script>
// 引入tab菜单组件
import menuComp from '@/components/menuComp/index.vue'
// 引入api
import { guildUserApplyCheck } from '@/api/user.js'
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
        return {}
    },
    components: {
        menuComp,
        tableList,
        SearchPanel
    },
    mixins: [mixins],
    computed: {
        forms() {
            return [
                {
                    name: 'type',
                    type: 'select',
                    value: 0,
                    keyName: 'value',
                    optionLabel: 'name',
                    label: '申请类型',
                    placeholder: '请选择',
                    options: MAPDATA.GUILDAPPLYTYPE
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
                    name: 'user_number',
                    type: 'input',
                    value: '',
                    label: '主播ID',
                    isNum: true,
                    placeholder: '请输入主播ID'
                },
            ]
        },
        cfgs() {
          const arr = [
                    {
                        label: '申请时间',
                        render: (h, params) => {
                            return h('span', params.row.create_time ? timeFormat(params.row.create_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
                        }
                    },
                    {
                        label: '申请类型',
                        showOverFlow: true,
                        render: (h, params) => {
                            return h('span', params.row.type == 0 ? '入会申请' : '退会申请' || '无')
                        }
                    },
                    {
                        label: '主播ID',
                        showOverFlow: true,
                        render: (h, params) => {
                            return h('span', params.row.user_number)
                        }
                    },
                    {
                        label: '主播昵称',
                        showOverFlow: true,
                        render: (h, params) => {
                            return h('span', params.row.nickname || '无')
                        }
                    },
                    {
                        label: '公会ID',
                        showOverFlow: true,
                        render: (h, params) => {
                            return h('span', params.row.guild_number || '无')
                        }
                    },
                    {
                        label: '公会昵称',
                        showOverFlow: true,
                        render: (h, params) => {
                            return h('span', params.row.guild_nickname || '无')
                        }
                    },
                    {
                        label: '公会类型',
                        showOverFlow: true,
                        render: (h, params) => {
                            return h('span', params.row.guild_nickname || '无')
                        }
                    },
                    {
                        label: '主播性别',
                        showOverFlow: true,
                        render: (h, params) => {
                            return h('span', params.row.sex == 1 ? '男' : (params.row.sex == 2 ? '女' : '未知'))
                        }
                    },
                    {
                        label: '手机号码',
                        showOverFlow: true,
                        render: (h, params) => {
                            let phone = params.row.phone.substr(0, 3) + '****' + params.row.phone.substr(7)
                            return h('span',  phone || '无')
                        }
                    },
                    {
                        label: '操作',
                        fixed: 'right',
                        minWidth: '100px',
                        render: (h, params) => {
                            return h('div', [
                                h('el-button', { props: { type: 'primary'}, style: {
                                    display: (params.row.status === 0 && this.curBtnArr.includes('Guild@guildUserApplyCheck')) ? 'unset' : 'none'
                                }, on: {click:()=>{this.clickFunc(params.row, 1)}}}, '通过'),
                                h('el-button', { props: { type: 'danger'}, style: {
                                    display: (params.row.status === 0 && this.curBtnArr.includes('Guild@guildUserApplyCheck')) ? 'unset' : 'none'
                                }, on: {click:()=>{this.clickFunc(params.row, 2)}}}, '拒绝'),
                                h('el-button', { props: { type: 'primary'},style: {
                                    display: params.row.status === 1 ? 'unset' : 'none',
                                }, on: {click:()=>{}}}, '已通过'),
                                h('el-button', { props: { type: 'danger'}, style: {
                                    display: params.row.status === 2 ? 'unset' : 'none',
                                }, on: {click:()=>{}}}, '已拒绝')
                            ])
                        }
                    }
                ]
            return {
                vm: this,
                url: REQUEST.guild.guildUserApply,
                columns: this.curBtnArr.includes('Guild@guildUsers') ? arr : []
            }
        },
    },
    methods: {
        // 刷新列表
        getList() {
            this.$refs.tableList.getData()
        },
        // 配置参数
        beforeSearch(params) {
            let s = { ...this.searchParams }
            return {
                page: params.page,
                pagesize: params.size,
                guild_number: s.guild_number,
                user_number: s.user_number,
                type: s.type ? s.type : 0,
                status: 0 // 0未审核1通过2拒绝
            }
        },
        // 重置
        reset() {
            this.searchParams = {}
            this.getList()
        },
        // 查询
        onSearch() {
            this.getList()
        },
        // 公会房间 - 新增
        add(){
            this.$prompt('用户ID', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputPattern: /^d+$/,
            inputErrorMessage: '用户ID格式不正确'
            }).then(({ value }) => {
                console.log(value)
            }).catch(() => {});
        },
        // 公会房间 - 新增确定
        handelAdd(){
            this.$refs.ruleForm.validate(valid => {
                if (valid) {
                    this.isAdd = false
                }
            })
        },
        // 操作 - 通过/驳回
        async clickFunc(row, status) {
            if(status === 1) {
                let params = {id : row.id,status:status}
                let res = await guildUserApplyCheck(params)
                if(res.code === 2000) {
                    this.$message.success('操作成功')
                    this.$nextTick(res=>{
                        this.getList()
                    })
                }
            } else {
                let tipsText = '是否拒绝 【' + row.nickname + '】的退会申请?'
                this.$confirm(tipsText, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    let params = {id : row.id,status:status}
                    let res = await guildUserApplyCheck(params)
                    if(res.code === 2000) {
                        this.$message.success('操作成功')
                        this.getList()
                    }
                }).catch(() => {});
            }
        }
    }
}
</script>

<style lang="scss">
.guild-apply-list-box {
    padding: 20px;
    box-sizing: border-box;
    .headerBox {
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid #ccc;
		margin-bottom: 30px;
		.select {
			display: flex;
			align-items: center;
			>span {
				display: flex;
				align-items: center;
				justify-content: center;
				width: auto;
				height: 50px;
				margin-left: 20px;
				cursor: pointer;
				border-bottom: 2px solid rgba(0,0,0,0);
				transform: translateY(1px);
			}
			>span.high {
				border-color: blue;
			}
		}
	}
}
</style>
