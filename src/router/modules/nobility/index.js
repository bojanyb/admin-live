/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'
const nobilityRouter = {
	path: '/nobility',
	component: Layout,
	redirect: 'noRedirect',
	name: 'nobility',
	meta: {
		title: '贵族管理',
		icon: 'el-icon-trophy'
	},
	children: [
		{
			path: 'privilegeList',
			component: () => import('@/views/voiceroom/nobility/privilegeList'),
			name: 'privilegeList',
			meta: {
				title: '贵族特权设置',
				noCache: true
			}
		},
		{
			path: 'priceList',
			component: () => import('@/views/voiceroom/nobility/priceList'),
			name: 'priceList',
			meta: {
				title: '贵族价格管理',
				noCache: true
			}
		},
        {
			path: 'userList',
			component: () => import('@/views/voiceroom/nobility/userList'),
			name: 'userList',
			meta: {
				title: '贵族用户列表',
				noCache: true
			}
		}
	]
}

export default nobilityRouter
