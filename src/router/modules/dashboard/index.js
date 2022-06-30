/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'
const userRouter = {
	path: '/overview',
	component: Layout,
	redirect: 'noRedirect',
	name: 'overview',
	meta: {
		title: '总览',
		icon: 'dashboard'
	},
	children: [
		{
			path: 'index',
			component: () => import('@/views/dashboard/index'),
			name: 'index',
			meta: {
				title: '详情',
				noCache: true
			},
		},
	]
}

export default userRouter

