(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d65e6800"],{"1fe8":function(e,t,r){e.exports=r.p+"static/img/error.e53687be.png"},2502:function(e,t,r){},2708:function(e,t,r){"use strict";var n=r("4672"),o=r("52c1"),a={data:function(){return{tabIndex:"0",page:1,size:10,limit:10,searchParams:{},dataParams:{}}},computed:Object(n["a"])({},Object(o["c"])({permissionArr:function(e){return e.permission.permissionArr}})),mounted:function(){console.log(this.permissionArr,"permissionArr")}};t["a"]=a},"29d0":function(e,t,r){"use strict";r.d(t,"a",(function(){return a}));var n=r("299b"),o=r("8daa");function a(e){return Object(n["a"])({url:o["a"].room.liveEnd,method:"post",data:e})}},9881:function(e,t,r){"use strict";r("c0d5")},"9b05":function(e,t,r){"use strict";r("2502")},c0d5:function(e,t,r){},d79b:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"room-livelist"},[r("menuComp",{ref:"menuComp",attrs:{menuList:e.menuList},model:{value:e.tabIndex,callback:function(t){e.tabIndex=t},expression:"tabIndex"}}),r("div",{staticClass:"searchParams"},[r("SearchPanel",{attrs:{forms:e.forms,"show-reset":!0,"show-search-btn":!0},on:{onReset:e.reset,onSearch:e.onSearch},model:{value:e.searchParams,callback:function(t){e.searchParams=t},expression:"searchParams"}})],1),r("tableList",{ref:"tableList",attrs:{cfgs:e.cfgs}}),e.isDestoryComp?r("liveDetails",{ref:"liveDetails",on:{destoryComp:e.destoryComp,getList:e.getList}}):e._e()],1)},o=[],a=r("40bd"),i=r("7e8c"),s=r("4672"),u=(r("23dc"),r("8bda"),r("48d4"),r("5250"),r("f803")),l=r("29d0"),m=r("3923"),c=r("04a2"),d=r("4053"),p=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"room-liveDetails-box"},[r("drawer",{ref:"drawer",attrs:{size:"660px",title:"修改房间直播信息",isShowUpdate:!0,disabled:e.disabled},on:{cancel:e.cancel,submitForm:e.submitForm,closed:e.closed,update:e.update}},[r("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{slot:"body",model:e.ruleForm,rules:e.rules,"label-width":"95px","label-suffix":":","hide-required-asterisk":"see"===e.status},slot:"body"},[r("div",{staticClass:"flexBox selectBox"},[r("el-form-item",{attrs:{label:"隐藏房间",prop:"is_hide"}},[r("el-radio-group",{model:{value:e.ruleForm.is_hide,callback:function(t){e.$set(e.ruleForm,"is_hide",t)},expression:"ruleForm.is_hide"}},[r("el-radio",{attrs:{label:1}},[e._v("开启")]),r("el-radio",{attrs:{label:2}},[e._v("隐藏")])],1)],1),r("el-form-item",{attrs:{label:"修改名称",prop:"room_name"}},[r("el-input",{model:{value:e.ruleForm.room_name,callback:function(t){e.$set(e.ruleForm,"room_name",t)},expression:"ruleForm.room_name"}})],1)],1),r("div",{staticClass:"flexBox"},[r("el-form-item",{attrs:{label:"直播场次ID",prop:"room_number"}},[r("el-input",{attrs:{disabled:!0},model:{value:e.ruleForm.room_number,callback:function(t){e.$set(e.ruleForm,"room_number",t)},expression:"ruleForm.room_number"}})],1),r("el-form-item",{attrs:{label:"房间类型",prop:"room_genre_name"}},[r("el-input",{attrs:{disabled:!0},model:{value:e.ruleForm.room_genre_name,callback:function(t){e.$set(e.ruleForm,"room_genre_name",t)},expression:"ruleForm.room_genre_name"}})],1)],1),r("div",{staticClass:"flexBox"},[r("el-form-item",{attrs:{label:"房间ID",prop:"room_number"}},[r("el-input",{attrs:{disabled:!0},model:{value:e.ruleForm.room_number,callback:function(t){e.$set(e.ruleForm,"room_number",t)},expression:"ruleForm.room_number"}})],1),r("el-form-item",{attrs:{label:"房间名称",prop:"room_name"}},[r("el-input",{attrs:{disabled:!0},model:{value:e.ruleForm.room_name,callback:function(t){e.$set(e.ruleForm,"room_name",t)},expression:"ruleForm.room_name"}})],1)],1),r("div",{staticClass:"flexBox"},[r("el-form-item",{attrs:{label:"房主ID",prop:"live_user_number"}},[r("el-input",{attrs:{disabled:!0},model:{value:e.ruleForm.live_user_number,callback:function(t){e.$set(e.ruleForm,"live_user_number",t)},expression:"ruleForm.live_user_number"}})],1),r("el-form-item",{attrs:{label:"所属公会",prop:"returnGuild"}},[r("el-input",{attrs:{disabled:!0},model:{value:e.returnGuild,callback:function(t){e.returnGuild=t},expression:"returnGuild"}})],1)],1),r("div",{staticClass:"flexBox"},[r("el-form-item",{attrs:{label:"开播时间",prop:"start_time"}},[r("el-date-picker",{attrs:{type:"datetime",placeholder:"选择开播时间",disabled:!0},model:{value:e.ruleForm.start_time,callback:function(t){e.$set(e.ruleForm,"start_time",t)},expression:"ruleForm.start_time"}})],1),r("el-form-item",{attrs:{label:"开播时长",prop:"returnLiveTime"}},[r("el-input",{attrs:{disabled:!0},model:{value:e.returnLiveTime,callback:function(t){e.returnLiveTime=t},expression:"returnLiveTime"}})],1)],1),r("div",{staticClass:"flexBox"},[r("el-form-item",{attrs:{label:"流水",prop:"now_flow"}},[r("el-input",{attrs:{disabled:!0},model:{value:e.ruleForm.now_flow,callback:function(t){e.$set(e.ruleForm,"now_flow",t)},expression:"ruleForm.now_flow"}})],1),r("el-form-item",{attrs:{label:"在线人数",prop:"people"}},[r("el-input",{attrs:{disabled:!0},model:{value:e.ruleForm.people,callback:function(t){e.$set(e.ruleForm,"people",t)},expression:"ruleForm.people"}})],1)],1)])],1)],1)},f=[],b=(r("65c4"),r("1a72")),h=r("0472"),_=r("cf45"),v={components:{drawer:h["a"]},data:function(){return{status:"update",form:{},ruleForm:{room_name:"",is_hide:""},oldParams:{},rules:{room_name:[{required:!1,message:"请输入名称",trigger:"blur"}],is_hide:[{required:!1,message:"请选择活动资源",trigger:"change"}]}}},computed:{disabled:function(){return!1},returnLiveTime:function(){var e=this.ruleForm;return e.live_time?Object(_["c"])(e.live_time):""},returnGuild:function(){var e=this.ruleForm;return e.guild_number?"".concat(e.guild_number,"（").concat(e.guild_number,"）"):""}},methods:{loadParams:function(e){this.openComp();var t=JSON.parse(JSON.stringify(e));t.start_time=1e3*t.start_time,this.$set(this.$data,"ruleForm",t),this.oldParams=JSON.parse(JSON.stringify(this.ruleForm))},openComp:function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];this.$refs.drawer.loadParams(e)},cancel:function(){var e=this;JSON.stringify(this.oldParams)!==JSON.stringify(this.ruleForm)?this.$confirm("关闭弹窗将不会保留您的更改, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){e.openComp(!1)})).catch((function(){})):this.openComp(!1)},update:function(){this.status="update"},submitForm:function(e){var t=this;return Object(i["a"])(Object(a["a"])().mark((function r(){return Object(a["a"])().wrap((function(r){while(1)switch(r.prev=r.next){case 0:t.$refs[e].validate(function(){var e=Object(i["a"])(Object(a["a"])().mark((function e(r){var n,o,i,s,u;return Object(a["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!r){e.next=18;break}if(n=t.ruleForm,o=t.oldParams,i={id:n.id,is_hide:n.is_hide},n.room_name===o.room_name){e.next=9;break}return e.next=7,Object(b["fb"])({room_name:n.room_name,room_number:n.room_number});case 7:s=e.sent,2e3===s.code&&t.$success("修改成功");case 9:if(n.is_hide===o.is_hide){e.next=14;break}return e.next=12,Object(b["Rb"])(i);case 12:u=e.sent,2e3===u.code&&t.$success("操作成功");case 14:t.openComp(!1),t.$emit("getList"),e.next=20;break;case 18:return console.log("error submit!!"),e.abrupt("return",!1);case 20:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 1:case"end":return r.stop()}}),r)})))()},closed:function(){this.$emit("destoryComp")}}},x=v,g=(r("9b05"),r("e607")),w=Object(g["a"])(x,p,f,!1,null,null,null),O=w.exports,j=r("8daa"),y=r("2708"),F=r("279a"),k={name:"RoomList",mixins:[y["a"]],components:{SearchPanel:c["a"],tableList:d["a"],liveDetails:O,menuComp:m["a"]},data:function(){return{tabIndex:"0",menuList:[{name:"直播房间列表"},{name:"直播历史记录"}],classifyList:[],isDestoryComp:!1}},computed:{forms:function(){var e=this;return[{name:"room_number",type:"input",value:"",label:"房间ID",isNum:!0,placeholder:"请输入房间ID"},{name:"room_category_id",type:"select",value:"",keyName:"id",optionLabel:"name",label:"房间类型",placeholder:"请选择",options:this.classifyList},{name:"guild_number",type:"input",value:"",label:"公会",isNum:!0,placeholder:"请输入公会ID"},{name:"dateTimeParams",type:"datePicker",dateType:"datetimerange",format:"yyyy-MM-dd HH:mm:ss",label:"开播时间",value:"",handler:{change:function(t){e.emptyDateTime(),e.setDateTime(t),e.getList()},selectChange:function(t,r){e.emptyDateTime(),e.getList()}}}]},cfgs:function(){var e,t=this,r=[{label:"开播时间",minWidth:"180px",render:function(e,t){return e("span",t.row.start_time?Object(_["h"])(t.row.start_time,"YYYY-MM-DD HH:mm:ss",!0):"无")}},{label:"房间ID",prop:"room_number"},{label:"房间类型",prop:"room_type"},{label:"房间标题",minWidth:"120px",prop:"room_title"},{label:"房间封面",isimg:!0,prop:"room_cover",imgHeight:"50px",minWidth:"100px"},{label:"房主",minWidth:"120px",render:function(e,t){return e("div",[e("div",t.row.nickname),e("div",t.row.user_number||"无")])}},{label:"所属公会",minWidth:"100px",render:function(e,t){return e("div",[e("div",t.row.guild_name),e("div",t.row.guild_number||"无")])}},{label:"已开播时长",minWidth:"120px",render:function(e,t){return e("span",t.row.live_time||"无")}},{label:"流水（钻石）",minWidth:"100px",prop:"now_flow"},{label:"在线人数",prop:"people"},{label:"操作",minWidth:"100px",fixed:"right",render:function(e,r){return e("div",[e("el-button",{props:{type:"danger"},on:{click:function(){t.dissolveFunc(r.row)}}},"关播")])}}],n=[{label:"开播时间",minWidth:"180px",render:function(e,t){return e("span",t.row.start_time?Object(_["h"])(t.row.start_time,"YYYY-MM-DD HH:mm:ss",!0):"无")}},{label:"关播时间",minWidth:"180px",render:function(e,t){return e("span",t.row.end_time?Object(_["h"])(t.row.end_time,"YYYY-MM-DD HH:mm:ss",!0):"无")}},{label:"房间ID",minWidth:"100px",prop:"room_number"},{label:"房间类型",minWidth:"100px",prop:"room_type"},{label:"房间标题",minWidth:"120px",prop:"room_title"},{label:"房主",minWidth:"120px",render:function(e,t){return e("div",[e("div",t.row.nickname),e("div",t.row.user_number||"无")])}},{label:"所属公会",minWidth:"120px",render:function(e,t){return e("div",[e("div",t.row.guild_name),e("div",t.row.guild_number||"无")])}},{label:"开播时长",minWidth:"120px",render:function(e,t){return e("span",t.row.live_time||"无")}},{label:"流水（钻石）",minWidth:"120px",prop:"total_gain"},{label:"进房人数",minWidth:"100px",prop:"enter_user_count"},{label:"送礼用户数",minWidth:"120px",prop:"consume_user_count"},{label:"关闭类型",minWidth:"100px",render:function(e,t){var r=F["a"].DISSOLUTIONTYPELISTCOPY.find((function(e){return e.value===t.row.disband_type}));return e("span",r?r.name:"无")}},{label:"关闭人",minWidth:"120px",prop:"disband_username"}];return e="0"===this.tabIndex?"liveList":"liveHistoryList",{vm:this,url:j["a"].room[e],columns:"0"===this.tabIndex?[].concat(r):[].concat(n)}}},methods:{beforeSearch:function(e){var t=Object(s["a"])(Object(s["a"])({},this.searchParams),this.dateTimeParams);return{page:e.page,pagesize:e.size,room_number:t.room_number,room_category_id:t.room_category_id,guild_number:t.guild_number,start_time:t.start_time?Math.floor(t.start_time/1e3):0,end_time:t.end_time?Math.floor(t.end_time/1e3):0}},getList:function(){this.$refs.tableList.getData()},setDateTime:function(e){var t=e?{start_time:e[0],end_time:e[1]}:{};this.$set(this,"dateTimeParams",t)},emptyDateTime:function(){this.dateTimeParams={}},reset:function(){this.searchParams={},this.dateTimeParams={},this.getList()},onSearch:function(){this.getList()},dissolveFunc:function(e){var t=this;return Object(i["a"])(Object(a["a"])().mark((function r(){return Object(a["a"])().wrap((function(r){while(1)switch(r.prev=r.next){case 0:t.$confirm("是否确认关闭当前直播间?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(i["a"])(Object(a["a"])().mark((function r(){var n,o;return Object(a["a"])().wrap((function(r){while(1)switch(r.prev=r.next){case 0:return n={room_id:e.room_id,uid:e.uid,"admin-token":t.$store.getters.token},r.next=3,Object(l["a"])(n);case 3:o=r.sent,2e3===o.code&&t.$success("关闭成功"),t.getList();case 6:case"end":return r.stop()}}),r)})))).catch((function(){}));case 1:case"end":return r.stop()}}),r)})))()},liveEditFunc:function(e){var t=this;this.isDestoryComp=!0,setTimeout((function(){t.$refs.liveDetails.loadParams(e)}),50)},destoryComp:function(){this.isDestoryComp=!1},getHouse:function(){var e=this;return Object(i["a"])(Object(a["a"])().mark((function t(){var r;return Object(a["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(u["m"])({belong:2});case 2:r=t.sent,r.data.list&&r.data.list.length>0&&r.data.list.unshift({name:"全部",id:""}),e.classifyList=r.data.list||[];case 5:case"end":return t.stop()}}),t)})))()}},created:function(){this.getHouse()}},C=k,L=(r("9881"),Object(g["a"])(C,n,o,!1,null,null,null));t["default"]=L.exports},f803:function(e,t,r){"use strict";r.d(t,"t",(function(){return a})),r.d(t,"g",(function(){return i})),r.d(t,"s",(function(){return s})),r.d(t,"m",(function(){return u})),r.d(t,"p",(function(){return l})),r.d(t,"a",(function(){return m})),r.d(t,"r",(function(){return c})),r.d(t,"j",(function(){return d})),r.d(t,"q",(function(){return p})),r.d(t,"o",(function(){return f})),r.d(t,"n",(function(){return b})),r.d(t,"h",(function(){return h})),r.d(t,"e",(function(){return _})),r.d(t,"v",(function(){return v})),r.d(t,"i",(function(){return x})),r.d(t,"d",(function(){return g})),r.d(t,"u",(function(){return w})),r.d(t,"k",(function(){return O})),r.d(t,"f",(function(){return j})),r.d(t,"w",(function(){return y})),r.d(t,"l",(function(){return F})),r.d(t,"c",(function(){return k})),r.d(t,"b",(function(){return C}));var n=r("829b"),o=r("8daa");function a(e){return Object(n["a"])({url:o["a"].house.updateParty,method:"post",data:e})}function i(e){return Object(n["a"])({url:o["a"].house.delGenre,method:"post",data:e})}function s(e){return Object(n["a"])({url:o["a"].house.saveGenre,method:"post",data:e})}function u(e){return Object(n["a"])({url:o["a"].house.genreList,method:"post",data:e})}function l(e){return Object(n["a"])({url:o["a"].house.partyRoomTypes,method:"post",data:e})}function m(e){return Object(n["a"])({url:o["a"].house.addRoomHot,method:"post",data:e})}function c(e){return Object(n["a"])({url:o["a"].house.roomHotSetting,method:"post",data:e})}function d(e){return Object(n["a"])({url:o["a"].house.deleteRoomHot,method:"post",data:e})}function p(e){return Object(n["a"])({url:o["a"].house.roomBindType,method:"post",data:e})}function f(e){return Object(n["a"])({url:o["a"].house.liveTypes,method:"post",data:e})}function b(e){return Object(n["a"])({url:o["a"].house.liveBindType,method:"post",data:e})}function h(e){return Object(n["a"])({url:o["a"].house.delLiveBind,method:"post",data:e})}function _(e){return Object(n["a"])({url:o["a"].house.createRoomHotConf,method:"post",data:e})}function v(e){return Object(n["a"])({url:o["a"].house.updateRoomHotConf,method:"post",data:e})}function x(e){return Object(n["a"])({url:o["a"].house.deleteRoomHonour,method:"post",data:e})}function g(e){return Object(n["a"])({url:o["a"].house.createRoomHonour,method:"post",data:e})}function w(e){return Object(n["a"])({url:o["a"].house.updateRoomHonour,method:"post",data:e})}function O(e){return Object(n["a"])({url:o["a"].house.deleteRoomHotConf,method:"post",data:e})}function j(e){return Object(n["a"])({url:o["a"].house.createRoomPushFlow,method:"post",data:e})}function y(e){return Object(n["a"])({url:o["a"].house.updateRoomPushFlow,method:"post",data:e})}function F(e){return Object(n["a"])({url:o["a"].house.deleteRoomPushFlow,method:"post",data:e})}function k(e){return Object(n["a"])({url:o["a"].house.changePartyRoom,method:"post",data:e})}function C(e){return Object(n["a"])({url:o["a"].house.canChangeType,method:"post",data:e})}}}]);