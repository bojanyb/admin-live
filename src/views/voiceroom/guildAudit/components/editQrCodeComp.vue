<template>
    <div class="qrCodeEdit-box">
      <drawer
        size="500px"
        :title="title"
        ref="drawer"
        :isShowUpdate="true"
        @cancel="cancel"
        @submitForm="submitForm"
        @closed="closed"
        :disabled="disabled"
        @update="update"
      >
        <el-form
          slot="body"
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
          label-suffix=":"
          :hide-required-asterisk="status === 'see'"
        >
          <el-form-item label="公会运营" prop="name">
            <div>{{ ruleForm.username }}</div>
          </el-form-item>
          <el-form-item label="公会二维码" prop="url">
            <el-upload
            ref="upload"
            action=""
            :show-file-list="status !== 'add' ? false : true"
            :file-list="fileList"
            :limit="limit"
            :class="{hide:hideUpload}"
            :on-change="beforeAvatarUpload"
            :on-exceed="masterFileMax"
            :before-remove="beforeRemove"
            :on-remove="handleRemove"
            list-type="picture-card"
            :accept="accept"
            :http-request="upLoadFile"
            multiple
            >
            <img v-if="status !== 'add' && url !== ''" :src="url" class="avatar" />
            <i v-if="status == 'add' && (!url || url == '')" class="el-icon-plus avatar-uploader-icon"></i>
              <div slot="tip" class="form-tips" style="margin-top: 10px" >
                <el-tag  type="warning">最多上传{{limit}}张，最大上传大小2MB</el-tag>
              </div>
            </el-upload>
          </el-form-item>
        </el-form>
      </drawer>
    </div>
  </template>
  <script>
  // 引入抽屉组件
  import drawer from "@/components/drawer/index";
  // 引入upload组件
  import uploadImg from "@/components/uploadImg/index.vue";
  // 引入api
  import { saveWechatCode } from "@/api/videoRoom";
  // 引入oss
  import { uploadOSS } from "@/utils/oss.js";
  export default {
    components: {
      uploadImg,
      drawer,
    },
    data() {
      return {
        status: "add",
        ruleForm: {
            id: "",
            url: ""
        },
        oldParams: {}, // 老数据
        title: "编辑二维码",
        rules: {
          url: [{ required: true, message: "请上传二维码图片", trigger: "change",
            validator: (rules, value, cb) => {
                  if (this.imgList.length === 0) {
                    return cb(new Error('请上传图片!'))
                  }
                  return cb()
                }
          }],
        },
        fileList: [],    //图片列表
        imgs: [],
        limit: 1,  //上传图片的数量
        hideUpload: false,   // 判断是否隐藏上传按钮
        accept: ".png,.jpg,.jpeg",
        imgList: [],
        url: "",
      };
    },
    computed: {
      disabled() {
        return false;
      },
    },
    methods: {
      // 获取数据
      loadParams(status, row) {
        this.openComp();
        this.status = status;
        if (status !== "add") {
          let params = JSON.parse(JSON.stringify(row));
          this.$set(this.$data, "ruleForm", params);
          this.limit = 1;
        }
        this.url = this.ruleForm.wechat_code;
        if(this.ruleForm.wechat_code && this.ruleForm.wechat_code !== ""){
            this.imgList.push(this.ruleForm.wechat_code);
        }
        this.oldParams = JSON.parse(JSON.stringify(this.ruleForm));
      },
      // 提交
      async submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            let s = this.ruleForm;
            console.log(this.imgList);
            let params = {
              id: s.id || null,
              wechat_code: this.imgList.join(),
            };
            let res = await saveWechatCode(params);
            if (res.code === 2000) {
              this.$success("操作成功");
            }
            this.openComp(false);
            this.$emit("getList");
          } else {
            return false;
          }
        });
      },
      openComp(status = true) {
        this.$refs.drawer.loadParams(status);
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
      resetForm() {
        this.openComp(false);
      },
      // 销毁组件
      closed() {
        this.$emit("destoryComp");
      },
      // 重置字段验证
      validateField(name) {
        this.$refs.ruleForm.validateField([name]);
      },
      //上传图片，添加到图片列表
      beforeAvatarUpload(file, fileList) {
        let isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          fileList = fileList.filter(item => item !== file);
          this.fileList = fileList;
          this.$message.warning('上传头像图片大小不能超过 2MB!')
          return
        }
        //图片转为base64位
        let _this = this
        const reader = new FileReader()
        reader.readAsDataURL(file.raw)
        reader.onload = function(e) {
          undefined
          _this.imgs.push(this.result)
        }
        //达到限制上传图片，隐藏上传按钮
        this.hideUpload = fileList.length >= this.limit;
      },
      // 移除文件之前
      beforeRemove(file) {
          return this.$confirm(`确定移除 ${ file.name }？`);
      },
      //删除图片，更新图片列表
      handleRemove(file, fileList) {
        //达到限制上传图片，隐藏上传按钮
        this.hideUpload = fileList.length >= this.limit;
        this.imgList = [];
        fileList.map(res=>{
          res.file = res.raw;
          this.upLoadFile(res);
        })
      },
      //限制多少张图片
      masterFileMax(files, fileList) {
        this.$message.warning(`请最多上传 ${this.limit} 个文件。`)
      },
      // 上传
      upLoadFile(file) {
        let fileType = file.file.type;
        let accept = JSON.parse(JSON.stringify(this.accept));
        accept = accept.replace(".", "");
        if (fileType.indexOf(accept) == -1 && this.isFileType == true) {
          this.$message.warning("上传图片只能是" + accept + "格式!");
          return false;
        }
        this.uploadImg(file);
      },
      uploadImg(file) {
        this.isShowSvg = false;
        this.$store.commit("app/SET_LOADING", true);
        uploadOSS(file.file)
          .then((res) => {
            if(this.status !== 'add'){
              this.url = res.url;
            }else{
              this.url = '';
            }
            if (res.url) {
              this.isShowSvg = true;
              this.imageUrl = res.url;
              this.imgList.push(res.url);
            }
          })
          .catch((err) => {
            this.$message.error(err);
          });
      },
    },
  };
  </script>
  <style lang="scss">
  .qrCodeEdit-box {
    .el-input {
      width: 310px;
    }
  }
  .el-upload--picture-card{
    .avatar{
      width: 148px;
      height: 148px;
    }
  }
  </style>