<template>
	<div class="gift-list-box">

		<!--工具条-->
		<!-- <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters" @keyup.enter.native="giftlist()">
				<el-form-item label="礼物状态">
					<el-select v-model="filters.status" placeholder="请选择" @change="giftlist">
						<el-option v-for="item in statusList" :key="item.value" :label="item.label"
							:value="item.value" />
					</el-select>
				</el-form-item>
				<el-form-item class="toolbarBtns">
					<el-button type="success" @click="handleGiftAdd">新增</el-button>
					<el-button class="refreshBtn" type="info" @click="handleGiftRefresh">刷新</el-button>
				</el-form-item>
			</el-form>
		</el-col> -->

		
		<div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" :show-add="true" @onReset="reset" @onSearch="onSearch" @add="add"></SearchPanel>
        </div>
		
		<tableList :cfgs="cfgs" ref="tableList"></tableList>


		<el-dialog :title="editTitle" :visible.sync="editPop" @close="handleCancel">
			<el-form :model="popForm" ref="popForm" :rules="popFormRules">
				<el-form-item label="礼物名" prop="gift_name" :label-width="formLabelWidth">
					<el-col :span="17">
						<el-input v-model="popForm.gift_name" style="width: 335px;" placeholder="请输入礼物名" clearable
							autocomplete="off" />
					</el-col>
				</el-form-item>
				<el-form-item label="礼物类型" prop="gift_genre" :label-width="formLabelWidth">
					<el-col :span="17">
						<el-radio-group v-model="popForm.gift_genre">
							<el-radio v-for="(it,Index) in giftGenreList" :key="Index" :label="it.value">
								{{it.label}}
							</el-radio>
						</el-radio-group>
					</el-col>
				</el-form-item>
				<el-form-item label="礼物播放类型" prop="play_type" :label-width="formLabelWidth">
					<el-col :span="17">
						<el-radio-group v-model="popForm.play_type">
							<el-radio v-for="(it,x) in giftPlayList" :key="x" :label="it.value">
								{{it.label}}
							</el-radio>
						</el-radio-group>
					</el-col>
				</el-form-item>
				<el-form-item label="礼物图片" prop="imageUrl" :label-width="formLabelWidth">
					<el-col :span="17">
						<ossFile :picImg="imageUrl" :type="'img'" :play_type="popForm.play_type" @getUpLoadImg="getUpLoadImg"/>
					</el-col>
				</el-form-item>
				<el-form-item label="礼物特效" prop="imageSvgUrl" :label-width="formLabelWidth">
					<ossFile :animationImg="imageSvgUrl" :type="'animation'" :play_type="popForm.play_type" @getUpLoadImg="getUpLoadImg"/>
				</el-form-item>
				<el-form-item label="礼物版本号" v-if="popForm.type == 'Edit' " prop="gift_version" :label-width="formLabelWidth"  :rules="popForm.type == 'Edit' ? popFormRules.gift_version:[{ required: false}]">
					<el-input v-model="popForm.gift_version" style="width: 335px;" oninput="value=value.replace(/[^\d.]/g,'')"
						placeholder="请输入礼物版本号" clearable autocomplete="off"  />
				</el-form-item>
				<el-form-item label="钻石价格" prop="gift_diamond" :label-width="formLabelWidth">
					<el-input v-model="popForm.gift_diamond" v-input-limit="0" style="width: 335px;"
						placeholder="请输入钻石价格" clearable autocomplete="off" @input="changeDiamond"
						@change="changeDiamond" />
				</el-form-item>
				<el-form-item label="平台分成" prop="gift_rateText" :label-width="formLabelWidth">
					<el-input v-model="popForm.gift_rateText" v-input-limit="2" style="width: 335px;"
						placeholder="请输入平台分成(0~100)" clearable autocomplete="off" @input="changeDiamond"
						@change="changeDiamond" />
					<span style="margin-left: 1%;"> %</span>
					<div>平台喵粮 {{ diamondNum }} 个</div>
				</el-form-item>
				<el-form-item label="礼物生效时间" prop="start_time" :label-width="formLabelWidth">
					<el-date-picker v-model="popForm.start_timeText" style="width: 335px;" type="datetime"
						placeholder="选择时间" :picker-options="pickerBeginDateBefore" value-format="yyyy-MM-dd HH:mm:ss"
						format="yyyy-MM-dd HH:mm:ss" clearable @change="handleChangeTime"/>
				</el-form-item>
				<el-form-item label="礼物过期时间" prop="end_time" :label-width="formLabelWidth">
					<el-date-picker v-model="popForm.end_timeText" style="width: 335px;" type="datetime"
						placeholder="选择时间" :picker-options="pickerBeginDateBefore" value-format="yyyy-MM-dd HH:mm:ss"
						format="yyyy-MM-dd HH:mm:ss" clearable @change="handleChangeTime"/>
				</el-form-item>
				<el-form-item v-if="popForm.type == 'Edit'" label="状态" prop="status" :label-width="formLabelWidth">
					<el-select v-model="popForm.status" placeholder="请选择">
						<el-option v-for="item in statusList" :key="item.value" :label="item.label"
							:value="item.value" />
					</el-select>
				</el-form-item>
				<el-form-item label="排序" prop="sort" :label-width="formLabelWidth">
					<el-input v-model="popForm.sort" v-input-limit="0" style="width: 335px;" placeholder="请输入排序"
						clearable autocomplete="off" @change="numberChange(arguments[0],65535,'sort')" />
				</el-form-item>
				<el-form-item label="礼物说明" prop="gift_desc" :label-width="formLabelWidth">
					<el-input v-model="popForm.gift_desc" type="textarea" :rows="5" style="width: 335px;"
						placeholder="请输入礼物说明" clearable autocomplete="off" />
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="handleCancel">取 消</el-button>
				<el-button :loading="loading" type="primary" @click="handleChange">确 定</el-button>
			</div>
		</el-dialog>
		
		<!-- 新增 - 修改组件 -->
		<giftAdd ref="giftAdd" v-if="isDestoryComp" @destoryComp="destoryComp" @getList="getList"></giftAdd>
	</div>
</template>

<script>
	import {
		getGiftList,
		getGiftAdd,
		getGiftEdit,
		getGiftRefresh
	} from '@/api/videoRoom'
	import Pagination from '@/components/Pagination'
	import moment from 'moment'
	import svgaplayer from '../components/svgaplayer.vue'
	import ossFile from '../components/ossFile.vue'

	// 引入新增组件
	import giftAdd from './giftAdd/index.vue'
	// 引入菜单组件
	import SearchPanel from '@/components/SearchPanel/final.vue'
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
		name: 'GiftList',
		mixins: [mixins],
		components: {
			Pagination,
			svgaplayer,
			ossFile,


			SearchPanel,
			tableList,
			giftAdd
		},
		data() {
			return {
				list: [],
				listLoading: true,
				total: 0,
				filters: {
					'status': ''
				},
				page: {
					page: 1
				},
				dialogVisible: false,
				showImgUrl: '',
				editTitle: '',
				editPop: false,
				loading: false,
				formLabelWidth: '120px',
				imageUrl: '',
				imageSvgUrl: '',
				imageSvgInfo: "",
				popForm: {
					'gift_name': '',
					'gift_photo': '',
					'gift_gif': '',
					'gift_version': '',
					'gift_diamond': '',
					'gift_rate': '',
					'gift_rateText': '',
					'start_time': 0,
					'end_time': 0,
					'id': '',
					'status': '',
					'sort': '',
					'gift_desc': '',
					'gift_genre': '',
					'play_type': '',
					'type': 'Add'
				},
				popFormRules: {
					gift_name: [{
						required: true,
						trigger: 'blur',
						validator: (rules, value, cb) => {
							if (!this.popForm.gift_name) {
								return cb(new Error('礼物名不能为空!'))
							}
							return cb()
						}
					}],
					gift_genre: [{
						required: true,
						trigger: 'blur',
						validator: (rules, value, cb) => {
							if (!this.popForm.gift_genre) {
								return cb(new Error('请选择礼物类型!'))
							}
							return cb()
						}
					}],
					play_type: [{
						required: true,
						trigger: 'blur',
						validator: (rules, value, cb) => {
							if (!this.popForm.play_type) {
								return cb(new Error('请选择礼物播放类型!'))
							}
							return cb()
						}
					}],
					imageUrl: [{
						required: true,
						trigger: 'change',
						validator: (rules, value, cb) => {
							if (!this.imageUrl) {
								return cb(new Error('礼物图片不能为空!'))
							}
							return cb()
						}
					}],
					gift_version: [{
						required: true,
						trigger: 'blur',
						validator: (rules, value, cb) => {
							if (!this.popForm.gift_version) {
								return cb(new Error('版本号不能为空!'))
							}
							return cb()
						}
					}],
					gift_diamond: [{
						required: true,
						trigger: 'blur',
						validator: (rules, value, cb) => {
							if (!this.popForm.gift_diamond) {
								return cb(new Error('钻石价格总数不能为空!'))
							}
							return cb()
						}
					}],
					gift_rateText: [{
						required: true,
						trigger: 'blur',
						validator: (rules, value, cb) => {
							if (!this.popForm.gift_rateText) {
								return cb(new Error('平台分成不能为空!'))
							}
							if (this.popForm.gift_rateText < 1) {
								this.popForm.gift_rateText = 1
								return cb(new Error('平台分成范围1 ~ 100'))
							}
							if (this.popForm.gift_rateText > 100) {
								this.popForm.gift_rateText = 100
								return cb(new Error('平台分成范围1 ~ 100'))
							}
							return cb()
						}
					}],
					start_time: [{
						required: true,
						trigger: 'change',
						validator: (rules, value, cb) => {
							if (!this.popForm.start_timeText) {
								return cb(new Error('礼物生效时间不能为空!'))
							}
							return cb()
						}
					}],
					end_time: [{
						required: true,
						trigger: 'change',
						validator: (rules, value, cb) => {
							if (!this.popForm.end_timeText) {
								return cb(new Error('礼物过期时间不能为空!'))
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
					gift_desc: [{
						required: true,
						trigger: 'blur',
						validator: (rules, value, cb) => {
							if (!this.popForm.gift_desc) {
								return cb(new Error('礼物说明不能为空!'))
							}
							return cb()
						}
					}],
				},
				pickerBeginDateBefore: {
					disabledDate(value) {
						if (new Date(value).getTime() + 3600 * 1000 * 24 < new Date().getTime()) {
							return true
						}
						return false
					}
				},
				statusList: [{
						'label': '全部',
						'value': ''
					}, {
						'label': '正常',
						'value': 1
					},
					{
						'label': '废除',
						'value': 2
					}
				],
				giftGenreList: [{
						'label': '普通礼物',
						'value': 4
					}, {
						'label': '免费礼物',
						'value': 5
					},
					{
						'label': '动效礼物',
						'value': 6
					},
					{
						'label': '全屏礼物',
						'value': 7
					}
				],
				giftPlayList: [{
					'label': 'Lottie',
					'value': 1
				}, {
					'label': 'SVGA',
					'value': 2
				}],
				diamondNum: 0,
				delSource: {},
				delVisible: false,



				isDestoryComp: false // 是否销毁组件
			}
		},
		computed: {
			forms() {
				return [
					{
						name: 'status',
						type: 'select',
						value: '',
						keyName: 'value',
						optionLabel: 'name',
						label: '礼物状态',
						placeholder: '',
						options: MAPDATA.LIBRARYGIFTSLIST,
						handler: {
							change: (v) => {
								// this.searchParams.virtual = v
								// this.getList()
							}
						}
					}
				]
			},
			cfgs() {
				return {
					vm: this,
					url: REQUEST.system.gift.giftList,
					columns: [
						{
							label: '排序',
							width: '95px',
							prop: 'sort'
						},
						{
							label: '礼物名称',
							width: '95px',
							prop: 'gift_name'
						},
						{
							label: '礼物图片',
							isimg: true,
							prop: 'gift_photo',
							// imgWidth: '50px',
							imgHeight: '60px',
							width: '100px',
							height: '70px'
						},
						{
							label: '礼物类型',
							width: '110px',
							render: (h, params) => {
								let data = MAPDATA.SYSTEMGIFTLIST.find(item => { return item.value === params.row.gift_genre })
								return h('span', data ? data.name : '无')
							}
						},
						{
							label: '钻石价格',
							width: '95px',
							prop: 'gift_diamond'
						},
						{
							label: '礼物价值',
							width: '95px',
							render: (h, params) => {
								let text = params.row.gain_price ? params.row.gain_price + '喵粮' : ''
								return h('span', text || '无')
							}
						},
						{
							label: '平台礼物抽成',
							width: '110px',
							render: (h, params) => {
								let text = params.row.gift_rate ? params.row.gift_rate / 100 + '%' : ''
								return h('span', text || '无')
							}
						},
						{
							label: '状态',
							render: (h, params) => {
								let data = MAPDATA.LIBRARYGIFTSLIST.find(item => { return item.value === params.row.status })
								return h('span', {
									style: {
										color: params.row.status === 1 ? '#67C23A' : '#F56C6C'
									}
								}, data ? data.name : '无')
							}
						},
						{
							label: '礼物说明',
							width: '110px',
							render: (h, params) => {
								return h('span', params.row.gift_desc || '无')
							}
						},
						{
							label: '礼物生效时间',
							width: '180px',
							render: (h, params) => {
								return h('span', params.row.start_time ? timeFormat(params.row.start_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
							}
						},
						{
							label: '礼物失效时间',
							width: '180px',
							render: (h, params) => {
								return h('span', params.row.end_time ? timeFormat(params.row.end_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
							}
						},
						{
							label: '礼物添加时间',
							width: '180px',
							render: (h, params) => {
								return h('span', params.row.create_time ? timeFormat(params.row.create_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
							}
						},
						{
							label: '礼物修改时间',
							width: '180px',
							render: (h, params) => {
								return h('span', params.row.create_time ? timeFormat(params.row.create_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
							}
						},
						{
							label: '礼物版本号',
							width: '95px',
							render: (h, params) => {
								return h('span', params.row.gift_version || '无')
							}
						},
						{
							label: '操作',
							width : '120px',
							fixed: 'right',
							render: (h, params) => {
								return h('div', [
									h('el-button', { props : { type: 'primary'}, style: {
										display: params.row.status === 1 ? 'unset' : 'none'
									}, on: {click:()=>{this.handleEdit(params.row)}}}, '修改')
									// h('el-button', { props : { type: 'danger'}, style: {
									// 	display: params.row.status === 2 ? 'unset' : 'none'
									// }, on: {click:()=>{this.handleEdit(params.row)}}}, '删除')
								])
							}
						}
					]
				}
			}
		},
		created() {
			this.giftlist()
		},
		watch: {
			"popForm.play_type": {
				handler(newValue) {
					// this.imageSvgUrl = "";
				},
				deep: true
			}
		},
		methods: {
			// 配置参数
			beforeSearch(params) {
				let s = { ...this.searchParams }
				return {
					page: params.page,
					pagesize: params.size,
					status: s.status
				}
			},
			// 刷新列表
			getList() {
				this.$refs.tableList.getData()
			},
			// 重置
			reset() {
				this.searchParams = {
					status: ''
				}
				this.getList()
			},
			// 查询
			onSearch() {
				this.getList()
			},
			// 新增
			add() {
				this.load('add')
				// this.handleGiftAdd()
			},
			// 修改
			update(row) {
				this.load('update', row)
			},
			load(status, row) {
				this.isDestoryComp = true
				setTimeout(() => {
					this.$refs.giftAdd.loadParams(status, row)
				}, 50);
			},
			// 销毁组件
			destoryComp() {
				this.isDestoryComp = false
			},



			giftlist() {
				this.listLoading = true
				this.srcList = []
				var params = {
					'status': this.filters.status,
					'page': this.page.page,
					'pagesize': this.page.limit
				}
				getGiftList(params).then(response => {
					this.total = response.data.count
					this.list = response.data.list
					this.list.map(res => {
						res.start_timeText = moment(res.start_time * 1000).format('YYYY-MM-DD HH:mm:ss')
						res.end_timeText = moment(res.end_time * 1000).format('YYYY-MM-DD HH:mm:ss')
						res.create_timeText = moment(res.create_time * 1000).format('YYYY-MM-DD HH:mm:ss')
						res.update_timeText = moment(res.update_time * 1000).format('YYYY-MM-DD HH:mm:ss')
						res.gain_priceText = res.gain_price + '喵粮'
						res.gift_rateText = res.gift_rate / 100 + '%'
						switch (res.gift_genre) {
							// case 1:
							// 	res.gift_genreText = '基本礼物'
							// 	break;
							case 2:
								res.gift_genreText = '抽奖礼物'
								break;
							case 3:
								res.gift_genreText = '抽奖包裹内礼物'
								break;
							case 1:
							case 4:
								res.gift_genreText = '普通礼物'
								break;
							case 5:
								res.gift_genreText = '免费礼物'
								break;
							case 6:
								res.gift_genreText = '动效礼物'
								break;
							case 7:
								res.gift_genreText = '全屏礼物'
								break;
						}
						if (res.status == 1) {
							res.statusText = '正常'
						} else if (res.status == 2) {
							res.statusText = '废除'
						}
					})
					this.listLoading = false
				}).catch(err => {
					this.listLoading = false
				})
			},
			showImg(e) {
				if (e.status == 2 && e.gift_gif.length > 0) {
					this.$message.error('礼物已废除')
					return
				}
				this.showImgUrl = ''
				this.$nextTick(res => {
					this.showImgUrl = e.gift_gif
					if (this.showImgUrl.indexOf('.svga') > -1 || this.showImgUrl.indexOf('.png') == -1 ) {
						this.dialogVisible = true
					} else {
						this.$message.warning('暂无特效图')
					}
				})
			},
			handleClose() {
				this.showImgUrl = ''
				this.imageSvgUrl = ''
				this.dialogVisible = false
			},
			handleGiftAdd() {
				this.editTitle = '新增'
				this.imageSvgUrl = ''
				this.imageUrl = ''
				this.diamondNum = 1;
				this.popForm = {
					'gift_name': '',
					'gift_photo': '',
					'gift_gif': '',
					'gift_diamond': '',
					'gift_rate': '',
					'gift_rateText': '',
					'start_time': '',
					'end_time': '',
					'id': '',
					'status': '',
					'sort': '',
					'gift_desc': '',
					'gift_genre': 4,
					'play_type': 1,
					'type': 'Add'
				}
				if (this.$refs['popForm']) {
					this.$refs['popForm'].resetFields()
				}
				this.editPop = true
			},
			handleEdit(row) {
				this.popForm = {
					'gift_name': row.gift_name,
					'gift_photo': row.gift_photo,
					'gift_gif': row.gift_gif,
					'gift_diamond': row.gift_diamond,
					'gift_rateText': row.gift_rate / 100,
					'start_time': row.start_time,
					'end_time': row.end_time,
					'start_timeText': row.start_timeText,
					'end_timeText': row.end_timeText,
					'id': row.id,
					'status': row.status,
					'statusText': row.statusText,
					'sort': row.sort,
					'gift_desc': row.gift_desc,
					'gift_genre': row.gift_genre,
					'play_type': row.play_type,
					'gift_version' : row.gift_version,
					'type': 'Edit'
				}
				this.imageUrl = row.gift_photo
				this.imageSvgUrl = row.gift_gif
				this.editTitle = '修改'
				if (this.$refs['popForm']) {
					this.$refs['popForm'].resetFields()
				}
				this.changeDiamond()
				this.editPop = true
			},
			handleChange() {
				this.popForm.gift_gif = this.imageSvgUrl
				this.popForm.gift_photo = this.imageUrl
				this.popForm.start_time = new Date(this.popForm.start_timeText).getTime()
				this.popForm.end_time = new Date(this.popForm.end_timeText).getTime()
				this.popForm.gift_rate = this.popForm.gift_rateText * 100
				if (this.popForm.type == 'Edit') {
					this.giftEdit()
				} else if (this.popForm.type == 'Add') {
					this.giftAdd()
				}
			},
			handleCancel() {
				this.editPop = false
				this.imageSvgUrl = ''
			},
			giftAdd() {
				this.$refs.popForm.validate(valid => {
					if (valid) {
						const formData = new FormData()
						formData.append('gift_name', this.popForm.gift_name)
						formData.append('gift_diamond', this.popForm.gift_diamond)
						formData.append('gift_rate', this.popForm.gift_rate)
						formData.append('start_time', this.popForm.start_time / 1000)
						formData.append('end_time', this.popForm.end_time / 1000)
						formData.append('sort', this.popForm.sort)
						formData.append('gift_genre', this.popForm.gift_genre)
						formData.append('play_type', this.popForm.play_type)
						formData.append('gift_desc', this.popForm.gift_desc)
						if (this.imageUrl !== '') {
							formData.append('gift_photo', this.imageUrl)
						} else {
							formData.append('gift_photo', '')
						}
						if (this.imageSvgUrl !== '') {
							formData.append('gift_gif', this.imageSvgUrl)
						}
						this.loading = true
						getGiftAdd(formData).then(res => {
							this.$message.success("添加成功")
							this.loading = false
							this.handleEditClose()
							this.giftlist()
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
						formData.append('gift_name', this.popForm.gift_name)
						if (this.imageUrl !== '') {
							formData.append('gift_photo', this.imageUrl)
						} else {
							formData.append('gift_photo', '')
						}
						if (this.imageSvgUrl !== '') {
							formData.append('gift_gif', this.imageSvgUrl)
						}
						formData.append('gift_photo', this.popForm.gift_photo)
						formData.append('gift_gif', this.popForm.gift_gif)
						formData.append('gift_diamond', this.popForm.gift_diamond)
						formData.append('gift_rate', this.popForm.gift_rate)
						formData.append('start_time', this.popForm.start_time / 1000)
						formData.append('end_time', this.popForm.end_time / 1000)
						formData.append('sort', this.popForm.sort)
						formData.append('gift_desc', this.popForm.gift_desc)
						formData.append('gift_genre', this.popForm.gift_genre)
						formData.append('play_type', this.popForm.play_type)
						formData.append('status', this.popForm.status)
						formData.append('gift_version', this.popForm.gift_version)
						this.loading = true
						this.$prompt('请输入二级密码', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
						}).then(res => {
							if (res.value == "888888") {
								getGiftEdit(formData).then(res => {
									this.loading = false
									this.$message.success("修改成功")
									this.handleEditClose()
									this.giftlist()
								}).catch(err => {
									this.loading = false
									this.$message.error(err)
									this.handleEditClose()
								})
							} else {
								this.$message.error("请输入正确的密码")
								this.loading = false
							}
						}).catch(() => {
							this.loading = false
						});
					}
				})
			},
			handleEditClose() {
				this.editPop = false
			},
			getUpLoadImg(source){
				if(source.type == "img"){
					this.imageUrl = source.url;
				}else if(source.type == "animation"){
					this.imageSvgUrl = source.url;
					this.imageSvgInfo = source;
				}
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

				// 计算喵粮
				if (name == 'gift_rateText') {
					this.changeDiamond()
				}
			},
			changeDiamond() {
				var gift_rateText = this.popForm.gift_rateText ? this.popForm.gift_rateText : ''
				var gift_diamond = this.popForm.gift_diamond ? parseInt(this.popForm.gift_diamond) : ''
				if (gift_rateText !== '' && gift_diamond !== '') {
					this.diamondNum = Math.round(gift_diamond - gift_diamond * ((100 - gift_rateText) / 100))
				}
			},
			handleGiftRefresh() {
				this.$prompt('请输入缓存刷新密码', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
				}).then(res => {
					if (res.value == "888888") {
						getGiftRefresh().then(row => {
							console.log(row)
						}).catch(err => {
							this.$message.error(err)
						})
					} else {
						this.$message.error("请输入正确的密码")
					}
				}).catch(() => {});
			},
			handleChangeTime(){ // 时间选择后 动态图被置空 重新赋值
				this.imageSvgUrl = JSON.parse(JSON.stringify(this.imageSvgInfo)).url
			}
		}
	}
</script>
<style lang="scss">
.gift-list-box {
	padding: 20px;
	box-sizing: border-box;
}
</style>
