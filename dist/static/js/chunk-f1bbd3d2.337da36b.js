(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f1bbd3d2"],{"127f":function(e,t,r){"use strict";r.d(t,"a",(function(){return c}));var a=r("c7eb"),n=r("1da1"),s=(r("b0c0"),r("d3b7"),r("8237")),o=r.n(s),i=r("9b15"),u={ossParams:{region:"oss-cn-shenzhen",success_action_status:"200",accessKeyId:"LTAI5tFTcRH7h3RXKoYmnWMk",accessKeySecret:"qdx4B8jIh2VjBgBDG5fNfG0Oj21GSP",bucket:"live-huidapay-net"}};function l(e){var t=e.name.split("."),r=o()(Date.now()+t[0]);return r=r+"."+t[t.length-1],r}function c(e){return new Promise(function(){var t=Object(n["a"])(Object(a["a"])().mark((function t(r,n){var s,o;return Object(a["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return s=l(e),o=new i({region:u.ossParams.region,accessKeyId:u.ossParams.accessKeyId,accessKeySecret:u.ossParams.accessKeySecret,bucket:u.ossParams.bucket}),t.next=4,o.multipartUpload(s,e);case 4:t.sent,r({url:"https://photo.aiyi.live/"+s});case 6:case"end":return t.stop()}}),t)})));return function(e,r){return t.apply(this,arguments)}}())}},"1fe8":function(e,t,r){e.exports=r.p+"static/img/error.e53687be.png"},2708:function(e,t,r){"use strict";var a=r("5530"),n=r("2f62"),s={data:function(){return{tabIndex:"0",page:1,size:10,limit:10,searchParams:{},dataParams:{}}},computed:Object(a["a"])({},Object(n["c"])({permissionArr:function(e){return e.permission.permissionArr}})),mounted:function(){console.log(this.permissionArr,"permissionArr")}};t["a"]=s},"43d3":function(e,t,r){"use strict";r("6805")},6805:function(e,t,r){},"85e0":function(e,t,r){"use strict";r("a741")},"88d3":function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"app-container serviceConfig-coverAudit-box"},[r("div",{staticClass:"searchParams"},[r("SearchPanel",{attrs:{forms:e.forms,"show-reset":!0,"show-search-btn":!0},on:{onReset:e.reset,onSearch:e.onSearch},model:{value:e.searchParams,callback:function(t){e.searchParams=t},expression:"searchParams"}})],1),r("tableList",{ref:"tableList",attrs:{cfgs:e.cfgs}}),e.isDestoryComp?r("coverComp",{ref:"coverComp",on:{destoryComp:e.destoryComp,getList:e.getList}}):e._e(),r("coverDetails",{ref:"coverDetails"})],1)},n=[],s=r("c7eb"),o=r("1da1"),i=r("5530"),u=(r("7db0"),r("d3b7"),r("b0c0"),r("9b62")),l=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"serviceConfig-coverComp-box"},[r("el-dialog",{attrs:{title:"拒绝原因",visible:e.dialogVisible,width:"400px","before-close":e.handleClose},on:{"update:visible":function(t){e.dialogVisible=t},closed:e.closed}},[r("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"80px"}},[r("el-form-item",{attrs:{label:"拒绝原因",prop:"remark"}},[r("el-input",{attrs:{type:"textarea",rows:4},model:{value:e.ruleForm.remark,callback:function(t){e.$set(e.ruleForm,"remark",t)},expression:"ruleForm.remark"}})],1)],1),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")]),r("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm")}}},[e._v("确 定")])],1)],1)],1)},c=[],m={data:function(){return{dialogVisible:!1,ruleForm:{id:null,status:"",remark:""},rules:{remark:[{required:!0,message:"请填写拒绝原因",trigger:"blur"}]}}},methods:{handleClose:function(){this.dialogVisible=!1},loadParams:function(e,t){this.ruleForm.status=t,this.ruleForm.id=e,this.dialogVisible=!0},submitForm:function(e){var t=this;return Object(o["a"])(Object(s["a"])().mark((function r(){return Object(s["a"])().wrap((function(r){while(1)switch(r.prev=r.next){case 0:t.$refs[e].validate(function(){var e=Object(o["a"])(Object(s["a"])().mark((function e(r){var a,n;return Object(s["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!r){e.next=8;break}return a=Object(i["a"])({},t.ruleForm),e.next=4,Object(u["f"])(a);case 4:n=e.sent,2e3===n.code&&(t.$success("拒绝成功"),t.dialogVisible=!1,t.$emit("getList")),e.next=10;break;case 8:return console.log("error submit!!"),e.abrupt("return",!1);case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 1:case"end":return r.stop()}}),r)})))()},resetForm:function(e){this.$refs[e].resetFields()},closed:function(){this.$emit("destoryComp")}}},d=m,p=(r("85e0"),r("2877")),f=Object(p["a"])(d,l,c,!1,null,null,null),b=f.exports,h=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"serviceConfig-coverDetails-box"},[r("drawer",{ref:"drawer",attrs:{size:"450px",title:"查看封面审核",disabled:e.disabled},on:{cancel:e.cancel}},[r("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{slot:"body",model:e.ruleForm,rules:e.rules,"label-width":"85px","label-suffix":":","hide-required-asterisk":!0},slot:"body"},[r("el-form-item",{attrs:{label:"用户ID",prop:"user_number"}},[r("el-input",{attrs:{disabled:e.disabled,placeholder:"请输入用户ID"},model:{value:e.ruleForm.user_number,callback:function(t){e.$set(e.ruleForm,"user_number",t)},expression:"ruleForm.user_number"}})],1),r("el-form-item",{attrs:{label:"用户昵称",prop:"nickname"}},[r("el-input",{attrs:{disabled:e.disabled,placeholder:"请输入用户昵称"},model:{value:e.ruleForm.nickname,callback:function(t){e.$set(e.ruleForm,"nickname",t)},expression:"ruleForm.nickname"}})],1),r("el-form-item",{attrs:{label:"房间ID",prop:"room_number"}},[r("el-input",{attrs:{disabled:e.disabled,placeholder:"请输入房间ID"},model:{value:e.ruleForm.room_number,callback:function(t){e.$set(e.ruleForm,"room_number",t)},expression:"ruleForm.room_number"}})],1),r("el-form-item",{attrs:{label:"封面图",prop:"cover_url"}},[r("uploadImg",{ref:"uploadImg",attrs:{imgUrl:e.ruleForm.cover_url,name:"cover_url",accept:".png,.jpg,.jpeg",disabled:e.disabled},on:{validateField:e.validateField},model:{value:e.ruleForm.cover_url,callback:function(t){e.$set(e.ruleForm,"cover_url",t)},expression:"ruleForm.cover_url"}})],1),r("el-form-item",{attrs:{label:"封面类型",prop:"type"}},[r("el-select",{attrs:{disabled:e.disabled,placeholder:"请选择封面类型"},model:{value:e.ruleForm.type,callback:function(t){e.$set(e.ruleForm,"type",t)},expression:"ruleForm.type"}},e._l(e.typeList,(function(e){return r("el-option",{key:e.value,attrs:{label:e.name,value:e.value}})})),1)],1),r("el-form-item",{attrs:{label:"审核状态",prop:"status"}},[r("el-select",{attrs:{disabled:e.disabled,placeholder:"请选择审核状态"},model:{value:e.ruleForm.status,callback:function(t){e.$set(e.ruleForm,"status",t)},expression:"ruleForm.status"}},e._l(e.statusList,(function(e){return r("el-option",{key:e.value,attrs:{label:e.name,value:e.value}})})),1)],1),r("el-form-item",{attrs:{label:"时间",prop:"create_time"}},[r("el-date-picker",{attrs:{type:"datetime",disabled:e.disabled,placeholder:"选择时间"},model:{value:e.ruleForm.create_time,callback:function(t){e.$set(e.ruleForm,"create_time",t)},expression:"ruleForm.create_time"}})],1),r("el-form-item",{attrs:{label:"备注",prop:"room_number"}},[r("div",[e._v(e._s(e.ruleForm.remark||"无"))])]),r("el-form-item",{attrs:{label:"处理人",prop:"room_number"}},[r("div",[e._v(e._s(e.ruleForm.admin_nickname||"无"))])])],1)],1)],1)},v=[],k=(r("b64b"),r("e9c4"),r("0472")),g=r("40cb"),y=r("279a"),_={components:{drawer:k["a"],uploadImg:g["a"]},data:function(){return{ruleForm:{},rules:{},typeList:y["a"].SERVICEAUDITTYPELIST,statusList:y["a"].SERVICEAUDITSTATUSLIST}},computed:{disabled:function(){return!0}},methods:{loadParams:function(e){this.openComp();var t=JSON.parse(JSON.stringify(e));t.start_time=1e3*t.start_time,this.$set(this.$data,"ruleForm",t)},openComp:function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];this.$refs.drawer.loadParams(e)},cancel:function(){this.openComp(!1)},validateField:function(e){this.$refs.ruleForm.validateField([e])}}},F=_,j=(r("43d3"),Object(p["a"])(F,h,v,!1,null,null,null)),w=j.exports,O=r("04a2"),x=r("4053"),C=r("8daa"),P=r("2708"),T={mixins:[P["a"]],components:{SearchPanel:O["a"],tableList:x["a"],coverComp:b,coverDetails:w},data:function(){return{isDestoryComp:!1,searchParams:{status:1}}},computed:{forms:function(){var e=this;return[{name:"room_number",type:"input",value:"",label:"房间ID",isNum:!0,placeholder:"请输入房间ID"},{name:"status",type:"select",value:1,keyName:"value",optionLabel:"name",label:"状态",placeholder:"请选择",options:y["a"].SERVICEAUDITSTATUSLIST},{name:"dateTimeParams",type:"datePicker",dateType:"datetimerange",format:"yyyy-MM-dd HH:mm:ss",label:"时间选择",value:"",handler:{change:function(t){e.emptyDateTime(),e.setDateTime(t)},selectChange:function(t,r){e.emptyDateTime()}}}]},cfgs:function(){var e=this;return{vm:this,url:C["a"].risk.roomCoverCheckList,columns:[{label:"时间",prop:"create_time",minWidth:"100px"},{label:"用户",prop:"user_number",render:function(e,t){return e("div",[e("div",t.row.nickname),e("div",t.row.user_number)])}},{label:"房间ID",prop:"room_number"},{label:"封面图",isimg:!0,prop:"cover_url",imgWidth:"50px",imgHeight:"50px"},{label:"封面类型",render:function(e,t){var r=y["a"].SERVICEAUDITTYPELIST.find((function(e){return e.value===t.row.type}));return e("span",r?r.name:"无")}},{label:"审核状态",render:function(e,t){var r=y["a"].SERVICEAUDITSTATUSLIST.find((function(e){return e.value===t.row.status}));return e("span",r?r.name:"无")}},{label:"处理人",render:function(e,t){return e("span",t.row.admin_nickname||"无")}},{label:"备注",render:function(e,t){return e("span",t.row.remark||"无")}},{label:"操作",render:function(t,r){return t("div",[t("el-button",{props:{type:"primary"},style:{display:0===r.row.status?"unset":"none"},on:{click:function(){e.audit(r.row.id,1)}}},"通过"),t("el-button",{props:{type:"danger"},style:{display:0===r.row.status?"unset":"none"},on:{click:function(){e.audit(r.row.id,2)}}},"拒绝"),t("el-button",{props:{type:"success"},style:{marginLeft:"0px",display:1===r.row.status?"unset":"none"},on:{click:function(){}}},"已通过"),t("el-button",{props:{type:"danger"},style:{marginLeft:"0px",display:2===r.row.status?"unset":"none"},on:{click:function(){}}},"已拒绝")])}}]}}},methods:{beforeSearch:function(e){var t=Object(i["a"])(Object(i["a"])({},this.searchParams),this.dateTimeParams);return{page:e.page,pagesize:e.size,start_time:t.start_time?Math.floor(t.start_time/1e3):t.start_time,end_time:t.end_time?Math.floor(t.end_time/1e3):t.end_time,status:t.status,room_number:t.room_number}},getList:function(){this.$refs.tableList.getData()},setDateTime:function(e){var t=e?{start_time:e[0],end_time:e[1]}:{};this.$set(this,"dateTimeParams",t)},emptyDateTime:function(){this.dateTimeParams={}},reset:function(){this.searchParams={status:1},this.dateTimeParams={},this.getList()},onSearch:function(){this.getList()},audit:function(e,t){var r=this;return Object(o["a"])(Object(s["a"])().mark((function a(){var n;return Object(s["a"])().wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(1!==t){a.next=7;break}return a.next=3,Object(u["f"])({id:e,status:t});case 3:n=a.sent,2e3===n.code&&(r.$success("审核通过"),r.getList()),a.next=9;break;case 7:r.isDestoryComp=!0,setTimeout((function(){r.$refs.coverComp.loadParams(e,t)}),50);case 9:case"end":return a.stop()}}),a)})))()},destoryComp:function(){this.isDestoryComp=!1}}},S=T,I=Object(p["a"])(S,a,n,!1,null,"0ced7a3c",null);t["default"]=I.exports},"9b62":function(e,t,r){"use strict";r.d(t,"f",(function(){return s})),r.d(t,"o",(function(){return o})),r.d(t,"q",(function(){return i})),r.d(t,"c",(function(){return u})),r.d(t,"m",(function(){return l})),r.d(t,"g",(function(){return c})),r.d(t,"a",(function(){return m})),r.d(t,"d",(function(){return d})),r.d(t,"p",(function(){return p})),r.d(t,"l",(function(){return f})),r.d(t,"i",(function(){return b})),r.d(t,"k",(function(){return h})),r.d(t,"r",(function(){return v})),r.d(t,"j",(function(){return k})),r.d(t,"b",(function(){return g})),r.d(t,"n",(function(){return y})),r.d(t,"e",(function(){return _})),r.d(t,"h",(function(){return F}));var a=r("829b"),n=r("8daa");function s(e){return Object(a["a"])({url:n["a"].risk.coverCheck,method:"post",data:e})}function o(e){return Object(a["a"])({url:n["a"].risk.save,method:"post",data:e})}function i(e){return Object(a["a"])({url:n["a"].risk.softDelete,method:"post",data:e})}function u(e){return Object(a["a"])({url:n["a"].risk.add,method:"post",data:e})}function l(e){return Object(a["a"])({url:n["a"].risk.review,method:"post",data:e})}function c(e){return Object(a["a"])({url:n["a"].risk.customerServiceList,method:"post",data:e})}function m(e){return Object(a["a"])({url:n["a"].risk.UserPunishLog,method:"post",data:e})}function d(e){return Object(a["a"])({url:n["a"].risk.addUserPunish,method:"post",data:e})}function p(e){return Object(a["a"])({url:n["a"].risk.saveUserPunish,method:"post",data:e})}function f(e){return Object(a["a"])({url:n["a"].risk.removeUserPunish,method:"post",data:e})}function b(e){return Object(a["a"])({url:n["a"].risk.passUserPunish,method:"post",data:e})}function h(e){return Object(a["a"])({url:n["a"].risk.punishStatus,method:"post",data:e})}function v(e){return Object(a["a"])({url:n["a"].risk.updateSource,method:"post",data:e})}function k(e){return Object(a["a"])({url:n["a"].risk.punishOperateLog,method:"post",data:e})}function g(e){return Object(a["a"])({url:n["a"].risk.acceptPunish,method:"post",data:e})}function y(e){return Object(a["a"])({url:n["a"].risk.roomTalkList,method:"post",data:e})}function _(e){return Object(a["a"])({url:n["a"].risk.chatTalkList,method:"post",data:e})}function F(e){return Object(a["a"])({url:n["a"].risk.audioStreamDefyListExport,method:"post",data:e})}},a741:function(e,t,r){}}]);