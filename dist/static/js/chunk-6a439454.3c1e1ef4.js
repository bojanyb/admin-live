(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6a439454"],{"1fe8":function(e,t,r){e.exports=r.p+"static/img/error.e53687be.png"},2708:function(e,t,r){"use strict";var a=r("5530"),o=r("2f62"),s={data:function(){return{tabIndex:"0",page:1,size:10,limit:10,searchParams:{},dataParams:{}}},computed:Object(a["a"])({},Object(o["c"])({permissionArr:function(e){return e.permission.permissionArr}})),mounted:function(){console.log(this.permissionArr,"permissionArr")}};t["a"]=s},"5b2e":function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"room-livelist"},[r("menuComp",{ref:"menuComp",attrs:{menuList:e.menuList},model:{value:e.tabIndex,callback:function(t){e.tabIndex=t},expression:"tabIndex"}}),"0"===e.tabIndex?r("div",{staticClass:"searchParams"},[r("SearchPanel",{attrs:{forms:e.forms,"show-add":!0,"show-search-btn":!0},on:{add:e.add,onSearch:e.onSearch},model:{value:e.searchParams,callback:function(t){e.searchParams=t},expression:"searchParams"}})],1):e._e(),"0"===e.tabIndex?r("el-card",{staticClass:"box-card",attrs:{shadow:"always"}},[r("div",{staticClass:"box-card-inner"},[r("span",[e._v("查询期间: 发送人数:"+e._s(e.ruleForm.user_count)+"人")]),r("span",[e._v("发送条数: "+e._s(e.ruleForm.count)+"条")]),r("span",[e._v("广播流水: "+e._s(e.ruleForm.total_cost)+"钻石")])])]):"1"===e.tabIndex?r("div",{staticClass:"share-filter-grid-box",attrs:{shadow:"always"}},[r("el-form",{ref:"form",attrs:{model:e.fromData,"label-width":"90px"}},[r("el-form-item",{attrs:{label:"小喇叭单价"}},[r("el-row",{staticClass:"body_box-col",attrs:{gutter:20}},[r("el-col",{attrs:{span:14}},[r("el-input",{attrs:{oninput:"this.value=this.value.replace(/[^\\d]/g,'');"},model:{value:e.fromData.cost,callback:function(t){e.$set(e.fromData,"cost",t)},expression:"fromData.cost"}})],1),r("el-col",{attrs:{span:8}},[r("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.onSave(e.fromData,"broadcast_for_room")}}},[e._v("保存")])],1)],1)],1),r("el-form-item",{attrs:{label:"大喇叭单价"}},[r("el-row",{staticClass:"body_box-col",attrs:{gutter:20}},[r("el-col",{attrs:{span:14}},[r("el-input",{attrs:{oninput:"this.value=this.value.replace(/[^\\d]/g,'');"},model:{value:e.fromData.bigCost,callback:function(t){e.$set(e.fromData,"bigCost",t)},expression:"fromData.bigCost"}})],1),r("el-col",{attrs:{span:8}},[r("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.onSave(e.fromData,"broadcast_big_for_room")}}},[e._v("保存")])],1)],1)],1)],1)],1):e._e(),"0"===e.tabIndex?r("tableList",{ref:"tableList",attrs:{cfgs:e.cfgs},on:{saleAmunt:e.saleAmunt}}):e._e(),e.isDestoryComp?r("editComp",{ref:"editComp",on:{destoryComp:e.destoryComp,getList:e.getList}}):e._e()],1)},o=[],s=r("c7eb"),n=r("1da1"),i=r("5530"),c=(r("7db0"),r("d3b7"),r("b0c0"),r("25f0"),r("3ca3"),r("ddb0"),r("1a72")),l=r("3923"),u=r("04a2"),m=r("4053"),d=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"dialog_body_box"},[r("el-dialog",{attrs:{title:e.title,width:"600px",visible:e.isEditComp},on:{closed:e.closed,"update:visible":function(t){e.isEditComp=t}}},[r("el-form",{ref:"ruleForm",staticClass:"body_box-line",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"90px","label-suffix":":","hide-required-asterisk":"see"===e.status}},[r("el-form-item",{attrs:{label:"广播类型",prop:"type"}},[r("el-radio-group",{model:{value:e.ruleForm.type,callback:function(t){e.$set(e.ruleForm,"type",t)},expression:"ruleForm.type"}},[r("el-radio-button",{attrs:{label:"1"}},[e._v("小喇叭")]),r("el-radio-button",{attrs:{label:"2"}},[e._v("大喇叭")])],1)],1),r("el-form-item",{attrs:{label:"用户ID",prop:"user_number"}},[r("el-input",{attrs:{placeholder:"请输入用户ID"},model:{value:e.ruleForm.user_number,callback:function(t){e.$set(e.ruleForm,"user_number",t)},expression:"ruleForm.user_number"}})],1),r("el-form-item",{attrs:{label:"房间ID",prop:"room_number"}},[r("el-input",{attrs:{placeholder:"请输入房间ID"},model:{value:e.ruleForm.room_number,callback:function(t){e.$set(e.ruleForm,"room_number",t)},expression:"ruleForm.room_number"}})],1),r("el-form-item",{attrs:{label:"广播内容",prop:"content"}},[r("el-input",{attrs:{type:"textarea",rows:"3",resize:"none",maxlength:"30",placeholder:"请输入广播内容"},model:{value:e.ruleForm.content,callback:function(t){e.$set(e.ruleForm,"content",t)},expression:"ruleForm.content"}})],1)],1),r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:e.cancel}},[e._v("取 消")]),r("el-button",{attrs:{type:"primary"},on:{click:e.submitForm}},[e._v("确 定")])],1)],1)],1)},p=[],b=(r("b64b"),r("e9c4"),r("279a")),f={components:{},data:function(){return{status:"add",isEditComp:!1,rankList:b["a"].CLASSLIST,guildTypeList:b["a"].GUILDCONFIGTYPELIST,typeOptions:b["a"].BROADCASTTYPESTATUS,ruleForm:{type:"1",user_number:null,room_number:"",content:""},oldParams:{},rules:{user_number:[{required:!0,message:"请输入用户ID",trigger:"blur"}],content:[{required:!0,message:"请输入广播内容",trigger:"blur"}],room_number:[{required:!1,pattern:/^[+]{0,1}(\d+)$/,message:"请输入正整数",trigger:"blur"}]}}},computed:{title:function(){return"新增发送广播消息"},disabled:function(){return"see"===this.status}},methods:{loadParams:function(e,t){if(this.openComp(),this.status=e,"add"!==e){var r=JSON.parse(JSON.stringify(t)),a={};a.user_number=r.user_number||"",a.room_number=r.room_number||"",a.content=r.content||"",this.$set(this.$data,"ruleForm",a)}this.oldParams=JSON.parse(JSON.stringify(this.ruleForm))},openComp:function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];this.isEditComp=e},cancel:function(){var e=this;JSON.stringify(this.oldParams)!==JSON.stringify(this.ruleForm)?this.$confirm("关闭弹窗将不会保留您的更改, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){e.openComp(!1)})).catch((function(){})):this.openComp(!1)},update:function(){this.status="update"},submitForm:function(){var e=this;return Object(n["a"])(Object(s["a"])().mark((function t(){return Object(s["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.$refs.ruleForm.validate(function(){var t=Object(n["a"])(Object(s["a"])().mark((function t(r){var a,o;return Object(s["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!r){t.next=10;break}return a=Object(i["a"])({},e.ruleForm),t.next=4,Object(c["Tb"])(a);case 4:o=t.sent,2e3===o.code&&e.$success("发送成功"),e.openComp(!1),e.$emit("getList"),t.next=12;break;case 10:return console.log("error submit!!"),t.abrupt("return",!1);case 12:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}());case 1:case"end":return t.stop()}}),t)})))()},resetForm:function(){this.openComp(!1)},validateField:function(e){this.$refs.ruleForm.validateField([e])},closed:function(){this.$emit("destoryComp")}}},h=f,_=(r("98ec"),r("2877")),v=Object(_["a"])(h,d,p,!1,null,"9e135a1c",null),g=v.exports,y=r("8daa"),x=r("cf45"),C=r("2708"),D={name:"BroadcastList",mixins:[C["a"]],components:{SearchPanel:u["a"],tableList:m["a"],editComp:g,menuComp:l["a"]},data:function(){return{tabIndex:"0",menuList:[{name:"房间广播列表"},{name:"房间广播配置"}],isDestoryComp:!1,ruleForm:{},resultCost:"",fromData:{cost:"",bigCost:""}}},computed:{forms:function(){var e=this,t=[{name:"user_number",type:"input",value:"",label:"用户ID",isNum:!0,placeholder:"请输入用户ID"},{name:"type",type:"select",value:"",keyName:"value",optionLabel:"name",label:"喇叭类型",placeholder:"请选择",clearable:!0,options:b["a"].BROADCASTTYPESTATUS},{name:"dateTimeParams",type:"datePicker",dateType:"datetimerange",format:"yyyy-MM-dd HH:mm:ss",label:"发送时间",value:"",handler:{change:function(t){e.emptyDateTime(),e.setDateTime(t),e.getList()},selectChange:function(t,r){e.emptyDateTime(),e.getList()}}}];return"0"===this.tabIndex?t:[]},cfgs:function(){return{vm:this,url:y["a"].room.broadcastList,columns:[{label:"发送时间",render:function(e,t){return e("span",t.row.create_time?Object(x["h"])(t.row.create_time,"YYYY-MM-DD HH:mm:ss",!0):"无")}},{label:"用户ID",prop:"user_number"},{label:"喇叭类型",prop:"type",render:function(e,t){var r=b["a"].BROADCASTTYPESTATUS.find((function(e){return e.value===t.row.type}));return e("span",r?r.name:"无")}},{label:"发送类型",prop:"from_type",render:function(e,t){var r=b["a"].FROMTYPESTATUS.find((function(e){return e.value===t.row.from_type}));return e("span",r?r.name:"无")}},{label:"广播内容",minWidth:"220px",prop:"content"}]}}},created:function(){this.getResultPrice();var e=new Date,t=Object(x["h"])(e,"YYYY-MM-DD",!1),r=new Date(t+" 00:00:00").getTime(),a=new Date(t+" 23:59:59").getTime();this.searchParams.dateTimeParams=[r,a],this.dateTimeParams={start_time:r,end_time:a}},methods:{beforeSearch:function(e){var t=Object(i["a"])(Object(i["a"])({},this.searchParams),this.dateTimeParams);return{page:e.page,pagesize:e.size,user_number:t.user_number,type:t.type,start_time:t.start_time?Math.floor(t.start_time/1e3):0,end_time:t.end_time?Math.floor(t.end_time/1e3):0}},getList:function(){this.$refs.tableList.getData()},setDateTime:function(e){var t=e?{start_time:e[0],end_time:e[1]}:{};this.$set(this,"dateTimeParams",t)},emptyDateTime:function(){this.dateTimeParams={}},add:function(){this.load("add")},onSave:function(e,t){var r=this,a=this.$loading({lock:!0,text:"Loading",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)"});this.$confirm("你确定要保存广播单价吗？","保存提醒",{type:"warning",confirmButtonText:"确定",cancelButtonText:"取消"}).then(Object(n["a"])(Object(s["a"])().mark((function o(){var n,i;return Object(s["a"])().wrap((function(o){while(1)switch(o.prev=o.next){case 0:return n={key:t,value:"broadcast_for_room"===t?e.cost:e.Bigcost},n.value="broadcast_for_room"===t?e.cost:e.bigCost,o.next=4,Object(c["Ub"])(n);case 4:i=o.sent,2e3===i.code&&(a.close(),r.$message({message:"[object Object]"===Object.prototype.toString.call(i)&&"保存成功",type:"success"}));case 6:case"end":return o.stop()}}),o)})))).catch((function(){a.close()}))},load:function(e,t){var r=this;this.isDestoryComp=!0,setTimeout((function(){r.$refs.editComp.loadParams(e,t)}),50)},onSearch:function(){this.getList()},destoryComp:function(){this.isDestoryComp=!1},saleAmunt:function(e){var t=e.total_cost,r=e.user_count,a=e.count;this.ruleForm={total_cost:t,user_count:r,count:a}},getResultPrice:function(){var e=this;return Object(n["a"])(Object(s["a"])().mark((function t(){var r;return Object(s["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Promise.all([Object(c["I"])({key:"broadcast_for_room"}),Object(c["I"])({key:"broadcast_big_for_room"})]);case 2:if(r=t.sent,r[0].code+""==="2000"&&r[1].code+""==="2000"){t.next=6;break}return e.$Message.error("请求失败"),t.abrupt("return");case 6:e.fromData.cost=r[0].data.value||"",e.fromData.bigCost=r[1].data.value||"";case 8:case"end":return t.stop()}}),t)})))()}}},w=D,O=(r("7113"),Object(_["a"])(w,a,o,!1,null,null,null));t["default"]=O.exports},7113:function(e,t,r){"use strict";r("f6e8")},"98ec":function(e,t,r){"use strict";r("be48")},be48:function(e,t,r){},f6e8:function(e,t,r){}}]);