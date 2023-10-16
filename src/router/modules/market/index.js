/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'
const marketRouter = {
	path: '/market',
	component: Layout,
	redirect: 'noRedirect',
	name: 'market',
	meta: {
		title: '市场数据',
		icon: 'el-icon-chat-line-round'
	},
	children: [
		{
			path: 'monitor-link-data',
			component: () => import('@/views/voiceroom/market/index'),
			name: 'monitor-link-data',
			meta: {
				title: '监测链接数据',
				noCache: true
			}
		},
		{
			path: 'online-users',
			component: () => import('@/views/voiceroom/market/onlineUsersList'),
			name: 'online-users',
			meta: {
				title: '在线用户列表',
				noCache: true
			}
		}
	]
}

export default marketRouter
