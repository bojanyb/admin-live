/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const systemConfigRouter = {
  path: '/systemConfig',
  component: Layout,
  redirect: 'noRedirect',
  name: 'systemConfig',
  meta: {
    title: '系统配置',
    icon: 'tree'
  },
  children: [{
    path: 'consume-list',
    component: () => import('@/views/voiceroom/systemConfig/consume-list'),
    name: 'consume-list',
    meta: {
      title: '用户消费等级列表',
      noCache: true
    }
  },
  {
    path: 'livetitle-list',
    component: () => import('@/views/voiceroom/systemConfig/livetitle-list'),
    name: 'livetitle-list',
    meta: {
      title: '直播头衔列表',
      noCache: true
    }
  },
  {
    path: 'gift-list',
    component: () => import('@/views/voiceroom/systemConfig/gift-list'),
    name: 'gift-list',
    meta: {
      title: '礼物列表',
      noCache: true
    }
  }
  ]
}

export default systemConfigRouter
