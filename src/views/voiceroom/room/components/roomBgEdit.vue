<template>
  <div class="roomBgEdit-box">
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
        <el-form-item label="业务类型" prop="room_business_type">
          <el-select v-model="ruleForm.room_business_type" placeholder="请选择">
            <el-option
              v-for="item in roomTypeList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="图片名称" prop="name">
          <el-input
            v-model="ruleForm.name"
            placeholder="请输入背景图名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="排序权重" prop="sort">
          <el-input
            v-model="ruleForm.sort"
            placeholder="请输入排序权重"
            oninput="this.value=this.value.replace(/[^\d]/g,'');"
          ></el-input>
        </el-form-item>
        <el-form-item label="图片类型" prop="assign_status">
          <!-- 2022/12/14 18:35 产品确认打开修改状态下禁止操作 -->
          <!-- <el-select v-model="ruleForm.assign_status" :disabled="status === 'update'" placeholder="请选择"> -->
          <el-select v-model="ruleForm.assign_status" placeholder="请选择">
            <el-option
              v-for="item in assignList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="房间ID"
          prop="assign_room"
          v-if="ruleForm.assign_status === 1"
        >
          <!-- <el-input type="textarea" :rows="4" v-model="ruleForm.assign_room" placeholder="请输入房间ID，输入多个房间ID请用逗号隔开" @input="roomInput" :disabled="status === 'update'"></el-input> -->
          <!-- 2022/12/14 18:35 产品确认打开修改状态下禁止操作 -->
          <el-input
            type="textarea"
            :rows="4"
            v-model="ruleForm.assign_room"
            placeholder="请输入房间ID，输入多个房间ID请用逗号隔开"
            @input="roomInput(1)"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="公会ID"
          prop="assign_guild"
          v-if="ruleForm.assign_status === 2"
        >
          <el-input
            type="textarea"
            :rows="4"
            v-model="ruleForm.assign_guild"
            placeholder="请输入公会ID，输入多个公会ID请用逗号隔开"
            @input="roomInput(2)"
          ></el-input>
        </el-form-item>
        <el-form-item label="图片" prop="url">
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
        <!-- <el-form-item label="是否默认" prop="is_default">
                    <el-select v-model="ruleForm.is_default">
                        <el-option v-for="item in defaultList" :key="item.value" :label="item.name" :value="item.value"></el-option>
                    </el-select>
                </el-form-item> -->
        <!-- <el-form-item label="默认配置房间类型" prop="room_genre">
                    <el-select v-model="ruleForm.room_genre" placeholder="请选择默认配置房间类型">
                        <el-option v-for="item in typeList" :key="item.value" :label="item.name" :value="item.value"></el-option>
                    </el-select>
                </el-form-item> -->
      </el-form>
    </drawer>
  </div>
</template>

<script>
// 引入抽屉组件
import drawer from "@/components/drawer/index";
// 引入upload组件
import uploadImg from "@/components/uploadImg/index.vue";
// 引入公共map
import MAPDATA from "@/utils/jsonMap.js";
// 引入api
import { getRoomBgAdd } from "@/api/videoRoom";
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
      typeList: MAPDATA.ROOMTYPELIST,
      defaultList: MAPDATA.USERINVITE,
      ruleForm: {
        // room_genre: '',
        sort: "",
        url: "",
        name: "",
        is_default: null,
        assign_status: null,
        room_business_type: null
      },
      oldParams: {}, // 老数据
      rules: {
        room_business_type: [
          { required: true, message: "请选择业务类型", trigger: "change" },
        ],
        name: [
          { required: true, message: "请输入背景图名称", trigger: "blur" },
          { min: 1, max: 5, message: "长度在 1 到 5 个字符", trigger: "blur" },
        ],
        sort: [{ required: true, message: "请输入排序权重", trigger: "blur" }],
        assign_room: [
          { required: true, message: "请输入房间ID", trigger: "blur" },
        ],
        assign_guild: [
          { required: true, message: "请输入公会ID", trigger: "blur" },
        ],
        assign_status: [
          { required: true, message: "请选择背景类型", trigger: "change" },
        ],
        url: [{ required: true, message: "请上传图片", trigger: "change",
          validator: (rules, value, cb) => {
                if (this.imgList.length === 0) {
                  return cb(new Error('请上传图片!'))
                }
                return cb()
              }
        }],
        // room_genre: [
        //     { required: true, message: '请选择房间类型', trigger: 'change' }
        // ],
        // is_default: [
        //     { required: true, message: '请选择是否设置默认背景', trigger: 'change' }
        // ]
      },
      roomTypeList: [
        {
          name: "派对",
          value: 0,
        },
        {
          name: "直播",
          value: 1,
        },
      ],
      fileList: [],    //图片列表
      imgs: [],
      limit: 1,  //上传图片的数量
      hideUpload: false,   // 判断是否隐藏上传按钮
      isAdd: true,   //判断对应的操作
      construction: {
        images: "",
        addImages: ""
      },
      accept: ".png,.jpg,.jpeg",
      imgList: [],
      url: "",
      showList: [],
    };
  },
  computed: {
    title() {
      // 标题
      if (this.status === "add") {
        return "新增房间背景图";
      } else if (this.status === "update") {
        return "修改房间背景图";
      }
    },
    disabled() {
      return false;
    },
    assignList() {
      let arr = JSON.parse(JSON.stringify(MAPDATA.ROOMBACKGROUNDSELECTLIST));
      return arr.filter((item) => {
        return item.name !== "全部";
      });
    },
  },
  watch:{
    "ruleForm.assign_status": {
      handler(newVal){
        if(newVal == 2){
          this.limit = 5;
        }else{
          this.limit = 1;
        }
        this.fileList = [];
        this.imgList = [];
      }
    }
  },
  methods: {
    // 限制房间id输入
    roomInput(type) {
      let changeNum = type == 1 ? this.ruleForm.assign_room : this.ruleForm.assign_guild;
      changeNum = changeNum.replace(
        /[\u4E00-\u9FA5A-Za-z_^%&'\-\*\ /;.，。、‘；、】【=?$\[\]!@#()\\~]/g,
        ""
      );
      this.ruleForm[(type == 1 ? "assign_room" : "assign_guild")] = changeNum;
    },
    // 获取数据
    loadParams(status, row) {
      this.openComp();
      this.status = status;

      if (status !== "add") {
        let params = JSON.parse(JSON.stringify(row));
        params.room_business_type = +params.room_business_type
        this.$set(this.$data, "ruleForm", params);
        this.limit = 1;
      }
      this.url = this.ruleForm.url;
      this.imgList.push(this.ruleForm.url);
      this.oldParams = JSON.parse(JSON.stringify(this.ruleForm));
    },
    // 提交
    async submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let s = this.ruleForm;
          let params = {
            id: s.id || null,
            // room_genre: s.room_genre,
            sort: s.sort,
            url: this.imgList.join(),
            name: s.name,
            // is_default: s.is_default,
            assign_status: s.assign_status,
            room_business_type: s.room_business_type,
            assign_room: s.assign_room ? s.assign_room : "",
            assign_guild: s.assign_guild ? s.assign_guild: ""
          };
          if (s.assign_status === 1) {
            params.assign_room = s.assign_room;
          }
          console.log("params:",params);
          let res = await getRoomBgAdd(params);
          if (res.code === 2000) {
            this.$success("操作成功");
          }
          this.openComp(false);
          this.$emit("getList");
        } else {
          console.log("error submit!!");
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
            this.$emit("input", res.url);
            this.$emit("getFile", file);
            this.$store.commit("app/SET_LOADING", false);
            this.isShowSvg = true;
            this.$emit("validateField", this.name);
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
.roomBgEdit-box {
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
