/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'
const moveDatingRouter = {
	path: '/moveDating',
	component: Layout,
	redirect: 'noRedirect',
	name: 'moveDating',
	meta: {
		title: '心动速配',
    icon: 'el-icon-magic-stick'
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
		},
        {
			path: 'anchor',
			component: () => import('@/views/voiceroom/moveDating/anchor'),
			name: 'anchor',
			meta: {
				title: '心动主播',
				noCache: true
			}
		},
        {
			path: 'history',
			component: () => import('@/views/voiceroom/moveDating/history'),
			name: 'history',
			meta: {
				title: '心动记录',
				noCache: true
			}
		},
		{
			path: 'distribution',
			component: () => import('@/views/voiceroom/moveDating/distribution'),
			name: 'distribution',
			meta: {
				title: '分成配置',
				noCache: true
			}
		},
		{
			path: 'chatRecord',
			component: () => import('@/views/voiceroom/moveDating/chatRecord'),
			name: 'chatRecord',
			meta: {
				title: '畅聊记录',
				noCache: true
			}
		},
	]
}

export default moveDatingRouter
