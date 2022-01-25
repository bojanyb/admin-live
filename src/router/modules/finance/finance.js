import Layout from '@/layout'

const guildFinanceRouter = {
	path: '/finance',
	component: Layout,
	redirect: 'noRedirect',
	name: 'finance',
	meta: {
		title: '财务管理',
		icon: 'peoples'
	},
	children: [{
			path: 'guildWithdraw-list',
			component: () => import('@/views/voiceroom/finance/guildWithdraw-list'),
			name: 'guildWithdraw-list',
			meta: {
				title: '公会提现记录',
				noCache: true
			}
		}
	]
}

export default guildFinanceRouter
