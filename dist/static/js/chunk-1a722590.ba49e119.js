(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1a722590"],{"0fce":function(t,e,o){"use strict";o.r(e);var r=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"roomConfig-roomMessage-box"},[o("div",{staticClass:"searchParams"},[o("SearchPanel",{attrs:{forms:t.forms,"show-reset":!0,"show-search-btn":!0},on:{onReset:t.reset,onSearch:t.onSearch},model:{value:t.searchParams,callback:function(e){t.searchParams=e},expression:"searchParams"}})],1),o("tableList",{ref:"tableList",attrs:{cfgs:t.cfgs}}),t.isDestoryComp?o("roomComp",{ref:"roomComp",on:{destoryComp:t.destoryComp,getList:t.getList}}):t._e(),t.isDestoryComp?o("typeComp",{ref:"typeComp",on:{destoryComp:t.destoryComp,getList:t.getList}}):t._e()],1)},n=[],a=o("40bd"),s=o("7e8c"),i=o("4672"),u=o("f803"),c=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"roomConfig-typeComp-box"},[o("el-dialog",{attrs:{title:"设置房间分类",visible:t.dialogVisible,width:"500px","before-close":t.handleClose},on:{"update:visible":function(e){t.dialogVisible=e}}},[o("div",{staticClass:"btnBox"},[o("el-select",{staticStyle:{"margin-right":"10px"},attrs:{placeholder:"请选择房间分类"},model:{value:t.type_id,callback:function(e){t.type_id=e},expression:"type_id"}},t._l(t.typeList,(function(t){return o("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})})),1)],1),o("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{attrs:{type:"success"},on:{click:t.bindTypes}},[t._v("确 定")])],1)])],1)},l=[],m=(o("96c5"),o("8bda"),o("48d4"),{data:function(){return{dialogVisible:!1,typeList:[],type_id:null,room_number:null,guild_number:null}},methods:{handleClose:function(){this.dialogVisible=!1},loadParams:function(t,e){this.dialogVisible=!0,this.room_number=t.room_number,this.guild_number=t.guild_number,e&&e.length>0&&(this.typeList=e.filter((function(t){return"全部"!=t.name})))},closed:function(){this.$emit("destoryComp")},bindTypes:function(){var t=this;return Object(s["a"])(Object(a["a"])().mark((function e(){var o,r,n,s;return Object(a["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.guild_number+""!=="0"){e.next=3;break}return t.$error("非公会房间,不可修改房间分类"),e.abrupt("return",!1);case 3:return o=t.$data,r=o.room_number,n=o.type_id,e.next=6,Object(u["q"])({room_number:r,type_id:n});case 6:s=e.sent,2e3===s.code&&(t.$success("添加成功"),t.dialogVisible=!1);case 8:case"end":return e.stop()}}),e)})))()}}}),d=m,p=(o("95d4"),o("e607")),f=Object(p["a"])(d,c,l,!1,null,null,null),h=f.exports,b=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"roomConfig-roomComp-box"},[o("drawer",{ref:"drawer",attrs:{size:"600px",title:t.title,isShowUpdate:!0,disabled:t.disabled},on:{cancel:t.cancel,submitForm:t.submitForm,closed:t.closed,update:t.update}},[o("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{slot:"body",model:t.ruleForm,rules:t.rules,"label-width":"90px","label-suffix":":","hide-required-asterisk":"see"===t.status},slot:"body"},[o("div",{staticClass:"flexBox"},[o("el-form-item",{attrs:{label:"房间ID"}},[o("el-input",{attrs:{disabled:!0},model:{value:t.ruleForm.room_number,callback:function(e){t.$set(t.ruleForm,"room_number",e)},expression:"ruleForm.room_number"}})],1),o("el-form-item",{attrs:{label:"房主"}},[o("el-input",{attrs:{disabled:!0},model:{value:t.returnName,callback:function(e){t.returnName=e},expression:"returnName"}})],1)],1),o("div",{staticClass:"flexBox"},[o("el-form-item",{attrs:{label:"房间标题",prop:"room_title"}},[o("el-input",{attrs:{disabled:t.disabled},model:{value:t.ruleForm.room_title,callback:function(e){t.$set(t.ruleForm,"room_title",e)},expression:"ruleForm.room_title"}})],1)],1),o("el-form-item",{attrs:{label:"房间封面",prop:"room_cover"}},[o("uploadImg",{ref:"uploadImg",attrs:{imgUrl:t.ruleForm.room_cover,name:"room_cover",accept:".png,.jpg,.jpeg",disabled:t.disabled},on:{validateField:t.validateField},model:{value:t.ruleForm.room_cover,callback:function(e){t.$set(t.ruleForm,"room_cover",e)},expression:"ruleForm.room_cover"}})],1),o("el-form-item",{attrs:{label:"房间公告",prop:"room_notice"}},[o("el-input",{attrs:{type:"textarea",rows:4,disabled:t.disabled},model:{value:t.ruleForm.room_notice,callback:function(e){t.$set(t.ruleForm,"room_notice",e)},expression:"ruleForm.room_notice"}})],1)],1)],1)],1)},_=[],g=(o("5250"),o("65c4"),o("0472")),v=o("40cb"),y=o("279a"),O={components:{uploadImg:v["a"],drawer:g["a"]},data:function(){return{status:"add",typeList:[],statusList:y["a"].HOUSEMESSAGESTATUSLIST,recommendList:[{name:"是",value:1},{name:"否",value:0}],ruleForm:{room_number:"",room_title:"",room_category_id:"",room_cover:"",room_notice:""},oldParams:{},rules:{room_title:[{required:!0,message:"请输入房间标题",trigger:"blur"}],room_notice:[{required:!1,message:"请输入房间公告",trigger:"blur"}],room_cover:[{required:!0,message:"请上传房间封面",trigger:"change"}]}}},computed:{title:function(){return"see"===this.status?"查看房间信息":"update"===this.status?"修改房间信息":void 0},disabled:function(){return"see"===this.status},returnName:function(){return"".concat(this.ruleForm.nickname,"（").concat(this.ruleForm.user_number,"）")}},methods:{handleClose:function(){this.openComp(!1)},loadParams:function(t,e,o){this.openComp(),this.typeList=o,this.status=t;var r=JSON.parse(JSON.stringify(e));this.$set(this.$data,"ruleForm",r),this.oldParams=JSON.parse(JSON.stringify(this.ruleForm))},openComp:function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];this.$refs.drawer.loadParams(t)},submitForm:function(t){var e=this;return Object(s["a"])(Object(a["a"])().mark((function o(){return Object(a["a"])().wrap((function(o){while(1)switch(o.prev=o.next){case 0:e.$refs[t].validate(function(){var t=Object(s["a"])(Object(a["a"])().mark((function t(o){var r,n,s;return Object(a["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!o){t.next=9;break}return r=e.ruleForm,n={id:r.id,room_title:r.room_title,room_category_id:r.room_category_id,room_cover:r.room_cover,room_notice:r.room_notice},t.next=5,Object(u["t"])(n);case 5:s=t.sent,2e3===s.code&&("add"===e.status?e.$success("新增成功"):e.$success("修改成功"),e.openComp(!1),e.$emit("getList")),t.next=11;break;case 9:return console.log("error submit!!"),t.abrupt("return",!1);case 11:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}());case 1:case"end":return o.stop()}}),o)})))()},resetForm:function(t){this.$refs[t].resetFields()},closed:function(){this.$emit("destoryComp")},validateField:function(t){this.$refs.ruleForm.validateField([t])},update:function(){this.status="update"},cancel:function(){var t=this;JSON.stringify(this.oldParams)!==JSON.stringify(this.ruleForm)?this.$confirm("关闭弹窗将不会保留您的更改, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){t.openComp(!1)})).catch((function(){})):this.openComp(!1)}}},j=O,x=(o("4480"),Object(p["a"])(j,b,_,!1,null,"44e82b21",null)),C=x.exports,w=o("04a2"),F=o("4053"),P=o("8daa"),k=o("2708"),L={mixins:[k["a"]],components:{SearchPanel:w["a"],tableList:F["a"],typeComp:h,roomComp:C},data:function(){return{isDestoryComp:!1,classifyList:[],searchParams:{party_status:2}}},computed:{forms:function(){return[{name:"room_number",type:"input",value:"",label:"房间ID",isNum:!0,placeholder:"请输入房间ID"}]},cfgs:function(){var t=this;return{vm:this,url:P["a"].accompany.roomShouList,columns:[{label:"房间",minWidth:"100px",render:function(t,e){return t("div",[t("div",e.row.room_title||"无"),t("div",e.row.room_number||"无")])}},{label:"房间封面",isimg:!0,prop:"room_cover",imgHeight:"50px",minWidth:"100px"},{label:"房间类型",minWidth:"100px",render:function(t,e){return t("span",e.row.room_category_name||"无")}},{label:"操作",minWidth:"180px",fixed:"right",render:function(e,o){return e("div",[e("el-button",{props:{type:"primary"},on:{click:function(){t.update(o.row)}}},"修改")])}}]}}},methods:{beforeSearch:function(t){var e=Object(i["a"])({},this.searchParams),o={room_number:e.room_number,party_status:e.party_status,room_category_id:e.room_category_id,guild_number:e.guild_number};return Object(i["a"])({page:t.page,pagesize:t.size},o)},getList:function(){this.$refs.tableList.getData()},reset:function(){this.searchParams={party_status:2},this.getList()},onSearch:function(){this.getList()},update:function(t){this.load("update",t)},load:function(t,e){var o=this;this.isDestoryComp=!0,setTimeout((function(){o.$refs.roomComp.loadParams(t,e,o.classifyList)}),50)},destoryComp:function(){this.isDestoryComp=!1},getHouse:function(){var t=this;return Object(s["a"])(Object(a["a"])().mark((function e(){var o;return Object(a["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(u["p"])({belong:2});case 2:o=e.sent,o.data.list&&o.data.list.length>0&&o.data.list.unshift({name:"全部",id:""}),t.classifyList=o.data.list||[];case 5:case"end":return e.stop()}}),e)})))()},setHouseClassify:function(t){var e=this;this.isDestoryComp=!0,setTimeout((function(){e.$refs.typeComp.loadParams(t,e.classifyList)}),50)},hotRecommend:function(t,e){var o=this;return Object(s["a"])(Object(a["a"])().mark((function e(){var r,n;return Object(a["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return r={room_title:t.room_title,id:t.id,room_cover:t.room_cover,room_category_id:t.room_category_id,room_notice:t.room_notice},e.next=3,Object(u["t"])(r);case 3:n=e.sent,2e3===n.code&&(o.$success("操作成功"),o.getList());case 5:case"end":return e.stop()}}),e)})))()}},created:function(){this.getHouse()}},S=L,$=(o("41de"),Object(p["a"])(S,r,n,!1,null,null,null));e["default"]=$.exports},"127f":function(t,e,o){"use strict";o.d(e,"a",(function(){return l}));var r=o("40bd"),n=o("7e8c"),a=(o("48d4"),o("8bda"),o("897d")),s=o.n(a),i=o("4109"),u={ossParams:{region:"oss-cn-shenzhen",success_action_status:"200",accessKeyId:"LTAI5tFTcRH7h3RXKoYmnWMk",accessKeySecret:"qdx4B8jIh2VjBgBDG5fNfG0Oj21GSP",bucket:"live-huidapay-net"}};function c(t){var e=t.name.split("."),o=s()(Date.now()+e[0]);return o=o+"."+e[e.length-1],o}function l(t){return new Promise(function(){var e=Object(n["a"])(Object(r["a"])().mark((function e(o,n){var a,s;return Object(r["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a=c(t),s=new i({region:u.ossParams.region,accessKeyId:u.ossParams.accessKeyId,accessKeySecret:u.ossParams.accessKeySecret,bucket:u.ossParams.bucket}),e.next=4,s.multipartUpload(a,t);case 4:e.sent,o({url:"https://photo.aiyi.live/"+a});case 6:case"end":return e.stop()}}),e)})));return function(t,o){return e.apply(this,arguments)}}())}},"1fe8":function(t,e,o){t.exports=o.p+"static/img/error.e53687be.png"},2708:function(t,e,o){"use strict";var r=o("4672"),n=o("52c1"),a={data:function(){return{tabIndex:"0",page:1,size:10,limit:10,searchParams:{},dataParams:{}}},computed:Object(r["a"])({},Object(n["c"])({permissionArr:function(t){return t.permission.permissionArr}})),mounted:function(){console.log(this.permissionArr,"permissionArr")}};e["a"]=a},"2c39":function(t,e,o){},"41de":function(t,e,o){"use strict";o("7a58")},4480:function(t,e,o){"use strict";o("8eb6")},"7a58":function(t,e,o){},"8eb6":function(t,e,o){},"95d4":function(t,e,o){"use strict";o("2c39")},f803:function(t,e,o){"use strict";o.d(e,"t",(function(){return a})),o.d(e,"g",(function(){return s})),o.d(e,"s",(function(){return i})),o.d(e,"m",(function(){return u})),o.d(e,"p",(function(){return c})),o.d(e,"a",(function(){return l})),o.d(e,"r",(function(){return m})),o.d(e,"j",(function(){return d})),o.d(e,"q",(function(){return p})),o.d(e,"o",(function(){return f})),o.d(e,"n",(function(){return h})),o.d(e,"h",(function(){return b})),o.d(e,"e",(function(){return _})),o.d(e,"v",(function(){return g})),o.d(e,"i",(function(){return v})),o.d(e,"d",(function(){return y})),o.d(e,"u",(function(){return O})),o.d(e,"k",(function(){return j})),o.d(e,"f",(function(){return x})),o.d(e,"w",(function(){return C})),o.d(e,"l",(function(){return w})),o.d(e,"c",(function(){return F})),o.d(e,"b",(function(){return P}));var r=o("829b"),n=o("8daa");function a(t){return Object(r["a"])({url:n["a"].house.updateParty,method:"post",data:t})}function s(t){return Object(r["a"])({url:n["a"].house.delGenre,method:"post",data:t})}function i(t){return Object(r["a"])({url:n["a"].house.saveGenre,method:"post",data:t})}function u(t){return Object(r["a"])({url:n["a"].house.genreList,method:"post",data:t})}function c(t){return Object(r["a"])({url:n["a"].house.partyRoomTypes,method:"post",data:t})}function l(t){return Object(r["a"])({url:n["a"].house.addRoomHot,method:"post",data:t})}function m(t){return Object(r["a"])({url:n["a"].house.roomHotSetting,method:"post",data:t})}function d(t){return Object(r["a"])({url:n["a"].house.deleteRoomHot,method:"post",data:t})}function p(t){return Object(r["a"])({url:n["a"].house.roomBindType,method:"post",data:t})}function f(t){return Object(r["a"])({url:n["a"].house.liveTypes,method:"post",data:t})}function h(t){return Object(r["a"])({url:n["a"].house.liveBindType,method:"post",data:t})}function b(t){return Object(r["a"])({url:n["a"].house.delLiveBind,method:"post",data:t})}function _(t){return Object(r["a"])({url:n["a"].house.createRoomHotConf,method:"post",data:t})}function g(t){return Object(r["a"])({url:n["a"].house.updateRoomHotConf,method:"post",data:t})}function v(t){return Object(r["a"])({url:n["a"].house.deleteRoomHonour,method:"post",data:t})}function y(t){return Object(r["a"])({url:n["a"].house.createRoomHonour,method:"post",data:t})}function O(t){return Object(r["a"])({url:n["a"].house.updateRoomHonour,method:"post",data:t})}function j(t){return Object(r["a"])({url:n["a"].house.deleteRoomHotConf,method:"post",data:t})}function x(t){return Object(r["a"])({url:n["a"].house.createRoomPushFlow,method:"post",data:t})}function C(t){return Object(r["a"])({url:n["a"].house.updateRoomPushFlow,method:"post",data:t})}function w(t){return Object(r["a"])({url:n["a"].house.deleteRoomPushFlow,method:"post",data:t})}function F(t){return Object(r["a"])({url:n["a"].house.changePartyRoom,method:"post",data:t})}function P(t){return Object(r["a"])({url:n["a"].house.canChangeType,method:"post",data:t})}}}]);