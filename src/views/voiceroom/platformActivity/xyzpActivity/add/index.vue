<template>
    <div class="xyzpActivity-add-box">
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
            <el-form slot="body" :model="ruleForm" ref="ruleForm" :rules="rules" label-width="90px" label-suffix=":" :hide-required-asterisk="status === 'see'">
				<el-form-item label="活动名称" prop="name">
					<el-col :span="17">
						<el-input v-model="ruleForm.name" disabled />
					</el-col>
				</el-form-item>
                <el-form-item label="活动图标" prop="icon">
					<el-col :span="17">
						<ossFile :picImg="imageUrl" :type="'img'" :play_type="1" @getUpLoadImg="getUpLoadImg"/>
					</el-col>
				</el-form-item>
                <el-form-item label="活动类型" prop="type">
                    <el-col :span="17">
                        <el-select v-model="ruleForm.type" :disabled="disabled" placeholder="请选择活动类别">
                            <el-option v-for="(item,index) in dwActivityList" :key="index" :label="item.name" :value="item.value"></el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
				<el-form-item label="单次消耗" prop="cost">
					<el-input v-model="ruleForm.cost" v-input-limit="0" placeholder="最低100" clearable :disabled="disabled" /> <span style="margin-left:5px;">喵粮</span>
				</el-form-item>
				<el-form-item label="开始时间" prop="start_time">
					<el-date-picker v-model="ruleForm.start_time" type="datetime"
						placeholder="选择时间" :picker-options="StartPicker" value-format="yyyy-MM-dd HH:mm:ss"
						format="yyyy-MM-dd HH:mm:ss" clearable
						:disabled="disabled" />
				</el-form-item>
				<el-form-item label="结束时间" prop="end_time">
					<el-date-picker v-model="ruleForm.end_time" type="datetime"
						placeholder="选择时间" :picker-options="EndPicker" value-format="yyyy-MM-dd HH:mm:ss"
						format="yyyy-MM-dd HH:mm:ss" clearable
						:disabled="disabled" />
				</el-form-item>
				<el-form-item label="添加礼物" :label-width="formLabelWidth">
					<div class="fl">
						<el-button type="primary" @click="$refs.gift.handleAddGiftShow()" 
                        :disabled="(ruleForm.gifts.length < 10 && !disabled) ? false : true"
                        >添 加
						</el-button>
					</div>
				</el-form-item>
				<gift ref="gift" :status="status" :isShowLocation="true" :activityType="ruleForm.code" :list="ruleForm.gifts" :disabled="disabled"></gift>
			</el-form>
        </drawer>
    </div>
</template>

<script>
// 引入抽屉组件
import drawer from '@/components/drawer/index'
export default {
    components: {
        drawer
    },
    data() {
        return {
            status: 'add',
            ruleForm: {
                name: '',
                icon: '',
                type: '',
                cost: '',
                start_time: '',
                end_time: '',
                gifts: []
            },
            rules: {
                type: [
                   { required: true, message: '请选择活动类型', trigger: 'change' }
                ],
                name: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 1, max: 4, message: '长度在 1 到 4 个字符', trigger: 'blur' }
                ],
                icon: [
                    { required: true, message: '请上传活动图片', trigger: 'change' }
                ]
            },
            oldParams: {} // 老数据
        };
    },
    computed: {
        title() { // 标题
            if(this.status === 'add') {
                return '新增公会'
            } else if(this.status === 'update') {
                return '修改公会'
            }
        },
        disabled() { // 是否禁止输入
            if(this.status === 'see') {
                return true
            }
            return false
        },
        StartPicker() { // 开始时间限制
            return {
                disabledDate: (time) => {
                    return time.getTime() < new Date().getTime() - 24 * 60 * 60 * 1000;
                }
            }
        },
        EndPicker() { // 结束时间限制
            return {
                disabledDate: (time) => {
                    if(!this.ruleForm.start_time) {
                        return time.getTime() < new Date().getTime() - 24 * 60 * 60 * 1000;
                    }
                    return time.getTime() < this.ruleForm.start_time  - 24 * 60 * 60 * 1000;
                }
            }
        },
    },
    methods: {
        // 新增 - 修改
        loadParams(status, row) {
            this.openComp()
            this.status = status
            if(status !== 'add') {
                let params = JSON.parse(JSON.stringify(row))
                params.guild_type = params.guild_type ? params.guild_type : ''
                this.$set(this.$data, 'ruleForm', params)
            }

            this.oldParams = JSON.parse(JSON.stringify(this.ruleForm))
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
        // 提交
        async submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    let params = { ...this.ruleForm }
                    if(this.status === 'add') {
                        let res = await getGuildCreate(params)
                        if(res.code === 2000) {
                            this.$success('新增成功')
                        }
                    } else {
                        let res = await getGuildUpdate(params)
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
        },
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
        }
    }
}
</script>

<style lang="scss">
.xyzpActivity-add-box {

}
</style>