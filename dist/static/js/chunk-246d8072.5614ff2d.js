(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-246d8072"],{"1fe8":function(e,t,r){e.exports=r.p+"static/img/error.e53687be.png"},2048:function(e,t,r){},2708:function(e,t,r){"use strict";var n=r("5530"),s=r("2f62"),a={data:function(){return{tabIndex:"0",page:1,size:10,limit:10,searchParams:{},dataParams:{}}},computed:Object(n["a"])({},Object(s["c"])({permissionArr:function(e){return e.permission.permissionArr}})),mounted:function(){console.log(this.permissionArr,"permissionArr")}};t["a"]=a},"2c89":function(e,t,r){"use strict";r("c4c7")},"6a0a":function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"superAdmin-box"},[r("menuComp",{ref:"menuComp",attrs:{menuList:e.menuList},on:{tabChange:e.tabChange},model:{value:e.tabIndex,callback:function(t){e.tabIndex=t},expression:"tabIndex"}}),"2"!==e.tabIndex?r("div",{staticClass:"searchParams"},[r("SearchPanel",{attrs:{forms:e.forms,"show-search-btn":"1"===e.tabIndex,"show-add":!0},on:{onReset:e.reset,onSearch:e.onSearch,add:e.add},model:{value:e.searchParams,callback:function(t){e.searchParams=t},expression:"searchParams"}})],1):e._e(),r("div",{staticClass:"tableList"},[r("tableList",{ref:"tableList",attrs:{cfgs:e.cfgs}})],1),e.isDestoryComp?r("addComp",{ref:"addComp",attrs:{tabIndex:e.tabIndex},on:{getList:e.getList,destoryComp:e.destoryComp}}):e._e(),e.isDestoryComp?r("messageComp",{ref:"messageComp",on:{getList:e.getList,destoryComp:e.destoryComp}}):e._e()],1)},s=[],a=r("c7eb"),u=r("1da1"),o=r("5530"),i=(r("99af"),r("caad"),r("a9e3"),function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"superAdmin-add-messageComp-box"},[r("el-dialog",{attrs:{title:e.title,visible:e.dialogVisible,width:"500px","before-close":e.handleClose},on:{"update:visible":function(t){e.dialogVisible=t},closed:e.closed}},[r("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"60px"}},[r("el-form-item",{attrs:{label:"文案",prop:"content"}},[r("el-input",{attrs:{type:"textarea",rows:4},model:{value:e.ruleForm.content,callback:function(t){e.$set(e.ruleForm,"content",t)},expression:"ruleForm.content"}})],1),r("el-form-item",{attrs:{label:"序号",prop:"sort"}},[r("el-input",{attrs:{type:"number"},model:{value:e.ruleForm.sort,callback:function(t){e.$set(e.ruleForm,"sort",t)},expression:"ruleForm.sort"}})],1)],1),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")]),r("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm")}}},[e._v("确 定")])],1)],1)],1)}),c=[],l=(r("b64b"),r("e9c4"),r("4e82"),r("c024")),m={data:function(){return{dialogVisible:!1,status:"",ruleForm:{id:null,type:"",content:"",sort:""},rules:{content:[{required:!0,message:"请输入文案",trigger:"blur"}],sort:[{required:!0,message:"请输入序号",trigger:"blur"}]}}},computed:{title:function(){var e="";return e="add"===this.status?"新增":"修改","sup_msg_punish"===this.ruleForm.type?e+="超管处罚文案":"sup_msg_tip"===this.ruleForm.type?e+="超管提示文案":"sup_msg_warning"===this.ruleForm.type&&(e+="超管警告文案"),e}},methods:{handleClose:function(){this.dialogVisible=!1},loadParams:function(e,t){if(this.dialogVisible=!0,this.status=e,"string"===typeof t)this.ruleForm.type=t;else{var r=JSON.parse(JSON.stringify(t));this.$set(this.$data,"ruleForm",r)}},submitForm:function(e){var t=this;return Object(u["a"])(Object(a["a"])().mark((function r(){return Object(a["a"])().wrap((function(r){while(1)switch(r.prev=r.next){case 0:t.$refs[e].validate(function(){var e=Object(u["a"])(Object(a["a"])().mark((function e(r){var n,s,u;return Object(a["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!r){e.next=16;break}if(n=t.ruleForm,s={type:n.type,content:n.content,sort:n.sort},"add"!==t.status){e.next=9;break}return e.next=6,Object(l["b"])(s);case 6:u=e.sent,e.next=13;break;case 9:return s.id=n.id,e.next=12,Object(l["g"])(s);case 12:u=e.sent;case 13:2e3===u.code&&(t.dialogVisible=!1,t.$success("add"===t.status?"新增成功":"修改成功"),t.$emit("getList")),e.next=18;break;case 16:return console.log("error submit!!"),e.abrupt("return",!1);case 18:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 1:case"end":return r.stop()}}),r)})))()},resetForm:function(e){this.$refs[e].resetFields()},closed:function(){this.$emit("destoryComp")}}},p=m,d=r("2877"),b=Object(d["a"])(p,i,c,!1,null,null,null),f=b.exports,h=r("3923"),g=r("04a2"),x=r("4053"),v=r("8daa"),y=r("cf45"),_=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"superAdmin-add-box"},[r("el-dialog",{attrs:{title:e.title,visible:e.dialogVisible,width:"500px","before-close":e.handleClose,"close-on-click-modal":!1},on:{"update:visible":function(t){e.dialogVisible=t},closed:e.closed}},[r("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"65px"}},[r("el-form-item",{attrs:{label:"用户ID",prop:"user_number"}},[r("el-input",{attrs:{oninput:"this.value=this.value.replace(/[^\\d]/g,'');"},model:{value:e.ruleForm.user_number,callback:function(t){e.$set(e.ruleForm,"user_number",t)},expression:"ruleForm.user_number"}})],1),r("el-form-item",{staticClass:"footer"},[r("el-button",{on:{click:e.resetForm}},[e._v("取 消")]),r("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm")}}},[e._v("确 定")])],1)],1)],1)],1)},w=[],O={props:{tabIndex:{type:String,default:""}},computed:{title:function(){return"0"===this.tabIndex?"新增超管":"新增官方"}},data:function(){return{dialogVisible:!1,ruleForm:{user_number:null,status:""},rules:{user_number:[{required:!0,message:"请输入用户ID",trigger:"blur"}]}}},methods:{handleClose:function(){this.resetForm()},submitForm:function(e){var t=this;return Object(u["a"])(Object(a["a"])().mark((function r(){return Object(a["a"])().wrap((function(r){while(1)switch(r.prev=r.next){case 0:t.$refs[e].validate(function(){var e=Object(u["a"])(Object(a["a"])().mark((function e(r){var n,s,u,o,i;return Object(a["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!r){e.next=19;break}if(n=t.ruleForm,"0"!==t.tabIndex){e.next=10;break}return s={user_number:n.user_number,status:1},e.next=6,Object(l["f"])(s);case 6:u=e.sent,2e3===u.code&&t.$success("添加成功"),e.next=15;break;case 10:return o={user_number:n.user_number},e.next=13,Object(l["a"])(o);case 13:i=e.sent,2e3===i.code&&t.$success("添加成功");case 15:t.resetForm(),t.$emit("getList"),e.next=21;break;case 19:return console.log("error submit!!"),e.abrupt("return",!1);case 21:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 1:case"end":return r.stop()}}),r)})))()},resetForm:function(){this.dialogVisible=!1},closed:function(){this.$emit("destoryComp")}}},j=O,F=(r("2c89"),Object(d["a"])(j,_,w,!1,null,null,null)),C=F.exports,k=r("2708"),$={mixins:[k["a"]],components:{SearchPanel:g["a"],tableList:x["a"],addComp:C,menuComp:h["a"],messageComp:f},data:function(){return{status:"add",isDestoryComp:!1,list:[],menuList:[{name:"超管用户"},{name:"官方用户"},{name:"超管处罚文案",type:"sup_msg_punish"},{name:"超管提示文案",type:"sup_msg_tip"},{name:"超管警告文案",type:"sup_msg_warning"}],tabIndex:"0",msgType:""}},computed:{forms:function(){var e=[{name:"user_number",type:"input",value:"",label:"用户ID",isNum:!0,placeholder:"请输入用户ID"}];return"1"===this.tabIndex?[].concat(e):[]},cfgs:function(){var e,t=this,r=[{label:"超管ID",prop:"user_number"},{label:"处罚次数",prop:"punish_count"},{label:"最后一次登录时间",render:function(e,t){return e("span",t.row.last_login?Object(y["h"])(t.row.last_login,"YYYY-MM-DD HH:mm:ss",!0):"")}},{label:"状态",prop:"status",isSwitch:!0,isTrueValue:1,isFalseValue:0,change:function(e,r){t.setSuperUserFunc(r.user_number,e)},render:function(e,t){return e("span","")}},{label:"操作",render:function(e,r){return e("div",[e("el-button",{props:{type:"danger"},on:{click:function(){t.setSuperUserFunc(r.row.user_number,2)}}},"移除")])}}],n=[{label:"用户ID",prop:"user_number"},{label:"用户昵称",prop:"nickname"},{label:"操作",render:function(e,r){return e("div",[e("el-button",{props:{type:"danger"},on:{click:function(){t.setSuperUserFunc(r.row.user_number)}}},"移除")])}}],s=[{label:"序号",prop:"sort"},{label:"文案",prop:"content"},{label:"操作",render:function(e,r){return e("div",[e("el-button",{props:{type:"danger"},on:{click:function(){t.updateFunc(r.row)}}},"修改")])}}],a=[{label:"序号",prop:"sort"},{label:"文案",prop:"content"},{label:"操作",render:function(e,r){return e("div",[e("el-button",{props:{type:"primary"},on:{click:function(){t.updateFunc(r.row)}}},"修改"),e("el-button",{props:{type:"danger"},on:{click:function(){t.deleteFunc(r.row.id)}}},"删除")])}}],u=[];return"0"===this.tabIndex?(e="superUserList",u=r):"1"===this.tabIndex?(e="officialAccount",u=n):"2"===this.tabIndex?(e="superMsg",u=s):(e="superMsg",u=a),{vm:this,url:v["a"].system.super[e],columns:u}}},methods:{beforeSearch:function(e){var t=Object(o["a"])({},this.searchParams),r="";return["2","3","4"].includes(this.tabIndex)&&(r=this.menuList[Number(this.tabIndex)].type),{page:e.page,pagesize:e.size,user_number:t.user_number,type:r}},getList:function(){this.$refs.tableList.getData()},destoryComp:function(){this.isDestoryComp=!1},setSuperUserFunc:function(e,t){var r=this;return Object(u["a"])(Object(a["a"])().mark((function n(){return Object(a["a"])().wrap((function(n){while(1)switch(n.prev=n.next){case 0:if("0"!==r.tabIndex){n.next=10;break}if(2!==t){n.next=5;break}r.$confirm("是否确认删除当前超管？").then(function(){var n=Object(u["a"])(Object(a["a"])().mark((function n(s){var u;return Object(a["a"])().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,Object(l["f"])({user_number:e,status:t});case 2:u=n.sent,2e3===u.code&&r.$success("删除成功"),r.getList();case 5:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}()).catch((function(e){})),n.next=8;break;case 5:return n.next=7,Object(l["f"])({user_number:e,status:t});case 7:r.getList();case 8:n.next=11;break;case 10:r.$confirm("是否确认删除当前官方？").then(function(){var t=Object(u["a"])(Object(a["a"])().mark((function t(n){var s;return Object(a["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(l["c"])({user_number:e});case 2:s=t.sent,2e3===s.code&&r.$success("删除成功"),r.getList();case 5:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()).catch((function(e){}));case 11:case"end":return n.stop()}}),n)})))()},reset:function(){this.searchParams={},this.getList()},onSearch:function(){this.getList()},add:function(){var e=this;this.isDestoryComp=!0,setTimeout((function(){["0","1"].includes(e.tabIndex)?e.$refs.addComp.dialogVisible=!0:e.$refs.messageComp.loadParams("add",e.menuList[Number(e.tabIndex)].type)}),100)},updateFunc:function(e){var t=this;this.isDestoryComp=!0,setTimeout((function(){t.$refs.messageComp.loadParams("update",e)}),100)},deleteFunc:function(e){var t=this;this.$confirm("是否确定删除该提示文案?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(u["a"])(Object(a["a"])().mark((function r(){var n;return Object(a["a"])().wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,Object(l["d"])({id:e});case 2:n=r.sent,2e3===n.code&&t.$message.success("删除成功"),t.getList();case 5:case"end":return r.stop()}}),r)}))))},tabChange:function(e){["2","3","4"].includes(e)&&this.getList()}}},I=$,L=(r("ff43"),Object(d["a"])(I,n,s,!1,null,null,null));t["default"]=L.exports},c024:function(e,t,r){"use strict";r.d(t,"e",(function(){return a})),r.d(t,"f",(function(){return u})),r.d(t,"a",(function(){return o})),r.d(t,"c",(function(){return i})),r.d(t,"b",(function(){return c})),r.d(t,"g",(function(){return l})),r.d(t,"d",(function(){return m}));var n=r("829b"),s=r("8daa");function a(e){return Object(n["a"])({url:s["a"].system.super.handlePunish,method:"post",data:e})}function u(e){return Object(n["a"])({url:s["a"].system.super.setSuperUser,method:"post",data:e})}function o(e){return Object(n["a"])({url:s["a"].system.super.add,method:"post",data:e})}function i(e){return Object(n["a"])({url:s["a"].system.super.del,method:"post",data:e})}function c(e){return Object(n["a"])({url:s["a"].system.super.addSuperMsg,method:"post",data:e})}function l(e){return Object(n["a"])({url:s["a"].system.super.updateSuperMsg,method:"post",data:e})}function m(e){return Object(n["a"])({url:s["a"].system.super.delSuperMsg,method:"post",data:e})}},c4c7:function(e,t,r){},ff43:function(e,t,r){"use strict";r("2048")}}]);