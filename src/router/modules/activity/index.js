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
		},
    	{
			path: 'lottery-farm-list',
			component: () => import('@/views/voiceroom/activity/lottery-farm-list.vue'),
			meta: {
				title: '农场抽奖记录',
				noCache: true
			},
			name: 'lottery-farm-list'
		},
    	{
			path: 'lottery-interstellar-list',
			component: () => import('@/views/voiceroom/activity/lottery-interstellar-list.vue'),
			meta: {
				title: '星际穿越抽奖记录',
				noCache: true
			},
			name: 'lottery-interstellar-list'
		},
    	{
			path: 'lottery-interstellar-exchange-list',
			component: () => import('@/views/voiceroom/activity/lottery-interstellar-exchange-list.vue'),
			meta: {
				title: '星际穿越兑换记录',
				noCache: true
			},
			name: 'lottery-interstellar-exchange-list'
		},
    	{
			path: 'week-star-list',
			component: () => import('@/views/voiceroom/activity/week-star-list.vue'),
			meta: {
				title: '周星活动数据',
				noCache: true
			},
			name: 'week-star-list'
		},
    	{
			path: 'week-rank-list',
			component: () => import('@/views/voiceroom/activity/week-rank-list.vue'),
			meta: {
				title: '周星榜单排名数据',
				noCache: true
			},
			name: 'week-rank-list'
		},
		{
			path: 'labour-star-list',
			component: () => import('@/views/voiceroom/activity/labour-star-list.vue'),
			meta: {
				title: '五一劳模活动数据',
				noCache: true
			},
			name: 'labour-star-list'
		},
    	{
			path: 'labour-rank-list',
			component: () => import('@/views/voiceroom/activity/labour-rank-list.vue'),
			meta: {
				title: '五一榜单排名表',
				noCache: true
			},
			name: 'labour-rank-list'
		},
		{
			path: 'jump-star-list',
			component: () => import('@/views/voiceroom/activity/jump-star-list.vue'),
			meta: {
				title: '奇妙跳跳屋抽奖数据',
				noCache: true
			},
			name: 'jump-star-list'
		},
    	{
			path: 'jump-rank-list',
			component: () => import('@/views/voiceroom/activity/jump-rank-list.vue'),
			meta: {
				title: '奇妙跳跳屋榜单排名表',
				noCache: true
			},
		},
		{
			path: 'may-list',
			component: () => import('@/views/voiceroom/activity/may-list.vue'),
			meta: {
				title: '520活动数据',
				noCache: true
			},
			name: 'may-list'
		},
		{
			path: 'dragonBoat-list',
			component: () => import('@/views/voiceroom/activity/dragonBoat-list.vue'),
			meta: {
				title: '端午活动数据',
				noCache: true
			},
			name: 'dragonBoat-list'
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
