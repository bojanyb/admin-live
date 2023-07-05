<!-- 实名列表 -->
<template>
  <div class="app-container">
    <div class="searchParams">
      <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset" @onSearch="onSearch"></SearchPanel>
    </div>

		<tableList :cfgs="cfgs" ref="tableList"></tableList>

    <!-- 实名详情组件 -->
    <verifiedComp ref="verifiedComp"></verifiedComp>

    <!-- aidoo 驳回说明 -->
    <el-dialog class="rejectPop"
        :visible.sync="dialogVisible"
        width="600px"
        @closed="closed"
        :before-close="handleClose"
        :show-close="false">
            <el-form :model="ruleForm" ref="ruleForm" label-width="95px" class="demo-ruleForm">
                <el-form-item label="用户信息:">{{ruleForm.name}} （ ID: {{ruleForm.user_id}}）</el-form-item>
                <el-form-item label="驳回说明:" prop="remark">
                    <el-input type="textarea" maxlength="15" v-model="ruleForm.remark" placeholder="请输入驳回理由"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm">确 定</el-button>
            </span>
        </el-dialog>
  </div>
</template>

<script>
// 引入api
import { check } from '@/api/user.js'
// 引入实名详情组件
import verifiedComp from './components/verifiedComp.vue'
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
  name: 'VerifiedList',
  components: {
    SearchPanel,
    tableList,
    verifiedComp
  },
  mixins: [mixins],
  data() {
    return {
      searchParams: {
        status: ''
      },
      dialogVisible: false,
      ruleForm: {
        id: "",
        user_id: "",
        name: "",
        remark: ""
      },
      node_env : process.env.NODE_ENV,
      statusList : []
    }
  },
  computed: {
    forms() {
      return [
        {
          name: 'user_number',
          type: 'input',
          value: '',
          label: '用户ID',
          isNum: true,
          placeholder: '请输入用户ID'
        },
        {
          name: 'status',
          type: 'select',
          value: '',
          keyName: 'value',
          optionLabel: 'name',
          label: '状态',
          placeholder: '请选择',
          options: this.statusList
        },
        // {
        //   name: 'user_phone',
        //   type: 'input',
        //   value: '',
        //   label: '手机号',
        //   isNum: true,
        //   placeholder: '请输入手机号'
        // },
        // {
        //   name: 'name',
        //   type: 'input',
        //   value: '',
        //   label: '姓名',
        //   placeholder: '请输入姓名'
        // },
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
            },
            selectChange: (v, key) => {
              this.emptyDateTime()
            }
          }
        }
      ]
    },
    cfgs() {
      let columnsList= [];
      let arr1 = [
        {
            label: '时间',
            render: (h, params) => {
              return h('span', params.row.create_time ? timeFormat(params.row.create_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
            }
          },
          {
            label: '用户ID',
            prop: 'user_id'
          },
          {
            label: '昵称',
            showOverFlow: true,
            render: (h, params) => {
              return h('span', params.row.nickname || '无')
            }
          },
          {
            label: '真实姓名',
            prop: 'name',
            render: (h, params) => {
              return h('span', params.row.name || '无')
            }
          },
          {
            label: '身份证号',
            prop: 'id_card',
            render: (h, params) => {
              let data = params.row.id_card
              return h('span', data || '无')
            }
          },
      ]
      let arr2 = [
        {
          label: '证件照正面',
          isimg: true,
          prop: 'id_card_front',
          imgWidth: '50px',
          imgHeight: '50px'
        },
        {
          label: '证件照反面',
          isimg: true,
          prop: 'id_card_back',
          imgWidth: '50px',
          imgHeight: '50px'
        },
        {
          label: '手持身份证照',
          isimg: true,
          prop: 'user_photo',
          imgWidth: '50px',
          imgHeight: '50px'
        },
        {
          label: '地区',
          prop: 'area',
          render: (h, params) => {
              return h('span', params.row.area || '--')
          }
        },
      ];
      let arr3 = [
          {
            label: '实名次数',
            render: (h, params) => {
              let name;
              if(params.row.change_count === 0) {
                name = '第1次实名'
              } else {
                name = `第${params.row.change_count + 1}次实名`
              }
              return h('span', name)
            }
          },
          {
            label: '状态',
            render: (h, params) => {
              let data = this.statusList.find(item => { return item.value == params.row.status })
              return h('span', data ? data.name : '无')
            }
          },
          {
            label: '操作',
            minWidth: '120px',
            render: (h, params) => {
              return h('div', [
                h('el-button', { props: { type: 'success'}, style: {
                  display: (params.row.status === 'C' || params.row.status === 2) ? 'unset' : 'none'
                }, on: {click:()=>{this.funcClick(params.row)}}}, '审核通过'),
                h('el-button', { props: { type: 'danger'}, style: {
                  display: (params.row.status === 'C' || params.row.status === 2) ? 'unset' : 'none'
                }, on: {click:()=>{this.manageClick(params.row)}}}, '驳回'),
                h('span', { style: {
                  display: (params.row.status === 'Y' ||  params.row.status === 1) ? 'unset' : 'none'
                }, on: {click:()=>{}}}, '- -'),
                h('span', { style: {
                  display: (params.row.status === 'R' ||  params.row.status === 3) ? 'unset' : 'none'
                }, on: {click:()=>{}}}, '- -'),
              ])
            }
          }
      ];
      if(this.node_env.indexOf("aidoo") > -1){
        columnsList = arr1.concat(arr2).concat(arr3);
      }else{
        columnsList = arr1.concat(arr3);
      }
      return {
        vm: this,
        url: REQUEST.user.autonymlist,
        columns: columnsList
      }
    }
  },
  mounted(){
    let statusList = [];
    if(this.node_env.indexOf("aidoo") > -1){
      statusList = MAPDATA.USERMANAGEMENTAUTONYMSTATUSLIST2;
    }else{
      statusList = MAPDATA.USERMANAGEMENTAUTONYMSTATUSLIST;
    }
    this.$set(this,"statusList",statusList);
  },
  methods: {
    // 名称脱敏
    nameDesensitize(val) {
      if(val) {
        let name = ''
        let arr = val.split('')
        arr.forEach((item,index) => {
          if(index < arr.length - 1) {
              name += '*'
          }
        })
        return val.substring(0, 1) + name
      }
      return '无'
    },
    // 配置参数
    beforeSearch(params) {
      let s = { ...this.searchParams, ...this.dateTimeParams }
      return {
        page: params.page,
        pagesize: params.size,
        user_number: s.user_number,
        // user_phone: s.user_phone,
        // name: s.name
        start_time: s.start_time ? Math.floor(s.start_time / 1000) : '',
        end_time: s.end_time ? Math.floor(s.end_time / 1000) : '',
        status: s.status
      }
    },
    // 刷新列表
    getList() {
      this.$refs.tableList.getData()
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
      this.searchParams = {
        status: ''
      }
      this.dateTimeParams = {}
      this.getList()
    },
    // 查询
    onSearch() {
      this.getList()
    },
    // 审核通过
    funcClick(id) {
      if(this.node_env.indexOf("aidoo") > -1){
        this.func('1', id)
      }else{
        this.func('Y', id)
      }
    },
    // 驳回
    manageClick(row) {
      if(this.node_env.indexOf("aidoo") > -1){
        this.ruleForm.uid = row.uid;
        this.ruleForm.user_id = row.user_id;
        this.ruleForm.name = row.name;
        this.ruleForm.remark = "";
        this.dialogVisible = true;
      }else{
        this.func('R', row)
      }
    },
    // 操作
    async func(status, row) {
      let params = {}
      if(this.node_env.indexOf("aidoo") > -1){
        params = {
          uid : row.uid,
          status: status
        }
        if(row.remark){
          params.remark = row.remark
        }
      }else{
        params = {
          uid : row.uid,
          status: status,
        }
      }
      let res = await check(params)
      if(res.code === 2000) {
        this.$success('操作成功');
        this.getList();
        this.dialogVisible = false;
      }
    },
    // 关闭弹窗
    handleClose() {
        this.dialogVisible = false
    },
    // 提交
    submitForm() {
      this.func('3', this.ruleForm)
    },
    // 关闭
    closed(){
      this.ruleForm = {
        id: "",
        user_id: "",
        name: "",
        remark: ""
      }
    },
  }
}
</script>
