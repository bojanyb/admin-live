(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7785023c"],{"127f":function(e,t,r){"use strict";r.d(t,"a",(function(){return m}));var o=r("40bd"),n=r("7e8c"),a=(r("48d4"),r("8bda"),r("897d")),s=r.n(a),i=r("4109"),u={ossParams:{region:"oss-cn-shenzhen",success_action_status:"200",accessKeyId:"LTAI5tFTcRH7h3RXKoYmnWMk",accessKeySecret:"qdx4B8jIh2VjBgBDG5fNfG0Oj21GSP",bucket:"live-huidapay-net"}};function c(e){var t=e.name.split("."),r=s()(Date.now()+t[0]);return r=r+"."+t[t.length-1],r}function m(e){return new Promise(function(){var t=Object(n["a"])(Object(o["a"])().mark((function t(r,n){var a,s;return Object(o["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a=c(e),s=new i({region:u.ossParams.region,accessKeyId:u.ossParams.accessKeyId,accessKeySecret:u.ossParams.accessKeySecret,bucket:u.ossParams.bucket}),t.next=4,s.multipartUpload(a,e);case 4:t.sent,r({url:"https://photo.aiyi.live/"+a});case 6:case"end":return t.stop()}}),t)})));return function(e,r){return t.apply(this,arguments)}}())}},"134d":function(e,t,r){},"1fe8":function(e,t,r){e.exports=r.p+"static/img/error.e53687be.png"},2708:function(e,t,r){"use strict";var o=r("4672"),n=r("52c1"),a={data:function(){return{tabIndex:"0",page:1,size:10,limit:10,searchParams:{},dataParams:{}}},computed:Object(o["a"])({},Object(n["c"])({permissionArr:function(e){return e.permission.permissionArr}})),mounted:function(){console.log(this.permissionArr,"permissionArr")}};t["a"]=a},d2ed:function(e,t,r){"use strict";r.r(t);var o=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"app-container roomConfig-category-box"},[r("div",{staticClass:"searchParams"},[r("SearchPanel",{attrs:{forms:e.forms,"show-reset":!0,"show-search-btn":!0,"show-add":!0},on:{onReset:e.reset,onSearch:e.onSearch,add:e.add},model:{value:e.searchParams,callback:function(t){e.searchParams=t},expression:"searchParams"}})],1),r("tableList",{ref:"tableList",attrs:{cfgs:e.cfgs}}),e.isDestoryComp?r("cornerComp",{ref:"cornerComp",on:{destoryComp:e.destoryComp,getList:e.getList}}):e._e()],1)},n=[],a=r("40bd"),s=r("7e8c"),i=r("4672"),u=(r("9dcb"),r("23dc"),r("8bda"),r("48d4"),r("9d95"),r("ed70"),r("f803")),c=r("1a72"),m=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"dialog_body_box"},[r("el-dialog",{attrs:{title:e.title,width:"600px",visible:e.isEditComp},on:{closed:e.closed,"update:visible":function(t){e.isEditComp=t}}},[r("el-form",{ref:"ruleForm",staticClass:"body_box-line",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"90px","label-suffix":":","hide-required-asterisk":"see"===e.status}},[r("el-form-item",{attrs:{label:"房间类型",prop:"room_category"}},[r("el-select",{attrs:{placeholder:"请选择房间类型",disabled:"update"===e.status},model:{value:e.ruleForm.room_category,callback:function(t){e.$set(e.ruleForm,"room_category",t)},expression:"ruleForm.room_category"}},e._l(e.roomTypeList,(function(e){return r("el-option",{key:e.value,attrs:{label:e.name,value:e.value}})})),1)],1),r("el-form-item",{attrs:{label:"房间ID",prop:"room_number_list"}},[r("el-input",{attrs:{placeholder:"请输入房间ID"},model:{value:e.ruleForm.room_number_list,callback:function(t){e.$set(e.ruleForm,"room_number_list",t)},expression:"ruleForm.room_number_list"}})],1),r("el-form-item",{attrs:{label:"生效时间",prop:"timeRange"}},[r("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"datetimerange",align:"center","start-placeholder":"开始日期","end-placeholder":"结束日期","value-format":"timestamp","default-time":["00:00:00","23:59:59"]},model:{value:e.ruleForm.timeRange,callback:function(t){e.$set(e.ruleForm,"timeRange",t)},expression:"ruleForm.timeRange"}})],1),r("el-form-item",{attrs:{label:"备注说明",prop:"remark"}},[r("el-input",{attrs:{type:"textarea",autosize:{minRows:2,maxRows:4},placeholder:"请输入备注说明",maxlength:"300"},model:{value:e.ruleForm.remark,callback:function(t){e.$set(e.ruleForm,"remark",t)},expression:"ruleForm.remark"}})],1),r("el-form-item",{attrs:{label:"角标",prop:"honour_icon"}},[r("Upload",{ref:"Upload",attrs:{imgUrl:e.ruleForm.honour_icon,disabled:e.disabled},on:{validateField:e.validateField},model:{value:e.ruleForm.honour_icon,callback:function(t){e.$set(e.ruleForm,"honour_icon",t)},expression:"ruleForm.honour_icon"}})],1)],1),r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:e.cancel}},[e._v("取 消")]),r("el-button",{attrs:{type:"primary"},on:{click:e.submitForm}},[e._v("确 定")])],1)],1)],1)},l=[],d=(r("65c4"),r("1e6d"),r("430a"),r("1988"),r("40cb")),p=r("7c98"),f={components:{Upload:d["a"]},data:function(){return{status:"add",isEditComp:!1,roomTypeList:[],ruleForm:{room_category:null,timeRange:[],room_number_list:"",remark:""},oldParams:{},rules:{room_category:[{required:!0,message:"请选择房间类型",trigger:"change"}],timeRange:[{type:"array",required:!0,message:"请选择日期区间"}],room_number_list:[{required:!0,message:"请输入用户ID",trigger:"blur"}],remark:[{required:!0,message:"请输入备注",trigger:"blur"}],honour_icon:[{required:!0,message:"请上传角标",trigger:"change"}]}}},computed:{title:function(){return"新增"},disabled:function(){return"see"===this.status}},methods:{loadParams:function(e,t){if(this.openComp(),this.status=e,"add"!==e){var r=JSON.parse(JSON.stringify(t)),o={};o.room_category=r.room_category||"",o.room_number_list=r.room_number_list?r.room_number_list.join(","):"",o.remark=r.remark||"",o.honour_icon=r.honour_icon||"",o.id=r.id||"",r.start_time&&r.end_time&&(o.timeRange=[1e3*r.start_time,1e3*r.end_time]),this.$set(this.$data,"ruleForm",o)}this.oldParams=JSON.parse(JSON.stringify(this.ruleForm))},openComp:function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];this.isEditComp=e},cancel:function(){var e=this;JSON.stringify(this.oldParams)!==JSON.stringify(this.ruleForm)?this.$confirm("关闭弹窗将不会保留您的更改, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){e.openComp(!1)})).catch((function(){})):this.openComp(!1)},update:function(){this.status="update"},submitForm:Object(p["debounce"])(Object(s["a"])(Object(a["a"])().mark((function e(){var t=this;return Object(a["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:this.$refs.ruleForm.validate(function(){var e=Object(s["a"])(Object(a["a"])().mark((function e(r){var o,n,s;return Object(a["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!r){e.next=22;break}if(o=Object(i["a"])({},t.ruleForm),o.timeRange&&o.timeRange.length&&(o.start_time=o.timeRange[0]/1e3,o.end_time=o.timeRange[1]/1e3,delete o.timeRange),n=/^(\d+,?)+$/,n.test(o.room_number_list)){e.next=7;break}return t.$error("请输入英文逗号！"),e.abrupt("return",!1);case 7:if("add"!==t.status){e.next=13;break}return e.next=10,Object(u["d"])(o);case 10:s=e.sent,e.next=17;break;case 13:if("update"!==t.status){e.next=17;break}return e.next=16,Object(u["u"])(o);case 16:s=e.sent;case 17:2e3===s.code&&t.$success("新增成功"),t.openComp(!1),t.$emit("getList"),e.next=24;break;case 22:return console.log("error submit!!"),e.abrupt("return",!1);case 24:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 1:case"end":return e.stop()}}),e,this)}))),300),resetForm:function(){this.openComp(!1)},validateField:function(e){this.$refs.ruleForm.validateField([e])},closed:function(){this.$emit("destoryComp")},getGenreList:function(e){var t=this;return Object(s["a"])(Object(a["a"])().mark((function r(){var o,n;return Object(a["a"])().wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,Object(c["Ab"])(e);case 2:o=r.sent,2e3==o.code&&(n=[{name:"直播",id:1},{name:"派对",id:2}],t.roomTypeList=n.reduce((function(e,t){return e.push({name:t.name,value:t.id}),e}),[])||[]);case 4:case"end":return r.stop()}}),r)})))()}},created:function(){this.getGenreList()}},h=f,b=(r("d9d7"),r("e607")),g=Object(b["a"])(h,m,l,!1,null,"1754f0d8",null),v=g.exports,_=r("04a2"),y=r("4053"),O=r("8daa"),j=r("2708"),w=r("cf45"),x={mixins:[j["a"]],components:{SearchPanel:_["a"],tableList:y["a"],cornerComp:v},data:function(){return{isDestoryComp:!1,roomTypeList:[],statusList:[],searchParams:{room_number:"",room_category:0,status:0}}},computed:{forms:function(){return[{name:"room_number",type:"input",value:"",label:"房间ID",isNum:!0,placeholder:"请输入房间ID"},{name:"room_category",type:"select",value:0,keyName:"value",optionLabel:"name",label:"房间类型",placeholder:"请选择房间类型",clearable:!0,options:this.roomTypeList},{name:"status",type:"select",value:0,keyName:"value",optionLabel:"name",label:"状态",placeholder:"请选择状态",clearable:!0,options:this.statusList}]},cfgs:function(){var e=this;return{vm:this,url:O["a"].house.RoomHonourList,columns:[{label:"房间ID",prop:"room_number_list",render:function(e,t){return e("div",[t.row.room_number_list&&t.row.room_number_list.map((function(t){return e("div",t?"".concat(t,"；"):"无")}))])}},{label:"房间标题",prop:"room_title_list",render:function(e,t){return e("div",[t.row.room_title_list&&t.row.room_title_list.map((function(t){return e("div",t?"".concat(t,"；"):"无")}))])}},{label:"房间角标图片",isimg:!0,prop:"honour_icon",imgHeight:"50px"},{label:"房间类型",render:function(t,r){var o=e.roomTypeList.find((function(e){return e.value===r.row.room_category}));return t("span",o?o.name:"无")}},{label:"有效时间",minWidth:"310px",render:function(e,t){return e("div",[e("span",t.row.start_time?Object(w["h"])(t.row.start_time,"YYYY-MM-DD HH:mm:ss",!0):"无"),e("span"," 至 "),e("span",t.row.end_time?Object(w["h"])(t.row.end_time,"YYYY-MM-DD HH:mm:ss",!0):"无")])}},{label:"状态",render:function(t,r){var o=e.statusList.find((function(e){return e.value===r.row.status}));return t("span",o?o.name:"无")}},{label:"备注说明",prop:"remark"},{label:"操作",minWidth:"200px",render:function(t,r){return t("div",[t("el-button",{props:{type:"primary"},on:{click:function(){e.update(r.row)}}},"修改"),t("el-button",{props:{type:"danger"},on:{click:function(){e.deleteParams(r.row.id)}}},"删除")])}}]}}},methods:{beforeSearch:function(e){var t=Object(i["a"])({},this.searchParams);return{page:e.page,pagesize:e.size,room_number:t.room_number,room_category:t.room_category,status:t.status}},getList:function(){this.$refs.tableList.getData()},reset:function(){this.searchParams={room_number:"",room_category:0,status:0},this.getList()},onSearch:function(){this.getList()},add:function(){this.load("add")},update:function(e){this.load("update",e)},load:function(e,t){var r=this;this.isDestoryComp=!0,setTimeout((function(){r.$refs.cornerComp.loadParams(e,t)}),50)},deleteParams:function(e){var t=this;return Object(s["a"])(Object(a["a"])().mark((function r(){return Object(a["a"])().wrap((function(r){while(1)switch(r.prev=r.next){case 0:t.$confirm("确认删除吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(s["a"])(Object(a["a"])().mark((function r(){var o;return Object(a["a"])().wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,Object(u["i"])({id:e});case 2:o=r.sent,2e3===o.code&&(t.$success("删除成功"),t.getList());case 4:case"end":return r.stop()}}),r)})))).catch((function(){}));case 1:case"end":return r.stop()}}),r)})))()},destoryComp:function(){this.isDestoryComp=!1},getGenreList:function(e){var t=this;return Object(s["a"])(Object(a["a"])().mark((function r(){var o,n;return Object(a["a"])().wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,Object(c["Ab"])(e);case 2:o=r.sent,2e3==o.code&&(n=[{name:"直播",id:1},{name:"派对",id:2},{name:"全部",id:0}],t.roomTypeList=n.reduce((function(e,t){return e.push({name:t.name,value:t.id}),e}),[])||[]);case 4:case"end":return r.stop()}}),r)})))()}},created:function(){this.getGenreList(),this.statusList=[{name:"待生效",value:1},{name:"生效中",value:2},{name:"已过期",value:3},{name:"全部",value:0}]}},k=x,F=Object(b["a"])(k,o,n,!1,null,"2dda0b84",null);t["default"]=F.exports},d9d7:function(e,t,r){"use strict";r("134d")},f803:function(e,t,r){"use strict";r.d(t,"t",(function(){return a})),r.d(t,"g",(function(){return s})),r.d(t,"s",(function(){return i})),r.d(t,"m",(function(){return u})),r.d(t,"p",(function(){return c})),r.d(t,"a",(function(){return m})),r.d(t,"r",(function(){return l})),r.d(t,"j",(function(){return d})),r.d(t,"q",(function(){return p})),r.d(t,"o",(function(){return f})),r.d(t,"n",(function(){return h})),r.d(t,"h",(function(){return b})),r.d(t,"e",(function(){return g})),r.d(t,"v",(function(){return v})),r.d(t,"i",(function(){return _})),r.d(t,"d",(function(){return y})),r.d(t,"u",(function(){return O})),r.d(t,"k",(function(){return j})),r.d(t,"f",(function(){return w})),r.d(t,"w",(function(){return x})),r.d(t,"l",(function(){return k})),r.d(t,"c",(function(){return F})),r.d(t,"b",(function(){return C}));var o=r("829b"),n=r("8daa");function a(e){return Object(o["a"])({url:n["a"].house.updateParty,method:"post",data:e})}function s(e){return Object(o["a"])({url:n["a"].house.delGenre,method:"post",data:e})}function i(e){return Object(o["a"])({url:n["a"].house.saveGenre,method:"post",data:e})}function u(e){return Object(o["a"])({url:n["a"].house.genreList,method:"post",data:e})}function c(e){return Object(o["a"])({url:n["a"].house.partyRoomTypes,method:"post",data:e})}function m(e){return Object(o["a"])({url:n["a"].house.addRoomHot,method:"post",data:e})}function l(e){return Object(o["a"])({url:n["a"].house.roomHotSetting,method:"post",data:e})}function d(e){return Object(o["a"])({url:n["a"].house.deleteRoomHot,method:"post",data:e})}function p(e){return Object(o["a"])({url:n["a"].house.roomBindType,method:"post",data:e})}function f(e){return Object(o["a"])({url:n["a"].house.liveTypes,method:"post",data:e})}function h(e){return Object(o["a"])({url:n["a"].house.liveBindType,method:"post",data:e})}function b(e){return Object(o["a"])({url:n["a"].house.delLiveBind,method:"post",data:e})}function g(e){return Object(o["a"])({url:n["a"].house.createRoomHotConf,method:"post",data:e})}function v(e){return Object(o["a"])({url:n["a"].house.updateRoomHotConf,method:"post",data:e})}function _(e){return Object(o["a"])({url:n["a"].house.deleteRoomHonour,method:"post",data:e})}function y(e){return Object(o["a"])({url:n["a"].house.createRoomHonour,method:"post",data:e})}function O(e){return Object(o["a"])({url:n["a"].house.updateRoomHonour,method:"post",data:e})}function j(e){return Object(o["a"])({url:n["a"].house.deleteRoomHotConf,method:"post",data:e})}function w(e){return Object(o["a"])({url:n["a"].house.createRoomPushFlow,method:"post",data:e})}function x(e){return Object(o["a"])({url:n["a"].house.updateRoomPushFlow,method:"post",data:e})}function k(e){return Object(o["a"])({url:n["a"].house.deleteRoomPushFlow,method:"post",data:e})}function F(e){return Object(o["a"])({url:n["a"].house.changePartyRoom,method:"post",data:e})}function C(e){return Object(o["a"])({url:n["a"].house.canChangeType,method:"post",data:e})}}}]);