/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'
const userRouter = {
	path: '/substitute',
	component: Layout,
	redirect: 'noRedirect',
	name: 'substitute',
	meta: {
		title: '代充列表',
		icon: 'el-icon-office-building'
	},
	children: [
		{
			path: 'substitute-list',
			component: () => import('@/views/voiceroom/substitute/substitute-list'),
			name: 'substitute-list',
			meta: {
				title: '代充列表',
				noCache: true
			}
		}
	]
}

export default userRouter
