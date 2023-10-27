/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'
const platformActivityRouter = {
	path: '/platformActivity',
	component: Layout,
	redirect: 'noRedirect',
	name: 'platformActivity',
	meta: {
		title: '平台活动',
		icon: 'el-icon-takeaway-box'
	},
	children: [
		{
			path: '/lucky',
			component: () => import('@/views/voiceroom/platformActivity/index'),
			meta: {
				title: '幸运转盘'
			},
			children: [
				{
					path: 'turntableSet',
					component: () => import('@/views/voiceroom/platformActivity/xyzpActivity/turntableSet'),
					meta: {
						title: '幸运转盘设置',
					},
					name: 'turntableSet'
				},
				{
					path: 'turntableCount',
					component: () => import('@/views/voiceroom/platformActivity/xyzpActivity/turntableCount'),
					meta: {
						title: '幸运转盘统计',
					},
					name: 'turntableCount'
				},
				{
					path: 'turntableRecord',
					component: () => import('@/views/voiceroom/platformActivity/xyzpActivity/turntableRecord'),
					meta: {
						title: '幸运转盘记录',
					},
					name: 'turntableRecord'
				},
			]
		},
		{
			path: '/mmly',
			component: () => import('@/views/voiceroom/platformActivity/index'),
			meta: {
				title: '喵喵乐园'
			},
			children: [
				{
					path: 'paradiseSet',
					component: () => import('@/views/voiceroom/platformActivity/mmlyActivity/paradiseSet'),
					meta: {
						title: '喵喵乐园设置',
					},
					name: 'paradiseSet'
				},
				{
					path: 'paradiseCount',
					component: () => import('@/views/voiceroom/platformActivity/mmlyActivity/paradiseCount'),
					meta: {
						title: '喵喵乐园统计',
					},
					name: 'paradiseCount'
				},
				{
					path: 'paradiseRecord',
					component: () => import('@/views/voiceroom/platformActivity/mmlyActivity/paradiseRecord'),
					meta: {
						title: '喵喵乐园记录',
					},
					name: 'paradiseRecord'
				}
			]
		},
		{
			path: '/zzbx',
			component: () => import('@/views/voiceroom/platformActivity/index'),
			meta: {
				title: '转转宝箱'
			},
			// hidden: true,
			children: [
				{
					path: 'zzbxallocation',
					component: () => import('@/views/voiceroom/platformActivity/zzbxActivity/allocation'),
					meta: {
						title: '转转宝箱设置',
					},
					name: 'zzbxallocation'
				},
				{
					path: 'zzbxstatistics',
					component: () => import('@/views/voiceroom/platformActivity/zzbxActivity/statistics'),
					meta: {
						title: '转转宝箱统计',
					},
					name: 'zzbxstatistics'
				},
				{
					path: 'zzbxhistory',
					component: () => import('@/views/voiceroom/platformActivity/zzbxActivity/history'),
					meta: {
						title: '转转宝箱记录',
					},
					name: 'zzbxhistory'
				},
			]
		},
    {
      path: 'PK礼物管理',
      component: () => import('@/views/voiceroom/platformActivity/pkActivity/pkList'),
      meta: {
        title: 'PK礼物管理',
      },
      name: 'PK礼物管理'
    },
		{
			path: 'first-charge',
			component: () => import('@/views/voiceroom/platformActivity/first-charge/index'),
			meta: {
				title: '首充活动管理',
				noCache: true
			},
			name: 'first-charge'
		}
	]
}

export default platformActivityRouter
