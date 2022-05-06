<template>
	<div class="app-container">

		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
				<el-form-item>
					<el-button type="success" @click="handleActivityAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<el-table ref="multipleTable" v-loading="listLoading" :data="list" element-loading-text="拼命加载中" border fit
			highlight-current-row>
			<el-table-column label="活动名称" prop="name" align="center" show-overflow-tooltip />
			<el-table-column label="活动类别" prop="typeText" align="center" />
			<el-table-column label="礼物种类数量" prop="gift_count" align="center" />
			<el-table-column label="投入" prop="in" align="center" />
			<el-table-column label="产出" prop="out" align="center" />
			<el-table-column label="单次消耗钻石数" prop="cost" align="center" />
			<el-table-column label="活动状态" prop="statusText" align="center" />
			<el-table-column label="开启时间" prop="start_timeText" align="center" />
			<el-table-column label="结束时间" prop="end_timeText" align="center" />
			<el-table-column label="操作" align="center" width="260">
				<template slot-scope="scope">
					<el-button type="primary" @click="handleEdit(scope.row,scope.$index)">修改</el-button> 
					<el-button type="primary" @click="handleDetails(scope.row)">查看</el-button>
					<el-button type="danger" @click="handleDl(scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!--工具条-->
		<pagination v-show="total>0" :total="total" :page.sync="page.page" :limit.sync="page.limit"
			@pagination="activetyGiftList" />

		<el-dialog :title="editTitle" :visible.sync="editPop" :before-close="handleCancel">
			<div slot="title" class="header-title" style="height: 40px;">
			        <div class="fl">{{editTitle}}</div>
					<!-- <div style="float: right;margin-right: 50px;">单个大礼物概率<span style="color:red;"> {{probabilityMaxNum}}% </span> + 所有小礼物概率<span style="color:red;"> {{smallSumNum}}% </span>总和 {{maxSamllSum}}% <span style="color:red;" v-if="maxSamllSum > 99"> (不超过 99%) </span></div> -->
					<!-- <div style="float: right;margin-right: 50px;">单个大礼物概率 + 所有小礼物概率总和 不超过 99%</div> -->
				</div>
			<el-form :model="popForm" ref="popForm" :rules="popFormRules">
				<el-form-item label="活动名称" prop="activity_type_id" :label-width="formLabelWidth">
					<el-col :span="17">
						<el-select v-model="popForm.activity_type_id" placeholder="请选择"
							:disabled="popForm.typeName == 'Detail' ? true : false ">
							<el-option v-for="item in lotteryName" :key="item.id" :label="item.name" :value="item.id" />
						</el-select>
					</el-col>
				</el-form-item>
				<el-form-item label="活动类别" prop="type" :label-width="formLabelWidth">
					<el-col :span="17">
						<el-select v-model="popForm.type" placeholder="请选择"
							:disabled="popForm.typeName == 'Detail' ? true : false ">
							<el-option v-for="item in lotteryType" :key="item.id" :label="item.name" :value="item.id" />
						</el-select>
					</el-col>
				</el-form-item>
				<el-form-item label="单次抽奖钻石" prop="cost" :label-width="formLabelWidth">
					<el-input v-model="popForm.cost" v-input-limit="0" style="width: 335px;"
						placeholder="请输入单次抽奖钻石(0~9999999)" clearable autocomplete="off"
						:disabled="popForm.typeName == 'Detail' ? true : false " />
				</el-form-item>
				<el-form-item label="开始时间" prop="start_timeText" :label-width="formLabelWidth">
					<el-date-picker v-model="popForm.start_timeText" style="width: 335px;" type="datetime"
						placeholder="选择时间" :picker-options="pickerBeginDateBefore" value-format="yyyy-MM-dd HH:mm:ss"
						format="yyyy-MM-dd HH:mm:ss" clearable
						:disabled="popForm.typeName == 'Detail' ? true : false " />
				</el-form-item>
				<el-form-item label="结束时间" prop="end_timeText" :label-width="formLabelWidth">
					<el-date-picker v-model="popForm.end_timeText" style="width: 335px;" type="datetime"
						placeholder="选择时间" :picker-options="pickerBeginDateBefore" value-format="yyyy-MM-dd HH:mm:ss"
						format="yyyy-MM-dd HH:mm:ss" clearable
						:disabled="popForm.typeName == 'Detail' ? true : false " />
				</el-form-item>
				<el-form-item label="添加礼物" :label-width="formLabelWidth">
					<div class="fl">
						<el-button type="primary" @click="handleAddGiftShow" v-if="popForm.typeName !== 'Detail'">添 加
						</el-button>
					</div>
				</el-form-item>
				<giftConfig v-if="popForm.gifts.length > 0" v-for="item in popForm.gifts" v-model="popForm.gifts"
					:source="item" :activity_id="popForm.activity_type_id" :typeName="popForm.typeName"
					:gifts="popForm.gifts" @handleDelSelect="handleDelSelect"></giftConfig>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="handleCancel" v-if="popForm.typeName !== 'Detail'">取 消</el-button>
				<el-button :loading="loading" type="primary" @click="handleChange">确 定</el-button>
			</div>
		</el-dialog>
		<el-drawer title="礼物库" :visible.sync="drawer" :direction="direction" :before-close="handleClose">
			<div class="giftListBox">
				<el-table ref="giftTable" v-loading="giftLoading" :data="giftListArr" element-loading-text="拼命加载中"
					border fit highlight-current-row>
					<el-table-column label="礼物名称" prop="gift_name" align="center" show-overflow-tooltip />
					<el-table-column label="礼物图片" prop="gift_genre" align="center">
						<template slot-scope="scope">
							<el-image style="width: 50px; " :lazy="true"
								:src="scope.row.gift_photo ? scope.row.gift_photo : ''" />
						</template>
					</el-table-column>
					<el-table-column label="礼物类型" prop="gift_genreText" align="center" />
					<el-table-column label="钻石价格" prop="gift_diamond" align="center" />
					<el-table-column label="操作" align="center">
						<template slot-scope="scope">
							<el-button type="primary" v-if="scope.row.isSelect == false"
								@click="handleSelect(scope.row)">使用</el-button>
						</template>
					</el-table-column>
				</el-table>
				<!--工具条-->
				<pagination v-show="giftTotal>0" :total="giftTotal" :page.sync="giftPage.page"
					:limit.sync="giftPage.limit" @pagination="giftList" />
			</div>
		</el-drawer>
	</div>
</template>

<script>
	import {
		getActivetyList,
		getActivetyGiftSource,
		getActivetyGiftList,
		getActivetyGiftSave,
		getActivetyHasGiftList,
		getActivetyGiftADelete
	} from '@/api/videoRoom'
	import Pagination from '@/components/Pagination'
	import moment from 'moment'
	import giftConfig from '../components/giftConfig.vue'
	export default {
		name: 'GiftList',
		components: {
			Pagination,
			giftConfig
		},
		data() {
			return {
				list: [],
				listLoading: true,
				total: 0,
				giftTotal: 0,
				page: {
					page: 1,
					limit: 10
				},
				giftPage: {
					page: 1,
					limit: 10
				},
				showImgUrl: '',
				editTitle: '',
				editPop: false,
				loading: false,
				giftLoading: false,
				formLabelWidth: '120px',
				imageUrl: '',
				popForm: {
					'activity_type_id': "",
					'type': '',
					'start_time': 0,
					'end_time': 0,
					'start_timeText': '',
					'end_timeText': '',
					"gifts": [],
					"cost": 0,
					'typeName': 'Add'
				},
				popFormRules: {
					activity_type_id: [{
						required: true,
						trigger: 'blur',
						validator: (rules, value, cb) => {
							if (!this.popForm.activity_type_id || this.popForm.activity_type_id == "") {
								return cb(new Error('活动名称不能为空!'))
							}
							return cb()
						}
					}],
					type: [{
						required: true,
						trigger: 'change',
						validator: (rules, value, cb) => {
							if (this.popForm.type == "") {
								return cb(new Error('活动类别不能为空!'))
							}
							return cb()
						}
					}],
					start_timeText: [{
						required: true,
						trigger: 'change',
						validator: (rules, value, cb) => {
							if (!this.popForm.start_timeText || this.popForm.start_timeText == "") {
								return cb(new Error('活动生效时间不能为空!'))
							}
							if (this.popForm.start_time > this.popForm.end_time) {
								return cb(new Error('开始时间不能大于结束时间!'))
							}
							return cb()
						}
					}],
					end_timeText: [{
						required: true,
						trigger: 'change',
						validator: (rules, value, cb) => {
							if (!this.popForm.end_timeText || this.popForm.end_timeText == "") {
								return cb(new Error('活动结束时间不能为空!'))
							}
							if (this.popForm.start_time > this.popForm.end_time) {
								return cb(new Error('开始时间不能大于结束时间!'))
							}
							return cb()
						}
					}],
					cost: [{
						required: true,
						trigger: 'blur',
						validator: (rules, value, cb) => {
							if (this.popForm.cost == "") {
								return cb(new Error('单次抽奖钻石不能为空!'))
							}
							if (this.popForm.cost < 1) {
								this.popForm.cost = 1
								return cb(new Error('单次抽奖钻石范围1 ~ 9999999'))
							}
							if (this.popForm.cost > 9999999) {
								return cb(new Error('单次抽奖钻石范围1 ~ 9999999'))
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
				imageFile: '',
				diamondNum: 0,
				delVisible: false,
				editIndex: "",
				giftListArr: [],
				lotteryName: [],
				lotteryType: [{
						"id": 1,
						"name": "背包"
					},
					{
						"id": 2,
						"name": "派对"
					}
				],
				drawer: false,
				direction: 'rtl',
				probabilityMaxNum : 0,
				smallSumNum : 0,
				maxSamllSum : 0,
			}
		},
		created() {
			this.activetyList();
			this.giftList();
			this.activetyGiftList()
		},
		methods: {
			activetyList() {
				getActivetyList().then(res => {
					if (res.data.list.length > 0) {
						res.data.list.map(res => {
							res.start_timeText = moment(res.start_time * 1000).format(
								'YYYY-MM-DD HH:mm:ss')
							res.end_timeText = moment(res.end_time * 1000).format('YYYY-MM-DD HH:mm:ss')
						})
						this.lotteryName = res.data.list;
					}
				}).catch(err => {})
			},
			giftList() {
				var params = {
					'page': this.giftPage.page,
					'pagesize': this.giftPage.limit
				}
				this.giftListArr = [];
				getActivetyGiftSource(params).then(res => {
					this.giftTotal = res.data.count;
					res.data.list.map(re=>{
						switch (re.gift_genre) {
							case 1:
							re.gift_genreText = '基本礼物'
								break;
							case 2:
							re.gift_genreText = '抽奖礼物'
								break;
							case 3:
							re.gift_genreText = '抽奖包裹内礼物'
								break;
							case 4:
							re.gift_genreText = '普通礼物'
								break;
							case 5:
							re.gift_genreText = '免费礼物'
								break;
							case 6:
							re.gift_genreText = '动效礼物'
								break;
							case 7:
							re.gift_genreText = '全屏礼物'
								break;
						}
					})
					this.giftListArr = res.data.list;
					this.giftSelectSource();
				}).catch(err => {})
			},
			activetyGiftList() {
				this.listLoading = true
				this.srcList = []
				var params = {
					'page': this.page.page,
					'pagesize': this.page.limit
				}
				getActivetyGiftList(params).then(response => {
					this.total = response.data.count
					this.list = response.data.list
					this.list.map(res => {
						let currentTime = moment().unix();
						switch (res.type) {
							case 1:
								res.typeText = '背包';
								break;
							case 2:
								res.typeText = '派对';
								break;
						}
						
						if(currentTime > res.end_time){ // 当前时间大于结束时间 为活动结束状态
							res.status = 2;
						}
						switch (res.status) {
							case 0:
								res.statusText = "未开始";
								break;
							case 1:
								res.statusText = "开始中";
								break;
							case 2:
								res.statusText = "已结束";
								break;
							case 3:
								res.statusText = "特殊停止";
								break;
						}
						
						let start_time = JSON.stringify(res.start_time).length > 10 ? res.start_time : (res
							.start_time * 1000);
						let end_time = JSON.stringify(res.end_time).length > 10 ? res.end_time : (res
							.end_time * 1000);
						res.start_timeText = moment(start_time).format('YYYY-MM-DD HH:mm:ss')
						res.end_timeText = moment(end_time).format('YYYY-MM-DD HH:mm:ss')
					})
					this.listLoading = false
				}).catch(err => {
					this.listLoading = false
				})
			},
			activetyHasGiftList(id) {
				var params = {
					"activity_id": id
				}
				getActivetyHasGiftList(params).then(res => {
					res.data.list.map(re => {
						re.probability = re.probability / 100000
					})
					this.popForm.gifts = res.data.list;
					this.$forceUpdate();
				}).catch(err => {})
			},
			handleActivityAdd() {
				this.editTitle = '新增'
				this.imageUrl = ''
				this.popForm = {
					'activity_type_id': 1,
					'type': '',
					"cost": 0,
					'start_time': 0,
					'end_time': 0,
					"gifts": [],
					'typeName': 'Add'
				}
				let giftListArr = JSON.parse(JSON.stringify(this.giftListArr));
				giftListArr.map(res => {
					res.isSelect = false;
				})
				this.giftListArr = giftListArr;
				if (this.$refs['popForm']) {
					this.$refs['popForm'].resetFields()
				}
				this.editPop = true
			},
			handleEdit(row, index) {
				this.activetyHasGiftList(row.id);
				this.editIndex = index;
				let start_time = JSON.stringify(row.start_time).length > 10 ? row.start_time : (row.start_time * 1000);
				let end_time = JSON.stringify(row.end_time).length > 10 ? row.end_time : (row.end_time * 1000);
				this.popForm = {
					'activity_type_id': row.activity_type_id,
					'type': row.type,
					'start_time': row.start_time,
					'end_time': row.end_time,
					'start_timeText': moment(start_time).format('YYYY-MM-DD HH:mm:ss'),
					'end_timeText': moment(end_time).format('YYYY-MM-DD HH:mm:ss'),
					'id': row.id,
					'cost': row.cost,
					'gifts': this.popForm.gifts,
					'typeName': 'Edit'
				}
				this.editTitle = '修改'
				if (this.$refs['popForm']) {
					this.$refs['popForm'].resetFields()
				}
				this.giftSelectSource();
				this.editPop = true
			},
			handleChange() {
				this.popForm.start_time = this.popForm.start_timeText ? new Date(this.popForm.start_timeText).getTime() :
					""
				this.popForm.end_time = this.popForm.end_timeText ? new Date(this.popForm.end_timeText).getTime() : ""
				if (this.popForm.gifts.length == 0) {
					this.$message.error("礼物配置不能为空");
					return
				}
				if (this.popForm.typeName == 'Edit') {
					this.activityEdit()
				} else if (this.popForm.typeName == 'Add') {
					this.activityAdd()
				} else if (this.popForm.typeName == 'Detail') {
					this.editPop = false
				}
			},
			handleCancel() {
				if (this.popForm.typeName == 'Detail') {
					this.editPop = false
				} else {
					this.$confirm('关闭后数据不会保存，确定关闭吗？')
						.then(res => {
							// 去掉礼物库已选择状态
							this.giftListArr.map(re => {
								re.isSelect = false;
							})
							this.loading = false
							this.editPop = false
						}).catch(err => {});
				}
			},
			activityAdd() {
				this.$refs.popForm.validate(valid => {
					if (valid) {
						this.loading = true
						var params = {
							"activity_type_id": this.popForm.activity_type_id,
							"end_time": this.popForm.end_time / 1000,
							"start_time": this.popForm.start_time / 1000,
							"type": this.popForm.type,
							'cost': parseInt(this.popForm.cost),
							"gifts": JSON.parse(JSON.stringify(this.popForm.gifts))
						}
						let maxBigNum = 0,
							bigSum = 0,
							smallSum = 0,
							bigSmallSum = 0,
							isBigEmpty = false,
							bigGiftDiamond = 0,
							bigGiftProbability = 0,
							isBigConsistent = false,
							isSmallEmpty = false;
						params.gifts.map(re => {
							re.id = re.activity_type_id;
							delete re.gift_name
							delete re.gift_photo
							delete re.status
							delete re.time_limit
							delete re.activity_type_id
							re.id = re.activity_id;
							if (re.probability > maxBigNum) {
								maxBigNum = parseFloat(re.probability);
							}
							if (re.type == 1) { // 大礼物
								if (re.probability == 0) {
									isBigEmpty = true;
								}else{
									if(bigGiftProbability == 0){ // 大礼物概率
										bigGiftProbability = parseFloat(re.probability)
										bigSum += parseFloat(re.probability);
									}else{
										if(bigGiftProbability !== parseFloat(re.probability)){
											isBigConsistent = true
										}
									}
									if (bigGiftDiamond == 0) {
										bigGiftDiamond = parseInt(re.gift_diamond)
									}else{
										if(bigGiftDiamond !== parseInt(re.gift_diamond)){
											isBigConsistent = true
										}
									}
								}
							}

							if (re.type == 0) { // 小礼物
								smallSum += parseFloat(re.probability);
								if (re.probability == 0) {
									isBigEmpty = true;
								}
								bigSum += parseFloat(re.probability);
							}
							
							re.probability = re.probability * 100000
						})
						bigSmallSum = smallSum + maxBigNum;
						if (isBigEmpty == true) {
							this.$message.error("礼物概率不能为0");
							this.loading = false
							return
						}
						if(isBigConsistent == true){
							this.$message.error("所有大礼物价格和概率必须一致");
							this.loading = false
							return
						}
						if (bigSum > 100) {
							this.$message.error("一个大礼物和所有小礼物概率之和最大为100%");
							this.loading = false
							return
						}
						getActivetyGiftSave(params).then(res => {
							this.loading = false
							this.editPop = false
							this.activetyGiftList()
						}).catch(err => {
							this.$message.error(err);
							this.loading = false
						})
					}
				})
			},
			activityEdit(row) {
				this.$refs.popForm.validate(valid => {
					if (valid) {
						this.loading = true
						var params = {
							"activity_type_id": this.popForm.activity_type_id,
							"end_time": this.popForm.end_time / 1000,
							"start_time": this.popForm.start_time / 1000,
							"type": this.popForm.type,
							"id": this.popForm.id,
							'cost': parseInt(this.popForm.cost),
							"gifts": JSON.parse(JSON.stringify(this.popForm.gifts))
						}
						let maxBigNum = 0,
							bigSum = 0,
							smallSum = 0,
							bigSmallSum = 0,
							isBigEmpty = false,
							bigGiftDiamond = 0,
							bigGiftProbability = 0,
							isBigConsistent = false,
							isSmallEmpty = false;
						params.gifts.map(re => {
							delete re.gift_name
							delete re.gift_photo
							// delete re.gift_diamond
							delete re.status
							delete re.time_limit
							re.id = re.activity_id ? re.activity_id : re.id;
							if (re.probability > maxBigNum) {
								maxBigNum = parseFloat(re.probability);
							}
							if (re.type == 1) { // 大礼物
								if (re.probability == 0) {
									isBigEmpty = true;
								}else{
									if(bigGiftProbability == 0){ // 大礼物概率
										bigGiftProbability = parseFloat(re.probability)
										bigSum += parseFloat(re.probability);
									}else{
										if(bigGiftProbability !== parseFloat(re.probability)){
											isBigConsistent = true
										}
									}
									if (bigGiftDiamond == 0) {
										bigGiftDiamond = parseInt(re.gift_diamond)
									}else{
										if(bigGiftDiamond !== parseInt(re.gift_diamond)){
											isBigConsistent = true
										}
									}
								}
							}
							if (re.type == 0) { // 小礼物
								smallSum += parseFloat(re.probability);
								if (re.probability == 0) {
									isBigEmpty = true;
								}
								bigSum += parseFloat(re.probability);
							}
							if (re.activity_type_id) {
								re.id = re.activity_type_id;
								delete re.activity_type_id
							}
							re.probability = re.probability * 100000
							if (re.type == 0 && re.probability == 0) {
								isSmallEmpty = true
							}
						})
						bigSmallSum = smallSum + maxBigNum;
						if (isBigEmpty == true) {
							this.$message.error("礼物概率不能为0");
							this.loading = false
							return
						}
						if(isBigConsistent == true){
							this.$message.error("所有大礼物价格和概率必须一致");
							this.loading = false
							return
						}
						if (bigSum > 100) {
							this.$message.error("一个大礼物和所有小礼物概率之和最大为100%");
							this.loading = false
							return
						}
						
						getActivetyGiftSave(params).then(res => {
							this.loading = false
							this.editPop = false
							this.$message.success("修改成功");
							this.activetyGiftList()
						}).catch(err => {
							this.$message.error(err);
							this.loading = false;
						})
					}
				})
			},
			handleDetails(row) {
				this.activetyHasGiftList(row.id);
				this.popForm = {
					'activity_type_id': row.id,
					'type': row.type,
					'cost': row.cost,
					'start_time': row.start_time,
					'end_time': row.end_time,
					'start_timeText': moment(row.start_time * 1000).format('YYYY-MM-DD HH:mm:ss'),
					'end_timeText': moment(row.end_time * 1000).format('YYYY-MM-DD HH:mm:ss'),
					'id': row.id,
					'gifts': row.gifts,
					'typeName': 'Detail'
				}
				this.editTitle = '详情'
				if (this.$refs['popForm']) {
					this.$refs['popForm'].resetFields()
				}
				this.editPop = true
			},
			handleDl(row) {
				let currentTime = this.timest();
				if (row.status !== 1 || currentTime < row.start_time || currentTime > row.end_time){
					this.$confirm('确认删除当前活动？')
					.then(_ => {
						var params = { "id" : row.id}
						getActivetyGiftADelete(params).then(res=>{
							this.$message.success("删除成功");
							this.page.page = 1;
							this.activetyGiftList();
						}).catch(err=>{
							this.$message.error(err)
						})
					})
					.catch(_ => {});
				}
				else {
					this.$message.error("请先关闭活动！")
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
			},
			handleAddGiftShow() {
				this.giftSelectSource();
				this.drawer = true
			},
			handleClose(done) {
				this.$confirm('确认关闭礼物库？')
					.then(_ => {
						done();
					})
					.catch(_ => {});
			},
			handleSelect(row) {
				let currentGift = {};
				this.giftListArr.map(res => {
					if (res.id == row.id) {
						res.isSelect = true; // 默认当前礼物未被选中
						// currentGift.activity_type_id = parseInt(row.id);
						currentGift.id = row.id;
						currentGift.activity_id = row.id;
						currentGift.gift_name = row.gift_name;
						currentGift.gift_photo = row.gift_photo;
						currentGift.gift_diamond = row.gift_diamond;
						currentGift.type = 1
						currentGift.time_limit = 0
						currentGift.status = 0 // 0可用1不可用
						currentGift.inventory = 0
						currentGift.probability = 0
						this.popForm.gifts.push(currentGift)
					}
				})
				
				this.popForm.gifts = JSON.parse(JSON.stringify(this.popForm.gifts));
				
				/* 多条勾选打印结算单会出现重复的结算单号 去重处理 */
				this.popForm.gifts = new Set(this.popForm.gifts);
				this.popForm.gifts = Array.from(this.popForm.gifts);
			},
			handleDelSelect(row) {
				if (row.typeName == "Del") { // 删除礼物库中选中的礼物
					this.popForm.gifts.map((res, i) => {
						if (res.activity_id == row.activity_id) {
							this.popForm.gifts.splice(i, 1);
						}
					})
					
					this.giftListArr.map(res => {
						if (res.activity_id == row.activity_id) {
							res.isSelect = false;
						}
					})
					
				} else if (row.typeName == "inventoryAdd") { // 更新礼物库存
					this.activetyHasGiftList(row.activity_id);
				} else if(row.typeName == "Probability"){ // 监听概率
					this.probabilityMaxNum = row.probabilityMaxNum;
					this.smallSumNum = row.smallSumNum;
					this.maxSamllSum = row.maxSamllSum;
				}
			},
			giftSelectSource() {
				this.giftListArr.map(re => {
					re.isSelect = false; // 默认当前礼物未被选中
					if (this.popForm.gifts.length > 0) {
						this.popForm.gifts.map(item => {
							if (item.id == re.id || item.id == re.id) {
								re.isSelect = true;
							}
						})
					}
				})
			},
			timest() {
				var tmp = Date.parse(new Date()).toString();
				tmp = parseInt(tmp.substr(0, 10));
				return tmp;
			}
		}
	}
</script>
<style scoped="scoped" lang="scss">
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

	.avatar-uploader {
		width: 178px;
		height: 178px;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px dashed #eeeeee;
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
	}

	.avatar {
		width: auto;
		max-width: 178px;
		height: 178px;
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

		.el-dialog__body {
			overflow-y: scroll;
			height: 700px;
			overflow-x: initial;
		}

		.el-dialog__body::-webkit-scrollbar {
			width: 0;
		}
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

	::v-deep .el-drawer {
		width: 35% !important;

		.giftListBox {
			width: 100%;

			.el-table {
				width: 90%;
				margin: auto;
			}
		}
	}
</style>
