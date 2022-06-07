<template>
	<div class="dashboard-box">
		<div class="headerBox">
			<div class="select">
				<span v-for="(item,index) in selectList" :key="index" :class="{'high': selectIndex === index}" @click="selectChange(index)">{{ item.name }}</span>
			</div>
			<div class="date" v-show="selectIndex === 0">
				<span>选择时间: </span>
				<el-date-picker class="selectTime" v-model="timer" type="datetimerange" range-separator="至"
					start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions" value-format="timestamp" @change="dateChange" />
			</div>
			<div class="date" v-show="selectIndex === 1">
				<span>选择时间: </span>
				<el-date-picker
				v-model="timer"
				type="date"
				placeholder="选择日期"
				value-format="yyyy-MM-dd"
				@change="timeChange">
				</el-date-picker>
			</div>
		</div>
		<div class="contentBox">
			<item ref="item"></item>
		</div>
	</div>
</template>

<script>

// 引入详情组件
import item from './components/index.vue'
// 引入公共方法
import { timeFormat } from '@/utils/common'

export default {
	components: {
		item
	},
	data() {
		return {
			selectList: [
				{
					name: '总览数据'
				},
				{
					name: '日终数据'
				}
			],
			selectIndex: 0,
			pickerOptions: {
				shortcuts: [{
					text: '今天',
					onClick(picker) {
					let data = new Date()
					let y = data.getFullYear()
					let m = data.getMonth()
					let day = data.getDate()
					if(m + 1 <= 12) {
						m = m + 1
					} else {
						m = 1
					}
					let start = y + '-' + m + '-' + day + ' 00:00:00'
					let end = y + '-' + m + '-' + day + ' 23:59:59'
					picker.$emit('pick', [start, end]);
					}
				}, {
					text: '最近三天',
					onClick(picker) {
					const end = new Date();
					const start = new Date();
					start.setTime(start.getTime() - 3600 * 1000 * 24 * 3);
					picker.$emit('pick', [start, end]);
					}
				}, {
					text: '最近七天',
					onClick(picker) {
					const end = new Date();
					const start = new Date();
					start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
					picker.$emit('pick', [start, end]);
					}
				}, {
					text: '最近十五天',
					onClick(picker) {
					const end = new Date();
					const start = new Date();
					start.setTime(start.getTime() - 3600 * 1000 * 24 * 15);
					picker.$emit('pick', [start, end]);
					}
				}]
			},
			timer: null
		};
	},
	methods: {
		// 切换
		selectChange(index) {
			this.selectIndex = index
			let start_time,end_time;
			this.timer = null
			if(index === 1) {
				let date = timeFormat(new Date(), 'YYYY-MM-DD', false)
				this.timer = new Date(date)
				start_time = Math.floor(new Date(date + ' 00:00:00').getTime() / 1000)
				end_time = Math.floor(new Date(date + ' 23:59:59').getTime() / 1000)
			}
			this.getRoomWalletInfo(start_time,end_time)
		},
		// 切换时间
		dateChange(v) {
			let start_time,end_time;
			start_time = v ? Math.floor(v[0] / 1000) : ''
			end_time = v ? Math.floor(v[1] / 1000) : ''
			this.getRoomWalletInfo(start_time,end_time)
		},
		timeChange(v) {
			let start_time,end_time;
			start_time = v ? Math.floor(new Date(v + ' 00:00:00') / 1000) : ''
			end_time = v ? Math.floor(new Date(v + ' 23:59:59') / 1000) : ''
			this.getRoomWalletInfo(start_time,end_time)
		},
		// 切换时间
		getRoomWalletInfo(start_time = '', end_time = '') {
			this.$refs.item.getRoomWalletInfo(start_time, end_time)
		}
	}
}
</script>

<style lang="scss">
.dashboard-box {
	padding: 30px;
	box-sizing: border-box;
	.headerBox {
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid #ccc;
		margin-bottom: 30px;
		.select {
			display: flex;
			align-items: center;
			>span {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 100px;
				height: 50px;
				cursor: pointer;
				border-bottom: 2px solid rgba(0,0,0,0);
				transform: translateY(1px);
			}
			>span.high {
				border-color: blue;
			}
		}
	}
}
</style>