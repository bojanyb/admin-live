import Layout from '@/layout'

const guildAuditRouter = {
	path: '/guildAudit',
	component: Layout,
	redirect: 'noRedirect',
	name: 'guildaudit',
	meta: {
		title: '公会管理',
		icon: 'peoples'
	},
	children: [
		{
			path: 'guild-list',
			component: () => import('@/views/voiceroom/guildAudit/guild-list'),
			name: 'guild-list',
			meta: {
				title: '公会列表',
				noCache: true
			}
		},
		{
			path: 'guild-apply-list',
			component: () => import('@/views/voiceroom/guildAudit/guild-apply-list'),
			name: 'guild-apply-list',
			meta: {
				title: '公会申请列表',
				noCache: true
			}
		},
		{
			path: 'guildLevel',
			component: () => import('@/views/voiceroom/guildAudit/guild-class/index'),
			name: 'guildLevel',
			meta: {
				title: '公会等级',
				noCache: true
			}
		},
		{
			path: 'guildRoom',
			component: () => import('@/views/voiceroom/guildAudit/guildApplication/index'),
			name: 'guildRoom',
			meta: {
				title: '公会房间',
				noCache: true
			}
		},
		// {
		// 	path: 'guildAudit-list',
		// 	component: () => import('@/views/voiceroom/guildAudit/guildAudit-list'),
		// 	name: 'guildAudit-list',
		// 	meta: {
		// 		title: '公会待审核列表',
		// 		noCache: true
		// 	}
		// },
		{
			path: 'guildReport-list',
			component: () => import('@/views/voiceroom/guildAudit/guildReport-list'),
			name: 'guildReport-list',
			meta: {
				title: '公会举报处理列表',
				noCache: true
			}
		},
		// {
		// 	path: 'guildLevelRebate',
		// 	component: () => import('@/views/voiceroom/guildAudit/guildLevelRebate'),
		// 	name: 'guildLevelRebate',
		// 	meta: {
		// 		title: '公会等级返点配置',
		// 		noCache: true
		// 	}
		// },
		{
			path: 'guildRebate-list',
			component: () => import('@/views/voiceroom/guildAudit/guildRebate-list'),
			name: 'guildRebate-list',
			meta: {
				title: '派对结算',
				noCache: true
			}
		},
    {
			path: 'liveRebate-list',
			component: () => import('@/views/voiceroom/guildAudit/liveRebate-list'),
			name: 'liveRebate-list',
			meta: {
				title: '直播结算',
				noCache: true
			}
		},
		{
			path: 'guildRebateRecord-list',
			component: () => import('@/views/voiceroom/guildAudit/guildRebateRecord-list'),
			name: 'guildRebateRecord-list',
			meta: {
				title: '公会返佣历史历史记录',
				noCache: true
			}
		},
		{
			path: 'guildNews',
			component: () => import('@/views/voiceroom/guildAudit/guild_new'),
			name: 'guildNews',
			meta: {
				title: '萌新设置',
				noCache: true
			}
		},
	]
}

export default guildAuditRouter
