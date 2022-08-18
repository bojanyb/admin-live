<template>
    <div class="app-container moveDating-anchor-box">
        <div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" :show-add="true" @onReset="reset" @onSearch="onSearch" @add="add"></SearchPanel>
        </div>

		<tableList :cfgs="cfgs" ref="tableList"></tableList>

        <!-- 新增组件 -->
        <anchorComp v-if="isDestoryComp" ref="addMember" @destoryComp="destoryComp" @getList="getList"></anchorComp>
    </div>
</template>

<script>
// 引入api
import { rmHeartAnchor } from '@/api/moveDating'
// 引入新增组件
import anchorComp from './components/anchorComp.vue'
// 引入菜单组件
import SearchPanel from '@/components/SearchPanel/final.vue'
// 引入列表组件
import tableList from '@/components/tableList/TableList.vue'
// 引入api
import REQUEST from '@/request/index.js'
// 引入公共参数
import mixins from '@/utils/mixins.js'
export default {
    mixins: [mixins],
    components: {
        SearchPanel,
        tableList,
        anchorComp
    },
    data() {
        return {
            isDestoryComp: false // 是否销毁组件
        }
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
                }
            ]
        },
        cfgs() {
            return {
                vm: this,
                url: REQUEST.move.heartAnchor,
                columns: [
                    {
                        label: '用户ID',
                        prop: 'user_number'
                    },
                    {
                        label: '用户昵称',
                        prop: 'nickname'
                    },
                    {
                        label: '用户头像',
                        isimg: true,
                        prop: 'face',
                        imgWidth: '50px',
                        imgHeight: '50px'
                    },
                    {
                        label: '用户性别',
                        prop: 'user_number'
                    },
                    {
                        label: '个性签名',
                        prop: 'user_number'
                    },
                    {
                        label: '操作',
                        render: (h, params) => {
                            return h('div', [
                                h('el-button', { props: { type: 'danger'}, on: {click:()=>{this.deleteParams(params.row.user_number)}}}, '移除')
                            ])
                        }
                    }
                ]
            }
        }
    },
    methods: {
        // 配置参数
        beforeSearch(params) {
            let s = { ...this.searchParams }
            return {
                page: params.page,
                page_size: params.size,
                user_number: s.user_number
            }
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
        // 查询
        onSearch() {
            this.getList()
        },
        // 新增
        add() {
            this.isDestoryComp = true
            setTimeout(() => {
                this.$refs.addMember.dialogVisible = true
            }, 50);
        },
        // 销毁组件
        destoryComp() {
            this.isDestoryComp = false
        },
        // 移除
        async deleteParams(user_number) {
            this.$confirm('确认移除当前心动主播?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                let res = await rmHeartAnchor({ user_number })
                if(res.code === 2000) {
                    this.$success('删除成功')
                    this.getList()
                }
            }).catch(() => {});
        }
    }
}
</script>

<style lang="scss">
.moveDating-anchor-box {

}
</style>