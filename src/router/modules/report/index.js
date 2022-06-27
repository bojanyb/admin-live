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
				title: '举报用户',
				noCache: true
			}
		},
		{
			path: 'user-old-reportList',
			component: () => import('@/views/voiceroom/user/user-old-reportList'),
			name: 'user-old-reportList',
			meta: {
				title: '举报用户记录',
				noCache: true
			}
		},
		{
			path: 'room-name',
			component: () => import('@/views/voiceroom/room/room-name'),
			name: 'room-name',
			meta: {
				title: '房间名称记录',
				noCache: true
			}
		},
		{
			path: 'report-list',
			component: () => import('@/views/voiceroom/room/report-list'),
			name: 'report-list',
			meta: {
				title: '举报房间',
				noCache: true
			}
		}
	]
}

export default userRouter
