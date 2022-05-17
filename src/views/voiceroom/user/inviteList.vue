// 用户拉新记录
<template>
    <div class="invite-join-us">
        <div class="searchParams">
            <SearchPanel :search-params="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset" @onSearch="onSearch"></SearchPanel>
        </div>
        <div class="tableList">
            <tableList :cfgs="cfgs" ref="tableList"></tableList>
        </div>
    </div>
</template>

<script>
// 引入列表组件
import tableList from '@/components/tableList/TableList.vue'
// 引入菜单组件
import SearchPanel from '@/components/SearchPanel/final.vue'
// 引入map参数
import MAPDATA from '@/utils/jsonMap.js'

export default {
    components: {
        tableList,
        SearchPanel
    },
    computed: {
        forms() {
            return [
                {
                    name: 'parentCardName',
                    type: 'input',
                    value: '',
                    label: '拉新人ID',
                    placeholder: '',
                    handler: {
                        enter: (v) => {
                            // this.searchParams.parentCardName = v.parentCardName.trim()
                            // this.getList()
                        }
                    }
                },
                {
                    name: 'parentCardName',
                    type: 'input',
                    value: '',
                    label: 'IP地址',
                    placeholder: '',
                    handler: {
                        enter: (v) => {
                            // this.searchParams.parentCardName = v.parentCardName.trim()
                            // this.getList()
                        }
                    }
                },
                {
                    name: 'parentCardName',
                    type: 'input',
                    value: '',
                    label: '新注册用户ID',
                    placeholder: '',
                    handler: {
                        enter: (v) => {
                            // this.searchParams.parentCardName = v.parentCardName.trim()
                            // this.getList()
                        }
                    }
                },
                {
                    name: 'virtual',
                    type: 'select',
                    value: '',
                    keyName: 'value',
                    optionLabel: 'name',
                    label: '是否进入过派对',
                    placeholder: '全部',
                    options: MAPDATA.USERINVITE,
                    handler: {
                        change: (v) => {
                            // this.searchParams.virtual = v
                            // this.getList()
                        }
                    }
                },
                {
                    name: 'parentCardName',
                    type: 'input',
                    value: '',
                    label: '筛选日期内总新用户充值金额',
                    placeholder: '',
                    handler: {
                        enter: (v) => {
                            // this.searchParams.parentCardName = v.parentCardName.trim()
                            // this.getList()
                        }
                    }
                },
                {
                    name: 'parentCardName',
                    type: 'input',
                    value: '',
                    label: '筛选日期内总新用户注册人数',
                    placeholder: '',
                    handler: {
                        enter: (v) => {
                            // this.searchParams.parentCardName = v.parentCardName.trim()
                            // this.getList()
                        }
                    }
                },
                {
                    name: 'parentCardName',
                    type: 'input',
                    value: '',
                    label: '设备识别码',
                    placeholder: '',
                    handler: {
                        enter: (v) => {
                            // this.searchParams.parentCardName = v.parentCardName.trim()
                            // this.getList()
                        }
                    }
                },
                {
                    name: 'virtual',
                    type: 'select',
                    value: '',
                    keyName: 'value',
                    optionLabel: 'name',
                    label: '下载渠道',
                    placeholder: '全部',
                    options: MAPDATA.DOWNLOADSOURCE,
                    handler: {
                        change: (v) => {
                            // this.searchParams.virtual = v
                            // this.getList()
                        }
                    }
                },
                {
                    name: 'dateTimeParams',
                    type: 'datePicker',
                    dateType: 'daterange',
                    format: "yyyy-MM-dd",
                    label: '时间选择',
                    value: '',
                    handler: {
                        change: v => {
                            // this.emptyDateTime()
                            // this.setDateTime(v)
                            // this.getList()
                        },
                        selectChange: (v, key) => {
                            // this.emptyDateTime()
                            // this.getList()
                        }
                    }
                }
            ]
        },
        cfgs() {
            return {
                vm: this,
                columns: [
                    {
                        label: '拉新人ID',
                        render: (h, row) => {
                            return '111'
                        }
                    },
                    {
                        label: '新注册用户昵称',
                        render: (h, row) => {
                            return '111'
                        }
                    },
                    {
                        label: '新注册用户ID',
                        render: (h, row) => {
                            return '111'
                        }
                    },
                    {
                        label: '新用户注册时间',
                        render: (h, row) => {
                            return '111'
                        }
                    },
                    {
                        label: '新用户充值',
                        render: (h, row) => {
                            return '111'
                        }
                    },
                    {
                        label: '设备识别码',
                        render: (h, row) => {
                            return '111'
                        }
                    },
                    {
                        label: '注册IP',
                        render: (h, row) => {
                            return '111'
                        }
                    },
                    {
                        label: '是否进入过派对',
                        render: (h, row) => {
                            return '111'
                        }
                    },
                    {
                        label: '下载渠道',
                        render: (h, row) => {
                            return '111'
                        }
                    },
                    {
                        label: '最后登录时间',
                        render: (h, row) => {
                            return '111'
                        }
                    }
                ]
            }
        }
    }
}
</script>

<style lang="scss">
.invite-join-us {
    padding: 20px;
    box-sizing: border-box;
}
</style>