<template>
    <div class="serviceConfig-message-history-box">
        <div class="searchParams">
            <SearchPanel v-model="searchParams"
            :forms="forms"
            :show-search-btn="true"
            :show-reset="true"
            :showYesterday="true"
            :showBeforeYesterday="true"
            :showToday="true"
            :showBatchPass="true"
            :showBatchRurn="true"
            :batchFuncName = "'一键通过'"
            :batchRurnName = "'一键拒绝'"
            @onSearch="onSearch"
            @onReset="reset"
            @yesterday="yesterday"
            @beforeYesterday="beforeYesterday"
            @today="today"
            @batchPass="batchPass"
            @BatchRurn="BatchRurn"
            >
            </SearchPanel>
        </div>

		<tableList :cfgs="cfgs" ref="tableList"  @selectionChange="selectionChange"></tableList>
    </div>
</template>

<script>
// 引入api
import { review } from '@/api/risk.js'
// 引入菜单组件
import SearchPanel from '@/components/SearchPanel/final.vue'
// 引入列表组件
import tableList from '@/components/tableList/TableList.vue'
// 引入api
import REQUEST from '@/request/index.js'
// 引入公共方法
import { timeFormat } from '@/utils/common.js'
// 引入公共参数
import mixins from '@/utils/mixins.js'
// 引入公共map
import MAPDATA from '@/utils/jsonMap.js'
export default {
    mixins: [mixins],
    components: {
        SearchPanel,
        tableList
    },
    data() {
        return {
            searchParams: {
                dateTimeParams: [],
                rel_type: 4,
                status: 2
            },
            dateTimeParams: {
                start_time: null,
                end_time: null
            },
            selectList : [],
        };
    },
    computed: {
        forms() {
            return [
                {
                    name: 'inputSelect',
                    value: '',
                    selectName: 'iSelect',
                    type: 'inputSelect',
                    placeholder: '请输入',
                    selectPlaceholder: '请选择',
                    selctValue: 'user_id',
                    selectWidth: '130px',
                    label: '',
                    handler: {
                        change: (v) => {}
                    },
                    options: [
                        { key: 'user_id', label: '用户ID' },
                        { key: 'room_id', label: '房间ID' }
                    ]
                },
                {
                    name: 'rel_type',
                    type: 'select',
                    value: 4,
                    keyName: 'value',
                    optionLabel: 'name',
                    label: '图片类型',
                    placeholder: '请选择',
                    options: MAPDATA.RISKMANAGEMENTIMGTYPELIST
                },
                {
                    name: 'status',
                    type: 'select',
                    value: 2,
                    keyName: 'value',
                    optionLabel: 'name',
                    label: '审核状态',
                    placeholder: '请选择',
                    options: MAPDATA.RISKMANAGEMENTIMGSTATUSLIST
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
                isShowCheckbox: true,
                url: REQUEST.risk.screenImgLog,
                columns: [
                    {
                        label: '时间',
                        render: (h, params) => {
                            return h('span', params.row.create_time || '无')
                        }
                    },
                    {
                        label: '用户ID',
                        render: (h, params) => {
                            return h('div', params.row.user_number || '无')
                        }
                    },
                    {
                        label: '用户昵称',
                        render: (h, params) => {
                            return h('div', params.row.user_nickname || '无')
                        }
                    },
                    {
                        label: '房间ID',
                        render: (h, params) => {
                            return h('div', params.row.room_number || '无')
                        }
                    },
                    {
                        label: '图片类型',
                        render: (h, params) => {
                            let data = MAPDATA.RISKMANAGEMENTIMGTYPELIST.find(item => { return item.value === params.row.rel_type })
                            return h('div', data ? data.name : '无')
                        }
                    },
                    {
                        label: '图片',
                        isimgList: true,
                        prop: 'img_path',
                        type: 1,
                        imgWidth: '50px',
                        imgHeight: '50px',
                        minWidth: '150px'
                    },
                    {
                        label: '审核状态',
                        render: (h, params) => {
                            let data = MAPDATA.RISKMANAGEMENTIMGSTATUSLIST.find(item => { return item.value === params.row.status })
                            return h('div', data ? data.name : '无')
                        }
                    },
                    {
                        label: '操作',
                        render: (h, params) => {
                            return h('div', [
                                h('el-button', { props: { type: 'primary'}, style: {
                                    display: params.row.status === 0 ? 'unset' : 'none'
                                }, on: {click:()=>{this.func(params.row.id, 1, '通过')}}}, '通过'),
                                h('el-button', { props: { type: 'danger'}, style: {
                                    display: params.row.status === 0 ? 'unset' : 'none'
                                }, on: {click:()=>{this.func(params.row.id, -1, '拒绝')}}}, '拒绝'),
                                h('el-button', { props: { type: 'success'}, style: {
                                    display: params.row.status === 1 ? 'unset' : 'none'
                                }, on: {click:()=>{}}}, '已通过'),
                                h('el-button', { props: { type: 'danger'}, style: {
                                    display: params.row.status === -1 ? 'unset' : 'none'
                                }, on: {click:()=>{}}}, '已拒绝'),
                            ])
                        }
                    }
                ]
            }
        }
    },
    methods: {
        // 今日
        today() {
            this.changeIndex(0)
            this.getList()
        },
        // 昨日
        yesterday() {
            this.changeIndex(1)
            this.getList()
        },
        // 最近七日
        beforeYesterday() {
            this.changeIndex(2)
            this.getList()
        },
        // 更改日期
        changeIndex(index) {
            let date = new Date()
            let now, now1, start, end;
            switch (index) {
                case 0:
                    now1 = timeFormat(date, 'YYYY-MM-DD', false)
                    now = timeFormat(date, 'YYYY-MM-DD', false)
                    break;
                case 1:
                    now1 = timeFormat(date - 3600 * 1000 * 24 * 1, 'YYYY-MM-DD', false)
                    now = timeFormat(date - 3600 * 1000 * 24 * 1, 'YYYY-MM-DD', false)
                    break;
                case 2:
                    now1 = timeFormat(date - 3600 * 1000 * 24 * 2, 'YYYY-MM-DD', false)
                    now = timeFormat(date - 3600 * 1000 * 24 * 2, 'YYYY-MM-DD', false)
                    break;
            }
            start = new Date(now + ' 00:00:00')
            end = new Date(now1 + ' 23:59:59')

            let time = [start.getTime(), end.getTime()]
            this.searchParams.dateTimeParams = time
            this.dateTimeParams.start_time = time[0]
            this.dateTimeParams.end_time = time[1]
        },
        // 配置参数
        beforeSearch(params) {
            let s = { ...this.searchParams, ...this.dateTimeParams }
            let data = {
                page: params.page,
                pagesize: params.size,
                start_time: s.start_time ? Math.floor(s.start_time / 1000) : '',
                end_time: s.end_time ? Math.floor(s.end_time / 1000) : '',
                status: s.status,
                rel_type: s.rel_type
            }
            if(s.iSelect === 'user_id') {
                data.user_number = s.inputSelect
            } else if(s.iSelect === 'room_id') {
                data.room_number = s.inputSelect
            }
            return data
        },
        // 刷新列表
        getList() {
            if(this.$refs.tableList) {
                this.$refs.tableList.getData()
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
            this.searchParams = {
                rel_type: 4,
                status: 2
            }
            this.dateTimeParams = {}
            this.changeIndex(0)
            this.getList()
        },
        // 查询
        onSearch() {
            this.getList()
        },
        // 销毁组件
        destoryComp() {
            this.isDestoryComp = false
        },
        // 通过/拒绝操作
        async func(id, status, name) {
            this.$confirm(`是否确认${name}?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                let params = {
                    id,
                    status
                }
                let res = await review(params)
                console.log(res, 'res-----------2020')
                if(res.code === 2000) {
                    this.$success(name + '成功')
                    this.getList()
                }
            }).catch(() => {});
        },
        // 选中
        selectionChange(v){
          this.selectList = v;
        },
        // 一键通过
        batchPass(){
          console.log("一键通过");
        },
        // 一键拒绝
        BatchRurn(){
          console.log("一键拒绝");
        },
    },
    created() {
        this.changeIndex(0)
    }
}
</script>

<style lang="scss">
.serviceConfig-message-history-box {
    padding: 20px;
    box-sizing: border-box;
}
</style>