/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'
const roomConfigRouter = {
	path: '/roomConfig',
	component: Layout,
	redirect: 'noRedirect',
	name: 'roomConfig',
	meta: {
		title: '房间管理',
		icon: 'el-icon-house'
	},
	children: [
		{
			path: 'roomMessage',
			component: () => import('@/views/voiceroom/roomConfig/roomMessage'),
			name: 'roomMessage',
			meta: {
				title: '房间信息管理',
				noCache: true
			}
		},
		{
			path: 'category',
			component: () => import('@/views/voiceroom/roomConfig/category'),
			name: 'category',
			meta: {
				title: '房间品类管理',
				noCache: true
			}
		},
		{
			path: 'heat',
			component: () => import('@/views/voiceroom/roomConfig/heat'),
			name: 'heat',
			meta: {
				title: '房间热度管理',
				noCache: true
			}
		},
		{
			path: 'joinRoom',
			component: () => import('@/views/voiceroom/roomConfig/joinRoom'),
			name: 'joinRoom',
			meta: {
				title: '进房记录',
				noCache: true
			}
		},
		{
			path: 'channelRoom',
			component: () => import('@/views/voiceroom/roomConfig/channelRoom'),
			name: 'channelRoom',
			meta: {
				title: '渠道进房',
				noCache: true
			}
		}
	]
}

export default roomConfigRouter
