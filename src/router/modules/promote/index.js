/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'
const promoteRouter = {
	path: '/promote',
	component: Layout,
	redirect: 'noRedirect',
	name: 'promote',
	meta: {
		title: '推广管理',
		icon: 'el-icon-position'
	},
	children: [
		{
			path: 'invite-list',
			component: () => import('@/views/voiceroom/recommend/list'),
			name: 'invite-list',
			meta: {
				title: '推广列表',
				noCache: true
			},
		},
		{
			path: 'invite-history',
			component: () => import('@/views/voiceroom/recommend/invite-history'),
			name: 'invite-history',
			meta: {
				title: '推广记录',
				noCache: true
			},
		},
		{
			path: 'invite-rebates-set',
			component: () => import('@/views/voiceroom/recommend/rebates-set'),
			name: 'invite-rebates-set',
			meta: {
				title: '推广返点设置',
				noCache: true
			},
		},
    {
      path: 'newbie-square',
      component: () => import('@/views/voiceroom/recommend/newbie-square'),
      name: 'newbie-square',
      meta: {
        title: '新人广场',
        noCache: true
      },
    },
		{
			path: '/promotion-system',
			component: () => import('@/views/voiceroom/recommend/index'),
			meta: {
				title: '推广系统'
			},
			children: [
				{
					path: 'promote-members',
					component: () => import('@/views/voiceroom/recommend/promotion-system/promote-members'),
					meta: {
						title: '推广员管理',
					},
					name: 'promote-members'
				},
				{
					path: 'promote-order',
					component: () => import('@/views/voiceroom/recommend/promotion-system/promote-order'),
					meta: {
						title: '推广补单',
					},
					name: 'promote-order'
				}
			]
		}
	]
}

export default promoteRouter

