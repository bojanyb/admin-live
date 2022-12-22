/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const homeRouter = {
	path: '/home',
	component: Layout,
	redirect: 'noRedirect',
  name: 'home',
	meta: {
    title: '首页',
    icon: 'user'
	},
	children: [
		{
      path: 'home-page',
      component: () => import('@/views/voiceroom/home/index.vue'),
			meta: {
				title: '首页',
				noCache: true
			},
      name: 'home-page'
		}
	]
}

export default homeRouter
