(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-cd6cc604"],{"1fe8":function(e,t,r){e.exports=r.p+"static/img/error.e53687be.png"},2708:function(e,t,r){"use strict";var a=r("5530"),n=r("2f62"),i={data:function(){return{tabIndex:"0",page:1,size:10,limit:10,searchParams:{},dataParams:{}}},computed:Object(a["a"])({},Object(n["c"])({permissionArr:function(e){return e.permission.permissionArr}})),mounted:function(){console.log(this.permissionArr,"permissionArr")}};t["a"]=i},"58e9":function(e,t,r){},"8db3":function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"app-container"},[r("div",{staticClass:"searchParams"},[r("SearchPanel",{attrs:{forms:e.forms,"show-reset":!0,"show-search-btn":!0},on:{onReset:e.reset,onSearch:e.onSearch},model:{value:e.searchParams,callback:function(t){e.searchParams=t},expression:"searchParams"}})],1),r("tableList",{ref:"tableList",attrs:{cfgs:e.cfgs}}),r("blocked",{ref:"blocked",on:{evaluationFunc:e.evaluationFunc}})],1)},n=[],i=r("c7eb"),s=r("1da1"),o=r("1a72"),l=r("04a2"),c=r("4053"),u=r("e60d"),m=r("8daa"),p=r("cf45"),b=r("2708"),d={name:"ReportList",components:{SearchPanel:l["a"],tableList:c["a"],blocked:u["a"]},mixins:[b["a"]],data:function(){return{loadParams:{},status:null}},computed:{forms:function(){return[{name:"room_number",type:"input",value:"",label:"房间ID",isNum:!0,placeholder:"请输入房间ID"},{name:"user_number",type:"input",value:"",label:"举报人ID",isNum:!0,placeholder:"请输入举报人ID"}]},cfgs:function(){var e=this;return{vm:this,url:m["a"].room.report,columns:[{label:"被举报房主ID",prop:"live_user_number",minWidth:"120px"},{label:"直播场次ID",prop:"live_room_id",minWidth:"120px"},{label:"房间ID",prop:"room_number"},{label:"房主昵称",prop:"anchor"},{label:"房间类型名称",prop:"room_genre_name",minWidth:"120px"},{label:"举报人ID",prop:"user_number"},{label:"举报人名称",prop:"user_name",minWidth:"120px"},{label:"举报内容",width:"160px",prop:"content"},{label:"举报时间",width:"160px",prop:"create_time",render:function(e,t){return e("span",t.row.create_time?Object(p["h"])(t.row.create_time,"YYYY-MM-DD HH:mm:ss",!0):"无")}},{label:"操作",width:"200px",fixed:"right",render:function(t,r){return t("div",[t("el-button",{props:{type:"primary"},on:{click:function(){e.FeedBackFunc(r.row,2)}}},"处理"),t("el-button",{props:{type:"primary"},on:{click:function(){e.loseSight(r.row,3)}}},"忽略")])}}]}}},methods:{reset:function(){this.searchParams={},this.getList()},onSearch:function(){this.getList()},beforeSearch:function(e){var t=this.searchParams;return{page:e.page,pagesize:e.pagesize,status:"1",room_number:t.room_number,user_number:t.user_number}},getList:function(){this.$refs.tableList.getData()},FeedBackFunc:function(e,t){var r=this;this.status=t,this.loadParams=e,this.$refs.blocked.dialogVisible=!0,setTimeout((function(){r.$refs.blocked.resetForm("ruleForm")}),10)},loseSight:function(e,t){this.status=t,this.loadParams=e,this.handleChange()},evaluationFunc:function(e){var t=this;return Object(s["a"])(Object(i["a"])().mark((function r(){var a;return Object(i["a"])().wrap((function(r){while(1)switch(r.prev=r.next){case 0:return a={status:3,banned_remark:e.remark,banned_duration:e.kill_time,room_number:t.loadParams.room_number},r.next=3,Object(o["eb"])(a);case 3:t.handleChange();case 4:case"end":return r.stop()}}),r)})))()},handleChange:function(){var e=this;return Object(s["a"])(Object(i["a"])().mark((function t(){var r,a;return Object(i["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return r={id:e.loadParams.id,status:e.status},t.next=3,Object(o["O"])(r);case 3:a=t.sent,3e3===a.code&&e.$message.success("操作成功"),e.getList();case 6:case"end":return t.stop()}}),t)})))()}}},h=d,f=r("2877"),v=Object(f["a"])(h,a,n,!1,null,null,null);t["default"]=v.exports},de4a:function(e,t,r){"use strict";r("58e9")},e60d:function(e,t,r){"use strict";var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"blocked-box"},[r("el-dialog",{attrs:{title:"封禁",visible:e.dialogVisible,width:"500px","close-on-click-modal":!1,"before-close":e.handleClose},on:{"update:visible":function(t){e.dialogVisible=t}}},[r("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"80px"}},[r("el-form-item",{attrs:{label:"封禁时间",prop:"kill_time"}},[r("el-select",{attrs:{placeholder:"请选择"},model:{value:e.ruleForm.kill_time,callback:function(t){e.$set(e.ruleForm,"kill_time",t)},expression:"ruleForm.kill_time"}},e._l(e.timerList,(function(e){return r("el-option",{key:e.value,attrs:{label:e.name,value:e.value}})})),1)],1),r("el-form-item",{attrs:{label:"封禁说明",prop:"remark"}},[r("el-input",{attrs:{type:"textarea",rows:5,placeholder:"正常状态可不填",clearable:""},model:{value:e.ruleForm.remark,callback:function(t){e.$set(e.ruleForm,"remark",t)},expression:"ruleForm.remark"}})],1)],1),r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:e.cancel}},[e._v("取 消")]),r("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm")}}},[e._v("确 定")])],1)],1)],1)},n=[],i=r("c7eb"),s=r("1da1"),o=r("279a"),l={data:function(){return{dialogVisible:!1,timerList:o["a"].DURATION,ruleForm:{kill_time:null,remark:""},rules:{kill_time:[{required:!0,message:"请选择封禁时间",trigger:"change"}],remark:[{required:!0,message:"请填写封禁说明",trigger:"blur"}]}}},methods:{loadParams:function(){this.dialogVisible=!0},handleClose:function(){this.dialogVisible=!1},submitForm:function(e){var t=this;return Object(s["a"])(Object(i["a"])().mark((function r(){return Object(i["a"])().wrap((function(r){while(1)switch(r.prev=r.next){case 0:t.$refs[e].validate(function(){var e=Object(s["a"])(Object(i["a"])().mark((function e(r){return Object(i["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!r){e.next=5;break}t.dialogVisible=!1,t.$emit("evaluationFunc",t.ruleForm),e.next=7;break;case 5:return console.log("error submit!!"),e.abrupt("return",!1);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 1:case"end":return r.stop()}}),r)})))()},cancel:function(){this.dialogVisible=!1,this.$emit("blockedCancel")},resetForm:function(e){this.$refs[e].resetFields()}}},c=l,u=(r("de4a"),r("2877")),m=Object(u["a"])(c,a,n,!1,null,"555e1083",null);t["a"]=m.exports}}]);