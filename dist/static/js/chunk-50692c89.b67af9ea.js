(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-50692c89"],{"0852":function(e,t,r){"use strict";var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"number-add-box"},[r("el-dialog",{attrs:{title:e.title,visible:e.dialogVisible,width:"600px","before-close":e.handleClose,"close-on-click-modal":!1},on:{"update:visible":function(t){e.dialogVisible=t},closed:e.destoryComp}},[r("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-suffix":":","label-width":"110px"}},[r("el-form-item",{attrs:{label:"商品类型",prop:"category"}},[r("el-select",{attrs:{placeholder:"请选择靓号类型",disabled:"update"===e.status},on:{change:function(t){return e.handleChange(e.ruleForm.category)}},model:{value:e.ruleForm.category,callback:function(t){e.$set(e.ruleForm,"category",t)},expression:"ruleForm.category"}},e._l(e.goodsNumTypeList,(function(e){return r("el-option",{key:e.value,attrs:{label:e.name,value:e.value}})})),1)],1),r("el-form-item",{attrs:{label:"商品分类",prop:"type_id"}},[r("el-select",{attrs:{placeholder:"请选择商品分类"},model:{value:e.ruleForm.type_id,callback:function(t){e.$set(e.ruleForm,"type_id",t)},expression:"ruleForm.type_id"}},e._l(e.goodsNumClassList,(function(e){return r("el-option",{key:e.value,attrs:{label:e.name,value:e.value}})})),1)],1),0===e.ruleForm.category&&"add"===e.status?r("el-form-item",{attrs:{label:"商品名称",prop:"number",rules:[{required:!0,validator:e.validateNumber,trigger:"blur"}]}},[r("el-input",{directives:[{name:"input-num",rawName:"v-input-num",value:!0,expression:"true"}],attrs:{placeholder:"请输入商品名称"},model:{value:e.ruleForm.number,callback:function(t){e.$set(e.ruleForm,"number",t)},expression:"ruleForm.number"}})],1):e._e(),1===e.ruleForm.category&&"add"===e.status?r("el-form-item",{attrs:{label:"商品名称",prop:"number",rules:[{required:!0,validator:e.validateNumber1,trigger:"blur"}]}},[r("el-input",{directives:[{name:"input-num",rawName:"v-input-num",value:!0,expression:"true"}],attrs:{placeholder:"请输入商品名称"},model:{value:e.ruleForm.number,callback:function(t){e.$set(e.ruleForm,"number",t)},expression:"ruleForm.number"}})],1):e._e(),""===e.ruleForm.category||"update"===e.status?r("el-form-item",{attrs:{label:"商品名称",prop:"number",rules:[{required:!0,message:"请输入商品名称",trigger:"blur"}]}},[r("el-input",{directives:[{name:"input-num",rawName:"v-input-num",value:!0,expression:"true"}],attrs:{placeholder:"请输入商品名称",disabled:"update"===e.status},model:{value:e.ruleForm.number,callback:function(t){e.$set(e.ruleForm,"number",t)},expression:"ruleForm.number"}})],1):e._e(),r("el-form-item",{attrs:{label:"备注"}},[r("el-input",{attrs:{type:"textarea",rows:4},model:{value:e.ruleForm.desc,callback:function(t){e.$set(e.ruleForm,"desc",t)},expression:"ruleForm.desc"}})],1),r("el-form-item",{attrs:{label:"是否可购买",prop:"buy"}},[r("el-radio-group",{on:{change:function(t){return e.handleBuyChange(e.ruleForm.buy)}},model:{value:e.ruleForm.buy,callback:function(t){e.$set(e.ruleForm,"buy",t)},expression:"ruleForm.buy"}},[r("el-radio",{attrs:{label:"0"}},[e._v("是")]),r("el-radio",{attrs:{label:"1"}},[e._v("否")])],1)],1),"0"===e.ruleForm.buy?r("el-form-item",{attrs:{label:"商品出售期限"}},e._l(e.ruleForm.price,(function(t,a){return r("div",{key:a,staticClass:"sellItem",staticStyle:{display:"flex"}},[r("el-input-number",{attrs:{placeholder:"请输入时间",min:1,precision:0,controls:!1,clearable:""},model:{value:t.day,callback:function(r){e.$set(t,"day",r)},expression:"item.day"}}),r("el-input-number",{attrs:{placeholder:"请输入价格（钻石）",min:1,precision:0,controls:!1,clearable:""},model:{value:t.price,callback:function(r){e.$set(t,"price",r)},expression:"item.price"}}),e.ruleForm.price.length-1<=a?r("el-button",{attrs:{type:"primary"},on:{click:e.handleAdd}},[e._v("添加")]):e.ruleForm.price.length-1>a?r("el-button",{attrs:{type:"danger"},on:{click:e.handleDel}},[e._v("删除")]):e._e()],1)})),0):e._e()],1),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(t){return e.resetForm("ruleForm")}}},[e._v("取 消")]),r("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm")}}},[e._v("确 定")])],1)],1)],1)},n=[],i=r("c7eb"),s=r("5530"),o=r("1da1"),u=(r("d3b7"),r("159b"),r("d9e2"),r("b64b"),r("e9c4"),r("25f0"),r("14d9"),r("a434"),r("a630"),r("3ca3"),r("13d5"),r("b0c0"),r("1a72")),l=r("279a"),c=r("ed08"),m={computed:{title:function(){return"add"===this.status?"新增商品":"update"===this.status?"修改商品":"查看商品"},StartPicker:function(){return{disabledDate:function(e){return e.getTime()<(new Date).getTime()-864e5}}},EndPicker:function(){return{disabledDate:function(e){return e.getTime()<(new Date).getTime()-864e5}}},limitRules:function(){var e=this.ruleForm.price,t=!1;e.forEach((function(e,r){e.day&&e.money||(t=!0)}));var r={};return r={required:!0,validator:function(e,r,a){t?a(new Error("请填写所有数据")):a()}},r}},data:function(){var e=function(e,t,r){t?t.length+""==="1"?r(new Error("长度不能为一位数")):r():r(new Error("密码不能为空"))},t=function(e,t,r){t?r():r(new Error("密码不能为空"))};return{dialogVisible:!1,goodsNumTypeList:l["a"].GOODNUMTYPE,goodsNumClassList:[],shopList:[],status:"add",oldParams:{},ruleForm:{category:"",type_id:"",number:"",buy:"0",price:[{day:void 0,price:void 0}],start_time:null,end_time:null},rules:{category:[{required:!0,message:"请选择商品类别",trigger:"change"}],type_id:[{required:!0,message:"请选择商品分类",trigger:"change"}],number:[{required:!0,message:"请输入商品名称",trigger:"blur"}],buy:[{required:!0,message:"请选择是否可购买",trigger:"change"}]},validateNumber:e,validateNumber1:t}},methods:{handleClose:function(){this.close()},load:function(e,t){if(this.status=e,"add"!==e){this.oldParams=t;var r=JSON.parse(JSON.stringify(t));r.buy=r.buy+"",r.start_time=1e3*r.start_time,r.end_time=1e3*r.end_time,this.$set(this.$data,"ruleForm",r),this.getPrettyNumTypeList(t.category)}},submitForm:Object(c["b"])(Object(o["a"])(Object(i["a"])().mark((function e(){var t,r,a,n=this;return Object(i["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t=this.ruleForm.price.some((function(e){return""===e.day||null==e.day||""===e.price||null==e.price})),r=this.ruleForm.price.every((function(e){return e.price>0})),a=this.ruleForm.number.toString(),0!=this.ruleForm.category){e.next=9;break}if(5===a.length||7===a.length||9===a.length){e.next=7;break}return this.$message.error("用户靓号只支持5位、7位、9位"),e.abrupt("return");case 7:e.next=13;break;case 9:if(1!=this.ruleForm.category){e.next=13;break}if(4===a.length||6===a.length||8===a.length){e.next=13;break}return this.$message.error("房间靓号只支持4位、6位、8位"),e.abrupt("return");case 13:if(!t||"0"!==this.ruleForm.buy){e.next=16;break}return this.$message.error("请确保商品出售期限没有空值！"),e.abrupt("return",!1);case 16:if(r||"0"!==this.ruleForm.buy){e.next=19;break}return this.$message.error("请确保商品价格在0以上！"),e.abrupt("return",!1);case 19:"1"===this.ruleForm.buy&&(this.ruleForm.price=[]),this.$refs["ruleForm"].validate((function(e){if(!e)return console.log("error submit!!"),!1;var t=Object(s["a"])({},n.ruleForm);t.start_time=Math.floor(t.start_time/1e3),t.end_time=Math.floor(t.end_time/1e3);var r=Object(s["a"])(Object(s["a"])({},t),{},{price:t.price,type_id:t.type_id+"",category:t.category+"",buy:t.buy+"",number:t.number+"",start_time:t.start_time+"",end_time:t.end_time+""});"add"===n.status?Object(u["d"])(r).then((function(e){2e3===e.code&&(n.dialogVisible=!1,n.$emit("onSearch"))})).catch((function(e){n.$message.error(e)})):"update"===n.status&&(r.id=t.id+"",Object(u["kc"])(r).then((function(e){2e3===e.code&&(n.dialogVisible=!1,n.$emit("onSearch"))})).catch((function(e){n.$message.error(e)})))}));case 21:case"end":return e.stop()}}),e,this)}))),500),handleAdd:function(){var e=this.ruleForm;e.price.length<3&&e.price.push({day:void 0,price:void 0})},handleDel:function(e){var t=this.ruleForm;t.price.splice(e,1)},resetForm:function(){this.close()},close:function(){var e=this;this.$confirm("关闭后数据不会保存，确定关闭吗？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){e.dialogVisible=!1,e.$emit("onSearch")})).catch((function(){}))},destoryComp:function(){this.$emit("destoryComp")},validateField:function(e){this.$refs.ruleForm.validateField([e])},timeChange:function(e){console.log("生效时间:",e)},timeChange2:function(e){console.log("失效时间:",e)},handleChange:function(e){this.getPrettyNumTypeList(e)},getPrettyNumTypeList:function(e){var t=this;return Object(o["a"])(Object(i["a"])().mark((function r(){var a,n;return Object(i["a"])().wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,Object(u["kb"])({category:e});case 2:a=r.sent,2e3===a.code&&(n=Array.from(Array.isArray(a.data)?a.data:[]),t.goodsNumClassList=n.reduce((function(e,t){return e.push({name:t.name,value:t.type_id}),e}),[])||[]);case 4:case"end":return r.stop()}}),r)})))()},handleBuyChange:function(e){("1"===e||"0"===e&&"[]"===JSON.stringify(this.ruleForm.price))&&this.$set(this.ruleForm,"price",[{day:void 0,price:void 0}])}},mounted:function(){}},d=m,p=(r("3bd6"),r("2877")),b=Object(p["a"])(d,a,n,!1,null,null,null);t["a"]=b.exports},"1fe8":function(e,t,r){e.exports=r.p+"static/img/error.e53687be.png"},2708:function(e,t,r){"use strict";var a=r("5530"),n=r("2f62"),i={data:function(){return{tabIndex:"0",page:1,size:10,limit:10,searchParams:{},dataParams:{}}},computed:Object(a["a"])({},Object(n["c"])({permissionArr:function(e){return e.permission.permissionArr}})),mounted:function(){console.log(this.permissionArr,"permissionArr")}};t["a"]=i},"3bd6":function(e,t,r){"use strict";r("4aa8")},"4aa8":function(e,t,r){},8724:function(e,t,r){},"8f96":function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"depot-box"},[r("div",{staticClass:"searchParams"},[r("SearchPanel",{attrs:{forms:e.forms,"show-reset":!0,"show-search-btn":!0,"show-add":e.permissionArr.includes("PrettyNumber@add")},on:{onReset:e.reset,onSearch:e.onSearch,add:e.add},model:{value:e.searchParams,callback:function(t){e.searchParams=t},expression:"searchParams"}})],1),r("div",{staticClass:"tableList"},[r("tableList",{ref:"tableList",attrs:{cfgs:e.cfgs},on:{saleAmunt:e.saleAmunt}})],1),e.isDestoryComp?r("addNumComp",{ref:"add",on:{onSearch:e.onSearch,destoryComp:e.destoryComp}}):e._e()],1)},n=[],i=r("c7eb"),s=r("1da1"),o=r("5530"),u=(r("7db0"),r("d3b7"),r("b0c0"),r("caad"),r("2532"),r("a630"),r("3ca3"),r("13d5"),r("14d9"),r("1a72")),l=r("4053"),c=r("04a2"),m=r("2708"),d=r("8daa"),p=r("279a"),b=r("0852"),h=(r("cf45"),{components:{tableList:l["a"],SearchPanel:c["a"],addNumComp:b["a"]},mixins:[m["a"]],computed:{forms:function(){var e=this;return[{name:"number",type:"input",value:"",label:"商品名称",isNum:!0,placeholder:"请输入商品名称"},{name:"category",type:"select",value:"",keyName:"value",optionLabel:"name",label:"商品类别",placeholder:"请选择",clearable:!0,linkage:!0,options:p["a"].GOODNUMTYPE,handler:{change:function(t){e.getPrettyNumTypeList(t)}}},{name:"type_id",type:"select",value:"",keyName:"value",optionLabel:"name",label:"商品分类",placeholder:"请选择",clearable:!0,options:this.goodsNumClassList},{name:"show_status",type:"select",value:"",keyName:"value",optionLabel:"name",label:"使用状态",placeholder:"请选择",clearable:!0,options:p["a"].GOODNUMSTATUS},{name:"dateTimeParams",type:"datePicker",dateType:"datetimerange",format:"yyyy-MM-dd HH:mm:ss",label:"时间选择",value:"",handler:{change:function(t){e.emptyDateTime(),e.setDateTime(t)},selectChange:function(t,r){e.emptyDateTime()}}}]},cfgs:function(){var e=this,t=[{label:"创建时间",prop:"create_time"},{label:"商品名称",prop:"number"},{label:"商品类型",prop:"cate"},{label:"商品分类",prop:"type_name"},{label:"使用状态",prop:"show_status",render:function(e,t){var r=p["a"].GOODNUMSTATUS.find((function(e){return e.value===t.row.show_status}));return e("span",r?r.name:"无")}},{label:"操作",minWidth:"160px",render:function(t,r){return t("div",[t("el-button",{props:{type:"primary",size:"mini"},style:{display:1===r.row.show_status&&e.permissionArr.includes("PrettyNumber@update")?"unset":"none"},on:{click:function(){e.update(r.row)}}},"修改"),t("el-button",{props:{type:"danger",size:"mini"},style:{display:1===r.row.show_status&&e.permissionArr.includes("PrettyNumber@del")?"unset":"none"},on:{click:function(){e.deleteParams(r.row.id)}}},"删除"),t("el-button",{props:{type:"success",size:"mini"},style:{display:1===r.row.show_status&&e.permissionArr.includes("PrettyNumber@update")?"unset":"none"},on:{click:function(){e.down(r.row,0)}}},"上架"),t("el-button",{props:{type:"info",size:"mini"},style:{display:2===r.row.show_status&&e.permissionArr.includes("PrettyNumber@update")?"unset":"none"},on:{click:function(){e.down(r.row,1)}}},"下架")])}},{label:"备注说明",prop:"desc"}];return{vm:this,url:d["a"].prettyNumber.prettyNumber,columns:this.permissionArr.includes("PrettyNumber@index")?t:[]}}},data:function(){return{ruleForm:{alreadyMoney:null,deductMoney:null},isDestoryComp:!1,searchParams:{category:"",type_id:"",show_status:""},goodsNumClassList:[]}},methods:{getList:function(){this.$refs.tableList.getData()},beforeSearch:function(e){var t=Object(o["a"])(Object(o["a"])({},this.searchParams),this.dateTimeParams);return{show_status:t.show_status,user_number:t.user_number,number:t.number,category:t.category,type_id:t.type_id,page:e.page,pagesize:e.size,start_time:Math.floor(t.start_time/1e3),end_time:Math.floor(t.end_time/1e3)}},setDateTime:function(e){var t=e?{start_time:e[0],end_time:e[1]}:{};this.$set(this,"dateTimeParams",t)},emptyDateTime:function(){this.dateTimeParams={}},reset:function(){this.searchParams={},this.dateTimeParams={activity_type_id:1},this.getList()},onSearch:function(){this.getList()},saleAmunt:function(e){},add:function(){this.load("add")},update:function(e){this.load("update",e)},down:function(e,t){var r=this,a=Object(o["a"])(Object(o["a"])({},e),{},{type_id:e.type_id+"",category:e.category+"",number:e.number+"",price:e.price,start_time:e.start_time+"",end_time:e.end_time+"",id:e.id+"",status:t+""});Object(u["kc"])(a).then((function(e){2e3===e.code&&r.onSearch()}))},deleteParams:function(e){var t=this;return Object(s["a"])(Object(i["a"])().mark((function r(){return Object(i["a"])().wrap((function(r){while(1)switch(r.prev=r.next){case 0:t.$confirm("确认删除当前靓号吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(s["a"])(Object(i["a"])().mark((function r(){var a;return Object(i["a"])().wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,Object(u["u"])({id:e+""});case 2:a=r.sent,2e3===a.code&&(t.$success("删除成功"),t.getList());case 4:case"end":return r.stop()}}),r)})))).catch((function(){}));case 1:case"end":return r.stop()}}),r)})))()},load:function(e,t){var r=this;this.isDestoryComp=!0,setTimeout((function(){r.$refs.add.dialogVisible=!0,r.$refs.add.load(e,t)}),100)},destoryComp:function(){this.isDestoryComp=!1},getPrettyNumTypeList:function(e){var t=this;return Object(s["a"])(Object(i["a"])().mark((function r(){var a,n;return Object(i["a"])().wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(t.goodsNumClassList=[],!e&&0!==e){r.next=6;break}return r.next=4,Object(u["kb"])({category:e});case 4:a=r.sent,2e3===a.code&&(n=Array.from(Array.isArray(a.data)?a.data:[]),t.goodsNumClassList=n.reduce((function(e,t){return e.push({name:t.name,value:t.type_id}),e}),[])||[]);case 6:t.getList();case 7:case"end":return r.stop()}}),r)})))()}}}),f=h,y=(r("98ca"),r("2877")),g=Object(y["a"])(f,a,n,!1,null,null,null);t["default"]=g.exports},"98ca":function(e,t,r){"use strict";r("8724")}}]);