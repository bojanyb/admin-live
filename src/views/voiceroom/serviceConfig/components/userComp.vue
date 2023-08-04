<template>
    <div class="serviceConfig-userComp-box">
        <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        width="730px"
        :before-close="handleClose"
        :close-on-click-modal="false"
        @closed="closed">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="85px" class="demo-ruleForm" label-suffix=":" :hide-required-asterisk="status === 'see'">
                <div class="inputBox">
                    <el-form-item label="用户ID" prop="user_number" class="numberBox">
                        <el-input v-model="ruleForm.user_number" :disabled="status === 'blocked'" @input="numberInput"></el-input>

                        <el-button type="success" @click="seeUser">查询</el-button>
                    </el-form-item>
                    <el-form-item label="处罚类别" prop="punish_type_id">
                        <el-select v-model="ruleForm.punish_type_id" placeholder="请选择" :disabled="disabled" @change="handleTypeChange">
                            <el-option v-for="item in punishTypeList" :key="item.value" :label="item.name" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="处罚类型" prop="type">
                        <div>
                            <el-radio-group v-model="ruleForm.category" :disabled="disabled" @change="handleCategoryChange">
                                <el-radio label="1">行为处罚</el-radio>
                                <el-radio label="2">警告</el-radio>
                            </el-radio-group>
                            <el-select v-if="ruleForm.category === '1'" v-model="ruleForm.type" multiple placeholder="请选择" :disabled="disabled">
                                <el-option v-for="item in typeList" :key="item.value" :label="item.name" :value="item.value"></el-option>
                            </el-select>
                        </div>
                    </el-form-item>
                    <!-- <el-form-item label="重置资料" prop="reset" v-if="!ruleForm.ban_duration">
                        <el-select v-model="ruleForm.reset" multiple placeholder="请选择" :disabled="disabled" clearable>
                            <el-option v-for="item in resetList" :key="item.value" :label="item.name" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item> -->
                    <el-form-item label="处罚时间" prop="ban_duration" v-if="!isIncludeReset">
                        <el-select v-model="ruleForm.ban_duration" placeholder="请选择" :disabled="disabled" clearable>
                            <el-option v-for="(item,index) in timeList" :key="index" :label="item.name" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="违规证据" v-if="status !== 'blocked'">
                        <el-upload
                        class="upload-demo"
                        action="#"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        :limit="1"
                        accept=".png,.jpg,.jpeg,.mp4"
                        :on-exceed="handleExceed"
                        :file-list="fileList"
                        :http-request="upLoad">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png/mp4文件</div>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="备注说明" prop="remark">
                        <el-input type="textarea" placeholder="请输入备注内容，该内容用户可看到，建议20个字以内。" :rows="4" maxlength="20" show-word-limit v-model="ruleForm.remark" :disabled="disabled"></el-input>
                    </el-form-item>
                </div>
                <div class="infoBox" :class="[{'infoBox_hign': status === 'blocked' && !isIncludeReset},{'infoBox_hign_copy_box': status !== 'blocked' && !isIncludeReset},{'infoBox_hign_copy': status !== 'blocked' && isIncludeReset},{'infoBox_hign_copy_box_two': status === 'blocked' && isIncludeReset}]" v-if="userList.length > 0" v-for="(item,index) in userList" :key="index">
                    <div class="upBox">
                        <img :src="item.face" alt="">
                        <div class="rightBox">
                            <div class="name">{{ item.nickname }}</div>
                            <div class="id">ID：{{ item.user_number }}</div>
                            <div class="id">userId：{{ item.id }}</div>
                        </div>
                    </div>
                    <div class="downBox">
                        <p>用户等级：<span>{{ item.user_rank }}</span></p>
                        <p>魅力等级：<span>{{ item.live_rank }}</span></p>
                        <p>用户状态：<span>{{ item.statusText ? item.statusText : "无" }}</span></p>
                        <p>违规信息：<span>{{ item.lineText ? item.lineText : "无" }}</span></p>
                        <p>实名信息：<span>{{ item.real_name ? item.real_name : '无' }}</span></p>
                        <p>所属派对公会：<span>{{ item.party_name ? item.party_name : '无' }}</span></p>
                        <p>所属直播公会：<span>{{ item.live_name ? item.live_name : '无' }}</span></p>
                        <p>注册时间：<span>{{ item.create_time }}</span></p>
                    </div>
                </div>
                <div class="infoBox emptyBox" :class="[{'infoBox_hign_copy': isIncludeReset}]" v-if="userList.length <= 0">暂无数据</div>

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
import { getUserReportDeal, getPunishTypeList } from '@/api/videoRoom'
// 引入api
import { userList } from '@/api/user'
// 引入抽屉组件
import drawer from '@/components/drawer/index'
// 引入上传组件
import uploadImg from '@/components/uploadImg/index.vue'
// 引入api
import { addUserPunish, saveUserPunish, punishStatus } from '@/api/risk'
// 引入公共map
import MAPDATA from '@/utils/jsonMap.js'
import moment from 'moment'
// 引入oss
import { uploadOSS } from '@/utils/oss.js'
import { debounce } from "lodash";
export default {
    props: {
      isDetection: {
        type: Boolean,
        default: false
      },
    },
    components: {
        drawer,
        uploadImg
    },
    data() {
        return {
            fileList: [],
            dialogVisible: false,
            timeList: MAPDATA.DURATIONCOPY, // 处罚时长
            // typeList: MAPDATA.USERPUNISHTYPELISTCOPYTWO, // 处罚类型
            resetList: MAPDATA.USERPUNIRESETLISTCOPY,
            status: 'add',
            userList: [], // 查询用户
            ruleForm: {
                user_number: '',
                category: '1',
                type: [],
                ban_duration: '',
                remark: '',
                reset: [],
                punish_type_id: null
            },
            oldParams: {}, // 老数据
            form: {},
            rules: {
                user_number: [
                    { required: true, message: '请输入用户ID', trigger: 'blur' },
                    // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                punish_type_id: [
                    { required: true, message: '请选择处罚类别', trigger: 'change' }
                ],
                type: [
                    { required: true, message: '请选择处罚类型', trigger: 'blur' }
                ],
                reset: [
                    { required: false, message: '请选择重置资料', trigger: 'change' }
                ],
                ban_duration: [
                    { required: true, message: '请选择处罚时间', trigger: 'change' }
                ],
                remark: [
                    { required: true, message: '请输入处罚备注', trigger: 'blur' }
                ]
            },
            punishTypeList: []
        };
    },
    computed: {
        title() { // 标题
            if(this.status === 'add') {
                if(JSON.stringify(this.form) !== '{}') {
                    return '处理用户举报'
                } else {
                    return '新增用户处罚'
                }
            } else if(this.status === 'see') {
                return '查看用户处罚'
            }
        },
        disabled() { // 禁止输入
            if(this.status === 'see') {
                return true
            }
            return false
        },
        isIncludeReset() { // 是否包含重置资料
          let arr = JSON.parse(JSON.stringify(MAPDATA.TIMEPENALTYSTATUS))
            let isShow = true
            if(this.ruleForm.type.length > 0) {
                arr.forEach(item => {
                    if(this.ruleForm.type.indexOf(item.value) !== -1) {
                        isShow = false
                    }
                })
            } else {
                isShow = false
            }
            return isShow
        },
        typeList() { // 处罚类型
            let arr = JSON.parse(JSON.stringify(MAPDATA.USERPUNISHTYPELISTCOPYTWO))
            let arr1 = this.ruleForm.type.filter(item => { return item > 10 })
            let arr2 = arr.map(item => {
                let params = {
                    name: item.name,
                    value: item.value,
                    disabled: false
                }
                if(this.ruleForm.type.length > 0) {
                    if(arr1.length > 0) {
                        if(item.value < 10) {
                            params.disabled = true
                        } else {
                            params.disabled = false
                        }
                    } else {
                        if(item.value > 10) {
                            params.disabled = true
                        } else {
                            params.disabled = false
                        }
                    }
                }
                return params
            })
            return arr2
        }
    },
    methods: {
        // 移除之后
        handleRemove(file, fileList) {
            console.log(file, fileList);
            this.ruleForm.img = ''
        },
        // 预览
        handlePreview(file) {
            console.log(file);
        },
        // 超出文件数量最大上传
        handleExceed(files, fileList) {
            this.$warning(`最大上传一个文件`);
        },
        // 移除文件之前
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        },
        // 上传
        upLoad(file) {
            uploadOSS(file.file).then(res => {
                if(res.url) {
                    this.ruleForm.img = res.url
                }
            }).catch(err => {
                this.$message.error(err)
            })
        },
        // 限制id输入
        numberInput() {
            this.ruleForm.user_number = this.ruleForm.user_number.replace(/[^\d]/g, '')
        },
        // 关闭弹窗
        handleClose() {
            this.dialogVisible = false
        },
        // 查询用户
        async seeUser() {
            if(!this.ruleForm.user_number) {
                this.$warning('请输入用户ID')
                return false
            }
            let res = await userList({ user_number: this.ruleForm.user_number })
            if(res.code === 2000) {
                if(res.data.list.length <= 0) {
                    this.$warning('查询不到数据')
                } else {
                    res.data.list[0].create_time = moment(res.data.list[0].create_time * 1000).format('YYYY-MM-DD HH:mm:ss')
                    this.userList = res.data.list || []
                    this.getPunishStatus(res.data.list[0].id)
                }
            }
        },
         // 用户封禁状态
         async getPunishStatus(user_id){
            var formdata=new FormData();
            formdata.append("user_id",user_id);
            let res = await punishStatus(formdata)
            if(res.code === 2000) {
                this.$set(this.userList[0],'statusText',res.data.status)
                this.$set(this.userList[0],'lineText',res.data.stat)
            }
        },
        // 获取数据
        loadParams(status, row) {
            console.log(row, 'row-------------2020')
            this.dialogVisible = true
            this.status = status
            if (this.isDetection) {
              let params = JSON.parse(JSON.stringify(row))
              this.$set(this.ruleForm, 'user_number', params.user_number)
              this.seeUser()
            }
            if(status !== 'add' && status !== 'blocked') {
                let params = JSON.parse(JSON.stringify(row))
                let data = {}
                data.user_number = params.punished_user_number
                data.ban_duration = null
                data.remark = ''
                data.type = []
                data.punish_type_id = null
                this.$set(this.$data, 'ruleForm', data)
                this.$set(this.$data, 'form', params)
                this.seeUser()
            } else if(status === 'blocked') {
                let params = JSON.parse(JSON.stringify(row))
                let data = {}
                data.user_number = params.punished_user_number
                data.ban_duration = null
                data.remark = ''
                data.type = []
                data.reset = []
                data.punish_type_id = null
                this.$set(this.$data, 'ruleForm', data)
                this.$set(this.$data, 'form', params)
                this.seeUser()
            }

            this.oldParams = JSON.parse(JSON.stringify(this.ruleForm))
        },
        openComp(status = true) {
            this.$refs.drawer.loadParams(status)
        },
        // 提交
      submitForm: debounce(async function (formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    if(this.status !== 'add') {
                        let data = { ...this.form, ...this.ruleForm }
                        let s = {
                            id: data.id,
                            ban_duration: data.ban_duration,
                            remark: data.remark,
                            punish_type_id: data.punish_type_id,
                        }
                        let arr = JSON.parse(JSON.stringify(data.type))
                        s.reset = arr.filter(item => { return item > 10 && item !== 15 })
                        s.type = arr.filter(item => { return item < 10 || item === 15 })
                        if(s.type.length <= 0 && s.reset.length > 0) {
                            s.ban_duration = 900
                        }
                        if(s.type.length <= 0) {
                            delete s.type
                        }
                        if(s.reset.length <= 0) {
                            delete s.reset
                        }
                        let res = await saveUserPunish(s)
                        if(res.code === 2000) {
                            this.$message.success('处理成功')
                            this.dialogVisible = false
                            this.$emit('getList')
                        }
                    } else {
                        let params = { ...this.ruleForm }
                        if(params.img) {
                            if(params.img.indexOf('.mp4') !== -1) {
                                params.video_path = params.img
                            } else {
                                params.img_path = params.img
                            }
                            delete params.img
                        }
                        let arr = JSON.parse(JSON.stringify(params.type))
                        params.reset = arr.filter(item => { return item > 10 && item !== 15 })
                        params.type = arr.filter(item => { return item < 10 || item === 15  })
                        if(params.type.length <= 0 && params.reset.length > 0) {
                            params.ban_duration = 900
                        }
                        if(params.type.length <= 0) {
                            delete params.type
                        }
                        if(params.reset.length <= 0) {
                            delete params.reset
                        }
                        let res = await addUserPunish(params)
                        if(res.code === 2000) {
                            this.$success('添加成功')
                            this.dialogVisible = false
                            this.$emit('getList')
                        }
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }, 300),
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        // 销毁组件
        closed() {
            this.$emit('destoryComp')
        },
        cancel() {
            if(JSON.stringify(this.oldParams) !== JSON.stringify(this.ruleForm)) { // 记录数据 - 有改动就提示
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
        },
        // 修改
        update() {
            this.status = 'update'
      },
    // 获取处罚类别
    async getPunishType(params) {
      const response = await getPunishTypeList(params);
      if (response.code == 2000) {
        const tempArr = Array.from(
          Array.isArray(response.data) ? response.data : []
        );
        this.punishTypeList =
          tempArr.reduce((prev, curr) => {
            prev.push({
              name: curr.name,
              value: curr.id,
              msg: curr.warning_msg
            });
            return prev;
          }, []) || [];
      }
    },
    // 处罚类型变化
    handleCategoryChange(value) {
        if(value === '2') {
            this.rules.type[0].required = false;
            if(this.ruleForm.punish_type_id && this.punishTypeList.length) {
                const curItem = this.punishTypeList.find(item => item.value === this.ruleForm.punish_type_id);
                if(!curItem) return;
                this.ruleForm.remark = curItem.msg
            }
        } else {
            this.rules.type[0].required = true;
            this.ruleForm.remark = '';
        }
    },
    // 处罚类别变化
    handleTypeChange(value) {
        if(this.ruleForm.category === '2') {
            const curItem = this.punishTypeList.find(item => item.value === value);
            if(!curItem) return;
            this.ruleForm.remark = curItem.msg
        }
    },
  },
  created() {
   this.getPunishType();
  },
}
</script>

<style lang="scss">
.serviceConfig-userComp-box {
    .el-upload-list__item-name {
        width: 240px;
    }
    .el-select {
        width: 305px;
    }
    .el-textarea {
        width: 305px;
    }

    .el-form {
        display: flex;
    }

    .inputBox {
        .numberBox {
            .el-input {
                width: 215px;
            }

            .el-button {
                margin-left: 20px;
            }
        }
    }

    .infoBox {
        width: 270px;
        box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.15);
        padding: 10px 20px;
        box-sizing: border-box;
        margin-left: 20px;
        height: 370px;
        .upBox {
            display: flex;
            align-items: center;
            >img {
                width: 50px;
                height: 50px;
                border-radius: 50%;
            }
            .rightBox {
                margin-left: 20px;
                .name {
                    font-size: 16px;
                }
                .id {
                    font-size: 14px;
                    margin-top: 5px;
                }
            }
        }
        .downBox {
            margin-top: 30px;
            p {
                line-height: 36px;
            }
        }
    }

    .infoBox_hign {
        height: 270px;
        .downBox {
            margin-top: 10px;
            p {
                line-height: 26px;
            }
        }
    }

    .infoBox_hign_copy {
        height: 311px;
        .downBox {
            margin-top: 30px;
            p {
                line-height: 30px;
            }
        }
    }

    .infoBox_hign_copy_box {
        height: 370px;
        .downBox {
            margin-top: 30px;
            p {
                line-height: 32px;
            }
        }
    }

    .infoBox_hign_copy_box_two {
        height: 211px;
        .downBox {
            margin-top: 5px;
            p {
                line-height: 20px;
            }
        }
    }

    .emptyBox {
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>
