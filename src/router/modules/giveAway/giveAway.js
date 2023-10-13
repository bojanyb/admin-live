/** When your routing table is too long, you can split it into small modules**/

import Layout from "@/layout";

const giveAwayRouter = {
  path: "/giveAway",
  component: Layout,
  redirect: "noRedirect",
  name: "giveAway",
  meta: {
    title: "财务管理",
    icon: "el-icon-goods",
  },
  children: [
    {
      path: "giveMe",
      component: () =>
        import("@/views/voiceroom/activity/giftHistory/giveAway"),
      meta: {
        title: "平台赠送",
      },
      name: "giveMe",
    },
    {
      path: "giftHistory-list",
      component: () =>
        import("@/views/voiceroom/activity/giftHistory/giftHistory-list"),
      meta: {
        title: "赠送记录",
      },
      name: "giftHistory-list",
    },
    {
      path: "payment-list",
      component: () => import("@/views/voiceroom/finance/payment-list"),
      name: "payment-list",
      meta: {
        title: "支付配置管理",
        noCache: true,
      },
    },
    {
      path: "commercial-list",
      component: () => import("@/views/voiceroom/finance/commercial-list"),
      name: "commercial-list",
      meta: {
        title: "支付商户配置管理",
        noCache: true,
      },
    },
    {
      path: "deposit-list",
      component: () => import("@/views/voiceroom/finance/deposit-list"),
      name: "deposit-list",
      meta: {
        title: "提现商户配置管理",
        noCache: true,
      },
    },
    {
      path: "guildWithdraw-list",
      component: () => import("@/views/voiceroom/finance/guildWithdraw-list"),
      name: "guildWithdraw-list",
      meta: {
        title: "充值记录",
        noCache: true,
      },
    },
    {
      path: "embodyApply-list",
      component: () => import("@/views/voiceroom/finance/embodyApply"),
      name: "embodyApply-list",
      meta: {
        title: "提现申请",
        noCache: true,
      },
    },
    {
      path: "withdrawal-channel",
      component: () => import("@/views/voiceroom/finance/withdrawalChannel"),
      name: "withdrawal-channel",
      meta: {
        title: "提现通道管理",
        noCache: true,
      },
    },
    {
      path: "withdrawal-account",
      component: () =>
        import("@/views/voiceroom/finance/withdrawalAccount.vue"),
      name: "withdrawal-account",
      meta: {
        title: "提现账户管理",
        noCache: true,
      },
    },
    {
      path: "embodyHistory-list",
      component: () => import("@/views/voiceroom/finance/embodyHistory"),
      name: "embodyHistory-list",
      meta: {
        title: "提现记录",
        noCache: true,
      },
    },
    // {
    // 	path: 'payType',
    // 	component: () => import('@/views/voiceroom/paySystem/payType'),
    // 	name: 'payType',
    // 	meta: {
    // 		title: '支付配置',
    // 		noCache: true
    // 	}
    // },
    {
      path: "operateHistory",
      component: () => import("@/views/voiceroom/paySystem/operateHistory"),
      name: "operateHistory",
      meta: {
        title: "操作记录",
        noCache: true,
      },
    },
    {
      path: "reconciliation/records",
      component: () => import("@/views/voiceroom/reconciliation/records.vue"),
      name: "reconciliationRecords",
      meta: {
        title: "对公结算记录",
        noCache: true,
      },
    },
  ],
};

export default giveAwayRouter;
