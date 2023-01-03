/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const noticeRouter = {
	path: '/notice',
	component: Layout,
	redirect: 'noRedirect',
	name: 'Charts',
	meta: {
		title: '消息管理',
		icon: 'chart'
	},
	children: [{
			path: 'push-notice',
			component: () => import('@/views/voiceroom/notice/push-notice.vue'),
			name: 'push-notice',
			meta: {
				title: 'push推送',
				noCache: true
			}
		},
	]
}

export default noticeRouter
