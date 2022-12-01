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
          <el-col :span="12">
            <el-form-item label="app渠道" prop="channel">
              <el-input
                v-model="ruleForm.channel"
                placeholder="请输入app渠道"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户性别" prop="sex">
              <el-select
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
              </el-select> </el-form-item
          ></el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="开始时间" prop="start_time">
              <el-date-picker
                :disabled="disabled"
                v-model="ruleForm.start_time"
                value-format="timestamp"
                type="datetime"
                :picker-options="StartPicker"
                placeholder="请选择开始时间"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结束时间" prop="end_time" :rules="EndRules">
              <el-date-picker
                :disabled="disabled"
                v-model="ruleForm.end_time"
                :picker-options="EndPicker"
                value-format="timestamp"
                type="datetime"
                placeholder="请选择结束时间"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="房间ID" prop="room_number">
          <el-row>
            <el-col :span="16">
              <el-input
                v-model="ruleForm.room_number"
                placeholder="请输入房间ID"
                @blur="hanlderBlur(ruleForm.room_number)"
              ></el-input>
            </el-col>
            <el-col :span="6" style="margin-left: 10px">
              <el-button type="primary" @click="handlerAdd">添加</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <div class="body_box-table">
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
            <el-table-column prop="id" label="直播间ID" width="200">
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
} from "@/api/videoRoom";
import { param } from "@/utils";
// 引入公共map
import MAPDATA from "@/utils/jsonMap.js";
// 引入格式化时间包
import moment from "moment";
export default {
  components: {},
  data() {
    return {
      status: "add",
      isEditComp: false,
      rankList: MAPDATA.CLASSLIST,
      guildTypeList: MAPDATA.GUILDCONFIGTYPELIST,
      ruleForm: {
        channel: "",
        sex: "",
        start_time: null,
        end_time: null,
        room_ids: [],
      },
      oldParams: {}, // 老数据
      rules: {
        channel: [
          { required: true, message: "请输入app渠道", trigger: "blur" },
        ],
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
      },
      tableData: [],
      roomIds: [],
      sexList: [
        { name: "男", value: "1" },
        { name: "女", value: "2" },
      ],
      fulfilStatus: true,
    };
  },
  computed: {
    title() {
      // 标题
      return "提示";
    },
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
  },
  methods: {
    // 新增 - 修改
    async loadParams(status, row) {
      this.openComp();
      this.status = status;
      if (status !== "add") {
        let params = JSON.parse(JSON.stringify(row));
        let para = {};
        para.channel = params.channel || "";
        para.sex = params.sex + "" || "";
        para.start_time = params.start_time * 1000;
        para.end_time = params.end_time * 1000;
        const res = await this.handlerGetHasConfigRoom(params.id);
        para.room_ids = res.data.rooms.reduce((pev, cur) => {
          pev.push({
            id: cur.id + "",
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

          if (!(params.room_ids && params.room_ids.length)) {
            this.$message.error("直播间ID不能为空");
            return false;
          }

          if (params.room_number || params.room_number === "") {
            delete params.room_number;
          }
          params.start_time = Math.floor(params.start_time / 1000);
          params.end_time = Math.floor(params.end_time / 1000);

          let res;
          if (this.status === "add") {
            res = await addAutoJoinRule(params);
          } else {
            res = await updateAutoJoinRule(params);
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
    handlerAdd() {
      this.$confirm("此操作将添加渠道进房, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        if (this.fulfilStatus) {
          this.roomIds.forEach((item) => {
            this.tableData.push({
              id: item,
              create_time: moment(new Date().getTime()).format(
                "YYYY-MM-DD HH:mm:ss"
              ),
            })
          });
          console.log(this.tableData);
          this.$message.success("添加成功");
        } else {
          this.$message.info("数据已存在");
        }
        this.fulfilStatus = true;
      });
    },
    hanlderBlur(room_number) {
      if (!room_number) {
        return false;
      }
      this.handlerCheckAutoJoinRule(room_number);
    },
    async handlerCheckAutoJoinRule(room_number) {
      let res = await checkAutoJoinRule({ room_number });
      if (+res.code === 2000) {
        // if (this.roomIds.indexOf(res.data.id)) {
          this.roomIds.push(res.data.id + "");
          this.fulfilStatus = true;
        // }
      }
    },
    handlerGetHasConfigRoom(id) {
      return new Promise(async (resolve) => {
        let res = await getHasConfigRoom({ id });
        if (+res.code === 2000) {
          resolve(res);
        }
      });
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
