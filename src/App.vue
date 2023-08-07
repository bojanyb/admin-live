<template>
	<div id="app">
		<router-view />
	</div>
</template>

<script>
	export default {
		name: 'App',
		methods: {
			initStore() {
				let that = this
				//在页面刷新时将vuex里的信息保存到localStorage里
				const permissionList = localStorage.getItem("permissionList");

				//在页面加载时读取localStorage里的状态信息
				permissionList && this.changeOrderData(JSON.parse(permissionList));
				this.$store.commit('user/SET_PERMISSION', permissionList)

				localStorage.removeItem("permissionList");

				// 监听页面关闭
				window.addEventListener("beforeunload",() => {
					let permissionList = that.$store.state.user.permissionList
					localStorage.setItem("permissionList", JSON.stringify(permissionList));
				})
      },
    changeFavicon () {
      let favicon = document.querySelector('link[rel="icon"]')
      if (favicon !== null) {
        favicon.href = process.env.ENV_FAVICON
      } else {
        favicon = document.createElement('link')
        favicon.rel = 'icon'
        favicon.href = process.env.ENV_FAVICON
        document.head.appendChild(favicon)
      }
    },

  },
    mounted() {
      this.changeFavicon()
    },
	}
</script>
<style>
	.pagination-container {
		margin-top: initial;
	}

	.color1 {
		color: #67C23A;
	}

	.color2 {
		color: #E6A23C;
	}

	.color3 {
		color: #409EFF;
	}

	.color4 {
		color: #F56C6C;
	}

	.color5 {
		color: #909399;
	}
</style>
