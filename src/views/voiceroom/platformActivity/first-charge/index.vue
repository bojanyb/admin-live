// 首充活动管理
<template>
    <div class="activity-first-charge-box">
        <menuComp ref="menuComp" :menuList="menuList" v-model="tabIndex"></menuComp>
        <el-button class="btnBox" type="success" v-if="tabIndex === '0' && list.length < 0" @click="add">新增</el-button>
        <div class="searchParams" v-if="tabIndex !== '0'">
            <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset" @onSearch="onSearch"></SearchPanel>
        </div>

		<tableList :cfgs="cfgs" ref="tableList" @rowClick="rowClick" @saleAmunt="saleAmunt"></tableList>

        <!-- 首充配置详情组件 -->
        <firstChangeComp v-if="isDestoryComp" ref="firstChangeComp" @destoryComp="destoryComp" @getList="getList"></firstChangeComp>

        <!-- 首充用户详情组件 -->
        <userComp v-if="isDestoryComp" ref="userComp" @destoryComp="destoryComp" @getList="getList"></userComp>
    </div>
</template>

<script>
// 获取api
import { getActivetyHasGiftList } from '@/api/videoRoom'
// 引入api
import { addFirstCharge } from '@/api/userActivity'
// 首充配置详情组件
import firstChangeComp from './components/firstChangeComp/index.vue'
// 首充用户详情组件
import userComp from './components/userComp/index.vue'
// 引入tab菜单组件
import menuComp from '@/components/menuComp/index.vue'
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
        tableList,
        menuComp,

        firstChangeComp,
        userComp
    },
    data() {
        return {
            isDestoryComp: false, // 是否销毁组件
            tabIndex: '0',
            menuList: [
                {
                    name: '首充配置'
                },
                {
                    name: '首充用户'
                }
            ],
            list: [] // 列表数据
        };
    },
    computed: {
        forms() {
            let arr2 = [
                {
                    name: 'room_number',
                    type: 'input',
                    value: '',
                    label: '用户ID',
                    isNum: true,
                    placeholder: '请输入用户ID'
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
            return this.tabIndex === '0' ? [] : arr2
        },
        cfgs() {
            let arr = [
                {
                    label: '活动名称',
                    prop: 'name'
                },
                {
                    label: '礼物种类数量',
                    prop: 'gift_count'
                },
                {
                    label: '投入',
                    prop: 'in'
                    // render: (h, params) => {
                    //     let data = MAPDATA.RISKSYSTEMROLELIST.find(item => { return item.value === params.row.user_role })
                    //     return h('span', data ? data.name : '无')
                    // }
                },
                {
                    label: '产出',
                    prop: 'out'
                },
                {
                    label: '首充设置金额',
                    prop: 'cost'
                },
                {
                    label: '活动状态',
                    render: (h, params) => {
                        let start = params.row.start_time * 1000
                        let end = params.row.end_time * 1000
                        let now = new Date().getTime()
                        if(start > now && end > now) {
                            return h('span',{style: {color: 'green'},}, '未开始')
                        } else if(start < now && end > now) {
                            return h('span',{style: {color: 'green'},}, '开始中')
                        }
                        if(end < now) {
                            return h('span',{style: {color: 'red'},}, '结束')
                        }
                    }
                },
                {
                    label: '开始时间',
                    render: (h, params) => {
                        return h('span', params.row.start_time ? timeFormat(params.row.start_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
                    }
                },
                {
                    label: '结束时间',
                    prop: 'room_number',
                    render: (h, params) => {
                        return h('span', params.row.end_time ? timeFormat(params.row.end_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
                    }
                },
                {
                    label: '操作',
                    render: (h, params) => {
                        return h('div', [
                            h('el-button', { props: { type: 'primary'}, on: {click:()=>{this.update(params.row)}}}, '修改'),
                            h('el-button', { props: { type: 'danger'}, on: {click:()=>{this.freeze(params.row)}}}, '冻结')
                        ])
                    }
                }
            ]
            let arr2 = [
                {
                    label: '首充时间',
                    render: (h, params) => {
                        return h('span', params.row.first_charge_time ? timeFormat(params.row.first_charge_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
                    }
                },
                {
                    label: '用户',
                    render: (h, params) => {
                        return h('div', [
                            h('div', params.row.nickname),
                            h('div', params.row.user_number)
                        ])
                    }
                },
                {
                    label: '性别',
                    render: (h, params) => {
                        let data = MAPDATA.SEXLIST.find(item => {
                            return item.value === params.row.sex
                        })
                        return h('span', data ? data.name : '无')
                    }
                },
                {
                    label: '注册时间',
                    render: (h, params) => {
                        return h('span', params.row.register_time ? timeFormat(params.row.register_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
                    }
                },
                {
                    label: '间隔时间',
                    prop: 'interval_time'
                },
            ]
            let arr3, name;
            if(this.tabIndex === '0') {
                arr3 = arr
                name = 'Activityins'
            } else {
                arr3 = arr2
                name = 'chargeLog'
            }
            return {
                vm: this,
                url: REQUEST.platformActivity[name],
                columns: arr3
            }
        }
    },
    methods: {
        // 配置参数
        beforeSearch(params) {
            let s = { ...this.searchParams, ...this.dateTimeParams }
            let data = {
                page: params.page,
                page_size: params.size,
                start_time: s.start_time ? Math.floor(s.start_time / 1000) : '',
                end_time: s.end_time ? Math.floor(s.end_time / 1000) : '',
                room_number: s.room_number,
                code: 'scpz'
            }
            if(this.tabIndex === '0') {
                delete data.start_time
                delete data.end_time
                delete data.room_number
            } else {
                delete data.code
            }
            return data
        },
        // 刷新列表
        getList() {
            this.$refs.tableList.getData()
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
        // 新增
        add() {
            this.load('add')
        },
        // 修改
        update(row) {
            this.load('update', row)
        },
        // 查看
        rowClick(row) {
            this.load('see', row)
        },
        load(status, row) {
            this.isDestoryComp = true
            setTimeout(() => {
                if(this.tabIndex === '0') {
                    this.$refs.firstChangeComp.loadParams(status, row)
                } else {
                    this.$refs.userComp.loadParams(status, row)
                }
            }, 50);
        },
        // 冻结
        async freeze(row) {
            let params = JSON.parse(JSON.stringify(row))
            let res = await getActivetyHasGiftList({ activity_id: params.id })
            params.end_time = Math.floor((new Date().getTime() - 1) / 1000)
            params.goods = res.data.goods || []
            params.gifts = res.data.gifts || []
            let data = await addFirstCharge(params)
            if(data.code === 2000) {
                this.$success('冻结成功')
                this.getList()
            }
        },
        // 查询
        onSearch() {
            this.getList()
        },
        // 销毁组件
        destoryComp() {
            this.isDestoryComp = false
        },
        // 列表返回
        saleAmunt(row) {
            this.list = row.list || []
        }
    }
}
</script>

<style lang="scss">
.activity-first-charge-box {
    padding: 10px 20px 20px 20px;
    box-sizing: border-box;
    .btnBox {
        margin-bottom: 20px;
    }
}
</style>