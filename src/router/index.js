import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import dashboardRouter from './modules/dashboard'
import blockedRouter from './modules/blocked'
import nobilityRouter from './modules/nobility'
import chartsRouter from './modules/charts'
import voiceroomRouter from './modules/room/voiceroom'
import systemConfigRouter from './modules/systemConfig/system'
import userRouter from './modules/user/user'
import guildAuditRouter from './modules/guild/guildAudit'
import giveAwayRouter from './modules/giveAway/giveAway'
// import activityRouter from "./modules/activity/index"
import platformActivityRouter from "./modules/platformActivity/index.js"
import userActivity from "./modules/userActivity/index.js"

import paySystemRouter from './modules/paySystem/paySystem.js'
import reportRouter from './modules/report/index.js'
import logOutRouter from './modules/logOut/index.js'
import auditRouter from './modules/audit/index.js'
import dealRouter from './modules/deal/index.js'
import promoteRouter from './modules/promote/index.js'
import shoppingRouter from './modules/shopping/index.js'
import messageRouter from './modules/message/index.js'
import moveDatingRouter from './modules/moveDating/index.js'
import serviceConfigRouter from './modules/serviceConfig/index.js'
import roomConfigRouter from './modules/roomConfig/index.js'


/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
		path: '/login',
		component: () => import('@/views/login/index'),
		hidden: true
	},
	{
		path: '/register',
		component: () => import('@/views/login/register'),
		hidden: true
	},
	{
		path: '/auth-redirect',
		component: () => import('@/views/login/auth-redirect'),
		hidden: true
	},
	{
		path: '/404',
		component: () => import('@/views/error-page/404'),
		hidden: true
	},
	{
		path: '/401',
		component: () => import('@/views/error-page/401'),
		hidden: true
	},
	// {
	// 	path: '/',
	// 	component: Layout,
	// 	redirect: '/overview/index',
	// }
]

export const asyncRoutes = [
	messageRouter,
	dashboardRouter,
	moveDatingRouter,
	serviceConfigRouter,
	roomConfigRouter,
	nobilityRouter,
	blockedRouter,
	// chartsRouter,
	userRouter,
	voiceroomRouter,
	guildAuditRouter,
	paySystemRouter,
	giveAwayRouter,
	dealRouter,
	platformActivityRouter,
	userActivity,
	reportRouter,
	logOutRouter,
	auditRouter,
	promoteRouter,
	// activityRouter,
	shoppingRouter,
	systemConfigRouter,
	// 404 page must be placed at the end !!!
	{
		path: '/animate',
		component: () => import('@/views/voiceroom/animate.vue'),
		hidden: true
	},
	{
		path: '*',
		redirect: '/404',
		hidden: true
	}
]

const createRouter = () => new Router({
	// mode: 'history', // require service support
	scrollBehavior: () => ({
		y: 0
	}),
	routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
	const newRouter = createRouter()
	router.matcher = newRouter.matcher // reset router
}

export default router
