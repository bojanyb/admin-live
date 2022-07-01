/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const blockedRouter = {
    path: '/blocked',
    component: Layout,
    redirect: 'noRedirect',
    name: 'blocked',
    meta: {
        title: '封禁记录',
        icon: 'form'
    },
    children: [
        {
            path: 'user-blocked',
            component: () => import('@/views/voiceroom/blocked/user-blocked'),
            name: 'user-blocked',
            meta: {
                title: '用户封禁记录',
                noCache: true
            }
        },
        {
            path: 'room-blocked',
            component: () => import('@/views/voiceroom/blocked/room-blocked'),
            name: 'room-blocked',
            meta: {
                title: '房间封禁记录',
                noCache: true
            }
        }
    ]
}

export default blockedRouter
