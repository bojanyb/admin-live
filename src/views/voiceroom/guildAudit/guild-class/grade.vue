<template>
    <div class="systemConfig-guild-class-box">
        <div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" :show-add="true" @onReset="reset" @onSearch="onSearch" @add="add"></SearchPanel>
        </div>

		<tableList :cfgs="cfgs" ref="tableList"></tableList>

        <!-- 新增 - 修改组件 -->
        <gradeComp v-if="isDestoryComp" ref="gradeComp" :type="'guildGrade'" @destoryComp="destoryComp" @getList="getList"></gradeComp>
    </div>
</template>

<script>
// 引入api
import { delSettlementConfig, getGuildType, guildRoomType } from '@/api/videoRoom.js'
// 引入新增 - 修改组件
import gradeComp from './components/gradeComp.vue'
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
        gradeComp
    },
    computed: {
        forms() {
            return [
                {
                    name: 'name',
                    type: 'input',
                    value: null,
                    keyName: 'value',
                    optionLabel: 'name',
                    label: '公会等级',
                    placeholder: '公会等级',
                },
                {
                  name: 'guild_type',
                  type: 'select',
                  value: '',
                  keyName: 'value',
                  optionLabel: 'name',
                  label: '公会类型',
                  placeholder: '请选择',
                  clearable: true,
                  linkage: true,
                  options: this.guildTypeList,
                  handler: {
                      change: (val) => {
                          this.getGenreList({ belong: val })
                          this.searchParams.room_type = ''
                      }
                  }
                },
                {
                  name: 'room_type',
                  type: 'select',
                  value: '',
                  keyName: 'value',
                  optionLabel: 'name',
                  label: '房间类型',
                  placeholder: '请选择',
                  clearable: true,
                  options: this.roomTypeList
                },
            ]
        },
        cfgs() {
            return {
                vm: this,
                url: REQUEST.guild.settlementConfig,
                columns: [
                    {
						label: '公会类型',
						render: (h, params) => {
						let data = MAPDATA.GUILDCONFIGTYPELIST.find(item => { return item.value === params.row.guild_type })
						return h('span', data ? data.name : '无')
						}
					},
                    {
                        label: '公会等级',
                        render: (h, params) => {
                            return h('span', params.row.name)
                        }
                    },
                    {
                        label: '流水范围',
                        render: (h, params) => {
                            return h('span', params.row.start + '~' + params.row.end)
                        }
                    },
                    {
                        label: '周返点比例',
                        render: (h, params) => {
							return h('span', params.row.rewards + '%')
						}
                    },
                    {
						label: '操作',
						minWidth: '120px',
						render: (h, params) => {
							return h('div', [
								h('el-button', { props: { type: 'primary'}, on: {click:()=>{this.update(params.row)}}}, '修改'),
                                h('el-button', { props: { type: 'danger'}, on: {click:()=>{this.deleteParams(params.row.id, 1)}}}, '删除')
							])
						}
					}
                ]
            }
        }
    },
    data() {
        return {
            isDestoryComp: false, // 是否销毁组件
            guildTypeList: [], // 公会类型
            roomTypeList: [] // 房间类型
        };
    },
    created() {
        this.getTypeList()
        this.getGenreList()
    },
    methods: {
        // 配置参数
        beforeSearch(params) {
            let s = { ...this.searchParams }
            return {
                page: params.page,
                pagesize: params.size,
                name: s.name,
                type: 1,
                guild_type: s.guild_type,
                room_type : s.room_type
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
        // 添加
        add() {
            this.load('add')
        },
        // 修改
        update(row) {
            this.load('update', row)
        },
        load(status, row) {
            this.isDestoryComp = true
            setTimeout(() => {
                this.$refs.gradeComp.loadParams(status, row)
            }, 50);
        },
        // 销毁组件
        destoryComp() {
            this.isDestoryComp = false
        },
        // 删除公会等级配置
        async deleteParams(id) {
            this.$confirm('确认删除当前公会等级配置吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                let res = await delSettlementConfig({ id: id })
                if(res.code === 2000) {
                    this.$success('删除成功')
                    this.getList()
                }
            }).catch(() => {});
        },
        // 获取公会类型
        async getTypeList() {
         const response = await getGuildType()
         if(response.code === 2000) {
            const tempArr =  Array.from(
              Array.isArray(response.data.list) ? response.data.list : []
          )
          this.guildTypeList = tempArr.reduce((prev, curr) => {
            prev.push({
                name: curr.remark,
                value: curr.type
            })
            return prev
          }, []) || []
         }
        },
        // 获取房间类型
        async getGenreList(params){
          const response = await guildRoomType(params)
          if(response.code == 2000){
            const tempArr = Array.from(
              Array.isArray(response.data.list) ? response.data.list : []
            )
            this.roomTypeList = tempArr.reduce((prev, curr) => {
              prev.push({
                name: curr.name,
                value: curr.id
              })
              return prev
            }, []) || []
          }
        }
        }
}
</script>

<style lang="scss">
</style>
