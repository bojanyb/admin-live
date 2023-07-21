<template>
  <div class="editor-body-box">
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="800px"
      :before-close="handleClose"
      :close-on-click-modal="false"
      @closed="destoryComp"
    >
      <div class="editor-body-main">
        <el-form
          :model="ruleForm"
          :rules="rules"
          label-suffix=":"
          ref="ruleForm"
          label-width="110px"
          class="demo-ruleForm"
        >
          <!-- 结算信息详情 -->
          <el-card class="editor-body-text" shadow="never">
            <el-row>
              <el-col :span="12">
                <el-form-item label="收款账户" class="body-box-item">
                  {{ ruleForm.bank_card }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="开户银行" class="body-box-item">
                  {{ ruleForm.bank_name }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="开户名称" class="body-box-item">
                  {{ ruleForm.owner_name }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="提现金额" class="body-box-item">
                  {{ ruleForm.apply_amount }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="异常扣除" class="body-box-item">
                  {{ ruleForm.abnormal_money }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="其它扣除" class="body-box-item">
                  {{ ruleForm.other_money }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="实际金额" class="body-box-item">
                  {{ ruleForm.cash_money }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="发票税率" class="body-box-item">
                  {{ ruleForm.cash_invoice_rate }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="手续费率" class="body-box-item">
                  {{ ruleForm.cash_fee_rate }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="手续费" class="body-box-item">
                  {{ ruleForm.cash_fee }}
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="实际收入" class="body-box-item">
                  {{ ruleForm.real_money }}
                </el-form-item>
              </el-col>
            </el-row>
          </el-card>
        </el-form>

        <!-- 账单状态 -->
        <el-form
          :model="checkForm"
          :rules="rules"
          label-suffix=":"
          ref="ruleForm"
          label-width="110px"
          class="demo-ruleForm"
        >
          <el-card class="editor-body-form" shadow="never">
            <el-row>
              <el-col :span="24">
                <el-form-item label="账单状态" class="body-box-item">
                  {{ ruleForm.status | filterCheckAudit }}
                </el-form-item>
              </el-col>
              <template v-if="ruleForm.status === 1">
                <el-col :span="24">
                  <el-form-item label="审核结果" prop="audit_status">
                    <el-radio-group v-model="checkForm.audit_status" @input="handleAuditInput">
                      <el-radio :label="0">审核退回</el-radio>
                      <el-radio :label="1">确认结算</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>

                <template v-if="checkForm.audit_status === 0">
                  <el-col :span="24">
                    <el-form-item label="失败原因" prop="fail_reason">
                      <el-input
                        type="textarea"
                        v-model="checkForm.fail_reason"
                        maxlength="50"
                        show-word-limit
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </template>

                <template v-if="checkForm.audit_status === 1">
                  <el-col :span="24">
                    <el-form-item
                      label="实际开票金额"
                      prop="real_invoice_money"
                    >
                      <el-input
                        v-model="checkForm.real_invoice_money"
                        type="number"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="发票超额">
                      {{
                        !isNaN(checkForm.real_invoice_money)
                          ? (+checkForm.real_invoice_money - +ruleForm.real_money).toFixed(2)
                          : "--"
                      }}
                    </el-form-item>
                  </el-col>
                </template>
              </template>
            </el-row>
          </el-card>
        </el-form>

        <!-- 审批记录 -->
        <el-card class="editor-body-audit" shadow="never" v-if="ruleForm.audit_log && ruleForm.audit_log.length">
          <div class="audit-title">审批记录</div>
          <template v-for="item in ruleForm.audit_log">
            <el-row class="audit-row">
              <el-col :span="12" class="audit-col">
                {{ item.type | filterTypeAudit }}
              </el-col>
              <el-col :span="12" class="audit-col">
                {{ item.create_time | filterTime }}
              </el-col>
              <el-col
                :span="24"
                v-for="subItem in item.audit_data"
                class="audit-col"
              >
                <div v-if="item.type !== 1">
                  <span>{{ subItem.title }}</span
                  >:
                  <span>{{ subItem.value }}</span>
                </div>
                <div v-else>
                  <a
                    href="javascript:void(0);"
                    v-downLoad="subItem.value"
                    rel="noopener"
                  >
                    <span style="color: #1890ff;">{{ subItem.title }}</span>
                  </a>
                </div>
              </el-col>
            </el-row>
          </template>
        </el-card>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('ruleForm')">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 引入api
import { getCashDetail, refuseCash, completeCash } from "@/api/finance.js";
// 引入公共map
import MAPDATA from "@/utils/jsonMap.js";
// 引入图片上传组件
import uploadImg from "@/components/uploadImg/index.vue";
import { debounce } from "@/utils";
// 引入oss
import { uploadOSS } from "@/utils/oss.js";
// 引入公共方法
import { timeFormat } from "@/utils/common.js";
export default {
  components: {
    uploadImg,
  },
  computed: {
    title() {
      // 标题
      if (this.status === "look") {
        return "查看";
      } else if (this.status === "editor") {
        return "编辑";
      } else {
        return "--";
      }
    },
  },
  filters: {
    filterCheckAudit(status) {
      let data = MAPDATA.CASHAUDITLIST.find((item) => {
        return item.value === status;
      });
      return data ? data.name : "--";
    },
    filterTypeAudit(status) {
      let data = MAPDATA.TYPEAUDITLIST.find((item) => {
        return item.value === status;
      });
      return data ? data.name : "--";
    },
    filterTime(time) {
      return timeFormat(time, "YYYY-MM-DD HH:mm:ss", true);
    },
  },
  data() {
    return {
      dialogVisible: false,
      status: "look",
      ruleForm: {},
      checkForm: {
        audit_status: 0,
      },
      rules: {
        audit_status: [
          { required: true, message: "请选择审核结果", trigger: "change" },
        ],
        real_invoice_money: [
          { required: true, message: "请输入实际开票金额", trigger: "change" },
          {
            message: "请输入正数，保留2位小数",
            trigger: "blur",
            pattern: /^(([0-9]+)|([0-9]+\.[0-9]{0,2}))$/,
          },
        ],
        fail_reason: [
          { required: true, message: "请输入失败原因", trigger: "blur" },
        ],
      },
      fileList: [],
    };
  },
  methods: {
    // 移除之后
    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.ruleForm.img = "";
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
            this.ruleForm.img = res.url;
          }
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
    handleClose() {
      this.close();
    },
    load(status, row) {
      this.status = status;
      this.getCashDetailList(row.id);
    },
    // 提交
    submitForm: debounce(async function () {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          let params = { ...this.ruleForm, ...this.checkForm };
          if (this.checkForm.audit_status === 0) {
            const refuseTemp = {
              id: params.id,
              fail_reason: params.fail_reason,
            };
            refuseCash(refuseTemp)
              .then((res) => {
                if (res.code === 2000) {
                  this.dialogVisible = false;
                  this.$emit("onSearch");
                }
              })
              .catch((err) => {
                this.$message.error(err);
              });
          } else if (this.checkForm.audit_status === 1) {
            const completeTemp = {
              id: params.id,
              real_invoice_money: params.real_invoice_money,
            };
            completeCash(completeTemp)
              .then((res) => {
                if (res.code === 2000) {
                  this.dialogVisible = false;
                  this.$emit("onSearch");
                }
              })
              .catch((err) => {
                this.$message.error(err);
              });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }, 500),
    // 重置
    resetForm() {
      this.close();
    },
    // 关闭弹窗
    close() {
      if (this.status === "editor") {
        this.$confirm("关闭后数据不会保存，确定关闭吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.dialogVisible = false;
            this.$emit("onSearch");
          })
          .catch(() => {});
      } else {
        this.dialogVisible = false;
        this.$emit("onSearch");
      }
    },
    // 销毁组件
    destoryComp() {
      this.$emit("destoryComp");
    },
    // 重置字段验证
    validateField(name) {
      this.$refs.ruleForm.validateField([name]);
    },
    // 获取对公转账详情
    async getCashDetailList(id) {
      const response = await getCashDetail({ id });
      if (+response.code === 2000) {
        this.ruleForm = {
          ...response.data,
        };
        // this.ruleForm.status = 2;
        console.log(this.ruleForm, "this.ruleForm");
      }
    },
    // 修改审核状态
    handleAuditInput(status) {
      // 确认结算
      if (status) {
        this.checkForm.fail_reason = "";
      // 审核退回
      } else {
        this.checkForm.real_invoice_money = undefined;
      }
      this.$forceUpdate();
    }
  },
  mounted() {},
};
</script>

<style lang="scss">
.editor-body-box {
  overflow-y: auto;
  ::-webkit-scrollbar {
    height: 10px;
    width: 10px;
    background: #e8e8e8;
  }

  ::-webkit-scrollbar-thumb {
    background: #c7c7c7;
    border-radius: 5px;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
  }

  input[type="number"] {
    -moz-appearance: textfield; /* 此处写不写都可以 */
  }
  .editor-body-main {
    height: 600px;
    overflow-y: auto;
  }
  .el-dialog {
    margin-top: 5vh !important;
  }
  .el-form {
    .el-form-item__label::before {
      margin-right: 0px !important;
    }
    .el-form-item {
      margin-bottom: 2px !important;
    }
    .el-input {
      width: 300px;
    }
    .el-textarea {
      width: 300px;
    }
    .limit-content {
      .el-form-item__content {
        display: flex;
        // align-items: center;
        .el-button {
          height: 36px;
          margin-left: 10px;
        }
      }
    }
    .goodsImg {
      .el-form-item__label::before {
        content: "*";
        color: #ff4949;
      }
    }
    .sellItem {
      margin-bottom: 10px;
      .el-input {
        width: 165px;
        margin-right: 5px;
      }
    }
  }

  .editor-body-text {
    height: 280px;
    margin-bottom: 10px;
  }

  .editor-body-form {
    margin-bottom: 10px;
    max-height: 240px;
  }

  .editor-body-audit {
    .audit-title {
      font-size: 15px;
      font-weight: 700;
    }
    ::-webkit-scrollbar {
      height: 10px;
      width: 10px;
      background: #e8e8e8;
    }

    ::-webkit-scrollbar-thumb {
      background: #c7c7c7;
      border-radius: 5px;
    }

    .audit-row {
      padding: 10px;
      .audit-col {
        padding: 10px;
        span {
          color: #909399;
        }
      }
    }
  }
}
</style>
