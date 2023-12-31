/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'
const userRouter = {
	path: '/user',
	component: Layout,
	redirect: 'noRedirect',
	name: 'user',
	meta: {
		title: '用户管理',
    icon: 'el-icon-user-solid'
	},
	children: [{
			path: 'user-list',
			component: () => import('@/views/voiceroom/user/user-list'),
			name: 'user-list',
			meta: {
				title: '用户列表',
				noCache: false
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
		},
		{
			path: 'user-logOut-list',
			component: () => import('@/views/voiceroom/user/user-logOut-list'),
			name: 'user-logOut-list',
			meta: {
				title: '用户注销',
				noCache: true
			}
		},
		{
      path: 'user-rich-list',
      component: () => import('@/views/voiceroom/user/user-rich-list'),
      name: 'user-rich-list',
      meta: {
        title: '大R用户',
        noCache: true
      }
    },
    {
      path: 'user-pack',
      component: () => import('@/views/voiceroom/user/user-pack'),
      name: 'user-pack',
      meta: {
        title: '用户背包',
        noCache: true
      }
    },
    {
      path: 'user-register',
      component: () => import('@/views/voiceroom/user/user-register'),
      name: 'user-register',
      meta: {
        title: '登录记录',
        noCache: true
      }
    }
	]
}

export default userRouter
