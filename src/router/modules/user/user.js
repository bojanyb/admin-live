/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const userRouter = {
  path: '/user',
  component: Layout,
  redirect: 'noRedirect',
  name: 'user',
  meta: {
    title: '用户管理',
    icon: 'people'
  },
  children: [{
    path: 'user-list',
    component: () => import('@/views/voiceroom/user/user-list'),
    name: 'user-list',
    meta: {
      title: '用户列表',
      noCache: true
    }
  },
  {
    path: 'userinfo-list',
    component: () => import('@/views/voiceroom/user/userinfo-list'),
    name: 'userinfo-list',
    meta: {
      title: '用户信息列表',
      noCache: true
    }
  },
  {
    path: 'verified-list',
    component: () => import('@/views/voiceroom/user/verified-list'),
    name: 'verified-list',
    meta: {
      title: '实名认证列表',
      noCache: true
    }
  },
  {
    path: 'account-list',
    component: () => import('@/views/voiceroom/user/account-list'),
    name: 'account-list',
    meta: {
      title: '用户账户列表',
      noCache: true
    }
  }
  ]
}

export default userRouter
