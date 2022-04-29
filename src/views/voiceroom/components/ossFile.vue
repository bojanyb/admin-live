<template>
	<el-upload class="aliUpload avatar-uploader" action="#" :show-file-list="false" :on-change="doUpload"
		:auto-upload="false">
		<img v-if="imageUrl" :src="imageUrl" class="avatar">
		<i v-else class="el-icon-plus avatar-uploader-icon" />
	</el-upload>
</template>

<script>
	import OSS from "ali-oss"
	import md5 from 'js-md5';
	export default {
		name: 'aliUpload',
		data() {
			return {
				imageUrl: "",
				videoUrl: '',
				size: '',
			}
		},
		props: {
			picImg: {
				type: String,
				default: ''
			},
		},
		watch: {
			picImg(val) {
				this.imageUrl = val;
			}
		},
		mounted() {
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
				let file = event.raw
				this.size = file.size
				let tmpArr = file.name.split('.')
				let tmpName = md5(Date.now() + tmpArr[0])
				tmpName = tmpName + '.' + tmpArr[1]
				this.multipartUpload(tmpName, file)
			},
			multipartUpload(upName, upFile) {
				//Vue中封装的分片上传方法（详见官方文档）
				let _this = this
				const progress = async function(p) {
					//项目中需获取进度条，故调用进度回调函数（详见官方文档）
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
						this.imageUrl = "http://photo.aiyi.live/" + info.name;
						this.$emit("getUpLoadImg", this.imageUrl);
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

		}
	}
</script>

<style lang="scss" scoped>
</style>
