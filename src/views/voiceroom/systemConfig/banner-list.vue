<template>
	<div class="app-container">

		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters" @keyup.enter.native="getBannerList()">
				<el-form-item class="toolbarBtns">
					<el-button type="success" @click="handleGiftAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<el-table ref="multipleTable" v-loading="listLoading" :data="list" element-loading-text="拼命加载中" border fit
			highlight-current-row>
			<el-table-column label="序号" prop="sort" align="center" />
			<el-table-column label="banner标题" prop="title" align="center" show-overflow-tooltip />
			<el-table-column label="轮播顺序" prop="sort" align="center" />
			<el-table-column label="banner图片" prop="gift_genre" align="center">
				<template slot-scope="scope">
					<el-image style="width: 50px;max-height: 50px;border-radius: 5px;" :lazy="true"
						:src="scope.row.pic ? scope.row.pic : ''" :preview-src-list="bannerImglist"/>
				</template>
			</el-table-column>
			<el-table-column label="banner类型" prop="typeText" align="center" />
			<el-table-column label="更新时间" prop="update_timeText" align="center" />
			<el-table-column label="启用/禁用" prop="status" align="center">
				<template slot-scope="scope">
					<el-switch v-model="scope.row.statusText" @change="handleEnable(scope.row)" />
				</template>
			</el-table-column>
			<el-table-column label="操作" align="center" width="120">
				<template slot-scope="scope">
					<el-button type="primary" @click="handleEdit(scope.row)">修改
					</el-button>
				</template>
			</el-table-column>
		</el-table>


		<tableList :cfgs="cfgs" ref="tableList"></tableList>

		<!--工具条-->
		<!-- <pagination v-show="total>0" :total="total" :page.sync="page.page" :limit.sync="page.limit"
			@pagination="getBannerList" /> -->

		<el-dialog :close-on-click-modal="false" :title="editTitle" :visible.sync="editPop" @close="handleCancel">
			<el-form :model="popForm" ref="popForm" :rules="popFormRules">
				<el-form-item label="banner标题" prop="title" :label-width="formLabelWidth">
					<el-col :span="17">
						<el-input v-model="popForm.title" style="width: 335px;" placeholder="请输入banner标题" clearable
							autocomplete="off" />
					</el-col>
				</el-form-item>
				<el-form-item label="banner图片" prop="pic" :label-width="formLabelWidth">
					<el-col :span="17">
						<ossFile :picImg="imageUrl" @getUpLoadImg="getUpLoadImg"/>
					</el-col>
				</el-form-item>
				<el-form-item label="轮播顺序" prop="sort" :label-width="formLabelWidth">
					<el-col :span="17">
						<el-input v-model="popForm.sort" style="width: 335px;" placeholder="请输入轮播顺序" clearable
							autocomplete="off" />
					</el-col>
				</el-form-item>
				<el-form-item label="banner外部链接" prop="url" :label-width="formLabelWidth">
					<el-col :span="17">
						<el-input v-model="popForm.url" style="width: 335px;" placeholder="请输入banner外部链接" clearable
							autocomplete="off" />
					</el-col>
				</el-form-item>
				<el-form-item label="开始时间" prop="start_time" :rules="startTime" :label-width="formLabelWidth">
                    <el-date-picker
                    v-model="popForm.start_time"
                    value-format="timestamp"
                    type="datetime"
                    :picker-options="StartPicker"
                    placeholder="选择开始时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间" prop="end_time" :rules="endTime" :label-width="formLabelWidth">
                    <el-date-picker
                    v-model="popForm.end_time"
                    value-format="timestamp"
                    type="datetime"
                    :picker-options="EndPicker"
                    placeholder="选择结束时间">
                    </el-date-picker>
                </el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="handleCancel">取 消</el-button>
				<el-button :loading="loading" type="primary" @click="handleChange">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import {
		getBanner,
		getBannerChange,
		getBannerDel
	} from '@/api/videoRoom'
	import Pagination from '@/components/Pagination'
	import ossFile from '../components/ossFile.vue'
	import moment from 'moment'


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
		name: 'banner-list',
		mixins: [mixins],
		components: {
			Pagination,
			ossFile,


			tableList
		},
		data() {
			return {
				isDestoryComp: false, // 是否销毁组件


				list: [],
				listLoading: true,
				total: 0,
				filters: {
					'status': ''
				},
				page: {
					page: 1,
					limit: 10
				},
				showImgUrl: '',
				editTitle: '',
				editPop: false,
				loading: false,
				formLabelWidth: '130px',
				imageUrl: '',
				popForm: {
					'id': '',
					'title': '',
					'pic': '',
					'type': '',
					'status': '',
					'ps': '',
					'sort': '',
					'url': '',
					'type': 'Add',
					start_time: '',
					end_time: ''
				},
				popFormRules: {
					title: [{
						required: true,
						trigger: 'blur',
						validator: (rules, value, cb) => {
							if (!this.popForm.title) {
								return cb(new Error('banner标题不能为空!'))
							}
							return cb()
						}
					}],
					pic: [{
						required: true,
						trigger: 'change',
						validator: (rules, value, cb) => {
							if (!this.popForm.pic) {
								return cb(new Error('banner图片不能为空!'))
							}
							return cb()
						}
					}],
					sort: [{
						required: true,
						trigger: 'blur',
						validator: (rules, value, cb) => {
							if (!this.popForm.sort) {
								return cb(new Error('排序不能为空!'))
							}
							return cb()
						}
					}],
				},
				imageFile: '',
				bannerImglist: [],
			}
		},
		computed: {
			StartPicker() {
				return {
					disabledDate: (time) => {
						return time.getTime() < new Date().getTime() - 24 * 60 * 60 * 1000;
					}
				}
			},
			EndPicker() {
				return {
					disabledDate: (time) => {
						return time.getTime() < new Date().getTime() - 24 * 60 * 60 * 1000;
					}
				}
			},
			startTime() {
				let start = this.popForm.start_time
				let now = new Date().getTime()
				let params = {}
				params = {
					required: true,
					validator: (rules, val, cb) => {
						if(start < now && this.type === 'Add') {
							cb(new Error('开始时间不可小于当前时间'))
						} else {
							cb()
						}
					}
				}
				return params
			},
			endTime() {
				let start = this.popForm.start_time
				let now = new Date().getTime()
				let params = {}
				params = {
					required: true,
					validator: (rules, val, cb) => {
						if(start < now && this.type === 'Add') {
							cb(new Error('结束时间不可小于当前时间'))
						} else {
							cb()
						}
					}
				}
				return params
			},
			cfgs() {
				return {
					vm: this,
					url: REQUEST.system.banner.getBanner,
					columns: [
						{
							label: '序号',
							prop: 'sort'
						},
						{
							label: 'banner标题',
							prop: 'title'
						},
						{
							label: '轮播顺序',
							prop: 'sort'
						},
						{
							label: 'banner图片',
							isimg: true,
							prop: 'pic',
							imgHeight: '50px'
						},
						{
							label: 'banner类型',
							render: (h, params) => {
								let data = MAPDATA.BANNERSYSTEMTYPELIST.find(item => { return item.value === params.row.type })
								return h('span', data ? data.name : '无')
							}
						},
						{
							label: '更新时间',
							render: (h, params) => {
								return h('span', params.row.update_time ? timeFormat(params.row.update_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
							}
						},
						{
							label: '启用/禁用',
							isSwitch: true,
							prop: 'status',
							isTrueValue: 1,
							isFalseValue: 2,
							change: (v, row) => {
								this.changeSwitch(row.id, v)
							}
						},
						{
							label: '操作',
							render: (h, params) => {
								return h('div', [
									h('el-button', { props : { type: 'primary'}, on: {click:()=>{this.editFunc(params.row)}}}, '修改')
								])
							}
						}
					]
				}
			}
		},
		created() {
			this.getBannerList()
		},
		methods: {
			// 配置参数
			beforeSearch(params) {
				return {
					page: params.page,
					pagesize: params.size
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
			// 编辑
			editFunc(row) {
				this.isDestoryComp = true
				setTimeout(() => {
					this.$refs.userEdit.loadParams(row)
				}, 50);
			},
			// 销毁组件
			destoryComp() {
				this.isDestoryComp = false
			},
			// 更改
			changeSwitch(id, status) {

			},



			getBannerList() {
				this.listLoading = true
				this.srcList = []
				var params = {
					'page': this.page.page,
					'pagesize': this.page.limit
				}
				getBanner(params).then(response => {
					this.total = response.data.count
					this.list = response.data.list
					this.list.map(res => {
						switch (res.type) {
							case 1:
								res.typeText = "朋友圈轮播图";
								break;
						}
						if(res.pic !== ""){
							this.bannerImglist.push(res.pic)
						}
						res.statusText = res.status == 1 ? true : false;
						res.update_timeText = res.update_time > 0 ? moment(res.update_time * 1000).format(
							'YYYY-MM-DD HH:mm:ss') : "";
					})
					this.listLoading = false
				}).catch(err => {
					this.listLoading = false
				})
			},
			handleClose() {
				this.showImgUrl = ''
			},
			handleGiftAdd() {
				this.editTitle = '新增'
				this.imageUrl = ''
				this.popForm = {
					'title': '',
					'pic': '',
					'status': '',
					'ps': '',
					'sort': '',
					'url': '',
					'type': 'Add',
					start_time: '',
					end_time: ''
				}
				this.imageFile = "";
				if (this.$refs['popForm']) {
					this.$refs['popForm'].resetFields()
				}
				this.editPop = true
			},
			handleEdit(row) {
				this.popForm = {
					'title': row.title,
					'pic': row.pic,
					'type': row.type,
					'status': row.status,
					'ps': row.ps,
					'sort': row.sort,
					'url': row.url,
					'id': row.id,
					'type': 'Edit',
					start_time: row.start_time ? row.start_time * 1000 : '',
					end_time: row.end_time ? row.end_time * 1000 : ''
				}
				this.imageUrl = row.pic
				this.editTitle = '修改'
				if (this.$refs['popForm']) {
					this.$refs['popForm'].resetFields()
				}
				this.editPop = true
			},
			handleChange() {
				if (this.popForm.type == 'Edit') {
					this.giftEdit()
				} else if (this.popForm.type == 'Add') {
					this.giftAdd()
				}
			},
			handleCancel() {
				this.editPop = false
			},
			giftAdd() {
				this.$refs.popForm.validate(valid => {
					if (valid) {
						const formData = new FormData()
						formData.append('title', this.popForm.title)
						// formData.append('type', this.popForm.type)
						formData.append('status', this.popForm.status)
						formData.append('ps', this.popForm.ps)
						formData.append('sort', this.popForm.sort)
						formData.append('url', this.popForm.url)
						formData.append('pic', this.popForm.pic)
						let start_time = Math.floor(this.popForm.start_time / 1000)
                		let end_time = Math.floor(this.popForm.end_time / 1000)
						formData.append('start_time', start_time)
						formData.append('end_time', end_time)
						this.loading = true
						getBannerChange(formData).then(res => {
							this.$message.success("添加成功")
							this.imageFile = "";
							this.loading = false
							this.handleEditClose()
							this.getBannerList()
						}).catch(err => {
							this.$message.error(err)
							this.handleEditClose()
							this.loading = false
						})
					}
				})
			},
			giftEdit() {
				this.$refs.popForm.validate(valid => {
					if (valid) {
						const formData = new FormData()
						formData.append('id', this.popForm.id)
						formData.append('title', this.popForm.title)
						// formData.append('type', this.popForm.type)
						formData.append('status', this.popForm.status)
						formData.append('ps', this.popForm.ps)
						formData.append('sort', this.popForm.sort)
						formData.append('url', this.popForm.url)
						formData.append('pic', this.popForm.pic)
						let start_time = Math.floor(this.popForm.start_time / 1000)
                		let end_time = Math.floor(this.popForm.end_time / 1000)
						formData.append('start_time', start_time)
						formData.append('end_time', end_time)
						this.loading = true
						getBannerChange(formData).then(res => {
							this.imageFile = "";
							this.loading = false
							this.$message.success("修改成功")
							this.handleEditClose()
							this.getBannerList()
						}).catch(err => {
							this.loading = false
							this.$message.error(err)
							this.handleEditClose()
						})
					}
				}).catch(() => {
					this.loading = false
				});
			},
			handleEditClose() {
				this.editPop = false
			},
			numberChange(val, maxNum, name) {
				// 转换数字类型
				this.popForm[name] = Number(val)
				// 重新渲染
				this.$nextTick(() => {
					// 比较输入的值和最大值，返回小的
					const num = Math.min(Number(val), maxNum)
					// 输入负值的情况下， = 0（可根据实际需求更该）
					var minNum = name == 'sort' ? 1 : 0
					if (num < minNum) {
						this.popForm[name] = minNum
					} else {
						// 反之
						this.popForm[name] = num
					}
				})
			},
			handleEnable(row) {
				var params = {
					id : row.id,
					status : !row.status
				}
				getBannerChange(params).then(res=>{
					this.getBannerList()
				}).catch(err=>{
					this.$message.error(err);
				})
			},
			getUpLoadImg(source){
				console.log("上传成功后返回的图片地址",source);
				this.popForm.pic = source.url;
			},
		}
	}
</script>
<style scoped="scoped" lang="scss">
	.el-input {
		width: 335px;
	}
	::v-deep.popDel {
		.el-dialog__body {
			height: auto !important;
		}
	}

	::v-deep .el-dialog__body {
		/* display: flex;
		align-items: center;
		justify-content: center; */
	}

	::v-deep.avatar-uploader {
		width: 178px;
		height: 178px;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px dashed #eeeeee;

		.el-upload {
			border: 1px dashed #d9d9d9;
			border-radius: 6px;
			cursor: pointer;
			position: relative;
			overflow: hidden;
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;

			img {
				width: 100%;
				max-height: 178px;
			}
		}
	}

	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}

	.avatar {
		max-height: 178px;
	}

	::v-deep .el-dialog {
		margin-top: 0 !important;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		height: max-content;
		max-height: 90%;
		margin: auto !important;
	}

	::v-deep .showImgDialog .el-dialog {
		.el-dialog__body {
			display: flex;
			align-items: center;
			justify-content: center;
			overflow: hidden;
		}
	}

	.colorNormal {
		color: #67C23A;
	}

	.colorDel {
		color: #F56C6C;
	}

	::v-deep.toolbarBtns {
		width: 80%;
		position: relative;

		.el-form-item__content {
			width: 100%;

			.refreshBtn {
				opacity: 0.2;
				padding: 0px;
				font-size: 12px;
				position: absolute;
				right: 0;
				bottom: 0;
			}
		}
	}
</style>
