(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-fd5654ee"],{"1fe8":function(e,t,r){e.exports=r.p+"static/img/error.e53687be.png"},"22a7":function(e,t,r){},2708:function(e,t,r){"use strict";var a=r("5530"),i=r("2f62"),s={data:function(){return{tabIndex:"0",page:1,size:10,limit:10,searchParams:{},dataParams:{}}},computed:Object(a["a"])({},Object(i["c"])({permissionArr:function(e){return e.permission.permissionArr}})),mounted:function(){console.log(this.permissionArr,"permissionArr")}};t["a"]=s},"42ba":function(e,t,r){"use strict";r.d(t,"e",(function(){return s})),r.d(t,"b",(function(){return n})),r.d(t,"a",(function(){return o})),r.d(t,"c",(function(){return u})),r.d(t,"d",(function(){return l})),r.d(t,"f",(function(){return c}));var a=r("829b"),i=r("8daa");function s(e){return Object(a["a"])({url:i["a"].userHistory.save,method:"post",data:e})}function n(e){return Object(a["a"])({url:i["a"].userHistory.getPromoterSub,method:"post",data:e})}function o(e){return Object(a["a"])({url:i["a"].userHistory.delete,method:"post",data:e})}function u(e){return Object(a["a"])({url:i["a"].userHistory.regPeplenishment,method:"post",data:e})}function l(e){return Object(a["a"])({url:i["a"].userHistory.replenishmentDel,method:"post",data:e})}function c(e){return Object(a["a"])({url:i["a"].userHistory.setBindStatus,method:"post",data:e})}},"4ec9":function(e,t,r){r("6f48")},"5a5d":function(e,t,r){},"6f48":function(e,t,r){"use strict";var a=r("6d61"),i=r("6566");a("Map",(function(e){return function(){return e(this,arguments.length?arguments[0]:void 0)}}),i)},aab0:function(e,t,r){},cbd1:function(e,t,r){"use strict";r("aab0")},d02c:function(e,t,r){"use strict";r("5a5d")},e35b:function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"recommend-promotion-system"},[r("div",{staticClass:"searchParams"},[r("SearchPanel",{attrs:{forms:e.forms,"show-add":!0,"show-search-btn":!0},on:{add:function(t){return e.add(1)},onSearch:e.onSearch},model:{value:e.searchParams,callback:function(t){e.searchParams=t},expression:"searchParams"}})],1),r("div",{staticClass:"tableList"},[r("tableList",{ref:"tableList",attrs:{cfgs:e.cfgs,loadLazy:e.loadLazy},on:{saleAmunt:e.saleAmunt}})],1),e.isDestoryComp?r("promoteAdd",{ref:"promoteAdd",on:{destoryComp:e.destoryComp,getList:e.getList}}):e._e(),e.isDestoryComp?r("groupCom",{ref:"groupCom",on:{destoryComp:e.destoryComp}}):e._e()],1)},i=[],s=r("5530"),n=r("c7eb"),o=r("1da1"),u=(r("4de4"),r("d3b7"),r("7db0"),r("4ec9"),r("3ca3"),r("ddb0"),r("42ba")),l=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"recommend-promotion-system-add"},[r("el-dialog",{attrs:{title:"add"===e.status?"新增"+e.title:"修改"+e.title,visible:e.dialogVisible,width:"500px","before-close":e.handleClose},on:{"update:visible":function(t){e.dialogVisible=t},closed:e.closed}},[r("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"100px","label-position":"left"}},[r("el-form-item",{attrs:{label:e.title+"ID",prop:"user_number"}},[r("el-input",{attrs:{oninput:"this.value=this.value.replace(/[^\\d]/g,'');"},model:{value:e.ruleForm.user_number,callback:function(t){e.$set(e.ruleForm,"user_number",t)},expression:"ruleForm.user_number"}})],1),r("el-form-item",{attrs:{label:"推广单价1",prop:"price1"}},[r("el-input",{model:{value:e.ruleForm.price1,callback:function(t){e.$set(e.ruleForm,"price1",t)},expression:"ruleForm.price1"}})],1),r("el-form-item",{attrs:{label:"推广单价2",prop:"price2"}},[r("el-input",{model:{value:e.ruleForm.price2,callback:function(t){e.$set(e.ruleForm,"price2",t)},expression:"ruleForm.price2"}})],1),r("el-form-item",{attrs:{label:"推广单价3",prop:"price3"}},[r("el-input",{model:{value:e.ruleForm.price3,callback:function(t){e.$set(e.ruleForm,"price3",t)},expression:"ruleForm.price3"}})],1),r("el-form-item",{attrs:{label:"邀请用户详情",prop:"user_detail","label-width":"140px"}},[r("el-switch",{model:{value:e.ruleForm.user_detail,callback:function(t){e.$set(e.ruleForm,"user_detail",t)},expression:"ruleForm.user_detail"}})],1),r("el-form-item",{attrs:{label:"邀请充值用户权限",prop:"recharge_detail","label-width":"140px"}},[r("el-switch",{model:{value:e.ruleForm.recharge_detail,callback:function(t){e.$set(e.ruleForm,"recharge_detail",t)},expression:"ruleForm.recharge_detail"}})],1)],1),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")]),r("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm")}}},[e._v("确 定")])],1)],1)],1)},c=[],d=(r("b64b"),r("e9c4"),{data:function(){return{dialogVisible:!1,status:"add",type:null,form:{},ruleForm:{id:null,pid:0,user_number:"",price1:"",price2:"",price3:"",user_detail:!1,recharge_detail:!1},oldParams:{},rules:{user_number:[{required:!0,message:"请输入推广商ID",trigger:"blur"}],price1:[{required:!0,message:"请输入推广单价1",trigger:"blur"}],price2:[{required:!0,message:"请输入推广单价2",trigger:"blur"}],price3:[{required:!0,message:"请输入推广单价3",trigger:"blur"}]}}},computed:{title:function(){var e=this,t=["推广商","推广组","推广员"],r=t.find((function(t,r){return r+1===e.type}));return r||""}},methods:{handleClose:function(){this.dialogVisible=!1},loadParams:function(e,t,r){if(this.status=e,this.dialogVisible=!0,this.type=r,t.user_detail=!!t.tab_auth.user_detail,t.recharge_detail=!!t.tab_auth.recharge_detail,"add"!==e){var a=JSON.parse(JSON.stringify(t));this.$set(this.$data,"ruleForm",a)}else this.$set(this.$data,"form",t);this.oldParams=JSON.parse(JSON.stringify(this.ruleForm))},submitForm:function(e){var t=this;return Object(o["a"])(Object(n["a"])().mark((function r(){return Object(n["a"])().wrap((function(r){while(1)switch(r.prev=r.next){case 0:t.$refs[e].validate(function(){var e=Object(o["a"])(Object(n["a"])().mark((function e(r){var a,i,o,l;return Object(n["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!r){e.next=12;break}return a=Object(s["a"])({},t.ruleForm),i=Object(s["a"])({},t.form),o={id:a.id,user_number:a.user_number,price1:a.price1,price2:a.price2,price3:a.price3,pid:a.pid},o.tab_auth={user_detail:a.user_detail?1:0,recharge_detail:a.recharge_detail?1:0},1!==t.type&&"add"===t.status&&(o.pid=i.id),e.next=8,Object(u["e"])(o);case 8:l=e.sent,2e3===l.code&&(t.dialogVisible=!1,t.$emit("getList"),"add"===t.status?t.$success("新增成功"):t.$success("修改成功")),e.next=14;break;case 12:return console.log("error submit!!"),e.abrupt("return",!1);case 14:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 1:case"end":return r.stop()}}),r)})))()},resetForm:function(e){this.$refs[e].resetFields()},closed:function(){this.$emit("destoryComp")}}}),m=d,p=(r("d02c"),r("2877")),f=Object(p["a"])(m,l,c,!1,null,null,null),b=f.exports,h=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"recommend-promotion-system-groupCom"},[r("el-dialog",{attrs:{title:"推广组列表",visible:e.dialogVisible,width:"800px","before-close":e.handleClose},on:{"update:visible":function(t){e.dialogVisible=t}}},[r("div",{staticClass:"searchParams"},[r("SearchPanel",{attrs:{forms:e.forms,"show-add":!0,"show-search-btn":!0},on:{add:e.add,onSearch:e.onSearch},model:{value:e.searchParams,callback:function(t){e.searchParams=t},expression:"searchParams"}})],1),r("div",{staticClass:"tableList"},[r("tableList",{ref:"tableList",attrs:{cfgs:e.cfgs}})],1),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")]),r("el-button",{attrs:{type:"primary"},on:{click:function(t){e.dialogVisible=!1}}},[e._v("确 定")])],1)]),e.isDestoryComp?r("add",{ref:"add",attrs:{type:e.type},on:{destoryComp:e.destoryComp}}):e._e()],1)},g=[],v=(r("99af"),r("4053")),y=r("04a2"),_=r("2708"),w=r("8daa"),x={mixins:[_["a"]],components:{tableList:v["a"],SearchPanel:y["a"],add:b},data:function(){return{dialogVisible:!1,ruleForm:{},isDestoryComp:!1,type:null}},computed:{forms:function(){var e=[{name:"user_number",type:"input",value:"",label:"推广组ID",isNum:!0,placeholder:"请输入推广组ID"},{name:"price",type:"input",value:"",label:"推广单价",isNum:!0,placeholder:"请输入推广单价"}],t=[{name:"user_number",type:"input",value:"",label:"推广组ID",isNum:!0,placeholder:"请输入推广组ID"},{name:"user_number",type:"input",value:"",label:"推广员ID",isNum:!0,placeholder:"请输入推广员ID"}];return 2===this.type?e:t},cfgs:function(){var e=this,t=[{label:"添加时间",render:function(e,t){return e("span",t.row.create_time?timeFormat(t.row.create_time,"YYYY-MM-DD HH:mm:ss",!0):"无")}},{label:"推广组ID",prop:"user_number"}],r=[{label:"推广单价",prop:"price"}],a=[{label:"推广员ID",prop:"price"}],i=[{label:"操作",render:function(t,r){return t("div",[t("el-button",{props:{type:"danger"},on:{click:function(){e.deleteParams(r.row)}}},"删除")])}}];return{vm:this,url:w["a"].userHistory.index,columns:2===this.type?[].concat(t,r,i):[].concat(t,a,i)}}},methods:{handleClose:function(){this.dialogVisible=!1},beforeSearch:function(e){var t=Object(s["a"])(Object(s["a"])({},this.searchParams),this.dateTimeParams),r={page:e.page,pagesize:e.size,user_number:t.user_number,pid:this.ruleForm.id,price:t.price};return 2===this.type||3===this.type&&delete r.price,r},loadParams:function(e,t){this.dialogVisible=!0,this.ruleForm=e,this.type=t},reset:function(){this.searchParams={},this.dateTimeParams={},this.getList()},onSearch:function(){this.getList()},add:function(){this.load("add")},update:function(e){this.load("update",e)},load:function(e,t){var r=this;this.isDestoryComp=!0,setTimeout((function(){r.$refs.add.loadParams(e,t)}),50)},destoryComp:function(){this.dialogVisible=!1}}},O=x,j=(r("cbd1"),Object(p["a"])(O,h,g,!1,null,null,null)),F=j.exports,C=r("cf45"),P=r("279a"),D={components:{tableList:v["a"],SearchPanel:y["a"],promoteAdd:b,groupCom:F},mixins:[_["a"]],computed:{statusComputed:function(){var e=P["a"].STATUSLIST;return e.filter((function(e){return 1!==e.value}))},forms:function(){return[{name:"user_number",type:"input",value:"",label:"推广商ID",isNum:!0,placeholder:"请输入推广商ID"}]},cfgs:function(){var e=this;return{vm:this,url:w["a"].userHistory.index,defaultExpandAll:!1,children:"children",columns:[{label:"创建时间",minWidth:"110px",render:function(e,t){return e("span",t.row.create_time?Object(C["h"])(t.row.create_time,"YYYY-MM-DD HH:mm:ss",!0):"无")}},{label:"用户昵称",prop:"nickname"},{label:"头像",isimg:!0,prop:"face",imgWidth:"50px",imgHeight:"50px"},{label:"推广ID",minWidth:"90px",render:function(e,t){var r=["推广商","推广组","推广员"],a=r.find((function(e,r){return r+1===t.row.level}));return e("span",a+"ID - "+t.row.user_number||"无")}},{label:"绑定状态",prop:"bind_status",render:function(e,t){return e("span",1===t.row.bind_status?"已绑定":2===t.row.bind_status?"未绑定":"无")}},{label:"查看权限",prop:"bind_status",minWidth:"120px",render:function(e,t){return e("div",[e("div","邀请用户详情: ".concat(t.row.tab_auth.user_detail?"开启":"关闭")),e("div","邀请充值用户权限: ".concat(t.row.tab_auth.recharge_detail?"开启":"关闭"))])}},{label:"推广单价",render:function(e,t){return e("div",[e("div",{style:{lineHeight:"18px"}},"推广单价1 - "+t.row.price1),e("div",{style:{lineHeight:"18px"}},"推广单价2 - "+t.row.price2),e("div",{style:{lineHeight:"18px"}},"推广单价3 - "+t.row.price3)])}},{label:"操作",minWidth:"160px",render:function(t,r){return t("div",[t("el-button",{props:{type:"primary"},on:{click:function(){e.update(r.row,r.row.level)}}},"修改"),t("el-button",{props:{type:"danger"},on:{click:function(){e.deleteParams(r.row)}}},"删除"),t("el-button",{props:{type:"success"},style:{display:3===r.row.level?"none":"unset"},on:{click:function(){e.add(r.row.level+1,r.row)}}},"新增"),t("el-button",{props:{type:"".concat(1===r.row.bind_status?"info":2===r.row.bind_status?"warning":"")},on:{click:function(){e.handleBind(r.row)}}},"".concat(1===r.row.bind_status?"解绑":2===r.row.bind_status?"绑定":"未知"))])}}]}}},data:function(){return{ruleForm:{alreadyMoney:null,deductMoney:null},isDestoryComp:!1,form:{},loadData:new Map}},methods:{loadLazy:function(e,t,r,a){var i=this;return Object(o["a"])(Object(n["a"])().mark((function s(){var o;return Object(n["a"])().wrap((function(s){while(1)switch(s.prev=s.next){case 0:return s.next=2,Object(u["b"])({pid:e.id});case 2:o=s.sent,i.loadData.set(e.id,{tree:e,treeNode:t,resolve:r}),a(o.data.list||[]);case 5:case"end":return s.stop()}}),s)})))()},getList:function(){this.$refs.tableList.getData()},refresh:function(){var e=this.form.id,t=this.loadData.get(e),r=t.tree,a=t.treeNode,i=t.resolve;this.$set(this.$refs.tableList.$refs.table.store.states.lazyTreeNodeMap,e,[]),this.loadLazy(r,a,i,(function(e){i(e||[])}))},beforeSearch:function(e){var t=Object(s["a"])(Object(s["a"])({},this.searchParams),this.dateTimeParams);return{page:e.page,pagesize:e.size,user_number:t.user_number}},setDateTime:function(e){var t=e?{start_time:e[0],end_time:e[1]}:{};this.$set(this,"dateTimeParams",t)},emptyDateTime:function(){this.dateTimeParams={}},reset:function(){this.searchParams={},this.dateTimeParams={},this.getList()},onSearch:function(){this.getList()},saleAmunt:function(e){this.ruleForm.alreadyMoney=e.totalmoney?e.totalmoney:0,this.ruleForm.deductMoney=e.rate_money?e.rate_money:0},add:function(e,t){this.type=e,this.load("add",t)},update:function(e,t){this.type=t,this.load("update",e)},load:function(e,t){var r=this;this.isDestoryComp=!0,this.form=t,setTimeout((function(){r.$refs.promoteAdd.loadParams(e,t,r.type)}),50)},deleteParams:function(e){var t=this;return Object(o["a"])(Object(n["a"])().mark((function r(){return Object(n["a"])().wrap((function(r){while(1)switch(r.prev=r.next){case 0:t.form=e,t.$confirm("确认删除当前推广商吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(o["a"])(Object(n["a"])().mark((function r(){var a;return Object(n["a"])().wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,Object(u["a"])({id:e.id});case 2:a=r.sent,2e3===a.code&&(t.$success("删除成功"),t.getList());case 4:case"end":return r.stop()}}),r)})))).catch((function(){}));case 2:case"end":return r.stop()}}),r)})))()},handleBind:function(e){var t=this;return Object(o["a"])(Object(n["a"])().mark((function r(){var a;return Object(n["a"])().wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,Object(u["f"])({id:e.id,status:2===e.bind_status?1:1===e.bind_status?2:0});case 2:a=r.sent,2e3===+a.code&&(t.$success("操作成功"),t.getList());case 4:case"end":return r.stop()}}),r)})))()},destoryComp:function(){this.isDestoryComp=!1}}},k=D,$=(r("f3f8"),Object(p["a"])(k,a,i,!1,null,null,null));t["default"]=$.exports},f3f8:function(e,t,r){"use strict";r("22a7")}}]);