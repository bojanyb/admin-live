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
import { changePrivateChat } from '@/api/videoRoom'
import { rmGuildUser } from '@/api/user.js'
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
                    name: 'user_number',
                    type: 'input',
                    value: '',
                    label: '主播ID',
                    isNum: true,
                    placeholder: '请输入主播ID'
                },
                {
                    name: 'guild_number',
                    type: 'input',
                    value: '',
                    label: '公会ID',
                    isNum: true,
                    placeholder: '请输入公会ID'
                },
            ]
        },
        cfgs() {
            return {
                vm: this,
                url: REQUEST.guild.getGuildUsers,
                columns: [
                    {
                        label: '加入时间',
                        render: (h, params) => {
                            return h('span', params.row.create_time ? timeFormat(params.row.create_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
                        }
                    },
                    {
                        label: '主播ID',
                        showOverFlow: true,
                        render: (h, params) => {
                            return h('span', params.row.user_number || '无')
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
                        label: '公会',
                        showOverFlow: true,
                        render: (h, params) => {
                            return h('div', [
                              h('div', params.row.guild_nickname || '无'),
                              h('div', '('+ params.row.guild_number + ')' || '无'),
                            ])
                        }
                    },
                    {
                        label: '主播等级',
                        showOverFlow: true,
                        render: (h, params) => {
                            return h('span', params.row.live_rank || '0')
                        }
                    },
                    {
                        label: '主播状态',
                        showOverFlow: true,
                        render: (h, params) => {
                            return h('span',{
                                style: { color: + params.row.status == 1 ? '#67C23A' : (params.row.status == 2 ? '#E6A23C' : '#F56C6C')  }},
                                params.row.status == 1 ? '正常' : (params.row.status == 2 ? '封禁' : '注销') || '')
                        }
                    },
                    {
                        label: "私聊权限",
                        headIcon : require("./../../../../assets/ask.png"),
                        render: (h, params) => {
                            let newArr = []
                            newArr.push(h('el-switch',{
                                'props' : { 'value' :params.row.is_private_chat,'activeValue':1},
                                'on': {change: () => {this.change(params.row)}}
                            }))
                            return h('div',newArr)
                        }
                    },
                    {
                        label: '操作',
                        fixed: 'right',
                        minWidth: '100px',
                        render: (h, params) => {
                            return h('div', [
                                h('el-button', { props: { type: 'danger'}, on: {click:()=>{this.clickDel(params.row, )}}}, '移除'),
                            ])
                        }
                    }
                ]
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
                status: s.status,
                guild_type: 1
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
        // 公会成员 - 新增
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
        // 公会成员 - 移除
        clickDel(row){
            let title = "确认移除 [ " + row.nickname + " ] 吗？"
            this.$confirm(title, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                let res = await rmGuildUser({ id: row.id, guild_type: 1 })
                if(res.code === 2000) {
                	this.$message({
                		type: 'success',
                		message: '移除成功!'
                	});
                	this.getList()
                }
            }).catch(() => {});
        },
        // 私聊权限
        change(row){
            let params = {
                id: row.id,
                is_private_chat: row.is_private_chat == 0 ? 1 : 0,
                guild_type: 1
            }
            changePrivateChat(params).then(res=>{
                let tipsText = "";
                if(params.is_private_chat == 1){
                    tipsText = "私聊权限已开启";
                }else{
                    tipsText = "私聊权限已关闭";
                }
                this.$message({
                    message: tipsText,
                    type: 'success'
                });
                let page = this.$refs.tableList.search.page;
                this.$refs.tableList.handlePageChange(page)
            }).catch(err=>{
                console.log(err)
            })
        },
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
