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
                party_status: 2,
                // admin_recommend_status: -1
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
                    label: '房间ID',
                    isNum: true,
                    placeholder: '请输入房间ID'
                },
                // {
                //     name: 'guild_number',
                //     type: 'input',
                //     value: '',
                //     label: '公会ID',
                //     isNum: true,
                //     placeholder: '请输入公会ID'
                // },
                {
                    name: 'room_category_id',
                    type: 'select',
                    value: '',
                    keyName: 'id',
                    optionLabel: 'name',
                    label: '房间类型',
                    placeholder: '请选择',
                    options: this.classifyList
                },
                // {
                //     name: 'admin_recommend_status',
                //     type: 'select',
                //     value: -1,
                //     keyName: 'value',
                //     optionLabel: 'name',
                //     label: '热门推荐',
                //     placeholder: '请选择',
                //     options: MAPDATA.HOUSEMESSAGEHOTRECOMMENDLIST
                // }
            ]
        },
        cfgs() {
            return {
                vm: this,
                url: REQUEST.accompany.roomShouList,
                columns: [
                    {
                        label: '房间',
                        minWidth: '100px',
                        render: (h, params) => {
                            return h('div', [
                                h('div', params.row.room_title || '无'),
                                h('div', params.row.room_number || '无'),
                            ])
                        }
                    },
                    {
                        label: '房间封面',
                        isimg: true,
                        prop: 'room_cover',
                        imgHeight: '50px',
                        minWidth: '100px'
                    },
                    {
                        label: '房间类型',
                        minWidth: '100px',
                        render: (h, params) => {
                            return h('span', params.row.room_category_name || '无')
                        }
                    },
                    // {
                    //     label: '所属公会',
                    //     minWidth: '100px',
                    //     render: (h, params) => {
                    //         return h('div', [
                    //             h('div', params.row.guild_name),
                    //             h('div', params.row.guild_number || '无'),
                    //         ])
                    //     }
                    // },
                    // {
                    //     minWidth: '100px',
                    //     label: '热门推荐',
                    //     prop: 'admin_recommend_status',
                    //     isSwitch: true,
                    //     isTrueValue: 1,
                    //     isFalseValue: 0,
                    //     activeText: 'ON',
                    //     inactiveText: 'OFF',
                    //     change: (v, row) => {
                    //         this.hotRecommend(row, v)
                    //     },
                    //     render: (h, params) => {
                    //         return h('span', '')
                    //     }
                    // },
                    {
                        label: '操作',
                        minWidth: '180px',
                        fixed: 'right',
                        render: (h, params) => {
                            return h('div', [
                                // h('el-button', { props: { type: 'primary', disabled: !params.row.guild_number }, on: {click:()=>{this.setHouseClassify(params.row)}}}, '修改房间类型'),
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
                party_status: s.party_status,
                room_category_id: s.room_category_id,
                guild_number: s.guild_number,
            }
            // if(s.admin_recommend_status > -1){
            //     data.admin_recommend_status = s.admin_recommend_status
            // }
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
                party_status: 2,
                // admin_recommend_status: -1
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
            let res = await genreList({ belong: 2 })
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
        // 热门推荐
        async hotRecommend(row, v) {
            let params = {
                room_title: row.room_title,
                id: row.id,
                room_cover: row.room_cover,
                room_category_id: row.room_category_id,
                room_notice: row.room_notice,
                // admin_recommend_status: v
            }
            let res = await updateParty(params)
            if(res.code === 2000) {
                this.$success('操作成功')
                this.getList()
            }
        }
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
