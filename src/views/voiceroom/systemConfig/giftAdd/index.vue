<template>
    <div class="giftAdd-box">
        <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        width="580px"
        top="5vh"
        :before-close="handleClose"
        @closed="closed">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm">
                <el-form-item label="礼物名" prop="gift_name">
                    <el-input v-model="ruleForm.gift_name" placeholder="请输入礼物名"></el-input>
                </el-form-item>
                <el-form-item label="礼物类型" prop="gift_genre">
                    <el-radio-group v-model="ruleForm.gift_genre">
                        <el-radio v-for="item in giftTypeList" :key="item.value" :label="item.value">{{ item.name }}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="礼物分类" prop="checkList">
                    <el-checkbox-group v-model="ruleForm.checkList">
                        <el-checkbox v-for="item in classifyList" :key="item.value" :label="item.value">{{ item.name }}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="贵族等级" prop="class" v-if="ruleForm.checkList.indexOf(5) !== -1">
                    <el-select v-model="ruleForm.class" placeholder="请选择">
                        <el-option
                        v-for="item in nobilityList"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="礼物播放类型" prop="play_type">
                    <el-radio-group v-model="ruleForm.play_type">
                        <el-radio v-for="item in playTypeList" :key="item.value" :label="item.value">{{ item.name }}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="礼物图片" prop="gift_photo">
                    <uploadImg ref="uploadImg" v-model="ruleForm.gift_photo" :imgUrl="ruleForm.gift_photo" name="gift_photo" @validateField="validateField" accept=".png,.jpg,.jpeg"></uploadImg>
                </el-form-item>
                <el-form-item label="礼物特效" prop="gift_gif">
                    <uploadImg ref="uploadImg" v-model="ruleForm.gift_gif" :imgUrl="ruleForm.gift_gif" name="gift_gif" @validateField="validateField" :accept="limitImgType"></uploadImg>
                </el-form-item>
                <el-form-item label="礼物版本号" prop="gift_version" v-if="status !== 'add'">
                    <el-input v-model="ruleForm.gift_version" onkeydown="this.value=this.value.replace(/^0+/,'');" oninput="this.value=this.value.replace(/[^\d.]/g,'');" placeholder="请输入礼物版本号"></el-input>
                </el-form-item>
                <el-form-item label="钻石价格" prop="gift_diamond">
                    <el-input v-model="ruleForm.gift_diamond" onkeydown="this.value=this.value.replace(/^0+/,'');" oninput="this.value=this.value.replace(/[^\d]/g,'');" placeholder="请输入钻石价格"></el-input>
                </el-form-item>
                <!-- <el-form-item label="平台分成" prop="name">
                    <el-input v-model="ruleForm.gift_name"></el-input>
                </el-form-item> -->
                <el-form-item label="礼物生效时间" prop="start_time">
                    <el-date-picker
                    v-model="ruleForm.start_time"
                    type="datetime"
                    placeholder="选择时间"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="timestamp"
                    :picker-options="timePicker">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="礼物过期时间" prop="end_time">
                    <el-date-picker
                    v-model="ruleForm.end_time"
                    type="datetime"
                    placeholder="选择时间"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="timestamp"
                    :picker-options="timePicker">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="状态" prop="status" v-if="status !== 'add'">
                    <el-select v-model="ruleForm.status" placeholder="请选择">
                        <el-option
                        v-for="item in filterStatusList"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="排序" prop="sort">
                    <el-input v-model="ruleForm.sort" onkeydown="this.value=this.value.replace(/^0+/,'');" oninput="this.value=this.value.replace(/[^\d]/g,'');" @input="inputSort" placeholder="请输入排序"></el-input>
                </el-form-item>
                <el-form-item label="礼物说明" prop="gift_desc">
                    <el-input type="textarea" :rows="4" v-model="ruleForm.gift_desc" placeholder="请输入礼物说明"></el-input>
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
// 引入api
import { getGiftAdd, getGiftEdit } from '@/api/videoRoom'
// 引入图片上传组件
import uploadImg from '@/components/uploadImg/index.vue'
// 引入公共map
import MAPDATA from '@/utils/jsonMap.js'
export default {
    components: {
        uploadImg
    },
    data() {
        return {
            dialogVisible: true,
            playTypeList: MAPDATA.SYSTEMGIFTPLAYTYPELIST, // 播放类型
            classifyList: MAPDATA.SYSTEMGIFTCLASSIFYLIST, // 礼物分类
            nobilityList: MAPDATA.NOBILITYCLASSLIST, // 贵族等级
            status: 'add', // 当前类型
            ruleForm: {
                gift_name: '',
                gift_genre: 4,
                play_type: 1,
                gift_photo: '',
                gift_gif: '',
                gift_version: '',
                gift_diamond: null,
                start_time: null,
                end_time: null,
                status: null,
                sort: null,
                gift_desc: '',
                checkList: [],
                class: ''
            },
            rules: {
                gift_name: [
                    { required: true, message: '请输入礼物名', trigger: 'blur' },
                    // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                gift_genre: [
                    { required: true, message: '请选择礼物类型', trigger: 'change' }
                ],
                play_type: [
                    { required: true, message: '请选择礼物播放类型', trigger: 'change' }
                ],
                gift_photo: [
                    { required: true, message: '请上传礼物图片', trigger: 'change' }
                ],
                gift_gif: [
                    { required: true, message: '请上传礼物特效', trigger: 'change' }
                ],
                gift_version: [
                    { required: true, message: '请输入礼物版本号', trigger: 'change' }
                ],
                gift_diamond: [
                    { required: true, message: '请输入钻石价格', trigger: 'change' }
                ],
                start_time: [
                    { type: 'date', required: true, message: '请选择礼物生效时间', trigger: 'change' }
                ],
                end_time: [
                    { type: 'date', required: true, message: '请选择礼物过期时间', trigger: 'change' }
                ],
                status: [
                    { required: true, message: '请选择礼物状态', trigger: 'change' }
                ],
                sort: [
                    { required: true, message: '请输入礼物排序', trigger: 'blur' }
                ],
                gift_desc: [
                    { required: true, message: '请输入礼物说明', trigger: 'blur' }
                ]
            }
        };
    },
    computed: {
        giftTypeList() { // 过滤礼物类型
            let array = MAPDATA.SYSTEMGIFTLIST.filter(item => {
                return item.value > 3
            })
            return array
        },
        filterStatusList() { // 过滤礼物状态
            let arr = MAPDATA.LIBRARYGIFTSLIST
            let array = arr.filter(item => { return item.value })
            return array
        },
        title() {
            if(this.status === 'add') { // 标题
                return '新增礼物'
            } else {
                return '修改礼物'
            }
        },
        timePicker() { // 时间 - 限制
            return {
                disabledDate: (time) => {
                    return time.getTime() < new Date().getTime() - 24 * 60 * 60 * 1000;
                }
            }
        },
        limitImgType() { // 限制上传文件类型
            if(this.ruleForm.play_type === 1) {
                return '.zip'
            } else if(this.ruleForm.play_type === 2) {
                return '.svg,.svga'
            }
        }
    },
    methods: {
        // 判断排序输入最大值
        inputSort(v) {
            if(Number(v) >= 65535) {
                this.ruleForm.sort = 65535
            }
        },
        // 获取参数
        loadParams(status, row) {
            this.status = status
            this.dialogVisible = true
            if(status !== 'add') {
                let params = JSON.parse(JSON.stringify(row))
                params.start_time = params.start_time * 1000
                params.end_time = params.end_time * 1000
                this.$set(this.$data, 'ruleForm', params)
            }
        },
        // 提交
        async submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    let s = this.ruleForm
                    let params = { ...this.ruleForm }
                    params.start_time = Math.floor(params.start_time / 1000)
                    params.end_time = Math.floor(params.end_time / 1000)
                    return console.log(params, 'params----------1010')
                    if(this.status === 'add') {
                        delete params.status
                        delete params.gift_version

                        let res = await getGiftAdd(params)
                        if(res.code === 2000) {
                            this.$message.success('新增成功')
                        }
                    } else {
                        let res = await getGiftEdit(params)
                        if(res.code === 2000) {
                            this.$message.success('修改成功')
                        }
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // 重置
        resetForm() {
            this.handleClose()
        },
        // 关闭弹窗
        handleClose() {
            this.dialogVisible = false
        },
        // 重置 - 验证
        validateField(name) {
            this.$refs.ruleForm.validateField([name])
        },
        // 销毁组件
        closed() {
            this.$emit('destoryComp')
        }
    }
}
</script>

<style lang="scss">
.giftAdd-box {
    .el-date-editor, .el-select {
        width: 430px;
    }
}
</style>