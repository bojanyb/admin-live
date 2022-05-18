<template>
    <div class="invite-join-us">
        <div class="searchParams">
            <SearchPanel :search-params="searchParams" :forms="forms" :show-search-btn="true" @onSearch="onSearch"></SearchPanel>
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
export default {
    data() {
		return {
            searchParams : {},
        }
	},
    components: {
        tableList,
        SearchPanel
    },
    computed: {
        forms() {
             return [
                {
                    name: 'user_number',
                    type: 'input',
                    value: '',
                    label: '用户ID',
                    placeholder: '',
                    handler: {
                        enter: (v) => {
                            // this.searchParams.user_number = v.user_number.trim()
                            // this.getList()
                        }
                    }
                },
                {
                    name: 'user_number',
                    type: 'input',
                    value: '',
                    label: '礼物ID',
                    placeholder: '',
                    handler: {
                        enter: (v) => {
                            // this.searchParams.user_number = v.user_number.trim()
                            // this.getList()
                        }
                    }
                },
                {
                    name: 'user_number',
                    type: 'input',
                    value: '',
                    label: '交易流水号',
                    placeholder: '',
                    handler: {
                        enter: (v) => {
                            // this.searchParams.user_number = v.user_number.trim()
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
                isShowIndex: true,
                columns: [
                    {
                        label: '用户ID',
                        render: (h, row) => {
                            return '111'
                        }
                    },
                    {
                        label: '参与时间',
                        render: (h, row) => {
                            return '111'
                        }
                    },
                    {
                        label: '礼物ID',
                        render: (h, row) => {
                            return '111'
                        }
                    },
                    {
                        label: '礼物名称',
                        render: (h, row) => {
                            return '111'
                        }
                    },
                    {
                        label: '礼物数量',
                        render: (h, row) => {
                            return '111'
                        }
                    },
                    {
                        label: '礼物价值',
                        render: (h, row) => {
                            return '111'
                        }
                    },
                    {
                        label: '交易流水',
                        render: (h, row) => {
                            return '111'
                        }
                    }
                ]
            }
        }
    },
    created(){
    },
    methods:{
        onSearch(){
            console.log("记录搜索");
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