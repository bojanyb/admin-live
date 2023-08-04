<template>
  <div class="wordsEditComp-box">
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="50%"
      :close-on-click-modal="false"
      :before-close="handleClose"
      @closed="closed"
    >
      <template v-if="isBatch">
        <el-tabs v-model="tabsValue" @tab-click="handleClick">
          <el-tab-pane
            v-for="item in formList"
            :key="item.id"
            :label="item.name"
            :name="String(item.id)"
          >
              <el-form class="demo-ruleForm" :model="item">
                <el-form-item prop="warning_msg">
                  <el-input
                    type="textarea"
                    placeholder="请输入警告提示"
                    :rows="4"
                    v-model="item.warning_msg"
                  ></el-input>
                </el-form-item>
              </el-form>
          </el-tab-pane>
        </el-tabs>
      </template>
      <template v-else>
        <el-form v-if="formList[0]" class="demo-ruleForm" :model="formList[0]">
          <el-form-item prop="warning_msg">
            <el-input
              type="textarea"
              placeholder="请输入警告提示"
              :rows="4"
              v-model="formList[0].warning_msg"
            ></el-input>
          </el-form-item>
        </el-form>
      </template>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 引入api
import { updatePunishWords } from "@/api/risk";
import { deepClone } from "@/utils/index"
export default {
  data() {
    return {
      dialogVisible: false,
      isBatch: false,
      title: "编辑",
      formList: [],
      tabsValue: '',
    };
  },
  methods: {
    // 关闭弹窗
    handleClose() {
      this.dialogVisible = false
    },
    // 获取数据
    loadParams(row) {
      this.dialogVisible = true
      console.log('[ row ] >', row)
      if (Array.isArray(row)) {
        this.isBatch = true;
        this.title = "批量编辑";
        this.formList = deepClone(row);
        this.tabsValue = String(row[0].id);
      } else {
        let params = deepClone(row);
        this.formList.push(params);
      }
    },
    // 销毁组件
    closed() {
      this.$emit('destoryComp')
    },
    // 提交
    async submitForm() {
      let params = { data: this.formList };
      let res = await updatePunishWords(params);
      if (res.code === 2000) {
        this.$success("操作成功!");
        this.dialogVisible = false
        this.$emit('getList')
      }
    },
    handleClick(value) {
      console.log('[ value ] >', value)
    },
  },
};
</script>

<style lang="scss"></style>
