/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'
const goodNumRouter = {
	path: '/goodNum',
	component: Layout,
	redirect: 'noRedirect',
	name: 'goodNum',
	meta: {
		title: '靓号管理',
		icon: 'el-icon-shopping-bag-1'
	},
	children: [
		{
			path: 'repot-list',
			component: () => import('@/views/voiceroom/goodNum/index'),
			name: 'repot-list',
			meta: {
				title: '靓号仓库',
				noCache: true
			}
		},
		{
			path: 'shop-list',
			component: () => import('@/views/voiceroom/goodNum/shop-list'),
			name: 'shop-list',
			meta: {
				title: '商品列表',
				noCache: true
			}
		},
		{
			path: 'number-list',
			component: () => import('@/views/voiceroom/goodNum/number-list'),
			name: 'number-list',
			meta: {
				title: '靓号列表',
				noCache: true
			}
		},
		{
			path: 'sell-list',
			component: () => import('@/views/voiceroom/goodNum/sell-list'),
			name: 'sell-list',
			meta: {
				title: '售卖记录',
				noCache: true
			}
		}
	]
}

export default goodNumRouter
