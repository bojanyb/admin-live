/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'
const userRouter = {
	path: '/logOut',
	component: Layout,
	redirect: 'noRedirect',
	name: 'logOut',
	meta: {
		title: '注销管理',
		icon: 'el-icon-document-delete'
	},
	children: [
		{
			path: 'user-not-logOut-list',
			component: () => import('@/views/voiceroom/user/user-not-logOut-list'),
			name: 'user-not-logOut-list',
			meta: {
				title: '未处理列表',
				noCache: true
			}
		},
		{
			path: 'user-old-logOut-list',
			component: () => import('@/views/voiceroom/user/user-old-logOut-list'),
			name: 'user-old-logOut-list',
			meta: {
				title: '已处理列表',
				noCache: true
			}
		}
		
	]
}

export default userRouter
