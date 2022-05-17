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
		// {
		// 	path: 'userinfo-list',
		// 	component: () => import('@/views/voiceroom/user/userinfo-list'),
		// 	name: 'userinfo-list',
		// 	meta: {
		// 		title: '用户信息列表',
		// 		noCache: true
		// 	}
		// },
		{
			path: 'verified-list',
			component: () => import('@/views/voiceroom/user/verified-list'),
			name: 'verified-list',
			meta: {
				title: '实名认证列表',
				noCache: true
			}
		},
		// {
		// 	path: 'account-list',
		// 	component: () => import('@/views/voiceroom/user/account-list'),
		// 	name: 'account-list',
		// 	meta: {
		// 		title: '用户账户列表',
		// 		noCache: true
		// 	}
		// },
		{
			path: 'userBalance-list',
			component: () => import('@/views/voiceroom/user/userBalance-list'),
			name: 'userBalance-list',
			meta: {
				title: '用户余额明细',
				noCache: true
			}
		},
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
			path: 'user-not-reportList',
			component: () => import('@/views/voiceroom/user/user-not-reportList'),
			name: 'user-not-reportList',
			meta: {
				title: '用户举报信息未处理列表',
				noCache: true
			}
		},
		{
			path: 'user-old-reportList',
			component: () => import('@/views/voiceroom/user/user-old-reportList'),
			name: 'user-old-reportList',
			meta: {
				title: '用户举报信息已处理列表',
				noCache: true
			}
		},
		{
			path: 'user-not-logOut-list',
			component: () => import('@/views/voiceroom/user/user-not-logOut-list'),
			name: 'user-not-logOut-list',
			meta: {
				title: '用户注销审核未处理列表',
				noCache: true
			}
		},
		{
			path: 'user-old-logOut-list',
			component: () => import('@/views/voiceroom/user/user-old-logOut-list'),
			name: 'user-old-logOut-list',
			meta: {
				title: '用户注销审核已处理列表',
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
		},
		{
			path: 'dynamic-list',
			component: () => import('@/views/voiceroom/user/dynamic-list'),
			name: 'dynamic-list',
			meta: {
				title: '动态审核列表',
				noCache: true
			}
		},
		{
			path: 'userGift-list',
			component: () => import('@/views/voiceroom/user/userGift-list'),
			name: 'userGift-list',
			meta: {
				title: '用户交易记录',
				noCache: true
			}
		},
		{
			path: 'userTurnover-list',
			component: () => import('@/views/voiceroom/user/userTurnover-list'),
			name: 'userTurnover-list',
			meta: {
				title: '用户流水记录',
				noCache: true
			}
		},
		{
			path: 'invite-list',
			component: () => import('@/views/voiceroom/user/inviteList'),
			name: 'invite-list',
			meta: {
				title: '用户拉新记录',
				noCache: true
			}
		},
		
	]
}

export default userRouter
