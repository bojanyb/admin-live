(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5dc6dc5e"],{"1fe8":function(e,t,r){e.exports=r.p+"static/img/error.e53687be.png"},"21d28":function(e,t,r){"use strict";r("86bb")},2708:function(e,t,r){"use strict";var n=r("5530"),s=r("2f62"),a={data:function(){return{tabIndex:"0",page:1,size:10,limit:10,searchParams:{},dataParams:{}}},computed:Object(n["a"])({},Object(s["c"])({permissionArr:function(e){return e.permission.permissionArr}})),mounted:function(){console.log(this.permissionArr,"permissionArr")}};t["a"]=a},"32c4":function(e,t,r){"use strict";r("6322")},4710:function(e,t,r){"use strict";r("da96")},6322:function(e,t,r){},"6a0a":function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"superAdmin-box"},[r("menuComp",{ref:"menuComp",attrs:{menuList:e.menuList},model:{value:e.tabIndex,callback:function(t){e.tabIndex=t},expression:"tabIndex"}}),"2"!==e.tabIndex?r("div",{staticClass:"searchParams"},[r("SearchPanel",{attrs:{forms:e.forms,"show-search-btn":"1"===e.tabIndex,"show-add":!0},on:{onReset:e.reset,onSearch:e.onSearch,add:e.add},model:{value:e.searchParams,callback:function(t){e.searchParams=t},expression:"searchParams"}})],1):e._e(),r("div",{staticClass:"tableList"},[r("tableList",{ref:"tableList",attrs:{cfgs:e.cfgs}})],1),e.isDestoryComp?r("addComp",{ref:"addComp",attrs:{tabIndex:e.tabIndex},on:{getList:e.getList,destoryComp:e.destoryComp}}):e._e(),e.isDestoryComp?r("messageComp",{ref:"messageComp",on:{getList:e.getList,destoryComp:e.destoryComp}}):e._e()],1)},s=[],a=r("c7eb"),u=r("1da1"),i=r("5530"),o=(r("99af"),function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"superAdmin-add-messageComp-box"},[r("el-dialog",{attrs:{title:"修改超管处罚文案",visible:e.dialogVisible,width:"500px","before-close":e.handleClose},on:{"update:visible":function(t){e.dialogVisible=t},closed:e.closed}},[r("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"60px"}},[r("el-form-item",{attrs:{label:"文案",prop:"kv_value"}},[r("el-input",{attrs:{type:"textarea",rows:4},model:{value:e.ruleForm.kv_value,callback:function(t){e.$set(e.ruleForm,"kv_value",t)},expression:"ruleForm.kv_value"}})],1)],1),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")]),r("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm")}}},[e._v("确 定")])],1)],1)],1)}),c=[],l=(r("b64b"),r("e9c4"),r("c024")),m={data:function(){return{dialogVisible:!1,ruleForm:{kv_id:null,kv_value:""},rules:{kv_value:[{required:!0,message:"请输入文案",trigger:"blur"},{min:1,max:99,message:"文案最大限制输入99个字符",trigger:"blur"}]}}},methods:{handleClose:function(){this.dialogVisible=!1},loadParams:function(e){this.dialogVisible=!0;var t=JSON.parse(JSON.stringify(e));this.$set(this.$data,"ruleForm",t)},submitForm:function(e){var t=this;return Object(u["a"])(Object(a["a"])().mark((function r(){return Object(a["a"])().wrap((function(r){while(1)switch(r.prev=r.next){case 0:t.$refs[e].validate(function(){var e=Object(u["a"])(Object(a["a"])().mark((function e(r){var n,s,u;return Object(a["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!r){e.next=9;break}return n=t.ruleForm,s={kv_id:n.kv_id,kv_value:n.kv_value},e.next=5,Object(l["e"])(s);case 5:u=e.sent,2e3===u.code&&(t.dialogVisible=!1,t.$success("修改成功"),t.$emit("getList")),e.next=11;break;case 9:return console.log("error submit!!"),e.abrupt("return",!1);case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 1:case"end":return r.stop()}}),r)})))()},resetForm:function(e){this.$refs[e].resetFields()},closed:function(){this.$emit("destoryComp")}}},d=m,b=(r("21d28"),r("2877")),p=Object(b["a"])(d,o,c,!1,null,null,null),f=p.exports,h=r("3923"),v=r("04a2"),g=r("4053"),x=r("8daa"),_=r("cf45"),k=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"superAdmin-add-box"},[r("el-dialog",{attrs:{title:e.title,visible:e.dialogVisible,width:"500px","before-close":e.handleClose,"close-on-click-modal":!1},on:{"update:visible":function(t){e.dialogVisible=t},closed:e.closed}},[r("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"65px"}},[r("el-form-item",{attrs:{label:"用户ID",prop:"user_number"}},[r("el-input",{attrs:{oninput:"this.value=this.value.replace(/[^\\d]/g,'');"},model:{value:e.ruleForm.user_number,callback:function(t){e.$set(e.ruleForm,"user_number",t)},expression:"ruleForm.user_number"}})],1),r("el-form-item",{staticClass:"footer"},[r("el-button",{on:{click:e.resetForm}},[e._v("取 消")]),r("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm")}}},[e._v("确 定")])],1)],1)],1)],1)},O=[],w={props:{tabIndex:{type:String,default:""}},computed:{title:function(){return"0"===this.tabIndex?"新增超管":"新增官方"}},data:function(){return{dialogVisible:!1,ruleForm:{user_number:null,status:""},rules:{user_number:[{required:!0,message:"请输入用户ID",trigger:"blur"}]}}},methods:{handleClose:function(){this.resetForm()},submitForm:function(e){var t=this;return Object(u["a"])(Object(a["a"])().mark((function r(){return Object(a["a"])().wrap((function(r){while(1)switch(r.prev=r.next){case 0:t.$refs[e].validate(function(){var e=Object(u["a"])(Object(a["a"])().mark((function e(r){var n,s,u,i,o;return Object(a["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!r){e.next=19;break}if(n=t.ruleForm,"0"!==t.tabIndex){e.next=10;break}return s={user_number:n.user_number,status:1},e.next=6,Object(l["d"])(s);case 6:u=e.sent,2e3===u.code&&t.$success("添加成功"),e.next=15;break;case 10:return i={user_number:n.user_number},e.next=13,Object(l["a"])(i);case 13:o=e.sent,2e3===o.code&&t.$success("添加成功");case 15:t.resetForm(),t.$emit("getList"),e.next=21;break;case 19:return console.log("error submit!!"),e.abrupt("return",!1);case 21:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 1:case"end":return r.stop()}}),r)})))()},resetForm:function(){this.dialogVisible=!1},closed:function(){this.$emit("destoryComp")}}},j=w,C=(r("4710"),Object(b["a"])(j,k,O,!1,null,null,null)),F=C.exports,y=r("2708"),I={mixins:[y["a"]],components:{SearchPanel:v["a"],tableList:g["a"],addComp:F,menuComp:h["a"],messageComp:f},data:function(){return{status:"add",isDestoryComp:!1,list:[],menuList:[{name:"超管用户"},{name:"官方用户"},{name:"超管处罚文案"}],tabIndex:"0"}},computed:{forms:function(){var e=[{name:"user_number",type:"input",value:"",label:"用户ID",isNum:!0,placeholder:"请输入用户ID"}];return"1"===this.tabIndex?[].concat(e):[]},cfgs:function(){var e,t=this,r=[{label:"超管ID",prop:"user_number"},{label:"处罚次数",prop:"punish_count"},{label:"最后一次登录时间",render:function(e,t){return e("span",t.row.last_login?Object(_["h"])(t.row.last_login,"YYYY-MM-DD HH:mm:ss",!0):"")}},{label:"状态",prop:"status",isSwitch:!0,isTrueValue:1,isFalseValue:0,change:function(e,r){t.setSuperUserFunc(r.user_number,e)},render:function(e,t){return e("span","")}},{label:"操作",render:function(e,r){return e("div",[e("el-button",{props:{type:"danger"},on:{click:function(){t.setSuperUserFunc(r.row.user_number,2)}}},"移除")])}}],n=[{label:"用户ID",prop:"user_number"},{label:"用户昵称",prop:"nickname"},{label:"操作",render:function(e,r){return e("div",[e("el-button",{props:{type:"danger"},on:{click:function(){t.setSuperUserFunc(r.row.user_number)}}},"移除")])}}],s=[{label:"处罚类型",prop:"kv_title"},{label:"文案",prop:"kv_value"},{label:"操作",render:function(e,r){return e("div",[e("el-button",{props:{type:"danger"},on:{click:function(){t.add(r.row)}}},"修改")])}}],a=[];return"0"===this.tabIndex?(e="superUserList",a=r):"1"===this.tabIndex?(e="officialAccount",a=n):"2"===this.tabIndex&&(e="superMsg",a=s),{vm:this,url:x["a"].system.super[e],columns:a}}},methods:{beforeSearch:function(e){var t=Object(i["a"])({},this.searchParams);return{page:e.page,pagesize:e.size,user_number:t.user_number}},getList:function(){this.$refs.tableList.getData()},destoryComp:function(){this.isDestoryComp=!1},setSuperUserFunc:function(e,t){var r=this;return Object(u["a"])(Object(a["a"])().mark((function n(){return Object(a["a"])().wrap((function(n){while(1)switch(n.prev=n.next){case 0:if("0"!==r.tabIndex){n.next=10;break}if(2!==t){n.next=5;break}r.$confirm("是否确认删除当前超管？").then(function(){var n=Object(u["a"])(Object(a["a"])().mark((function n(s){var u;return Object(a["a"])().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,Object(l["d"])({user_number:e,status:t});case 2:u=n.sent,2e3===u.code&&r.$success("删除成功"),r.getList();case 5:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}()).catch((function(e){})),n.next=8;break;case 5:return n.next=7,Object(l["d"])({user_number:e,status:t});case 7:r.getList();case 8:n.next=11;break;case 10:r.$confirm("是否确认删除当前官方？").then(function(){var t=Object(u["a"])(Object(a["a"])().mark((function t(n){var s;return Object(a["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(l["b"])({user_number:e});case 2:s=t.sent,2e3===s.code&&r.$success("删除成功"),r.getList();case 5:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()).catch((function(e){}));case 11:case"end":return n.stop()}}),n)})))()},reset:function(){this.searchParams={},this.getList()},onSearch:function(){this.getList()},add:function(e){var t=this;this.isDestoryComp=!0,setTimeout((function(){"2"!==t.tabIndex?t.$refs.addComp.dialogVisible=!0:t.$refs.messageComp.loadParams(e)}),100)},deleteFunc:function(e){}}},$=I,L=(r("32c4"),Object(b["a"])($,n,s,!1,null,null,null));t["default"]=L.exports},"86bb":function(e,t,r){},c024:function(e,t,r){"use strict";r.d(t,"c",(function(){return a})),r.d(t,"d",(function(){return u})),r.d(t,"a",(function(){return i})),r.d(t,"b",(function(){return o})),r.d(t,"e",(function(){return c}));var n=r("829b"),s=r("8daa");function a(e){return Object(n["a"])({url:s["a"].system.super.handlePunish,method:"post",data:e})}function u(e){return Object(n["a"])({url:s["a"].system.super.setSuperUser,method:"post",data:e})}function i(e){return Object(n["a"])({url:s["a"].system.super.add,method:"post",data:e})}function o(e){return Object(n["a"])({url:s["a"].system.super.del,method:"post",data:e})}function c(e){return Object(n["a"])({url:s["a"].system.super.update,method:"post",data:e})}},da96:function(e,t,r){}}]);