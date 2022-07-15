<template>
    <div class="nobility-privilegeAdd-box">
        <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        width="580px"
        top="5vh"
        :before-close="handleClose"
        @closed="closed">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
                <el-form-item label="贵族名称" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="拥有特权" prop="region">
                    <el-select v-model="ruleForm.region" multiple placeholder="请选择特权">
                        <el-option v-for="item in privilegeList" :key="item.value" :label="item.name" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <div class="specialBox">
                    <el-form-item label="贵族勋章" prop="name">
                        <uploadImg ref="uploadImg" v-model="ruleForm.face" :imgUrl="ruleForm.face" name="face" @validateField="validateField" accept=".png,.jpg,.jpeg"></uploadImg>
                    </el-form-item>
                    <el-form-item label="入场特效" prop="region">
                        <uploadImg ref="uploadImg" v-model="ruleForm.face" :imgUrl="ruleForm.face" name="face" @validateField="validateField" accept=".png,.jpg,.jpeg"></uploadImg>
                    </el-form-item>
                </div>
                <div class="specialBox">
                    <el-form-item label="个性名片" prop="region">
                        <uploadImg ref="uploadImg" v-model="ruleForm.face" :imgUrl="ruleForm.face" name="face" @validateField="validateField" accept=".png,.jpg,.jpeg"></uploadImg>
                    </el-form-item>
                    <el-form-item label="送礼特效" prop="region">
                        <uploadImg ref="uploadImg" v-model="ruleForm.face" :imgUrl="ruleForm.face" name="face" @validateField="validateField" accept=".png,.jpg,.jpeg"></uploadImg>
                    </el-form-item>
                </div>
                
                <el-form-item label="入场横幅" prop="region">
                    <el-button type="primary" @click="selectFunc('goodsBank', )">添加</el-button>
                </el-form-item>
                <el-form-item label="入场座驾" prop="region">
                    <el-button type="primary" @click="selectFunc('goodsBank')">添加</el-button>
                </el-form-item>
                <el-form-item label="专属礼物" prop="region">
                    <el-button type="primary" @click="selectFunc('drawer')">添加</el-button>
                </el-form-item>
                

                <div class="specialBox">
                    <el-form-item prop="name">
                        <label slot="label">成&nbsp;&nbsp;长&nbsp;&nbsp;值</label>
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item prop="name">
                        <label slot="label">保&nbsp;&nbsp;级&nbsp;&nbsp;值</label>
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                </div>
                <div class="specialBox">
                    <el-form-item label="保级天数" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="未保级衰减值" prop="name" class="dampingBox">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                </div>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="resetForm('ruleForm')">取 消</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 商品组件 -->
        <goodsBank ref="goodsBank" v-if="isDestoryComp" :list="list" @validateField="validateField"></goodsBank>

        <!-- 礼物组件 -->
        <drawer ref="drawer" v-if="isDestoryComp" :status="status" @distoryComp="distoryComp" :activityType="activityType" :list="gifts"></drawer>
    </div>
</template>

<script>
// 礼物库
import drawer from '@/components/gift/drawer/index.vue'
// 引入商品库组件
import goodsBank from '@/components/goodsBank/index.vue'
// 引入图片上传组件
import uploadImg from '@/components/uploadImg/index.vue'
// 引入公共map
import MAPDATA from '@/utils/jsonMap.js'
export default {
    components: {
        uploadImg,
        goodsBank,
        drawer
    },
    data() {
        return {
            list: [],
            gifts: [],
            activityType: 'mmly',
            dialogVisible: true,
            isDestoryComp: false, // 销毁组件
            privilegeList: MAPDATA.NOBILITYPRIVILEGELIST, // 特权列表
            status: 'add', // 状态
            ruleForm: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                region: [
                    { required: true, message: '请选择活动区域', trigger: 'change' }
                ],
                date1: [
                    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                ],
                date2: [
                    { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                ],
                type: [
                    { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                ],
                resource: [
                    { required: true, message: '请选择活动资源', trigger: 'change' }
                ],
                desc: [
                    { required: true, message: '请填写活动形式', trigger: 'blur' }
                ]
            }
        };
    },
    computed: {
        title() {
            if(this.status === 'add') {
                return '新增贵族'
            } else if(this.status === 'update') {
                return '修改贵族'
            } else {
                return '查看贵族'
            }
        }
    },
    watch: {
        gifts: {
            handler(n) {
                console.log(n, 'n---------1010')
            },
            deep: true
        },
        list: {
            handler(n) {
                console.log(n, 'n-------2020')
            },
            deep: true
        }
    },
    methods: {
        // 选择商品 - 礼物
        selectFunc(name) {
            this.isDestoryComp = true
            setTimeout(() => {
                this.$refs[name].drawer = true
                this.$refs[name].giftList()
            }, 50);
        },
        // 获取数据
        loadParams(status, row) {
            this.status = status
            this.dialogVisible = true
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => {
                done();
            })
            .catch(_ => {});
        },
        // 提交
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
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
        validateField() {},
        // 销毁组件
        closed() {
            this.$emit('destoryComp')
        },
        distoryComp() {
            this.isDestoryComp = false
        }
    }
}
</script>

<style lang="scss">
.nobility-privilegeAdd-box {
    .el-select {
        width: 460px;
    }
    .specialBox {
        display: flex;
        .el-form-item {
            margin-right: 20px;
        }
        .dampingBox {
            .el-form-item__label {
                line-height: 18px;
            }
        }
    }
}
</style>