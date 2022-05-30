/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const userActivity = {
	path: '/userActivity',
	component: Layout,
	redirect: 'noRedirect',
	name: 'userActivity',
	meta: {
		title: '用户活动',
		icon: 'el-icon-user'
	},
    // hidden: true,
	children: [
		{
			path: '/wzbx',
			component: () => import('@/views/voiceroom/userActivity/index'),
			meta: {
				title: '玩转宝箱'
			},
			children: [
				{
					path: 'allocation',
					component: () => import('@/views/voiceroom/userActivity/wzbxActivity/allocation'),
					meta: {
						title: '玩转宝箱设置',
					}
				},
				{
					path: 'statistics',
					component: () => import('@/views/voiceroom/userActivity/wzbxActivity/statistics'),
					meta: {
						title: '玩转宝箱统计',
					}
				},
				{
					path: 'history',
					component: () => import('@/views/voiceroom/userActivity/wzbxActivity/history'),
					meta: {
						title: '玩转宝箱记录',
					}
				},
			]
		},
		{
			path: '/dw',
			component: () => import('@/views/voiceroom/userActivity/index'),
			meta: {
				title: '端午节活动'
			},
			children: [
				{
					path: 'index',
					component: () => import('@/views/voiceroom/userActivity/dwActivity/index'),
					meta: {
						title: '端午活动统计',
					}
				}
			]
		},
	]
}

export default userActivity
