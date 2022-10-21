<template>
    <div class="roomBgEdit-box">
        <drawer 
        size="470px"
        title="修改房间直播信息"
        ref="drawer"
        :isShowUpdate="true"
        @cancel="cancel"
        @submitForm="submitForm"
        @closed="closed"
        :disabled="disabled"
        @update="update">
            <el-form slot="body" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" label-suffix=":" :hide-required-asterisk="status === 'see'">
                <el-form-item label="背景图名称" prop="name">
                    <el-input v-model="ruleForm.name" placeholder="请输入背景图名称"></el-input>
                </el-form-item>
                <el-form-item label="排序权重" prop="sort">
                    <el-input v-model="ruleForm.sort" placeholder="请输入排序权重" oninput="this.value=this.value.replace(/[^\d]/g,'');"></el-input>
                </el-form-item>
                <el-form-item label="背景选择" prop="assign_status">
                    <el-select v-model="ruleForm.assign_status" placeholder="请选择">
                        <el-option
                        v-for="item in assignList"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="房间ID" prop="assign_room" v-if="ruleForm.assign_status === 1">
                    <el-input type="textarea" :rows="4" v-model="ruleForm.assign_room" placeholder="请输入房间ID，输入多个房间ID请用逗号隔开" @input="roomInput"></el-input>
                </el-form-item>
                <el-form-item label="房间背景图" prop="url">
                    <uploadImg v-model="ruleForm.url" accept=".png,.jpg,.jpeg,.svga" :imgUrl="ruleForm.url" name="url" ref="url" @validateField="validateField"></uploadImg>
                </el-form-item>
                <!-- <el-form-item label="是否默认" prop="is_default">
                    <el-select v-model="ruleForm.is_default">
                        <el-option v-for="item in defaultList" :key="item.value" :label="item.name" :value="item.value"></el-option>
                    </el-select>
                </el-form-item> -->
                <!-- <el-form-item label="默认配置房间类型" prop="room_genre">
                    <el-select v-model="ruleForm.room_genre" placeholder="请选择默认配置房间类型">
                        <el-option v-for="item in typeList" :key="item.value" :label="item.name" :value="item.value"></el-option>
                    </el-select>
                </el-form-item> -->
            </el-form>
        </drawer>
    </div>
</template>

<script>
// 引入抽屉组件
import drawer from '@/components/drawer/index'
// 引入upload组件
import uploadImg from '@/components/uploadImg/index.vue'
// 引入公共map
import MAPDATA from '@/utils/jsonMap.js'
// 引入api
import { getRoomBgAdd } from '@/api/videoRoom'
export default {
    components: {
        uploadImg,
        drawer
    },
    data() {
        return {
            status: 'add',
            typeList: MAPDATA.ROOMTYPELIST,
            defaultList: MAPDATA.USERINVITE,
            ruleForm: {
                // room_genre: '',
                sort: '',
                url: '',
                name: '',
                is_default: null,
                assign_status: null
            },
            oldParams: {}, // 老数据
            rules: {
                name: [
                    { required: true, message: '请输入背景图名称', trigger: 'blur' },
                    { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }
                ],
                sort: [
                    { required: true, message: '请输入排序权重', trigger: 'blur' }
                ],
                assign_room: [
                    { required: true, message: '请输入房间ID', trigger: 'blur' }
                ],
                assign_status: [
                    { required: true, message: '请选择背景类型', trigger: 'change' }
                ],
                url: [
                    { required: true, message: '请上传图片', trigger: 'change' }
                ],
                // room_genre: [
                //     { required: true, message: '请选择房间类型', trigger: 'change' }
                // ],
                // is_default: [
                //     { required: true, message: '请选择是否设置默认背景', trigger: 'change' }
                // ]
            }
        };
    },
    computed: {
        title() { // 标题
            if(this.status === 'add') {
                return '新增房间背景图'
            } else if(this.status === 'update') {
                return '修改房间背景图'
            }
        },
        disabled() {
            return false
        },
        assignList() {
            let arr = JSON.parse(JSON.stringify(MAPDATA.ROOMBACKGROUNDSELECTLIST))
            return arr.filter(item => { return item.name !== '全部' })
        }
    },
    methods: {
        // 限制房间id输入
        roomInput() {
            this.ruleForm.assign_room = this.ruleForm.assign_room.replace(/[\u4E00-\u9FA5A-Za-z_^%&'\-\*\ /;.，。、‘；、】【=?$\[\]!@#()\\~]/g, '')
        },
        // 获取数据
        loadParams(status, row) {
            this.openComp()
            this.status = status

            if(status !== 'add') {
                let params = JSON.parse(JSON.stringify(row))
                this.$set(this.$data, 'ruleForm', params)
            }

            this.oldParams = JSON.parse(JSON.stringify(this.ruleForm))
        },
        // 提交
        async submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    let s = this.ruleForm
                    let params = {
                        id: s.id || null,
                        // room_genre: s.room_genre,
                        sort: s.sort,
                        url: s.url,
                        name: s.name,
                        // is_default: s.is_default,
                        assign_status: s.assign_status
                    }
                    if(s.assign_status === 1) {
                        params.assign_room = s.assign_room
                    }
                    let res = await getRoomBgAdd(params)
                    if(res.code === 2000) {
                        this.$success('操作成功')
                    }
                    this.openComp(false)
                    this.$emit('getList')
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        openComp(status = true) {
            this.$refs.drawer.loadParams(status)
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
        resetForm() {
            this.openComp(false)
        },
        // 销毁组件
        closed() {
            this.$emit('destoryComp')
        },
        // 重置字段验证
        validateField(name) {
            this.$refs.ruleForm.validateField([name])
        }
    }
}
</script>

<style lang="scss">
.roomBgEdit-box {
    .el-input {
        width: 310px;
    }
}
</style>