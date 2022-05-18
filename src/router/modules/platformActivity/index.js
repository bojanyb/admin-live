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
					component: () => import('@/views/voiceroom/platformActivity/turntableSet'),
					meta: {
						title: '幸运转盘设置',
					}
				},
				{
					path: 'turntableCount',
					component: () => import('@/views/voiceroom/platformActivity/turntableCount'),
					meta: {
						title: '幸运转盘统计',
					}
				},
				{
					path: 'turntableRecord',
					component: () => import('@/views/voiceroom/platformActivity/turntableRecord'),
					meta: {
						title: '幸运转盘记录',
					}
				},
			]
		},
		
	]
}

export default platformActivityRouter
