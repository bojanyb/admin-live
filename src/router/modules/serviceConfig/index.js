/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'
const serviceConfigRouter = {
	path: '/serviceConfig',
	component: Layout,
	redirect: 'noRedirect',
	name: 'serviceConfig',
	meta: {
		title: '客服管理',
		icon: 'el-icon-phone-outline'
	},
	children: [
		{
			path: 'audioTest',
			component: () => import('@/views/voiceroom/serviceConfig/audioTest'),
			name: 'audioTest',
			meta: {
				title: '音频检测',
				noCache: true
			}
		},
		{
			path: 'userPunish',
			component: () => import('@/views/voiceroom/serviceConfig/userPunish'),
			name: 'userPunish',
			meta: {
				title: '用户处罚',
				noCache: true
			}
		},
        {
			path: 'coverAudit',
			component: () => import('@/views/voiceroom/serviceConfig/coverAudit'),
			name: 'coverAudit',
			meta: {
				title: '封面审核',
				noCache: true
			}
		}
	]
}

export default serviceConfigRouter