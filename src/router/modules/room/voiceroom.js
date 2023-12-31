/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const voiceroomRouter = {
	path: '/voiceroom',
	component: Layout,
	redirect: 'noRedirect',
	name: 'Charts',
	meta: {
		title: '派对管理',
		icon: 'chart'
	},
	children: [{
			path: 'room-list',
			component: () => import('@/views/voiceroom/room/room-list'),
			name: 'room-list',
			meta: {
				title: '房间信息列表',
				noCache: true
			}
		},
		{
			path: 'room-livelist',
			component: () => import('@/views/voiceroom/room/room-livelist'),
			name: 'room-livelist',
			meta: {
				title: '房间直播列表',
				noCache: true
			}
		},
		{
			path: 'room-broadcast-list',
			component: () => import('@/views/voiceroom/room/room-broadcast-list'),
			name: 'room-broadcast-list',
			meta: {
				title: '房间广播列表',
				noCache: true
			}
		},
		{
			path: 'room-historylist',
			component: () => import('@/views/voiceroom/room/room-historylist'),
			name: 'room-historylist',
			meta: {
				title: '直播历史记录',
				noCache: true
			}
		},
		{
			path: 'room-type-list',
			component: () => import('@/views/voiceroom/room/room-type-list'),
			name: 'room-type-list',
			meta: {
				title: '房间类型列表',
				noCache: true
			}
		},
		// {
		// 	path: 'room-name',
		// 	component: () => import('@/views/voiceroom/room/room-name'),
		// 	name: 'room-name',
		// 	meta: {
		// 		title: '房间名称管理',
		// 		noCache: true
		// 	}
		// },
		// {
		// 	path: 'report-list',
		// 	component: () => import('@/views/voiceroom/room/report-list'),
		// 	name: 'report-list',
		// 	meta: {
		// 		title: '举报房间',
		// 		noCache: true
		// 	}
		// },
		// {
		// 	path: 'report-history',
		// 	component: () => import('@/views/voiceroom/room/report-history'),
		// 	name: 'report-history',
		// 	meta: {
		// 		title: '举报房间记录',
		// 		noCache: true
		// 	}
		// },
		{
			path: 'chat-record',
			component: () => import('@/views/voiceroom/room/chat-record'),
			name: 'chat-record',
			meta: {
				title: '语音房聊天记录',
				noCache: true
			},
			// hidden: true
		},
		{
			path: 'chat-single-record',
			component: () => import('@/views/voiceroom/room/chat-single-record'),
			name: 'chat-single-record',
			meta: {
				title: '语音房单聊记录',
				noCache: true
			},
			// hidden: true
		}, 
		{
			path: 'room-background-list',
			component: () => import('@/views/voiceroom/room/room-background-list'),
			name: 'room-background-list',
			meta: {
				title: '房间背景图配置列表',
				noCache: true
			}
		},
		{
			path: 'game-list',
			component: () => import('@/views/voiceroom/room/gameList/index.vue'),
			name: 'game-list',
			meta: {
				title: '游戏配置',
				noCache: true
			}
		},
	]
}

export default voiceroomRouter
