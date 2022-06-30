/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'
const userRouter = {
	path: '/dashboard',
	component: Layout,
	redirect: 'noRedirect',
	name: 'dashboard',
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
				title: '总览',
				noCache: true
			},
		},
	]
}

export default userRouter

