<template>
    <div class="roomConfig-roomMessage-box">
        <div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset" @onSearch="onSearch"></SearchPanel>
        </div>

		<tableList :cfgs="cfgs" ref="tableList"></tableList>

        <!-- 引入新增 - 修改组件 -->
        <roomComp v-if="isDestoryComp" ref="roomComp" @destoryComp="destoryComp" @getList="getList"></roomComp>

        <!-- 房间类型详情组件 -->
        <typeComp v-if="isDestoryComp" ref="typeComp" @destoryComp="destoryComp" @getList="getList"></typeComp>
    </div>
</template>

<script>
// 引入api
import { genreList } from '@/api/house.js'
import { updateParty } from '@/api/house.js'
// 引入房间类型详情组件
import typeComp from './components/typeNewComp.vue'
// 引入新增 - 修改组件
import roomComp from './components/roomComp.vue'
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
        typeComp,
        roomComp
    },
    data() {
        return {
            isDestoryComp: false, // 是否销毁组件
            classifyList: [],
            searchParams: {
                room_number: '',
                guild_number: '',
                room_category_id: null
            }
        };
    },
    computed: {
        forms() {
            return [
                {
                    name: 'room_number',
                    type: 'input',
                    value: '',
                    label: '主播ID',
                    isNum: true,
                    placeholder: '请输入房间ID'
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
                    name: 'room_category_id',
                    type: 'select',
                    value: '',
                    keyName: 'id',
                    optionLabel: 'name',
                    label: '主播类型',
                    placeholder: '请选择',
                    options: this.classifyList
                },
            ]
        },
        cfgs() {
            return {
                vm: this,
                url: REQUEST.live.anchorRoomList,
                columns: [
                    {
                        label: '直播间ID',
                        minWidth: '100px',
                        render: (h, params) => {
                            return h('div', [
                                h('div', params.row.room_number || '无'),
                            ])
                        }
                    },
                    {
                        label: '直播间标题',
                        minWidth: '100px',
                        render: (h, params) => {
                            return h('div', [
                                h('div', params.row.room_title || '无'),
                            ])
                        }
                    },
                    {
                        label: '直播间封面',
                        isimg: true,
                        prop: 'room_cover',
                        imgHeight: '50px',
                        minWidth: '100px'
                    },
                    {
                        label: '主播ID',
                        minWidth: '100px',
                        render: (h, params) => {
                            return h('div', [
                                h('div', params.row.room_number || '无'),
                            ])
                        }
                    },
                    {
                        label: '主播昵称',
                        minWidth: '100px',
                        render: (h, params) => {
                            return h('div', [
                                h('div', params.row.nickname || '无'),
                            ])
                        }
                    },
                    {
                        label: '直播间类型',
                        minWidth: '100px',
                        render: (h, params) => {
                            return h('span', params.row.room_category_name || '无')
                        }
                    },
                    {
                        label: '所属公会',
                        minWidth: '100px',
                        render: (h, params) => {
                            return h('div', [
                                h('div', params.row.guild_name),
                                h('div', params.row.guild_number || '无'),
                            ])
                        }
                    },
                    {
                        label: '操作',
                        minWidth: '180px',
                        fixed: 'right',
                        render: (h, params) => {
                            return h('div', [
                                h('el-button', { props: { type: 'primary', disabled: !params.row.guild_number }, on: {click:()=>{this.setHouseClassify(params.row)}}}, '设置直播类型'),
                                h('el-button', { props: { type: 'primary'}, on: {click:()=>{this.update(params.row)}}}, '修改')
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
            let data = {
                room_number: s.room_number,
                guild_number: s.guild_number,
                room_category_id: s.room_category_id,
            }
            return {
                page: params.page,
                pagesize: params.size,
                ...data
            }
        },
        // 刷新列表
        getList() {
            this.$refs.tableList.getData()
        },
        // 重置
        reset() {
            this.searchParams = {
                room_number: '',
                guild_number: '',
                room_category_id: null

            }
            this.getList()
        },
        // 查询
        onSearch() {
            this.getList()
        },
        // 修改
        update(row) {
            this.load('update', row)
        },
        load(status, row) {
            this.isDestoryComp = true
            setTimeout(() => {
                this.$refs.roomComp.loadParams(status, row, this.classifyList)
            }, 50);
        },
        // 销毁组件
        destoryComp() {
            this.isDestoryComp = false
        },
        // 获取房间分类
        async getHouse() {
            let res = await genreList({ belong: 1 })
            if(res.data.list && res.data.list.length > 0) {
                res.data.list.unshift({
                    name: '全部',
                    id: ''
                })
            }
            this.classifyList = res.data.list || []
        },
        // 设置房间分类
        setHouseClassify(row) {
            this.isDestoryComp = true
            setTimeout(() => {
                this.$refs.typeComp.loadParams(row, this.classifyList)
            }, 50);
        },
    },
    created() {
        this.getHouse()
    }
}
</script>

<style lang="scss">
.roomConfig-roomMessage-box {
    padding: 20px 20px 20px 20px;
    box-sizing: border-box;
}
</style>
