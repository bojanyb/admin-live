/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'
const activityManagerRouter = {
	path: '/activityManager',
	component: Layout,
	redirect: 'noRedirect',
	name: 'activityManager',
	meta: {
		title: '活动配置',
		icon: 'el-icon-bangzhu'
	},
	children: [
		{
			path: 'resources-list',
			component: () => import('@/views/voiceroom/activityManager/resources-list'),
			name: 'resources-list',
			meta: {
				title: '资源位配置',
				noCache: true
			}
		},
    {
			path: 'prayLottery-list',
			component: () => import('@/views/voiceroom/activityManager/prayLottery-list'),
			name: 'prayLottery-list',
			meta: {
				title: '祈福抽奖记录',
				noCache: true
			}
		},
    {
			path: 'prayExchange-list',
			component: () => import('@/views/voiceroom/activityManager/prayExchange-list'),
			name: 'prayExchange-list',
			meta: {
				title: '祈福兑换记录',
				noCache: true
			}
		},
    {
			path: 'jigsawLottery-list',
			component: () => import('@/views/voiceroom/activityManager/jigsawLottery-list'),
			name: 'jigsawLottery-list',
			meta: {
				title: '拼图抽奖记录',
				noCache: true
			}
		},
    {
			path: 'jigsawDebris-list',
			component: () => import('@/views/voiceroom/activityManager/jigsawDebris-list'),
			name: 'jigsawDebris-list',
			meta: {
				title: '碎片获得记录',
				noCache: true
			}
		},
	]
}

export default activityManagerRouter
