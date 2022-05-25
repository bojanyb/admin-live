/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'
const userRouter = {
	path: '/paySystem',
	component: Layout,
	redirect: 'noRedirect',
	name: 'paySystem',
	meta: {
		title: '支付管理',
		icon: 'el-icon-s-finance'
	},
	children: [{
			path: 'payType',
			component: () => import('@/views/voiceroom/paySystem/payType'),
			name: 'payType',
			meta: {
				title: '支付配置',
				noCache: true
			}
		},
		{
			path: 'operateHistory-list',
			component: () => import('@/views/voiceroom/paySystem/operateHistory'),
			name: 'operateHistory-list',
			meta: {
				title: '操作记录',
				noCache: true
			}
		},
	]
}

export default userRouter
