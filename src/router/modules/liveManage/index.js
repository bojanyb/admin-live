/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'
const liveManageRouter = {
  path: '/liveManage',
	component: Layout,
	redirect: 'noRedirect',
  name: 'liveManage',
	meta: {
		title: '直播管理',
		icon: 'el-icon-shopping-bag-1'
	},
	children: [
		{
      path: 'live-room-list',
      component: () => import('@/views/voiceroom/liveManage/index'),
      name: 'live-room-list',
			meta: {
				title: '房间列表',
				noCache: true
			}
		},
		{
      path: 'live-record-list',
      component: () => import('@/views/voiceroom/liveManage/live-record-list'),
      name: 'live-record-list',
			meta: {
				title: '直播列表',
				noCache: true
			}
		},
		{
      path: 'streamer-data',
      component: () => import('@/views/voiceroom/liveManage/streamer-data'),
      name: 'streamer-data',
			meta: {
				title: '主播数据',
				noCache: true
			}
		},
		{
      path: 'live-config',
      component: () => import('@/views/voiceroom/liveManage/live-config'),
      name: 'live-config',
			meta: {
				title: '直播配置',
				noCache: true
			}
		},
	]
}

export default liveManageRouter
