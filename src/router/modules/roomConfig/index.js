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
		}
	]
}

export default roomConfigRouter
