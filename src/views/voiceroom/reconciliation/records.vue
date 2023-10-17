<script>
import GuideRecords from "./guild_records.vue";
import StreamerRecords from "./streamer_records.vue";
export default {
  components: {
    GuideRecords,
    StreamerRecords,
  },
};
</script>
<template>
  <div class="records">
    <el-tabs type="border-card">
      <el-tab-pane label="公会对公结算申请记录"><GuideRecords /></el-tab-pane>
      <el-tab-pane label="主播对公结算申请记录"
        ><StreamerRecords
      /></el-tab-pane>
    </el-tabs>
  </div>
</template>
<style lang="scss">
.records {
  padding: 20px;
}
</style>
