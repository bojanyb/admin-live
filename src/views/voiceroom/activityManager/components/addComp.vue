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
                    <el-input v-model="ruleForm.name" maxlength="20" placeholder="请输入活动标题" clearable/>
                </el-form-item>
                <el-form-item label="权重排序" prop="sort">
                    <el-input v-model="ruleForm.sort" v-input-num="true" placeholder="请输入权重排序" clearable/>
                </el-form-item>
                <el-form-item label="闪屏图片" prop="flash_img" class="tipsItem">
                    <uploadImg ref="flash_img" v-model="ruleForm.flash_img" :imgUrl="ruleForm.flash_img" name="flash_img" accept=".png" :isFileType="true" @input="getFileSplash"></uploadImg>
                    <div class="tipsText">仅允许png格式，建议大小不超5MB</div>
                </el-form-item>
                <el-form-item label="banner图片" prop="banner_img" class="tipsItem">
                    <uploadImg ref="banner_img" v-model="ruleForm.banner_img" :imgUrl="ruleForm.banner_img" maxWidth="690" maxHeight="200" name="banner_img" accept=".png" :isFileType="true" @input="getFileBanner"></uploadImg>
                    <div class="tipsText">仅允许png格式，建议尺寸690×200，建议大小不超5MB</div>
                </el-form-item>
                <el-form-item label="房间游标图片" prop="room_img" class="tipsItem">
                    <uploadImg ref="room_img" v-model="ruleForm.room_img" :imgUrl="ruleForm.room_img" maxWidth="130" maxHeight="130" name="room_img" accept=".png" :isFileType="true" @input="getFilenonius"></uploadImg>
                    <div class="tipsText">仅允许png格式，建议尺寸130*130，建议大小不超5MB</div>
                </el-form-item>
                <el-form-item label="落地类型" prop="url">
                    <el-input :placeholder="placeholderText" v-model="ruleForm.url" class="input-with-select">
                        <el-select v-model="ruleForm.jumpType" slot="prepend"  placeholder="链接选择" @change="handleNavToType">
                            <el-option v-for="item in pathType" :label="item.name" :value="item.value" :key="item.value"></el-option>
                        </el-select>
                    </el-input>
                </el-form-item>
                <el-form-item label="活动时间">
                    <el-date-picker
                    v-model="time"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="timestamp"
                    :default-time="['00:00:00', '23:59:59']"
                    @change="handleChangeTime">
					        </el-date-picker>
                </el-form-item>
                <el-form-item label="展示位置">
                <el-select v-model="ruleForm.pos_id" placeholder="请选择展示位置">
                  <el-option v-for="item in postOptions" :label="item.pos_desc" :value="item.pos_id" :key="item.pos_id"></el-option>
                </el-select>
                </el-form-item>
                <el-form-item label="是否全屏" prop="is_half">
                    <el-radio-group v-model="ruleForm.is_half" @change="handleBuyChange(ruleForm.is_half)">
                      <el-radio label="0">是</el-radio>
                      <el-radio label="1">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="屏幕尺寸" prop="height">
                    <el-input v-model="ruleForm.height" v-input-limit="2" placeholder="请输入屏幕高度" clearable>
                      <template slot="append">
                          <span class="unit">dp</span>
                      </template>
                    </el-input>
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
import { addResourceConfig, editResource, posList } from '@/api/activity.js'

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
    data() {
        return {
            dialogVisible: false,
            goodsNumTypeList: MAPDATA.GOODNUMTYPE,
            goodsType: 1,
            status: 'add',
            oldParams: {},
            pathType: MAPDATA.PATHTYPE,
            placeholderText: "请先选择落地类型",
            navToType: 0,
            time : [new Date(),new Date()],
            ruleForm: {
                name: '',
                sort: '',
                flash_img: '',
                banner_img: '',
                room_img: '',
                jumpType: '',
                time: '',
                url: '',
                nav_to: '',
                pos_id: '',
                is_half: "0",
                height: 0,
            },
          postOptions: [],
            rules: {
                name: [
                    { required: true, message: '请输入活动标题', trigger: 'blur' }
                ],
                sort: [
                    { required: true, message: '请输入权重排序', trigger: 'blur' }
                ],
                url: [
                    { required: true, message: '请输入落地地址', trigger: 'blur' }
                ],
                is_half: [
                    { required: true, message: '请选择是否全屏', trigger: 'change' }
                ],
                height: [
                    { required: true, message: '请输入屏幕尺寸', trigger: 'blur' }
                ],
            },
        };
    },
    methods: {
        handleClose() {
            this.close()
        },
        load(status, row) {
            this.status = status
            this.getPosList()
            if(status !== 'add') {
                this.oldParams = row
                let params = JSON.parse(JSON.stringify(row))
                params.start_time = params.start_time * 1000
                params.end_time = params.end_time * 1000
                params.id = params.id
                params.banner_img = params.banner_img
                params.flash_img = params.flash_img
                params.name = params.name
                params.room_img = params.room_img
                params.sort = params.sort
                params.url = params.nav_to.type == 'app' ? params.nav_to.params.roomId : params.nav_to.uri
                params.jumpType = params.nav_to.type == 'app' ? 1 : 2
                this.$set(this.$data, 'ruleForm', params)
                this.time=[]
                this.time[0] = params.start_time
                this.time[1] = params.end_time
            }
        },
        // 提交
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let params = { ...this.ruleForm }
                    if(this.time.length == 0){
                        this.$message.error('请先选择活动时间')
                        return
                    }
                    params.start_time = Math.floor(this.time[0] / 1000)
                    params.end_time = Math.floor(this.time[1] / 1000)
                    let type = '',url = '',roomId=''
                    if(params.jumpType == ''){
                        this.$message.error('请先选择落地类型')
                        return
                    }
                    if(params.banner_img == "" && params.flash_img == "" && params.room_img == ""){
                        this.$message.error('请添加资源位素材')
                        return
                    }
                    switch (params.jumpType) {
                        case 1:
                            type = 'app'
                            roomId = params.url
                            break;
                        case 2:
                            type = 'h5'
                            url = params.url
                            break;
                        default:
                            break;
                    }
                    params.nav_to = {
                        type : type,
                        uri: url,
                        is_half: params.is_half,
                        height : params.height
                    }
                    if(roomId !== ""){
                        params.nav_to.params = {
                            roomId : roomId
                        }
                        params.nav_to.uri = 'enterRoom'
                    }
                    params.nav_to = JSON.stringify(params.nav_to)
                    delete params.url
                    delete params.jumpType
                    delete params.time
                    delete params.is_half
                    delete params.height
                    if(this.status == 'add'){
                        addResourceConfig(params).then(res => {
                            if(res.code === 2000) {
                                this.dialogVisible = false
                                this.$emit('onSearch')
                            }
                        }).catch(err => {
                            this.$message.error(err)
                        })
                    }else if(this.status == 'update'){
                        editResource(params).then(res => {
                            if(res.code === 2000) {
                                this.dialogVisible = false
                                this.$emit('onSearch')
                            }
                        }).catch(err => {
                            this.$message.error(err)
                        })
                    }
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
        // 时间选择
        handleChangeTime(row){
            this.time = row
            this.ruleForm.time = row
      },
      async getPosList() {
        const res = await posList()
        if (res.code + '' === '2000') {
          this.postOptions = res.data.list || []
        }
      }
    },
    mounted() {
    }
}
</script>

<style lang="scss">
.resourceState-add-box {
    .el-dialog{
        margin-top: 5vh !important;
    }
    .el-form {
        max-height: 73vh !important;
        overflow-y: scroll;
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
        .uploadImg{
            width: 120px;
            height: 120px;
            .el-upload{
                width: 120px;
                height: 120px;
                .el-icon-plus{
                    width: 120px;
                    height: 120px;
                    line-height: 120px;
                }
                .avatar{
                    width: 120px;
                    height: 120px;
                }
            }
        }
        .tipsText{
            font-size: 12px;
        }
        .tipsItem{
            margin-bottom: 0;
        }
    }
    .el-form::-webkit-scrollbar {
      width: 5px;
      background-color: #F5F5F5;
    }
    .el-form::-webkit-scrollbar-thumb {
      border-radius:5px;
      background:rgba(0,0,0,0.1);
      -webkit-box-shadow:inset006pxrgba(0,0,0,0.5);
    }
}
</style>
