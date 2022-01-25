/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const recordRouter = {
  path: '/record',
  component: Layout,
  redirect: 'noRedirect',
  name: 'record',
  meta: {
    title: '记录管理',
    icon: 'form'
  },
  children: [
	{
	  path: 'giftrecord-list',
	  component: () => import('@/views/voiceroom/record/giftrecord-list'),
	  name: 'giftrecord-list',
	  meta: {
	    title: '礼物赠送记录',
	    noCache: true
	  }
	},
  ]
}

export default recordRouter
