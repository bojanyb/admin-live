<template>
    <el-upload
	  class="avatar-uploader"
      ref="fileUpload"
      action=""
      list-type="picture-card"
      :show-file-list="false"
      :http-request="fnUploadRequest"
      :on-success="handleSuccess"
      :on-error="handleError"
      :before-upload="handleUpload"
    >
    </el-upload>
</template>

<script>
import { uploadOSS } from '@/utils/oss';

export default {
  name: "index",
  data() {
    return {};
  },
  computed: {
    uploadProps() {
      return {
        // action: `${process.env.VUE_APP_BASE_API}/api/file/upload`,
        headers: {
        },
        data: {},
      };
    },
  },
  methods: {
    handleExceed(file, fileList){
      // console.log(file, fileList);
      this.$message.error('上传失败，限制上传数量10个文件以内！');
    },
    handleUpload(file, fileList){
      // console.log(file, fileList);
      var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      const extension = testmsg === 'xlsx' || testmsg === 'xls' || testmsg === 'docx' || testmsg === 'doc'
        || testmsg === 'pdf' || testmsg === 'zip' || testmsg === 'rar' || testmsg === 'ppt' || testmsg === 'txt' || testmsg === 'jpg'
      const isLimit10M = file.size / 1024 / 1024 < 1
      var bool = false;
      if(extension && isLimit10M){
        bool = true;
      } else {
        bool = false;
      }
      if(!extension) {
        this.$message.error('请选择附件文件类型！');
        return bool;
      }
      if(!isLimit10M) {
        this.$message.error('上传失败，不能超过10M！');
        return bool;
      }
      return bool;
    },
    handleSuccess(res) {
      // console.log(res);
      if (res) {
        this.$emit('fileData', res)
        this.$message.success("上传附件成功！");
      }
    },
    handleError(err){
      this.$message.error('上传附件失败！');
    },
    // 上传图片
    async fnUploadRequest(options) {
      try {
        // console.log(options);
        let file = options.file; // 拿到 file
        let res = await uploadOSS(file)
        console.log(res);
        // 返回数据
        this.$emit("fileData", res);
        this.$message.success("上传附件成功！");
      } catch (e) {
        this.$message.error('上传附件失败！');
      }
    },
  },
};
</script>

<style  lang="scss" scoped>
::v-deep .el-upload,
.el-upload--picture-card {
  // width: 50px;
  height: 0px;
  border: none;
  line-height: 0;
  display: block;
  background: #f5f6fb;
}
.el-upload {
  width: 50px;
}
.img-cont {
  width: 50px;
  height: 24px;
  background: #f5f6fb;
  .img-icon {
    color: #ccc;
  }
  .img-text {
    font-size: 12px;
    height: 24px;
    color: #000;
  }
}
</style>

