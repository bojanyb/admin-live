/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const activityRouter = {
	path: '/activity',
	component: Layout,
	redirect: 'noRedirect',
	name: 'Charts',
	meta: {
		title: '活动管理',
		icon: 'chart'
	},
	children: [{
			path: '/activity-list',
			component: () => import('@/views/voiceroom/activity/activity-list'),
			meta: {
				title: '活动列表',
				noCache: true
			}
		},
		{
			path: '/activity-gift-list',
			component: () => import('@/views/voiceroom/activity/activity-gift-list'),
			meta: {
				title: '活动配置列表',
				noCache: true
			}
		},
		{
			path: '/lottery-list',
			component: () => import('@/views/voiceroom/activity/lottery-list'),
			meta: {
				title: '抽奖记录',
				noCache: true
			}
		},
		{
			path: '/giftHistory',
			component: () => import('@/views/voiceroom/activity/giftHistory/index'),
			meta: {
				title: '赠送'
			},
			children: [
				{
					path: 'giveAway',
					component: () => import('@/views/voiceroom/activity/giftHistory/giveAway'),
					meta: {
						title: '赠送',
					}
				}, 
				{
					path: 'giftHistory-list',
					component: () => import('@/views/voiceroom/activity/giftHistory/giftHistory-list'),
					meta: {
						title: '赠送历史记录',
					}
				}, 
			]
		},
	]
}

export default activityRouter
