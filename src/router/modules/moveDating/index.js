/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'
const moveDatingRouter = {
	path: '/moveDating',
	component: Layout,
	redirect: 'noRedirect',
	name: 'moveDating',
	meta: {
		title: '心动速配',
		icon: 'el-icon-position'
	},
	children: [
		{
			path: 'card',
			component: () => import('@/views/voiceroom/moveDating/card'),
			name: 'card',
			meta: {
				title: '心动卡片配置',
				noCache: true
			}
		},
		{
			path: 'price',
			component: () => import('@/views/voiceroom/moveDating/price'),
			name: 'price',
			meta: {
				title: '心动价格配置',
				noCache: true
			}
		}
	]
}

export default moveDatingRouter
