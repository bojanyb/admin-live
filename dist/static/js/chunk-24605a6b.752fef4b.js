(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-55ef7781"],{"1fe8":function(e,t,a){e.exports=a.p+"static/img/error.e53687be.png"},2708:function(e,t,a){"use strict";var i=a("5530"),r=a("2f62"),s={data:function(){return{tabIndex:"0",page:1,size:10,limit:10,searchParams:{},dataParams:{}}},computed:Object(i["a"])({},Object(r["c"])({permissionArr:function(e){return e.permission.permissionArr}})),mounted:function(){console.log(this.permissionArr,"permissionArr")}};t["a"]=s},"5b9c":function(e,t,a){},c81e:function(e,t,a){"use strict";a("5b9c")},e03e:function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"zzbxActivity-history"},[a("div",{staticClass:"searchParams"},[a("SearchPanel",{attrs:{forms:e.forms,"show-reset":!0,"show-search-btn":!0},on:{onReset:e.reset,onSearch:e.onSearch},model:{value:e.searchParams,callback:function(t){e.searchParams=t},expression:"searchParams"}})],1),a("div",{staticClass:"tableList"},[a("tableList",{ref:"tableList",attrs:{cfgs:e.cfgs}})],1)])},r=[],s=a("5530"),n=a("c7eb"),c=a("1da1"),o=a("1a72"),l=a("4053"),m=a("04a2"),u=a("2708"),p=a("8daa"),d=a("cf45"),h={components:{tableList:l["a"],SearchPanel:m["a"]},mixins:[u["a"]],computed:{forms:function(){var e=this;return[{name:"activity_type_id",type:"select",value:1,keyName:"id",optionLabel:"name",label:"活动类型",placeholder:"请选择",options:this.activityList},{name:"user_number",type:"input",value:"",label:"用户ID",isNum:!0,placeholder:"请输入用户ID"},{name:"relation_trade_no",type:"input",value:"",label:"交易流水ID",isNum:!0,placeholder:"请输入交易流水ID"},{name:"dateTimeParams",type:"datePicker",dateType:"daterange",format:"yyyy-MM-dd",label:"时间选择",value:"",handler:{change:function(t){e.emptyDateTime(),e.setDateTime(t),e.getList()},selectChange:function(t,a){e.emptyDateTime(),e.getList()}}}]},cfgs:function(){return{vm:this,url:p["a"].userActivity.zzbxActivity.detail,columns:[{label:"抽奖人ID",prop:"user_number"},{label:"抽奖人昵称",prop:"nickname"},{label:"宝箱类型",prop:"activity_name"},{label:"交易时间",minWidth:"140px",render:function(e,t){return e("span",t.row.create_time?Object(d["h"])(t.row.create_time,"YYYY-MM-DD HH:mm:ss",!0):"无")}},{label:"交易类型",render:function(e,t){return e("span",1===t.row.type?"背包":"派对")}},{label:"礼物ID",prop:"gift_id"},{label:"礼物名称",prop:"gift_name"},{label:"礼物数量",prop:"number"},{label:"礼物价值",prop:"gift_diamond"},{label:"交易流水",prop:"relation_trade_no",minWidth:"160px"}]}}},data:function(){return{ruleForm:{},activityList:[]}},methods:{getActivityList:function(){var e=this;return Object(c["a"])(Object(n["a"])().mark((function t(){var a;return Object(n["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(o["F"])();case 2:a=t.sent,e.activityList=a.data.list;case 4:case"end":return t.stop()}}),t)})))()},getList:function(){this.$refs.tableList.getData()},beforeSearch:function(e){var t=Object(s["a"])(Object(s["a"])({},this.searchParams),this.dateTimeParams);return{page:e.page,pagesize:e.size,user_number:t.user_number,start_time:Math.floor(t.start_time/1e3),end_time:Math.floor(t.end_time/1e3),activity_type:2,activity_type_id:t.activity_type_id?t.activity_type_id:1}},setDateTime:function(e){var t=e?{start_time:e[0],end_time:e[1]}:{};this.$set(this,"dateTimeParams",t)},emptyDateTime:function(){this.dateTimeParams={}},reset:function(){this.searchParams={},this.dateTimeParams={activity_type_id:1},this.getList()},onSearch:function(){this.getList()}},created:function(){this.getActivityList()}},f=h,b=(a("c81e"),a("2877")),y=Object(b["a"])(f,i,r,!1,null,null,null);t["default"]=y.exports}}]);