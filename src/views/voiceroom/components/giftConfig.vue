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
				<el-input v-model="popGiftForm.probability" style="width: 120px;" v-input-limit="0" placeholder="请输入概率"
					clearable autocomplete="off" @change="handleProbability"
					:disabled="typeName == 'Detail' ? true : false " /> %
			</div>
			<div class="giftBox fl">
				<div class="giftTitle fl" v-if="typeName == 'Detail'">库存：</div>
				<div class="giftTitle fl" v-else>数量：</div>
				<el-input v-model="popGiftForm.inventory" style="width: 120px;" v-input-limit="0" placeholder="请输入数量"
					clearable autocomplete="off" @change="numberChange(arguments[0],9999,'inventory')"
					@input="numberChange(arguments[0],9999,'inventoryNum')"
					:disabled="typeName == 'Detail' ? true : false " />
			</div>
			<div class="giftBox fl" v-if="typeName !== 'Detail'">
				<div class="giftTitle fl">礼物有效期：</div>
				<div class="giftInfo fl">永久</div>
			</div>
			<div class="fl"><el-button type="danger" v-if="typeName !== 'Detail'" @click="handleSelectGiftDel(popGiftForm)">删除</el-button></div>
			<div class="giftBox fl" v-if="typeName == 'Detail'">
				<div class="giftTitle fl">添加库存：</div>
				<el-input v-model="inventory" style="width: 120px;" v-input-limit="0" placeholder="请添加库存" clearable
					autocomplete="off" @change="numberChange(arguments[0],9999,'inventoryNum')"
					@input="numberChange(arguments[0],9999,'inventoryNum')" />
			</div>
			<el-button type="success" v-if="typeName == 'Detail'" @click="handleGiftSave(popGiftForm.id)">保 存</el-button>
		</el-form-item>
		<el-form-item label="礼物属性" :label-width="formLabelWidth" style="float: left;">
			<el-radio-group v-model="popGiftForm.type" @change="handleType" :disabled="typeName == 'Detail' ? true : false ">
				<el-radio :label="1">大礼物</el-radio>
				<el-radio :label="2">小礼物</el-radio>
			</el-radio-group>
		</el-form-item>
		<el-form-item label="礼物有效期" prop="time_limit" :label-width="formLabelWidth" style="float: left;">
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
			gifts:{
				type: Array,
				default: {}
			}
		},
		data() {
			return {
				formLabelWidth: '120px',
				type: 1,
				popGiftForm: {
					"id": this.source.id,
					"type": this.type,
					"probability": 0,
					"inventory": 1,
					"time_limit": 0, // 0永久有效1限时
				},
				inventory: 1,
				probabilityBig: 0,  // 大礼物最大值
				probabilitySmallMax: 0, // 小礼物最大值
				probabilityBig_last: 0, // 大礼物剩余分配概率数
				probabilitySmall_last: 0, // 小礼物剩余分配概率数
				bigNum : 0,
				smallNum : 0,
			}
		},
		watch:{
			source(val){
				this.popGiftForm = val;
			}
		},
		mounted() {
			this.source.probability = this.source.probability / 100000;
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
			handleProbability(e) {  // 概率
			this.probabilityBig = 0;
			this.probabilitySmallMax = 0;
			this.probabilityBig_last = 0;
			this.probabilitySmall_last = 0;
			this.probabilityBig_last = 0;
				if (e >= 100) {
					console.log(this.bigNum)
					this.popGiftForm.probability = 100;
				} else {
					this.getChangeProbability();
					if(this.popGiftForm.type == 1) { // 大礼物
						if(this.probabilityBig_last < 0){
							this.$message.error("大礼物概率之和最大100%");
							this.popGiftForm.probability = e + this.probabilityBig_last;
						}else {
							this.popGiftForm.probability = e
						}
					}
					if(this.popGiftForm.type == 2){ // 小礼物
						if(this.probabilitySmall_last < 0){
							this.$message.error("小礼物概率之和最大值为" + this.probabilitySmallMax +'%');
							this.popGiftForm.probability = e + this.probabilitySmall_last;
						}else {
							this.popGiftForm.probability = e
						}
					}
				}
			},
			handleType(value) {
				this.probabilityBig = 0;
				this.popGiftForm.type = value
				this.getChangeProbability()
			},
			handleGiftSave(id){
				const formData = new FormData()
				formData.append('activity_id', this.activity_id);
				formData.append('gift_id', this.popGiftForm.id);
				formData.append('inventory', this.inventory);
				getActivetyGiftAddInventory(formData).then(res=>{
					this.$message.success("添加库存成功")
					let sendSource = {
						"id" : this.activity_id,
						"typeName" : "inventoryAdd"
					}
					this.inventory = 1;
					this.$emit("handleDelSelect", sendSource)
				}).catch(err=>{
					this.$message.error(err)
				})
			},
			getChangeProbability(){
				this.bigNum = 0;this.smallNum = 0;
				this.gifts.map(res=>{
					if(res.type == 1){
						if(res.probability > this.probabilityBig){ // 获取大礼物最大值
							this.probabilityBig = res.probability
						}
						this.bigNum += res.probability
					}else if(res.type == 2){
						this.smallNum += res.probability
					}
				})
				
				console.log(this.bigNum)
				this.probabilityBig_last = 100 - this.bigNum;
				this.probabilitySmallMax = this.probabilityBig < 100 ? (99 - this.probabilityBig) : 0;
				this.probabilitySmall_last = this.probabilitySmallMax - this.smallNum;
			}
		}
	}
</script>
<style lang="scss">
	.el-dialog {
		width: 80%;
	}
	.giftConfigItem{
		display: inline-block;
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
	.el-image__error{
		height: 50px;
		text-align: center;
		font-size: 12px;
	}
</style>
