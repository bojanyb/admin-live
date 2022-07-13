/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'
const auditRouter = {
	path: '/audit',
	component: Layout,
	redirect: 'noRedirect',
	name: 'audit',
	meta: {
		title: '审核管理',
		icon: 'el-icon-edit-outline'
	},
	children: [
		{
			path: 'user-stayAudit',
			component: () => import('@/views/voiceroom/user/user-stayAudit'),
			name: 'user-stayAudit',
			meta: {
				title: '待审核',
				noCache: true
			}
		},
		{
			path: 'user-endAudit',
			component: () => import('@/views/voiceroom/user/user-endAudit'),
			name: 'user-endAudit',
			meta: {
				title: '已审核',
				noCache: true
			}
		}
	]
}

export default auditRouter
