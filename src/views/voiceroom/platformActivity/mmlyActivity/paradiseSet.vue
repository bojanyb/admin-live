// 喵喵乐园设置
<template>
    <div class="invite-join-us">
        <div class="searchParams">
            <el-button class="add" v-if="count === 0" type="success" @click="handleAdd">新增</el-button>
        </div>
        <div class="tableList">
            <tableList :cfgs="cfgs" @saleAmunt="saleAmunt" ref="tableList"></tableList>
        </div>

        <el-dialog :title="editTitle" :visible.sync="editPop" :close-on-click-modal="false" :before-close="handleCancel">
			<div slot="title" class="header-title" style="height: 40px;">
			        <div class="fl">{{editTitle}}</div></div>
			<el-form :model="popForm" ref="popForm" :rules="popFormRules">
				<el-form-item label="活动名称" prop="name" :label-width="formLabelWidth">
					<el-col :span="17">
						<el-input v-model="popForm.name" style="width: 335px;"
						disabled />
					</el-col>
				</el-form-item>
                <el-form-item label="活动图标" prop="icon" :label-width="formLabelWidth">
					<el-col :span="17">
						<ossFile :picImg="imageUrl" :type="'img'" :play_type="1" @getUpLoadImg="getUpLoadImg"/>
					</el-col>
				</el-form-item>
                <el-form-item label="活动类型" prop="type" :label-width="formLabelWidth">
                    <el-col :span="17">
                        <el-select v-model="popForm.type" :disabled="popForm.typeName == 'Detail' ? true : false " placeholder="请选择活动类别" style="width: 335px;">
                            <el-option v-for="(item,index) in dwActivityList" :key="index" :label="item.name" :value="item.value"></el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
				<el-form-item label="单次消耗" prop="cost" :label-width="formLabelWidth">
					<el-input v-model="popForm.cost" v-input-limit="0" style="width: 335px;"
						placeholder="最低100" clearable autocomplete="off"
						:disabled="popForm.typeName == 'Detail' ? true : false " /><span style="margin-left:5px;">喵粮</span>
				</el-form-item>
				<el-form-item label="开始时间" prop="start_time" :label-width="formLabelWidth">
					<el-date-picker v-model="popForm.start_time" style="width: 335px;" type="datetime"
						placeholder="选择时间" :picker-options="pickerBeginDateBefore" value-format="yyyy-MM-dd HH:mm:ss"
						format="yyyy-MM-dd HH:mm:ss" clearable
						:disabled="popForm.typeName == 'Detail' ? true : false " />
				</el-form-item>
				<el-form-item label="结束时间" prop="end_time" :label-width="formLabelWidth">
					<el-date-picker v-model="popForm.end_time" style="width: 335px;" type="datetime"
						placeholder="选择时间" :picker-options="pickerBeginDateBefore" value-format="yyyy-MM-dd HH:mm:ss"
						format="yyyy-MM-dd HH:mm:ss" clearable
						:disabled="popForm.typeName == 'Detail' ? true : false " />
				</el-form-item>
				<el-form-item label="添加礼物" :label-width="formLabelWidth">
					<div class="fl">
						<el-button type="primary" @click="$refs.gift.handleAddGiftShow()" v-if="popForm.typeName !== 'Detail'">添 加
						</el-button>
					</div>
				</el-form-item>
				<gift ref="gift" :status="status" :activityType="popForm.code" :list="popForm.gifts"></gift>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="handleCancel" v-if="popForm.typeName !== 'Detail'">取 消</el-button>
				<el-button :loading="loading" type="primary" @click="handleConfirm">确 定</el-button>
			</div>
		</el-dialog>
    </div>
</template>

<script>
// 引入列表组件
import tableList from '@/components/tableList/TableList.vue'
// 引入请求
import request from '@/utils/request2'
// 引入api
import REQUEST from '@/request/index.js'
// 引入时间插件
import moment from 'moment'
// 新增修改、修改礼物配置
import gift from '@/components/gift/index.vue'
// 引入上传文件组件
import ossFile from './../../components/ossFile.vue'
// 引入公共map
import MAPDATA from '@/utils/jsonMap.js'

export default {
    components: {
        tableList,
        gift,
        ossFile
    },
    data() {
        return {
            status: 'add',
            count: 0,
            editTitle: "新增",
            loading: false,
            editPop: false,
            imageUrl : "",
            formLabelWidth : "100px",
            dwActivityList: MAPDATA.DWACTIVITYTYPE,
            popForm: {
                id : "",
                code : "mmly",
                name : "喵喵乐园",
                icon : "",
                animation: "",
                cost: "",
                type: "",
                typeName: "",
                start_time: "",
                end_time:"",
                gifts : [],
            },
            popFormRules: {
                type: [{ required: true, message: '请选择活动类型', trigger: 'change' }],
                name: [{
						required: true,
						trigger: 'blur',
						validator: (rules, value, cb) => {
							if (!this.popForm.name || this.popForm.name == "") {
								return cb(new Error('活动名称不能为空!'))
							}
							if (this.popForm.name.length > 4) {
								return cb(new Error('活动名称必须是四个字以内!'))
							}
							return cb()
						}
					}],
                icon: [{
                    required: true,
                    trigger: 'change',
                    validator: (rules, value, cb) => {
                        if (!this.imageUrl) {
                            return cb(new Error('活动图片不能为空!'))
                        }
                        return cb()
                    }
                }],
                cost: [{
                    required: true,
                    trigger: 'blur',
                    validator: (rules, value, cb) => {
                        if (!this.popForm.cost || this.popForm.cost < 100) {
                            return cb(new Error('单次消耗喵粮数量不能小于 100!'))
                        }
                        return cb()
                    }
                }],
                start_time: [{
						required: true,
						trigger: 'change',
						validator: (rules, value, cb) => {

                            let start_time = moment(this.popForm.start_time, 'YYYY-MM-DD HH:mm:ss').valueOf()
                            let end_time = moment(this.popForm.end_time, 'YYYY-MM-DD HH:mm:ss').valueOf()
							if (!this.popForm.start_time || this.popForm.start_time == "") {
								return cb(new Error('活动生效时间不能为空!'))
							}
							if (start_time > end_time) {
								return cb(new Error('开始时间不能大于结束时间!'))
							}
							return cb()
						}
                }],
                end_time: [{
                    required: true,
                    trigger: 'change',
                    validator: (rules, value, cb) => {
                        let start_time = moment(this.popForm.start_time, 'YYYY-MM-DD HH:mm:ss').valueOf()
                            let end_time = moment(this.popForm.end_time, 'YYYY-MM-DD HH:mm:ss').valueOf()
                        if (!this.popForm.end_time || this.popForm.end_time == "") {
                            return cb(new Error('活动结束时间不能为空!'))
                        }
                        if (start_time > end_time) {
                            return cb(new Error('开始时间不能大于结束时间!'))
                        }
                        return cb()
                    }
                }],
            },
            pickerBeginDateBefore: {
                disabledDate(value) {
                    if (new Date(value).getTime() + 3600 * 1000 * 24 < new Date().getTime()) {
                        return true
                    }
                    return false
                }
            },
        }
    },
    computed: {
        forms() {
            return [
            ]
        },
        cfgs() {
            return {
                vm: this,
                url: REQUEST.platformActivity.Activityins,
                method: "post",
                columns: [
                    {
                        label: '活动名称',
                        minWidth: '100px',
                        prop: 'name',
                        render: (h, params) => {
                            return h('span', params.row.name)
                        }
                    },
                    {
                        label: '礼物种类数量',
                        minWidth: '120px',
                        prop: 'gift_count',
                        render: (h, params) => {
                            return h('span', params.row.gift_count)
                        }
                    },
                    {
                        label: '投入',
                        minWidth: '100px',
                        prop: 'in',
                        render: (h, params) => {
                            return h('span', params.row.in)
                        }
                    },
                    {
                        label: '产出',
                        minWidth: '100px',
                        prop: 'out',
                        render: (h, params) => {
                            return h('span', params.row.out)
                        }
                    },
                    {
                        label: '单次消耗喵粮数',
                        minWidth: '120px',
                        prop: 'cost',
                        render: (h, params) => {
                            return h('span', params.row.cost)
                        }
                    },
                    {
                        label: '活动状态',
                        prop: 'status',
                        width : '80',
                        render: (h, params) => {
                            let newDate = parseInt(new Date().getTime() / 1000);
                            let start_time = params.row.start_time;
                            let end_time = params.row.end_time;
                            if(newDate < start_time || newDate > end_time){
                                params.row.status = 2;
                            }
                            if(params.row.status === 1) {
                                return h('span',{style: {color: 'green'},}, '开始')
                            }
                            return h('span',{style: {color: 'red'},}, '暂停')
                        }
                    },
                    {
                        label: '开始时间',
                        minWidth: '160px',
                        prop: 'start_time',
                        render: (h, params) => {
                            return h('span', params.row.start_time > 0 ? moment(params.row.start_time * 1000).format('YYYY-MM-DD HH:mm:ss') : "")
                        }
                    },
                    {
                        label: '结束时间',
                        minWidth: '160px',
                        prop: 'end_time',
                        render: (h, params) => {
                            return h('span', params.row.end_time > 0 ? moment(params.row.end_time * 1000).format('YYYY-MM-DD HH:mm:ss') : "")
                        }
                    },
                    {
                        label: '操作',
                        width: '260',
                        render: (h, params) => {
                            return h('div', [
                                h('el-button', { props: { type: 'primary'}, on: {click:()=>{this.hanldeEdit(params.row)}}},'修改'),
                                h('el-button', { props: { type: 'primary'}, on: {click:()=>{this.hanldeShow(params.row)}}},'查看'),
                                h('el-button', { props: { type: params.row.status == 1 ? 'danger' : 'success'}, on: {click:()=>{this.handleChange(params.row)}}},(params.row.status == 1 ? '暂停' : '开始')),
                            ])
                        }
                    },
                ]
            }
        }
    },
    methods:{
        //传递参数
        beforeSearch(params) {
            return {
                size: params.size,
                page: params.page,
                code : "mmly"
            };
        },
        // 新增
        handleAdd(){
            this.status = 'add' // 当前状态
            this.popForm= {
                id : "",
                code : "mmly",
                name : "喵喵乐园",
                icon : "",
                animation: "",
                type: "",
                cost: "",
                start_time: "",
                end_time:"",
                gifts : [],
            }
            this.imageUrl = "";
            if (this.$refs['popForm']) {
                this.$refs['popForm'].resetFields()
            }
            this.editPop = true
        },
        saleAmunt(row) {
            this.count = row.count
        },
        // 修改
        hanldeEdit(row){
            this.status = 'update' // 当前状态
            this.popForm.id = row.id;
            this.popForm.name = row.name;
            this.imageUrl = row.icon;
            this.type = row.type;
            this.popForm.cost =row.cost;
            this.popForm.start_time = row.start_time > 0 ? moment(row.start_time * 1000).format('YYYY-MM-DD HH:mm:ss') : "";
            this.popForm.end_time = row.end_time > 0 ? moment(row.end_time * 1000).format('YYYY-MM-DD HH:mm:ss') : "";
            this.handleGetGift(row.id);
            this.editPop = true;
        },
        // 查看
        hanldeShow(row){
            this.status = 'see' // 当前状态
            this.popForm.id = row.id;
            this.popForm.name = row.name;
            this.imageUrl = row.icon;
            this.type = row.type;
            this.popForm.cost =row.cost;
            this.popForm.start_time = row.start_time > 0 ? moment(row.start_time * 1000).format('YYYY-MM-DD HH:mm:ss') : "";
            this.popForm.end_time = row.end_time > 0 ? moment(row.end_time * 1000).format('YYYY-MM-DD HH:mm:ss') : "";
            this.popForm.typeName = "Detail";
            this.handleGetGift(row.id);
            this.editTitle = "查看";
            this.editPop = true;
        },
        // 开始 暂停
        handleChange(row){

            let newDate = parseInt(new Date().getTime() / 1000);
            let start_time = row.start_time;
            let end_time = row.end_time;
            console.log("newDate",newDate);
            console.log("start_time",start_time);
            console.log("end_time",end_time);
            if(newDate < start_time || end_time < newDate){
                this.$message.error("未在活动时间范围内");
                return
            }

            let params = {
                id : row.id,
                status: row.status == 1 ? 2 : 1
            }
            request({
                url: REQUEST.platformActivity.stop,
                method: "post",
                data: params
            }).then(res => {
                this.$message.success("操作成功");
                this.$refs.tableList.getData()
            }).catch(err=>{
                this.$message.error(err.msg);
            })
        },
        // 活动图片上传反馈
        getUpLoadImg(source){
            if(source.type == "img"){
                this.imageUrl = source.url;
            }else if(source.type == "animation"){
                this.imageSvgUrl = source.url;
            }
        },

        // 弹框确认事件
        handleConfirm(){
            if(this.editTitle == "查看"){
                this.handleCancel();
                return
            }

            if(this.popForm.gifts.length < 9){
                this.$message.error("至少配置9个礼物！");
                return
            }
            
            let isNum = this.popForm.gifts.find(item => { return !item.gift_number })
            if(isNum) {
                this.$message.error('请先输入礼物数量')
                return
            }

            let gifts = [];
            this.popForm.gifts.map(res=>{
                let item = {
                    id : res.id,
                    sort: res.sort,
                    gift_number: Number(res.gift_number)
                }
                gifts.push(item);
            })
            let params = {
                id : this.popForm.id,
                code : this.popForm.code,
                name : this.popForm.name,
                icon : this.imageUrl,
                type : this.popForm.type,
                animation : this.popForm.animation,
                cost : this.popForm.cost,
                start_time : moment(this.popForm.start_time, 'YYYY-MM-DD HH:mm:ss').valueOf() / 1000,
                end_time : moment(this.popForm.end_time, 'YYYY-MM-DD HH:mm:ss').valueOf() / 1000,
                gifts : gifts
            }

            request({
                url: REQUEST.platformActivity.configMMLY,
                method: "post",
                data: params
            }).then(res => {
                this.$message.success("操作成功");
                this.handleCancel();
                this.$refs.tableList.getData();
            }).catch(err=>{
                this.$message.error(err);
            })
        },
        // 弹出框关闭
        handleCancel(){
            this.editPop = false;
        },
        // 获取当前活动礼物数据
        handleGetGift(activity_id){
            let params = {
                activity_id: activity_id
            }
            request({
                url: REQUEST.platformActivity.getHasAddGift,
                method: "post",
                data: params
            }).then(res => {
                this.popForm.gifts = res.data.list;
            }).catch(err=>{
            })
        },
    }
}
</script>

<style lang="scss" scoped>
.invite-join-us {
    padding: 20px;
    box-sizing: border-box;
}
.add{
    margin-bottom: 22px;
}
::v-deep.el-dialog__wrapper{
    .el-dialog{
        width: 75% !important;
        margin-top: 5vh !important;
    }
}
</style>