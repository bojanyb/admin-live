(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1b775912"],{"1fe8":function(e,t,s){e.exports=s.p+"static/img/error.e53687be.png"},2457:function(e,t,s){"use strict";s("62b9")},2708:function(e,t,s){"use strict";var r=s("5530"),a=s("2f62"),i={data:function(){return{tabIndex:"0",page:1,size:10,limit:10,searchParams:{},dataParams:{}}},computed:Object(r["a"])({},Object(a["c"])({permissionArr:function(e){return e.permission.permissionArr}})),mounted:function(){console.log(this.permissionArr,"permissionArr")}};t["a"]=i},"62b9":function(e,t,s){},"885f":function(e,t,s){"use strict";s.r(t);var r=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"app-container"},[s("div",{staticClass:"searchParams"},[s("SearchPanel",{attrs:{forms:e.forms,"show-reset":!0,"show-search-btn":!0,"show-export":!0,"show-query":!0,customType:"danger",queryName:"文件查询"},on:{onReset:e.reset,onSearch:e.onSearch,export:e.handleExport,query:e.handleQuery},model:{value:e.searchParams,callback:function(t){e.searchParams=t},expression:"searchParams"}})],1),s("tableList",{ref:"tableList",attrs:{cfgs:e.cfgs}}),e.isDestoryComp?s("excelDownloadComp",{ref:"excelDownloadComp",on:{destoryComp:e.destoryComp}}):e._e(),e.isDestoryComp?s("excelQueryComp",{ref:"excelQueryComp",on:{destoryComp:e.destoryComp}}):e._e()],1)},a=[],i=s("5530"),o=(s("7db0"),s("d3b7"),s("b0c0"),s("caad"),s("2532"),s("ac1f"),s("841c"),s("04a2")),n=s("4053"),l=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"user-excelDownloadComp-box"},[s("el-dialog",{attrs:{title:"导出文件名称",visible:e.dialogVisible,width:"50%","before-close":e.handleClose},on:{"update:visible":function(t){e.dialogVisible=t},closed:e.closed}},[s("div",{staticClass:"mainBox"},[e._v(" 由于导出数据量较大，现采取异步导出的方案进行，导出文件需要一段时间进行，请稍后自行点击“"),s("span",{staticClass:"strong"},[e._v("文件查询")]),e._v("”下载。 ")]),s("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules}},[s("el-form-item",{attrs:{label:"请输入本次文件名称",prop:"file_name"}},[s("el-input",{attrs:{placeholder:"请输入本次文件名称"},model:{value:e.ruleForm.file_name,callback:function(t){e.$set(e.ruleForm,"file_name",t)},expression:"ruleForm.file_name"}})],1)],1),s("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")]),s("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm")}}},[e._v("确 定")])],1)],1)],1)},c=[],u=(s("b64b"),s("e9c4"),s("c24f")),m={data:function(){return{dialogVisible:!1,form:{},ruleForm:{file_name:""},rules:{file_name:[{required:!0,message:"请输入本次文件名称",trigger:"blur"}]}}},methods:{handleClose:function(){this.dialogVisible=!1},loadParams:function(e){this.dialogVisible=!0;var t=JSON.parse(JSON.stringify(e));this.$set(this.$data,"form",t)},submitForm:function(e){var t=this;this.$refs[e].validate((function(e){if(!e)return console.log("error submit!!"),!1;var s=Object(i["a"])(Object(i["a"])({},t.form),t.ruleForm),r=t.$loading({lock:!0,text:"Loading",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)"});Object(u["m"])(s).then((function(e){2e3===e.code&&t.$success("任务创建成功，请稍后自行点击“文件查询”下载！"),r.close(),t.resetForm("ruleForm"),t.dialogVisible=!1})).catch((function(e){r.close(),t.resetForm("ruleForm"),t.dialogVisible=!1}))}))},resetForm:function(e){this.$refs[e].resetFields()},closed:function(){this.$emit("destoryComp")}}},d=m,f=(s("d994"),s("2877")),p=Object(f["a"])(d,l,c,!1,null,null,null),h=p.exports,b=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"user-excelQueryComp-box"},[s("el-dialog",{attrs:{title:"文件下载列表",visible:e.dialogVisible,width:"50%","before-close":e.handleClose},on:{"update:visible":function(t){e.dialogVisible=t},closed:e.closed}},[s("tableList",{ref:"excelTableList",attrs:{cfgs:e.cfgs}}),s("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")])],1)],1)],1)},g=[],y=s("8daa"),v=s("cf45"),x=s("2708"),_={mixins:[x["a"]],components:{tableList:n["a"]},data:function(){return{dialogVisible:!1,fileStateList:[{id:1,state:0,name:"待导出"},{id:2,state:1,name:"导出中"},{id:3,state:2,name:"导出成功"},{id:4,state:3,name:"导出失败"}],list:[]}},computed:{cfgs:function(){var e=this,t=[{label:"文件名称",render:function(e,t){return e("span",t.row.file_name||"无")}},{label:"状态",render:function(t,s){var r=e.fileStateList.find((function(e){return e.state==s.row.export_status}));return t("span",r.name||"无")}},{label:"下载",render:function(t,s){return t("el-button",{props:{type:"primary",size:"mini"},style:{display:""!==s.row.export_url?"unset":"none"},on:{click:function(){e.download(s.row)}}},"下载")}}];return{vm:this,url:y["a"].user.getExportTask,columns:t}}},methods:{beforeSearch:function(e){Object(i["a"])({},this.searchParams);return{page:e?e.page:null,pagesize:e?e.size:null,export_type:5}},getList:function(){this.$refs.excelTableList.getData()},handleClose:function(){this.dialogVisible=!1},loadParams:function(){this.dialogVisible=!0},download:function(e){window.location.href=e.export_url},closed:function(){this.$emit("destoryComp")}}},C=_,w=Object(f["a"])(C,b,g,!1,null,null,null),D=w.exports,P=s("279a"),T={name:"user-list",mixins:[x["a"]],components:{tableList:n["a"],SearchPanel:o["a"],excelDownloadComp:h,excelQueryComp:D},data:function(){return{isDestoryComp:!1,dateTimeParams:{start_time:null,end_time:null}}},computed:{forms:function(){var e=this;return[{name:"dateTimeParams",type:"datePicker",dateType:"datetimerange",format:"yyyy-MM-dd HH:mm:ss",label:"时间选择",value:"",handler:{change:function(t){e.emptyDateTime(),e.setDateTime(t)},selectChange:function(t,s){e.emptyDateTime()}}}]},cfgs:function(){var e=[{label:"用户ID",width:"95px",prop:"user_number"},{label:"注册时间",width:"160px",render:function(e,t){return e("span",t.row.create_time?Object(v["h"])(t.row.create_time,"YYYY-MM-DD HH:mm:ss",!0):"无")}},{label:"渠道ID",render:function(e,t){return e("span",t.row.channel||"无")}},{label:"性别",width:"95px",prop:"sex",render:function(e,t){var s=P["a"].SEXLIST.find((function(e){return e.value===t.row.sex}));return e("span",s?s.name:"无")}},{label:"充值金额",prop:"recharge"},{label:"消费金额",prop:"consumption"},{label:"进房次数",prop:"intoRoom"},{label:"收到私聊",prop:"userGetChat"},{label:"发送私聊",prop:"userChat"}];return{vm:this,url:y["a"].user.newList,columns:this.permissionArr.includes("User@index")?e:[]}}},methods:{beforeSearch:function(e){var t=Object(i["a"])(Object(i["a"])({},this.searchParams),this.dateTimeParams);return{page:e?e.page:null,pagesize:e?e.size:null,start_time:t.start_time?Math.floor(t.start_time/1e3):t.start_time,end_time:t.end_time?Math.floor(t.end_time/1e3):t.end_time}},getList:function(){this.$refs.tableList.getData()},setDateTime:function(e){var t=e?{start_time:e[0],end_time:e[1]}:{};this.$set(this,"dateTimeParams",t)},emptyDateTime:function(){this.dateTimeParams={}},reset:function(){this.searchParams={},this.dateTimeParams={},this.getList()},onSearch:function(){this.getList()},destoryComp:function(){this.isDestoryComp=!1},handleExport:function(){var e=this;this.isDestoryComp=!0,setTimeout((function(){var t=e.beforeSearch(),s=e.$refs.tableList.search;t.page=s?s.page:null,t.pagesize=s?s.size:null,e.$refs.excelDownloadComp.loadParams(t)}),50)},handleQuery:function(){var e=this;this.isDestoryComp=!0,setTimeout((function(){e.$refs.excelQueryComp.loadParams()}),50)}}},L=T,$=(s("2457"),Object(f["a"])(L,r,a,!1,null,null,null));t["default"]=$.exports},d994:function(e,t,s){"use strict";s("ebe2")},ebe2:function(e,t,s){}}]);