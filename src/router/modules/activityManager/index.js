/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'
const activityManagerRouter = {
	path: '/activityManager',
	component: Layout,
	redirect: 'noRedirect',
	name: 'activityManager',
	meta: {
		title: '活动配置',
		icon: 'el-icon-shopping-cart-2'
	},
	children: [
		{
			path: 'banner-list',
			component: () => import('@/views/voiceroom/activityManager/banner-list'),
			name: 'banner-list',
			meta: {
				title: 'banner图片配置',
				noCache: true
			}
		},
		{
			path: 'splash-list',
			component: () => import('@/views/voiceroom/activityManager/splash-list'),
			name: 'splash-list',
			meta: {
				title: '闪屏图片配置',
				noCache: true
			}
		},
		{
			path: 'nonius-list',
			component: () => import('@/views/voiceroom/activityManager/nonius-list'),
			name: 'nonius-list',
			meta: {
				title: '房间游标配置',
				noCache: true
			}
		}
	]
}

export default activityManagerRouter
