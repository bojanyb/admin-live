/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'
const messageRouter = {
	path: '/message',
	component: Layout,
	redirect: 'noRedirect',
	name: 'message',
	meta: {
		title: '消息管理',
		icon: 'el-icon-chat-line-round'
	},
	children: [
		{
			path: 'activity-message',
			component: () => import('@/views/voiceroom/message/activity-message'),
			name: 'activity-message',
			meta: {
				title: '活动通知',
				noCache: true
			},
		},
	]
}

export default messageRouter

