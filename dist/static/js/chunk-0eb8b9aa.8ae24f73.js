(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0eb8b9aa"],{"0be4":function(e,t,r){},"127f":function(e,t,r){"use strict";r.d(t,"a",(function(){return l}));var o=r("c7eb"),n=r("1da1"),a=(r("b0c0"),r("d3b7"),r("8237")),s=r.n(a),i=r("9b15"),u={ossParams:{region:"oss-cn-shenzhen",success_action_status:"200",accessKeyId:"LTAI5tFTcRH7h3RXKoYmnWMk",accessKeySecret:"qdx4B8jIh2VjBgBDG5fNfG0Oj21GSP",bucket:"live-huidapay-net"}};function c(e){var t=e.name.split("."),r=s()(Date.now()+t[0]);return r=r+"."+t[t.length-1],r}function l(e){return new Promise(function(){var t=Object(n["a"])(Object(o["a"])().mark((function t(r,n){var a,s;return Object(o["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a=c(e),s=new i({region:u.ossParams.region,accessKeyId:u.ossParams.accessKeyId,accessKeySecret:u.ossParams.accessKeySecret,bucket:u.ossParams.bucket}),t.next=4,s.multipartUpload(a,e);case 4:t.sent,r({url:"https://photo.aiyi.live/"+a});case 6:case"end":return t.stop()}}),t)})));return function(e,r){return t.apply(this,arguments)}}())}},1746:function(e,t,r){"use strict";r("39d9")},"1fe8":function(e,t,r){e.exports=r.p+"static/img/error.e53687be.png"},2708:function(e,t,r){"use strict";var o=r("5530"),n=r("2f62"),a={data:function(){return{tabIndex:"0",page:1,size:10,limit:10,searchParams:{},dataParams:{}}},computed:Object(o["a"])({},Object(n["c"])({permissionArr:function(e){return e.permission.permissionArr}})),mounted:function(){console.log(this.permissionArr,"permissionArr")}};t["a"]=a},"39d9":function(e,t,r){},"5fea":function(e,t,r){"use strict";r("0be4")},a08bf:function(e,t,r){"use strict";r("c335")},c335:function(e,t,r){},f803:function(e,t,r){"use strict";r.d(t,"t",(function(){return a})),r.d(t,"g",(function(){return s})),r.d(t,"s",(function(){return i})),r.d(t,"m",(function(){return u})),r.d(t,"p",(function(){return c})),r.d(t,"a",(function(){return l})),r.d(t,"r",(function(){return m})),r.d(t,"j",(function(){return d})),r.d(t,"q",(function(){return p})),r.d(t,"o",(function(){return f})),r.d(t,"n",(function(){return h})),r.d(t,"h",(function(){return b})),r.d(t,"e",(function(){return g})),r.d(t,"v",(function(){return v})),r.d(t,"i",(function(){return _})),r.d(t,"d",(function(){return y})),r.d(t,"u",(function(){return O})),r.d(t,"k",(function(){return j})),r.d(t,"f",(function(){return C})),r.d(t,"w",(function(){return x})),r.d(t,"l",(function(){return w})),r.d(t,"c",(function(){return F})),r.d(t,"b",(function(){return k}));var o=r("829b"),n=r("8daa");function a(e){return Object(o["a"])({url:n["a"].house.updateParty,method:"post",data:e})}function s(e){return Object(o["a"])({url:n["a"].house.delGenre,method:"post",data:e})}function i(e){return Object(o["a"])({url:n["a"].house.saveGenre,method:"post",data:e})}function u(e){return Object(o["a"])({url:n["a"].house.genreList,method:"post",data:e})}function c(e){return Object(o["a"])({url:n["a"].house.partyRoomTypes,method:"post",data:e})}function l(e){return Object(o["a"])({url:n["a"].house.addRoomHot,method:"post",data:e})}function m(e){return Object(o["a"])({url:n["a"].house.roomHotSetting,method:"post",data:e})}function d(e){return Object(o["a"])({url:n["a"].house.deleteRoomHot,method:"post",data:e})}function p(e){return Object(o["a"])({url:n["a"].house.roomBindType,method:"post",data:e})}function f(e){return Object(o["a"])({url:n["a"].house.liveTypes,method:"post",data:e})}function h(e){return Object(o["a"])({url:n["a"].house.liveBindType,method:"post",data:e})}function b(e){return Object(o["a"])({url:n["a"].house.delLiveBind,method:"post",data:e})}function g(e){return Object(o["a"])({url:n["a"].house.createRoomHotConf,method:"post",data:e})}function v(e){return Object(o["a"])({url:n["a"].house.updateRoomHotConf,method:"post",data:e})}function _(e){return Object(o["a"])({url:n["a"].house.deleteRoomHonour,method:"post",data:e})}function y(e){return Object(o["a"])({url:n["a"].house.createRoomHonour,method:"post",data:e})}function O(e){return Object(o["a"])({url:n["a"].house.updateRoomHonour,method:"post",data:e})}function j(e){return Object(o["a"])({url:n["a"].house.deleteRoomHotConf,method:"post",data:e})}function C(e){return Object(o["a"])({url:n["a"].house.createRoomPushFlow,method:"post",data:e})}function x(e){return Object(o["a"])({url:n["a"].house.updateRoomPushFlow,method:"post",data:e})}function w(e){return Object(o["a"])({url:n["a"].house.deleteRoomPushFlow,method:"post",data:e})}function F(e){return Object(o["a"])({url:n["a"].house.changePartyRoom,method:"post",data:e})}function k(e){return Object(o["a"])({url:n["a"].house.canChangeType,method:"post",data:e})}},ff5d:function(e,t,r){"use strict";r.r(t);var o=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"roomConfig-roomMessage-box"},[r("div",{staticClass:"searchParams"},[r("SearchPanel",{attrs:{forms:e.forms,"show-reset":!0,"show-search-btn":!0},on:{onReset:e.reset,onSearch:e.onSearch},model:{value:e.searchParams,callback:function(t){e.searchParams=t},expression:"searchParams"}})],1),r("tableList",{ref:"tableList",attrs:{cfgs:e.cfgs}}),e.isDestoryComp?r("roomComp",{ref:"roomComp",on:{destoryComp:e.destoryComp,getList:e.getList}}):e._e(),e.isDestoryComp?r("typeComp",{ref:"typeComp",on:{destoryComp:e.destoryComp,getList:e.getList}}):e._e()],1)},n=[],a=r("c7eb"),s=r("1da1"),i=r("5530"),u=r("f803"),c=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"roomConfig-typeComp-box"},[r("el-dialog",{attrs:{title:"设置房间分类",visible:e.dialogVisible,width:"500px","before-close":e.handleClose},on:{"update:visible":function(t){e.dialogVisible=t}}},[r("div",{staticClass:"btnBox"},[r("el-select",{staticStyle:{"margin-right":"10px"},attrs:{placeholder:"请选择房间分类"},model:{value:e.ruleForm.room_type,callback:function(t){e.$set(e.ruleForm,"room_type",t)},expression:"ruleForm.room_type"}},e._l(e.typeList,(function(e){return r("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{attrs:{type:"success"},on:{click:e.bindTypes}},[e._v("确 定")])],1)])],1)},l=[],m={data:function(){return{dialogVisible:!1,typeList:[],ruleForm:{user_id:null,room_type:null,guild_number:null}}},methods:{handleClose:function(){this.dialogVisible=!1},loadParams:function(e){this.dialogVisible=!0,this.ruleForm=Object(i["a"])({},e),this.getCanChangeTypeData(e.user_id)},closed:function(){this.$emit("destoryComp")},bindTypes:function(){var e=this;return Object(s["a"])(Object(a["a"])().mark((function t(){var r,o,n,s;return Object(a["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.ruleForm.guild_number+""!=="0"){t.next=3;break}return e.$error("非公会房间,不可修改房间分类"),t.abrupt("return",!1);case 3:return r=e.$data.ruleForm,o=r.room_type,n=r.user_id,t.next=6,Object(u["c"])({room_type:o,user_id:n});case 6:s=t.sent,2e3===s.code&&(e.$success("添加成功"),e.dialogVisible=!1,e.$emit("getList"));case 8:case"end":return t.stop()}}),t)})))()},getCanChangeTypeData:function(e){var t=this;return Object(s["a"])(Object(a["a"])().mark((function r(){var o;return Object(a["a"])().wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,Object(u["b"])({user_id:e});case 2:o=r.sent,o.code+""==="2000"&&(t.typeList=o.data);case 4:case"end":return r.stop()}}),r)})))()}}},d=m,p=(r("1746"),r("2877")),f=Object(p["a"])(d,c,l,!1,null,null,null),h=f.exports,b=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"roomConfig-roomComp-box"},[r("drawer",{ref:"drawer",attrs:{size:"600px",title:e.title,isShowUpdate:!0,disabled:e.disabled},on:{cancel:e.cancel,submitForm:e.submitForm,closed:e.closed,update:e.update}},[r("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{slot:"body",model:e.ruleForm,rules:e.rules,"label-width":"90px","label-suffix":":","hide-required-asterisk":"see"===e.status},slot:"body"},[r("div",{staticClass:"flexBox"},[r("el-form-item",{attrs:{label:"房间ID"}},[r("el-input",{attrs:{disabled:!0},model:{value:e.ruleForm.room_number,callback:function(t){e.$set(e.ruleForm,"room_number",t)},expression:"ruleForm.room_number"}})],1),r("el-form-item",{attrs:{label:"房主"}},[r("el-input",{attrs:{disabled:!0},model:{value:e.returnName,callback:function(t){e.returnName=t},expression:"returnName"}})],1)],1),r("div",{staticClass:"flexBox"},[r("el-form-item",{attrs:{label:"房间标题",prop:"room_title"}},[r("el-input",{attrs:{disabled:e.disabled},model:{value:e.ruleForm.room_title,callback:function(t){e.$set(e.ruleForm,"room_title",t)},expression:"ruleForm.room_title"}})],1)],1),r("el-form-item",{attrs:{label:"房间封面",prop:"room_cover"}},[r("uploadImg",{ref:"uploadImg",attrs:{imgUrl:e.ruleForm.room_cover,name:"room_cover",accept:".png,.jpg,.jpeg",disabled:e.disabled},on:{validateField:e.validateField},model:{value:e.ruleForm.room_cover,callback:function(t){e.$set(e.ruleForm,"room_cover",t)},expression:"ruleForm.room_cover"}})],1),r("el-form-item",{attrs:{label:"房间公告",prop:"room_notice"}},[r("el-input",{attrs:{type:"textarea",rows:4,disabled:e.disabled},model:{value:e.ruleForm.room_notice,callback:function(t){e.$set(e.ruleForm,"room_notice",t)},expression:"ruleForm.room_notice"}})],1)],1)],1)],1)},g=[],v=(r("99af"),r("b64b"),r("e9c4"),r("0472")),_=r("40cb"),y=r("279a"),O={components:{uploadImg:_["a"],drawer:v["a"]},data:function(){return{status:"add",typeList:[],statusList:y["a"].HOUSEMESSAGESTATUSLIST,recommendList:[{name:"是",value:1},{name:"否",value:0}],ruleForm:{room_number:"",room_title:"",room_category_id:"",room_cover:"",room_notice:""},oldParams:{},rules:{room_title:[{required:!0,message:"请输入房间标题",trigger:"blur"}],room_notice:[{required:!1,message:"请输入房间公告",trigger:"blur"}],room_cover:[{required:!0,message:"请上传房间封面",trigger:"change"}]}}},computed:{title:function(){return"see"===this.status?"查看房间信息":"update"===this.status?"修改房间信息":void 0},disabled:function(){return"see"===this.status},returnName:function(){return"".concat(this.ruleForm.nickname,"（").concat(this.ruleForm.user_number,"）")}},methods:{handleClose:function(){this.openComp(!1)},loadParams:function(e,t,r){this.openComp(),this.typeList=r,this.status=e;var o=JSON.parse(JSON.stringify(t));this.$set(this.$data,"ruleForm",o),this.oldParams=JSON.parse(JSON.stringify(this.ruleForm))},openComp:function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];this.$refs.drawer.loadParams(e)},submitForm:function(e){var t=this;return Object(s["a"])(Object(a["a"])().mark((function r(){return Object(a["a"])().wrap((function(r){while(1)switch(r.prev=r.next){case 0:t.$refs[e].validate(function(){var e=Object(s["a"])(Object(a["a"])().mark((function e(r){var o,n,s;return Object(a["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!r){e.next=9;break}return o=t.ruleForm,n={id:o.room_id,room_title:o.room_title,room_category_id:o.room_category_id,room_cover:o.room_cover,room_notice:o.room_notice},e.next=5,Object(u["t"])(n);case 5:s=e.sent,2e3===s.code&&("add"===t.status?t.$success("新增成功"):t.$success("修改成功"),t.openComp(!1),t.$emit("getList")),e.next=11;break;case 9:return console.log("error submit!!"),e.abrupt("return",!1);case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 1:case"end":return r.stop()}}),r)})))()},resetForm:function(e){this.$refs[e].resetFields()},closed:function(){this.$emit("destoryComp")},validateField:function(e){this.$refs.ruleForm.validateField([e])},update:function(){this.status="update"},cancel:function(){var e=this;JSON.stringify(this.oldParams)!==JSON.stringify(this.ruleForm)?this.$confirm("关闭弹窗将不会保留您的更改, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){e.openComp(!1)})).catch((function(){})):this.openComp(!1)}}},j=O,C=(r("a08bf"),Object(p["a"])(j,b,g,!1,null,"687ef7a6",null)),x=C.exports,w=r("04a2"),F=r("4053"),k=r("8daa"),P=r("2708"),L={mixins:[P["a"]],components:{SearchPanel:w["a"],tableList:F["a"],typeComp:h,roomComp:x},data:function(){return{isDestoryComp:!1,classifyList:[],searchParams:{room_number:"",guild_number:"",room_category_id:""}}},computed:{forms:function(){return[{name:"room_number",type:"input",value:"",label:"房间ID",isNum:!0,placeholder:"请输入房间ID"},{name:"guild_number",type:"input",value:"",label:"公会ID",isNum:!0,placeholder:"请输入公会ID"},{name:"room_category_id",type:"select",value:"",keyName:"id",optionLabel:"name",label:"房间类型",placeholder:"请选择",options:this.classifyList}]},cfgs:function(){var e=this;return{vm:this,url:k["a"].house.partyRoomList,columns:[{label:"房间",minWidth:"100px",render:function(e,t){return e("div",[e("div",t.row.room_title||"无"),e("div",t.row.room_number||"无")])}},{label:"房间封面",isimg:!0,prop:"room_cover",imgHeight:"50px",minWidth:"100px"},{label:"房间类型",minWidth:"100px",render:function(e,t){return e("span",t.row.room_category_name||"无")}},{label:"所属公会",minWidth:"100px",render:function(e,t){return e("div",[e("div",t.row.guild_name),e("div",t.row.guild_number||"无")])}},{label:"操作",minWidth:"180px",fixed:"right",render:function(t,r){return t("div",[t("el-button",{props:{type:"primary",disabled:!r.row.guild_number},on:{click:function(){e.setHouseClassify(r.row)}}},"修改房间类型"),t("el-button",{props:{type:"primary"},on:{click:function(){e.update(r.row)}}},"修改")])}}]}}},methods:{beforeSearch:function(e){var t=Object(i["a"])({},this.searchParams),r={room_number:t.room_number,guild_number:t.guild_number,room_category_id:t.room_category_id};return Object(i["a"])({page:e.page,pagesize:e.size},r)},getList:function(){this.$refs.tableList.getData()},reset:function(){this.searchParams={},this.getList()},onSearch:function(){this.getList()},update:function(e){this.load("update",e)},load:function(e,t){var r=this;this.isDestoryComp=!0,setTimeout((function(){r.$refs.roomComp.loadParams(e,t,r.classifyList)}),50)},destoryComp:function(){this.isDestoryComp=!1},getHouse:function(){var e=this;return Object(s["a"])(Object(a["a"])().mark((function t(){var r;return Object(a["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(u["p"])({belong:2});case 2:r=t.sent,r.data.list&&r.data.list.length>0&&r.data.list.unshift({name:"全部",id:""}),e.classifyList=r.data.list||[];case 5:case"end":return t.stop()}}),t)})))()},setHouseClassify:function(e){var t=this;this.isDestoryComp=!0,setTimeout((function(){t.$refs.typeComp.loadParams(e)}),50)}},created:function(){this.getHouse()}},$=L,S=(r("5fea"),Object(p["a"])($,o,n,!1,null,null,null));t["default"]=S.exports}}]);