
import Layout from '@/layout'

const guildAuditRouter = {
  path: '/guildAudit',
  component: Layout,
  redirect: 'noRedirect',
  name: 'guildaudit',
  meta: {
    title: '语音房管理',
    icon: 'chart'
  },
  children: [{
    path: 'guildAudit-list',
    component: () => import('@/views/voiceroom/guildAudit/guildAudit-list'),
    name: 'guildAudit-list',
    meta: {
      title: '公会待审核列表',
      noCache: true
    }
  }
  ]
}

export default guildAuditRouter
