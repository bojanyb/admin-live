<template>
  <div class="app-container">
    <div class="searchParams">
      <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" :show-add="true" add-name="新增代充" @onReset="reset" @onSearch="onSearch" @add="handleAdd"></SearchPanel>
    </div>
    <tableList :cfgs="cfgs" ref="tableList"></tableList>

    <!-- 新增代充组件 -->
    <addComp ref="addComp" @handleAddFun="handleAddFun"></addComp>
    <!-- 扣款组件 -->
    <deductComp ref="deductComp" @handleDeductFun="handleDeductFun"></deductComp>
    <!-- 充值组件 -->
    <rechargeComp ref="rechargeComp" @handleRechargeFun="handleRechargeFun"></rechargeComp>
    <!-- 充值金币记录组件 -->
    <reocrdComp ref="reocrdComp" v-if="isDrawer" @handleDeductFun="handleRecordFun"></reocrdComp>
    <!-- 红钻明细组件 -->
    <detailComp ref="detailComp" v-if="isDrawer" @handleDeductFun="handleDetailFun"></detailComp>
  </div>
</template>

<script>
import {
  deleteFun
} from '@/api/substitute'
// 引入api
import { getRoomSave } from '@/api/videoRoom.js'
// 引入菜单组件
import SearchPanel from '@/components/SearchPanel/final.vue'
// 引入列表组件
import tableList from '@/components/tableList/TableList.vue'
// 引入新增代充组件
import addComp from './components/addComp.vue'
// 引入充值组件
import rechargeComp from './components/rechargeComp.vue'
// 引入扣款组件
import deductComp from './components/deductComp.vue'
// 引入充值金币记录组件
import reocrdComp from './components/reocrdComp.vue'
// 引入红钻明细组件
import detailComp from './components/detailComp.vue'
// 引入api
import REQUEST from '@/request/index.js'
// 引入公共方法
import { timeFormat } from '@/utils/common.js'
// 引入公共参数
import mixins from '@/utils/mixins.js'

export default {
  name: 'substitute-list',
  components: {
    SearchPanel,
    tableList,
    addComp,
    deductComp,
    rechargeComp,
    reocrdComp,
    detailComp
  },
  mixins: [mixins],
  data() {
    return {
      loadParams: {},  // 当前数据
      status: null, // 状态
      isDrawer: false
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
            placeholder: '请输入用户ID'
        },
      ]
    },
    cfgs() {
      return {
        vm: this,
        url: REQUEST.substitute.accountlist,
        columns: [
          {
            label: '用户ID',
            prop: 'user_number',
          },
          {
            label: '所属公会',
            prop: 'guild_name',
            render: (h, params) => {
              return h('div', [
                  h('div', params.row.guild_name),
                  h('div', params.row.guild_number),
              ])
            }
          },
          {
            label: '用户昵称',
            prop: 'nickname'
          },
          {
            label: '账户余额',
            prop: 'red_diamond'
          },
          {
            label: '创建时间',
            prop: 'create_time',
            render: (h, params) => {
              return h('span', params.row.create_time ? timeFormat(params.row.create_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
            }
          },
          {
            label: '操作',
            width: '500px',
            render: (h, params) => {
              return h('div', [
                h('el-button', { props: { type: 'danger'}, on: {click:()=>{this.handleDel(params.row)}}},'移除'),
                h('el-button', { props: { type: 'primary'}, on: {click:()=>{this.handleDetail(params.row)}}},'红钻明细'),
                h('el-button', { props: { type: 'primary'}, on: {click:()=>{this.handleRecord(params.row)}}},'代充明细'),
                h('el-button', { props: { type: 'primary'}, on: {click:()=>{this.handleRecharge(params.row)}}},'充值'),
                h('el-button', { props: { type: 'primary'}, on: {click:()=>{this.handleWithhold(params.row)}}},'扣款')
              ])
            }
          }
        ]
      }
    }
  },
  methods: {
    // 重置
    reset() {
      this.searchParams = {}
      this.getList()
    },
    // 查询
    onSearch() {
      this.getList()
    },
    // 配置参数
    beforeSearch(params) {
      let s = { ...this.searchParams };
      return {
        page: params.page,
        pagesize: params.pagesize,
        user_number: s.user_number ? s.user_number: ""
      }
    },
    // 刷新列表
    getList() {
      this.$refs.tableList.getData()
    },
    // 新增
    handleAdd(){
      if(this.$refs.addComp){
        this.$refs.addComp.ruleForm.user_number = "";
        this.$refs.addComp.userInfo = {};
        this.$refs.addComp.dialogVisible = true;
      }
    },
    // 移除
   handleDel(row){
      let title = '是否确定移除 '+ row.nickname +'(' + row.user_number +')?';
      this.$confirm(title, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(async () => {
        let res = deleteFun({id: row.id}).then(res=>{
          if(res.code == 2000){
            this.$message.success("操作成功");
            this.getList();
          }else{
            this.$message.error("操作失败");
          }
        }).catch(() => {});
      }).catch(() => {});
    },
    // 红钻明细
    handleRed(){
      console.log("---红钻明细--");
    },
    // 代充明细
    handleSubstitute(){
      console.log("---代充明细--");
    },
    // 充值
    handleRecharge(row){
      if(this.$refs.rechargeComp){
        this.$refs.rechargeComp.source = row;
        this.$refs.rechargeComp.dialogVisible = true;
        this.$nextTick(res=>{
          this.$refs.rechargeComp.resetForm();
        })
      }
    },
    // 扣款
    handleWithhold(row){
      if(this.$refs.deductComp){
        this.$refs.deductComp.source = row;
        this.$refs.deductComp.dialogVisible = true;
        this.$nextTick(res=>{
          this.$refs.deductComp.resetForm();
        })
      }
    },
    // 新增代充
    handleAddFun(row) {
      if(row.type == "success"){
        this.getList()
      }
    },
    // 代扣回调
    handleDeductFun(row){
      if(row.type == "success"){
        this.getList();
        this.$refs.deductComp.dialogVisible = false;
      }
    },
    // 充值回调
    handleRechargeFun(row){
      if(row.type == "success"){
        this.getList();
        this.$refs.rechargeComp.dialogVisible = false;
      }
    },
    // 红钻明细组件
    handleDetail(row){
      this.isDrawer = true;
      setTimeout(() => {
        this.$refs.detailComp.loadParams(row)
      }, 50);
    },
    // 充值金币记录组件
    handleRecord(row){
      this.isDrawer = true;
      setTimeout(() => {
        this.$refs.reocrdComp.loadParams(row)
      }, 50);
    },
    // 充值金币记录组件回调
    handleRecordFun(){
      this.isDrawer = false;
      if(this.$refs.reocrdComp){
        this.$refs.reocrdComp.drawer = false;
      }
    },
    // 红钻明细组件回调
    handleDetailFun(){
      this.isDrawer = false;
      if(this.$refs.detailComp){
        this.$refs.detailComp.drawer = false;
      }
    },
  }
}
</script>
<style lang="scss">
::v-deep(.detail-box){
    .el-dialog{
        margin-top: 5vh !important;
    }
}
</style>