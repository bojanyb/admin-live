/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const giveAwayRouter = {
	path: '/giveAway',
	component: Layout,
	redirect: 'noRedirect',
	name: 'Charts',
	meta: {
		title: '财务管理',
		icon: 'chart'
	},
	children: [{
			path: 'giveAway',
			component: () => import('@/views/voiceroom/activity/giftHistory/giveAway'),
			meta: {
				title: '平台赠送',
			}
		},
		{
			path: 'giftHistory-list',
			component: () => import('@/views/voiceroom/activity/giftHistory/giftHistory-list'),
			meta: {
				title: '赠送记录',
			}
		},
		{
			path: 'guildWithdraw-list',
			component: () => import('@/views/voiceroom/finance/guildWithdraw-list'),
			name: 'guildWithdraw-list',
			meta: {
				title: '用户充值记录',
				noCache: true
			}
		},
		// {
		// 	path: 'guildWithdraw-list',
		// 	component: () => import('@/views/voiceroom/finance/guildWithdraw-list'),
		// 	name: 'guildWithdraw-list',
		// 	meta: {
		// 		title: '用户体现记录',
		// 		noCache: true
		// 	}
		// }
	]
}

export default giveAwayRouter
