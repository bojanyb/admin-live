<template>
  <div class="checkConfig--box">
    <el-dialog :title="title" :visible.sync="dialogVisible" width="730px" :before-close="handleClose"
      :close-on-click-modal="false" @closed="closed">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" label-suffix=":"
        :hide-required-asterisk="status === 'see'">
        <div class="inputBox">
          <el-form-item label="应用类型" prop="package_name">
            <el-select v-model="ruleForm.package_name" placeholder="请选择" :disabled="status === 'add' ? false : true ">
              <el-option v-for="item in packageName" :key="item.value" :label="item.name"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="系统平台" prop="platform">
            <el-select v-model="ruleForm.platform" placeholder="请选择" :disabled="status === 'add' ? false : true">
              <el-option v-for="item in platformList" :key="item.value" :label="item.name"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="版本号" prop="version">
            <el-input v-model="ruleForm.version" style="width:305px;" placeholder="如: 1.0.1"></el-input>
          </el-form-item>
          <el-form-item label="安卓Code" prop="version_code" v-if="ruleForm.platform !== 1">
            <el-input v-model="ruleForm.version_code"></el-input>
          </el-form-item>
          <el-form-item label="开关状态" prop="value">
            <el-select v-model="ruleForm.value" placeholder="请选择">
              <el-option v-for="(item, index) in statusList" :key="index" :label="item.name"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="app渠道" prop="channels">
            <el-checkbox-group v-model="channels" v-if="ruleForm.platform == '1'">
              <el-checkbox v-for="(item,index) in channelsList" v-if="item.channel.indexOf('iOS') > -1" :key="index" :label="item.channel"></el-checkbox>
            </el-checkbox-group>
            <el-checkbox-group v-model="channels" v-else>
              <el-checkbox v-for="(item,index) in channelsList" v-if="item.channel.indexOf('iOS') == -1" :key="index" :label="item.channel"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="模块开关" prop="function_switch">
            <el-checkbox-group v-model="audits">
              <el-checkbox v-for="(item,index) in auditList" :key="index" :label="item.value" :value="item.key"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 引入api
import { getChannels,getSwitchValue, AppruleAdd, AppruleUpdate } from "@/api/system"
export default {
  data() {
    return {
      dialogVisible: false,
      platformList: [
        {
          key: 1,
          name: "IOS",
          value: 1,
        },
        {
          key: 2,
          name: "Android",
          value: 2,
        }
      ],
      statusList: [
        {
          value: 0,
          name: "关闭"
        },
        {
          value: 1,
          name: "开启"
        }
      ],
      packageName: [
        {
          key: "net.huidapay.live",
          name: "喵喵星球",
          value: "net.huidapay.live",
        },
        {
          key: "com.yhjc.oxygen",
          name: "声撩语音",
          value: "com.yhjc.oxygen",
        },
        {
          key: "com.jlsd.duoduo",
          name: "多多cp",
          value: "com.jlsd.duoduo",
        },
        {
          key: "com.hdb.kaihei",
          name: "开黑语音",
          value: "com.hdb.kaihei",
        },
        {
          key: "com.aiyi.lemon",
          name: "柠檬语音",
          value: "com.aiyi.lemon",
        }
      ],
      channelsList: [],
      channels: [],
      audits : [],
      auditList : [],
      status: 'add',
      oldParams: {},
      ruleForm: {
        package_name: "",
        version: "",
        version_code: "",
        channels: "",
        platform: "",
        key: "show_check", //	show_check审核开关
        value: "",
        function_switch: ""
      },
      rules: {
        version: [
          {
          required: true, trigger: 'blur',
          validator: (rules, value, cb) => {
              if (!value) {
                return cb(new Error('请输入版本号!'))
              }
              let reg = /^[1-9]\d?(\.(0|[1-9]\d?)){2}$/;
              if(reg.test(value)){
                cb();
              }else{
                return cb(new Error('请输入正确的版本号，示例：x.y.z （数字：x为1-99，y和z为0-99）'));
              }
              return cb()
            }
        }
        ],
        platform: [
          { required: true, message: '请选择系统平台', trigger: 'change' }
        ],
        value: [
          { required: false, message: '请选择开关状态', trigger: 'change' }
        ],
        package_name: [
          { required: true, message: '请选择应用类型', trigger: 'change' }
        ],
        value: [
          { required: true, message: '请选择开关状态', trigger: 'change' }
        ],
        version_code: [{
          required: true,
          message: '请输入安卓Code',
          trigger: 'blur'
        }],
      }
    };
  },
  computed: {
    title() { // 标题
      return this.status === 'add' ? "新增" : "编辑"
    },
  },
  methods: {
    // 获取数据
    loadParams(type,row) {
        this.status = type
        if(this.status !== 'add') {
            let params = JSON.parse(JSON.stringify(row))
            params.channels = params.channels
            this.channels = params.channels
            this.audits = params.function_switch
            this.$set(this.$data, 'ruleForm', params)
        }else{
          let params = {
            key: "show_check"
          }
          this.$set(this.$data, 'ruleForm', params)
          this.resetForm("ruleForm")
        }
        this.dialogVisible = true
        this.oldParams = JSON.parse(JSON.stringify(this.ruleForm))
        this.getChannelsList()
        this.getSwitchValueList()
    },
    // 获取渠道
    async getChannelsList(){
      let res = await getChannels()
      if(res.code == 2000){
        this.channelsList = res.data.list
      }
    },
    // 获取功能开关
    async getSwitchValueList (){
      let res = await getSwitchValue()
      if(res.code == 2000){
        this.auditList = res.data.list
        if(this.status !== 'add') {
          let newArr = []
          this.audits.map((res,i)=>{
              let row = this.auditList.find(item => { return res === item.key })
              if(row){
                newArr.push(row.value)
              }
          })
          this.audits = newArr
        }
      }
    },
    // 关闭弹窗
    handleClose() {
      this.dialogVisible = false
    },
    // 提交
    async submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          if (this.status !== 'add') {
            if(this.channels.length == 0){
              this.$message.error("请先选择app渠道")
              return
            }else{
              this.changeString(this.channels,"channels")
              this.changeString(this.audits,"function_switch")
            }
            delete this.ruleForm.create_time
            delete this.ruleForm.update_time
            delete this.ruleForm.is_delete
            let data = { ...this.ruleForm }
            let res = await AppruleUpdate(data)
            if (res.code === 2000) {
              this.$message.success('编辑成功')
              this.dialogVisible = false
              this.$nextTick(()=>{
                  //在这里置空
                  this.$refs["ruleForm"].resetFields();
              })
              this.channels = []
              this.audits = []
              this.$emit('getList')
            }
          } else {
            if(this.channels.length == 0){
              this.$message.error("请先选择app渠道")
              return
            }else{
              this.changeString(this.channels,"channels")
              this.changeString(this.audits,"function_switch")
            }
            let params = { ...this.ruleForm }
            let res = await AppruleAdd(params)
            if (res.code === 2000) {
              this.$success('添加成功')
              this.dialogVisible = false
              this.$nextTick(()=>{
                  //在这里置空
                  this.$refs["ruleForm"].resetFields();
              })
              this.channels = []
              this.audits = []
              this.$emit('getList')
            }
          }
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      if(this.$refs[formName]){
        this.$refs[formName].resetFields();
      }
    },
    // 销毁组件
    closed() {
      this.$emit('destoryComp')
    },
    cancel() {
      if (JSON.stringify(this.oldParams) !== JSON.stringify(this.ruleForm)) { // 记录数据 - 有改动就提示
        this.$confirm('关闭弹窗将不会保留您的更改, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.dialogVisible = false
        }).catch(() => {});
      } else {
        this.dialogVisible = false
      }
      this.$nextTick(()=>{
          this.$refs["ruleForm"].resetFields();
      })
      this.channels = []
      this.audits = []
    },
    // 修改
    update() {
      this.status = 'update'
    },
    // app渠道、审核开关字段 数组拼接字符串
    changeString(arr,name){
      let str = ""
      if(name == "channels"){ // app 渠道
        arr.map((res,i)=>{
            str += res + ","
        })
      }else if(name == "function_switch"){ // 模块开关
        arr.map((res,i)=>{
            let row = this.auditList.find(item => { return res === item.value })
            if(row){
              str += row.key + ","
            }
        })
      }
      this.ruleForm[name] = str.substr(0,str.length-1)
    },
  }
}
</script>

<style lang="scss">
.checkConfig--box {
  .el-select {
    width: 305px;
  }
  .el-form {
    display: flex;
  }
  .el-input{
    width: 305px;
  }
}
</style>
