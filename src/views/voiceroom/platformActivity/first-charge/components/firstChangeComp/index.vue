<template>
    <div class="moveDating-cardComp-box">
        <drawer 
        size="850px"
        :title="title"
        ref="drawer"
        :isShowUpdate="true"
        @cancel="cancel"
        @submitForm="submitForm"
        @closed="closed"
        :disabled="disabled"
        @update="update">
            <el-form slot="body" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="115px" class="demo-ruleForm" label-suffix=":" :hide-required-asterisk="status === 'see'">
                <el-form-item label="活动名称" prop="name">
                    <el-input v-model="ruleForm.name" :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="活动图标" prop="icon">
                    <uploadImg ref="uploadImg" v-model="ruleForm.icon" :imgUrl="ruleForm.icon" name="icon" @validateField="validateField" accept=".png,.jpg,.jpeg" :disabled="disabled"></uploadImg>
                </el-form-item>
                <el-form-item label="活动类型" prop="type">
                    <el-select v-model="ruleForm.type" placeholder="请选择" :disabled="disabled">
                        <el-option v-for="item in typeList" :key="item.value" :label="item.name" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="首充金额" prop="cost">
                    <el-input v-model="ruleForm.cost" :disabled="true" onkeydown="this.value=this.value.replace(/^0+/,'');" oninput="this.value=this.value.replace(/[^\d]/g,'');"></el-input>
                </el-form-item>
                <el-form-item label="赠送单位" prop="name" :rules="unitResult">
                    <el-input v-model="ruleForm.gain.name" :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="赠送图片" prop="gain_image" :rules="ImgResult">
                    <uploadImg ref="uploadImg" v-model="ruleForm.gain.gain_image" :imgUrl="ruleForm.gain.gain_image" name="gain_image" @validateField="validateField" accept=".png,.jpg,.jpeg" :disabled="disabled"></uploadImg>
                </el-form-item>
                <el-form-item label="赠送价格" prop="price" :rules="priceResult">
                    <el-input v-model="ruleForm.gain.price" :disabled="disabled" onkeydown="this.value=this.value.replace(/^0+/,'');" oninput="this.value=this.value.replace(/[^\d]/g,'');"></el-input>
                </el-form-item>
                <el-form-item label="赠送排序" prop="price" :rules="sortResult">
                    <el-select v-model="ruleForm.gain.sort" clearable placeholder="请选择" :disabled="disabled">
                        <el-option
                        v-for="item in locationList"
                        :key="item.value"
                        :label="item.value"
                        :value="item.value"
                        :disabled="item.disabled">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="开始时间" prop="start_time" :rules="StartRules">
                    <el-date-picker
                    :disabled="disabled"
                    v-model="ruleForm.start_time"
                    value-format="timestamp"
                    type="datetime"
                    :picker-options="StartPicker"
                    placeholder="请选择开始时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间" prop="end_time" :rules="EndRules">
                    <el-date-picker
                    :disabled="disabled"
                    v-model="ruleForm.end_time"
                    :picker-options="EndPicker"
                    value-format="timestamp"
                    type="datetime"
                    placeholder="请选择结束时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="添加礼物">
                    <el-button type="primary" :disabled="disabled" @click="$refs.gift.handleAddGiftShow()">添 加</el-button>
                </el-form-item>
                <!-- 礼物组件 -->
                <gift ref="gift" :isShowProperty="true" :status="status" :isShowLocation="true" :activityType="ruleForm.code" :list="ruleForm.gifts" :disabled="disabled" :max="100" :locationList="locationList"></gift>
                <el-form-item label="添加商品">
                    <el-button type="primary" :disabled="disabled" @click="$refs.goodsComp.loadParams()">添 加</el-button>
                </el-form-item>
                <!-- 商品组件 -->
                <goodsComp ref="goodsComp" :list="ruleForm.goods" :disabled="disabled" :max="7" :locationList="locationList" :isShowLocation="true"></goodsComp>
            </el-form>
        </drawer>
    </div>
</template>

<script>
// 获取api
import { getActivetyHasGiftList } from '@/api/videoRoom'
// 引入api
import { addFirstCharge } from '@/api/userActivity'
// 引入抽屉组件
import drawer from '@/components/drawer/index'
// 引入上传组件
import uploadImg from '@/components/uploadImg/index.vue'
// 礼物组件
import gift from '@/components/gift/index.vue'
// 引入商品组件
import goodsComp from '@/components/shoppingComp/index'
// 引入公共map
import MAPDATA from '@/utils/jsonMap.js'
export default {
    components: {
        uploadImg,
        drawer,
        gift,
        goodsComp
    },
    data() {
        return {
            status: 'add', // 当前状态
            oldParams: {}, // 老数据
            typeList: MAPDATA.DWACTIVITYTYPE,
            positionList: MAPDATA.LOCATIONLIST,
            ruleForm: {
                id: null,
                name: '',
                code: 'scpz',
                type: null,
                icon: '',
                cost: 6,
                start_time: '',
                end_time: '',
                gifts: [],
                goods: [],
                gain: {
                    name: '喵粮',
                    gain_image: '',
                    price: '',
                    sort: 4
                }
            },
            rules: {
                name: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' }
                    // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                cost: [
                    { required: true, message: '请输入首充金额', trigger: 'blur' }
                ],
                icon: [
                    { required: true, message: '请上传活动图标', trigger: 'change' }
                ],
                type: [
                    { required: true, message: '请选择活动类型', trigger: 'change' }
                ]
            }
        };
    },
    computed: {
        title() { // 标题
            if(this.status === 'add') {
                return '新增首充活动'
            } else if(this.status === 'update') {
                return '修改首充活动'
            } else {
                return '查看首充活动'
            }
        },
        disabled() { // 禁止修改
            if(this.status === 'see') {
                return true
            }
            return false
        },
        StartRules() { // 开始时间限制
            let params = {}
            let start = this.ruleForm.start_time
            params = {
                required: true,
                validator: (rules, val, cb) => {
                    if(!start) {
                        cb(new Error('请选择开始时间'))
                    } else {
                        cb()
                    }
                }
            }
            return params
        },
        EndRules() { // 结束时间限制
            let params = {}
            let start = this.ruleForm.start_time
            let end = this.ruleForm.end_time
            params = {
                required: true,
                validator: (rules, val, cb) => {
                    if(end < new Date().getTime()) {
                        cb(new Error('结束时间不能小于当前时间!'))
                    } if(start && end <= start) {
                        cb(new Error('结束时间不能小于开始时间!'))
                    } else {
                        cb()
                    }
                }
            }
            return params
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
        unitResult() {
            let params = {}
            params = {
                required: true,
                validator: (rules, val, cb) => {
                    let s = this.ruleForm.gain
                    if(s.name) {
                        cb()
                    } else {
                        cb(new Error('请输入赠送单位'))
                    }
                }
            }
            return params
        },
        ImgResult() {
            let params = {}
            params = {
                required: true,
                validator: (rules, val, cb) => {
                    let s = this.ruleForm.gain
                    if(s.gain_image) {
                        cb()
                    } else {
                        cb(new Error('请上传赠送图片'))
                    }
                }
            }
            return params
        },
        priceResult() {
            let params = {}
            params = {
                required: true,
                validator: (rules, val, cb) => {
                    let s = this.ruleForm.gain
                    if(s.price) {
                        cb()
                    } else {
                        cb(new Error('请填写赠送价格'))
                    }
                }
            }
            return params
        },
        locationList() { // 排序列表数据
            let array = this.positionList.filter(item => { return item.value < 5 })
            let arr = JSON.parse(JSON.stringify(array))
            let s = this.ruleForm
            arr.forEach(item => {
                if(s.goods && s.goods.length > 0) {
                    s.goods.forEach(a => {
                        if(a.sort === item.value) {
                            item.disabled = true
                        }
                    })
                }
                if(s.gifts && s.gifts.length > 0) {
                    s.gifts.forEach(a => {
                        if(a.sort === item.value) {
                            item.disabled = true
                        }
                    })
                }
                if(item.value === this.ruleForm.gain.sort) {
                    item.disabled = true
                }
            })
            return arr
        },
        sortResult() { // 赠送排序验证
            let params = {}
            params = {
                required: true,
                validator: (rules, val, cb) => {
                    let s = this.ruleForm.gain
                    if(s.sort) {
                        cb()
                    } else {
                        cb(new Error('请选择赠送排序'))
                    }
                }
            }
            return params
        }
    },
    methods: {
        handleClose() {
            this.dialogVisible = false
        },
        // 获取数据
        async loadParams(status, row) {
            this.openComp()
            this.status = status
            if(status !== 'add') {
                let params = JSON.parse(JSON.stringify(row))
                params.start_time = params.start_time * 1000
                params.end_time = params.end_time * 1000
                params.cost = 6
                params.gain.sort = 4
                let res = await getActivetyHasGiftList({ activity_id: row.id })
                if(res.code === 2000) {
                    if(res.data.goods && res.data.goods.length > 0) {
                        res.data.goods.forEach(item => {
                            // 重新修改 - 数据字段
                            item.goods_name = item.gift_name
                            if(item.gift_photo.indexOf('.svga') !== -1) {
                                item.goods_animation_path = item.gift_photo
                            } else {
                                item.goods_image = item.gift_photo
                            }
                        })
                    }
                    params.goods = res.data.goods || []
                    params.gifts = res.data.gifts || []
                    this.$set(this.$data, 'ruleForm', params)
                }
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
        // 修改
        update() {
            this.status = 'update'
        },
        // 提交
        async submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    let s = { ...this.ruleForm }
                    s.start_time = Math.floor(s.start_time / 1000)
                    s.end_time = Math.floor(s.end_time / 1000)
                    if(s.goods.length <= 0 && s.goods.length <= 0) {
                        this.$error('请至少添加一个商品或礼物')
                        return false
                    }
                    if(s.gifts && s.gifts.length > 0) {
                        let isUse_date = s.gifts.find(item => { return !item.gift_number })
                        let isSort = s.gifts.find(item => { return !item.sort })
                        if(isUse_date) {
                            this.$warning(`请先输入礼物${isUse_date.gift_name}的礼物数量`)
                            return false
                        }
                        if(isSort) {
                            this.$warning(`请先选择礼物${isSort.gift_name}的礼物位置`)
                            return false
                        }

                        s.gifts = s.gifts.map(a => {
                            return {
                                id: a.id,
                                gift_number: a.gift_number,
                                sort: a.sort
                            }
                        })
                    }
                    if(s.goods && s.goods.length > 0) {
                        let isUse_date = s.goods.find(item => { return !item.use_date })
                        let isSort = s.goods.find(item => { return !item.sort })
                        if(isUse_date) {
                            this.$warning(`请先输入商品${isUse_date.goods_name}的商品数量`)
                            return false
                        }
                        if(isSort) {
                            this.$warning(`请先选择商品${isSort.goods_name}的商品位置`)
                            return false
                        }

                        s.goods = s.goods.map(a => {
                            return {
                                id: a.id,
                                use_date: a.use_date,
                                sort: a.sort
                            }
                        })
                    }
                    let res = await addFirstCharge(s)
                    if(res.code === 2000) {
                        if(this.status === 'add') {
                            this.$success('新增成功')
                        } else {
                            this.$success('修改成功')
                        }
                        this.openComp(false)
                        this.$emit('getList')
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
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
.moveDating-cardComp-box {
    .el-input {
        width: 300px;
    }
    .el-select {
        width: 300px;
    }
    .el-table {
        .el-select {
            width: 100px !important;
            .el-input {
                width: 100px !important;
                input {
                    width: 100px !important;
                }
            }
        }
    }
}
</style>