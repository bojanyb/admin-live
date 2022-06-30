/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const giveAwayRouter = {
	path: '/giveAway',
	component: Layout,
	redirect: 'noRedirect',
	name: 'giveAway',
	meta: {
		title: '财务管理',
		icon: 'el-icon-goods'
	},
	children: [{
			path: 'giveMe',
			component: () => import('@/views/voiceroom/activity/giftHistory/giveAway'),
			meta: {
				title: '平台赠送',
			},
			name: 'giveMe'
		},
		{
			path: 'giftHistory-list',
			component: () => import('@/views/voiceroom/activity/giftHistory/giftHistory-list'),
			meta: {
				title: '赠送记录',
			},
			name: 'giftHistory-list'
		},
		{
			path: 'guildWithdraw-list',
			component: () => import('@/views/voiceroom/finance/guildWithdraw-list'),
			name: 'guildWithdraw-list',
			meta: {
				title: '充值记录',
				noCache: true
			},
		},
		{
			path: 'embodyApply-list',
			component: () => import('@/views/voiceroom/finance/embodyApply'),
			name: 'embodyApply-list',
			meta: {
				title: '提现申请',
				noCache: true,
			},
		},
		{
			path: 'embodyHistory-list',
			component: () => import('@/views/voiceroom/finance/embodyHistory'),
			name: 'embodyHistory-list',
			meta: {
				title: '提现记录',
				noCache: true,
			},
		},
		// {
		// 	path: 'payType',
		// 	component: () => import('@/views/voiceroom/paySystem/payType'),
		// 	name: 'payType',
		// 	meta: {
		// 		title: '支付配置',
		// 		noCache: true
		// 	}
		// },
		{
			path: 'operateHistory',
			component: () => import('@/views/voiceroom/paySystem/operateHistory'),
			name: 'operateHistory',
			meta: {
				title: '操作记录',
				noCache: true
			}
		},
	]
}

export default giveAwayRouter
