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
			path: 'activity-list',
			component: () => import('@/views/voiceroom/activity/activity-list'),
			name: 'ActivityList',
			meta: {
				title: '活动列表',
				noCache: true
			}
		},
		{
			path: 'activity-gift-list',
			component: () => import('@/views/voiceroom/activity/activity-gift-list'),
			name: 'ActivityGiftlist',
			meta: {
				title: '活动礼物列表',
				noCache: true
			}
		},
		{
			path: 'lottery-list',
			component: () => import('@/views/voiceroom/activity/lottery-list'),
			name: 'lotteryList',
			meta: {
				title: '抽奖记录',
				noCache: true
			}
		},
	]
}

export default activityRouter
