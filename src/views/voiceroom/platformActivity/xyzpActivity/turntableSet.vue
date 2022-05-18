// 幸运转盘设置
<template>
    <div class="invite-join-us">
        <div class="searchParams">
            <el-button class="add" v-if="count === 0" type="success" @click="handleAdd">新增</el-button>
        </div>
        <div class="tableList">
            <tableList :cfgs="cfgs" @saleAmunt="saleAmunt" ref="tableList"></tableList>
        </div>
    </div>
</template>

<script>
// 引入列表组件
import tableList from '@/components/tableList/TableList.vue'
// 引入请求
import request from '@/utils/request2'
// 引入api
import REQUEST from '@/request/index.js'
// 引入时间插件
import moment from 'moment'

export default {
    components: {
        tableList
    },
    data() {
        return {
            count: 0,
        }
    },
    computed: {
        forms() {
            return [
            ]
        },
        cfgs() {
            return {
                vm: this,
                url: REQUEST.platformActivity.Activityins,
                method: "post",
                columns: [
                    {
                        label: '活动名称',
                        props : 'name',
                        render: (h, params) => {
                            return h('span', params.row.name)
                        }
                    },
                    {
                        label: '礼物种类数量',
                        props : 'gift_count',
                        render: (h, params) => {
                            return h('span', params.row.gift_count)
                        }
                    },
                    {
                        label: '投入',
                        props : 'in',
                        render: (h, params) => {
                            return h('span', params.row.in)
                        }
                    },
                    {
                        label: '产出',
                        props : 'out',
                        render: (h, params) => {
                            return h('span', params.row.out)
                        }
                    },
                    {
                        label: '单次消耗喵粮数',
                        props : 'cost',
                        render: (h, params) => {
                            return h('span', params.row.cost)
                        }
                    },
                    {
                        label: '活动状态',
                        props : 'status',
                        width : '80',
                        render: (h, params) => {
                            if(params.row.status === 1) {
                                return h('span',{style: {color: 'green'},}, '开始')
                            }
                            return h('span',{style: {color: 'red'},}, '暂停')
                        }
                    },
                    {
                        label: '开始时间',
                        props : 'start_time',
                        render: (h, params) => {
                            return h('span', params.row.start_time > 0 ? moment(params.row.start_time * 1000).format('YYYY-MM-DD HH:mm:ss') : "")
                        }
                    },
                    {
                        label: '结束时间',
                        props : 'end_time',
                        render: (h, params) => {
                            return h('span', params.row.end_time > 0 ? moment(params.row.end_time * 1000).format('YYYY-MM-DD HH:mm:ss') : "")
                        }
                    },
                    {
                        label: '操作',
                        width : '260',
                        render: (h, params) => {
                            return h('div', [
                                h('el-button', { props : { type: 'primary'}, on: {click:()=>{this.hanldeEdit(params.row)}}},'修改'),
                                h('el-button', { props : { type: 'primary'}, on: {click:()=>{this.hanldeShow(params.row)}}},'查看'),
                                h('el-button', { props : { type: params.row.status == 1 ? 'danger' : 'success'}, on: {click:()=>{this.handleChange(params.row)}}},(params.row.status == 1 ? '暂停' : '开始')),
                            ])
                        }
                    },
                ]
            }
        }
    },
    methods:{
        //传递参数
        beforeSearch(params) {
            return {
                size: params.size,
                page: params.page,
                code : "dzp"
            };
        },
        // 新增
        handleAdd(){
            console.log("新增");
        },
        saleAmunt(row) {
            this.count = row.count
        },
        // 修改
        hanldeEdit(row){
            console.log("修改",row);
        },
        // 查看
        hanldeShow(row){
            console.log("查看",row);
        },
        // 开始 暂停
        handleChange(row){
            let params = {
                id : row.id,
                status: row.status == 1 ? 2 : 1
            }
            request({
                url: REQUEST.platformActivity.stop,
                method: "post",
                data: params
            }).then(res => {
                this.$message.success("操作成功");
                this.$refs.tableList.getData()
            }).catch(err=>{
                this.$message.error(err.msg);
            })
        },
    }
}
</script>

<style lang="scss">
.invite-join-us {
    padding: 20px;
    box-sizing: border-box;
}
.add{
    margin-bottom: 22px;
}
</style>