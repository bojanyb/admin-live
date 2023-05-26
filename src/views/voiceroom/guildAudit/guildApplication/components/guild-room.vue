<template>
	<div class="guildApplication-list-box">
		<SearchPanel
      v-model="searchParams"
      :forms=" forms"
      :showAdd="false"
      :show-reset="true"
      :show-search-btn="true"

      :showYesterday="true"
      :showCurrentWeek="true"
      :showLastWeek="true"
      :showCurrentMonth="true"
      :showLastMonth="true"

      :show-batch-rurn="true"
      :showBeforeYesterday="true"
      batchRurnName="导出EXCEL"

      @onReset="reset"
      @onSearch="onSearch"
      @add="add"

      @yesterday="yesterday"
      @currentWeek="currentWeek"
      @lastWeek="lastWeek"
      @currentMonth="currentMonth"
      @lastMonth="lastMonth"

      @BatchRurn="BatchRurn"
      @beforeYesterday="beforeYesterday"

    >
    </SearchPanel>
		<tableList :cfgs="cfgs" ref="tableList"></tableList>
		<el-dialog
        title="添加房间"
        :width="'600px'"
        :visible.sync="isAdd">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="90px" class="demo-ruleForm" label-suffix=":">
                <el-form-item label="公会ID" prop="guild_number">
                    <el-input v-model="ruleForm.guild_number" oninput="this.value=this.value.replace(/[^\d]/g,'');" placeholder="请输入公会ID" clearable></el-input>
                </el-form-item>
				<el-form-item label="房主ID" prop="user_number">
                    <el-input v-model="ruleForm.user_number" oninput="this.value=this.value.replace(/[^\d]/g,'');" placeholder="请输入房主ID" clearable></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="isAdd = false">取 消</el-button>
                <el-button type="primary" @click="handelAdd">确 定</el-button>
            </div>
        </el-dialog>
	</div>
</template>

<script>
  // 引入api
	import { addGuildRoom, rmGuildRoom,adminUserList } from '@/api/videoRoom.js'
  import { guildRooms } from '@/api/user.js'
  import { partyRoomTypes } from '@/api/house.js'
	// 引入菜单组件
  import SearchPanel from "@/components/SearchPanel/final.vue";
	// 引入列表组件
	import tableList from '@/components/tableList/TableList.vue'
	// 引入api
	import REQUEST from '@/request/index.js'
	// 引入公共方法
	import { timeFormat, exportTableData } from '@/utils/common.js'
	// 引入公共参数
	import mixins from '@/utils/mixins.js'
  import moment from "moment";
	export default {
		mixins: [mixins],
		components: {
			SearchPanel,
			tableList
		},
		computed: {
			forms() {
				return [
          {
            name: 'room_type',
            type: 'select',
            value: '',
            keyName: 'value',
            optionLabel: 'name',
            label: '房间类型',
            placeholder: '请选择',
            clearable: true,
            options: this.roomTypeList
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
						name: 'guild_number',
						type: 'input',
						value: '',
						label: '公会ID',
						isNum: true,
						placeholder: '请输入公会ID'
					},
          {
						name: 'operator',
						type: 'select',
						value: '',
						keyName: 'id',
						optionLabel: 'username',
						label: '公会运营',
						placeholder: '请选择',
						options: this.operatorList
					},
          {
              name: 'dateTimeParams',
              type: 'datePicker',
              dateType: 'datetimerange',
              format: "yyyy-MM-dd HH:mm:ss",
              label: '时间选择',
              value: '',
              handler: {
                  change: v => {
                      this.emptyDateTime()
                      this.setDateTime(v)
                      this.getList();
                  },
                  selectChange: (v, key) => {
                      this.emptyDateTime()
                      this.getList();
                  }
              }
          },
				]
			},
			cfgs() {
				return {
					vm: this,
					url: REQUEST.guild.guildRooms,
					columns: [
						{
							label: '创建时间',
              width: '160px',
							render: (h, params) => {
								return h('span', params.row.create_time ? timeFormat(params.row.create_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
							}
						},
						{
							label: '查询时间',
              width: '200px',
              prop: 'date',
						},
            {
							label: '公会运营',
							render: (h, params) => {
								let data = this.operatorList.find(item => { return item.id === params.row.operator })
								return h('span', data ? data.username : '未知')
							}
						},
						{
							label: '房间ID',
							prop: 'room_number'
						},
						{
							label: '房间类型',
							prop: 'room_type'
						},
						{
							label: '房间标题',
              width: '120px',
							prop: 'room_title'
						},
						{
							label: '房间流水',
							prop: 'flow'
						},
						{
							label: '所属公会ID',
              width: '100px',
							prop: 'guild_number'
						},
						{
							label: '所属公会名称',
              minWidth: '120px',
							prop: 'guild_nickname'
						},
						{
							label: '新用户进厅',
              minWidth: '100px',
							prop: 'first_join'
						},
						{
							label: '进厅总人数',
              minWidth: '100px',
							prop: 'stat_join'
						},
						{
							label: '进厅总人次',
              minWidth: '100px',
							prop: 'times_join'
						},
						{
							label: '消费总人数',
              minWidth: '100px',
							prop: 'stat_consume'
						},
						{
							label: '消费转化率',
              minWidth: '100px',
							prop: 'rate',
              render: (h, params) => {
                  return h('span', params.row.rate + '%')
              }
						},
						{
							label: '成员上麦总人数',
              minWidth: '120px',
							prop: 'anchor'
						},
						{
							label: '成员上麦总时长',
              minWidth: '120px',
              prop: 'stat_anchor_time',
              render: (h, params) => {
                  return h('span', params.row.stat_anchor_time || '0')
              }
						},
						{
							label: '成员私聊用户人数',
              minWidth: '120px',
							prop: 'chat'
						},
						{
							label: '成员私聊用户次数',
              minWidth: '120px',
							prop: 'times_chat'
						},
						{
							label: '操作',
							render: (h, params) => {
								return h('div', [
									h('el-button', { props: { type: 'danger'}, on: {click:()=>{this.del(params.row)}}},'移除')
								])
							}
						}
					]
				}
			},
		},
		data() {
			return {
				isAdd :false,
				ruleForm : {
					guild_number : "",
					user_number : "",
          operatorList: [],
				},
				rules: {
					guild_number: [
						{ required: true, message: '请输入公会ID', trigger: 'blur' ,
						validator: (rules, value, cb) => {
							if (!value) {
								return cb(new Error('公会ID不能为空!'))
							}
							return cb()
						}
					}
					],
					user_number: [
						{ required: true, message: '请输入房主ID', trigger: 'blur',
						validator: (rules, value, cb) => {
							if (!value) {
								return cb(new Error('房主ID不能为空!'))
							}
							return cb()
						}
					 }
					],
				},
        roomTypeList: [], // 房间类型
        dateTimeParams: {
          start_date: null,
          end_date: null,
        },
        searchParams: {
          dateTimeParams: ["", ""]
        }
			}
		},
    created() {
        let date = timeFormat(new Date() - 3600 * 1000 * 24 * 1, "YYYY-MM-DD", false);
        let start = new Date(date + " 00:00:00").getTime();
        let end = new Date(date + " 23:59:59").getTime();
        this.searchParams.dateTimeParams = [start, end];
        this.dateTimeParams = {
          start_date: start,
          end_date: end,
        };
        this.getGenreList();
        this.getAdminUserList();
    },
		methods: {
      // 昨日
      yesterday() {
        this.changeIndex(1);
      },
      // 前天
      beforeYesterday() {
        this.changeIndex(2);
      },
      // 本周
      currentWeek() {
        this.changeIndex(4);
      },
      // 上周
      lastWeek() {
        this.changeIndex(5);
      },
      // 本月
      currentMonth() {
        this.changeIndex(6);
      },
      // 上月
      lastMonth() {
        this.changeIndex(7);
      },
      // 更改日期
      changeIndex(index) {
        let date = new Date();
        let now, now1, start, end;
        switch (index) {
          case 0:
            now1 = timeFormat(date, "YYYY-MM-DD", false);
            now = timeFormat(date, "YYYY-MM-DD", false);
            break;
          case 1:
            now1 = timeFormat(date - 3600 * 1000 * 24 * 1, "YYYY-MM-DD", false);
            now = timeFormat(date - 3600 * 1000 * 24 * 1, "YYYY-MM-DD", false);
            break;
          case 2:
            now1 = timeFormat(date - 3600 * 1000 * 24 * 2, "YYYY-MM-DD", false);
            now = timeFormat(date - 3600 * 1000 * 24 * 2, "YYYY-MM-DD", false);
            break;
          case 3:
            now1 = timeFormat(date - 3600 * 1000 * 24 * 3, "YYYY-MM-DD", false);
            now = timeFormat(date - 3600 * 1000 * 24 * 3, "YYYY-MM-DD", false);
            break;
          case 4:
            now1 = moment().endOf("isoWeek").format("YYYY-MM-DD"); //本周日
            now = moment().startOf("isoWeek").format("YYYY-MM-DD"); //本周一
            break;
          case 5:
            now1 = moment().week(moment().week() - 1).endOf("week").format("YYYY-MM-DD"); //上周日
            now = moment().week(moment().week() - 1).startOf("week").format("YYYY-MM-DD"); //上周一
            break;
          case 6:
            now1 = moment().endOf("month").format("YYYY-MM-DD"); //本月末
            now = moment().startOf("month").format("YYYY-MM-DD"); //本月初
            break;
          case 7:
            now1 = moment().month(moment().month() - 1).endOf("month").format("YYYY-MM-DD"); //上月末
            now = moment().month(moment().month() - 1).startOf("month").format("YYYY-MM-DD"); //上月初
            break;
        }
        start = new Date(now + " 00:00:00");
        if (index == 0) {
          end = new Date(timeFormat(date, "YYYY-MM-DD HH:mm:ss", false));
        } else {
          end = new Date(now1 + " 23:59:59");
        }

        let time = [start.getTime(), end.getTime()];
        this.searchParams.dateTimeParams = time;
        this.dateTimeParams.start_date = time[0];
        this.dateTimeParams.end_date = time[1];
        this.getList();
      },
			// 配置参数
			beforeSearch(params) {
        let s = { ...this.searchParams, ...this.dateTimeParams }
				return {
					page: params ? params.page : null,
					room_number: s.room_number,
					guild_number: s.guild_number,
          operator: s.operator,
          room_type: s.room_type,
          start_date: Math.floor(s.start_date / 1000),
          end_date: Math.floor(s.end_date / 1000),
          is_all: "0",

					status: s.status,
					type: s.type
				}
			},
			// 刷新列表
			getList() {
				this.$refs.tableList.getData()
			},
      // 重置
      reset() {
        this.searchParams = {};
        this.dateTimeParams = {};
        this.changeIndex(1);
        this.getList();
      },
			// 查询
			onSearch() {
				this.getList()
			},
			// 公会房间 - 新增
			add(){
				this.isAdd = true
			},
			// 公会房间 - 新增确定
			async handelAdd(){
				this.$refs.ruleForm.validate(async (valid) => {
					if (valid) {
						let params = { ...this.ruleForm }
						let res = await addGuildRoom(params)
						if(res.code === 2000) {
							this.$message({
								type: 'success',
								message: '新增成功!'
							});
							this.isAdd = false
							this.getList()
						}
					}
				})
			},
			// 公会房间 - 移除
			del(row){
				let title = "确认移除 [ " + row.room_title + " ] 吗？"
				this.$confirm(title, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(async () => {
					let res = await rmGuildRoom({ id: row.id })
					if(res.code === 2000) {
						this.$message({
							type: 'success',
							message: '移除成功!'
						});
						this.getList()
					}
				}).catch(() => {});
			},
      // 获取房间类型
      async getGenreList(){
        const response = await partyRoomTypes({ belong: 2 })
        if(response.code == 2000){
          const tempArr = Array.from(
            Array.isArray(response.data.list) ? response.data.list : []
          )
          this.roomTypeList = tempArr.reduce((prev, curr) => {
            prev.push({
              name: curr.name,
              value: curr.id
            })
            return prev
          }, []) || []

          this.roomTypeList.unshift({
            name: '全部',
            value: ''
          })

        }
      },
      // 清空日期选择
      emptyDateTime() {
        this.dateTimeParams = {
          start_date: null,
          end_date: null,
        };
      },
      // 设置时间段
      setDateTime(arr) {
          const date = arr ? {
              start_date: arr[0],
              end_date: arr[1]
          } : {}
          this.$set(this, 'dateTimeParams', date)
      },

      // 导出excel
      async BatchRurn() {
        let s = this.beforeSearch();
        delete s.page;
        s.is_all = "1";
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        let res = await guildRooms(s);
        try {
          let arr = JSON.parse(JSON.stringify(res.data.list));
            if (arr.length <= 0) return this.$warning("当前没有数据可以导出");
            arr = arr.map((item, index) => {
            let operator = this.operatorList.find(it => { return it.id === item.operator });
            let params = {
              create_time: timeFormat(
                item.create_time,
                "YYYY-MM-DD HH:mm:ss",
                true
              ),
              date: item.date,
              operator: operator ? operator.username : "未知",
              room_number: item.room_number,
              room_type: item.room_type,
              room_title: item.room_title,
              flow: item.flow || "0",
              guild_number: item.guild_number,
              guild_nickname: item.guild_nickname,
              first_join: item.first_join || "0",
              stat_join: item.stat_join || "0",
              times_join: item.times_join || "0",
              stat_consume: item.stat_consume || "0",
              rate: item.rate ? item.rate + "%" : "0%",
              anchor: item.anchor || "0",
              stat_anchor_time: item.stat_anchor_time || "0",
              chat: item.chat || "0",
              times_chat: item.times_chat || "0",
            };
            return params;
          });
          let nameList = [
            "添加时间",
            "时间",
            "公会运营",
            "房间ID",
            "房间类型",
            "房间标题",
            "房间流水",
            "所属公会ID",
            "所属公会名称",
            "新用户进厅",
            "进厅总人数",

            "进厅总人次",
            "消费总人数",
            "消费转化率",
            "成员上麦总人数",

            "成员上麦总时长",
            "成员私聊用户人数",
            "成员私聊用户次数",
          ];
          exportTableData(arr, nameList, "公会房间列表");
          loading.close();
        } catch (error) {
          console.log(error);
          loading.close();
        }
      },
      // 公会运营
      async getAdminUserList(){
          let res = await adminUserList();
          if(res.code === 2000){
            this.operatorList = res.data.list;
            this.isAuth = res.data.is_auth;
            let all = { username: '全部',id: ''}
            this.operatorList.unshift(all);
          }
        }
		}
	}
</script>
<style lang="scss">
.guildApplication-list-box {
	padding: 20px;
	box-sizing: border-box;

	.headerBox {
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid #ccc;
		margin-bottom: 30px;
		.select {
			display: flex;
			align-items: center;
			>span {
				display: flex;
				align-items: center;
				justify-content: center;
				width: auto;
				height: 50px;
				margin-left: 20px;
				cursor: pointer;
				border-bottom: 2px solid rgba(0,0,0,0);
				transform: translateY(1px);
			}
			>span.high {
				border-color: blue;
			}
		}
	}
}
</style>
