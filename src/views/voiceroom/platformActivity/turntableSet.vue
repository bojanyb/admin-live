<template>
    <div class="invite-join-us">
        <div class="searchParams">
            <el-button class="add" type="success" @click="handleAdd">新增</el-button>
        </div>
        <div class="tableList">
            <tableList :cfgs="cfgs" ref="tableList"></tableList>
        </div>
    </div>
</template>

<script>
// 引入列表组件
import tableList from '@/components/tableList/TableList.vue'
import {
    getActivityinsList
} from "@/api/videoRoom"
export default {
    components: {
        tableList
    },
    computed: {
        forms() {
            return [
            ]
        },
        cfgs() {
            return {
                vm: this,
                url: getActivityinsList,
                method: "post",
                columns: [
                    {
                        label: '活动名称',
                        render: (h, row) => {
                            return '111'
                        }
                    },
                    {
                        label: '礼物种类数量',
                        render: (h, row) => {
                            return '111'
                        }
                    },
                    {
                        label: '投入',
                        render: (h, row) => {
                            return '111'
                        }
                    },
                    {
                        label: '产出',
                        render: (h, row) => {
                            return '111'
                        }
                    },
                    {
                        label: '单次消耗喵粮数',
                        render: (h, row) => {
                            return '111'
                        }
                    },
                    {
                        label: '活动状态',
                        render: (h, row) => {
                            return '111'
                        }
                    },
                    {
                        label: '开始时间',
                        render: (h, row) => {
                            return '111'
                        }
                    },
                    {
                        label: '结束时间',
                        render: (h, row) => {
                            return '111'
                        }
                    },
                    {
                        label: '操作',
                        render: (h, row) => {
                            return '111'
                        }
                    },
                ]
            }
        }
    },
    created(){
    },
    methods:{
        handleAdd(){
            console.log("新增");
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