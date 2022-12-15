<template>
  <div class="serviceConfig-historyComp-box">
    <el-dialog title="宝箱配置" :visible.sync="dialogVisible" :before-close="handleClose" @closed="closed">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="75px" class="demo-ruleForm">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="宝箱位置" prop="is_hide">
              <el-select v-model="ruleForm.is_hide" placeholder="请选择宝箱位置">
                <el-option v-for="item in siteList" :key="item.value" :label="item.name" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="宝箱名称" prop="val">
          <el-input v-model="ruleForm.val"></el-input>
        </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="宝箱单价" prop="val">
              <el-input v-model="ruleForm.val" v-input-limit="0"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="权重排序" prop="val">
              <el-input v-model="ruleForm.val" v-input-limit="0"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="宝箱图标" prop="gift_photo">
              <uploadImg ref="uploadImg" v-model="ruleForm.gift_photo" :imgUrl="ruleForm.gift_photo" name="gift_photo"
                @validateField="validateField" accept=".png,.jpg,.jpeg"></uploadImg>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="宝箱动画" prop="gift_gif">
              <uploadImg ref="uploadImg" v-model="ruleForm.gift_gif" :imgUrl="ruleForm.gift_gif" name="gift_gif"
                @validateField="validateField" :accept="limitImgType"></uploadImg>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="宝箱角标" prop="gift_photo">
              <uploadImg ref="uploadImg" v-model="ruleForm.gift_photo" :imgUrl="ruleForm.gift_photo" name="gift_photo"
                @validateField="validateField" accept=".png,.jpg,.jpeg"></uploadImg>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 引入api
import { add } from '@/api/risk.js'
// 引入图片上传组件
import uploadImg from '@/components/uploadImg/index.vue'
export default {
  data() {
    return {
      dialogVisible: true,
      ruleForm: {
        name: '',
        play_type: 1,
      },
      rules: {
        name: [
          { required: true, message: '请输入宝箱名称', trigger: 'blur' },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      siteList: [
        {
          name: "礼物栏",
          value: 1
        },
        {
          name: "背包",
          value: 2
        }
      ]
    };
  },
  components: {
    uploadImg
  },
  computed: {
    limitImgType() { // 限制上传文件类型
      if (this.ruleForm.play_type === 1) {
        return '.zip'
      } else if (this.ruleForm.play_type === 2) {
        return '.svg,.svga'
      }
    }
  },
  methods: {
    // 关闭弹窗
    handleClose() {
      this.dialogVisible = false
    },
    // 打开弹窗
    loadParams() {
      this.dialogVisible = true
    },
    // 提交
    async submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let res = await add({ val: this.ruleForm.val })
          if (res.code === 2000) {
            this.dialogVisible = false
            this.$success('添加成功')
            this.$emit('getList')
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 销毁组件
    closed() {
      this.$emit('destoryComp')
    },
    // 重置 - 验证
    validateField(name) {
      this.$refs.ruleForm.validateField([name])
    },
  }
}
</script>

