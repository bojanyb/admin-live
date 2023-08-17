<template>
    <div class="consumeComp-box">
        <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        width="450px"
        :before-close="handleClose"
        @closed="closed">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="运营主管" prop="lead_id">
                    <el-select v-model="ruleForm.lead_id" filterable placeholder="请选择" :disabled="status === 'update'">
                        <el-option
                        v-for="item in mainOptions"
                        :key="item.id"
                        :label="item.nickname"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="公会运营" prop="member_ids" v-if="status === 'update'">
                    <el-select v-model="ruleForm.member_ids" placeholder="请选择" filterable multiple>
                        <el-option
                        v-for="item in staffOptions"
                        :key="item.id"
                        :label="item.nickname"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
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
import { getGuildManager, saveGuildManager } from '@/api/videoRoom'
export default {
    data() {
        return {
            dialogVisible: false,
            status: 'add', // 当前状态
            ruleForm: {
                lead_id: '',
                member_ids: ''
            },
            rules: {
                lead_id: [
                    { required: true, message: '请选择运营主管', trigger: 'blur' }
                ],
                member_ids: [
                    { required: false, message: '请选择公会运营', trigger: 'blur' }
                ]
            },
            mainOptions: [],
            staffOptions: []
        };
    },
    mounted() {
        this.getOptions();
    },
    computed: {
        title() {
            if(this.status === 'add') {
                return '新增公会主管'
            } else if(this.status === 'update') {
                return '新增工会运营'
            }
        }
    },
    methods: {
        handleClose() {
            this.dialogVisible = false
        },
        // 获取数据
        loadParams(status, row) {
            this.dialogVisible = true
            this.status = status
            if(status === 'update') {
                let params = JSON.parse(JSON.stringify(row))
                console.log('params',params);
                this.getOptions(params);
            }
        },
        getOptions(row) {
            let params = {} 
            if(row && row.lead_id) {
                params.lead_id = row.lead_id;
            }
            getGuildManager(params).then(res => {
                console.log(res);
                if(res.code === 2000) {
                    const data = res.data || [];
                    if(row && row.lead_id) {
                        let ids = [];
                        data.forEach(item => {
                            item.selected&&ids.push(item.id)
                        })
                        row.member_ids = ids;
                        this.staffOptions = data;
                        this.$set(this.$data, 'ruleForm', row)
                    }else {
                        this.mainOptions = data
                    }
                }
            })
        },
        // 提交
        async submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    let s = this.ruleForm
                    let params = {
                        lead_id: s.lead_id
                    }
                    if(this.status === 'update') {
                        params.member_ids = Array.isArray(s.member_ids)?s.member_ids.join(','):s.member_ids;
                    }
                    let res = await saveGuildManager(params)
                    if(res.code === 2000) {
                        this.$message.success('操作成功！')
                        this.dialogVisible = false
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
        }
    }
}
</script>

<style lang="scss" scoped>
    
</style>