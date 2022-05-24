<template>
	<div style="width: 178px;height: 178px;">
		<el-upload v-if="type == 'img'" class="aliUpload avatar-uploader" action="#" :show-file-list="false"
			:on-change="doUpload" :auto-upload="false">
			<img v-if="imageUrl !== ''" :src="imageUrl" class="avatar">
			<i v-else class="el-icon-plus avatar-uploader-icon" />
		</el-upload>

		<el-upload v-if="type == 'animation'" class="aliUpload avatar-uploader" action="#" :show-file-list="false"
			:on-change="doUpload" :auto-upload="false">
			<i v-if="imageSvgUrl !== '' && imageSvgUrl.indexOf('.zip') > -1">已选择</i>
			<svgaplayer v-else-if="imageSvgUrl.indexOf('svga') > - 1" :data-title="imageSvgUrl" :height="178"
				:width="178" :show-img="imageSvgUrl" />
			<i v-if="imageSvgUrl == ''" class="el-icon-plus avatar-uploader-icon" />
		</el-upload>

		<el-upload v-if="type == 'file'" class="aliUpload avatar-uploader" action="#" :show-file-list="false"
			:on-change="doUpload" :auto-upload="false">
			<i v-if="fileUrl == '' && progressNum < 100 && progressNum > 0">上传进度: {{progressNum}} %</i>
			<i v-else-if="fileUrl !== '' && progressNum == 100">上传完成</i>
			<i v-else class="el-icon-plus avatar-uploader-icon" />
		</el-upload>
	</div>
</template>

<script>
	import OSS from "ali-oss"
	import md5 from 'js-md5';
	import svgaplayer from '../components/svgaplayer.vue'
	export default {
		name: 'aliUpload',
		data() {
			return {
				imageUrl: "",
				imageSvgUrl: "",
				videoUrl: '',
				fileUrl: '',
				fileNme: '',
				size: '',
				progressNum : 0,
			}
		},
		props: {
			picImg: {
				type: String,
				default: ''
			},
			animationImg: {
				type: String,
				default: ''
			},
			type: {
				type: String,
				default: 'img'
			},
			play_type: {
				type: Number,
				default: 0
			},
			progress: {
				type: Number,
				default: 0
			},
		},
		watch: {
			play_type(val) {
				this.play_type = val;
			},
			"picImg": {
				handler(newValue) {
					this.imageUrl = newValue;
				},
				deep: true
			},
			"animationImg": {
				handler(newValue) {
					this.imageSvgUrl = newValue;
				},
				deep: true
			},

		},
		components: {
			svgaplayer
		},
		mounted() {
			// 静态图文件
			if (this.type == 'img') {
				this.imageUrl = this.picImg;
			}
			// 动效图文件
			if (this.type == 'animation') {
				this.imageSvgUrl = this.animationImg;

			}
			// apk文件方式
			if(this.progress > 0){
				this.progressNum = this.progress;
				this.fileUrl = this.picImg;
			}
			this.client = new OSS({
				region: 'oss-cn-shenzhen',
				success_action_status: '200', // 默认200
				accessKeyId: 'LTAI5tFTcRH7h3RXKoYmnWMk',
				accessKeySecret: 'qdx4B8jIh2VjBgBDG5fNfG0Oj21GSP',
				bucket: 'live-huidapay-net'
			})
		},
		methods: {
			doUpload(event) {
				// this.$emit('getProgress', 0)
				let isUpLoad = false;
				let file = event.raw
				this.size = file.size
				if (this.type == "animation") {
					isUpLoad = this.handleFileType(file.name)
				} else {
					isUpLoad = true // 静态图 默认为true
				}
				if (isUpLoad == true) {
					
					if(file.name.indexOf(".apk") > -1){
						this.fileNme = file.name.split('.apk')[0];
					}
					let tmpArr = file.name.split('.')
					let tmpName = md5(Date.now() + tmpArr[0])
					tmpName = tmpName + '.' + tmpArr[tmpArr.length - 1]

					this.multipartUpload(tmpName, file)
				}
			},
			multipartUpload(upName, upFile) {
				//Vue中封装的分片上传方法（详见官方文档）
				let _this = this
				const progress = async function(p) {
					//项目中需获取进度条，故调用进度回调函数（详见官方文档）
					_this.progressNum = Math.round(p * 100)
					// _this.$emit('getProgress', Math.round(p * 100))
				}
				try {
					let result = _this.client.multipartUpload(upName, upFile, {
						progress
					}).then(res => {
						_this.videoUrl = res.res.requestUrls[0].split('?')[0]
						let info = {}
						info.name = res.name
						info.size = _this.size
						info.videoUrl = _this.videoUrl
						let imgUrl = "http://photo.aiyi.live/" + info.name;
						let params = {
							"type": this.type,
							"url": imgUrl,
							"fileName" : this.fileNme
						}
						this.imageUrl = "";
						this.imageSvgUrl = "";
						this.fileUrl = "";
						switch(this.type){
							case "animation":
								this.imageSvgUrl = imgUrl
							break;
							case "img":
								this.imageUrl = imgUrl
							break;
							case "file":
								this.fileUrl = imgUrl
							break;
						}
						this.$emit("getUpLoadImg", params);
						let head = _this.client.head(upName);
					}).catch(err => {
						console.log(err)
					});

				} catch (e) {
					// 捕获超时异常
					if (e.code === 'ConnectionTimeoutError') {
						console.log("Woops,超时啦!");
					}
					console.log(e)
				}
			},
			handleFileType(fileName) {
				let regex = '',
					isUpLoad = false;
				switch (this.play_type) {
					case 1:
						regex = /(.zip)$/
						break;
					case 2:
						regex = /(.svg|.svga)$/
						break;
					case 3:
						regex = /(.svg|.svga|.zip)$/
						break;
					default:
						break;
				}

				if (regex.test(fileName.toLowerCase())) {
					isUpLoad = true
				} else {
					if (this.play_type == 1) { //Lottie
						this.$message.error('请选择zip格式文件')
						isUpLoad = false
					} else if (this.play_type == 2) {
						this.$message.error('请选择特效svga格式文件')
						isUpLoad = false
					}
				}

				return isUpLoad;
			},
		}
	}
</script>

<style lang="scss" scoped>
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
</style>
