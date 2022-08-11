<template>
    <div class="roomConfig-roomMessage-box">
        <menuComp ref="menuComp" :menuList="menuList" v-model="tabIndex"></menuComp>
        <div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset" @onSearch="onSearch"></SearchPanel>
        </div>

		<tableList :cfgs="cfgs" ref="tableList"></tableList>

        <!-- 引入新增组件 -->
        <roomComp v-if="isDestoryComp" ref="roomComp" @destoryComp="destoryComp" @getList="getList"></roomComp>
    </div>
</template>

<script>
// 引入api
import { updateParty } from '@/api/house.js'
// 引入新增组件
import roomComp from './components/roomComp.vue'
// 引入tab菜单组件
import menuComp from '@/components/menuComp/index.vue'
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
        menuComp,
        roomComp
    },
    data() {
        return {
            isDestoryComp: false, // 是否销毁组件
            tabIndex: '0',
            menuList: [
                {
                    name: '派对间'
                },
                {
                    name: '直播间'
                }
            ],
            searchParams: {
                is_guild_room: 1,
                party_status: 1,
                is_live: 1
            }
        };
    },
    computed: {
        forms() {
            let arr = [
                {
                    name: 'room_number',
                    type: 'input',
                    value: '',
                    label: '房间ID',
                    isNum: true,
                    placeholder: '请输入房间ID'
                }
            ]
            let arr2 = [
                {
                    name: 'is_guild_room',
                    type: 'select',
                    value: 1,
                    keyName: 'value',
                    optionLabel: 'name',
                    label: '房间类型',
                    placeholder: '请选择',
                    options: MAPDATA.HOUSEMESSAGETYPELIST
                },
                {
                    name: 'party_status',
                    type: 'select',
                    value: 1,
                    keyName: 'value',
                    optionLabel: 'name',
                    label: '房间状态',
                    placeholder: '请选择',
                    options: MAPDATA.HOUSEMESSAGESTATUSLIST
                }
            ]
            let arr3 = [
                {
                    name: 'is_live',
                    type: 'select',
                    value: 1,
                    keyName: 'value',
                    optionLabel: 'name',
                    label: '房间状态',
                    placeholder: '请选择',
                    options: MAPDATA.HOUSEMESSAGELIVELIST
                } 
            ]
            return this.tabIndex === '0' ? [...arr, ...arr2] : [...arr, ...arr3]
        },
        cfgs() {
            let arr = [
                {
                    label: '房间ID',
                    prop: 'room_number'
                },
                {
                    label: '房间标题',
                    prop: 'title'
                }
            ]
            let arr2 = [
                {
                    label: '房主',
                    render: (h, params) => {
                        return h('div', [
                            h('div', params.row.nickname),
                            h('div', params.row.user_number || '无')
                        ])
                    }
                }
            ]
            let arr3 = [
                {
                    label: '主播',
                    render: (h, params) => {
                        return h('div', [
                            h('div', params.row.nickname),
                            h('div', params.row.user_number || '无')
                        ])
                    }
                }
            ]
            let arr4 = [
                {
                    label: '房间封面',
                    isimg: true,
                    prop: 'cover',
                    // imgWidth: '50px',
                    imgHeight: '50px'
                },
                {
                    label: '房间分类',
                    render: (h, params) => {
                        let data = MAPDATA.HOUSEMESSAGECLASSIFYLIST.find(item => { return item.value === params.row.type })
                        return h('span', data ? data.name : '无')
                    }
                },
                {
                    label: '所属公会',
                    render: (h, params) => {
                        return h('span', params.row.guild_name || '无')
                    }
                },
                {
                    label: '房间状态',
                    render: (h, params) => {
                        let val, name;
                        if(this.tabIndex === '0') {
                            val = params.row.party_status
                            name = 'HOUSEMESSAGESTATUSLIST'
                        } else {
                            val = params.row.is_live
                            name = 'HOUSEMESSAGELIVELIST'
                        }
                        let data = MAPDATA[name].find(item => { return val === item.value })
                        return h('span', data ? data.name : '无')
                    }
                }
            ]
            let arr5 = [
                {
                    label: '操作',
                    render: (h, params) => {
                        return h('div', [
                            h('el-button', { props : { type: 'primary'}, on: {click:()=>{this.update(params.row)}}}, '修改')
                        ])
                    }
                }
            ]
            let arr6 = [
                {
                    label: '操作',
                    minWidth: '120px',
                    render: (h, params) => {
                        return h('div', [
                            h('el-button', { props : { type: 'primary'}, on: {click:()=>{this.update(params.row)}}}, '修改'),
                            h('el-button', { props : { type: 'danger'}, on: {click:()=>{this.closeLive(params.row)}}}, '关播')
                        ])
                    }
                }
            ]
            let name = this.tabIndex === '0' ? 'partyList' : 'liveList'
            return {
                vm: this,
                url: REQUEST.house[name],
                columns: this.tabIndex === '0' ? [...arr, ...arr2, ...arr4, ...arr5] : [...arr, ...arr3, ...arr4, ...arr6]
            }
        }
    },
    methods: {
        // 配置参数
        beforeSearch(params) {
            let s = { ...this.searchParams }
            let data = {
                room_number: s.room_number,
                is_guild_room: s.is_guild_room,
                party_status: s.party_status,
                is_live: s.is_live
            }
            if(this.tabIndex === '0') {
                delete data.is_live
            } else if(this.tabIndex === '1') {
                delete data.is_guild_room
                delete data.party_status
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
                is_guild_room: 1,
                party_status: 1,
                is_live: 1
            }
            this.getList()
        },
        // 查询
        onSearch() {
            this.getList()
        },
        // 新增
        update(row) {
            this.isDestoryComp = true
            setTimeout(() => {
                this.$refs.roomComp.loadParams(row)
            }, 50);
        },
        // 关播
        async closeLive(row) {
            let params = {
                id: row.id,
                title: row.title,
                cover: row.cover,
                back_recommend: 0,
                type: row.type
            }
            let res = await updateParty(params)
            if(res.code === 2000) {
                this.$message.success('关播成功')
                this.getList()
            }
        },
        // 销毁组件
        destoryComp() {
            this.isDestoryComp = false
        }
    }
}
</script>

<style lang="scss">
.roomConfig-roomMessage-box {
    padding: 10px 20px 20px 20px;
    box-sizing: border-box;
}
</style>