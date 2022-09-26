<template>
    <div class="roomConfig-roomMessage-box">
        <menuComp ref="menuComp" :menuList="menuList" v-model="tabIndex"></menuComp>
        <div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset" @onSearch="onSearch"></SearchPanel>
        </div>

		<tableList :cfgs="cfgs" ref="tableList"></tableList>

        <!-- 引入新增组件 -->
        <roomComp v-if="isDestoryComp" ref="roomComp" @destoryComp="destoryComp" @getList="getList"></roomComp>

        <!-- 房间类型详情组件 -->
        <typeComp v-if="isDestoryComp" ref="typeComp" @destoryComp="destoryComp" @getList="getList"></typeComp>
    </div>
</template>

<script>
// 引入api
import { updateParty, genreList, endLive } from '@/api/house.js'
// 引入新增组件
import roomComp from './components/roomComp.vue'
// 引入房间类型详情组件
import typeComp from './components/typeComp.vue'
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
        roomComp,
        typeComp
    },
    data() {
        return {
            isDestoryComp: false, // 是否销毁组件
            tabIndex: '0',
            menuList: [
                {
                    name: '派对间'
                }
                // {
                //     name: '直播间'
                // }
            ],
            classifyList: [],
            searchParams: {
                is_guild_room: 1,
                party_status: 2,
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
                },
                {
                    name: 'guild_number',
                    type: 'input',
                    value: '',
                    label: '公会ID',
                    isNum: true,
                    placeholder: '请输入公会ID'
                }
            ]
            let arr2 = [
                {
                    name: 'type',
                    type: 'select',
                    value: null,
                    keyName: 'id',
                    optionLabel: 'name',
                    label: '房间类型',
                    placeholder: '请选择',
                    options: this.classifyList
                },
                {
                    name: 'party_status',
                    type: 'select',
                    value: 2,
                    keyName: 'value',
                    optionLabel: 'name',
                    label: '房间状态',
                    placeholder: '请选择',
                    options: MAPDATA.HOUSEMESSAGESTATUSLIST
                }
            ]
            let arr3 = [
                {
                    name: 'type',
                    type: 'select',
                    value: null,
                    keyName: 'id',
                    optionLabel: 'name',
                    label: '房间类型',
                    placeholder: '请选择',
                    options: this.classifyList
                } 
            ]
            let array = []
            switch (this.tabIndex) {
                case '0':
                    array = [...arr, ...arr2]
                    break;
                case '1':
                    array = [...arr, ...arr3]
                    break;
            }
            return array
        },
        cfgs() {
            let arr = [
                {
                    label: '房间ID',
                    prop: 'room_number',
                    minWidth: '100px'
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
                    imgHeight: '50px',
                    minWidth: '100px'
                },
                {
                    label: '房间标题',
                    minWidth: '100px',
                    prop: 'title',
                    render: (h, params) => {
                        return h('span', params.row.title || '无')
                    }
                },
                {
                    label: '房间类型',
                    minWidth: '100px',
                    render: (h, params) => {
                        let data = this.classifyList.find(item => { return item.id === params.row.type })
                        return h('span', data ? data.name : '无')
                    }
                },
                {
                    label: '房间状态',
                    minWidth: '100px',
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
                },
                {
                    label: '公会ID',
                    prop: 'guild_number',
                    minWidth: '100px',
                    render: (h, params) => {
                        return h('span', params.row.guild_number || '无')
                    }
                },
                {
                    label: '所属公会',
                    minWidth: '100px',
                    render: (h, params) => {
                        return h('span', params.row.guild_name || '无')
                    }
                },
                {
                    label: '房间分类',
                    prop: 'classify',
                    minWidth: '120px',
                    render: (h, params) => {
                        return h('span', {
                            style: {
                                color: '#55C090'
                            },
                            on: {
                                click: () => {
                                    this.setHouseClassify(params.row)
                                }
                            }
                        }, '设置房间分类')
                    }
                }
            ]
            let arr6 = [
                {
                    label: '操作',
                    minWidth: '180px',
                    fixed: 'right',
                    render: (h, params) => {
                        return h('div', [
                            h('el-button', { props: { type: 'primary'}, on: {click:()=>{this.update(params.row)}}}, '修改'),
                            h('el-button', { props: { type: 'danger'}, style: {
                                display: params.row.party_status === 1 ? 'unset' : 'none'
                            }, on: {click:()=>{this.closeLive(params.row)}}}, '关闭')
                        ])
                    }
                }
            ]
            let name, column;
            switch (this.tabIndex) {
                case '0':
                    name = 'partyList'
                    column = [...arr, ...arr4, ...arr6]
                    break;
                case '1':
                    name = 'partyList'
                    column = typeList
                    break;
            }
            return {
                vm: this,
                url: REQUEST.house[name],
                columns: column
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
                is_live: s.is_live,
                type: s.type,
                guild_number: s.guild_number
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
                party_status: 2,
                is_live: 1
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
        // 关播
        async closeLive(row) {
            let res = await endLive({ id: row.id })
            if(res.code === 2000) {
                this.$success('关播成功')
                this.getList()
            }
        },
        // 销毁组件
        destoryComp() {
            this.isDestoryComp = false
        },
        // 获取房间分类
        async getHouse() {
            let belong = this.tabIndex === '0' ? 2 : 1
            let res = await genreList({ belong: belong })
            this.classifyList = res.data.list || []
        },
        // 设置房间分类
        setHouseClassify(row) {
            this.isDestoryComp = true
            setTimeout(() => {
                this.$refs.typeComp.loadParams(row, this.classifyList)
            }, 50);
        }
    },
    created() {
        this.getHouse()
    }
}
</script>

<style lang="scss">
.roomConfig-roomMessage-box {
    padding: 10px 20px 20px 20px;
    box-sizing: border-box;
}
</style>