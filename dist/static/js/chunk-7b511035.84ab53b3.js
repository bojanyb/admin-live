(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7b511035"],{1179:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"sysnotice-add-box"},[a("el-dialog",{attrs:{title:t.title,visible:t.dialogVisible,width:"600px","before-close":t.handleClose,"close-on-click-modal":!1},on:{"update:visible":function(e){t.dialogVisible=e},closed:t.destoryComp}},[a("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:t.ruleForm,rules:t.rules,"label-suffix":":","label-width":"110px"}},[a("el-form-item",{attrs:{label:"用户ID",prop:"target_val"}},[a("el-input",{attrs:{type:"textarea",autosize:{minRows:2,maxRows:4},placeholder:"请输入指定用户ID用英文分号隔开",onkeyup:"this.value=this.value.replace(/[^\\d\\,]/g,'')",oninput:"if(value.length>200)value=value.slice(0,200)"},model:{value:t.ruleForm.target_val,callback:function(e){t.$set(t.ruleForm,"target_val",e)},expression:"ruleForm.target_val"}})],1),a("el-form-item",{attrs:{label:"消息标题",prop:"title"}},[a("el-input",{attrs:{oninput:"if(value.length>15)value=value.slice(0,15)",placeholder:"请输入消息标题",clearable:""},model:{value:t.ruleForm.title,callback:function(e){t.$set(t.ruleForm,"title",e)},expression:"ruleForm.title"}})],1),a("el-form-item",{attrs:{label:"消息内容",prop:"content"}},[a("el-input",{attrs:{type:"textarea",autosize:{minRows:2,maxRows:4},placeholder:"请输入消息内容",oninput:"if(value.length>200)value=value.slice(0,200)",maxlength:"200"},model:{value:t.ruleForm.content,callback:function(e){t.$set(t.ruleForm,"content",e)},expression:"ruleForm.content"}})],1),"desdev"==t.type?a("el-form-item",{attrs:{label:"消息图片"}},[a("uploadImg",{ref:"uploadImg",attrs:{imgUrl:t.ruleForm.img_path,name:"img_path",accept:".png,.jpg,.jpeg"},on:{validateField:t.validateField},model:{value:t.ruleForm.img_path,callback:function(e){t.$set(t.ruleForm,"img_path",e)},expression:"ruleForm.img_path"}})],1):t._e(),a("el-form-item",{attrs:{label:"落地类型",prop:"push_val"}},[a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"请输入内容"},model:{value:t.ruleForm.push_val,callback:function(e){t.$set(t.ruleForm,"push_val",e)},expression:"ruleForm.push_val"}},[a("el-select",{attrs:{slot:"prepend",placeholder:"链接选择"},slot:"prepend",model:{value:t.ruleForm.push_type,callback:function(e){t.$set(t.ruleForm,"push_type",e)},expression:"ruleForm.push_type"}},t._l(t.pathType,(function(t){return a("el-option",{key:t.value,attrs:{label:t.name,value:t.value}})})),1)],1)],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){return t.resetForm("ruleForm")}}},[t._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.submitForm("ruleForm")}}},[t._v("确 定")])],1)],1)],1)},r=[],o=a("4672"),s=a("40bd"),i=a("7e8c"),u=(a("65c4"),a("279a")),l=a("40cb"),c=a("8593"),d={components:{uploadImg:l["a"]},props:{type:{type:String,default:""}},computed:{title:function(){return"add"===this.status?"desdev"==this.type?"发送官方消息":"发送系统通知":"update"===this.status?"修改商品":"查看商品"}},data:function(){return{dialogVisible:!1,msgType:u["a"].MSGTYPE,userSelectType:u["a"].USERSLECTTYPE,pathType:u["a"].PATHTYPE2,goodsType:1,status:"add",oldParams:{},timer:null,ruleForm:{title:"",content:"",target_val:"",push_val:"",push_type:0,img_path:""},rules:{title:[{required:!0,message:"请输入消息标题",trigger:"blur"}],content:[{required:!0,message:"请输入消息内容",trigger:"blur"}]}}},methods:{handleClose:function(){this.close()},goodsChange:function(t){var e=this.oldParams;1===t?"{}"!==JSON.stringify(e)&&e.goods_animation_path||(this.$refs.goods_animation_path.imageUrl="",this.ruleForm.goods_animation_path=""):"{}"!==JSON.stringify(e)&&e.goods_image||(this.$refs.goods_image.imageUrl="",this.ruleForm.goods_image="")},load:function(t,e){if(this.status=t,"add"!==t){this.oldParams=e;var a=JSON.parse(JSON.stringify(e));a.start_time=1e3*a.start_time,a.end_time=1e3*a.end_time,a.noble_level=a.noble_level?a.noble_level:null,a.goods_animation_path?this.goodsType=1:a.goods_image&&(this.goodsType=2),this.$set(this.$data,"ruleForm",a)}},submitForm:function(t){var e=this;this.$refs[t].validate((function(t){if(!t)return console.log("error submit!!"),!1;e.$confirm("是否确定发送？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(i["a"])(Object(s["a"])().mark((function t(){return Object(s["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.handleSubmit();case 1:case"end":return t.stop()}}),t)})))).catch((function(){}))}))},handleSubmit:function(){var t=this,e=Object(o["a"])({},this.ruleForm);e.push_type=JSON.stringify(e.push_type),"desdev"!==this.type?(delete e.img_path,Object(c["e"])(e).then((function(e){2e3===e.code&&(t.dialogVisible=!1,t.$emit("onSearch"))})).catch((function(e){t.$message.error(e)}))):Object(c["c"])(e).then((function(e){2e3===e.code&&(t.dialogVisible=!1,t.$emit("onSearch"))})).catch((function(e){t.$message.error(e)}))},resetForm:function(t){this.close()},close:function(){var t=this;this.$confirm("关闭后数据不会保存，确定关闭吗？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){t.dialogVisible=!1,t.$emit("onSearch")})).catch((function(){}))},destoryComp:function(){this.$emit("destoryComp")},validateField:function(t){this.$refs.ruleForm.validateField([t])},timeChange:function(t){console.log("系统通知 时间选择:",t)}},mounted:function(){}},m=d,p=(a("d258"),a("e607")),f=Object(p["a"])(m,n,r,!1,null,null,null);e["a"]=f.exports},"127f":function(t,e,a){"use strict";a.d(e,"a",(function(){return c}));var n=a("40bd"),r=a("7e8c"),o=(a("48d4"),a("8bda"),a("897d")),s=a.n(o),i=a("4109"),u={ossParams:{region:"oss-cn-shenzhen",success_action_status:"200",accessKeyId:"LTAI5tFTcRH7h3RXKoYmnWMk",accessKeySecret:"qdx4B8jIh2VjBgBDG5fNfG0Oj21GSP",bucket:"live-huidapay-net"}};function l(t){var e=t.name.split("."),a=s()(Date.now()+e[0]);return a=a+"."+e[e.length-1],a}function c(t){return new Promise(function(){var e=Object(r["a"])(Object(n["a"])().mark((function e(a,r){var o,s;return Object(n["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return o=l(t),s=new i({region:u.ossParams.region,accessKeyId:u.ossParams.accessKeyId,accessKeySecret:u.ossParams.accessKeySecret,bucket:u.ossParams.bucket}),e.next=4,s.multipartUpload(o,t);case 4:e.sent,a({url:"https://photo.aiyi.live/"+o});case 6:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}())}},"1fe8":function(t,e,a){t.exports=a.p+"static/img/error.e53687be.png"},2708:function(t,e,a){"use strict";var n=a("4672"),r=a("52c1"),o={data:function(){return{tabIndex:"0",page:1,size:10,limit:10,searchParams:{},dataParams:{}}},computed:Object(n["a"])({},Object(r["c"])({permissionArr:function(t){return t.permission.permissionArr}})),mounted:function(){console.log(this.permissionArr,"permissionArr")}};e["a"]=o},"2df4":function(t,e,a){},8593:function(t,e,a){"use strict";a.d(e,"j",(function(){return s})),a.d(e,"f",(function(){return i})),a.d(e,"d",(function(){return u})),a.d(e,"i",(function(){return l})),a.d(e,"k",(function(){return c})),a.d(e,"g",(function(){return d})),a.d(e,"h",(function(){return m})),a.d(e,"e",(function(){return p})),a.d(e,"c",(function(){return f})),a.d(e,"a",(function(){return h})),a.d(e,"b",(function(){return b})),a.d(e,"l",(function(){return g})),a.d(e,"m",(function(){return y})),a.d(e,"o",(function(){return v})),a.d(e,"n",(function(){return _}));var n=a("829b"),r=a("299b"),o=a("8daa");function s(t){return Object(n["a"])({url:o["a"].system.dummy.deleteVirtualPhone,method:"post",data:t})}function i(t){return Object(n["a"])({url:o["a"].system.dummy.addVirtualPhoneField,method:"post",data:t})}function u(t){return Object(n["a"])({url:o["a"].system.dummy.addPhoneRoll,method:"post",data:t})}function l(t){return Object(n["a"])({url:o["a"].system.dummy.deletePhone,method:"post",data:t})}function c(t){return Object(r["a"])({url:o["a"].system.account.getBanner,method:"post",data:t})}function d(t){return Object(n["a"])({url:o["a"].system.guild.configRebate,method:"post",data:t})}function m(t){return Object(n["a"])({url:o["a"].system.guild.delConfigRebate,method:"post",data:t})}function p(t){return Object(n["a"])({url:o["a"].system.addSysNotice,method:"post",data:t})}function f(t){return Object(n["a"])({url:o["a"].system.addOfficialNotice,method:"post",data:t})}function h(t){return Object(n["a"])({url:o["a"].system.AppruleAdd,method:"post",data:t})}function b(t){return Object(n["a"])({url:o["a"].system.AppruleUpdate,method:"post",data:t})}function g(t){return Object(n["a"])({url:o["a"].system.getChannels,method:"post",data:t})}function y(t){return Object(n["a"])({url:o["a"].system.getSwitchValue,method:"post",data:t})}function v(t){return Object(n["a"])({url:o["a"].system.tabbar.updateStatus,method:"post",data:t})}function _(t){return Object(n["a"])({url:o["a"].system.tabbar.updateConfig,method:"post",data:t})}},d258:function(t,e,a){"use strict";a("f179")},d546:function(t,e,a){"use strict";a("2df4")},e5de:function(t,e,a){"use strict";a.d(e,"a",(function(){return o})),a.d(e,"b",(function(){return s})),a.d(e,"c",(function(){return i})),a.d(e,"d",(function(){return u}));var n=a("829b"),r=a("8daa");function o(t){return Object(n["a"])({url:r["a"].shopping.add,method:"post",data:t})}function s(t){return Object(n["a"])({url:r["a"].shopping.down,method:"post",data:t})}function i(t){return Object(n["a"])({url:r["a"].shopping.list,method:"post",data:t})}function u(t){return Object(n["a"])({url:r["a"].shopping.send,method:"post",data:t})}},f179:function(t,e,a){},f2af:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"communique-box"},[a("div",{staticClass:"searchParams"},[a("SearchPanel",{attrs:{forms:t.forms,"show-reset":!0,"show-search-btn":!0,"show-add":!0},on:{onReset:t.reset,onSearch:t.onSearch,add:t.add},model:{value:t.searchParams,callback:function(e){t.searchParams=e},expression:"searchParams"}})],1),a("div",{staticClass:"tableList"},[a("tableList",{ref:"tableList",attrs:{cfgs:t.cfgs},on:{saleAmunt:t.saleAmunt}})],1),t.isDestoryComp?a("add",{ref:"add",attrs:{type:"desdev"},on:{onSearch:t.onSearch,destoryComp:t.destoryComp}}):t._e()],1)},r=[],o=a("4672"),s=(a("23dc"),a("8bda"),a("48d4"),a("1af9"),a("4053")),i=a("04a2"),u=a("2708"),l=a("8daa"),c=a("e5de"),d=a("cf45"),m=a("279a"),p=a("1179"),f={components:{tableList:s["a"],SearchPanel:i["a"],add:p["a"]},mixins:[u["a"]],computed:{forms:function(){var t=this;return[{name:"user_number",type:"input",value:"",label:"用户ID",isNum:!0,placeholder:"请输入用户ID"},{name:"dateTimeParams",type:"datePicker",dateType:"datetimerange",format:"yyyy-MM-dd HH:mm:ss",label:"时间选择",value:"",handler:{change:function(e){t.emptyDateTime(),t.setDateTime(e)},selectChange:function(e,a){t.emptyDateTime()}}}]},cfgs:function(){return{vm:this,url:l["a"].system.officialList,columns:[{label:"发送时间",minWidth:"60px",render:function(t,e){return t("span",e.row.create_time?Object(d["h"])(e.row.create_time,"YYYY-MM-DD HH:mm:ss",!0):"--")}},{label:"接收用户",minWidth:"50px",prop:"target_val"},{label:"消息图片",minWidth:"50px",isimg:!0,prop:"img_path",imgWidth:"50px",imgHeight:"50px"},{label:"消息标题",minWidth:"50px",showOverFlow:!0,render:function(t,e){return t("span",e.row.title?e.row.title:"--")}},{label:"消息内容",showOverFlow:!0,render:function(t,e){return t("span",e.row.content?e.row.content:"--")}},{label:"跳转类型",minWidth:"50px",render:function(t,e){var a=m["a"].PATHTYPE2.find((function(t){return t.value===e.row.push_type}));return t("span",a?a.name:"--")}},{label:"跳转链接/房间ID",showOverFlow:!0,render:function(t,e){return t("span",e.row.push_val?e.row.push_val:"--")}}]}}},data:function(){return{ruleForm:{alreadyMoney:null,deductMoney:null},isDestoryComp:!1}},methods:{getList:function(){this.$refs.tableList.getData()},beforeSearch:function(t){var e=Object(o["a"])(Object(o["a"])({},this.searchParams),this.dateTimeParams);return{page:t.page,status:e.status,user_number:e.user_number,start_time:Math.floor(e.start_time/1e3),end_time:Math.floor(e.end_time/1e3),user_id:e.user_id,order_id:e.order_id,sort:e.sort,goods_type:e.goods_type}},setDateTime:function(t){var e=t?{start_time:t[0],end_time:t[1]}:{};this.$set(this,"dateTimeParams",e)},emptyDateTime:function(){this.dateTimeParams={}},reset:function(){this.searchParams={},this.dateTimeParams={activity_type_id:1},this.getList()},onSearch:function(){this.getList()},saleAmunt:function(t){},add:function(){this.load("add")},update:function(t){this.load("update",t)},down:function(t,e){var a=this,n={id:t.id,status:e};Object(c["b"])(n).then((function(t){2e3===t.code&&a.onSearch()}))},load:function(t,e){var a=this;this.isDestoryComp=!0,setTimeout((function(){a.$refs.add.dialogVisible=!0,a.$refs.add.load(t,e)}),100)},destoryComp:function(){this.isDestoryComp=!1}}},h=f,b=(a("d546"),a("e607")),g=Object(b["a"])(h,n,r,!1,null,null,null);e["default"]=g.exports}}]);