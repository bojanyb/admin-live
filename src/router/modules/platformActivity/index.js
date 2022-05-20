/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'
const platformActivityRouter = {
	path: '/platformActivity',
	component: Layout,
	redirect: 'noRedirect',
	name: 'platformActivity',
	meta: {
		title: '平台活动',
		icon: 'people'
	},
	children: [
		{
			path: '/lucky',
			component: () => import('@/views/voiceroom/platformActivity/index'),
			meta: {
				title: '幸运转盘'
			},
			children: [
				{
					path: 'turntableSet',
					component: () => import('@/views/voiceroom/platformActivity/xyzpActivity/turntableSet'),
					meta: {
						title: '幸运转盘设置',
					}
				},
				{
					path: 'turntableCount',
					component: () => import('@/views/voiceroom/platformActivity/xyzpActivity/turntableCount'),
					meta: {
						title: '幸运转盘统计',
					}
				},
				{
					path: 'turntableRecord',
					component: () => import('@/views/voiceroom/platformActivity/xyzpActivity/turntableRecord'),
					meta: {
						title: '幸运转盘记录',
					}
				},
			]
		},
		{
			path: '/mmly',
			component: () => import('@/views/voiceroom/platformActivity/index'),
			meta: {
				title: '喵喵乐园'
			},
			children: [
				{
					path: 'paradiseSet',
					component: () => import('@/views/voiceroom/platformActivity/mmlyActivity/paradiseSet'),
					meta: {
						title: '喵喵乐园设置',
					}
				},
				{
					path: 'paradiseCount',
					component: () => import('@/views/voiceroom/platformActivity/mmlyActivity/paradiseCount'),
					meta: {
						title: '喵喵乐园统计',
					}
				},
				{
					path: 'paradiseRecord',
					component: () => import('@/views/voiceroom/platformActivity/mmlyActivity/paradiseRecord'),
					meta: {
						title: '喵喵乐园记录',
					}
				},
			]
		},
		{
			path: '/zzbx',
			component: () => import('@/views/voiceroom/platformActivity/index'),
			meta: {
				title: '转转宝箱'
			},
			hidden: true,
			children: [
				{
					path: 'allocation',
					component: () => import('@/views/voiceroom/platformActivity/zzbxActivity/allocation'),
					meta: {
						title: '转转宝箱设置',
					}
				},
				{
					path: 'statistics',
					component: () => import('@/views/voiceroom/platformActivity/zzbxActivity/statistics'),
					meta: {
						title: '转转宝箱统计',
					}
				},
				{
					path: 'history',
					component: () => import('@/views/voiceroom/platformActivity/zzbxActivity/history'),
					meta: {
						title: '转转宝箱记录',
					}
				},
			]
		},
	]
}

export default platformActivityRouter
