<template>
  <div class="dialog_body_box">
    <el-dialog
      :title="title"
      :width="'600px'"
      @closed="closed"
      :visible.sync="isEditComp"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="90px"
        class="body_box-line"
        label-suffix=":"
        :hide-required-asterisk="status === 'see'"
      >
        <el-row>
          <el-col :span="21">
            <el-form-item label="渠道编号" prop="code">
              <!-- <el-input
                v-model="ruleForm.code"
                placeholder="请输入渠道编号"
                :disabled="status === 'update'"
              ></el-input> -->
              <el-select
                v-model="ruleForm.code"
                :disabled="status === 'update'"
                placeholder="请选择渠道编号"
              >
                <el-option
                  v-for="item in channelsList"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="用户性别" prop="sex" v-if="tabIndex === '0'">
              <!-- <el-select
                v-model="ruleForm.sex"
                :disabled="disabled"
                placeholder="请选择用户性别"
              >
                <el-option
                  v-for="item in sexList"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select> -->
                <el-radio-group v-model="ruleForm.sex">
                  <el-radio label="0">全部</el-radio>
                  <el-radio label="1">男</el-radio>
                  <el-radio label="2">女</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="渠道名称" prop="name" v-else>
              <el-input
                v-model="ruleForm.name"
                placeholder="请输入渠道名称"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row v-if="tabIndex === '0'">
           <el-col :span="24">
              <el-form-item label="是否限时" prop="rule_type">
                <el-radio-group v-model="ruleForm.rule_type">
                  <el-radio label="2">否</el-radio>
                  <el-radio label="1">是</el-radio>
                </el-radio-group>
              </el-form-item>
          </el-col>
        </el-row> -->

        <el-row v-if="tabIndex === '0' && ruleForm.rule_type === '1'">
           <el-col :span="24">
              <el-form-item label="生效日期" prop="effect_time">
                <el-date-picker
                  v-model="ruleForm.effect_time"
                  type="datetimerange"
                  value-format="timestamp"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
          </el-col>
        </el-row>

        <el-row v-if="tabIndex === '0' && ruleForm.rule_type === '1'">
          <el-col :span="12">
            <el-form-item
              label="开始时间"
              prop="start_time"
            >
              <el-time-picker
                v-model="ruleForm.start_time"
                value-format="timestamp"
                placeholder="请选择开始时间"
              >
              </el-time-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结束时间" prop="end_time">
              <el-time-picker
                v-model="ruleForm.end_time"
                value-format="timestamp"
                placeholder="请选择结束时间"
              >
              </el-time-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="进入人数" prop="number" v-if="tabIndex === '0'">
          <el-row>
            <el-col :span="16">
              <el-input
                v-model="ruleForm.number"
                placeholder="请输入进入人数"
              ></el-input>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="房间ID" prop="room_number" v-if="tabIndex === '0'">
          <el-row>
            <el-col :span="16">
              <el-input
                v-model="ruleForm.room_number"
                placeholder="请输入房间ID"
              ></el-input>
            </el-col>
            <el-col :span="6" style="margin-left: 10px">
              <el-button
                type="primary"
                @click="handlerAdd(ruleForm.room_number)"
                >添加</el-button
              >
            </el-col>
          </el-row>
        </el-form-item>
        <div class="body_box-table" v-if="tabIndex === '0'">
          <el-table
            :data="tableData"
            border
            style="width: 100%"
            max-height="250"
          >
            <el-table-column
              fixed
              prop="create_time"
              label="添加时间"
              width="200"
            >
            </el-table-column>
            <el-table-column prop="live_number" label="直播间ID" width="200">
            </el-table-column>
            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="deleteRow(scope.$index, tableData)"
                  type="text"
                  size="small"
                >
                  移除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <el-form-item label="渠道ID" prop="channels" v-if="tabIndex === '1'">
          <el-input
            v-model="ruleForm.channels"
            placeholder="请输入渠道ID"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 引入api
import {
  addAutoJoinRule,
  updateAutoJoinRule,
  checkAutoJoinRule,
  getHasConfigRoom,
  insertChannels,
  updateChannels,
  getChannels
} from "@/api/videoRoom";
import { param } from "@/utils";
// 引入公共map
import MAPDATA from "@/utils/jsonMap.js";
// 引入格式化时间包
import moment from "moment";
export default {
  components: {},
  props: {
    tabIndex: {
      // 当前坐标
      type: String,
      default: "",
    },
  },
  data() {
    return {
      status: "add",
      isEditComp: false,
      rankList: MAPDATA.CLASSLIST,
      guildTypeList: MAPDATA.GUILDCONFIGTYPELIST,
      ruleForm: {
        code: "",
        sex: "0",
        start_time: null,
        end_time: null,
        room_ids: [],
        rule_type: "1",
        effect_time: []
      },
      oldParams: {}, // 老数据
      rules: {
        code: [{ required: true, message: "请输入渠道编号", trigger: "blur" }],
        room_number: [
          { required: false, message: "请输入房间ID", trigger: "blur" },
        ],
        sex: [{ required: true, message: "请输入用户性别", trigger: "blur" }],
        start_time: [
          {
            type: "date",
            required: true,
            message: "请选择开始时间",
            trigger: "change",
          },
        ],
        end_time: [
          {
            type: "date",
            required: true,
            message: "请选择结束时间",
            trigger: "change",
          },
        ],
        name: [{ required: true, message: "请输入渠道名称", trigger: "blur" }],
        channels: [
          { required: true, message: "请输入渠道ID", trigger: "blur" },
        ],
        rule_type: [{ required: true, message: "请选择是否限时", trigger: "blur" }],
        effect_time: [{ required: true, message: "请选择生效日期", trigger: "change" }],
        number: [
          { required: true, message: "请输入进入人数", trigger: "blur" },
        ],
      },
      tableData: [],
      sexList: [
        { name: "男", value: "1" },
        { name: "女", value: "2" },
      ],
      channelsList: [],
    };
  },
  computed: {
    StartRules() {
      let params = {};
      let start = this.ruleForm.start_time;
      params = {
        required: true,
        validator: (rules, val, cb) => {
          if (start < new Date().getTime()) {
            cb(new Error("开始时间不能小于当前时间!"));
          } else {
            cb();
          }
        },
      };
      return params;
    },
    EndRules() {
      let params = {};
      let start = this.ruleForm.start_time;
      let end = this.ruleForm.end_time;
      params = {
        required: true,
        validator: (rules, val, cb) => {
          if (end < new Date().getTime()) {
            cb(new Error("结束时间不能小于当前时间!"));
          }
          if (start && end <= start) {
            cb(new Error("结束时间不能小于开始时间!"));
          } else {
            cb();
          }
        },
      };
      return params;
    },
    StartPicker() {
      return {
        disabledDate: (time) => {
          return time.getTime() < new Date().getTime() - 24 * 60 * 60 * 1000;
        },
      };
    },
    EndPicker() {
      return {
        disabledDate: (time) => {
          if (!this.ruleForm.start_time) {
            return time.getTime() < new Date().getTime() - 24 * 60 * 60 * 1000;
          }
          return (
            time.getTime() < this.ruleForm.start_time - 24 * 60 * 60 * 1000
          );
        },
      };
    },
    disabled() {
      // 是否禁止输入
      if (this.status === "see") {
        return true;
      }
      return false;
    },
    title() {
      // 标题
      if (this.tabIndex === "0") {
        return "渠道进房";
      } else {
        return "渠道设置";
      }
    },
  },
  methods: {
    // 新增 - 修改
    async loadParams(status, row) {
      this.openComp();
      this.status = status;
      if (status !== "add") {
        let params = JSON.parse(JSON.stringify(row));
        let para = {};
        const ZeroPoint = new Date(new Date().toLocaleDateString()).getTime();
        para.code = params.code || "";
        para.name = params.name || "";
        para.number = params.number || "";
        para.channels = params.channels || "";
        para.sex = params.sex + "" || "";

        // 是否限时
        para.rule_type = params.rule_type + "" || "2";
        // 生效时间
        if (para.rule_type === "1") {
          para.start_time = ZeroPoint + params.start_time * 1000;
          para.end_time = ZeroPoint + params.end_time * 1000;
          para.effect_time = [params.valid_at * 1000, params.invalid_at * 1000]
        }

        const res = await this.handlerGetHasConfigRoom(params.id);
        para.room_ids = res.data.rooms.reduce((pev, cur) => {
          pev.push({
            id: cur.id + "",
            live_number: cur.room_number + "",
            create_time: moment(cur.create_time * 1000).format(
              "YYYY-MM-DD HH:mm:ss"
            ),
          });
          return pev;
        }, []);
        this.$set(this.$data, "ruleForm", para);
        this.tableData = para.room_ids;
        this.ruleForm.id = params.id;
      }

      this.oldParams = JSON.parse(JSON.stringify(this.ruleForm));
      this.getChannelsList();
    },
    openComp(status = true) {
      this.isEditComp = status;
    },
    // 取消
    cancel() {
      if (JSON.stringify(this.oldParams) !== JSON.stringify(this.ruleForm)) {
        // 记录数据 - 有改动就提示
        this.$confirm("关闭弹窗将不会保留您的更改, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.openComp(false);
          })
          .catch(() => {});
      } else {
        this.openComp(false);
      }
    },
    // 修改
    update() {
      this.status = "update";
    },
    // 提交
    async submitForm() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          let params = { ...this.ruleForm };
          params.room_ids = this.tableData.reduce((pev, cur) => {
            pev.push(cur.id);
            return pev;
          }, []);

          if (!(params.room_ids && params.room_ids.length) && this.tabIndex === "0") {
            this.$message.error("直播间ID不能为空");
            return false;
          }

          if (params.room_number || params.room_number === "") {
            delete params.room_number;
          }
          const ZeroPoint =
            new Date(new Date().toLocaleDateString()).getTime() / 1000;
          const startTime = Math.floor(params.start_time / 1000);
          const endTime = Math.floor(params.end_time / 1000);
          params.start_time = (startTime - ZeroPoint - 1) >= 0  ? startTime - ZeroPoint - 1 : 0;
          params.end_time = (endTime - ZeroPoint - 1) >= 0 ? endTime - ZeroPoint - 1 : 0;
          // 生效时间
          if (params && params.effect_time) {
             params.valid_at = params.effect_time[0] / 1000;
             params.invalid_at = params.effect_time[1] / 1000;
          }
          delete params.effect_time;

          // 渠道编号全选

          console.log(params.start_time, params.end_time);
          let temp = {
            code: params.code,
            name: params.name,
            channels: params.channels
          }
          let res;
          if (this.status === "add") {
            if (this.tabIndex === "0") {
              res = await addAutoJoinRule(params);
            } else if (this.tabIndex === "1") {
              res = await insertChannels(temp);
            }

          } else {
            if (this.tabIndex === "0") {
               res = await updateAutoJoinRule(params);
            } else if (this.tabIndex === "1") {
               temp.id = params.id
               res = await updateChannels(temp);
            }
          }

          if (res.code === 2000) {
            this.$success("保存成功");
          }
          this.openComp(false);
          this.$emit("getList");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 重置
    resetForm() {
      this.openComp(false);
    },
    // 重置字段验证
    validateField(name) {
      this.$refs.ruleForm.validateField([name]);
    },
    // 销毁组件
    closed() {
      this.$emit("destoryComp");
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    handlerAdd(room_number) {
      if (!room_number) {
        this.$message.error("请检查房间ID是否为空");
        return false;
      }

      this.$confirm("此操作将添加渠道进房, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        let res = await checkAutoJoinRule({ room_number });
        if (+res.code === 2000) {
          this.tableData.push({
            id: res.data.id + "",
            live_number: res.data.room_number + "",
            create_time: moment(new Date().getTime()).format(
              "YYYY-MM-DD HH:mm:ss"
            ),
          });
        }
      });
    },
    handlerGetHasConfigRoom(id) {
      return new Promise(async (resolve) => {
        let res = await getHasConfigRoom({ id });
        if (+res.code === 2000) {
          resolve(res);
        }
      });
    },
    // 获取渠道
    async getChannelsList() {
      const params = {
        page: 1,
        pagesize: 100
      }
      const response = await getChannels(params)
      if(response.code == 2000){
        const tempArr = Array.from(
          Array.isArray(response.data.list) ? response.data.list : []
        )
        this.channelsList = tempArr.reduce((prev, curr) => {
          prev.push({
            name: curr.name,
            value: curr.code
          })
          return prev
        }, []) || [];

        const channelsAllString = this.channelsList.map(curr => {
          console.log(curr.value);
          return curr.value
        }).join(",")

        this.channelsList.unshift({ name: "全部", value: channelsAllString })
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog_body_box {
  .el-select,
  .el-input {
    width: 100%;
  }
  .body_box-table {
    width: 100%;
    margin: 0 auto;
  }
}
</style>
