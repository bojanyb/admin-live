<template>
    <div class="guild-editComp-box">
        <el-dialog
        :title="title"
        :width="'600px'"
        @closed="closed"
        :visible.sync="isEditComp">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="90px" class="demo-ruleForm" label-suffix=":" :hide-required-asterisk="status === 'see'">
                <el-form-item label="公会名称" prop="name">
                    <el-input v-model="ruleForm.name" placeholder="请输入公会名字"></el-input>
                </el-form-item>
                <!-- <el-form-item label="公会类型" prop="guild_type">
                    <el-select v-model="ruleForm.guild_type" placeholder="请选择公会类型" :disabled="status === 'update'">
                        <el-option v-for="item in guildTypeList" :key="item.value" :label="item.name" :value="item.value"></el-option>
                    </el-select>
                </el-form-item> -->
                <el-form-item label="公会长ID" prop="guild_number">
                    <el-input v-model="ruleForm.guild_number" placeholder="请输入公会长ID" :disabled="status === 'update'"></el-input>
                </el-form-item>
                <!-- <el-form-item label="实时返点" prop="rebate">
                    <el-input v-model="ruleForm.rebate" onkeydown="this.value=this.value.replace(/^0+/,'');" oninput="this.value=this.value.replace(/[^\d]/g,'');" @input="rebateInput" placeholder="请输入实时返点">
                        <template slot="append">%</template>
                    </el-input>
                </el-form-item> -->
                <!-- this.permissionArr.includes('PrettyNumber@update') -->
                <!-- 派对公会 -->
                <template v-if="type + '' === '2'">
                  <el-form-item label="公司主体" prop="company" v-if="status === 'add' || permissionArr.includes('Guild@updatePartyReplace')">
                      <el-input v-model="ruleForm.company" placeholder="请输入公司主体"></el-input>
                  </el-form-item>
                </template>
                <!-- 直播公会 -->
                <template v-if="type + '' === '1'">
                  <el-form-item label="公司主体" prop="company" v-if="status === 'add' || permissionArr.includes('Guild@updateLiveReplace')">
                      <el-input v-model="ruleForm.company" placeholder="请输入公司主体"></el-input>
                  </el-form-item>
                </template>
                <el-form-item label="公会运营" prop="operator" v-if="isAuth && status === 'update'">
                    <el-select v-model="ruleForm.operator" placeholder="请选择公会运营">
                        <el-option v-for="item in operatorList" :key="item.value" :label="item.name" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="对公结算" prop="cash_type" v-if="status === 'update'">
                    <el-select v-model="ruleForm.cash_type" placeholder="请选择对公结算">
                        <el-option v-for="item in [{value: 0, name: '否'}, {value: 1, name: '是'}]" :key="item.value" :label="item.name" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="submitForm">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
// 引入api
import { getGuildCreateV2, updatePartyInfo, updateLiveInfo, getGuildType, adminUserList } from '@/api/videoRoom'
// 引入公共map
import MAPDATA from '@/utils/jsonMap.js'
// 引入公共参数
import mixins from '@/utils/mixins.js'
import { debounce } from "lodash";
export default {
  	mixins: [mixins],
    data() {
        return {
            status: 'add',
            isEditComp: false,
            rankList: MAPDATA.CLASSLIST,
            guildTypeList: [],
            ruleForm: {
                id: null,
                name: '',
                guild_number: '',
                company: '',
                // rebate: 0,
                guild_type: this.type,
                operator: null,
                cash_type: 0,
            },
            oldParams: {}, // 老数据
            rules: {
                name: [
                    { required: true, message: '请输入公会昵称', trigger: 'blur' },
                    // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                // rebate: [
                //     { required: true, message: '请输入固定返点', trigger: 'blur' }
                // ],
                guild_number: [
                    { required: true, message: '请输入公会长ID', trigger: 'blur' }
                ],
                rank: [
                    { required: true, message: '请选择公会等级', trigger: 'change' }
                ],
                operator: [
                    { required: true, message: '请选择公会运营', trigger: 'change' }
                ],
                // guild_type: [
                //     { required: true, message: '请选择公会类型', trigger: 'change' }
                // ],
                remark: [
                    { required: false, message: '请输入公会简介', trigger: 'blur' }
                ],
                cash_type: [
                    { required: true, message: '请输入对公结算', trigger: 'change' }
                ]
            },
            operatorList: [],
            isAuth: 0
        };
    },
    props: {
      type : { // 模拟数据  派对公会：2, 直播公会：1
        type : Number,
        default: 2
      }
    },
    computed: {
        title() { // 标题
            let text =  this.type == 1 ? '直播' : '派对'
            if(this.status === 'add') {
                return '新增' + text + '公会'
            } else if(this.status === 'update') {
                return '修改'+ text +'公会'
            }
        },
        disabled() { // 是否禁止输入
            if(this.status === 'see') {
                return true
            }
            return false
        }
    },
    created() {
        this.getTypeList()
        this.getAdminUserList();
    },
    methods: {
        // 公会返点限制
        // rebateInput() {
        //     let num = this.ruleForm.rebate
        //     if(num && Number(num) > 10) {
        //         this.ruleForm.rebate = 10
        //     }
        // },
        // 新增 - 修改
        loadParams(status, row) {
            this.openComp()
            this.status = status
            if(status !== 'add') {
                let params = JSON.parse(JSON.stringify(row))
                let para = {}
                para.guild_type = params.guild_type ? params.guild_type : ''
                para.operator = params.operator ? params.operator : ''
                para.id = params.id ? params.id : "";
                para.name = params.name ? params.name : "";
                para.guild_number = params.guild_number ? params.guild_number : "";
                para.company = params.company ? params.company : "";
                para.status = params.status;
                // para.rebate = params.rebate;
                para.cash_type = params.cash_type
                this.$set(this.$data, 'ruleForm', para)
            }

            this.oldParams = JSON.parse(JSON.stringify(this.ruleForm))
        },
        openComp(status = true) {
            this.isEditComp = status
        },
        // 取消
        cancel() {
            if(JSON.stringify(this.oldParams) !== JSON.stringify(this.ruleForm)) {  // 记录数据 - 有改动就提示
                this.$confirm('关闭弹窗将不会保留您的更改, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.openComp(false)
                }).catch(() => {});
            } else {
                this.openComp(false)
            }
        },
        // 修改
        update() {
            this.status = 'update'
        },
        // 提交
        submitForm: debounce(async function (formName) {
          this.$refs.ruleForm.validate(async (valid) => {
                if (valid) {
                    let params = { ...this.ruleForm }
                    if(this.status === 'add') {
                        let res = await getGuildCreateV2(params)
                        if(res.code === 2000) {
                            this.$success('新增成功')
                        }
                    } else {
                        let res
                        if (params.guild_type === 1) { // 直播
                          res = await updateLiveInfo(params)
                        }
                        else if (params.guild_type === 2) { // 派对
                          res = await updatePartyInfo(params)
                        }
                        if(res.code === 2000) {
                            this.$success('修改成功')
                        }
                    }
                    this.openComp(false)
                    this.$emit('getList')
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }, 300),
        // 重置
        resetForm() {
            this.openComp(false)
        },
        // 重置字段验证
        validateField(name) {
            this.$refs.ruleForm.validateField([name])
        },
        // 销毁组件
        closed() {
            this.$emit('destoryComp')
        },
        // 获取公会类型
        async getTypeList() {
         const response = await getGuildType()
         if(response.code === 2000) {
            const tempArr =  Array.from(
              Array.isArray(response.data.list) ? response.data.list : []
          )
          this.guildTypeList = tempArr.reduce((prev, curr) => {
            prev.push({
                name: curr.remark,
                value: curr.type
            })
            return prev
          }, []) || []
         }
        },
      // 获取公会运营
      async getAdminUserList() {
        const response = await adminUserList()
        if(response.code === 2000) {
          const tempArr =  Array.from(
            Array.isArray(response.data.list) ? response.data.list : []
        )
        this.operatorList = tempArr.reduce((prev, curr) => {
          prev.push({
              name: curr.username,
              value: curr.id
          })
          return prev
        }, []) || []
        this.isAuth = response.data.is_auth;
        }
      },
    }
}
</script>

<style lang="scss" scoped>
.guild-editComp-box {
    .el-select,
    .el-input {
        width: 320px;
    }
}
</style>
