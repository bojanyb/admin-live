<template>
	<div class="login-container">
		<div class="animationBox">
			<div v-for="item in animationArr" :class=" 'animationClass' + item " />
		</div>
		<el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on"
			label-position="left">
			<div class="title-container">
				<h3 class="title">直播管理平台</h3>
			</div>
			<el-form-item prop="account">
				<span class="svg-container">
					<svg-icon icon-class="user" />
				</span>
				<el-input ref="account" v-model="loginForm.account" placeholder="请输入账户" name="account" type="text"
					tabindex="1" autocomplete="on" />
			</el-form-item>
			<el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
				<el-form-item prop="password">
					<span class="svg-container">
						<svg-icon icon-class="password" />
					</span>
					<el-input :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType"
						placeholder="请输入密码" name="password" tabindex="2" autocomplete="on" @keyup.native="checkCapslock"
						@blur="capsTooltip = false" @keyup.enter.native="handleLogin" />
					<span class="show-pwd" @click="showPwd">
						<svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
					</span>
				</el-form-item>
			</el-tooltip>
			<el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;"
				@click.native.prevent="handleLogin">登录</el-button>
		</el-form>
	</div>
</template>

<script>
	import SocialSign from './components/SocialSignin'
	export default {
		name: 'Login',
		components: {
			SocialSign
		},
		data() {
			const validateUsername = (rule, value, callback) => {
				if (!value) {
					callback(new Error('账户不能为空'))
				} else {
					callback()
				}
			}
			const validatePassword = (rule, value, callback) => {
				if (!value) {
					callback(new Error('密码不能为空'))
				} else {
					callback()
				}
			}
			return {
				loginForm: {
					account: '',
					password: ''
				},
				loginRules: {
					account: [{
						required: true,
						trigger: 'blur',
						validator: validateUsername
					}],
					password: [{
						required: true,
						trigger: 'blur',
						validator: validatePassword
					}]
				},
				passwordType: 'password',
				capsTooltip: false,
				loading: false,
				redirect: undefined,
				otherQuery: {},
				animationArr: [1, 2, 3, 4, 5, 6, 7, 8, 9]
			}
		},
		watch: {
			$route: {
				handler: function(route) {
					const query = route.query
					if (query) {
						this.redirect = query.redirect
						this.otherQuery = this.getOtherQuery(query)
					}
				},
				immediate: true
			}
		},
		created() {
			// window.addEventListener('storage', this.afterQRScan)
			let arr1 = [
				{
					name: '111'
				}
			]
			let arr2 = [
				{
					name: '222'
				}
			]
			console.log(arr1.concat(arr2), 'arr3')
		},
		mounted() {
			if (this.loginForm.account === '') {
				this.$refs.account.focus()
			} else if (this.loginForm.password === '') {
				this.$refs.password.focus()
			}
		},
		destroyed() {
			// window.removeEventListener('storage', this.afterQRScan)
		},
		methods: {
			checkCapslock(e) {
				const {
					key
				} = e
				this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
			},
			showPwd() {
				if (this.passwordType === 'password') {
					this.passwordType = ''
				} else {
					this.passwordType = 'password'
				}
				this.$nextTick(() => {
					this.$refs.password.focus()
				})
			},
			handleLogin() {
				this.$refs.loginForm.validate(valid => {
					if (valid) {
						this.loading = true
						this.$store.dispatch('user/login', this.loginForm)
							.then(() => {
								this.$router.push({
									path: this.redirect || '/',
									query: this.otherQuery
								})
								this.loading = false
							})
							.catch((err) => {
								this.$message.error(err)
								this.loading = false
							})
						this.loading = false
					} else {
						console.log('error submit!!')
						return false
					}
				})
			},
			getOtherQuery(query) {
				return Object.keys(query).reduce((acc, cur) => {
					if (cur !== 'redirect') {
						acc[cur] = query[cur]
					}
					return acc
				}, {})
			},
			handleRegister() {
				this.$router.push({
					path: '/register'
				})
			}
			// afterQRScan() {
			//   if (e.key === 'x-admin-oauth-code') {
			//     const code = getQueryObject(e.newValue)
			//     const codeMap = {
			//       wechat: 'code',
			//       tencent: 'code'
			//     }
			//     const type = codeMap[this.auth_type]
			//     const codeName = code[type]
			//     if (codeName) {
			//       this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
			//         this.$router.push({ path: this.redirect || '/' })
			//       })
			//     } else {
			//       alert('第三方登录失败')
			//     }
			//   }
			// }
		}
	}
</script>

<style lang="scss">
	/* 修复input 背景不协调 和光标变色 */
	/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

	$bg:#283443;
	$light_gray:#fff;
	$cursor: #fff;

	@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
		.login-container .el-input input {
			color: $cursor;
		}
	}

	/* reset element-ui css */
	.login-container {
		.el-input {
			display: inline-block;
			height: 47px;
			width: 85%;

			input {
				background: transparent;
				border: 0px;
				-webkit-appearance: none;
				border-radius: 0px;
				padding: 12px 5px 12px 15px;
				color: $light_gray;
				height: 47px;
				caret-color: $cursor;

				&:-webkit-autofill {
					box-shadow: 0 0 0px 1000px $bg inset !important;
					-webkit-text-fill-color: $cursor !important;
				}
			}
		}

		.el-form-item {
			border: 1px solid rgba(255, 255, 255, 0.1);
			background: rgba(0, 0, 0, 0.1);
			border-radius: 5px;
			color: #454545;
		}
	}
</style>
<style lang="scss" scoped>
	$bg:#2d3a4b;
	$dark_gray:#889aa4;
	$light_gray:#eee;

	.login-container {
		min-height: 100%;
		width: 100%;
		background: url(../../../public/images/loginBack.png) no-repeat;
		background-size: 100% 100%;
		overflow: hidden;
		position: relative;

		.login-form {
			position: absolute;
			max-width: 520px;
			width: 90%;
			height: 320px;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			margin: auto;
			overflow: hidden;
		}

		.animationBox {
			width: 65%;
			height: 50%;
			float: left;
			position: absolute;
			top: 10%;
			bottom: 0;
			right: 0;
			left: 0;
			margin: auto;
			z-index: 0;

			.animationClass1 {
				width: 35rem;
				height: 35rem;
				background: url(../../../public/images/circle.png) no-repeat center;
				background-size: 100%;
				position: absolute;
				top: 20%;
				left: 50%;
				transform-style: preserve-3d;
				transform: translateX(-50%) rotateX(75deg);
				animation: rotate3 20s linear infinite;
			}

			.animationClass2 {
				width: 15rem;
				height: 15rem;
				position: absolute;
				top: 40%;
				left: 50%;
				transform-style: preserve-3d;
				background: url(../../../public/images/gqright.png) no-repeat center;
				background-size: 100%;
				transform: translateX(-50%) rotateX(75deg);
				animation: rotate3 2s linear infinite;
			}

			.animationClass3 {
				width: 15rem;
				height: 15rem;
				position: absolute;
				top: 42%;
				left: 50%;
				transform-style: preserve-3d;
				background: url(../../../public/images/gqleft.png) no-repeat center;
				background-size: 100%;
				transform: translateX(-50%) rotateX(75deg);
				animation: rotate4 2s linear infinite;
			}

			.animationClass4 {
				width: 12rem;
				height: 12rem;
				position: absolute;
				top: 44%;
				left: 50%;
				transform-style: preserve-3d;
				background: url(../../../public/images/gqbottomright.png) no-repeat center;
				background-size: 100%;
				transform: translateX(-50%) rotateX(75deg);
				animation: rotate3 2s linear infinite;
			}

			.animationClass5 {
				width: 12rem;
				height: 12rem;
				position: absolute;
				top: 46%;
				left: 50%;
				transform-style: preserve-3d;
				background: url(../../../public/images/gqbottomleft.png) no-repeat center;
				background-size: 100%;
				transform: translateX(-50%) rotateX(75deg);
				animation: rotate4 2s linear infinite;
			}

			.animationClass6,
			.animationClass7,
			.animationClass8,
			.animationClass9 {
				width: 5rem;
				height: 5rem;
				position: absolute;
				top: 30%;
				left: 50%;
				z-index: 100;
				margin-left: -2.5rem;
				border-radius: 50%;
				background: url(../../../public/images/circle1.png) no-repeat;
				background-size: 100%;
				animation: rotate5 20s linear infinite;
				color: #f29701;
			}

			.animationClass7 {
				background: url(../../../public/images/circle2.png) no-repeat;
				background-size: 100%;
				animation: rotate6 20s linear infinite;
				color: #0ac1c7;
			}

			.animationClass8 {
				background: url(../../../public/images/circle1.png) no-repeat;
				background-size: 100%;
				animation: rotate7 20s linear infinite;
				color: #f29701;
			}

			.animationClass9 {
				background: url(../../../public/images/circle2.png) no-repeat;
				background-size: 100%;
				color: #0ac1c7;
				animation: rotate8 20s linear infinite;
			}
		}

		.svg-container {
			padding: 6px 5px 6px 15px;
			color: $dark_gray;
			vertical-align: middle;
			width: 30px;
			display: inline-block;
		}

		.title-container {
			position: relative;

			.title {
				font-size: 26px;
				color: $light_gray;
				margin: 0px auto 40px auto;
				text-align: center;
				font-weight: bold;
			}
		}

		.show-pwd {
			position: absolute;
			right: 10px;
			top: 7px;
			font-size: 16px;
			color: $dark_gray;
			cursor: pointer;
			user-select: none;
		}

		.thirdparty-button {
			position: absolute;
			right: 0;
			bottom: 6px;
		}

		@media only screen and (max-width: 470px) {
			.thirdparty-button {
				display: none;
			}
		}
	}
</style>
