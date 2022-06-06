<template>
	<div class="app-container">

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-form :inline="true" :model="filters" @keyup.enter.native="getGuildListInfo()">
				<el-form-item label="公会ID">
					<el-input v-model="filters.guild_number" v-input-limit="0" placeholder="请输入公会ID" clearable />
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="getGuildListInfo">查询</el-button>
					<el-button type="success" @click="getGuildAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<el-table ref="multipleTable" v-loading="listLoading" :data="list" element-loading-text="拼命加载中" border fit
			highlight-current-row>
			<el-table-column label="公会ID" prop="guild_number" align="center" />
			<el-table-column label="公会等级" prop="rankText" align="center" />
			<el-table-column label="公会长ID" prop="user_number" align="center" />
			<el-table-column label="公会昵称" prop="nickname" align="center" />
			<el-table-column label="公会图像" prop="face" align="center" width="95">
				<template slot-scope="scope">
					<el-image style="width: 45px; height: 45px" :lazy="true" v-if="scope.row.face.length > 0"
						:src="scope.row.face ? scope.row.face : ''" :preview-src-list="guildImglist" />
				</template>
			</el-table-column>
			<el-table-column label="公会简介" prop="remark" align="center" show-overflow-tooltip />
			<el-table-column label="创建时间" prop="create_timeText" align="center"  width="160"/>
			<el-table-column label="公会成员" prop="user_count" align="center" />
			<el-table-column label="已绑定厅" prop="room_count" align="center" />
			<el-table-column label="开厅数量" prop="is_live_count" align="center" />
			<el-table-column label="总流水" prop="total_flow" align="center" />
			<el-table-column label="当日流水" prop="today_flow" align="center" />
			<el-table-column label="本周流水" prop="now_week_back" align="center" />
			<el-table-column label="上一周流水" prop="last_week_back" align="center" />
			<el-table-column label="操作" prop="gift_str" align="center" width="230">
				<template slot-scope="scope">
					<el-button type="primary" @click="handleChange(scope.row)">修改信息</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<pagination v-show="total>0" :total="total" :page.sync="page.page" :limit.sync="page.limit"
			@pagination="getGuildListInfo" />

		<el-dialog title="新增公会" :visible.sync="addPop" :before-close="handleAddCancel">
			<el-form :model="addPopForm" ref="addPopForm" :rules="addPopFormRules">
				<el-form-item label="公会头像" prop="face" :label-width="formLabelWidth">
					<el-col :span="17">
						<ossFile :picImg="imageUrl" :type="'img'" :play_type="1" @getUpLoadImg="getUpLoadImg"/>
					</el-col>
				</el-form-item>
				<el-form-item label="公会昵称" prop="nickname" :label-width="formLabelWidth">
					<el-col :span="17">
						<el-input v-model="addPopForm.nickname" style="width: 335px;" placeholder="请输入公会名字" clearable
							autocomplete="off" />
					</el-col>
				</el-form-item>
				<el-form-item label="绑定会长ID" prop="user_number" :label-width="formLabelWidth">
					<el-col :span="17">
						<el-input v-model="addPopForm.user_number" v-input-limit="0" style="width: 335px;"
							placeholder="请输入需要绑定的会长ID" clearable autocomplete="off" />
					</el-col>
				</el-form-item>
				<el-form-item label="公会等级" prop="rank" :label-width="formLabelWidth">
					<el-col :span="17">
					<el-select v-model="addPopForm.rank" placeholder="请选择">
						<el-option v-for="item in rankList" :key="item.id" :label="item.name" :value="item.id" />
					</el-select>
					</el-col>
				</el-form-item>
				<!-- <el-form-item label="周返点配置" prop="week_rebate" :label-width="formLabelWidth">
					<el-input v-model="addPopForm.week_rebate" v-input-limit="0" style="width: 335px;"
						placeholder="请输入周返点配置" clearable autocomplete="off">
						<template slot="append">%</template>
					</el-input>
				</el-form-item>
				<el-form-item label="固定返点配置" prop="rebate" :label-width="formLabelWidth">
					<el-input v-model="addPopForm.rebate" style="width: 335px;" placeholder="" clearable
						autocomplete="off" disabled>
						<template slot="append">%</template>
					</el-input>
				</el-form-item> -->
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button :loading="loading" type="primary" @click="handleAdd">创 建</el-button>
				<el-button @click="handleAddCancel">取 消</el-button>
			</div>
		</el-dialog>
		<el-dialog title="修改信息" :visible.sync="editPop" :before-close="handleEditCancel">
			<el-form :model="editPopForm" ref="editPopForm" :rules="editPopFormRules">
				<el-form-item label="公会头像" prop="face" :label-width="formLabelWidth">
					<el-col :span="17">
						<ossFile :picImg="imageUrl" :type="'img'" :play_type="1" @getUpLoadImg="getUpLoadImg"/>
					</el-col>
				</el-form-item>
				<el-form-item label="公会昵称" prop="nickname" :label-width="formLabelWidth">
					<el-col :span="17">
						<el-input v-model="editPopForm.nickname" style="width: 335px;" placeholder="请输入公会名字" clearable
							autocomplete="off" />
					</el-col>
				</el-form-item>
				<el-form-item label="固定返点配置" prop="rebate" :label-width="formLabelWidth">
					<el-input v-model="editPopForm.rebate" style="width: 335px;" clearable
						autocomplete="off" disabled>
						<template slot="append">%</template>
					</el-input>
				</el-form-item> 
				<!-- <el-form-item label="周返点配置" prop="week_rebate" :label-width="formLabelWidth">
					<el-input v-model="editPopForm.week_rebate" v-input-limit="0" style="width: 335px;"
						placeholder="请输入周返点配置" clearable autocomplete="off">
						<template slot="append">%</template>
					</el-input>
				</el-form-item> -->
				<el-form-item label="更换会长ID" prop="user_number" :label-width="formLabelWidth">
					<el-col :span="17">
						<el-input v-model="editPopForm.user_number" v-input-limit="0" style="width: 335px;"
							placeholder="请输入需要更换的会长ID" clearable autocomplete="off" />
					</el-col>
				</el-form-item>
				<el-form-item label="公会等级" prop="rank" :label-width="formLabelWidth">
					<el-col :span="17">
					<el-select v-model="editPopForm.rank" placeholder="请选择">
						<el-option v-for="item in rankList" :key="item.id" :label="item.name" :value="item.id" />
					</el-select>
					</el-col>
				</el-form-item>
				<el-form-item label="公会简介" prop="remark" :label-width="formLabelWidth">
					<el-col :span="17">
						<el-input v-model="editPopForm.remark" type="textarea" style="width: 335px;" rows="9"
							placeholder="请输入公会简介" minlength="10" maxlength="150" show-word-limit clearable
							autocomplete="off" />
					</el-col>
				</el-form-item>

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button :loading="loading" type="primary" @click="handleEdit">确认修改</el-button>
				<el-button @click="handleEditCancel">取 消</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import {
		getGuildList,
		getGuildCreate,
		getGuildUpdate,
		getUserRebateConfig
	} from '@/api/videoRoom'
	import Pagination from '@/components/Pagination'
	import moment from 'moment'
	import ossFile from '../components/ossFile.vue'
	export default {
		name: 'guild-list',
		components: {
			Pagination,
			ossFile
		},
		data() {
			return {
				timer: "",
				list: [],
				loading: false,
				listLoading: true,
				total: 0,
				guildImglist: [],
				filters: {
					'guild_number': '',
					'status': '',
				},
				page: {
					page: 1,
					limit: 10
				},
				addPop: false,
				editPop: false,
				formLabelWidth: '120px',
				imageUrl: "",
				rankList:[{
					"id" : 1,
					"name" : "A"
				},
				{
					"id" : 2,
					"name" : "AA"
				},
				{
					"id" : 3,
					"name" : "AAA"
				}],
				addPopForm: {
					'face': '',
					'nickname': '',
					'user_number': '',
					'rank': '',
					'rebate': '',
				},
				addPopFormRules: {
					face: [{
						required: true,
						trigger: 'change',
						validator: (rules, value, cb) => {
							if (!this.imageUrl || this.imageUrl == "") {
								return cb(new Error('活动图标不能为空!'))
							}
							return cb()
						}
					}],
					nickname: [{
						required: true,
						trigger: 'blur',
						validator: (rules, value, cb) => {
							if (!this.addPopForm.nickname || this.addPopForm.nickname == "") {
								return cb(new Error('公会昵称不能为空!'))
							}
							return cb()
						}
					}],
					rank: [{
						required: true,
						trigger: 'change',
						validator: (rules, value, cb) => {
							if (!this.addPopForm.rank || this.addPopForm.rank == "") {
								return cb(new Error('公会等级不能为空!'))
							}
							return cb()
						}
					}],
					user_number: [{
						required: true,
						trigger: 'blur',
						validator: (rules, value, cb) => {
							if (!this.addPopForm.user_number || this.addPopForm.user_number == "") {
								return cb(new Error('绑定会长ID不能为空!'))
							}
							return cb()
						}
					}],
				},
				editPopForm: {
					'id': '',
					'face': '',
					'nickname': '',
					'user_number': '',
					'rank': '',
					'remark': '',
					'rebate' : 10
				},
				editPopFormRules: {
					face: [{
						required: true,
						trigger: 'change',
						validator: (rules, value, cb) => {
							if (!this.imageUrl || this.imageUrl == "") {
								return cb(new Error('活动图标不能为空!'))
							}
							return cb()
						}
					}],
					nickname: [{
						required: true,
						trigger: 'blur',
						validator: (rules, value, cb) => {
							if (!this.editPopForm.nickname || this.editPopForm.nickname == "") {
								return cb(new Error('公会昵称不能为空!'))
							}
							return cb()
						}
					}],
					user_number: [{
						required: true,
						trigger: 'blur',
						validator: (rules, value, cb) => {
							if (!this.editPopForm.user_number || this.editPopForm.user_number == "") {
								return cb(new Error('更换会长ID不能为空!'))
							}
							return cb()
						}
					}],
					remark: [{
						required: true,
						trigger: 'blur',
						validator: (rules, value, cb) => {
							if (!this.editPopForm.remark || this.editPopForm.remark == "") {
								return cb(new Error('公会简介不能为空!'))
							}
							if (this.editPopForm.remark.length < 10 || this.editPopForm.remark.length > 150) {
								return cb(new Error('公会简介字数范围为10~150!'))
							}
							return cb()
						}
					}],
					rank: [{
						required: true,
						trigger: 'change',
						validator: (rules, value, cb) => {
							if (!this.editPopForm.rank || this.editPopForm.rank == "") {
								return cb(new Error('公会等级不能为空!'))
							}
							return cb()
						}
					}],
				},
			}
		},
		created() {
			this.getGuildListInfo()
		},
		methods: {
			getGuildListInfo() {
				this.listLoading = true
				var params = {
					'page': this.page.page,
					'pagesize': this.page.limit,
					'status': this.filters.status,
					'guild_number': this.filters.guild_number
				}
				this.guildImglist = [];
				getGuildList(params).then(res => {
					this.total = res.data.count
					res.data.list.map(re => {
						this.addPopForm.rebate = re.rebate;
						re.create_timeText = re.create_time > 0 ? moment(re.create_time * 1000).format('YYYY-MM-DD HH:mm:ss') : ""
						if(re.face !== ""){
							this.guildImglist.push(re.face)
						}
						
						switch (re.rank){
							case 1:
							re.rankText = "A";
								break;
							case 2:
							re.rankText = "AA";
								break;
							case 3:
							re.rankText = "AAA";
								break;
						}
						
					})
					this.list = res.data.list
					this.listLoading = false
				}).catch(err => {
					this.listLoading = false
				})
			},
			getGuildAdd() {
				if (this.$refs['addPopForm']) {
					this.$refs['addPopForm'].resetFields()
				}
				this.imageUrl = "";
				this.addPop = true;
			},
			getUpLoadImg(source){
				if(source.type == "img"){
					console.log(source.url)
					this.imageUrl = source.url;
				}
			},
			handleAddCancel() {
				this.addPop = false
			},
			handleAdd() {
				this.$refs.addPopForm.validate(valid => {
					if (valid) {
						const formData = new FormData()
						formData.append('nickname', this.addPopForm.nickname)
						formData.append('user_number', this.addPopForm.user_number)
						formData.append('rank', this.addPopForm.rank)
						if (this.imageUrl !== '') {
							formData.append('face', this.imageUrl)
						}
						getGuildCreate(formData).then(res=>{
							this.$message.success("新增成功");
							this.getGuildListInfo();
							this.handleAddCancel();
						}).catch(err=>{
							this.$message.error(err)
						})
					}
				})
			},
			handleChange(row) {
				this.editPopForm = {
					'id': row.id,
					'face':  row.face,
					'nickname':  row.nickname,
					'user_number':  row.user_number,
					'rebate' : 10,
					'remark':  row.remark,
				}
				this.imageUrl = row.face;
				if (this.$refs['editPopForm']) {
					this.$refs['editPopForm'].resetFields()
				}
				this.editPop = true
			},
			handleEdit(){
				this.$refs.editPopForm.validate(valid => {
					if (valid) {
						const formData = new FormData()
						formData.append('id', this.editPopForm.id)
						formData.append('nickname', this.editPopForm.nickname)
						formData.append('user_number', this.editPopForm.user_number)
						formData.append('remark', this.editPopForm.remark)
						formData.append('rank', this.editPopForm.rank)
						if (this.imageUrl && this.imageUrl !== '') {
							formData.append('face', this.imageUrl)
						}
						getGuildUpdate(formData).then(res=>{
							this.$message.success("修改成功");
							this.getGuildListInfo();
							this.handleEditCancel();
						}).catch(err=>{
							this.$message.error(err);
						})
					}
				})
			},
			handleEditCancel() {
				this.editPop = false
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

	.avatar-uploader {
		width: 178px;
		height: 178px;
		display: flex;
		// border-radius: 50%;
		align-items: center;
		justify-content: center;
		border: 1px dashed #eeeeee;

		.el-upload {
			display: flex;
			align-items: center;
			justify-content: center;
			margin: auto;
			img {
				width: 100%;
			}
		}
	}

	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
		width: 100%;
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
		border-radius: 50%;
	}
	.el-table .cell{
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
