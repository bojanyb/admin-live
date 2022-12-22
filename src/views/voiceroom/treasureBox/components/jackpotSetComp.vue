<template>
  <div class="serviceConfig-historyComp-box">
    <el-dialog title="奖池配置" :visible.sync="dialogVisible" :before-close="handleClose" @closed="closed">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="75px" class="demo-ruleForm">
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="配置名" prop="val">
              <el-input v-model="ruleForm.val"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="礼物宝箱" prop="val">
              <el-checkbox-group v-model="giftSelect">
                <el-checkbox v-for="item in boxList" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="背包宝箱" prop="val">
              <el-checkbox-group v-model="backselect">
                <el-checkbox v-for="item in boxList" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="礼物ID" prop="val">
              <el-input v-model="ruleForm.val" v-input-limit="0"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="礼物数量" prop="val" style="margin-left: 26%;">
              <el-input v-model="ruleForm.val" v-input-limit="0"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-button type="primary">添加</el-button>
          </el-col>
          <el-col :span="24">
            <el-table :data="gridData" border class="giftListBox" style="width: 100%" max-height="250">
            <el-table-column property="name" label="礼物"></el-table-column>
            <el-table-column property="num" label="产出数量"></el-table-column>
            <el-table-column property="prob" label="产出概率"></el-table-column>
            <el-table-column label="操作">
              <el-button type="danger">删除</el-button>
            </el-table-column>
          </el-table>
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
      gridData: [],
      boxList : [
        {
          id: 1,
          name: "幸运宝箱"
        },
        {
          id: 2,
          name: "超级宝箱"
        },
        {
          id: 3,
          name: "黄金宝箱"
        },
        {
          id: 4,
          name: "至尊宝箱"
        }
      ],
      giftSelect: [1,2],
      backselect: [1,2]
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
<style lang="scss" scoped>
::v-deep.el-checkbox-group {
  .el-checkbox{
    margin-right: 5px !important;
  }
}
::v-deep.giftListBox::-webkit-scrollbar,
::v-deep.el-table--scrollable-y::-webkit-scrollbar{
  display: none !important;
  width: 0 !important;height: 0;
}
::v-deep th,
::v-deep td{
  text-align: center;
}
</style>

