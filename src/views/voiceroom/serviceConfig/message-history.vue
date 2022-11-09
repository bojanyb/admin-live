<template>
    <div class="serviceConfig-message-history-box">
        <menuComp ref="menuComp" :menuList="menuList" v-model="tabIndex" @tabChange="tabChange"></menuComp>

        <div class="searchParams">
			<div class="formBox">
                <div class="sunBox" v-if="tabIndex === '0'">
                    <span>发送用户ID</span>
                    <el-input v-model="form.from_user_number" placeholder="请输入发送用户ID"></el-input>
                </div>
                <div class="sunBox" v-if="tabIndex === '0'">
                    <span>接收用户ID</span>
                    <el-input v-model="form.to_user_number" placeholder="请输入接收用户ID"></el-input>
                </div>

                <div class="sunBox" v-if="tabIndex === '1'">
                    <span>发送用户ID</span>
                    <el-input v-model="form.user_number" placeholder="请输入发送用户ID"></el-input>
                </div>
                <div class="sunBox" v-if="tabIndex === '1'">
                    <span>房间ID</span>
                    <el-input v-model="form.room_number" placeholder="请输入房间ID"></el-input>
                </div>

                <div class="sunBox" v-if="tabIndex !== '2'">
                    <span>消息内容</span>
                    <el-input v-model="form.content" placeholder="请输入消息内容"></el-input>
                </div>

                <div class="sunBox" v-if="tabIndex !== '2'">
                    <span>敏感词</span>
                    <el-select v-model="form.sen_status" placeholder="请选择" @change="change">
                        <el-option
                        v-for="item in sen_statusList"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>

                <div class="sunBox" v-if="form.sen_status === 1 && tabIndex !== '2'">
                    <span>条数</span>
                    <el-select v-model="form.msg_count" placeholder="请选择" @change="change">
                        <el-option
                        v-for="item in msg_countList"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>

                <div class="sunBox" v-if="form.sen_status !== 1 && tabIndex !== '2'">
                    <span>时间选择</span>
                    <el-date-picker
                    v-model="form.time"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="timestamp"
                    :default-time="['00:00:00', '23:59:59']"
                    @change="change">
                    </el-date-picker>
                </div>
                <div class="sunBox" v-if="tabIndex === '2'">
                    <span>敏感词</span>
                    <el-input v-model="form.keyword" placeholder="请输入敏感词"></el-input>
                </div>
                <div class="sunBox" v-if="tabIndex !== '2' && form.sen_status == 1">
                    <span>日期选择</span>
                    <el-date-picker
                        v-model="time2"
                        type="date"
                        placeholder="选择日期"
                        @change="changeDate"
                        >
                    </el-date-picker>
                </div>
				<div class="btnBox">
					<el-button class="seeBox" type="primary" @click="onSearch">查询</el-button>
					<el-button @click="today" v-if="tabIndex !== '2'  && form.sen_status !== 1">今日</el-button>
					<el-button @click="yesterday" v-if="tabIndex !== '2' && form.sen_status !== 1">昨日</el-button>
					<el-button @click="beforeYesterday" v-if="tabIndex !== '2' && form.sen_status !== 1">前天</el-button>
					<el-button @click="recentSeven" v-if="tabIndex !== '2' && form.sen_status !== 1">七天</el-button>
                    <span class="sunBox refreshNum" v-if="tabIndex !== '2'" style="margin-left: 12px;">
                        <el-input v-model="refreshNum" placeholder="最少5秒" @blur="changeRefreshNum"></el-input> 秒刷新
                    </span>
                    <el-button @click="add" type="success"  v-if="tabIndex == '2'">新增</el-button>
                    <span class="refreshBox" v-if="tabIndex !== '2'">
                        <el-switch
                        v-model="isRefresh"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        @change="switchChange">
                        </el-switch>
                    </span>
				</div>
			</div>
        </div>

        <!-- <div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-search-btn="true" :show-reset="true" :show-recent-seven="true" :showYesterday="tabIndex !== '2'" :showBeforeYesterday="tabIndex !== '2'" :showToday="tabIndex !== '2'" :show-add="tabIndex === '2'" @onReset="reset" @onSearch="onSearch" @yesterday="yesterday" @beforeYesterday="beforeYesterday" @today="today" @recentSeven="recentSeven" @add="add"></SearchPanel>
        </div> -->



		<tableList :cfgs="cfgs" ref="tableList" @handlePageChange="handlePageChange" @saleAmunt="saleAmunt"></tableList>

        <!-- 详情组件 -->
        <historyComp v-if="isDestoryComp" ref="historyComp" @destoryComp="destoryComp" @getList="getList"></historyComp>
    </div>
</template>

<script>
// 引入api
import { softDelete } from '@/api/risk.js'
// 引入新增组件
import historyComp from './components/historyComp.vue'
// 引入tab菜单组件
import menuComp from '@/components/menuComp/index.vue'
// 引入菜单组件
import SearchPanel from '@/components/SearchPanel/final.vue'
// 引入列表组件
import tableList from '@/components/tableList/TableList.vue'
// 引入api
import REQUEST from '@/request/index.js'
// 引入公共方法
import { timeFormat } from '@/utils/common.js'
// 引入公共参数
import mixins from '@/utils/mixins.js'
// 引入公共map
import MAPDATA from '@/utils/jsonMap.js'
export default {
    mixins: [mixins],
    components: {
        SearchPanel,
        tableList,
        menuComp,
        historyComp
    },
    data() {
        return {
            sen_statusList: MAPDATA.RISKMANAGEMENTMESSAGEHISTORYLIST,
            msg_countList: MAPDATA.RISKMANAGEMENTMESSAGENUMBERLIST,
            form: {
                from_user_number: '',
                to_user_number: '',
                content: '',
                user_number: '',
                room_number: '',
                sen_status: 2,
                msg_count: 100,
                time: [],
                keyword: ''
            },
            isRefresh: false, // 是否定时刷新
            menuList: [
                {
                    name: '私聊会话消息'
                },
                {
                    name: '房间会话消息'
                },
                {
                    name: '敏感词库'
                }
            ],
            isDestoryComp: false, // 是否销毁组件
            tabIndex: '0',
            searchParams: {
                dateTimeParams: [],
                sen_status: 2
            },
            dateTimeParams: {
                start_time: null,
                end_time: null
            },
            ruleForm: {}, // 储存max_id
            timer: null, // 定时刷新
            time2: new Date(),
            refreshNum: localStorage.getItem("refreshNum") ? localStorage.getItem("refreshNum") : 30
        };
    },
    computed: {
        forms() {
            let arr = [
                {
                    name: 'from_user_number',
                    type: 'input',
                    value: '',
                    label: '发送用户ID',
                    isNum: true,
                    placeholder: '请输入发送用户ID'
                },
                {
                    name: 'to_user_number',
                    type: 'input',
                    value: '',
                    label: '接收用户ID',
                    isNum: true,
                    placeholder: '请输入接收用户ID'
                },
                {
                    name: 'content',
                    type: 'input',
                    value: '',
                    label: '消息内容',
                    placeholder: '请输入消息内容'
                }
            ]
            let arr1 = [
                {
                    name: 'user_number',
                    type: 'input',
                    value: '',
                    label: '发送用户ID',
                    isNum: true,
                    placeholder: '请输入发送用户ID'
                },
                {
                    name: 'room_number',
                    type: 'input',
                    value: '',
                    label: '房间ID',
                    isNum: true,
                    placeholder: '请输入房间ID'
                },
                {
                    name: 'content',
                    type: 'input',
                    value: '',
                    label: '消息内容',
                    placeholder: '请输入消息内容'
                }
            ]
            let arr2 = [
                {
                    name: 'sen_status',
                    type: 'select',
                    value: 1,
                    keyName: 'value',
                    optionLabel: 'name',
                    label: '敏感词',
                    placeholder: '请选择',
                    options: MAPDATA.RISKMANAGEMENTMESSAGEHISTORYLIST
                },
                {
                    name: 'msg_count',
                    type: 'select',
                    value: 1000,
                    keyName: 'value',
                    optionLabel: 'name',
                    label: '条数',
                    placeholder: '请选择',
                    options: MAPDATA.RISKMANAGEMENTMESSAGENUMBERLIST
                },
                {
                    name: 'dateTimeParams',
                    type: 'datePicker',
                    dateType: 'datetimerange',
                    format: "yyyy-MM-dd HH:mm:ss",
                    clearable: true,
                    class: 'message-history-dateTimeParams',
                    label: '时间选择',
                    value: '',
                    handler: {
                        change: v => {
                            this.emptyDateTime()
                            this.setDateTime(v)
                        },
                        selectChange: (v, key) => {
                            this.emptyDateTime()
                        }
                    }
                }
            ]
            let arr3 = [
                {
                    name: 'keyword',
                    type: 'input',
                    value: '',
                    label: '敏感词',
                    placeholder: '请输入敏感词'
                },
            ]
            let arr4 = []
            if(this.tabIndex === '0') {
                arr4 = [ ...arr, ...arr2 ]
            } else if(this.tabIndex === '1') {
                arr4 = [ ...arr1, ...arr2 ]
            } else if(this.tabIndex === '2') {
                arr4 = [ ...arr3 ]
            }
            return arr4
        },
        cfgs() {
            let arr = [
                {
                    label: '时间',
                    render: (h, params) => {
                        return h('span', params.row.create_time || '无')
                    }
                },
                {
                    label: '发送用户ID',
                    render: (h, params) => {
                        return h('div', this.tabIndex === '0' ? params.row.from_user_number : params.row.user_number)
                    }
                },
                {
                    label: '用户昵称',
                    render: (h, params) => {
                        return h('div', this.tabIndex === '0' ? params.row.from_user_nickname : params.row.user_nickname)
                    }
                },
            ]
            let arr1 = [
                {
                    label: '接收用户ID',
                    render: (h, params) => {
                        return h('div', params.row.to_user_number || '无')
                    }
                },
                {
                    label: '接收用户昵称',
                    render: (h, params) => {
                        return h('div', params.row.to_user_nickname || '无')
                    }
                },
                {
                    label: '消息类型',
                    prop: 'msg_type_str'
                },
            ]
            let arr2 = [
                {
                    label: '房间ID',
                    render: (h, params) => {
                        return h('div', params.row.room_number || '无')
                    }
                },
                {
                    label: '房间标题',
                    render: (h, params) => {
                        return h('div', params.row.title || '无')
                    }
                },
            ]
            let arr3 = [
                {
                    label: '消息内容',
                    showOverFlow: true,
                    render: (h, params) => {
                        return h('div', params.row.content || '无')
                    }
                },
                {
                    label: '敏感状态',
                    render: (h, params) => {
                        let data = MAPDATA.RISKMANAGEMENTMESSAGEHISTORYLIST.find(item => { return item.value === params.row.sen_status })
                        return h('span', { style: {
                            color: params.row.sen_status === 1 ? '#FF4949' : ''
                        } }, data ? data.name : '无')
                    }
                },
                {
                    label: '敏感内容',
                    showOverFlow: true,
                    render: (h, params) => {
                        return h('div', { style: {
                            color: params.row.sen_str ? '#FF4949' : ''
                        } }, params.row.sen_str || '无')
                    }
                }
            ]
            let arr4 = [
                {
                    label: '添加时间',
                    render: (h, params) => {
                        return h('span', params.row.create_time ? timeFormat(params.row.create_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
                    }
                },
                {
                    label: '敏感词',
                    render: (h, params) => {
                        return h('span', params.row.val || '无')
                    }
                },
                {
                    label: '添加人',
                    render: (h, params) => {
                        return h('span', params.row.nickname || '无')
                    }
                },
                {
                    label: '操作',
                    render: (h, params) => {
                        return h('div', [
                            h('el-button', { props: { type: 'danger'}, on: {click:()=>{this.deleteParams(params.row.id)}}}, '移除')
                        ])
                    }
                }
            ]
            let arr5 = [], name;
            if(this.tabIndex === '0') {
                arr5 = [ ...arr, ...arr1, ...arr3 ]
                name = 'chatList'
            } else if(this.tabIndex === '1') {
                arr5 = [ ...arr, ...arr2, ...arr3 ]
                name = 'roomList'
            } else if(this.tabIndex === '2') {
                arr5 = [ ...arr4 ]
                name = 'index'
            }
            return {
                vm: this,
                url: REQUEST.risk[name],
                columns: arr5
            }
        }
    },
    methods: {
        // 是否启用定时刷新
        switchChange(v) {
            if(v) {
                let time = this.refreshNum * 1000
                this.$success('开启定时刷新,'+ this.refreshNum +'S')
                this.timer = setInterval(() => {
                    this.getList()
                }, time);
            } else {
                if(this.timer) {
                    this.$success('定时刷新已关闭')
                    clearInterval(this.timer)
                }
            }
        },
        // 更改
        change() {
            this.getList()
        },
        // 今日
        today() {
            this.changeIndex(0)
            this.getList()
        },
        // 昨日
        yesterday() {
            this.changeIndex(1)
            this.getList()
        },
        // 前天
        beforeYesterday() {
            this.changeIndex(2)
            this.getList()
        },
        // 最近七天
        recentSeven() {
            this.changeIndex(4)
            this.getList()
        },
        // 更改日期
        changeIndex(index) {
            let date = new Date()
            let now, now1, start, end;
            switch (index) {
                case 0:
                    now1 = timeFormat(date, 'YYYY-MM-DD', false)
                    now = timeFormat(date, 'YYYY-MM-DD', false)
                    break;
                case 1:
                    now1 = timeFormat(date - 3600 * 1000 * 24 * 1, 'YYYY-MM-DD', false)
                    now = timeFormat(date - 3600 * 1000 * 24 * 1, 'YYYY-MM-DD', false)
                    break;
                case 2:
                    now1 = timeFormat(date - 3600 * 1000 * 24 * 2, 'YYYY-MM-DD', false)
                    now = timeFormat(date - 3600 * 1000 * 24 * 2, 'YYYY-MM-DD', false)
                    break;
                case 3:
                    now1 = timeFormat(date, 'YYYY-MM-DD HH:mm:ss', false)
                    now = timeFormat(date, 'YYYY-MM-DD', false)
                    break;
                case 4:
                    now1 = timeFormat(date, 'YYYY-MM-DD', false)
                    now = timeFormat(date - 3600 * 1000 * 24 * 6, 'YYYY-MM-DD', false)
                    break;
            }
            start = new Date(now + ' 00:00:00')
            if(index == 3 || index == 0) {
                end = new Date(timeFormat(date, 'YYYY-MM-DD HH:mm:ss', false))
            } else {
                end = new Date(now1 + ' 23:59:59')
            }

            let time = [start.getTime(), end.getTime()]
            this.form.time = time
            this.$set(this.form, 'time', time)
        },
        // 命中 -- 更改日期
        changeDate(val){
            let date = new Date()
            let currentDate = timeFormat(date, 'YYYY-MM-DD', false)
            let currentTime = timeFormat(date, 'YYYY-MM-DD HH:mm:ss', false)
            let changeDate = timeFormat(val, 'YYYY-MM-DD', false)
            let start,end
            if(currentDate == changeDate){ // 当天
                start = Date.parse(currentDate + ' 00:00:00')
                end = Date.parse(currentTime)
            }else{ // 其他时间
                start = Date.parse(changeDate + ' 00:00:00')
                end = Date.parse(changeDate + ' 23:59:59')
            }
            this.form.time[0] = start
            this.form.time[1] = end
            this.getList()
        },
        // 配置参数
        beforeSearch(params) {
            let s = { ...this.form }
            let data = {
                page: params.page,
                pagesize: params.size,
                start_time: s.time && s.time.length > 0 ? Math.floor(s.time[0] / 1000) : '',
				end_time: s.time && s.time.length > 0 ? Math.floor(s.time[1] / 1000) : '',
                sen_status: s.sen_status,
                from_user_number: s.from_user_number,
                to_user_number: s.to_user_number,
                content: s.content,
                user_number: s.user_number,
                room_number: s.room_number,
                msg_count: s.msg_count
            }
            if(this.tabIndex === '2') {
                data = {
                    page: params.page,
                    pagesize: params.size,
                    keyword: s.keyword
                }
            }
            return data
        },
        // 获取列表数据
        saleAmunt(row) {
            this.ruleForm = { ...row }
        },
        // 下一页操作
        handlePageChange(val) { // 模拟缓存当前列表数据
            this.$refs.tableList.$data.search.page = val
            let max_id = this.ruleForm.max_id || 0
            this.$refs.tableList.getData(max_id, this.tabIndex)
        },
        // 刷新列表
        getList() {
            if(this.$refs.tableList) {
                this.$refs.tableList.getData()
            }
        },
        // 设置时间段
        setDateTime(arr) {
            const date = arr ? {
                start_time: arr[0],
                end_time: arr[1]
            } : {}
            this.$set(this, 'dateTimeParams', date)
        },
        // 清空日期选择
        emptyDateTime() {
            this.dateTimeParams = {}
        },
        // 重置
        reset() {
            this.form = {
                time: [],
                sen_status: 2,
                msg_count: 1000
            }
            this.changeIndex(0)
            this.getList()
        },
        // 查询
        onSearch() {
            this.changeIndex(3)
            this.getList()
        },
        // 新增
        add() {
            this.isDestoryComp = true
            setTimeout(() => {
                this.$refs.historyComp.loadParams()
            }, 50);
        },
        // 销毁组件
        destoryComp() {
            this.isDestoryComp = false
        },
        // 菜单切换
        tabChange() {
            if(this.timer) {
                clearInterval(this.timer)
                this.isRefresh = false
            }
            setTimeout(() => {
                this.today(0)
            }, 0);
        },
        // 移除
        deleteParams(id) {
            this.$confirm('确认移除当前敏感词吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                let res = await softDelete({ id })
                if(res.code === 2000) {
                    this.$success('删除成功')
                    this.getList()
                }
            }).catch(() => {});
        },
        // 刷新秒数设置
        changeRefreshNum(){
            if(this.refreshNum < 5){
                this.refreshNum = 5
            }else if(this.refreshNum > 60){
                this.refreshNum = 60
            }
            localStorage.setItem("refreshNum",this.refreshNum)
        }
    },
    created() {
        this.changeIndex(3)
    },
    destroyed() {
        if(this.timer) {
            clearInterval(this.timer)
        }
    }
}
</script>

<style lang="scss">
.serviceConfig-message-history-box {
    padding: 10px 20px 20px 20px;
    box-sizing: border-box;
    line-height: 40px;
    .searchParams {
		// margin-bottom: 20px;
		.formBox {
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			.sunBox {
				margin-right: 12px;
				margin-bottom: 20px;
				>span {
					font-size: 14px;
    				color: #606266;
					font-weight: 700;
					margin-right: 12px;
				}
				.el-input {
					width: 180px;
					input {
						border: none;
						background: #F5F7FA;
					}
				}
				.el-select {
					width: 180px;
					border: none;
                    line-height: 32px !important;
					input {
						border: none;
						background: #F5F7FA;
					}
				}
				.el-date-editor {
					border: none;
					background: #F5F7FA;
					input {
						background: #F5F7FA;
					}
				}
			}
            .refreshNum{
                .el-input{
                    width: 50px;
                }
            }
			.btnBox {
				margin-bottom: 20px;
			}
		}
        .refreshBox {
            margin-left: 10px;
        }
	}
}

.message-history-dateTimeParams {
    .el-button--text {
        span {
            display: none;
        }
    }
}
</style>
