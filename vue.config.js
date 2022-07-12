'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
	return path.join(__dirname, dir)
}

const name = defaultSettings.title || '喵喵星球管理平台' // page title

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following method:
// port = 9528 npm run dev OR npm run dev --port = 9528
const port = process.env.port || process.env.npm_config_port || 9528 // dev port

// 定义多环境
const option = {
	// 开发环境
	'--dev': {
		// apiBaseUrl: ''
		publicPath: '/',
		outputDir: 'dist',
		assetsDir: 'static',
		mode: 'development',
	    domainHttps: 'http://api.huixin.info', // https环境地址
	    domainHttp: 'http://m.huixin.info', // app端接口
	  //   domainHttps: 'http://api.huida.vip', // https环境地址
		// domainHttps: 'http://192.168.0.114', // https环境地址
		httpHeader: '', // 后台本地携带
	},
	'--info': {
	  // apiBaseUrl: ''
	  publicPath: '/',
	  outputDir: 'dist',
	  assetsDir: 'static',
	  mode: 'info',
	  domainHttps: 'http://api.huixin.info', // https环境地址
	  domainHttp: 'http://m.huida.vip', // app端接口
	  httpHeader: '', // 后台本地携带
	},
	// 测试环境
	'--test': {
	  publicPath: '/',
	  outputDir: 'dist',
	  assetsDir: 'static',
	  mode: 'test',
	  domainHttps: 'http://api.huida.vip', // https环境地址
	  httpHeader: '', // 后台本地携带
	},
	// 预生产环境
	'--pre': {
	  publicPath: '/',
	  outputDir: 'dist',
	  assetsDir: 'static',
	  mode: 'pre',
	  domainHttps: 'http://api.huidapay.net', // https环境地址
	  httpHeader: '', // 后台本地携带
	},
	// 生产环境
	'--prod': {
	  publicPath: '/',
	  outputDir: 'dist',
	  assetsDir: 'static',
	  mode: 'prod',
	  domainHttps: 'http://api.aiyi.live', // https环境地址
	  httpHeader: '', // 后台本地携带
	}
}

const configObj = option[process.argv[3]]

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
	/**
	 * You will need to set publicPath if you plan to deploy your site under a sub path,
	 * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
	 * then publicPath should be set to "/bar/".
	 * In most cases please use '/' !!!
	 * Detail: https://cli.vuejs.org/config/#publicpath
	 */
	publicPath: configObj.publicPath,
	outputDir: configObj.outputDir,
	assetsDir: configObj.assetsDir,
	lintOnSave: process.env.NODE_ENV === 'development',
	lintOnSave: false,
	productionSourceMap: false,
	devServer: {
		port: port,
		open: true,
		overlay: {
			warnings: false,
			errors: false
		},
		before: require('./mock/mock-server.js'),
		// 开发环境代理配置 解决跨域问题
		// proxy: {
		// 	[process.env.VUE_APP_BASE_API]: { // 是.env.development 文件的 /dev-api
		// 		target: 'http://admin.live.huida.ink',
		// 		chargeOrigin: true, // 开启代理服务器
		// 		pathRewrite: {
		// 			// '^/dev-api': '',
		// 			['^' + process.env.VUE_APP_BASE_API]: '' // /dev-api 替换为空  https://www.easy-mock.com/mock/5f97da2747e82c655543228e/test-admin/dev-api
		// 		}
		// 	}
		// }
	},
	configureWebpack: {
		// provide the app's title in webpack's name field, so that
		// it can be accessed in index.html to inject the correct title.
		name: name,
		resolve: {
			alias: {
				'@': resolve('src')
			}
		}
	},
	chainWebpack(config) {
		// it can improve the speed of the first screen, it is recommended to turn on preload
		// it can improve the speed of the first screen, it is recommended to turn on preload
		config.plugin('preload').tap(() => [{
			rel: 'preload',
			// to ignore runtime.js
			// https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
			fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
			include: 'initial'
		}])

		// when there are many pages, it will cause too many meaningless requests
		config.plugins.delete('prefetch')

		// set svg-sprite-loader
		config.module
			.rule('svg')
			.exclude.add(resolve('src/icons'))
			.end()
		config.module
			.rule('icons')
			.test(/\.svg$/)
			.include.add(resolve('src/icons'))
			.end()
			.use('svg-sprite-loader')
			.loader('svg-sprite-loader')
			.options({
				symbolId: 'icon-[name]'
			})
			.end()

		config
			.when(process.env.NODE_ENV !== 'development',
				config => {
					config
						.plugin('ScriptExtHtmlWebpackPlugin')
						.after('html')
						.use('script-ext-html-webpack-plugin', [{
							// `runtime` must same as runtimeChunk name. default is `runtime`
							inline: /runtime\..*\.js$/
						}])
						.end()
					config
						.optimization.splitChunks({
							chunks: 'all',
							cacheGroups: {
								libs: {
									name: 'chunk-libs',
									test: /[\\/]node_modules[\\/]/,
									priority: 10,
									chunks: 'initial' // only package third parties that are initially dependent
								},
								elementUI: {
									name: 'chunk-elementUI', // split elementUI into a single package
									priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
									test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
								},
								commons: {
									name: 'chunk-commons',
									test: resolve('src/components'), // can customize your rules
									minChunks: 3, //  minimum common number
									priority: 5,
									reuseExistingChunk: true
								}
							}
						})
					// https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
					config.optimization.runtimeChunk('single')
				}
			)
		config.plugin('define')
		.tap(() => [
			{
				// 全局常量
				'HTTPHEADER': JSON.stringify(configObj.httpHeader),
				'ENV_DOMAINHTTPS': JSON.stringify(configObj.domainHttps),
				'ENV_DOMAINHTTP': JSON.stringify(configObj.domainHttp),
				'process.env': {
					NODE_ENV: JSON.stringify(configObj.mode),
					BASE_URL: JSON.stringify(configObj.publicPath)
				}
			}
		])
	}
}
