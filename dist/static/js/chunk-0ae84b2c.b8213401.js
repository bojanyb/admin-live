(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0ae84b2c"],{"04bf":function(t,e,a){},"1fe8":function(t,e,a){t.exports=a.p+"static/img/error.e53687be.png"},2708:function(t,e,a){"use strict";var i=a("5530"),s=a("2f62"),r={data:function(){return{tabIndex:"0",page:1,size:10,limit:10,searchParams:{},dataParams:{}}},computed:Object(i["a"])({},Object(s["c"])({permissionArr:function(t){return t.permission.permissionArr}})),mounted:function(){console.log(this.permissionArr,"permissionArr")}};e["a"]=r},aa7f:function(t,e,a){"use strict";a("04bf")},c1e4:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"zzbxActivity-history"},[a("div",{staticClass:"searchParams"},[a("SearchPanel",{attrs:{forms:t.forms,"show-reset":!0,"show-search-btn":!0},on:{onReset:t.reset,onSearch:t.onSearch},model:{value:t.searchParams,callback:function(e){t.searchParams=e},expression:"searchParams"}})],1),a("div",{staticClass:"historyBx"},[a("el-col",{staticClass:"toolbar",staticStyle:{"padding-bottom":"0px"},attrs:{span:24}},[a("el-card",{staticClass:"sumBox"},[a("div",{staticClass:"sumBoxItem fl"},[t._v("活动开箱次数："+t._s(t.ruleForm.baoxiang_open_count))]),a("div",{staticClass:"sumBoxItem fl"},[t._v("活动投入："+t._s(t.ruleForm.baoxiang_in))]),a("div",{staticClass:"sumBoxItem fl"},[t._v("活动产出："+t._s(t.ruleForm.baoxiang_out))]),a("div",{staticClass:"sumBoxItem fl"},[t._v("活动投入产出比："+t._s(t.ruleForm.output_proportion))])])],1)],1),a("div",{staticClass:"tableList"},[a("tableList",{ref:"tableList",attrs:{cfgs:t.cfgs},on:{saleAmunt:t.saleAmunt}})],1)])},s=[],r=a("5530"),n=a("c7eb"),c=a("1da1"),o=(a("e9c4"),a("b0c0"),a("7db0"),a("d3b7"),a("1a72")),u=a("4053"),l=a("04a2"),m=a("2708"),p=a("8daa"),d={components:{tableList:u["a"],SearchPanel:l["a"]},mixins:[m["a"]],computed:{forms:function(){var t=this;return[{name:"user_number",type:"input",value:"",label:"用户ID",isNum:!0,placeholder:"请输入用户ID"},{name:"activity_type_id",type:"select",value:1,keyName:"id",optionLabel:"name",label:"活动类型",placeholder:"请选择",options:this.activityList},{name:"dateTimeParams",type:"datePicker",dateType:"daterange",format:"yyyy-MM-dd",label:"时间选择",value:"",handler:{change:function(e){t.emptyDateTime(),t.setDateTime(e),t.getList()},selectChange:function(e,a){t.emptyDateTime(),t.getList()}}}]},cfgs:function(){var t=this;return{vm:this,url:p["a"].userActivity.zzbxActivity.history,isShowIndex:!0,columns:[{label:"用户ID",prop:"user_number"},{label:"用户昵称",prop:"nickname"},{label:"活动类型",render:function(e,a){var i="";return i="{}"===JSON.stringify(t.searchParams)?t.activityList[0].name:t.activityList.find((function(e){return e.id===t.searchParams.activity_type_id})).name,e("span",i)}},{label:"活动类别",render:function(t,e){return t("span","背包")}},{label:"开箱次数",prop:"user_open_count"},{label:"幸运礼物",prop:"big_gift_count"},{label:"投入",prop:"user_out"},{label:"产出",prop:"user_in"}]}}},data:function(){return{ruleForm:{},activityList:[]}},methods:{getActivityList:function(){var t=this;return Object(c["a"])(Object(n["a"])().mark((function e(){var a;return Object(n["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(o["F"])();case 2:a=e.sent,t.activityList=a.data.list;case 4:case"end":return e.stop()}}),e)})))()},getList:function(){this.$refs.tableList.getData()},beforeSearch:function(t){var e=Object(r["a"])(Object(r["a"])({},this.searchParams),this.dateTimeParams);return{page:t.page,pagesize:t.size,user_number:e.user_number,start_time:Math.floor(e.start_time/1e3),end_time:Math.floor(e.end_time/1e3),activity_type:1,activity_type_id:e.activity_type_id?e.activity_type_id:1}},setDateTime:function(t){var e=t?{start_time:t[0],end_time:t[1]}:{};this.$set(this,"dateTimeParams",e)},emptyDateTime:function(){this.dateTimeParams={}},saleAmunt:function(t){this.ruleForm=t.baoxiang},reset:function(){this.searchParams={},this.dateTimeParams={activity_type_id:1},this.getList()},onSearch:function(){this.getList()}},created:function(){this.getActivityList()}},f=d,b=(a("aa7f"),a("2877")),h=Object(b["a"])(f,i,s,!1,null,null,null);e["default"]=h.exports}}]);