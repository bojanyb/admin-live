(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-fa10392a"],{"127f":function(e,t,r){"use strict";r.d(t,"a",(function(){return l}));var s=r("40bd"),a=r("7e8c"),i=(r("48d4"),r("8bda"),r("897d")),n=r.n(i),o=r("4109"),c={ossParams:{region:"oss-cn-shenzhen",success_action_status:"200",accessKeyId:"LTAI5tFTcRH7h3RXKoYmnWMk",accessKeySecret:"qdx4B8jIh2VjBgBDG5fNfG0Oj21GSP",bucket:"live-huidapay-net"}};function u(e){var t=e.name.split("."),r=n()(Date.now()+t[0]);return r=r+"."+t[t.length-1],r}function l(e){return new Promise(function(){var t=Object(a["a"])(Object(s["a"])().mark((function t(r,a){var i,n;return Object(s["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return i=u(e),n=new o({region:c.ossParams.region,accessKeyId:c.ossParams.accessKeyId,accessKeySecret:c.ossParams.accessKeySecret,bucket:c.ossParams.bucket}),t.next=4,n.multipartUpload(i,e);case 4:t.sent,r({url:"https://photo.aiyi.live/"+i});case 6:case"end":return t.stop()}}),t)})));return function(e,r){return t.apply(this,arguments)}}())}},1369:function(e,t,r){},"1fe8":function(e,t,r){e.exports=r.p+"static/img/error.e53687be.png"},2708:function(e,t,r){"use strict";var s=r("4672"),a=r("52c1"),i={data:function(){return{tabIndex:"0",page:1,size:10,limit:10,searchParams:{},dataParams:{}}},computed:Object(s["a"])({},Object(a["c"])({permissionArr:function(e){return e.permission.permissionArr}})),mounted:function(){console.log(this.permissionArr,"permissionArr")}};t["a"]=i},"2dec":function(e,t,r){"use strict";r.r(t);var s=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"activity-message-box"},[r("div",{staticClass:"btnBox"},[r("el-button",{attrs:{type:"success"},on:{click:e.add}},[e._v("新增")])],1),r("tableList",{ref:"tableList",attrs:{cfgs:e.cfgs}}),e.isDestoryComp?r("messageComp",{ref:"messageComp",on:{getList:e.getList,destoryComp:e.destoryComp}}):e._e()],1)},a=[],i=r("40bd"),n=r("7e8c"),o=r("4672"),c=r("1a72"),u=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"messageComp-box"},[r("drawer",{ref:"drawer",attrs:{size:"470px",title:e.title,disabled:e.disabled},on:{cancel:e.cancel,submitForm:e.submitForm,closed:e.closed}},[r("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{slot:"body",model:e.ruleForm,rules:e.rules,"label-width":"115px","label-suffix":":","hide-required-asterisk":"see"===e.status},slot:"body"},[r("el-form-item",{attrs:{label:"活动标题",prop:"title"}},[r("el-input",{attrs:{disabled:e.disabled},model:{value:e.ruleForm.title,callback:function(t){e.$set(e.ruleForm,"title",t)},expression:"ruleForm.title"}})],1),r("el-form-item",{attrs:{label:"活动描述",prop:"describe"}},[r("el-input",{attrs:{disabled:e.disabled},model:{value:e.ruleForm.describe,callback:function(t){e.$set(e.ruleForm,"describe",t)},expression:"ruleForm.describe"}})],1),r("el-form-item",{attrs:{label:"活动配图",prop:"image_url"}},[r("uploadImg",{ref:"uploadImg",attrs:{disabled:e.disabled,imgUrl:e.ruleForm.image_url,name:"image_url",accept:".png,.jpg,.jpeg"},on:{validateField:e.validateField},model:{value:e.ruleForm.image_url,callback:function(t){e.$set(e.ruleForm,"image_url",t)},expression:"ruleForm.image_url"}})],1),r("el-form-item",{attrs:{label:"活动链接",prop:"uri",rules:e.navToUriParams}},[r("el-input",{attrs:{disabled:e.disabled},model:{value:e.ruleForm.nav_to.uri,callback:function(t){e.$set(e.ruleForm.nav_to,"uri",t)},expression:"ruleForm.nav_to.uri"}})],1),r("el-form-item",{attrs:{label:"开始推送时间",prop:"start_time"}},[r("el-date-picker",{attrs:{type:"datetime",format:"yyyy-MM-dd HH:mm:ss","value-format":"timestamp",disabled:e.disabled,placeholder:"选择开始推送时间"},model:{value:e.ruleForm.start_time,callback:function(t){e.$set(e.ruleForm,"start_time",t)},expression:"ruleForm.start_time"}})],1)],1)],1)],1)},l=[],m=(r("00e5"),r("65c4"),r("0472")),d=r("40cb"),p={components:{uploadImg:d["a"],drawer:m["a"]},data:function(){return{status:"add",ruleForm:{title:"",image_url:"",nav_to:{type:"h5",uri:""},start_time:null},oldParams:{},rules:{title:[{required:!0,message:"请输入活动标题",trigger:"blur"}],describe:[{required:!0,message:"请输入活动描述",trigger:"blur"}],image_url:[{required:!0,message:"请上传活动配图",trigger:"change"}],start_time:[{type:"date",required:!0,message:"请选择开始推送时间",trigger:"change"}]}}},computed:{disabled:function(){return"see"===this.status},title:function(){return"add"===this.status?"新增活动通知":"see"===this.status?"查看活动通知":void 0},navToUriParams:function(){var e=this,t={};return t={required:!0,validator:function(t,r,s){var a=e.ruleForm.nav_to.uri;a?s():s(new Error("请填写活动链接"))}},t}},methods:{loadParams:function(e,t){if(this.openComp(),this.status=e,"add"!==e){var r=JSON.parse(JSON.stringify(t));r.start_time=1e3*r.start_time,this.$set(this.$data,"ruleForm",r)}this.oldParams=JSON.parse(JSON.stringify(this.ruleForm))},openComp:function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];this.$refs.drawer.loadParams(e)},cancel:function(){var e=this;JSON.stringify(this.oldParams)!==JSON.stringify(this.ruleForm)?this.$confirm("关闭弹窗将不会保留您的更改, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){e.openComp(!1)})).catch((function(){})):this.openComp(!1)},submitForm:function(e){var t=this;return Object(n["a"])(Object(i["a"])().mark((function r(){return Object(i["a"])().wrap((function(r){while(1)switch(r.prev=r.next){case 0:t.$refs[e].validate(function(){var e=Object(n["a"])(Object(i["a"])().mark((function e(r){var s,a;return Object(i["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!r){e.next=12;break}return s=Object(o["a"])({},t.ruleForm),s.start_time=Math.floor(s.start_time/1e3),s.nav_to=JSON.stringify(s.nav_to),e.next=6,Object(c["Eb"])(s);case 6:a=e.sent,2e3===a.code&&t.$success("新增成功"),t.openComp(!1),t.$emit("getList"),e.next=14;break;case 12:return console.log("error submit!!"),e.abrupt("return",!1);case 14:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 1:case"end":return r.stop()}}),r)})))()},validateField:function(e){this.$refs.ruleForm.validateField([e])},closed:function(){this.$emit("destoryComp")}}},f=p,b=(r("778f"),r("e607")),h=Object(b["a"])(f,u,l,!1,null,null,null),g=h.exports,v=r("4053"),_=r("2708"),w=r("8daa"),y=r("cf45"),F={components:{tableList:v["a"],messageComp:g},mixins:[_["a"]],computed:{cfgs:function(){var e=this;return{vm:this,url:w["a"].message.list,columns:[{label:"活动标题",render:function(e,t){return e("span",t.row.title||"无")}},{label:"活动描述",minWidth:"120px",render:function(e,t){return e("span",t.row.describe||"无")},showOverFlow:!0},{label:"活动配图",isimg:!0,prop:"image_url",imgWidth:"50px",imgHeight:"50px"},{label:"活动链接",minWidth:"120px",render:function(e,t){return e("span",t.row.nav_to.uri||"无")}},{label:"推送时间",minWidth:"120px",render:function(e,t){return e("span",t.row.start_time?Object(y["h"])(t.row.start_time,"YYYY-MM-DD HH:mm:ss",!0):"无")}},{label:"创建时间",minWidth:"120px",render:function(e,t){return e("span",t.row.create_time?Object(y["h"])(t.row.create_time,"YYYY-MM-DD HH:mm:ss",!0):"无")}},{label:"创建人",render:function(e,t){return e("span",t.row.nickname||"无")}},{label:"操作",render:function(t,r){return t("div",[t("el-button",{props:{type:"danger"},on:{click:function(){e.messageDelete(r.row.id)}}},"删除")])}}]}}},data:function(){return{isDestoryComp:!1}},methods:{getList:function(){this.$refs.tableList.getData()},beforeSearch:function(e){var t=Object(o["a"])({},this.searchParams);return{page:e.page,user_number:t.user_number}},reset:function(){this.searchParams={},this.getList()},onSearch:function(){this.getList()},add:function(){this.load("add")},load:function(e,t){var r=this;this.isDestoryComp=!0,setTimeout((function(){r.$refs.messageComp.loadParams(e,t)}),50)},messageDelete:function(e){var t=this;return Object(n["a"])(Object(i["a"])().mark((function r(){var s;return Object(i["a"])().wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,Object(c["Fb"])({id:e});case 2:s=r.sent,2e3===s.code&&t.$success("删除成功"),t.getList();case 5:case"end":return r.stop()}}),r)})))()},destoryComp:function(){this.isDestoryComp=!1}}},x=F,O=(r("e684"),Object(b["a"])(x,s,a,!1,null,"371d0463",null));t["default"]=O.exports},"778f":function(e,t,r){"use strict";r("f69b")},e684:function(e,t,r){"use strict";r("1369")},f69b:function(e,t,r){}}]);