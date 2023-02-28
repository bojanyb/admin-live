/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const activityRouter = {
	path: '/activity',
	component: Layout,
	redirect: 'noRedirect',
	name: 'activity',
	meta: {
		title: '活动管理',
		icon: 'tree'
	},
	children: [
		{
			path: 'lottery-list',
			component: () => import('@/views/voiceroom/activity/lottery-list.vue'),
			meta: {
				title: '活动抽奖记录',
				noCache: true
			},
			name: 'lottery-list'
		},
    {
			path: 'lottery-list2',
			component: () => import('@/views/voiceroom/activity/lottery-list2.vue'),
			meta: {
				title: '娃娃机2.0',
				noCache: true
			},
			name: 'lottery-list2'
		}
        // {
		// 	path: 'first-charge',
		// 	component: () => import('@/views/voiceroom/platformActivity/first-charge/index.vue'),
		// 	meta: {
		// 		title: '首充活动管理',
		// 		noCache: true
		// 	},
		// 	name: 'first-charge'
		// }
	]
}

export default activityRouter
