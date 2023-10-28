<template>
  <div class="serviceConfig-userComp-box">
    <el-dialog
      title="新增举报"
      :visible.sync="dialogVisible"
      width="760px"
      :before-close="handleClose"
      :close-on-click-modal="false"
      @closed="closed"
    >
      <menuComp
        ref="menuComp"
        :menuList="menuList"
        v-model="tabIndex"
      ></menuComp>

      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        label-suffix=":"
      >
        <div class="inputBox">
          <el-form-item
            :label="tabIndex === '0' ? '用户ID' : '公会长ID'"
            prop="feedback_id"
            class="numberBox"
            label-width="110px"
          >
            <el-input
              v-model="ruleForm.search_id"
              @input="numberInput"
            ></el-input>
            <el-button type="success" @click="search()">查询</el-button>
          </el-form-item>
          <el-form-item label="举报类型" prop="selectedType">
            <el-select
              v-model="ruleForm.selectedType"
              placeholder="请选择"
              @change="handleTypeChange"
              :multiple="tabIndex === '1'"
              ref="typeSelect"
            >
              <el-option
                v-for="item in typeList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证据材料">
            <el-upload
              class="upload-demo"
              action="#"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              accept=".png,.jpg,.jpeg,.mp4"
              :on-exceed="handleExceed"
              :file-list="fileList"
              :http-request="upLoad"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">
                只能上传jpg/png/mp4文件
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item label="举报说明" prop="content">
            <el-input
              type="textarea"
              placeholder="请输入你的举报说明。"
              :rows="8"
              maxlength="200"
              show-word-limit
              v-model="ruleForm.content"
            ></el-input>
          </el-form-item>
        </div>

        <!-- 右侧信息栏 -->
        <div v-if="infoList.length > 0">
          <div class="infoBox" v-for="(item, index) in infoList" :key="index">
            <!-- :class="{ selected: item.selected }" -->
            <div
              class="upBox"

              @click="selectGuild(item)"
            >
              <img :src="item.face" alt="" />
              <div class="rightBox">
                <div class="name">{{ item.name }}</div>
                <div class="id">uid: {{ item.id }}</div>
                <div class="id">id: {{ item.number }}</div>
              </div>
            </div>
            <!-- <div class="downBox">
              <p>
                魅力等级：<span>{{ item.live_rank }}</span>
              </p>
            </div> -->
          </div>
        </div>
        <div class="infoBox emptyBox" v-if="infoList.length <= 0">暂无数据</div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 引入api
import { guildOrUserInfo, usersPunishList, guildsPunishList } from "@/api/risk";
// 引入抽屉组件
import drawer from "@/components/drawer/index";
// 引入上传组件
import uploadImg from "@/components/uploadImg/index.vue";
// 引入api
import {
  addUserPunish,
  saveUserPunish,
  punishStatus,
  reportGuildOrUser,
} from "@/api/risk";
// 引入公共map
import MAPDATA from "@/utils/jsonMap.js";
import moment from "moment";
// 引入oss
import { uploadOSS } from "@/utils/oss.js";
import { debounce } from "lodash";
// 引入tab菜单组件
import menuComp from "@/components/menuComp/index.vue";
export default {
  props: {
    isDetection: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    drawer,
    uploadImg,
    menuComp,
  },
  data() {
    return {
      fileList: [],
      dialogVisible: false,
      timeList: MAPDATA.DURATIONCOPY, // 处罚时长
      resetList: MAPDATA.USERPUNIRESETLISTCOPY,
      riskLevelList: MAPDATA.RISKLEVELLISTCOPY,
      status: "add",
      userList: [], // 查询用户
      ruleForm: {
        object_type: "user",
        search_id: null,
        feedback_id: null,
        types: "",
        img_path: "",
        video_path: "",
        content: "",
        selectedType: "",
      },
      oldParams: {}, // 老数据
      form: {},
      rules: {
        search_id: [
          {
            required: true,
            message: "请输入ID进行搜索",
            trigger: "blur",
          },
        ],
        selectedType: [
          { required: true, message: "请选择举报类型", trigger: "change" },
        ],
        content: [
          { required: true, message: "请填写举报备注", trigger: "change" },
        ],
      },
      menuList: [
        {
          name: "用户",
        },
        {
          name: "公会",
        },
      ],
      tabIndex: "0",
      infoList: [],
      typeList: [], //举报类型
      selectedType: "", //选中的举报类型数组
    };
  },
  computed: {},
  methods: {
    async getType() {
      if (this.tabIndex === "0") {
        let { data } = await usersPunishList();
        this.$nextTick(() => {
          this.typeList = data;
        });
      } else {
        let {
          data: { complaint_type },
        } = await guildsPunishList();
        let arr = [];
        for (let key in complaint_type) {
          arr.push({ id: key, name: complaint_type[key] });
          this.$nextTick(() => {
            this.typeList = arr;
          });
        }
      }
    },
    // 移除之后
    handleRemove(file, fileList) {
      console.log(fileList);
      this.fileList = fileList;
    },
    // 预览
    handlePreview(file) {
      console.log(file);
    },
    // 超出文件数量最大上传
    handleExceed(files, fileList) {
      this.$warning(`最大上传四个文件`);
    },
    // 移除文件之前
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // 上传
    upLoad(file) {
      uploadOSS(file.file)
        .then((res) => {
          if (res.url) {
            this.fileList.push({ name: file.file.name, url: res.url });
            // this.ruleForm.img = res.url;
          }
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
    // 限制id输入
    numberInput() {
      this.ruleForm.search_id = this.ruleForm.search_id.replace(/[^\d]/g, "");
    },
    // 关闭弹窗
    handleClose() {
      this.dialogVisible = false;
    },
    // 查询用户
    async search() {
      if (!this.ruleForm.search_id) {
        this.$warning("请输入用户/公会长ID");
        return false;
      }
      let res = await guildOrUserInfo({
        object_type: this.tabIndex === "0" ? "user" : "guild",
        user_number: this.ruleForm.search_id,
      });
      if (res.code === 2000) {
        this.infoList = Array.isArray(res.data) ? res.data : [res.data];
      }
    },
    // 用户封禁状态
    async getPunishStatus(user_id) {
      var formdata = new FormData();
      formdata.append("user_id", user_id);
      let res = await punishStatus(formdata);
      if (res.code === 2000) {
        this.$set(this.userList[0], "statusText", res.data.status);
        this.$set(this.userList[0], "lineText", res.data.stat);
      }
    },
    // 获取数据
    loadParams(status, row) {
      console.log(row, "row-------------2020");
      this.dialogVisible = true;
    },
    openComp(status = true) {
      this.$refs.drawer.loadParams(status);
    },
    // 提交
    submitForm: debounce(
      async function (formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            let params = {
              object_type: this.ruleForm.object_type,
              feedback_id: this.infoList[0].id,
              types: Array.isArray(this.ruleForm.selectedType)
                ? this.ruleForm.selectedType.join(",")
                : this.ruleForm.selectedType,
              img_path: "",
              video_path: "",
              content: this.ruleForm.content,
            };
            // if(this.tabIndex === '1'){
            //   params.feedback_id = this.infoList.filter(item => item.selected)[0].id
            // }
            let video_arr = [];
            let img_arr = []
            this.fileList.forEach((item) => {
              if (item.url.indexOf(".mp4") !== -1) {
                video_arr.push(item.url);
              } else {
                img_arr.push(item.url);
              }
            });
            params.video_path = video_arr.join(",");
            params.img_path = img_arr.join(",");
            if (params.types.length <= 0) {
              delete params.types;
            }
            console.log(params);
            let res = await reportGuildOrUser(params);
            if (res.code === 2000) {
              this.$success("添加成功");
              this.dialogVisible = false;
              this.$emit("getList");
            }
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
      1000,
      {
        leading: true,
        trailing: false,
      }
    ),
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 销毁组件
    closed() {
      this.$emit("destoryComp");
    },
    cancel() {
      if (JSON.stringify(this.oldParams) !== JSON.stringify(this.ruleForm)) {
        // 记录数据 - 有改动就提示
        this.$confirm("关闭弹窗将不会保留您的更改, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.dialogVisible = false;
          })
          .catch(() => {});
      } else {
        this.dialogVisible = false;
      }
    },
    // 修改
    update() {
      this.status = "update";
    },
    // 处罚类型变化
    handleCategoryChange(value) {
      if (value === "2") {
        this.rules.type[0].required = false;
        if (this.ruleForm.punish_type_id && this.punishTypeList.length) {
          const curItem = this.punishTypeList.find(
            (item) => item.value === this.ruleForm.punish_type_id
          );
          if (!curItem) return;
          this.ruleForm.remark = curItem.msg;
        }
      } else {
        this.rules.type[0].required = true;
        this.ruleForm.remark = "";
      }
    },
    // 处罚类别变化
    handleTypeChange(value) {
      if (this.tabIndex === "0") {
        this.ruleForm.selectedType = this.typeList.filter(
          (item) => item.id === value
        )[0].name;
      } else {
        this.ruleForm.selectedType = value;
      }
    },
    // 选择公会
    selectGuild(info) {
      this.infoList.forEach((item, index) => {
        this.$set(this.infoList, index, {
          ...item,
          selected: item.id === info.id,
        });
      });
    },
  },
  created() {
    this.getType();
  },
  watch: {
    tabIndex(newVal, oldVal) {
      this.getType();
      this.ruleForm = {
        object_type: newVal === "0" ? "user" : "guild",
        search_id: null,
        feedback_id: null,
        types: "",
        img_path: "",
        video_path: "",
        content: "",
        selectedType: "",
      };
      this.ruleForm.selectedType = newVal === "0" ? "" : [];
    },
  },
};
</script>

<style lang="scss">
.serviceConfig-userComp-box {
  .el-upload-list__item.is-ready {
    display: none;
  }
  .el-upload-list__item-name {
    width: 240px;
  }
  .el-select {
    width: 305px;
  }
  .el-textarea {
    width: 305px;
  }

  .el-form {
    display: flex;
  }

  .inputBox {
    .numberBox {
      .el-input {
        width: 200px;
      }

      .el-button {
        margin-left: 10px;
      }
    }
  }
  .infoBox {
    width: 270px;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.15);
    padding: 10px 20px;
    box-sizing: border-box;
    margin-left: 20px;
    height: 370px;
    .upBox.selected {
      border: 3px solid #1890ff;
    }
    .upBox {
      cursor: pointer;
      display: flex;
      align-items: center;
      > img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      .rightBox {
        margin-left: 20px;
        .name {
          font-size: 16px;
        }
        .id {
          font-size: 14px;
          margin-top: 5px;
        }
      }
    }
    .downBox {
      margin-top: 30px;
      p {
        line-height: 36px;
      }
    }
  }

  .infoBox_hign {
    // height: 270px;
    height: auto;
    .downBox {
      margin-top: 10px;
      p {
        line-height: 26px;
      }
    }
  }

  .infoBox_hign_copy {
    height: 311px;
    .downBox {
      margin-top: 30px;
      p {
        line-height: 30px;
      }
    }
  }

  .infoBox_hign_copy_box {
    // height: 370px;
    height: auto;
    .downBox {
      margin-top: 30px;
      p {
        line-height: 32px;
      }
    }
  }

  .infoBox_hign_copy_box_two {
    height: 211px;
    .downBox {
      margin-top: 5px;
      p {
        line-height: 20px;
      }
    }
  }

  .emptyBox {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
