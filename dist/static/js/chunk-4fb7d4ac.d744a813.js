(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4fb7d4ac"],{"1fe8":function(e,t,r){e.exports=r.p+"static/img/error.e53687be.png"},2708:function(e,t,r){"use strict";var n=r("4672"),a=r("52c1"),o={data:function(){return{tabIndex:"0",page:1,size:10,limit:10,searchParams:{},dataParams:{}}},computed:Object(n["a"])({},Object(a["c"])({permissionArr:function(e){return e.permission.permissionArr}})),mounted:function(){console.log(this.permissionArr,"permissionArr")}};t["a"]=o},"28cb":function(e,t,r){"use strict";r("8c9e")},5439:function(e,t,r){"use strict";r("dc86")},"8c9e":function(e,t,r){},a15d:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"room-list-box"},[r("div",{staticClass:"searchParams"},[r("SearchPanel",{attrs:{forms:e.forms,"show-reset":!0,"show-search-btn":!0},on:{onReset:e.reset,onSearch:e.onSearch},model:{value:e.searchParams,callback:function(t){e.searchParams=t},expression:"searchParams"}})],1),r("tableList",{ref:"tableList",attrs:{cfgs:e.cfgs}}),e.isDestoryComp?r("roomDetails",{ref:"roomDetails",on:{destoryComp:e.destoryComp,getList:e.getList}}):e._e()],1)},a=[],o=r("40bd"),s=r("7e8c"),i=r("4672"),u=(r("23dc"),r("8bda"),r("48d4"),r("65c4"),r("1a72")),l=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"room-roomDetails-box"},[r("drawer",{ref:"drawer",attrs:{size:"470px",title:"修改房间信息",isShowUpdate:!0,disabled:e.disabled},on:{cancel:e.cancel,submitForm:e.submitForm,closed:e.closed,update:e.update}},[r("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{slot:"body",model:e.ruleForm,rules:e.rules,"label-width":"85px","label-suffix":":","hide-required-asterisk":"see"===e.status},slot:"body"},[r("el-form-item",{attrs:{label:"房间名称",prop:"room_name"}},[r("el-input",{model:{value:e.ruleForm.room_name,callback:function(t){e.$set(e.ruleForm,"room_name",t)},expression:"ruleForm.room_name"}})],1),r("el-form-item",{attrs:{label:"封禁房间",prop:"banned_duration"}},[r("el-select",{attrs:{clearable:"",placeholder:"请选择"},model:{value:e.ruleForm.banned_duration,callback:function(t){e.$set(e.ruleForm,"banned_duration",t)},expression:"ruleForm.banned_duration"}},e._l(e.roomStatusList,(function(e){return r("el-option",{key:e.value,attrs:{label:e.name,value:e.value}})})),1)],1),e.ruleForm.banned_duration?r("el-form-item",{attrs:{label:"封禁原因",prop:"banned_remark"}},[r("el-input",{attrs:{type:"textarea",rows:4},model:{value:e.ruleForm.banned_remark,callback:function(t){e.$set(e.ruleForm,"banned_remark",t)},expression:"ruleForm.banned_remark"}})],1):e._e(),r("el-form-item",{attrs:{label:"房间ID",prop:"room_number"}},[r("el-input",{attrs:{disabled:!0},model:{value:e.form.room_number,callback:function(t){e.$set(e.form,"room_number",t)},expression:"form.room_number"}})],1),r("el-form-item",{attrs:{label:"房主ID",prop:"live_user_number"}},[r("el-input",{attrs:{disabled:!0},model:{value:e.form.live_user_number,callback:function(t){e.$set(e.form,"live_user_number",t)},expression:"form.live_user_number"}})],1),r("el-form-item",{attrs:{label:"所属公会",prop:"guild_number"}},[r("el-input",{attrs:{disabled:!0},model:{value:e.form.guild_number,callback:function(t){e.$set(e.form,"guild_number",t)},expression:"form.guild_number"}})],1),r("el-form-item",{attrs:{label:"状态",prop:"status"}},[r("el-select",{attrs:{placeholder:"请选择",disabled:!0},model:{value:e.form.status,callback:function(t){e.$set(e.form,"status",t)},expression:"form.status"}},e._l(e.statusList,(function(e){return r("el-option",{key:e.value,attrs:{label:e.name,value:e.value}})})),1)],1)],1)],1)],1)},m=[],c=r("0472"),d=r("279a"),b={components:{drawer:c["a"]},data:function(){return{status:"update",form:{},ruleForm:{room_name:"",banned_duration:"",banned_remark:""},oldParams:{},oldData:{},rules:{room_name:[{required:!1,message:"请输入活动名称",trigger:"blur"}],banned_remark:[{required:!0,message:"请填写封禁原因",trigger:"blur"}]},statusList:d["a"].USERSTATUSLIST,roomStatusList:d["a"].DURATION}},computed:{disabled:function(){return!1}},methods:{loadParams:function(e){this.openComp(),this.oldParams=e;var t=JSON.parse(JSON.stringify(e));this.form=t,this.ruleForm.name=t.name,this.$set(this.$data,"ruleForm",t),this.oldData=JSON.parse(JSON.stringify(this.ruleForm))},openComp:function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];this.$refs.drawer.loadParams(e)},submitForm:function(e){var t=this;return Object(s["a"])(Object(o["a"])().mark((function r(){return Object(o["a"])().wrap((function(r){while(1)switch(r.prev=r.next){case 0:t.$refs[e].validate(function(){var e=Object(s["a"])(Object(o["a"])().mark((function e(r){var n,a,s,i,l,m;return Object(o["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!r){e.next=17;break}if(n=t.ruleForm,a=t.oldParams,s={room_number:a.room_number,status:3,banned_duration:n.banned_duration,banned_remark:n.banned_remark,room_name:n.room_name},n.banned_duration||(delete s.status,delete s.banned_duration,delete s.banned_remark),a.room_name===n.room_name&&delete s.room_name,i=JSON.stringify(t.oldData),l=JSON.stringify(t.ruleForm),i===l){e.next=13;break}return e.next=11,Object(u["gb"])(s);case 11:m=e.sent,2e3===m.code&&t.$success("操作成功");case 13:t.openComp(!1),t.$emit("getList"),e.next=19;break;case 17:return console.log("error submit!!"),e.abrupt("return",!1);case 19:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 1:case"end":return r.stop()}}),r)})))()},cancel:function(){var e=this;JSON.stringify(this.oldParams)!==JSON.stringify(this.ruleForm)?this.$confirm("关闭弹窗将不会保留您的更改, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){e.openComp(!1)})).catch((function(){})):this.openComp(!1)},update:function(){this.status="update"},closed:function(){this.$emit("destoryComp")}}},p=b,f=(r("28cb"),r("e607")),h=Object(f["a"])(p,l,m,!1,null,null,null),_=h.exports,v=r("04a2"),g=r("4053"),w=r("8daa"),k=r("2708"),x={name:"RoomList",mixins:[k["a"]],components:{SearchPanel:v["a"],tableList:g["a"],roomDetails:_},data:function(){return{isDestoryComp:!1}},computed:{forms:function(){return[{name:"room_number",type:"input",value:"",label:"房间ID",isNum:!0,placeholder:"请输入房间ID"},{name:"guild_number",type:"input",value:"",label:"公会ID",isNum:!0,placeholder:"请输入公会ID"}]},cfgs:function(){var e=this;return{vm:this,url:w["a"].room.roomList,isShowIndex:!0,columns:[{label:"房间ID",prop:"room_number"},{label:"房间名称",prop:"room_name"},{label:"房主ID",prop:"live_user_number"},{label:"所属公会",render:function(e,t){return e("span",t.row.guild_number||"无")}},{label:"状态",render:function(e,t){var r=d["a"].USERSTATUSLIST.find((function(e){return e.value===t.row.status}));return e("span",r?r.name:"无")}},{label:"操作",render:function(t,r){return t("div",[t("el-button",{props:{type:"primary"},style:{display:1==r.row.status?"unset":"none"},on:{click:function(){e.editFunc(r.row)}}},"修改"),t("el-button",{props:{type:"danger"},style:{display:3==r.row.status?"unset":"none"},on:{click:function(){e.deblocking(r.row)}}},"解封")])}}]}}},methods:{beforeSearch:function(e){var t=Object(i["a"])({},this.searchParams);return{page:e.page,pagesize:e.size,room_number:t.room_number,is_live:t.is_live,guild_number:t.guild_number}},getList:function(){this.$refs.tableList.getData()},reset:function(){this.searchParams={},this.getList()},onSearch:function(){this.getList()},handleRoom:function(e){var t=this,r=1==e.status?"确定冻结当前房间吗?":"确定解冻当前房间吗?";this.$alert(r,"提示",{confirmButtonText:"确定",callback:function(r){if("confirm"==r){var n={room_number:JSON.stringify(e.room_number),status:1==e.status?"3":"1"};Object(u["gb"])(n).then((function(e){t.$message.success("操作成功"),t.getList()})).catch((function(e){t.$message.error("操作失败")}))}}})},roomHideFunc:function(e,t){var r=this;return Object(s["a"])(Object(o["a"])().mark((function n(){var a;return Object(o["a"])().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return a={id:e,is_hide:t},n.next=3,Object(u["Sb"])(a);case 3:r.getList();case 4:case"end":return n.stop()}}),n)})))()},roomTopFunc:function(e,t){var r=this;return Object(s["a"])(Object(o["a"])().mark((function n(){var a;return Object(o["a"])().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return a={id:e,top:t},n.next=3,Object(u["Tb"])(a);case 3:r.getList();case 4:case"end":return n.stop()}}),n)})))()},editFunc:function(e){var t=this;this.isDestoryComp=!0,setTimeout((function(){t.$refs.roomDetails.loadParams(e)}),50)},deblocking:function(e){var t=this;return Object(s["a"])(Object(o["a"])().mark((function r(){var n;return Object(o["a"])().wrap((function(r){while(1)switch(r.prev=r.next){case 0:return n={room_number:e.room_number,status:1},r.next=3,Object(u["gb"])(n);case 3:t.getList();case 4:case"end":return r.stop()}}),r)})))()},destoryComp:function(){this.isDestoryComp=!1}}},O=x,y=(r("5439"),Object(f["a"])(O,n,a,!1,null,null,null));t["default"]=y.exports},dc86:function(e,t,r){}}]);