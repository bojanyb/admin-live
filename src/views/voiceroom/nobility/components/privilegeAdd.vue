<template>
    <div class="nobility-privilegeAdd-box">
        <drawer 
        size="470px"
        :title="title"
        ref="drawer"
        :isShowUpdate="true"
        @cancel="cancel"
        @submitForm="submitForm"
        @closed="closed"
        :disabled="disabled"
        @update="update">
            <el-form slot="body" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="85px" class="demo-ruleForm" label-suffix=":" :hide-required-asterisk="status === 'see'">
                <el-form-item label="贵族名称" prop="noble_name">
                    <el-input v-model="ruleForm.noble_name" :disabled="disabled" placeholder="请输入贵族名称"></el-input>
                </el-form-item>
                <el-form-item label="拥有特权" prop="privilege_ids">
                    <el-select v-model="ruleForm.privilege_ids" :disabled="disabled" multiple placeholder="请选择特权">
                        <el-option v-for="item in privilegeList" :key="item.value" :label="item.name" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="growth_value">
                    <label slot="label">成&nbsp;&nbsp;长&nbsp;&nbsp;值</label>
                    <el-input v-model="ruleForm.growth_value" :disabled="disabled" onkeydown="this.value=this.value.replace(/^0+/,'');" oninput="this.value=this.value.replace(/[^\d]/g,'');" placeholder="请输入成长值"></el-input>
                </el-form-item>
                <el-form-item prop="hold_value">
                    <label slot="label">保&nbsp;&nbsp;级&nbsp;&nbsp;值</label>
                    <el-input v-model="ruleForm.hold_value" :disabled="disabled" onkeydown="this.value=this.value.replace(/^0+/,'');" oninput="this.value=this.value.replace(/[^\d]/g,'');" placeholder="请输入保级值"></el-input>
                </el-form-item>
                <el-form-item label="保级天数" prop="hold_day">
                    <el-input v-model="ruleForm.hold_day" :disabled="disabled" onkeydown="this.value=this.value.replace(/^0+/,'');" oninput="this.value=this.value.replace(/[^\d]/g,'');" placeholder="请输入保级天数"></el-input>
                </el-form-item>
                <el-form-item label="未保级衰减值" prop="reduce_value" class="dampingBox">
                    <el-input v-model="ruleForm.reduce_value" :disabled="disabled" onkeydown="this.value=this.value.replace(/^0+/,'');" oninput="this.value=this.value.replace(/[^\d]/g,'');" placeholder="请输入未保级衰减值"></el-input>
                </el-form-item>
            </el-form>
        </drawer>
    </div>
</template>

<script>
// 引入抽屉组件
import drawer from '@/components/drawer/index'
// 引入api
import { save, detail } from '@/api/nobility.js'
// 引入公共map
import MAPDATA from '@/utils/jsonMap.js'
export default {
    components: {
        drawer
    },
    data() {
        return {
            privilegeList: MAPDATA.NOBILITYPRIVILEGELIST, // 特权列表
            status: 'add', // 状态
            oldParams: {}, // 老数据
            ruleForm: {
                noble_name: '',
                growth_value: '',
                hold_value: '',
                hold_day: '',
                reduce_value: '',
                privilege_ids: []
            },
            rules: {
                noble_name: [
                    { required: true, message: '请输入贵族名称', trigger: 'blur' },
                    // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                privilege_ids: [
                    { required: true, message: '请选择特权', trigger: 'change' }
                ],
                growth_value: [
                    { required: true, message: '请输入成长值', trigger: 'blur' }
                ],
                hold_value: [
                    { required: true, message: '请输入保级值', trigger: 'blur' }
                ],
                hold_day: [
                    { required: true, message: '请输入保级天数', trigger: 'blur' }
                ],
                reduce_value: [
                    { required: true, message: '请输入未保级衰减值', trigger: 'blur' }
                ],
            }
        };
    },
    computed: {
        title() { // 标题
            if(this.status === 'add') {
                return '新增贵族'
            } else if(this.status === 'update') {
                return '修改贵族'
            } else {
                return '查看贵族'
            }
        },
        disabled() { // 禁用
            if(this.status !== 'see') {
                return false
            } else {
                return true
            }
        }
    },
    methods: {
        // 获取数据
        async loadParams(status, row) {
            this.openComp()
            this.status = status
            if(status !== 'add') {
                let res = await detail({ id: row.id })
                let params = res.data
                params.privilege_ids = params.privilege_ids.split(',').map((item) => {
                    return Number(item)
                })
                this.toNumber(params)
                this.$set(this.$data, 'ruleForm', params)
            }
            this.oldParams = JSON.parse(JSON.stringify(this.ruleForm))
        },
        openComp(status = true) {
            this.$refs.drawer.loadParams(status)
        },
        // 取消
        cancel() {
            if(JSON.stringify(this.oldParams) !== JSON.stringify(this.ruleForm)) { // 记录数据 - 有改动就提示
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
        // 转数字
        toNumber(params) {
            let arr = ['growth_value', 'hold_value', 'reduce_value']
            arr.forEach(item => {
                params[item] = Number(params[item])
            })
        },
        // 修改
        update() {
            this.status = 'update'
        },
        // 提交
        async submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    let s = this.ruleForm
                    let params = {
                        id: s.id,
                        noble_name: s.noble_name,
                        growth_value: s.growth_value,
                        hold_value: s.hold_value,
                        reduce_value: s.reduce_value,
                        hold_day: s.hold_day,
                        privilege_ids: s.privilege_ids
                    }
                    this.toNumber(params)
                    let res = await save(params)
                    if(res.code === 2000) {
                        this.$success('修改成功')
                    }
                    this.openComp(false)
                    this.$emit('getList')
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // 销毁组件
        closed() {
            this.$emit('destoryComp')
        }
    }
}
</script>

<style lang="scss">
.nobility-privilegeAdd-box {
    .el-select {
        width: 330px;
    }
    .dampingBox {
        .el-form-item__label {
            line-height: 18px;
        }
    }
}
</style>