/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'
const userRouter = {
	path: '/shopping',
	component: Layout,
	redirect: 'noRedirect',
	name: 'shopping',
	meta: {
		title: '商城管理',
		icon: 'el-icon-office-building'
	},
	children: [
		{
			path: 'shopping-list',
			component: () => import('@/views/voiceroom/shopping/index'),
			name: 'shopping-list',
			meta: {
				title: '商品列表',
				noCache: true
			}
		},
		{
			path: 'give-list',
			component: () => import('@/views/voiceroom/shopping/givegoods/index'),
			name: 'give-list',
			meta: {
				title: '赠送商品',
				noCache: true
			}
		}

	]
}

export default userRouter
