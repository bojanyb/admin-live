(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c9002b94"],{"0527":function(e,t,r){},"1fe8":function(e,t,r){e.exports=r.p+"static/img/error.e53687be.png"},2708:function(e,t,r){"use strict";var n=r("5530"),i=r("2f62"),s={data:function(){return{tabIndex:"0",page:1,size:10,limit:10,searchParams:{},dataParams:{}}},computed:Object(n["a"])({},Object(i["c"])({permissionArr:function(e){return e.permission.permissionArr}})),mounted:function(){console.log(this.permissionArr,"permissionArr")}};t["a"]=s},"9d5f":function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"app-container"},[r("tableList",{ref:"tableList",attrs:{cfgs:e.cfgs}}),e.isDestoryComp?r("notReport",{ref:"notReport",on:{destoryComp:e.destoryComp,getList:e.getList}}):e._e()],1)},i=[],s=r("c7eb"),a=r("1da1"),o=(r("7db0"),r("d3b7"),r("b0c0"),r("1a72")),l=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"notReport-box"},[r("el-dialog",{attrs:{title:"举报处理",visible:e.dialogVisible,width:"400px","close-on-click-modal":!1,"before-close":e.handleClose},on:{"update:visible":function(t){e.dialogVisible=t}}},[r("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"80px"}},[r("el-form-item",{attrs:{label:"封禁说明",prop:"reply"}},[r("el-input",{attrs:{type:"textarea",placeholder:"封禁说明必填,至少三个字",rows:4},model:{value:e.ruleForm.reply,callback:function(t){e.$set(e.ruleForm,"reply",t)},expression:"ruleForm.reply"}})],1),r("el-form-item",{attrs:{label:"封禁时间",prop:"ban_duration"}},[r("el-select",{attrs:{placeholder:"请选择"},model:{value:e.ruleForm.ban_duration,callback:function(t){e.$set(e.ruleForm,"ban_duration",t)},expression:"ruleForm.ban_duration"}},e._l(e.timeList,(function(e){return r("el-option",{key:e.value,attrs:{label:e.name,value:e.value}})})),1)],1)],1),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")]),r("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm")}}},[e._v("确 定")])],1)],1)],1)},u=[],c=r("5530"),p=r("279a"),m={data:function(){return{dialogVisible:!1,timeList:p["a"].DURATION,ruleForm:{id:null,reply:"",ban_duration:null},rules:{reply:[{required:!0,message:"请输入封禁说明",trigger:"blur"},{min:3,max:999,message:"至少三个字",trigger:"blur"}],ban_duration:[{required:!0,message:"请选择封禁时间",trigger:"change"}]}}},methods:{handleClose:function(){this.dialogVisible=!1},loadParams:function(e){this.ruleForm.id=e,this.dialogVisible=!0},submitForm:function(e){var t=this;return Object(a["a"])(Object(s["a"])().mark((function r(){return Object(s["a"])().wrap((function(r){while(1)switch(r.prev=r.next){case 0:t.$refs[e].validate(function(){var e=Object(a["a"])(Object(s["a"])().mark((function e(r){var n,i;return Object(s["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!r){e.next=11;break}return n=Object(c["a"])({},t.ruleForm),n.ban_duration>0&&(n.ban_duration=24*n.ban_duration*60*60),e.next=5,Object(o["tb"])(n);case 5:i=e.sent,2e3===i.code&&t.$message.success("处理成功"),t.dialogVisible=!1,t.$emit("getList"),e.next=13;break;case 11:return console.log("error submit!!"),e.abrupt("return",!1);case 13:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 1:case"end":return r.stop()}}),r)})))()},resetForm:function(e){this.$refs[e].resetFields()}}},b=m,d=(r("bf53"),r("2877")),f=Object(d["a"])(b,l,u,!1,null,null,null),g=f.exports,h=r("4053"),v=r("8daa"),_=r("cf45"),w=r("2708"),k={name:"user-not-reportList",mixins:[w["a"]],components:{tableList:h["a"],notReport:g},data:function(){return{isDestoryComp:!1}},computed:{cfgs:function(){var e=this;return{vm:this,url:v["a"].report.userHistory,columns:[{label:"举报时间",render:function(e,t){return e("span",t.row.create_time?Object(_["h"])(t.row.create_time,"YYYY-MM-DD HH:mm:ss",!0):"无")}},{label:"被举报ID",prop:"feedback_user_id"},{label:"被举报状态",render:function(e,t){var r=p["a"].REPORTSTATUSLIST.find((function(e){return t.row.feedback_user_status===e.value}));return e("span",r?r.name:"无")}},{label:"举报用户ID",prop:"user_id"},{label:"举报原因",prop:"genre"},{label:"举报证据",prop:"content",showOverFlow:!0},{label:"操作",minWidth:"120px",render:function(t,r){return t("div",[t("el-button",{props:{type:"primary"},on:{click:function(){e.manageClick(r.row.id)}}},"处理"),t("el-button",{props:{type:"danger"},on:{click:function(){e.funcClick(r.row.id)}}},"忽略")])}}]}}},methods:{beforeSearch:function(e){return{page:e.page,pagesize:e.size,status:1,feedback_user_id:"",user_id:""}},getList:function(){this.$refs.tableList.getData()},reset:function(){this.searchParams={},this.getList()},onSearch:function(){this.getList()},manageClick:function(e){var t=this;this.isDestoryComp=!0,setTimeout((function(){t.$refs.notReport.loadParams(e)}),50)},funcClick:function(e){var t=this;return Object(a["a"])(Object(s["a"])().mark((function r(){var n;return Object(s["a"])().wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,Object(o["ub"])({id:e});case 2:n=r.sent,2e3===n.code&&t.$message.success("忽略成功"),t.getList();case 5:case"end":return r.stop()}}),r)})))()},destoryComp:function(){this.isDestoryComp=!1}}},y=k,x=Object(d["a"])(y,n,i,!1,null,null,null);t["default"]=x.exports},bf53:function(e,t,r){"use strict";r("0527")}}]);