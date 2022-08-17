<template>
    <div class="systemConfig-phone-filter-box">
        <menuComp ref="menuComp" :menuList="menuList" v-model="tabIndex"></menuComp>

        <div class="addBox">
            <el-button type="success" @click="add">新增</el-button>
        </div>

		<tableList :cfgs="cfgs" ref="tableList"></tableList>

        <!-- 新增组件 -->
        <add v-if="isDestoryComp" :tabIndex="tabIndex" ref="add" @destoryComp="destoryComp" @getList="getList"></add>
    </div>
</template>

<script>
// 引入列表配置
import allocationList from './index.js'
// 引入api
import { deleteVirtualPhone, deletePhone } from '@/api/system.js'
// 引入新增组件
import add from './components/add.vue'
// 引入tab菜单组件
import menuComp from '@/components/menuComp/index.vue'
// 引入列表组件
import tableList from '@/components/tableList/TableList.vue'
// 引入api
import REQUEST from '@/request/index.js'
// 引入公共参数
import mixins from '@/utils/mixins.js'
export default {
    mixins: [mixins],
    components: {
        tableList,
        menuComp,
        add
    },
    data() {
        return {
            isDestoryComp: false, // 是否销毁组件
            tabIndex: '0',
            menuList: [
                {
                    name: '号码表'
                },
                {
                    name: '白名单'
                },
                {
                    name: '黑名单'
                }
            ]
        }
    },
    computed: {
        cfgs() {
            let arr = [
                {
                    label: '操作',
                    render: (h, params) => {
                        return h('div', [
                            h('el-button', { props: { type: 'danger'}, on: {click:()=>{this.deleteParams(params.row.id)}}}, '移除')
                        ])
                    }
                }
            ]

            // 获取当前配置
            let arr2 = allocationList.find(item => { return item.value === this.tabIndex })
            
            return {
                vm: this,
                url: REQUEST.system.dummy[arr2.url],
                columns: [...arr2.list, ...arr]
            }
        }
    },
    watch: {
        tabIndex: {
            handler(n, o) {
                if((o === '1' || o === '2') && n !== '0') {
                    this.getList()
                }
            },
            deep: true
        }
    },
    methods: {
        // 配置参数
        beforeSearch(params) {
            let data = {
                page: params.page,
                pagesize: params.size,
                type: Number(this.tabIndex)
            }
            if(this.tabIndex === '0') {
                delete data.type
            }
            return data
        },
        // 刷新列表
        getList() {
            this.$refs.tableList.getData()
        },
        // 重置
        reset() {
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
                this.$refs.add.dialogVisible = true
            }, 50);
        },
        // 删除号码段
        async deleteParams(id) {
            let res;
            if(this.tabIndex === '0') {
                res = await deleteVirtualPhone({ id })
                if(res.code === 2000) {
                    this.$message.success('删除成功')
                    this.getList()
                }
            } else {
                res = await deletePhone({ id })
                if(res.code === 2000) {
                    this.$message.success('删除成功')
                    this.getList()
                }
            }
        },
        // 销毁组件
        destoryComp() {
            this.isDestoryComp = false
        },
    }
}
</script>

<style lang="scss">
.systemConfig-phone-filter-box {
    padding: 10px 20px 20px 20px;
    box-sizing: border-box;
    .addBox {
        margin-bottom: 20px;
    }
}
</style>