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
			component: () => import('@/views/voiceroom/user/inviteList'),
			name: 'invite-list',
			meta: {
				title: '推广记录',
				noCache: true
			},
		},
	]
}

export default promoteRouter

