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
					path: 'wzbxallocation',
					component: () => import('@/views/voiceroom/userActivity/wzbxActivity/allocation'),
					meta: {
						title: '玩转宝箱设置',
					},
					name: 'wzbxallocation'
				},
				{
					path: 'wzbxstatistics',
					component: () => import('@/views/voiceroom/userActivity/wzbxActivity/statistics'),
					meta: {
						title: '玩转宝箱统计',
					},
					name: 'wzbxstatistics'
				},
				{
					path: 'wzbxhistory',
					component: () => import('@/views/voiceroom/userActivity/wzbxActivity/history'),
					meta: {
						title: '玩转宝箱记录',
					},
					name: 'wzbxhistory'
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
					path: 'dwallocation',
					component: () => import('@/views/voiceroom/userActivity/dwActivity/allocation'),
					meta: {
						title: '端午活动配置',
					},
					name: 'dwallocation'
				},
				{
					path: 'dwstatistics',
					component: () => import('@/views/voiceroom/userActivity/dwActivity/statistics'),
					meta: {
						title: '端午统计',
					},
					name: 'dwstatistics'
				}
			]
		},
	]
}

export default userActivity
