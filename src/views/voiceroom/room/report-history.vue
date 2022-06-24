// 举报房间记录
<template>
    <div class="report-history-box">
        <tableList :cfgs="cfgs" ref="tableList"></tableList>
    </div>
</template>

<script>
// 引入列表组件
import tableList from '@/components/tableList/TableList.vue'
// 引入api
import REQUEST from '@/request/index.js'
// 引入公共方法
import { timeFormat } from '@/utils/common.js'
// 引入公共map
import MAPDATA from '@/utils/jsonMap.js'

export default {
    components: {
        tableList
    },
    computed: {
        cfgs() {
            return {
                vm: this,
                url: REQUEST.room.report,
                columns: [
                    {
                        label: '用户ID',
                        prop: 'user_id'
                    },
                    {
                        label: '直播场次ID',
                        prop: 'live_room_id'
                    },
                    {
                        label: '房间号码',
                        prop: 'room_number'
                    },
                    {
                        label: '房主昵称',
                        prop: 'anchor'
                    },
                    {
                        label: '房间类型名称',
                        prop: 'room_genre_name'
                    },
                    {
                        label: '举报房主ID',
                        prop: 'live_user_id'
                    },
                    {
                        label: '举报人昵称',
                        prop: 'user_name'
                    },
                    {
                        label: '举报内容',
                        width: '160px',
                        prop: 'content'
                    },
                    {
                        label: '回复',
                        width: '200px',
                        render: (h, params) => {
                            return h('span', params.row.reply || '无')
                        }
                    },
                    {
                        label: '举报时间',
                        width: '160px',
                        prop: 'create_time',
                        render: (h, params) => {
                            return h('span', params.row.create_time ? timeFormat(params.row.create_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
                        }
                    },
                    {
                        label: '状态',
                        prop: 'status',
                        render: (h, params) => {
                            let data = MAPDATA.REPORTSTATUS.find(item => { return params.row.status == item.value })
                            return h('span', data ? data.name : '无')
                        }
                    }
                ]
            }
        }
    },
    data() {
        return {};
    },
    methods: {
        // 配置参数
        beforeSearch(params) {
            return {
                page: params.page,
                pagesize: params.pagesize,
                status: '2,3'
            }
        }
    }
}
</script>

<style lang="scss">
.report-history-box {
    padding: 20px;
    box-sizing: border-box;
}
</style>