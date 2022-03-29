<template>
	<div class="app-container">

		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
				<el-form-item>
					<el-button type="success" @click="handleRoomName">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<el-table ref="multipleTable" v-loading="listLoading" :data="list" element-loading-text="拼命加载中" border fit
			highlight-current-row>
			<el-table-column label="添加时间" prop="create_timeText" align="center" />
			<el-table-column label="类型" align="center" prop="room_genre_id">
				<template slot-scope="scope">
					<div v-if="scope.row.room_genre_id == 1">游戏</div>
					<div v-if="scope.row.room_genre_id == 2">点唱</div>
					<div v-if="scope.row.room_genre_id == 3">情感</div>
					<div v-if="scope.row.room_genre_id == 4">闲聊</div>
				</template>
			</el-table-column>
			<el-table-column label="房间名称" prop="name" align="center" show-overflow-tooltip />
			<el-table-column align="center" label="操作">
				<template slot-scope="scope">
					<el-button type="primary" @click="handleChange(scope.row)">修改</el-button>
					<el-button type="danger" @click="handleDel(scope.row)">删除</el-button>
				</template>
			</el-table-column>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<pagination v-show="total>0" :total="total" :page.sync="page.page" :limit.sync="page.limit"
			@pagination="roomNameList" />

		<el-dialog :title="editTitle" :visible.sync="editPop">
			<el-form :model="popForm">
				<el-form-item label="房间类型" :label-width="formLabelWidth">
					<el-select v-model="popForm.room_genre_id" placeholder="请选择">
						<el-option v-for="item in roomTypeList" :key="item.value" :label="item.label"
							:value="item.value" />
					</el-select>
				</el-form-item>
				<el-form-item label="房间名称" :label-width="formLabelWidth">
					<el-input v-model="popForm.name" style="width: 300px;" maxlength="16" placeholder="请输入房间名称"
						clearable autocomplete="off" />
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button :loading="loading" :type="isDisabled == true ? 'info' : 'primary'" :disabled="isDisabled"
					@click="handleSubmit">确 定</el-button>
			</div>
		</el-dialog>

	</div>
</template>

<script>
	import {
		getLiveRoomList,
		getLiveCreate,
		getLiveUpdate,
		getLiveDelete
	} from '@/api/videoRoom'
	import Pagination from '@/components/Pagination'
	import moment from 'moment'
	export default {
		name: 'RoomList',
		components: {
			Pagination
		},
		data() {
			return {
				list: [],
				loading: false,
				listLoading: true,
				total: 0,
				multipleSelection: [],
				page: {
					page: 1,
					limit: 10
				},
				editTitle: "新增",
				editPop: false,
				formLabelWidth: '120px',
				roomTypeList: [{
						'label': '游戏',
						'value': 1
					},
					{
						'label': '点唱',
						'value': 2
					},
					{
						'label': '情感',
						'value': 3
					},
					{
						'label': '闲聊',
						'value': 4
					},
				],
				popForm: {
					"id": "",
					"room_genre_id": "",
					"name": ""
				},
				isDisabled: true
			}
		},
		created() {
			this.roomNameList()
		},
		watch: {
			"popForm.name": {
				handler(newValue) {
					if (newValue.length > 0) {
						this.isDisabled = false
					} else {
						this.isDisabled = true
					}
				},
				deep: true
			}
		},
		methods: {
			// 房间名称列表
			roomNameList() {
				this.listLoading = true
				var params = {
					'page': this.page.page,
					'pagesize': this.page.limit
				}
				getLiveRoomList(params).then(response => {
					this.total = response.data.count
					this.list = response.data.list
					this.list.map(function(item) {
						item.create_timeText = moment(item.create_time * 1000).format(
							'YYYY-MM-DD HH:mm:ss')
					})
					this.listLoading = false
				}).catch(err => {
					this.listLoading = false
				})
			},
			handleRoomName() {
				this.editTitle = "新增";
				this.popForm.id = "";
				this.popForm.room_genre_id = "";
				this.popForm.name = "";
				this.editPop = true;
			},

			handleChange(row) {
				this.editTitle = "修改";
				this.popForm.id = row.id;
				this.popForm.room_genre_id = row.room_genre_id;
				this.popForm.name = row.name;
				this.editPop = true;
			},
			handleDel(row) {
				this.$alert("确定删除当前房间名称吗?", '提示', {
					confirmButtonText: '确定',
					callback: action => {
						if (action == 'confirm') {
							let params = {
								"id": row.id
							}
							getLiveDelete(params).then(res => {
								this.$message.success("删除成功");
								this.roomNameList();
							}).catch(err => {
								this.$message.error(err)
							})
						}
					}
				})
			},
			handleSubmit() {
				if (this.editTitle == "新增") {
					let params = {
						"name": this.popForm.name,
						"room_genre_id": this.popForm.room_genre_id,
					}
					getLiveCreate(params).then(res => {
						this.$message.success("新增成功");
						this.roomNameList();
					}).catch(err => {
						this.$message.error(err)
					})
				} else if (this.editTitle == "修改") {
					let params = {
						"id": this.popForm.id,
						"name": this.popForm.name,
						"room_genre_id": this.popForm.room_genre_id,
					}
					getLiveUpdate(params).then(res => {
						this.$message.success("修改成功");
						this.roomNameList();
					}).catch(err => {
						this.$message.error(err)
					})
				}
				this.editPop = false;
			}
		}
	}
</script>
<style lang="scss" scoped="scoped">
	.el-form-item {
		// margin-bottom: initial;
	}

	.pagination-container {
		margin-top: initial;
	}

	.colorNormal {
		color: #67C23A;
	}

	.colorDel {
		color: #F56C6C;
	}
</style>
