(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7b5f728d"],{"0051":function(e,t,a){},1253:function(e,t,a){"use strict";a("74d5")},"127f":function(e,t,a){"use strict";a.d(t,"a",(function(){return l}));var r=a("40bd"),n=a("7e8c"),o=(a("48d4"),a("8bda"),a("897d")),s=a.n(o),u=a("4109"),i={ossParams:{region:"oss-cn-shenzhen",success_action_status:"200",accessKeyId:"LTAI5tFTcRH7h3RXKoYmnWMk",accessKeySecret:"qdx4B8jIh2VjBgBDG5fNfG0Oj21GSP",bucket:"live-huidapay-net"}};function c(e){var t=e.name.split("."),a=s()(Date.now()+t[0]);return a=a+"."+t[t.length-1],a}function l(e){return new Promise(function(){var t=Object(n["a"])(Object(r["a"])().mark((function t(a,n){var o,s;return Object(r["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return o=c(e),s=new u({region:i.ossParams.region,accessKeyId:i.ossParams.accessKeyId,accessKeySecret:i.ossParams.accessKeySecret,bucket:i.ossParams.bucket}),t.next=4,s.multipartUpload(o,e);case 4:t.sent,a({url:"https://photo.aiyi.live/"+o});case 6:case"end":return t.stop()}}),t)})));return function(e,a){return t.apply(this,arguments)}}())}},"1fe8":function(e,t,a){e.exports=a.p+"static/img/error.e53687be.png"},2708:function(e,t,a){"use strict";var r=a("4672"),n=a("52c1"),o={data:function(){return{tabIndex:"0",page:1,size:10,limit:10,searchParams:{},dataParams:{}}},computed:Object(r["a"])({},Object(n["c"])({permissionArr:function(e){return e.permission.permissionArr}})),mounted:function(){console.log(this.permissionArr,"permissionArr")}};t["a"]=o},"74d5":function(e,t,a){},"83d6c":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"room-livelist"},[a("menuComp",{ref:"menuComp",attrs:{menuList:e.menuList},model:{value:e.tabIndex,callback:function(t){e.tabIndex=t},expression:"tabIndex"}}),"0"===e.tabIndex?a("div",{staticClass:"searchParams"},[a("SearchPanel",{attrs:{forms:e.forms,"show-add":!0,"show-search-btn":!0},on:{add:e.add,onSearch:e.onSearch},model:{value:e.searchParams,callback:function(t){e.searchParams=t},expression:"searchParams"}})],1):"1"===e.tabIndex?a("div",{staticClass:"share-filter-grid-box",attrs:{shadow:"always"}},[a("el-form",{ref:"form",attrs:{model:e.fromData,"label-width":"100px"}},[a("el-form-item",{attrs:{label:"每日直播时间"}},[a("el-row",{attrs:{gutter:20}},[a("el-col",{staticClass:"body_box-col",attrs:{span:14}},[a("el-input",{attrs:{oninput:"this.value=this.value.replace(/[^\\d]/g,'');"},model:{value:e.fromData.kv_value,callback:function(t){e.$set(e.fromData,"kv_value",t)},expression:"fromData.kv_value"}}),a("div",{staticClass:"col-unit"},[e._v("小时")])],1),a("el-col",{attrs:{span:8}},[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.onSave(e.fromData)}}},[e._v("设置")])],1)],1)],1)],1)],1):e._e(),"0"===e.tabIndex?a("tableList",{ref:"tableList",attrs:{cfgs:e.cfgs},on:{saleAmunt:e.saleAmunt}}):e._e(),e.isDestoryComp?a("categoryComp",{ref:"categoryComp",on:{destoryComp:e.destoryComp,getList:e.getList}}):e._e()],1)},n=[],o=a("40bd"),s=a("7e8c"),u=a("4672"),i=(a("23dc"),a("8bda"),a("48d4"),a("1a72")),c=a("f803"),l=a("3923"),d=a("04a2"),m=a("4053"),p=a("8daa"),f=a("cf45"),h=a("2708"),b=a("279a"),g=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"roomConfig-categoryComp-box"},[a("drawer",{ref:"drawer",attrs:{size:"450px",title:e.title,isShowUpdate:!0,disabled:e.disabled},on:{cancel:e.cancel,submitForm:e.submitForm,closed:e.closed,update:e.update}},[a("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{slot:"body",model:e.ruleForm,rules:e.rules,"label-width":"85px","label-suffix":":","hide-required-asterisk":"see"===e.status},slot:"body"},[a("el-form-item",{attrs:{label:"房间类型",prop:"name"}},[a("el-input",{attrs:{maxlength:"6",disabled:e.disabled},model:{value:e.ruleForm.name,callback:function(t){e.$set(e.ruleForm,"name",t)},expression:"ruleForm.name"}})],1),a("el-form-item",{attrs:{label:"麦位模式",prop:"seat_model"}},[a("el-select",{attrs:{placeholder:"请选择麦位模式",disabled:e.disabled},model:{value:e.ruleForm.seat_model,callback:function(t){e.$set(e.ruleForm,"seat_model",t)},expression:"ruleForm.seat_model"}},e._l(e.seatList,(function(e){return a("el-option",{key:e.value,attrs:{label:e.name,value:e.value}})})),1)],1),a("el-form-item",{attrs:{label:"权重排序",prop:"sort"}},[a("el-input",{attrs:{disabled:e.disabled},model:{value:e.ruleForm.sort,callback:function(t){e.$set(e.ruleForm,"sort",t)},expression:"ruleForm.sort"}})],1),a("el-form-item",{attrs:{label:"类型色值",prop:"color"}},[a("el-input",{attrs:{disabled:e.disabled},model:{value:e.ruleForm.color,callback:function(t){e.$set(e.ruleForm,"color",t)},expression:"ruleForm.color"}})],1),a("el-form-item",{attrs:{label:"分类图标",prop:"icon"}},[a("uploadImg",{ref:"uploadImg",attrs:{imgUrl:e.ruleForm.icon,name:"icon",accept:".png,.jpg,.jpeg",disabled:e.disabled},on:{validateField:e.validateField},model:{value:e.ruleForm.icon,callback:function(t){e.$set(e.ruleForm,"icon",t)},expression:"ruleForm.icon"}})],1),a("el-form-item",{attrs:{label:"类型图标",prop:"img"}},[a("uploadImg",{ref:"uploadImg",attrs:{imgUrl:e.ruleForm.img,name:"img",accept:".png,.jpg,.jpeg",disabled:e.disabled},on:{validateField:e.validateField},model:{value:e.ruleForm.img,callback:function(t){e.$set(e.ruleForm,"img",t)},expression:"ruleForm.img"}})],1)],1)],1)],1)},v=[],j=(a("65c4"),a("0472")),O=a("40cb"),w={components:{uploadImg:O["a"],drawer:j["a"]},data:function(){return{belongList:b["a"].CATEGORYBUSINESSTYPELIST,seatList:[{name:"普通模式(9麦位)",value:1}],status:"add",ruleForm:{name:"",belong:null,sort:null,icon:"",color:null,img:""},oldParams:{},rules:{name:[{required:!0,message:"请输入房间类型",trigger:"blur"},{message:"仅限输入中英文、数字",trigger:"blur",pattern:/^[\u4e00-\u9fa5_a-zA-Z0-9]+$/}],seat_model:[{required:!0,message:"请选择麦位模式",trigger:"change"}],sort:[{required:!0,message:"请填写排序权重",trigger:"blur"},{message:"仅限输入非零正整数",trigger:"blur",pattern:/^([1-9][0-9]*){1,3}$/}],color:[{required:!0,message:"请输入色值",trigger:"blur"}],icon:[{required:!0,message:"请上传品类图标",trigger:"change"}],img:[{required:!0,message:"请上传类型图标",trigger:"change"}]}}},computed:{title:function(){return"add"===this.status?"新增房间类型":"update"===this.status?"修改房间类型":"查看房间类型"},disabled:function(){return"see"===this.status}},methods:{handleClose:function(){this.openComp(!1)},loadParams:function(e,t){if(this.openComp(),this.status=e,"add"!==e){var a=JSON.parse(JSON.stringify(t));this.$set(this.$data,"ruleForm",a)}this.oldParams=JSON.parse(JSON.stringify(this.ruleForm))},openComp:function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];this.$refs.drawer.loadParams(e)},submitForm:function(e){var t=this;return Object(s["a"])(Object(o["a"])().mark((function a(){return Object(o["a"])().wrap((function(a){while(1)switch(a.prev=a.next){case 0:t.$refs[e].validate(function(){var e=Object(s["a"])(Object(o["a"])().mark((function e(a){var r,n;return Object(o["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!a){e.next=10;break}return r=Object(u["a"])({},t.ruleForm),r.belong=1,"update"===t.status&&delete r.create_time,e.next=6,Object(c["s"])(r);case 6:n=e.sent,2e3===n.code&&(t.$success("新增成功"),t.openComp(!1),t.$emit("getList")),e.next=12;break;case 10:return console.log("error submit!!"),e.abrupt("return",!1);case 12:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 1:case"end":return a.stop()}}),a)})))()},closed:function(){this.$emit("destoryComp")},validateField:function(e){this.$refs.ruleForm.validateField([e])},cancel:function(){var e=this;JSON.stringify(this.oldParams)!==JSON.stringify(this.ruleForm)?this.$confirm("关闭弹窗将不会保留您的更改, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){e.openComp(!1)})).catch((function(){})):this.openComp(!1)},update:function(){this.status="update"}}},y=w,x=(a("bd8f"),a("e607")),F=Object(x["a"])(y,g,v,!1,null,"0fed10d4",null),_=F.exports,k={name:"BroadcastList",mixins:[h["a"]],components:{SearchPanel:d["a"],tableList:m["a"],menuComp:l["a"],categoryComp:_},data:function(){return{tabIndex:"0",menuList:[{name:"直播类型"},{name:"有效直播天数"}],isDestoryComp:!1,ruleForm:{},resultCost:"",fromData:{kv_value:""}}},computed:{forms:function(){var e=[{name:"name",type:"input",value:"",label:"房间类型",placeholder:"请输入房间类型"}];return"0"===this.tabIndex?e:[]},cfgs:function(){var e=this;return{vm:this,url:p["a"].house.genreList,columns:[{label:"房间类型",prop:"name"},{label:"类型图片",isimg:!0,prop:"icon",imgHeight:"50px"},{label:"类型色值",prop:"color"},{label:"权重排序",prop:"sort"},{label:"描述",render:function(e,t){var a=b["a"].CATEGORYBUSINESSTYPELIST.find((function(e){return e.value===t.row.belong}));return e("span",a?a.name:"无")}},{label:"操作",render:function(t,a){return t("div",[t("el-button",{props:{type:"primary"},on:{click:function(){e.update(a.row)}}},"修改"),t("el-button",{props:{type:"danger"},style:{display:1===a.row.id?"none":"unset"},on:{click:function(){e.deleteParams(a.row.id)}}},"删除")])}}]}}},created:function(){this.getResultPrice();var e=new Date,t=Object(f["h"])(e,"YYYY-MM-DD",!1),a=new Date(t+" 00:00:00").getTime(),r=new Date(t+" 23:59:59").getTime();this.searchParams.dateTimeParams=[a,r],this.dateTimeParams={start_time:a,end_time:r}},methods:{beforeSearch:function(e){var t=Object(u["a"])(Object(u["a"])({},this.searchParams),this.dateTimeParams);return{page:e.page,pagesize:e.size,name:t.name,belong:1,start_time:t.start_time?Math.floor(t.start_time/1e3):0,end_time:t.end_time?Math.floor(t.end_time/1e3):0}},getList:function(){this.$refs.tableList.getData()},setDateTime:function(e){var t=e?{start_time:e[0],end_time:e[1]}:{};this.$set(this,"dateTimeParams",t)},emptyDateTime:function(){this.dateTimeParams={}},add:function(){this.load("add")},update:function(e){this.load("update",e)},down:function(e,t){var a={id:e.id,status:t};console.log(a)},onSave:function(e){var t=this,a=this.$loading({lock:!0,text:"Loading",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)"});this.$confirm("你确定要保存每日直播时间吗？","保存提醒",{type:"warning",confirmButtonText:"确定",cancelButtonText:"取消"}).then(Object(s["a"])(Object(o["a"])().mark((function r(){var n,s;return Object(o["a"])().wrap((function(r){while(1)switch(r.prev=r.next){case 0:return n={kv_value:e.kv_value},r.next=3,Object(i["Sb"])(n);case 3:s=r.sent,2e3===s.code&&(a.close(),t.$message({message:"[object Object]"===Object.prototype.toString.call(s)&&"保存成功",type:"success"}));case 5:case"end":return r.stop()}}),r)})))).catch((function(){a.close()}))},load:function(e,t){var a=this;this.isDestoryComp=!0,setTimeout((function(){a.$refs.categoryComp.loadParams(e,t)}),50)},onSearch:function(){this.getList()},destoryComp:function(){this.isDestoryComp=!1},saleAmunt:function(e){var t=e.total_cost,a=e.user_count,r=e.count;this.ruleForm={total_cost:t,user_count:a,count:r}},getResultPrice:function(){var e=this;return Object(s["a"])(Object(o["a"])().mark((function t(){var a;return Object(o["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(i["A"])();case 2:if(a=t.sent,a.code+""==="2000"){t.next=6;break}return e.$Message.error("请求失败"),t.abrupt("return");case 6:e.fromData.kv_value=a.data.kv_value||"";case 7:case"end":return t.stop()}}),t)})))()},deleteParams:function(e){var t=this;return Object(s["a"])(Object(o["a"])().mark((function a(){var r;return Object(o["a"])().wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,Object(c["g"])({id:e});case 2:r=a.sent,2e3===r.code&&(t.$success("删除成功"),t.getList());case 4:case"end":return a.stop()}}),a)})))()}}},P=k,C=(a("1253"),Object(x["a"])(P,r,n,!1,null,null,null));t["default"]=C.exports},bd8f:function(e,t,a){"use strict";a("0051")},f803:function(e,t,a){"use strict";a.d(t,"t",(function(){return o})),a.d(t,"g",(function(){return s})),a.d(t,"s",(function(){return u})),a.d(t,"m",(function(){return i})),a.d(t,"p",(function(){return c})),a.d(t,"a",(function(){return l})),a.d(t,"r",(function(){return d})),a.d(t,"j",(function(){return m})),a.d(t,"q",(function(){return p})),a.d(t,"o",(function(){return f})),a.d(t,"n",(function(){return h})),a.d(t,"h",(function(){return b})),a.d(t,"e",(function(){return g})),a.d(t,"v",(function(){return v})),a.d(t,"i",(function(){return j})),a.d(t,"d",(function(){return O})),a.d(t,"u",(function(){return w})),a.d(t,"k",(function(){return y})),a.d(t,"f",(function(){return x})),a.d(t,"w",(function(){return F})),a.d(t,"l",(function(){return _})),a.d(t,"c",(function(){return k})),a.d(t,"b",(function(){return P}));var r=a("829b"),n=a("8daa");function o(e){return Object(r["a"])({url:n["a"].house.updateParty,method:"post",data:e})}function s(e){return Object(r["a"])({url:n["a"].house.delGenre,method:"post",data:e})}function u(e){return Object(r["a"])({url:n["a"].house.saveGenre,method:"post",data:e})}function i(e){return Object(r["a"])({url:n["a"].house.genreList,method:"post",data:e})}function c(e){return Object(r["a"])({url:n["a"].house.partyRoomTypes,method:"post",data:e})}function l(e){return Object(r["a"])({url:n["a"].house.addRoomHot,method:"post",data:e})}function d(e){return Object(r["a"])({url:n["a"].house.roomHotSetting,method:"post",data:e})}function m(e){return Object(r["a"])({url:n["a"].house.deleteRoomHot,method:"post",data:e})}function p(e){return Object(r["a"])({url:n["a"].house.roomBindType,method:"post",data:e})}function f(e){return Object(r["a"])({url:n["a"].house.liveTypes,method:"post",data:e})}function h(e){return Object(r["a"])({url:n["a"].house.liveBindType,method:"post",data:e})}function b(e){return Object(r["a"])({url:n["a"].house.delLiveBind,method:"post",data:e})}function g(e){return Object(r["a"])({url:n["a"].house.createRoomHotConf,method:"post",data:e})}function v(e){return Object(r["a"])({url:n["a"].house.updateRoomHotConf,method:"post",data:e})}function j(e){return Object(r["a"])({url:n["a"].house.deleteRoomHonour,method:"post",data:e})}function O(e){return Object(r["a"])({url:n["a"].house.createRoomHonour,method:"post",data:e})}function w(e){return Object(r["a"])({url:n["a"].house.updateRoomHonour,method:"post",data:e})}function y(e){return Object(r["a"])({url:n["a"].house.deleteRoomHotConf,method:"post",data:e})}function x(e){return Object(r["a"])({url:n["a"].house.createRoomPushFlow,method:"post",data:e})}function F(e){return Object(r["a"])({url:n["a"].house.updateRoomPushFlow,method:"post",data:e})}function _(e){return Object(r["a"])({url:n["a"].house.deleteRoomPushFlow,method:"post",data:e})}function k(e){return Object(r["a"])({url:n["a"].house.changePartyRoom,method:"post",data:e})}function P(e){return Object(r["a"])({url:n["a"].house.canChangeType,method:"post",data:e})}}}]);