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
import { rmHeartAnchor,serachTag } from '@/api/moveDating'
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
// 引入公共map
import MAPDATA from '@/utils/jsonMap.js'
export default {
    mixins: [mixins],
    components: {
        SearchPanel,
        tableList,
        anchorComp
    },
    data() {
        return {
            sexList : [],
            sound_tagList: [], // 音色分类
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
                },
                {
                    name: 'sound_tag',
                    type: 'select',
                    value: '全部',
                    keyName: 'id',
                    optionLabel: 'sound_tag',
                    label: '音色分类名',
                    placeholder: '请选择音色分类名',
                    options: this.sound_tagList,
                    clearable: true,
                },
                {
                    name: 'sex',
                    type: 'select',
                    value: '全部',
                    keyName: 'value',
                    optionLabel: 'name',
                    label: '用户性别',
                    placeholder: '请选择用户性别',
                    options: this.sexList,
                    clearable: true,
                },
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
                        label: '音色分类名',
                        render: (h, params) => {
                            return h('span', params.row.sound_tag ? params.row.sound_tag : '无')
                        }
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
                        render: (h, params) => {
                            let data = MAPDATA.SEXLIST.find(item => { return item.value === params.row.sex })
                            return h('span', data ? data.name : '无')
                        }
                    },
                    {
                        label: '个性签名',
                        showOverFlow: true,
                        render: (h, params) => {
                            return h('span', params.row.autograph || '无')
                        }
                    },
                    {
                        label: '操作',
                        render: (h, params) => {
                            return h('div', [
                            h('el-button', { props: { type: 'primary'}, on: {click:()=>{this.editParams(params.row)}}}, '编辑'),
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
                user_number: s.user_number,
                card_id: s.sound_tag == "全部" ? "" : s.sound_tag,
                sex: s.sex == "全部" ? "" : s.sex
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
            this.load('add')
        },
        load(status, row) {
            this.isDestoryComp = true
            setTimeout(() => {
                this.$refs.addMember.loadParams(status, row)
            }, 50);
        },
        // 销毁组件
        destoryComp() {
            this.isDestoryComp = false
        },
        // 编辑
        editParams(row){
            this.load('upload',row)
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
        },
        // 获取音色分类
        async serachTagFunc() {
            let res = await serachTag()
            this.sound_tagList = res.data
            this.sound_tagList.unshift({sound_tag: '全部',id: 0});
        }
    },
    mounted() {
        this.sexList = JSON.parse(JSON.stringify(MAPDATA.SEXLIST));
        this.sexList.unshift({name: '全部',value: 0});
        this.serachTagFunc();
    }
}
</script>

<style lang="scss">
.moveDating-anchor-box {

}
</style>