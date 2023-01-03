/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'
const msgManagerRouter = {
	path: '/msgManager',
	component: Layout,
	redirect: 'noRedirect',
	name: 'msgManager',
	meta: {
		title: '消息管理',
		icon: 'el-icon-chat-line-round'
	},
	children: [
		{
			path: 'sysNotice-list',
			component: () => import('@/views/voiceroom/msgManager/index'),
			name: 'sysNotice-list',
			meta: {
				title: '系统通知',
				noCache: true
			}
		},
		{
			path: 'communique-list',
			component: () => import('@/views/voiceroom/msgManager/communique-list'),
			name: 'communique-list',
			meta: {
				title: '官方公告',
				noCache: true
			}
		}
	]
}

export default msgManagerRouter
