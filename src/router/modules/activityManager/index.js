/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'
const activityManagerRouter = {
	path: '/activityManager',
	component: Layout,
	redirect: 'noRedirect',
	name: 'activityManager',
	meta: {
		title: '活动配置',
		icon: 'el-icon-bangzhu'
	},
	children: [
		{
			path: 'resources-list',
			component: () => import('@/views/voiceroom/activityManager/resources-list'),
			name: 'resources-list',
			meta: {
				title: '资源位配置',
				noCache: true
			}
		}
	]
}

export default activityManagerRouter
