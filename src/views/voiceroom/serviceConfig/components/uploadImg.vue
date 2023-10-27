<template>
  <div class="serviceConfig-uploadImg-box">
    <el-dialog
      title="修改违规证据"
      :visible.sync="dialogVisible"
      width="500px"
      :before-close="handleClose"
      :close-on-click-modal="false"
      @closed="closed"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="85px"
        class="demo-ruleForm"
        label-suffix=":"
      >
        <el-form-item label="违规证据">
          <el-upload
            class="upload-demo"
            action="#"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            accept=".png,.jpg,.jpeg,.mp4"
            :file-list="fileList"
            :http-request="upLoad"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png/mp4文件</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="备注说明" prop="remark">
          <el-input v-model="ruleForm.remark" type="textarea" placeholder="请输入备注内容，此内容用户不会看到，建议20个字以内。" :rows="4" maxlength="20" show-word-limit></el-input>
        </el-form-item>
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
import { updateSource, guildUpdateSource } from "@/api/risk.js";
// 引入oss
import { uploadOSS } from "@/utils/oss.js";
import { debounce } from "lodash";
export default {
  data() {
    return {
      dialogVisible: false,
      fileList: [],
      form: {},
      type: '',
      ruleForm: {
        remark: ''
      },
      rules: {
        img: [
          { required: true, message: "请输入违规证据", trigger: "blur" },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        remark: [
          { required: false, message: '请输入备注说明', trigger: 'blur' }
        ]
      },
    };
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
    // 移除文件之前
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // 关闭弹窗
    handleClose() {
      this.dialogVisible = false;
    },
    // 上传
    upLoad(file) {
      uploadOSS(file.file)
        .then((response) => {
          if (response.url) {
            this.fileList.push({ name: file.file.name, url: response.url });
          }
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
    // 获取数据并加载参数
    loadParams(row, type) {
      this.type = type;
      this.dialogVisible = true;
      this.form = row;
      this.ruleForm.remark = '';

      const parsePath = (path) => {
        const name = path.split(".live/")[1];
        return {
          name,
          url: path,
        };
      };
      let videoPaths = [];
      if(row.video_path) {
        videoPaths = Array.isArray(row.video_path) ? row.video_path : row.video_path.split(",")
      }
      let imgPaths = [];
      if(row.img_path) {
        imgPaths = Array.isArray(row.img_path) ? row.img_path : row.img_path.split(",")
      }
      this.fileList = [...videoPaths, ...imgPaths].map(parsePath);
    },
    // 处理表单提交
    submitForm: debounce(async function (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          if (!valid) {
            console.log("error submit!!");
            return false;
          }

          if (!this.fileList || this.fileList.length === 0) {
            this.$warning("违规证据不能为空！");
            return;
          }

          let params = {
            remark: this.ruleForm.remark
          };
          if (this.form.id_array) {
            params.ids = this.form.id_array;
          } else {
            params.id = this.form.id;
          }

          // 将文件列表拆分为视频路径和图片路径
          const { videoPaths, imgPaths } = this.fileList.reduce(
            (paths, item) => {
              const targetPath = item.url.includes(".mp4")
                ? "videoPaths"
                : "imgPaths";
              paths[targetPath].push(item.url);
              return paths;
            },
            { videoPaths: [], imgPaths: [] }
          );

          params = {
            ...params,
            ...(videoPaths && { video_path: videoPaths.join(",") }),
            ...(imgPaths && { img_path: imgPaths.join(",") }),
          };

          try {
            let res;
            if(this.type === 'guild') {
              res = await guildUpdateSource(params);
            } else {
              res = await updateSource(params);
            }
            if (res.code === 2000) {
              this.$success("修改成功");
              this.dialogVisible = false;
              this.$emit("getList");
            }
          } catch (error) {
            this.$warning("修改失败");
            this.dialogVisible = false;
          }
        }
      });
    }, 300),
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
.serviceConfig-uploadImg-box {
}
</style>
