(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7228f4c6"],{"1fe8":function(e,t,n){e.exports=n.p+"static/img/error.e53687be.png"},2708:function(e,t,n){"use strict";var r=n("5530"),o=n("2f62"),a={data:function(){return{tabIndex:"0",page:1,size:10,limit:10,searchParams:{},dataParams:{}}},computed:Object(r["a"])({},Object(o["c"])({permissionArr:function(e){return e.permission.permissionArr}})),mounted:function(){console.log(this.permissionArr,"permissionArr")}};t["a"]=a},8922:function(e,t,n){},cdb8:function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app-container roomConfig-category-box"},[n("div",{staticClass:"searchParams"},[n("SearchPanel",{attrs:{forms:e.forms,"show-reset":!0,"show-search-btn":!0,"show-add":!0},on:{onReset:e.reset,onSearch:e.onSearch,add:e.add},model:{value:e.searchParams,callback:function(t){e.searchParams=t},expression:"searchParams"}})],1),n("tableList",{ref:"tableList",attrs:{isHidePage:!0,cfgs:e.cfgs}}),e.isDestoryComp?n("recommendComp",{ref:"recommendComp",on:{destoryComp:e.destoryComp,getList:e.getList}}):e._e()],1)},o=[],a=n("c7eb"),s=n("1da1"),i=n("5530"),u=(n("7db0"),n("d3b7"),n("b0c0"),n("14d9"),n("f803")),c=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"dialog_body_box"},[n("el-dialog",{attrs:{title:e.title,width:"600px",visible:e.isEditComp},on:{closed:e.closed,"update:visible":function(t){e.isEditComp=t}}},[n("el-form",{ref:"ruleForm",staticClass:"body_box-line",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"120px","label-suffix":":","hide-required-asterisk":"see"===e.status}},[n("el-form-item",{attrs:{label:"首页列表序号",prop:"pos_index"}},[n("el-select",{attrs:{placeholder:"请选择首页列表序号",disabled:"update"===e.status},model:{value:e.ruleForm.pos_index,callback:function(t){e.$set(e.ruleForm,"pos_index",t)},expression:"ruleForm.pos_index"}},e._l(e.roomTypeList,(function(e){return n("el-option",{key:e.value,attrs:{label:e.name,value:e.value}})})),1)],1),n("el-form-item",{attrs:{label:"生效时间",prop:"timeRange"}},[n("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"datetimerange",align:"center","start-placeholder":"开始日期","end-placeholder":"结束日期","value-format":"timestamp","default-time":["00:00:00","23:59:59"]},model:{value:e.ruleForm.timeRange,callback:function(t){e.$set(e.ruleForm,"timeRange",t)},expression:"ruleForm.timeRange"}})],1),n("el-form-item",{attrs:{label:"房间ID",prop:"room_number"}},[n("el-input",{attrs:{placeholder:"请输入房间ID"},model:{value:e.ruleForm.room_number,callback:function(t){e.$set(e.ruleForm,"room_number",t)},expression:"ruleForm.room_number"}})],1)],1),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:e.cancel}},[e._v("取 消")]),n("el-button",{attrs:{type:"primary"},on:{click:e.submitForm}},[e._v("确 定")])],1)],1)],1)},d=[],m=(n("b64b"),n("e9c4"),{components:{},data:function(){return{status:"add",isEditComp:!1,roomTypeList:[],ruleForm:{pos_index:"",timeRange:[],room_number:null},oldParams:{},rules:{pos_index:[{required:!0,message:"请选择首页列表序号",trigger:"change"}],timeRange:[{type:"array",required:!0,message:"请选择日期区间"}],room_number:[{required:!0,message:"请输入用户ID",trigger:"blur"}]}}},computed:{title:function(){return"新增"},disabled:function(){return"see"===this.status}},methods:{loadParams:function(e,t){if(this.openComp(),this.status=e,"add"!==e){var n=JSON.parse(JSON.stringify(t)),r={};r.pos_index=n.pos_index||"",r.room_number=n.room_number||"",r.id=n.id||"",n.start_time&&n.end_time&&(r.timeRange=[1e3*n.start_time,1e3*n.end_time]),this.$set(this.$data,"ruleForm",r)}this.oldParams=JSON.parse(JSON.stringify(this.ruleForm))},openComp:function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];this.isEditComp=e},cancel:function(){var e=this;JSON.stringify(this.oldParams)!==JSON.stringify(this.ruleForm)?this.$confirm("关闭弹窗将不会保留您的更改, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){e.openComp(!1)})).catch((function(){})):this.openComp(!1)},update:function(){this.status="update"},submitForm:function(){var e=this;return Object(s["a"])(Object(a["a"])().mark((function t(){return Object(a["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.$refs.ruleForm.validate(function(){var t=Object(s["a"])(Object(a["a"])().mark((function t(n){var r,o;return Object(a["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!n){t.next=18;break}if(r=Object(i["a"])({},e.ruleForm),r.timeRange&&r.timeRange.length&&(r.start_time=r.timeRange[0]/1e3,r.end_time=r.timeRange[1]/1e3,delete r.timeRange),"add"!==e.status){t.next=9;break}return t.next=6,Object(u["f"])(r);case 6:o=t.sent,t.next=13;break;case 9:if("update"!==e.status){t.next=13;break}return t.next=12,Object(u["w"])(r);case 12:o=t.sent;case 13:2e3===o.code&&e.$success("新增成功"),e.openComp(!1),e.$emit("getList"),t.next=20;break;case 18:return console.log("error submit!!"),t.abrupt("return",!1);case 20:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}());case 1:case"end":return t.stop()}}),t)})))()},resetForm:function(){this.openComp(!1)},validateField:function(e){this.$refs.ruleForm.validateField([e])},closed:function(){this.$emit("destoryComp")},getGenreList:function(e){var t=this;return Object(s["a"])(Object(a["a"])().mark((function e(){var n;return Object(a["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:for(n=1;n<=10;n++)t.roomTypeList.push({name:"首页房间推荐".concat(n),value:n});case 1:case"end":return e.stop()}}),e)})))()}},created:function(){this.getGenreList()}}),l=m,p=(n("e213"),n("2877")),f=Object(p["a"])(l,c,d,!1,null,"65ce6cec",null),h=f.exports,b=n("04a2"),g=n("4053"),v=n("8daa"),O=n("2708"),j=n("279a"),_=n("cf45"),x={mixins:[O["a"]],components:{SearchPanel:b["a"],tableList:g["a"],recommendComp:h},data:function(){return{isDestoryComp:!1,roomTypeList:[],searchParams:{pos_index:null,room_number:""}}},computed:{forms:function(){return[{name:"room_number",type:"input",value:"",label:"房间ID",isNum:!0,placeholder:"请输入房间ID"},{name:"pos_index",type:"select",value:null,keyName:"value",optionLabel:"name",label:"首页列表序号",placeholder:"请选择首页列表序号",clearable:!0,options:this.roomTypeList}]},cfgs:function(){var e=this;return{vm:this,url:v["a"].house.RoomPushFlowList,columns:[{label:"首页列表序号",prop:"pos_index",render:function(e,t){return e("span",t.row.pos_index?"首页列表序号".concat(t.row.pos_index):"无")}},{label:"房间ID",prop:"room_number"},{label:"房间标题",prop:"room_title"},{label:"有效时间",minWidth:"200px",render:function(e,t){return e("div",[e("span",t.row.start_time?Object(_["h"])(t.row.start_time,"YYYY-MM-DD HH:mm:ss",!0):"无"),e("span"," 至 "),e("span",t.row.end_time?Object(_["h"])(t.row.end_time,"YYYY-MM-DD HH:mm:ss",!0):"无")])}},{label:"状态",render:function(e,t){var n=j["a"].RESOURCESACTIVESTATUS.find((function(e){return e.value===t.row.status}));return e("span",n?n.name:"无")}},{label:"操作",render:function(t,n){return t("div",[t("el-button",{props:{type:"primary"},on:{click:function(){e.update(n.row)}}},"修改"),t("el-button",{props:{type:"danger"},on:{click:function(){e.deleteParams(n.row.id)}}},"删除")])}}]}}},methods:{beforeSearch:function(e){var t=Object(i["a"])({},this.searchParams);return{page:e.page,pagesize:e.size,pos_index:t.pos_index,room_number:t.room_number}},getList:function(){this.$refs.tableList.getData()},reset:function(){this.searchParams={pos_index:null,room_number:""},this.getList()},onSearch:function(){this.getList()},add:function(){this.load("add")},update:function(e){this.load("update",e)},load:function(e,t){var n=this;this.isDestoryComp=!0,setTimeout((function(){n.$refs.recommendComp.loadParams(e,t)}),50)},deleteParams:function(e){var t=this;return Object(s["a"])(Object(a["a"])().mark((function n(){return Object(a["a"])().wrap((function(n){while(1)switch(n.prev=n.next){case 0:t.$confirm("确认删除吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(s["a"])(Object(a["a"])().mark((function n(){var r;return Object(a["a"])().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,Object(u["l"])({id:e});case 2:r=n.sent,2e3===r.code&&(t.$success("删除成功"),t.getList());case 4:case"end":return n.stop()}}),n)})))).catch((function(){}));case 1:case"end":return n.stop()}}),n)})))()},destoryComp:function(){this.isDestoryComp=!1},getGenreList:function(){var e=this;return Object(s["a"])(Object(a["a"])().mark((function t(){var n;return Object(a["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:for(n=1;n<=10;n++)e.roomTypeList.push({name:"首页房间序号".concat(n),value:n});case 1:case"end":return t.stop()}}),t)})))()}},created:function(){this.getGenreList()}},w=x,y=Object(p["a"])(w,r,o,!1,null,"30b0d62a",null);t["default"]=y.exports},e213:function(e,t,n){"use strict";n("8922")},f803:function(e,t,n){"use strict";n.d(t,"t",(function(){return a})),n.d(t,"g",(function(){return s})),n.d(t,"s",(function(){return i})),n.d(t,"m",(function(){return u})),n.d(t,"p",(function(){return c})),n.d(t,"a",(function(){return d})),n.d(t,"r",(function(){return m})),n.d(t,"j",(function(){return l})),n.d(t,"q",(function(){return p})),n.d(t,"o",(function(){return f})),n.d(t,"n",(function(){return h})),n.d(t,"h",(function(){return b})),n.d(t,"e",(function(){return g})),n.d(t,"v",(function(){return v})),n.d(t,"i",(function(){return O})),n.d(t,"d",(function(){return j})),n.d(t,"u",(function(){return _})),n.d(t,"k",(function(){return x})),n.d(t,"f",(function(){return w})),n.d(t,"w",(function(){return y})),n.d(t,"l",(function(){return C})),n.d(t,"c",(function(){return R})),n.d(t,"b",(function(){return k}));var r=n("829b"),o=n("8daa");function a(e){return Object(r["a"])({url:o["a"].house.updateParty,method:"post",data:e})}function s(e){return Object(r["a"])({url:o["a"].house.delGenre,method:"post",data:e})}function i(e){return Object(r["a"])({url:o["a"].house.saveGenre,method:"post",data:e})}function u(e){return Object(r["a"])({url:o["a"].house.genreList,method:"post",data:e})}function c(e){return Object(r["a"])({url:o["a"].house.partyRoomTypes,method:"post",data:e})}function d(e){return Object(r["a"])({url:o["a"].house.addRoomHot,method:"post",data:e})}function m(e){return Object(r["a"])({url:o["a"].house.roomHotSetting,method:"post",data:e})}function l(e){return Object(r["a"])({url:o["a"].house.deleteRoomHot,method:"post",data:e})}function p(e){return Object(r["a"])({url:o["a"].house.roomBindType,method:"post",data:e})}function f(e){return Object(r["a"])({url:o["a"].house.liveTypes,method:"post",data:e})}function h(e){return Object(r["a"])({url:o["a"].house.liveBindType,method:"post",data:e})}function b(e){return Object(r["a"])({url:o["a"].house.delLiveBind,method:"post",data:e})}function g(e){return Object(r["a"])({url:o["a"].house.createRoomHotConf,method:"post",data:e})}function v(e){return Object(r["a"])({url:o["a"].house.updateRoomHotConf,method:"post",data:e})}function O(e){return Object(r["a"])({url:o["a"].house.deleteRoomHonour,method:"post",data:e})}function j(e){return Object(r["a"])({url:o["a"].house.createRoomHonour,method:"post",data:e})}function _(e){return Object(r["a"])({url:o["a"].house.updateRoomHonour,method:"post",data:e})}function x(e){return Object(r["a"])({url:o["a"].house.deleteRoomHotConf,method:"post",data:e})}function w(e){return Object(r["a"])({url:o["a"].house.createRoomPushFlow,method:"post",data:e})}function y(e){return Object(r["a"])({url:o["a"].house.updateRoomPushFlow,method:"post",data:e})}function C(e){return Object(r["a"])({url:o["a"].house.deleteRoomPushFlow,method:"post",data:e})}function R(e){return Object(r["a"])({url:o["a"].house.changePartyRoom,method:"post",data:e})}function k(e){return Object(r["a"])({url:o["a"].house.canChangeType,method:"post",data:e})}}}]);