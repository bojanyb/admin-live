/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const voiceroomRouter = {
  path: '/voiceroom',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Charts',
  meta: {
    title: '语音房管理',
    icon: 'chart'
  },
  children: [{
    path: 'room-list',
    component: () => import('@/views/voiceroom/room/room-list'),
    name: 'room-list',
    meta: {
      title: '房间列表',
      noCache: true
    }
  },
  {
    path: 'room-type-list',
    component: () => import('@/views/voiceroom/room/room-type-list'),
    name: 'room-type-list',
    meta: {
      title: '房间类型列表',
      noCache: true
    }
  },
  {
    path: 'report-list',
    component: () => import('@/views/voiceroom/room/report-list'),
    name: 'report-list',
    meta: {
      title: '举报列表',
      noCache: true
    }
  }
  ]
}

export default voiceroomRouter
