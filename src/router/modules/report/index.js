/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'
const userRouter = {
	path: '/report',
	component: Layout,
	redirect: 'noRedirect',
	name: 'report',
	meta: {
		title: '举报管理',
		icon: 'el-icon-bell'
	},
	children: [
		{
			path: 'user-not-reportList',
			component: () => import('@/views/voiceroom/user/user-not-reportList'),
			name: 'user-not-reportList',
			meta: {
				title: '未处理列表',
				noCache: true
			}
		},
		{
			path: 'user-old-reportList',
			component: () => import('@/views/voiceroom/user/user-old-reportList'),
			name: 'user-old-reportList',
			meta: {
				title: '已处理列表',
				noCache: true
			}
		}
		
	]
}

export default userRouter
