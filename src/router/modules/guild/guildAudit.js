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
	children: [{
			path: 'guild-list',
			component: () => import('@/views/voiceroom/guildAudit/guild-list'),
			name: 'guild-list',
			meta: {
				title: '公会列表',
				noCache: true
			}
		},
		{
			path: 'guildApplication-list',
			component: () => import('@/views/voiceroom/guildAudit/guildApplication-list'),
			name: 'guildApplication-list',
			meta: {
				title: '公会厅申请列表',
				noCache: true
			}
		},
		{
			path: 'guildAudit-list',
			component: () => import('@/views/voiceroom/guildAudit/guildAudit-list'),
			name: 'guildAudit-list',
			meta: {
				title: '公会待审核列表',
				noCache: true
			}
		},
		{
			path: 'guildReport-list',
			component: () => import('@/views/voiceroom/guildAudit/guildReport-list'),
			name: 'guildReport-list',
			meta: {
				title: '公会举报处理列表',
				noCache: true
			}
		},
		{
			path: 'guildLevelRebate',
			component: () => import('@/views/voiceroom/guildAudit/guildLevelRebate'),
			name: 'guildLevelRebate',
			meta: {
				title: '公会等级返点配置',
				noCache: true
			}
		},
		
		
	]
}

export default guildAuditRouter
