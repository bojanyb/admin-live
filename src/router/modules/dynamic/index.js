/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'
const dynamicRouter = {
	path: '/dynamic',
	component: Layout,
	redirect: 'noRedirect',
	name: 'dynamic',
	meta: {
		title: '动态管理',
		icon: 'el-icon-edit-outline'
	},
	children: [
		{
			path: 'dynamic-list',
			component: () => import('@/views/voiceroom/dynamic-list'),
			name: 'dynamic-list',
			meta: {
				title: '动态列表',
				noCache: true
			}
		},
		{
			path: 'dynamic-audit',
			component: () => import('@/views/voiceroom/serviceConfig/dynamic-audit'),
			name: 'dynamic-audit',
			meta: {
				title: '动态审核',
				noCache: true
			}
		},
	]
}

export default dynamicRouter
