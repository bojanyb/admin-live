/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const activityRouter = {
	path: '/activity',
	component: Layout,
	redirect: 'noRedirect',
	name: 'activity',
	meta: {
		title: '活动管理',
		icon: 'tree'
	},
	children: [
        {
			path: 'first-charge',
			component: () => import('@/views/voiceroom/activity/first-charge'),
			meta: {
				title: '首充活动管理',
				noCache: true
			},
			name: 'first-charge'
		}
	]
}

export default activityRouter
