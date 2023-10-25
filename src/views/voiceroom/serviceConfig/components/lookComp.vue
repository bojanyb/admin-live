<template>
  <div class="lookComp-box">
    <el-dialog
      :visible.sync="dialogVisible"
      width="500px"
      :close-on-click-modal="false"
      :before-close="handleClose"
      @closed="closed"
    >
      <div v-if="type === 'user'|| category === 'report'" class="user-info-wrap">
        <div>用户等级：{{ user_rank }} 魅力等级：{{ live_rank }}</div>
        <br />
        <div v-if="guildList.length||reportGuildList.length">
          <div v-for="(item, index) in guildList" :key="index">
            当前所属{{ item.guild_type_str }}：{{ item.name }}（ID{{
              item.guild_number
            }}） 状态：{{ getStatusText(item.status) }} 所属运营：{{
              item.operator
            }}（后台名称）
          </div>
          <div v-for="(item, index) in reportGuildList" :key="index">
            被举报时所属{{ item.guild_type_str }}：{{ item.name }}（ID{{
              item.guild_number
            }}） 状态：{{ getStatusText(item.status) }} 所属运营：{{
              item.operator
            }}（后台名称）
          </div>
          <br />
        </div>
        <div>违规信息：{{ info.statistics }}</div>
        <div>实名信息：{{ info.real_name || "无" }}</div>
        <div>注册信息：{{ info.register }}</div>
        <div>用户状态：{{ info.curr_state }}</div>
      </div>
      <div v-else class="guild-info-wrap">
        <div>公会名称：{{info.guild_name}}</div>
        <div>当前公会所属运营：{{info.curr_operator}}</div>
        <div>被举报时公会所属运营：{{info.feedback_operator}}</div>
        <div>违规信息：{{info.count}}</div>
        <div>公会状态：{{info.status}}</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 引入api
import { getUserPunishDetail, getFeedbackGuildDetail, getReportGuildUserDetail } from "@/api/risk";
export default {
  data() {
    return {
      dialogVisible: false,
      type: 'user',
      category: '',
      info: {},
      user_rank: 0,
      live_rank: 0,
      guildList: [],
      reportGuildList: [],
    };
  },
  methods: {
    getStatusText(status) {
      //公会状态：1正常, 2封禁(冻结), 3已解散
      const obj = {
        1: "正常",
        2: "封禁",
        3: "已解散",
      };
      return obj[status] || "";
    },
    handleClose() {
      this.dialogVisible = false;
    },
    async load(params) {
      this.type = params.type;
      this.category = params.category;
      this.dialogVisible = true;
      if(params.type === 'user'|| params.category === 'report') {
        this.getUserDetail(params)
      } else {
        this.getGuildDetail(params)
      }
    },
    async getUserDetail(params) {
      let res;
      // 公会的举报用户接口取值不同
      if(params.type === 'guild' && params.category === 'report') {
        res = await getReportGuildUserDetail(params)
      } else {
        res = await getUserPunishDetail(params)
      }
      console.log("[ res ] >", res);
      if (res.code === 2000) {
        const data = res.data;
        this.info = data;
        this.user_rank = data.user_level.user_rank;
        this.live_rank = data.user_level.live_rank;
        this.guildList = data.guild;
        this.reportGuildList = data.report_guild;
      }
    },
    async getGuildDetail(params) {
      const res = await getFeedbackGuildDetail({report_event_id: params.report_event_id});
      console.log("[ res ] >", res);
      if (res.code === 2000) {
        this.info = res.data;
      }
    },
    // 销毁组件
    closed() {
      this.$emit("destoryComp");
      this.tableData = [];
    },
  },
};
</script>

<style lang="scss">
</style>
