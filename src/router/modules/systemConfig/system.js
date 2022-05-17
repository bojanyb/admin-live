/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const systemConfigRouter = {
  path: '/systemConfig',
  component: Layout,
  redirect: 'noRedirect',
  name: 'systemConfig',
  meta: {
    title: '系统配置',
    icon: 'el-icon-setting'
  },
  children: [{
    path: 'consume-list',
    component: () => import('@/views/voiceroom/systemConfig/consume-list'),
    name: 'consume-list',
    meta: {
      title: '财富等级设置',
      noCache: true
    }
  },
  {
    path: 'livetitle-list',
    component: () => import('@/views/voiceroom/systemConfig/livetitle-list'),
    name: 'livetitle-list',
    meta: {
      title: '魅力等级设置',
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
  },
	{
	  path: 'greet-list',
	  component: () => import('@/views/voiceroom/systemConfig/greet-list'),
	  name: 'greet-list',
	  meta: {
	    title: '打招呼常用语',
	    noCache: true
	  }
	},
	{
	  path: 'platform-rebate',
	  component: () => import('@/views/voiceroom/systemConfig/platform-rebate'),
	  name: 'platform-rebate',
	  meta: {
	    title: '平台返点配置',
	    noCache: true
	  }
	},
	{
	  path: 'banner-list',
	  component: () => import('@/views/voiceroom/systemConfig/banner-list'),
	  name: 'banner-list',
	  meta: {
	    title: 'banner管理',
	    noCache: true
	  }
	},
	{
	  path: 'merchants-list',
	  component: () => import('@/views/voiceroom/systemConfig/merchants'),
	  name: 'merchants-list',
	  meta: {
	    title: '商户管理',
	    noCache: true
	  }
	}
	
  ]
}

export default systemConfigRouter
