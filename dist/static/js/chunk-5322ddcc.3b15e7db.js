(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5322ddcc"],{"1fe8":function(t,e,a){t.exports=a.p+"static/img/error.e53687be.png"},"23c3":function(t,e,a){"use strict";a("a1de")},2708:function(t,e,a){"use strict";var s=a("5530"),r=a("2f62"),n={data:function(){return{tabIndex:"0",page:1,size:10,limit:10,searchParams:{},dataParams:{}}},computed:Object(s["a"])({},Object(r["c"])({permissionArr:function(t){return t.permission.permissionArr}})),mounted:function(){console.log(this.permissionArr,"permissionArr")}};e["a"]=n},9979:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"invite-join-us"},[a("div",{staticClass:"searchParams"},[a("SearchPanel",{attrs:{"search-params":t.searchParams,forms:t.forms,"show-search-btn":!0},on:{onSearch:t.onSearch}})],1),a("el-col",{staticClass:"toolbar",staticStyle:{"padding-bottom":"0px"},attrs:{span:24}},[a("el-card",{staticClass:"sumBox"},[a("div",{staticClass:"sumBoxItem fl"},[t._v("活动参与人数："+t._s(t.activity.count))]),a("div",{staticClass:"sumBoxItem fl"},[t._v("活动投入："+t._s(t.activity.baoxiang_in))]),a("div",{staticClass:"sumBoxItem fl"},[t._v("活动产出："+t._s(t.activity.baoxiang_out))]),a("div",{staticClass:"sumBoxItem fl"},[t._v("活动投入产出比："+t._s(t.activity.output_proportion))])])],1),a("div",{staticClass:"tableList"},[a("tableList",{ref:"tableList",attrs:{cfgs:t.cfgs},on:{saleAmunt:t.saleAmunt}})],1)],1)},r=[],n=(a("498a"),a("4053")),i=a("04a2"),o=a("8daa"),c=a("2708"),u={mixins:[c["a"]],data:function(){return{activity:{count:0,baoxiang_in:0,baoxiang_out:0,output_proportion:0}}},components:{tableList:n["a"],SearchPanel:i["a"]},computed:{forms:function(){var t=this;return[{name:"user_number",type:"input",isNum:!0,value:"",label:"用户ID",placeholder:"",handler:{enter:function(e){t.searchParams.user_number=e.user_number.trim(),t.$refs.tableList.getData()}}},{name:"dateTimeParams",type:"datePicker",dateType:"daterange",format:"yyyy-MM-dd",label:"时间选择",value:"",handler:{change:function(e){t.searchParams.start_time=e?e[0]/1e3:"",t.searchParams.end_time=e?e[1]/1e3:"",t.$refs.tableList.getData()},selectChange:function(t,e){}}}]},cfgs:function(){return{vm:this,url:o["a"].platformActivity.drawRecord,method:"post",isShowIndex:!0,columns:[{label:"用户ID",props:"user_number",render:function(t,e){return t("span",e.row.user_number)}},{label:"参与次数",props:"user_open_count",render:function(t,e){return t("span",e.row.user_open_count)}},{label:"投入",props:"user_out",render:function(t,e){return t("span",e.row.user_out)}},{label:"产出",props:"user_in",render:function(t,e){return t("span",e.row.user_in)}}]}}},methods:{beforeSearch:function(t){return{size:t.size,page:t.page,code:"mmly",user_number:this.searchParams.user_number,start_time:this.searchParams.start_time,end_time:this.searchParams.end_time}},onSearch:function(t){this.searchParams.user_number=t.user_number,this.searchParams.start_time=t.dateTimeParams?t.dateTimeParams[0]/1e3:"",this.searchParams.end_time=t.dateTimeParams?t.dateTimeParams[1]/1e3:"",this.$refs.tableList.getData()},saleAmunt:function(t){t.activity.count=t.count,this.activity=t.activity}}},m=u,l=(a("23c3"),a("2877")),d=Object(l["a"])(m,s,r,!1,null,null,null);e["default"]=d.exports},a1de:function(t,e,a){}}]);