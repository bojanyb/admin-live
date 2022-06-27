/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'
const userRouter = {
	path: '/user',
	component: Layout,
	redirect: 'noRedirect',
	name: 'user',
	meta: {
		title: '用户管理',
		icon: 'people'
	},
	children: [{
			path: 'user-list',
			component: () => import('@/views/voiceroom/user/user-list'),
			name: 'user-list',
			meta: {
				title: '用户列表',
				noCache: true
			}
		},
		{
			path: 'user-history',
			component: () => import('@/views/voiceroom/user/user-history'),
			name: 'user-history',
			meta: {
				title: '用户信息编辑历史',
				noCache: true
			}
		},
		{
			path: 'verified-list',
			component: () => import('@/views/voiceroom/user/verified-list'),
			name: 'verified-list',
			meta: {
				title: '实名列表',
				noCache: true
			}
		},
		{
			path: 'usermusic-list',
			component: () => import('@/views/voiceroom/user/usermusic-list'),
			name: 'usermusic-list',
			meta: {
				title: '用户音乐上传列表',
				noCache: true
			}
		}
		
	]
}

export default userRouter
