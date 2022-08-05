/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'
const promoteRouter = {
	path: '/promote',
	component: Layout,
	redirect: 'noRedirect',
	name: 'promote',
	meta: {
		title: '推广管理',
		icon: 'el-icon-position'
	},
	children: [
		// {
		// 	path: 'invite-list',
		// 	component: () => import('@/views/voiceroom/recommend/list'),
		// 	name: 'invite-list',
		// 	meta: {
		// 		title: '推广列表',
		// 		noCache: true
		// 	},
		// },
		{
			path: 'invite-history',
			component: () => import('@/views/voiceroom/recommend/invite-history'),
			name: 'invite-history',
			meta: {
				title: '推广记录',
				noCache: true
			},
		},
		// {
		// 	path: 'invite-rebates-set',
		// 	component: () => import('@/views/voiceroom/recommend/rebates-set'),
		// 	name: 'invite-rebates-set',
		// 	meta: {
		// 		title: '推广返点设置',
		// 		noCache: true
		// 	},
		// },
	]
}

export default promoteRouter

