(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3568e499"],{"06ba":function(e,t,r){"use strict";r("ee51")},"1fe8":function(e,t,r){e.exports=r.p+"static/img/error.e53687be.png"},"21b9":function(e,t,r){"use strict";r("e737")},2708:function(e,t,r){"use strict";var a=r("5530"),n=r("2f62"),o={data:function(){return{tabIndex:"0",page:1,size:10,limit:10,searchParams:{},dataParams:{}}},computed:Object(a["a"])({},Object(n["c"])({permissionArr:function(e){return e.permission.permissionArr}})),mounted:function(){console.log(this.permissionArr,"permissionArr")}};t["a"]=o},3976:function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"sell-box"},[r("div",{staticClass:"searchParams"},[r("SearchPanel",{attrs:{forms:e.forms,"show-add":!0,addName:"赠送","show-reset":!0,"show-search-btn":!0},on:{onReset:e.reset,onSearch:e.onSearch,add:e.add},model:{value:e.searchParams,callback:function(t){e.searchParams=t},expression:"searchParams"}})],1),r("div",{staticClass:"tableList"},[r("tableList",{ref:"tableList",attrs:{cfgs:e.cfgs},on:{saleAmunt:e.saleAmunt}})],1),e.isDestoryComp?r("addNumComp",{ref:"add",on:{onSearch:e.onSearch,destoryComp:e.destoryComp}}):e._e()],1)},n=[],o=r("5530"),s=(r("7db0"),r("d3b7"),r("b0c0"),r("4053")),i=r("04a2"),l=r("2708"),u=r("8daa"),c=r("e5de"),m=r("cf45"),d=r("279a"),p=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"depot-add-box"},[r("el-dialog",{attrs:{title:e.title,visible:e.dialogVisible,width:"600px","before-close":e.handleClose,"close-on-click-modal":!1},on:{"update:visible":function(t){e.dialogVisible=t},closed:e.destoryComp}},[r("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-suffix":":","label-width":"110px"}},[r("el-form-item",{attrs:{label:"用户ID",prop:"user_number"}},[r("el-input",{attrs:{placeholder:"请输入用户ID",clearable:""},model:{value:e.ruleForm.user_number,callback:function(t){e.$set(e.ruleForm,"user_number",t)},expression:"ruleForm.user_number"}})],1),r("el-form-item",{attrs:{label:"赠送商品",prop:"id"}},[r("el-select",{attrs:{filterable:"",placeholder:"请输入靓号ID",clearable:""},model:{value:e.ruleForm.id,callback:function(t){e.$set(e.ruleForm,"id",t)},expression:"ruleForm.id"}},e._l(e.goodsListOfindex,(function(e){return r("el-option",{key:e.value,attrs:{label:e.name,value:e.value}})})),1)],1),r("el-form-item",{attrs:{label:"赠送天数",prop:"day"}},[r("el-input",{attrs:{placeholder:"请输入赠送天数",clearable:""},model:{value:e.ruleForm.day,callback:function(t){e.$set(e.ruleForm,"day",t)},expression:"ruleForm.day"}})],1),r("el-form-item",{attrs:{label:"赠送原因",prop:"remark"}},[r("el-input",{attrs:{type:"textarea",autosize:{minRows:2,maxRows:4},placeholder:"请输入备注说明",maxlength:"300"},model:{value:e.ruleForm.remark,callback:function(t){e.$set(e.ruleForm,"remark",t)},expression:"ruleForm.remark"}})],1)],1),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(t){return e.resetForm("ruleForm")}}},[e._v("取 消")]),r("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm")}}},[e._v("确 定")])],1)],1)],1)},f=[],b=r("c7eb"),h=r("1da1"),g=(r("159b"),r("d9e2"),r("b64b"),r("e9c4"),r("a9e3"),r("a630"),r("3ca3"),r("13d5"),r("14d9"),r("1a72")),y={components:{},computed:{title:function(){return"add"===this.status?"新增商品":"update"===this.status?"修改商品":"查看商品"},limitRules:function(){var e=this.ruleForm.time_limit,t=!1;e.forEach((function(e,r){e.day&&e.money||(t=!0)}));var r={};return r={required:!0,validator:function(e,r,a){t?a(new Error("请填写所有数据")):a()}},r}},data:function(){return{dialogVisible:!1,goodsNumTypeList:d["a"].GOODNUMTYPE,goodsType:1,status:"add",oldParams:{},ruleForm:{id:null,day:"",user_number:"",remark:""},rules:{id:[{required:!0,message:"请输入靓号ID",trigger:"change"}],day:[{required:!0,message:"请输入到期时间",trigger:"blur"}],user_number:[{required:!0,message:"请输入用户ID",trigger:"blur"}],remark:[{required:!0,message:"请输入备注说明",trigger:"blur"},{min:1,max:300,message:"长度在 1 到 300 个字符",trigger:"blur"}]},goodsListOfindex:[]}},created:function(){this.searchPrettyNumber()},methods:{handleClose:function(){this.close()},load:function(e,t){if(this.status=e,"add"!==e){this.oldParams=t;var r=JSON.parse(JSON.stringify(t));this.$set(this.$data,"ruleForm",r)}},submitForm:function(e){var t=this;this.$refs[e].validate((function(e){if(!e)return console.log("error submit!!"),!1;var r=Object(o["a"])(Object(o["a"])({},t.ruleForm),{},{"admin-token":t.$store.getters.token,uid:Number(localStorage.getItem("admin_id"))});Object(g["ub"])(r).then((function(e){2e3===e.code&&(t.dialogVisible=!1,t.$emit("onSearch"))})).catch((function(e){t.$message.error(e)}))}))},resetForm:function(e){this.close()},close:function(){var e=this;this.$confirm("关闭后数据不会保存，确定关闭吗？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){e.dialogVisible=!1,e.$emit("onSearch")})).catch((function(){}))},destoryComp:function(){this.$emit("destoryComp")},validateField:function(e){this.$refs.ruleForm.validateField([e])},searchPrettyNumber:function(){var e=this;return Object(h["a"])(Object(b["a"])().mark((function t(){var r,a;return Object(b["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(g["Sb"])();case 2:r=t.sent,2e3===r.code&&(a=Array.from(Array.isArray(r.data)?r.data:[]),e.goodsListOfindex=a.reduce((function(e,t){return e.push({name:t.number,value:t.id}),e}),[])||[]);case 4:case"end":return t.stop()}}),t)})))()}},mounted:function(){}},v=y,_=(r("21b9"),r("2877")),O=Object(_["a"])(v,p,f,!1,null,null,null),F=O.exports,x={components:{tableList:s["a"],SearchPanel:i["a"],addNumComp:F},mixins:[l["a"]],computed:{forms:function(){var e=this;return[{name:"user_number",type:"input",value:"",label:"用户ID",isNum:!0,placeholder:"请输入用户ID"},{name:"number",type:"input",value:"",label:"靓号ID",isNum:!0,placeholder:"请输入靓号ID"},{name:"scene",type:"select",value:"",keyName:"value",optionLabel:"name",label:"发放类型",placeholder:"请选择",clearable:!0,options:d["a"].GOODSENDSTATUS},{name:"log_status",type:"select",value:"",keyName:"value",optionLabel:"name",label:"状态",placeholder:"请选择",clearable:!0,options:d["a"].SELLLOGSTATUS},{name:"dateTimeParams",type:"datePicker",dateType:"datetimerange",format:"yyyy-MM-dd HH:mm:ss",label:"时间选择",value:"",handler:{change:function(t){e.emptyDateTime(),e.setDateTime(t)},selectChange:function(t,r){e.emptyDateTime()}}}]},cfgs:function(){return{vm:this,url:u["a"].prettyNumber.PrettyNumberLog,columns:[{label:"购买时间",render:function(e,t){return e("span",t.row.create_time?Object(m["h"])(t.row.create_time,"YYYY-MM-DD HH:mm:ss",!0):"--")}},{label:"用户ID",render:function(e,t){return e("span",t.row.user_number)}},{label:"商品类型",prop:"cate"},{label:"商品分类",prop:"type_name"},{label:"发放类型",prop:"channel"},{label:"靓号ID",render:function(e,t){return e("span",t.row.number)}},{label:"使用时长",prop:"day"},{label:"购买金额",prop:"price"},{label:"状态",prop:"log_status",render:function(e,t){var r=d["a"].SELLLOGSTATUS.find((function(e){return e.value===t.row.log_status}));return e("span",r?r.name:"无")}}]}}},data:function(){return{ruleForm:{alreadyMoney:null,deductMoney:null},isDestoryComp:!1}},methods:{getList:function(){this.$refs.tableList.getData()},beforeSearch:function(e){var t=Object(o["a"])(Object(o["a"])({},this.searchParams),this.dateTimeParams);return console.log(t,"s"),{page:e.page,pagesize:e.size,number:t.number?t.number:"",user_number:t.user_number?t.user_number:"",scene:t.scene+"",start_time:Math.floor(t.start_time/1e3),end_time:Math.floor(t.end_time/1e3),log_status:t.log_status?t.log_status:""}},setDateTime:function(e){var t=e?{start_time:e[0],end_time:e[1]}:{};this.$set(this,"dateTimeParams",t)},emptyDateTime:function(){this.dateTimeParams={}},reset:function(){this.searchParams={},this.dateTimeParams={activity_type_id:1},this.getList()},onSearch:function(){this.getList()},add:function(){this.load("add")},saleAmunt:function(e){},update:function(e){this.load("update",e)},down:function(e,t){var r=this,a={id:e.id,status:t};Object(c["b"])(a).then((function(e){2e3===e.code&&r.onSearch()}))},load:function(e,t){var r=this;this.isDestoryComp=!0,setTimeout((function(){r.$refs.add.dialogVisible=!0,r.$refs.add.load(e,t)}),100)},destoryComp:function(){this.isDestoryComp=!1}}},D=x,w=(r("06ba"),Object(_["a"])(D,a,n,!1,null,null,null));t["default"]=w.exports},e5de:function(e,t,r){"use strict";r.d(t,"a",(function(){return o})),r.d(t,"b",(function(){return s})),r.d(t,"c",(function(){return i})),r.d(t,"d",(function(){return l}));var a=r("829b"),n=r("8daa");function o(e){return Object(a["a"])({url:n["a"].shopping.add,method:"post",data:e})}function s(e){return Object(a["a"])({url:n["a"].shopping.down,method:"post",data:e})}function i(e){return Object(a["a"])({url:n["a"].shopping.list,method:"post",data:e})}function l(e){return Object(a["a"])({url:n["a"].shopping.send,method:"post",data:e})}},e737:function(e,t,r){},ee51:function(e,t,r){}}]);