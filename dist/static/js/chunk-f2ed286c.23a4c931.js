(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f2ed286c"],{"1fe8":function(e,t,a){e.exports=a.p+"static/img/error.e53687be.png"},2708:function(e,t,a){"use strict";var s=a("4672"),r=a("52c1"),n={data:function(){return{tabIndex:"0",page:1,size:10,limit:10,searchParams:{},dataParams:{}}},computed:Object(s["a"])({},Object(r["c"])({permissionArr:function(e){return e.permission.permissionArr}})),mounted:function(){console.log(this.permissionArr,"permissionArr")}};t["a"]=n},4122:function(e,t,a){},"469b":function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"banner-box"},[a("div",{staticClass:"searchParams"},[a("SearchPanel",{attrs:{forms:e.forms,"show-reset":!0,"show-search-btn":!0},on:{onReset:e.reset,onSearch:e.onSearch},model:{value:e.searchParams,callback:function(t){e.searchParams=t},expression:"searchParams"}})],1),"0"===e.tabIndex?a("el-card",{staticClass:"box-card",attrs:{shadow:"always"}},[a("div",{staticClass:"box-card-inner"},[a("div",[e._v("抽奖人数："+e._s(e.sumSource.user_count||0)+"人")]),a("div",[e._v("抽奖次数："+e._s(e.sumSource.draw_count||0)+"次")]),a("div",[e._v("总消耗拼图数量："+e._s(e.sumSource.consume_count||0)+"个")])])]):e._e(),a("div",{staticClass:"tableList"},[a("tableList",{ref:"tableList",attrs:{cfgs:e.cfgs},on:{saleAmunt:e.saleAmunt}})],1)],1)},r=[],n=a("4672"),i=a("4053"),o=a("04a2"),c=a("2708"),u=a("8daa"),m=a("cf45"),l={components:{tableList:i["a"],SearchPanel:o["a"]},mixins:[c["a"]],computed:{forms:function(){var e=this;return[{name:"user_number",type:"input",value:"",label:"用户ID",isNum:!0,placeholder:"请输入用户ID"},{name:"prize_name",type:"input",value:"",label:"奖品名称",placeholder:"请输入奖品名称"},{name:"dateTimeParams",type:"datePicker",dateType:"datetimerange",format:"yyyy-MM-dd HH:mm:ss",label:"时间选择",value:"",linkage:!0,handler:{change:function(t){e.emptyDateTime(),e.setDateTime(t)},selectChange:function(t,a){e.emptyDateTime()}}}]},cfgs:function(){return{vm:this,url:u["a"].activity.puzzleDrawLog,columns:[{label:"抽奖时间",render:function(e,t){return e("span",t.row.create_time?Object(m["h"])(t.row.create_time,"YYYY/MM/DD HH:mm:ss",!0):"--")}},{label:"抽奖人ID",prop:"user_number"},{label:"抽奖人昵称",prop:"nickname"},{label:"奖品名称",prop:"remark"},{label:"奖品ID",prop:"goods_id"}]}}},data:function(){return{sumSource:{user_count:0,draw_count:0,consume_count:0},ruleForm:{alreadyMoney:null,deductMoney:null},msg_id:""}},methods:{getList:function(){this.$refs.tableList.getData()},beforeSearch:function(e){var t=Object(n["a"])(Object(n["a"])({},this.searchParams),this.dateTimeParams);return{page:e?e.page:null,pagesize:10,start_time:t.start_time?Math.floor(t.start_time/1e3):t.start_time,end_time:t.end_time?Math.floor(t.end_time/1e3):t.end_time,user_number:t.user_number,prize_name:t.prize_name}},setDateTime:function(e){var t=e?{start_time:e[0],end_time:e[1]}:{};this.$set(this,"dateTimeParams",t)},emptyDateTime:function(){this.dateTimeParams={}},reset:function(){this.searchParams={},this.getList()},onSearch:function(){this.getList()},saleAmunt:function(e){this.sumSource=e.data},load:function(e,t){var a=this;setTimeout((function(){a.$refs.add.dialogVisible=!0,a.$refs.add.load(e,t)}),100)}}},d=l,p=(a("e760"),a("e607")),f=Object(p["a"])(d,s,r,!1,null,null,null);t["default"]=f.exports},e760:function(e,t,a){"use strict";a("4122")}}]);