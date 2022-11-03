<template>
    <div class="resourceState-add-box">
        <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        width="600px"
        :before-close="handleClose"
        :close-on-click-modal="false"
        @closed="destoryComp">
            <el-form :model="ruleForm" :rules="rules" label-suffix=":" ref="ruleForm" label-width="110px" class="demo-ruleForm">
                <el-form-item label="活动标题" prop="name">
                    <el-input v-model="ruleForm.name" placeholder="请输入活动标题" clearable/>
                </el-form-item>
                <el-form-item label="权重排序" prop="sort">
                    <el-input v-model="ruleForm.sort" placeholder="请输入权重排序" clearable/>
                </el-form-item>
                <el-form-item label="闪屏图片" v-if="type=='flash_img'" prop="flash_img">
                    <uploadImg ref="flash_img" v-model="ruleForm.flash_img" :imgUrl="ruleForm.flash_img" name="flash_img" @validateField="validateField" accept=".png,.jpg,.jpeg" @input="getFileSplash"></uploadImg>
                </el-form-item>
                <el-form-item label="banner图片" v-if="type=='banner_img'" prop="banner_img">
                    <uploadImg ref="banner_img" v-model="ruleForm.banner_img" :imgUrl="ruleForm.banner_img" name="banner_img" @validateField="validateField" accept=".png" @input="getFileBanner"></uploadImg>
                </el-form-item>
                <el-form-item label="房间游标图片" v-if="type=='room_img'" prop="room_img">
                    <uploadImg ref="room_img" v-model="ruleForm.room_img" :imgUrl="ruleForm.room_img" name="room_img" @validateField="validateField" accept=".png" @input="getFilenonius"></uploadImg>
                </el-form-item>
                <el-form-item label="落地类型" prop="url">
                    <el-input :placeholder="placeholderText" v-model="ruleForm.url" class="input-with-select">
                        <el-select v-model="ruleForm.jumpType" slot="prepend"  placeholder="链接选择" @change="handleNavToType">
                            <el-option v-for="item in pathType" :label="item.name" :value="item.value" :key="item.value"></el-option>
                        </el-select>
                    </el-input>
                </el-form-item>
                <el-form-item label="活动时间" prop="time">
                    <el-date-picker
					v-model="ruleForm.time"
					type="datetimerange"
					range-separator="至"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
					value-format="timestamp"
					:default-time="['00:00:00', '23:59:59']">
					</el-date-picker>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="resetForm('ruleForm')">取 消</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
// 引入公共map
import MAPDATA from '@/utils/jsonMap.js'
// 引入图片上传组件
import uploadImg from '@/components/uploadImg/index.vue'
// 引入api
import { addResourceConfig } from '@/api/activity.js'

export default {
    components: {
        uploadImg
    },
    computed: {
        title() { // 标题
            if(this.status === 'add') {
                return '新增'
            } else if(this.status === 'update') {
                return '修改'
            } else {
                return '查看'
            }
        },
        StartPicker() { // 开始时间配置
            return {
                disabledDate: (time) => {
                    return time.getTime() < new Date().getTime() - 24 * 60 * 60 * 1000;
                }
            }
        },
        EndPicker() { // 结束时间配置
            return {
                disabledDate: (time) => {
                    return time.getTime() < new Date().getTime() - 24 * 60 * 60 * 1000;
                }
            }
        },
        startTime() { // 开始时间限制
            let start = this.ruleForm.start_time
            let now = new Date().getTime()
            let params = {}
            params = {
                required: true,
                validator: (rules, val, cb) => {
                    if(start < now && this.status === 'add') {
                        cb(new Error('商品生效时间不可小于当前时间'))
                    } else {
                        cb()
                    }
                }
            }
            return params
        },
        endTime() { // 结束时间限制
            let start = this.ruleForm.start_time
            let now = new Date().getTime()
            let params = {}
            params = {
                required: true,
                validator: (rules, val, cb) => {
                    if(start < now && this.status === 'add') {
                        cb(new Error('商品生效时间不可小于当前时间'))
                    } else {
                        cb()
                    }
                }
            }
            return params
        },
    },
    props: {
        type : {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            dialogVisible: false,
            goodsNumTypeList: MAPDATA.GOODNUMTYPE,
            goodsType: 1,
            status: 'add',
            oldParams: {},
            pathType: MAPDATA.PATHTYPE,
            placeholderText: "请先选择落地类型",
            ruleForm: {
                name: '',
                sort: '',
                flash_img: '',
                banner_img: '',
                room_img: '',
                jumpType: '',
                url: '',
                time: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入活动标题', trigger: 'blur' }
                ],
                sort: [
                    { required: true, message: '请输入权重排序', trigger: 'blur' }
                ],
                flash_img: [
                    { required: (this.type=='flash_img' ? true : false), message: '请选择闪屏图片', trigger: 'change' }
                ],
                banner_img: [
                    { required: (this.type=='banner_img' ? true : false), message: '请选择banner图片', trigger: 'change' }
                ],
                room_img: [
                    { required: (this.type=='room_img' ? true : false), message: '请选择房间游标图片', trigger: 'change' }
                ],
                url: [
                    { required: true, message: '请输入落地地址', trigger: 'blur' }
                ],
                time: [
                    { required: true, message: '请选择活动时间', trigger: 'change' },
                ]
            }
        };
    },
    methods: {
        handleClose() {
            this.close()
        },
        load(status, row) {
            this.status = status
            if(status !== 'add') {
                this.oldParams = row
                let params = JSON.parse(JSON.stringify(row))
                params.start_time = params.start_time * 1000
                params.end_time = params.end_time * 1000
                params.noble_level = params.noble_level ? params.noble_level : null
                if(params.goods_animation_path) {
                    this.goodsType = 1
                } else if(params.goods_image) {
                    this.goodsType = 2
                }
                this.$set(this.$data, 'ruleForm', params)
            }
        },
        // 提交
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let params = { ...this.ruleForm }
                    params.start_time = Math.floor(params.time[0] / 1000)
                    params.end_time = Math.floor(params.time[1] / 1000)
                    delete params.time
                    console.log("params:",params)
                    return
                    addResourceConfig(params).then(res => {
                        if(res.code === 2000) {
                            this.$emit('onSearch')
                        }
                    }).catch(err => {
                        this.$message.error(err)
                    })
                } else {
                    return false;
                }
            });
        },
        // 重置
        resetForm(formName) {
            this.close()
        },
        // 关闭弹窗
        close() {
            this.$confirm('关闭后数据不会保存，确定关闭吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.dialogVisible = false
                this.$emit('onSearch')
            }).catch(() => {});
        },
        // 销毁组件
        destoryComp() {
            this.$emit('destoryComp')
        },
        // 重置字段验证
        validateField(name) {
            this.$refs.ruleForm.validateField([name])
        },
        // 落地类型选择
        handleNavToType(row){
            this.navToType = row
            this.placeholderText = row == 1 ? '请输入房间号' : '请输入落地地址'
        },
        // 闪屏图片
        getFileSplash(url){
            this.ruleForm.flash_img = url
        },
        // banner图片
        getFileBanner(url){
            this.ruleForm.banner_img = url
        },
        // 房间游标图片
        getFilenonius(url){
            this.ruleForm.room_img = url
        },
    },
    mounted() {
    }
}
</script>

<style lang="scss">
.resourceState-add-box {
    .el-form {
        .el-form-item__label::before {
            margin-right: 0px !important;
        }
        .el-input {
            width: 300px;
        }
        .el-textarea {
            width: 300px;
        }
        .input-with-select{
            .el-input {
                width: 100px;
            }
        }
        .limit-content {
            .el-form-item__content {
                display: flex;
                // align-items: center;
                .el-button {
                    height: 36px;
                    margin-left: 10px;
                }
            }
        }
        .limit-fa {
            .limit {
                display: flex;
                align-items: center;
                .el-input {
                    width: 150px;
                }
            }
        }
        .goodsImg {
            .el-form-item__label::before {
                content: '*';
                color: #ff4949;
            }
        }
    }
}
</style>
