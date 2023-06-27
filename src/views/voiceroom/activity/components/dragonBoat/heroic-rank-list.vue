<template>
	<div class="page-container">
		<tableList :cfgs="cfgs" ref="tableList" :isHidePage="true"></tableList>
	</div>
</template>

<script>
// 引入列表组件
import tableList from '@/components/tableList/TableList.vue'
// 引入api
import REQUEST from '@/request/index.js'
// 引入公共参数
import mixins from '@/utils/mixins.js'

export default {
	mixins: [mixins],
	components: {
		tableList
	},
	data() {
		return {
            dateTimeParams: {},
		}
	},
	computed: {
		cfgs() {
			return {
				vm: this,
				url: REQUEST.dragonBoat.getRanking,
				columns: [
					{
						label: '排名',
                        width: "100px",
                        prop: 'ranking'
					},
					{
                        label: '用户ID',
                        prop: 'user_number'
                    },
                    {
                        label: '用户昵称',
                        prop: 'nickname',
                    },
                    {
                        label: '礼物总价值',
                        prop: 'value',
                    }
				]
			}
		}
	},
	mounted() {},
	methods: {
		// 配置参数
		beforeSearch(params) {
			let s = { ...this.dateTimeParams }
            return {
                page: params.page,
                pagesize: params.size,
                type: 2 // 1=浓情榜，2=壕情榜
            }
		},
		// 查询
		onSearch() {
			this.getList()
		},
	}
}
</script>
<style lang="scss" scoped>
.el-icon-circle-close {
	color: #FFFFFF;
}

::v-deep .share-table-list-box .el-table__body-wrapper::-webkit-scrollbar {
    width: 5px;
    background-color: #F5F5F5;
}
::v-deep .share-table-list-box .el-table__body-wrapper::-webkit-scrollbar-thumb {
    border-radius:5px;
    background:rgba(0,0,0,0.1);
    -webkit-box-shadow:inset006pxrgba(0,0,0,0.5);
}
</style>



