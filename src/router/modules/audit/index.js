/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'
const userRouter = {
	path: '/audit',
	component: Layout,
	redirect: 'noRedirect',
	name: 'audit',
	meta: {
		title: '审核管理',
		icon: 'el-icon-edit-outline'
	},
	children: [
		{
			path: 'user-audit-list',
			component: () => import('@/views/voiceroom/user/user-audit-list'),
			name: 'user-audit-list',
			meta: {
				title: '用户资料审核列表',
				noCache: true
			}
		},
		{
			path: 'userbg-list',
			component: () => import('@/views/voiceroom/user/userbg-list'),
			name: 'userbg-list',
			meta: {
				title: '用户图片资料审核列表',
				noCache: true
			}
		},
		{
			path: 'dynamic-list',
			component: () => import('@/views/voiceroom/user/dynamic-list'),
			name: 'dynamic-list',
			meta: {
				title: '动态审核列表',
				noCache: true
			}
		}
		
	]
}

export default userRouter
