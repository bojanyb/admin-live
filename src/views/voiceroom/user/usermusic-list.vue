<template>
	<div class="app-container">

		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters" @keyup.enter.native="getUserMusic()">
				<el-form-item label="排序查看">
					<el-select v-model="filters.sort" placeholder="请选择" @change="getUserMusic">
						<el-option label="全部" value="" />
						<el-option key="0" label="正序" value="0" />
						<el-option key="1" label="倒序" value="1" />
					</el-select>
				</el-form-item>
				<el-form-item label="筛选查看">
					<el-select v-model="filters.status" placeholder="请选择" @change="getUserMusic">
						<el-option label="全部" value="" />
						<el-option key="1" label="未处理" value="1" />
						<el-option key="3" label="未通过" value="3" />
					</el-select>
				</el-form-item>
				<el-form-item label="用户ID">
					<el-input v-model="filters.user_number" v-input-limit="0" placeholder="请输入用户ID" clearable />
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="getUserMusic">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<el-table ref="multipleTable" v-loading="listLoading" :data="list" element-loading-text="拼命加载中" border fit
			highlight-current-row>
			<el-table-column label="上传用户昵称" prop="nickname" align="center" />
			<el-table-column label="上传用户ID" prop="user_number" align="center" />
			<el-table-column label="上传时间" prop="create_timeText" align="center" />
			<el-table-column label="音频" prop="url" align="center" width="360">
				<template slot-scope="scope">
					<div class="songTitle">{{scope.row.name}}</div>
					<audio v-if="scope.row.url !==''" style="height: 25px;" ref="audio" :src="scope.row.url"
						controls="controls"></audio>
					<div class="tagsBox">
						<div class="tagsItem fl" v-for="it in scope.row.tags">{{it}}</div>
					</div>
				</template>
			</el-table-column>
			<el-table-column label="处理时间" prop="update_timeText" align="center" />
			<el-table-column label="处理人" prop="deal_user_name" align="center" />
			<el-table-column label="操作" align="center">
				<template slot-scope="scope">
					<div v-if="scope.row.status == 1">
						<el-button type="primary" @click="handleEdit(scope.row)">修改
						</el-button>
						<el-button type="danger" @click="handleTakeDown(scope.row)">下架
						</el-button>
					</div>
					<div v-else-if="scope.row.status == 2" style="color: red;">
						已下架
					</div>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<pagination v-show="total>0" :total="total" :page.sync="page.page" :limit.sync="page.limit"
			@pagination="getUserMusic" />

		<el-dialog :title="editTitle" :visible.sync="editPop">
			<el-form :model="popForm">
				<el-form-item label="歌名" :label-width="formLabelWidth">
					<el-input v-model="popForm.name" style="width: 300px;" maxlength="16" placeholder="请输入歌名" clearable
						autocomplete="off" />
				</el-form-item>
				<el-form-item label="歌手" :label-width="formLabelWidth">
					<el-input v-model="popForm.singer" style="width: 300px;" maxlength="16" placeholder="请输入歌手"
						clearable autocomplete="off" />
				</el-form-item>

				<el-form-item label="语种" :label-width="formLabelWidth">
					<el-select v-model="language" placeholder="请选择">
						<el-option v-for="item in languageList" :key="item" :label="item" :value="item" />
					</el-select>
				</el-form-item>
				<el-form-item label="曲风" :label-width="formLabelWidth">
					<el-select v-model="melody" placeholder="请选择">
						<el-option v-for="item in melodyList" :key="item" :label="item" :value="item" />
					</el-select>
				</el-form-item>
				<el-form-item label="年代" :label-width="formLabelWidth">
					<el-select v-model="era" placeholder="请选择">
						<el-option v-for="item in eraList" :key="item" :label="item" :value="item" />
					</el-select>
				</el-form-item>
				<el-form-item label="铃声" :label-width="formLabelWidth">
					<el-select v-model="tang" placeholder="请选择">
						<el-option v-for="item in tangList" :key="item" :label="item" :value="item" />
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
		getUserMusicList,
		getUserMusicUpdate,
		getUserMusicBack
	} from '@/api/videoRoom'
	import Pagination from '@/components/Pagination'
	import moment from 'moment'
	export default {
		name: 'AccountList',
		components: {
			Pagination
		},
		data() {
			return {
				list: [],
				loading: false,
				listLoading: false,
				total: 0,
				formLabelWidth: '120px',
				page: {
					page: 1,
					limit: 10
				},
				editTitle: '',
				editPop: false,
				language: "",
				melody: "",
				era: "",
				tang: "",
				languageList: [
					"华语",
					"粤语",
					"方言",
					"英语",
					"日语",
					"韩语",
					"俄语",
					"法语"
				],
				melodyList: [
					"流行",
					"抖音热门",
					"古风",
					"摇滚",
					"DJ",
					"合唱",
					"民谣",
					"儿歌",
					"纯音乐",
					"说唱",
					"R&B",
					"动漫/游戏",
					"影视",
				],
				eraList: [
					"经典老歌",
					"欧美经典",
					"儿歌",
				],
				tangList: [
					"DJ铃声",
					"网络铃声",
					"搞笑铃声",
					"个性铃声",
					"动漫铃声",
					"游戏铃声",
					"可爱铃声",
					"影视广告铃声",
				],
				popForm: {
					'id': '',
					'name': '',
					'singer': '',
					'tags': ''
				},
				filters: {
					'user_number': '',
					'sort': "0",
					'status': ""
				}
			}
		},
		created() {
			this.getUserMusic()
		},
		methods: {
			getUserMusic() {
				this.listLoading = true
				var params = {
					'page': this.page.page,
					'pagesize': this.page.limit,
					'user_number': this.filters.user_number,
					'status': this.filters.status,
					'sort': this.filters.sort
				}
				getUserMusicList(params).then(response => {
					this.total = response.data.count
					this.list = response.data.list
					this.list.map(res => {
						res.create_timeText = moment(res.create_time * 1000).format('YYYY-MM-DD HH:mm:ss')
						res.update_timeText = moment(res.update_time * 1000).format('YYYY-MM-DD HH:mm:ss')
					})
					this.listLoading = false
				}).catch(err => {
					this.listLoading = false
				})
			},
			handleEdit(row) {
				this.editTitle = '请编辑音频信息';
				this.handleChangeTitle(row.tags);
				this.popForm = {
					"id": row.id,
					"name": row.name,
					"singer": row.singer,
					"tags": row.tags,
				}
				
				
				this.editPop = true
			},
			handleTakeDown(row) {
				this.$confirm('确定要下架该音乐？')
					.then(res => {
						var params = {
							"id" : row.id
						}
						getUserMusicBack(params).then(res=>{
							this.$message.success("下架成功");
							this.getUserMusic();
						}).catch(err=>{
							this.$message.error(err);
						})
					}).catch(err => {});
			},
			handleChange() {
				this.loading = true
				let tagsText = "";
				if(this.language !== ""){
					tagsText += this.language + ',';
				}else{
					this.$message.error("语种为必选");
					return
				}
				if(this.melody !== ""){
					tagsText += this.melody + ',';
				}
				if(this.era !== ""){
					tagsText += this.era + ',';
				}
				if(this.tang !== ""){
					tagsText += this.tang + ',';
				}
				
				var params = {
					"id" : this.popForm.id,
					"name" : this.popForm.name,
					"singer" : this.popForm.singer,
					"tags": tagsText.substring(0,tagsText.length-1)
				}
				getUserMusicUpdate(params).then(res=>{
					this.$message.success("修改成功");
					this.getUserMusic();
					this.loading = false;
					this.editPop = false;
				}).catch(err=>{
					this.$message.error(err);
					this.loading = false;
				})
			},
			handleChangeTitle(list){
				this.language = "";
				this.melody = "";
				this.era = "";
				this.tang = "";
				list.forEach(item=>{
					this.languageList.forEach(it=>{
						if(it == item){
							this.language = item;
						}
					})
					this.melodyList.forEach(it=>{
						if(it == item){
							this.melody = item;
						}
					})
					this.eraList.forEach(it=>{
						if(it == item){
							this.era = item;
						}
					})
					this.tangList.forEach(it=>{
						if(it == item){
							this.tang = item;
						}
					})
				})
			}
		}
	}
</script>
<style lang="scss">
	.el-table .cell {
		.songTitle {
			margin-bottom: 5px;
		}

		.tagsBox {
			display: flex;
			justify-content: center;
			align-items: center;

			.tagsItem {
				margin-right: 5px;
				height: 20px;
			}
		}
	}
</style>
