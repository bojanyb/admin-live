/** When your routing table is too long, you can split it into small modules**/

import Layout from "@/layout";
const serviceConfigRouter = {
  path: "/serviceConfig",
  component: Layout,
  redirect: "noRedirect",
  name: "serviceConfig",
  meta: {
    title: "风控客服",
    icon: "el-icon-s-custom",
  },
  children: [
    {
      path: "audioTest",
      component: () => import("@/views/voiceroom/serviceConfig/audioTest"),
      name: "audioTest",
      meta: {
        title: "音频检测",
        noCache: true,
      },
    },
    {
      path: "userPunish",
      component: () =>
        import("@/views/voiceroom/serviceConfig/userPunish_copy"),
      name: "userPunish",
      meta: {
        title: "用户处罚",
        noCache: true,
      },
    },
    {
      path: "coverAudit",
      component: () => import("@/views/voiceroom/serviceConfig/coverAudit"),
      name: "coverAudit",
      meta: {
        title: "封面审核",
        noCache: true,
      },
    },
    {
      path: "message-history",
      component: () =>
        import("@/views/voiceroom/serviceConfig/message-history"),
      name: "message-history",
      meta: {
        title: "消息记录",
        noCache: true,
      },
    },
    {
      path: "imgAudit_history",
      component: () =>
        import("@/views/voiceroom/serviceConfig/imgAudit_history"),
      name: "imgAudit_history",
      meta: {
        title: "图片审核记录",
        noCache: true,
      },
    },
    {
      path: "imgAudit_history",
      component: () =>
        import("@/views/voiceroom/serviceConfig/imgAudit_history"),
      name: "imgAudit_history",
      meta: {
        title: "图片审核记录",
        noCache: true,
      },
    },
    {
      path: "discuss-list",
      component: () => import("@/views/voiceroom/serviceConfig/discuss-list"),
      name: "discuss-list",
      meta: {
        title: "动态评论记录",
        noCache: true,
      },
    },
    {
      path: "user-search",
      component: () => import("@/views/voiceroom/serviceConfig/user-search"),
      name: "user-search",
      meta: {
        title: "用户列表",
        noCache: false,
      },
    },
    {
      path: "reporting-logs",
      component: () => import("@/views/voiceroom/serviceConfig/reporting-logs"),
      name: "reporting-logs",
      meta: {
        title: "提交举报",
        noCache: false,
      },
    },
  ],
};

export default serviceConfigRouter;
