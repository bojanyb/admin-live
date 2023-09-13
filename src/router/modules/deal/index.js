/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'
const userRouter = {
	path: '/deal',
	component: Layout,
	redirect: 'noRedirect',
	name: 'deal',
	meta: {
		title: '交易管理',
		icon: 'el-icon-shopping-cart-2'
	},
	children: [
		{
			path: 'userGift-list',
			component: () => import('@/views/voiceroom/user/userGift-list'),
			name: 'userGift-list',
			meta: {
				title: '交易记录',
				noCache: true
			}
		},
		{
			path: 'userTurnover-list',
			component: () => import('@/views/voiceroom/user/userTurnover-list'),
      name: 'userTurnover-list',
			meta: {
				title: '流水记录',
				noCache: true
			}
		},
        {
			path: 'userBalance-list',
			component: () => import('@/views/voiceroom/user/userBalance-list'),
			name: 'userBalance-list',
			meta: {
				title: '余额明细',
				noCache: true
			}
		},

	]
}

export default userRouter
