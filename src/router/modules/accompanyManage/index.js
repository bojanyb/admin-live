/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'
const accompanyManageRouter = {
  path: '/accompanyManage',
	component: Layout,
	redirect: 'noRedirect',
  name: 'accompanyManage',
	meta: {
		title: '相守管理',
		icon: 'el-icon-house'
	},
	children: [
		{
      path: 'accompany-room-list',
      component: () => import('@/views/voiceroom/accompanyManage/index'),
      name: 'accompany-room-list',
			meta: {
				title: '房间列表',
				noCache: true
			}
    },
    {
      path: 'streamer-data',
      component: () => import('@/views/voiceroom/accompanyManage/guildApplication/index'),
      name: 'streamer-data',
      meta: {
        title: '房间数据',
        noCache: true
      }
    },
	]
}

export default accompanyManageRouter
