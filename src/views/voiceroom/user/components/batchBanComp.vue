<template>
  <div class="batchBanComp-box">
    <el-dialog
      title="批量封禁"
      :visible.sync="dialogVisible"
      width="600px"
      :close-on-click-modal="false"
      :before-close="handleClose"
      @closed="closed"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        label-suffix=":"
      >
        <el-form-item label="用户" prop="user_number">
          <el-select
            v-model="ruleForm.user_number"
            placeholder="请选择"
            multiple
            clearable
          >
            <el-option
              v-for="item in userList"
              :key="item.id"
              :label="item.nickname"
              :value="item.id"
            >
              <span style="float: left">{{ item.nickname }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px; padding-right: 20px;">{{ item.user_number }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="处罚类别" prop="punish_type_id">
          <el-select
            v-model="ruleForm.punish_type_id"
            placeholder="请选择"
            @change="handleTypeChange"
          >
            <el-option
              v-for="item in punishTypeList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="处罚类型" prop="type">
          <div>
            <el-radio-group
              v-model="ruleForm.category"
              @change="handleCategoryChange"
            >
              <el-radio label="1">行为处罚</el-radio>
              <el-radio label="2">警告</el-radio>
            </el-radio-group>
            <el-select
              v-if="ruleForm.category === '1'"
              v-model="ruleForm.type"
              multiple
              placeholder="请选择"
            >
              <el-option
                v-for="item in typeList"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="风险级别" prop="risk_level">
          <el-select v-model="ruleForm.risk_level" placeholder="请选择">
            <el-option
              v-for="item in riskLevelList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="处罚时间"
          prop="ban_duration"
          v-if="!isIncludeReset && ruleForm.category === '1'"
        >
          <el-select
            v-model="ruleForm.ban_duration"
            placeholder="请选择"
            clearable
          >
            <el-option
              v-for="(item, index) in timeList"
              :key="index"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="违规证据">
          <el-upload
            class="upload-demo"
            action="#"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :limit="1"
            accept=".png,.jpg,.jpeg,.mp4"
            :on-exceed="handleExceed"
            :file-list="fileList"
            :http-request="upLoad"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png/mp4文件</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="备注说明" prop="remark">
          <el-input
            type="textarea"
            placeholder="请输入备注内容，此内容用户不会看到，建议20个字以内。"
            :rows="4"
            maxlength="20"
            show-word-limit
            v-model="ruleForm.remark"
            :disabled="ruleForm.category === '2'"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 引入api
import { getPunishTypeList } from "@/api/videoRoom";
import { addBatchUserPunish } from "@/api/risk";
// 引入公共map
import MAPDATA from "@/utils/jsonMap.js";
// 引入oss
import { uploadOSS } from "@/utils/oss.js";
// 引入工具
import { debounce } from "lodash";
// 引入上传组件
import uploadImg from "@/components/uploadImg/index.vue";
export default {
  components: {
    uploadImg,
  },
  data() {
    return {
      dialogVisible: false,
      timeList: MAPDATA.DURATIONCOPY, // 处罚时长
      riskLevelList: MAPDATA.RISKLEVELLISTCOPY, // 风险级别
      // typeList: MAPDATA.USERPUNISHTYPELISTCOPYTWO, // 处罚类型
      punishTypeList: [], // 处罚类别
      userList: [], // 用户列表
      fileList: [], // 文件列表
      ruleForm: {
        user_number: [],
        category: "1",
        type: [],
        risk_level: "",
        ban_duration: "",
        remark: "",
        reset: [],
        punish_type_id: null,
      },
      rules: {
        user_number: [
          { required: true, message: "请选择用户", trigger: "blur" },
        ],
        punish_type_id: [
          { required: true, message: "请选择处罚类别", trigger: "change" },
        ],
        type: [{ required: true, message: "请选择处罚类型", trigger: "blur" }],
        risk_level: [
          { required: true, message: "请选择风险级别", trigger: "blur" },
        ],
        reset: [
          { required: false, message: "请选择重置资料", trigger: "change" },
        ],
        ban_duration: [
          { required: true, message: "请选择处罚时间", trigger: "change" },
        ],
        remark: [
          { required: true, message: "请输入处罚备注", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getPunishType();
  },
  computed: {
    isIncludeReset() {
      // 是否包含重置资料
      let arr = JSON.parse(JSON.stringify(MAPDATA.TIMEPENALTYSTATUS));
      let isShow = true;
      if (this.ruleForm.type.length > 0) {
        arr.forEach((item) => {
          if (this.ruleForm.type.indexOf(item.value) !== -1) {
            isShow = false;
          }
        });
      } else {
        isShow = false;
      }
      return isShow;
    },
    typeList() {
      // 处罚类型
      let arr = JSON.parse(JSON.stringify(MAPDATA.USERPUNISHTYPELISTCOPYTWO));
      let arr1 = this.ruleForm.type.filter((item) => {
        return item > 10;
      });

      let arr2 = arr.map((item) => {
        let params = {
          name: item.name,
          value: item.value,
          disabled: false,
        };
        if (this.ruleForm.type.length > 0) {
          if (arr1.length > 0) {
            if (item.value < 10) {
              params.disabled = true;
            } else {
              params.disabled = false;
            }
          } else {
            if (item.value > 10) {
              params.disabled = true;
            } else {
              params.disabled = false;
            }
          }
        }
        return params;
      });
      return arr2;
    },
  },
  methods: {
    // 移除之后
    handleRemove(file, fileList) {
      this.fileList = fileList;
    },
    // 预览
    handlePreview(file) {
      console.log(file);
    },
    // 超出文件数量最大上传
    handleExceed(files, fileList) {
      this.$warning(`最大上传一个文件`);
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
            console.log("[ res ] >", res);
            this.fileList.push({ name: file.file.name, url: res.url });
            // this.ruleForm.img = res.url;
          }
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
    // 关闭弹窗
    handleClose() {
      this.dialogVisible = false;
      this.resetForm("ruleForm");
    },
    // 获取数据
    loadParams(params) {
      this.dialogVisible = true;
      this.userList = params;
      const ids = params.map((item) => item.id);
      this.$set(this.ruleForm, 'user_number', ids)
    },
    // 获取处罚类别
    async getPunishType(params) {
      const response = await getPunishTypeList(params);
      if (response.code == 2000) {
        const tempArr = Array.from(
          Array.isArray(response.data) ? response.data : []
        );
        this.punishTypeList =
          tempArr.reduce((prev, curr) => {
            prev.push({
              name: curr.name,
              value: curr.id,
              msg: curr.warning_msg,
            });
            return prev;
          }, []) || [];
      }
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
      if (this.ruleForm.category === "2") {
        const curItem = this.punishTypeList.find(
          (item) => item.value === value
        );
        if (!curItem) return;
        this.ruleForm.remark = curItem.msg;
      }
    },
    // 提交
    submitForm: debounce(async function (formName) {
      console.log('[ this.ruleForm ] >', this.ruleForm)
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let params = { 
            ...this.ruleForm,
            user_ids: this.ruleForm.user_number.join(",")
          };
          if (this.fileList.length) {
            const videoList = [],
              imgList = [];
            this.fileList.forEach((item) => {
              if (item.url.indexOf(".mp4") !== -1) {
                videoList.push(item.url);
              } else {
                imgList.push(item.url);
              }
            });
            params.video_path = videoList.join(",");
            params.img_path = imgList.join(",");
          }
          let arr = JSON.parse(JSON.stringify(params.type));
          params.reset = arr.filter((item) => {
            return item > 10 && item !== 15;
          });
          params.type = arr.filter((item) => {
            return item < 10 || item === 15;
          });
          if (params.type.length <= 0 && params.reset.length > 0) {
            params.ban_duration = 900;
          }
          if (params.type.length <= 0) {
            delete params.type;
          }
          if (params.reset.length <= 0) {
            delete params.reset;
          }
          let res = await addBatchUserPunish(params);
          if (res.code === 2000) {
            this.$success("操作成功");
            this.dialogVisible = false;
            this.$emit("getList");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }, 1000),
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 销毁组件
    closed() {
      this.$emit("destoryComp");
    },
  },
};
</script>

<style lang="scss">
.batchBanComp-box {
  .el-select, .el-textarea {
    width: 420px;
  }
}
</style>
