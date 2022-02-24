<template>
	<div id="chartRecordPgae">
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters" @keyup.enter.native="getChatRecordList">
				<el-form-item label="用户ID">
					<el-input v-model="filters.from_id" v-input-limit="0" placeholder="请输入发送消息用户ID" clearable />
				</el-form-item>
				<el-form-item label="群ID">
					<el-input v-model="filters.to_id" v-input-limit="0" placeholder="请输入接收消息群ID" clearable />
				</el-form-item>
				<el-form-item label="选择时间">
					<el-date-picker v-model="timer" type="datetimerange" range-separator="至" start-placeholder="开始日期"
						end-placeholder="结束日期" @change="getChatRecordList">
					</el-date-picker>
				</el-form-item>

				<el-form-item>
					<el-button type="primary" @click="getChatRecordList">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<div id="chartRecord">
			<el-card class="phoneMode">
				<div class="chatListBox" v-if="chatList.length > 0">
					<div class="chatItem" v-for="item in chatList">
						<div class="timeBox" v-if="item.create_time !== '' ">{{item.create_time}}</div>
						<div>
							<div class="userImg fl">
								<img :src="item.remark.face" />
							</div>
							<div class="userChat fl">
								<div class="userChatHead">
									<div class="userName fl">{{ item.remark.nickname }}</div>
									<!-- <div class="userTitle fl">{{item.homeOwer}}</div> -->
								</div>
								<div class="userChatMsg" v-if="item.type == 1 || item.type == 8">{{ item.content }}</div>
								<div class="userChatMsg imgBox" v-else-if="item.type == 2">
									<el-image style="max-width: 239px;" :src="item.content.remoteUrl"
										:preview-src-list="srcShowList">
									</el-image>
								</div>
								<div class="userChatMsg videoBox" v-else-if="item.type == 4">
									<video v-if="item.content.remoteUrl !== '' "  :class="'videoPlayer' + index" :ref="'videoPlayer' + index" controls="true">
										<source :src="item.content.remoteUrl" type="video/mp4">
									</video>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="emptyBox" v-else>
					<div class="emptyImgBox">
						<div class="emptyTextBox">暂无数据</div>
					</div>
				</div>
			</el-card>
		</div>
	</div>
</template>

<script>
	import {
		getChatRecord
	} from "../../../api/videoRoom.js"
	import moment from 'moment'
	export default {
		name: 'chat-record',
		data() {
			return {
				listLoading: false,
				filters: {
					"type": "",
					"notice": "52",
					"start_time": "",
					"end_time": "",
					"from_id": "",
					"to_id": "",
				},
				timer: "",
				page: {
					page: 1,
					// limit: 10
				},
				chatList: [],
				currentChatList: [],
				isFinished: false,
				srcShowList: [],
				currentTime : "",
			}
		},
		created() {
			this.getChatRecordList();
		},
		methods: {
			getChatRecordList() {
				var params = {
					'from_id': this.filters.from_id,
					'to_id': this.filters.to_id,
					'notice': this.filters.notice,
					'start_time': this.timer ? JSON.stringify(new Date(this.timer[0]).getTime() / 1000) : "",
					'end_time': this.timer ? JSON.stringify(new Date(this.timer[1]).getTime() / 1000) : "",
					'page': this.page.page,
					'pagesize': this.page.limit
				}
				getChatRecord(params).then(res => {
					if (res.code == 2000) {
						this.currentChatList = res.data.list;
						if (this.currentChatList.length > 0) {
							this.currentChatList.forEach((item,i) => {
								if(i == 0){
									if(this.page.page == 1){
										this.currentTime = item.create_time;
										item.create_timeText = moment(item.create_time * 1000).format(
											'YYYY-MM-DD HH:mm:ss');
									}else{
										item.create_timeText = "";
									}
								}else{
									
									// 当前内容与上一条显示时间的内容是否超过5分钟
									let separatedNum = (item.create_time - this.currentTime) / 60;
									if(separatedNum > 5){
										this.currentTime = item.create_time;
										item.create_timeText = moment(item.create_time * 1000).format(
											'YYYY-MM-DD HH:mm:ss');
									}else{
										item.create_timeText = "";
									}
								}
								item.remark = JSON.parse(item.remark);	
								if (item.type == 2 || item.type == 4) { // 消息图片类型 预览数据
									item.content = JSON.parse(item.content);
									if(item.type == 2){
										this.srcShowList.push(item.content.remoteUrl);
									}
								}
								console.log(item)
								this.chatList.push(item);
							})
							if (this.chatList.length > 0) {
								this.handleWatchChatDivBottom();
							}
						}
					}
				}).catch(err => {})
			},
			handleWatchChatDivBottom() {
				this.$nextTick(() => {
					const el = document.querySelector('.chatListBox');
					const offsetHeight = el.offsetHeight;
					el.onscroll = () => {
						const scrollTop = el.scrollTop;
						const scrollHeight = el.scrollHeight;
						if ((offsetHeight + scrollTop) - scrollHeight >= -1) {
							if (this.currentChatList.length > 0) {
								this.page.page++;
								this.getChatRecordList();
							} else {
								if (this.isFinished == false) {
									this.$message.success("已全部加载完毕！")
									this.isFinished = true;
								}
							}
						}
					};
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	::v-deep#chartRecordPgae {
		.toolbar {
			padding: 20px;
		}

		#chartRecord {
			position: relative;
			width: 100%;
			// height: calc(100vh - 84px);
			display: flex;
			align-items: center;
			justify-content: center;

			.phoneMode {
				width: 375px;
				height: 667px;
				margin: auto;
				border-radius: 20px;
				border: none;
				box-shadow: 5px 5px 5px 0px rgb(82 63 105 / 60%);
				background: url(../../../assets/chat_bj.png)no-repeat center;
				background-size: 100% 100%;

				.el-card__body {
					width: 100%;
					height: 100%;
					padding: 15px;
					border-radius: 20px;

					.chatListBox {
						width: 100%;
						height: 100%;
						overflow-y: auto;

						.chatItem {
							width: 345px;
							height: auto;
							margin-bottom: 15px;
							display: inline-block;
							
							.timeBox {
								color: #999999;
								font-size: 11px;
								text-align: center;
								margin-bottom: 14.5px;
							}
							
							.userImg {
								width: 34px;
								height: 34px;
								margin-right: 5px;

								img {
									width: 100%;
									height: 100%;
									border-radius: 50%;
								}
							}

							.userChat {
								max-width: 306px;

								.userChatHead {
									height: 13px;
									line-height: 13px;
									margin-bottom: 5px;

									.userName {
										font-size: 11px;
										color: #CCCCCC;
										margin-right: 5px;
									}

									.userTitle {
										font-size: 9px;
										// width: 25px;
										padding: 0 5px;
										height: 13px;
										border-radius: 6.5px;
										background: #3FBCFD;
										border: solid 1px #ffffff;
										color: #FFFFFF;
									}
								}

								.userChatMsg {
									min-height: 39px;
									font-size: 14px;
									color: #FFFFFF;
									padding: 11.75px 11.985px 12.485px 11.75px;
									background: rgba($color: #000000, $alpha: 0.5);
									border-radius: 10px;
									border-top-left-radius: 3px;
								}
							}
						}
					}

					.chatListBox::-webkit-scrollbar {
						width: 0;
					}

					.emptyBox {
						height: 100%;
						margin: auto;
						display: flex;
						align-items: center;
						justify-content: center;

						.emptyImgBox {
							width: 280px;
							height: 280px;
							background: url(../../../assets/all_kong_date2.png)no-repeat center;
							background-size: 100% 100%;
							position: relative;

							.emptyTextBox {
								text-align: center;
								position: absolute;
								bottom: 25%;
								text-align: center;
								width: 100%;
							}
						}
					}
				}
			}
		}
	}
</style>
