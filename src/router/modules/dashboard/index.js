/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const dashboardRouter = {
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
				title: '总览',
				noCache: true
			},
		},
	]
}

export default dashboardRouter

