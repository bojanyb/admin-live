(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3b7a8902"],{"1fe8":function(e,t,a){e.exports=a.p+"static/img/error.e53687be.png"},2708:function(e,t,a){"use strict";var n=a("5530"),i=a("2f62"),r={data:function(){return{tabIndex:"0",page:1,size:10,limit:10,searchParams:{},dataParams:{}}},computed:Object(n["a"])({},Object(i["c"])({permissionArr:function(e){return e.permission.permissionArr}})),mounted:function(){console.log(this.permissionArr,"permissionArr")}};t["a"]=r},8149:function(e,t,a){"use strict";a("fffe")},"9f7ab":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container userTurnover-list-box"},[a("div",{staticClass:"model"},[a("span",[e._v("收礼人数："+e._s(e.ruleForm.user_count||0)+"人")]),a("span",[e._v("房间数量："+e._s(e.ruleForm.room_count||0)+"个")]),a("span",[e._v("公会数量："+e._s(e.ruleForm.guild_count||0)+"个")]),a("span",[e._v("选择时间内总金额："+e._s(e.ruleForm.total_amount||0)+"喵粮")])]),a("div",{staticClass:"searchParams"},[a("SearchPanel",{attrs:{forms:e.forms,"show-reset":!0,"show-search-btn":!0,"show-batch-rurn":!0,batchRurnName:"导出EXCEL","show-batch-pass":!0,batchFuncName:"文件查询"},on:{onReset:e.reset,onSearch:e.onSearch,BatchRurn:e.batchRurnFileName,batchPass:e.batchFileSearch},model:{value:e.searchParams,callback:function(t){e.searchParams=t},expression:"searchParams"}})],1),a("tableList",{ref:"tableList",attrs:{cfgs:e.cfgs},on:{saleAmunt:e.saleAmunt}}),a("el-dialog",{staticClass:"downFilePop",attrs:{title:"导出文件名称",width:"50%",visible:e.batchFileNameVisible},on:{"update:visible":function(t){e.batchFileNameVisible=t}}},[a("div",[e._v(' 由于导出数据量较大，现采取异步导出的方案进行，导出文件需要一段时间进行，请稍后自行点击 "文件查询" 下载。 ')]),a("el-form",[a("div",{staticClass:"inputBox"},[a("el-form-item",{staticClass:"numberBox",attrs:{label:"请输入本次文件名称：",prop:"file_name"}},[a("el-input",{attrs:{placeholder:"请输入本次文件名称"},model:{value:e.file_name,callback:function(t){e.file_name=t},expression:"file_name"}})],1)],1)]),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:e.BatchRurn}},[e._v("确 定")])],1)],1),a("el-dialog",{staticClass:"downFileSearchPop",attrs:{title:"文件查询",width:"50%",visible:e.batchFileVisible},on:{"update:visible":function(t){e.batchFileVisible=t}}},[a("tableList",{ref:"tableList2",attrs:{cfgs:e.cfgs1}})],1)],1)},i=[],r=a("c7eb"),s=a("1da1"),o=a("5530"),l=(a("7db0"),a("d3b7"),a("b0c0"),a("ac1f"),a("5319"),a("b64b"),a("e9c4"),a("d81d"),a("1a72")),c=a("4053"),u=a("04a2"),m=a("2708"),d=a("8daa"),f=a("cf45"),p=a("279a"),b={name:"userTurnover-list",components:{tableList:c["a"],SearchPanel:u["a"]},mixins:[m["a"]],computed:{forms:function(){var e=this;return[{name:"guild_number",type:"input",value:"",label:"公会ID",isNum:!0,placeholder:"请输入公会ID"},{name:"room_number",type:"input",value:"",label:"房间ID",isNum:!0,placeholder:"请输入房间ID"},{name:"user_number",type:"input",value:"",label:"收礼人ID",isNum:!0,placeholder:"请输入收礼人ID"},{name:"source",type:"select",value:0,keyName:"value",optionLabel:"name",label:"流水类型",placeholder:"请选择",options:p["a"].DEALSOURCETYPELIST},{name:"flow_type",type:"select",value:0,keyName:"id",optionLabel:"name",label:"房间来源",placeholder:"请选择",options:p["a"].DEALSOURCELIST},{name:"guild_type",type:"select",value:0,keyName:"id",optionLabel:"name",label:"房间类型",placeholder:"请选择",options:this.roomTypeList},{name:"dateTimeParams",type:"datePicker",dateType:"datetimerange",format:"yyyy-MM-dd HH:mm:ss",label:"时间选择",value:"",handler:{change:function(t){e.emptyDateTime(),e.setDateTime(t)},selectChange:function(t,a){e.emptyDateTime()}}}]},cfgs:function(){var e=this;return{vm:this,url:d["a"].deal.userFlow1,search:{sizes:[10,30,50,100,300,500]},columns:[{label:"时间",minWidth:"130px",render:function(e,t){return e("span",t.row.create_time?Object(f["h"])(t.row.create_time,"YYYY-MM-DD HH:mm:ss",!0):"无")}},{label:"交易流水号",minWidth:"150px",prop:"relation_trade_no"},{label:"收礼ID",prop:"live_user_number"},{label:"房间ID",render:function(e,t){return e("span",t.row.room_number||"无")}},{label:"公会ID",render:function(e,t){return e("span",t.row.guild_number||"无")}},{label:"流水类型",render:function(e,t){var a=p["a"].DEALSOURCETYPELIST.find((function(e){return e.value===t.row.source}));return e("span",a?a.name:"无")}},{label:"房间来源",render:function(e,t){var a=p["a"].DEALSOURCELIST.find((function(e){return e.id===t.row.flow_type}));return e("span",a?a.name:"无")}},{label:"房间类型",prop:"amount",render:function(t,a){var n=e.roomTypeList.find((function(e){return e.id===a.row.guild_type})),i="";return i=0==n.id?"无":n.name,t("span",i||"无")}},{label:"金额",prop:"amount"},{label:"收礼人IP",minWidth:"80px",render:function(e,t){return e("span",t.row.receive_ip?t.row.receive_ip:"无")}}]}},cfgs1:function(){var e=this;return{vm:this,url:d["a"].diamondRecharge.exportTask,columns:[{label:"文件名称",render:function(e,t){return e("span",t.row.file_name||"无")}},{label:"状态",render:function(t,a){var n=e.fileStateList.find((function(e){return e.state==a.row.export_status}));return t("span",n.name||"无")}},{label:"下载",fixed:"right",render:function(t,a){return t("div",[t("el-button",{props:{type:"primary"},style:{display:""!==a.row.export_url?"unset":"none"},on:{click:function(){e.downFile(a.row)}}},"下载")])}}]}}},data:function(){return{ruleForm:{},searchParams:{dateTimeParams:[],flow_type:0},dateTimeParams:{start_time:null,end_time:null},roomTypeList:[{id:0,name:"全部"},{id:1,name:"直播房间"},{id:2,name:"派对房间"}],batchFileNameVisible:!1,file_name:"",batchFileVisible:!1,fileStateList:[{id:1,state:0,name:"待导出"},{id:2,state:1,name:"导出中"},{id:3,state:2,name:"导出成功"},{id:4,state:3,name:"导出失败"}]}},methods:{getList:function(){this.getUserFlow1Count(),this.$refs.tableList.getData()},beforeSearch:function(e){if(1==this.batchFileVisible){var t={page:e?e.page:1,pagesize:e?e.size:10,export_type:2};return t}var a=Object(o["a"])(Object(o["a"])({},this.searchParams),this.dateTimeParams);return{page:e?e.page:1,pagesize:e?e.size:10,guild_number:a.guild_number,room_number:a.room_number,user_number:a.user_number,start_time:a.start_time?Math.floor(a.start_time/1e3):"",end_time:a.end_time?Math.floor(a.end_time/1e3):"",flow_type:a.flow_type,guild_type:a.guild_type,source:a.source}},reset:function(){this.changeIndex(0),this.searchParams={flow_type:0},this.dateTimeParams={},this.getList()},onSearch:function(){this.getList()},setDateTime:function(e){var t=e?{start_time:e[0],end_time:e[1]}:{};this.$set(this,"dateTimeParams",t)},emptyDateTime:function(){this.dateTimeParams={}},saleAmunt:function(e){},changeIndex:function(e){var t,a,n,i,r=new Date;switch(e){case 0:a=Object(f["h"])(r,"YYYY-MM-DD",!1),t=Object(f["h"])(r,"YYYY-MM-DD",!1);break;case 1:a=Object(f["h"])(r-864e5,"YYYY-MM-DD",!1),t=Object(f["h"])(r-864e5,"YYYY-MM-DD",!1);break;case 2:a=Object(f["h"])(r,"YYYY-MM-DD",!1),t=Object(f["h"])(r-5184e5,"YYYY-MM-DD",!1);break}n=new Date(t+" 00:00:00"),i=0==e?new Date(Object(f["h"])(r,"YYYY-MM-DD HH:mm:ss",!1)):new Date(a+" 23:59:59");var s=[n.getTime(),i.getTime()];this.searchParams.dateTimeParams=s,this.dateTimeParams.start_time=s[0],this.dateTimeParams.end_time=s[1]},batchRurnFileName:function(){this.batchFileNameVisible=!0},fileNameInput:function(){this.file_name=this.file_name.replace(/[/\\]*/g,"")},batchFileSearch:function(){this.batchFileVisible=!0,this.$refs.tableList2&&this.$refs.tableList2.getData()},downFile:function(e){window.location.href=e.export_url},BatchRurn:function(){var e=this;if(""!=this.file_name){var t=this.beforeSearch();delete t.page,t.file_name=this.file_name;var a=this.$loading({lock:!0,text:"Loading",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)"});Object(l["nb"])(t).then((function(t){var n=JSON.parse(JSON.stringify(t.data.list));if(n.length<=0)return e.$warning("当前没有数据可以导出");n=n.map((function(t){var a=p["a"].DEALSOURCETYPELIST.find((function(e){return e.value===t.source})),n=p["a"].DEALSOURCELIST.find((function(e){return e.id===t.flow_type})),i=e.roomTypeList.find((function(e){return e.id===t.guild_type})),r={create_time:Object(f["h"])(t.create_time,"YYYY-MM-DD HH:mm:ss",!0)+";",relation_trade_no:JSON.stringify(t.relation_trade_no),live_user_number:t.live_user_number,room_number:t.room_number,guild_number:t.guild_number,source:a.name?a.name:"无",flow_type:n.name?n.name:"无",guild_type:i.name?i.name:"无",amount:t.amount,receive_ip:t.receive_ip};return r}));var i=["时间","交易流水号","收礼ID","房间ID","公会ID","流水类型","房间来源","房间类型","金额","收礼人IP"];Object(f["b"])(n,i,e.file_name),a.close(),e.file_name=""})).catch((function(t){a.close(),e.file_name=""})),this.batchFileNameVisible=!1}else this.$message.warning("请先输入有效的文件名")},getUserFlow1Count:function(){var e=this;return Object(s["a"])(Object(r["a"])().mark((function t(){var a,n;return Object(r["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a=e.beforeSearch(),t.next=3,Object(l["nc"])(a);case 3:n=t.sent,2e3==n.code&&(e.ruleForm=n.data);case 5:case"end":return t.stop()}}),t)})))()}},created:function(){this.changeIndex(0),this.getUserFlow1Count()}},h=b,_=(a("8149"),a("2877")),g=Object(_["a"])(h,n,i,!1,null,null,null);t["default"]=g.exports},fffe:function(e,t,a){}}]);