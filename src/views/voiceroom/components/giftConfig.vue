<template>
	<div class="giftConfigItem">
		<el-form-item label-width="50px">
			<div class="giftBox fl">
				<div class="giftTitle fl">礼物名称：</div>
				<div class="giftInfo fl">{{popGiftForm.gift_name}}</div>
			</div>
			<div class="giftBox fl">
				<div class="giftTitle fl">礼物图标：</div>
				<div class="giftInfo fl">
					<el-image style="width: 50px;" :lazy="true"
						:src="popGiftForm.gift_photo ? popGiftForm.gift_photo : ''" />
				</div>
			</div>
			<div class="giftBox fl">
				<div class="giftTitle fl">钻石价格：</div>
				<div class="giftInfo fl">{{popGiftForm.gift_diamond}} 钻石</div>
			</div>
			<div class="giftBox fl">
				<div class="giftTitle fl">概率：</div>
				<el-input v-model="popGiftForm.probability" style="width: 120px;" v-input-limit="5" max="100"
					placeholder="请输入概率" clearable autocomplete="off" @input="getChangeProbability2(popGiftForm.id)"
					@change="handleProbability2(popGiftForm)" :disabled="typeName == 'Detail' ? true : false " /> %
			</div>
			<!-- <div class="giftBox fl">
				<div class="giftTitle fl" v-if="typeName == 'Detail'">库存：</div>
				<div class="giftTitle fl" v-else>数量：</div>
				<el-input v-model="popGiftForm.inventory" style="width: 120px;" v-input-limit="0" placeholder="请输入数量"
					clearable autocomplete="off" @change="numberChange(arguments[0],9999,'inventory')"
					@input="numberChange(arguments[0],9999,'inventoryNum')"
					:disabled="typeName == 'Detail' ? true : false " />
			</div> -->
			<div class="giftBox fl" v-if="typeName !== 'Detail'">
				<div class="giftTitle fl">礼物有效期：</div>
				<div class="giftInfo fl">永久</div>
			</div>
			<div class="fl">
				<el-button type="danger" v-if="typeName !== 'Detail'" @click="handleSelectGiftDel(popGiftForm)">删除
				</el-button>
			</div>
			<!-- <div class="giftBox fl" v-if="typeName == 'Detail'">
				<div class="giftTitle fl">添加库存：</div>
				<el-input v-model="inventory" style="width: 120px;" v-input-limit="0" placeholder="请添加库存" clearable
					autocomplete="off" @change="numberChange(arguments[0],9999,'inventoryNum')"
					@input="numberChange(arguments[0],9999,'inventoryNum')" />
			</div>
			<el-button type="success" v-if="typeName == 'Detail'" @click="handleGiftSave(popGiftForm.id)">保 存
			</el-button> -->
		</el-form-item>
		<el-form-item label="礼物属性" :label-width="formLabelWidth" style="float: left;">
			<el-radio-group v-model="popGiftForm.type" @change="handleType(popGiftForm)"
				:disabled="typeName == 'Detail' ? true : false ">
				<el-radio :label="1">大礼物</el-radio>
				<el-radio :label="0">小礼物</el-radio>
			</el-radio-group>
		</el-form-item>
		<el-form-item label="礼物有效期" prop="time_limit" :label-width="formLabelWidth" style="float: left;"
			v-if="typeName == 'Detail'">
			<div class="giftInfo fl">永久</div>
		</el-form-item>
	</div>
</template>
<script>
	import {
		getActivetyGiftAddInventory
	} from '@/api/videoRoom'
	export default {
		name: 'giftConfig',
		props: {
			source: {
				type: Object,
				default: {}
			},
			typeName: {
				type: String,
				default: {}
			},
			activity_id: {
				type: Number,
				default: {}
			},
			gifts: {
				type: Array,
				default: {}
			}
		},
		data() {
			return {
				formLabelWidth: '120px',
				type: 1,
				popGiftForm: {
					"id": this.activity_id,
					"type": this.type,
					"probability": 0,
					// "inventory": 1,
					"time_limit": 0, // 0永久有效1限时
				},
				// inventory: 1,
				probability: 0,
				probabilityBig: 0, // 大礼物最大值
				probabilityBig_last: 0, // 大礼物剩余分配概率数
				bigNum: 0,
				smallNum: 0,
			}
		},
		watch: {
			source(val) {
				this.popGiftForm = val;
			}
		},
		mounted() {
			this.source.probability = parseFloat(this.source.probability).toFixed(5);
			this.popGiftForm = this.source;
			this.getChangeProbability();
		},
		methods: {
			handleSelectGiftDel(row) {
				row.typeName = "Del";
				this.$emit("handleDelSelect", row)
			},
			numberChange(val, maxNum, name) {

				// 转换数字类型
				this.popGiftForm[name] = Number(val)
				// 重新渲染
				this.$nextTick(() => {
					// 比较输入的值和最大值，返回小的
					const num = Math.min(Number(val), maxNum)
					// 输入负值的情况下， = 0（可根据实际需求更该）
					var minNum = 1
					if (num < minNum) {
						if (name == "inventoryNum") {
							this.inventory = minNum;
						} else if (name == "inventory") {
							this.popGiftForm[name] = minNum
						}
					} else {
						// 反之
						if (name == "inventoryNum") {
							this.inventory = num;
						} else if (name == "inventory") {
							this.popGiftForm[name] = num
						}
					}
				})
			},
			handleProbability2(e) {
				let probability = parseFloat(e.probability) > 100 ? 100 : parseFloat(e.probability).toFixed(5);
				this.popGiftForm.probability = probability
			},
			handleType(popGiftForm) {
				this.probabilityBig = 0;
				this.popGiftForm.type = popGiftForm.type;
				this.popGiftForm.probability = parseFloat(0).toFixed(5);
			},
			handleGiftSave(id) {
				const formData = new FormData()
				formData.append('activity_id', this.activity_id);
				formData.append('gift_id', this.popGiftForm.activity_id);
				formData.append('inventory', this.inventory);
				getActivetyGiftAddInventory(formData).then(res => {
					this.$message.success("添加库存成功")
					let sendSource = {
						"id": this.activity_id,
						"typeName": "inventoryAdd"
					}
					this.inventory = 1;
					this.$emit("handleDelSelect", sendSource)
				}).catch(err => {
					this.$message.error(err)
				})
			},
			getChangeProbability(id) {
				this.bigNum = 0;
				this.smallNum = 0;
				this.gifts.map(res => {
					if (res.type == 1) {
						if (id && id == res.activity_type_id) {
							this.probability = res.probability;
							res.probability = 0;
						} else {
							if (res.probability > this.probabilityBig) { // 获取大礼物最大值
								this.probabilityBig = parseInt(res.probability)
							}
							this.bigNum += parseInt(res.probability)
						}
					} else if (res.type == 0) {
						if (id && id == res.activity_type_id) {
							this.probability = res.probability;
							res.probability = 0;
						} else {
							this.smallNum += parseInt(res.probability)
						}
					}
				})
				this.probabilityBig_last = 100 - this.bigNum;
			},
			getChangeProbability2(id) {
				this.probabilityBig = 0;
				this.smallNum = 0;
				this.gifts.map(res => {
					let probability = res.probability;
					if (res.type == 1) {
						if (probability > this.probabilityBig) { // 获取大礼物最大值
							this.probabilityBig = probability
						}
					} else if (res.type == 0) {
						this.smallNum += (probability * 100000) / 100000
					}
				})
				
				let probabilityMaxNum = (this.probabilityBig * 100000/ 100000).toFixed(5) ;
				let smallSumNum = (this.smallNum * 100000/ 100000).toFixed(5) ;
				let maxSamllSum = ((probabilityMaxNum * 100000 + smallSumNum * 100000) / 100000).toFixed(5);
				let row = {
					"probabilityMaxNum" : probabilityMaxNum,
					"smallSumNum" : smallSumNum,
					"maxSamllSum" : maxSamllSum,
				};
				row.typeName = "Probability";
				this.$emit("handleDelSelect", row)
			}
		}
	}
</script>
<style lang="scss">
	.el-dialog {
		width: 80%;
	}

	.giftConfigItem {
		display: flow-root;
	}

	.giftBox {
		margin-right: 15px;
		max-width: 30%;

		.giftTitle {
			max-width: 90px;
			font-weight: 700;
		}

		.giftInfo {
			display: flex;
		}
	}

	.el-image__error {
		height: 50px;
		text-align: center;
		font-size: 12px;
	}
</style>
