<template>
	<div class="app-container">
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters" @keyup.enter.native="roomBgList()">
				<el-form-item>
					<el-button type="success" @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<el-table ref="multipleTable" v-loading="listLoading" :data="list" element-loading-text="拼命加载中" border fit
			highlight-current-row>
			<el-table-column label="编号" align="center">
				<template slot-scope="scope">
					{{ scope.$index + 1 }}
				</template>
			</el-table-column>
			<el-table-column label="房间背景图" prop="url" align="center">
				<template slot-scope="scope">
					<el-image style="width: 30px; height: 30px" :lazy="true" :src="scope.row.url ? scope.row.url : ''"
						:preview-src-list="userImglist" />
				</template>
			</el-table-column>
			<el-table-column label="上传时间" prop="create_timeText" align="center" />
			<el-table-column label="上传人" prop="user_name" align="center" />
			<el-table-column label="默认配置房间" prop="room_genreText" align="center" />
			<el-table-column label="操作" prop="gift_str" align="center">
				<template slot-scope="scope">
					<el-button type="danger" @click="handleDel(scope.row.id)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!--工具条-->
		<pagination v-show="total>0" :total="total" :page.sync="page.page" :limit.sync="page.limit"
			@pagination="roomBgList" />

		<el-dialog title="操作" :visible.sync="editPop">
			<el-form :model="popForm" ref="popForm" :rules="popFormRules">
				<el-form-item label="图片" prop="imgPreview" :label-width="formLabelWidth">
					<el-col :span="17">
						<ossFile :picImg="imageUrl" :type="'img'" :play_type="1" @getUpLoadImg="getUpLoadImg"/>
					</el-col>
				</el-form-item>
				<el-form-item label="默认配置房间类型" prop="room_genre" :label-width="formLabelWidth">
					<el-select v-model="popForm.room_genre" placeholder="请选择">
						<el-option v-for="item in foomtTypeList" :key="item.value" :label="item.label"
							:value="item.value" />
					</el-select>
				</el-form-item>

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="editPop = false">取 消</el-button>
				<el-button :loading="loading" type="primary" @click="handleChange">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import {
		getRoomBgList,
		getRoomBgAdd,
		getRoomBgDel
	} from '@/api/videoRoom'
	import Pagination from '@/components/Pagination'
	import moment from 'moment'
	import ossFile from '../components/ossFile.vue'
	export default {
		name: 'room-background-list',
		components: {
			Pagination,
			ossFile
		},
		data() {
			return {
				list: [],
				listLoading: false,
				total: 0,
				page: {
					page: 1,
					limit: 10
				},
				filters: {},
				formLabelWidth: '150px',
				editPop: false,
				loading: false,
				userImglist: [],
				popForm: {
					"url": "",
					"room_genre": "",
				},
				imageUrl: "",
				foomtTypeList: [{
						"value": "0",
						"label": "不配置",
					},
					{
						"value": 1,
						"label": "游戏",
					},
					{
						"value": 2,
						"label": "点唱",
					},
					{
						"value": 3,
						"label": "情感",
					},
					// {
					// 	"value": 4,
					// 	"label": "闲聊",
					// }
				],
				popFormRules: {
					imgPreview: [{
						required: true,
						trigger: 'change',
						validator: (rules, value, cb) => {
							if (!this.imageUrl) {
								return cb(new Error('图片不能为空!'))
							}
							return cb()
						}
					}],
					room_genre: [{
						required: true,
						trigger: 'change',
						validator: (rules, value, cb) => {
							if (!this.popForm.room_genre) {
								return cb(new Error('请选择房间类型!'))
							}
							return cb()
						}
					}],

				}
			}
		},
		created() {
			this.roomBgList();
		},
		methods: {
			roomBgList() {
				var params = {};
				this.listLoading = true;
				getRoomBgList(params).then(res => {
					this.total = res.data.count ? res.data.count : 0;
					res.data.map(re => {
						re.create_timeText = moment(re.create_time * 1000).format('YYYY-MM-DD HH:mm:ss')
						switch (re.room_genre) {
							case 0:
								re.room_genreText = "无";
								break;
							case 1:
								re.room_genreText = "游戏";
								break;
							case 2:
								re.room_genreText = "点唱";
								break;
							case 3:
								re.room_genreText = "情感";
								break;
							case 4:
								re.room_genreText = "闲聊";
								break;
						}
						this.userImglist.push(re.url);
					})
					this.list = res.data;
					this.listLoading = false;
				}).catch(err => {
					this.$message.error(err);
					this.listLoading = false;
				})
			},
			handleAdd() {
				if (this.$refs['popForm']) {
					this.imageUrl = "";
					this.$refs['popForm'].resetFields()
				}
				this.editPop = true;
			},
			handleDel(id) {
				this.$alert("是否确定删除该房间背景图?", '提示', {
					confirmButtonText: '是',
					callback: action => {
						if (action == 'confirm') {
							let params = {
								"id": id
							}
							this.loading = true;
							getRoomBgDel(params).then(res=>{
								this.$message.success(res.msg);
								this.roomBgList();
								this.loading = false;
							}).catch(err=>{
								this.$message.error(err);
								this.loading = false;
							})
						}
					}
				})
			},
			handleChange() {
				this.$refs.popForm.validate(valid => {
					if (valid) {
						const formData = new FormData()
						formData.append('room_genre', this.popForm.room_genre)
						formData.append('url', this.imageUrl)
						getRoomBgAdd(formData).then(res => {
							this.editPop = false;
							this.roomBgList();
							this.$message.success(res.msg);
							this.loading = false;
						}).catch(err => {
							this.$message.error(err);
							this.loading = false;
						})
					}
				})
			},
			getUpLoadImg(source){
				if(source.type == "img"){
					this.imageUrl = source.url;
				}
			},
		},
	}
</script>

<style scoped="scoped" lang="scss">
	::v-deep.avatar-uploader {
		width: 178px;
		height: 178px;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px dashed #eeeeee;

		.el-upload {
			// border: 1px dashed #d9d9d9;
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
				max-width: 178px;
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
</style>
