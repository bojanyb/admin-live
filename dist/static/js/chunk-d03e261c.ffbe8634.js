(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d03e261c"],{"0852":function(e,t,r){"use strict";var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"number-add-box"},[r("el-dialog",{attrs:{title:e.title,visible:e.dialogVisible,width:"600px","before-close":e.handleClose,"close-on-click-modal":!1},on:{"update:visible":function(t){e.dialogVisible=t},closed:e.destoryComp}},[r("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-suffix":":","label-width":"110px"}},[r("el-form-item",{attrs:{label:"商品类型",prop:"category"}},[r("el-select",{attrs:{placeholder:"请选择靓号类型",disabled:"update"===e.status},on:{change:function(t){return e.handleChange(e.ruleForm.category)}},model:{value:e.ruleForm.category,callback:function(t){e.$set(e.ruleForm,"category",t)},expression:"ruleForm.category"}},e._l(e.goodsNumTypeList,(function(e){return r("el-option",{key:e.value,attrs:{label:e.name,value:e.value}})})),1)],1),r("el-form-item",{attrs:{label:"商品分类",prop:"type_id"}},[r("el-select",{attrs:{placeholder:"请选择商品分类"},model:{value:e.ruleForm.type_id,callback:function(t){e.$set(e.ruleForm,"type_id",t)},expression:"ruleForm.type_id"}},e._l(e.goodsNumClassList,(function(e){return r("el-option",{key:e.value,attrs:{label:e.name,value:e.value}})})),1)],1),0===e.ruleForm.category&&"add"===e.status?r("el-form-item",{attrs:{label:"商品名称",prop:"number",rules:[{required:!0,validator:e.validateNumber,trigger:"blur"}]}},[r("el-input",{directives:[{name:"input-num",rawName:"v-input-num",value:!0,expression:"true"}],attrs:{placeholder:"请输入商品名称"},model:{value:e.ruleForm.number,callback:function(t){e.$set(e.ruleForm,"number",t)},expression:"ruleForm.number"}})],1):e._e(),1===e.ruleForm.category&&"add"===e.status?r("el-form-item",{attrs:{label:"商品名称",prop:"number",rules:[{required:!0,validator:e.validateNumber1,trigger:"blur"}]}},[r("el-input",{directives:[{name:"input-num",rawName:"v-input-num",value:!0,expression:"true"}],attrs:{placeholder:"请输入商品名称"},model:{value:e.ruleForm.number,callback:function(t){e.$set(e.ruleForm,"number",t)},expression:"ruleForm.number"}})],1):e._e(),""===e.ruleForm.category||"update"===e.status?r("el-form-item",{attrs:{label:"商品名称",prop:"number",rules:[{required:!0,message:"请输入商品名称",trigger:"blur"}]}},[r("el-input",{directives:[{name:"input-num",rawName:"v-input-num",value:!0,expression:"true"}],attrs:{placeholder:"请输入商品名称",disabled:"update"===e.status},model:{value:e.ruleForm.number,callback:function(t){e.$set(e.ruleForm,"number",t)},expression:"ruleForm.number"}})],1):e._e(),r("el-form-item",{attrs:{label:"备注"}},[r("el-input",{attrs:{type:"textarea",rows:4},model:{value:e.ruleForm.desc,callback:function(t){e.$set(e.ruleForm,"desc",t)},expression:"ruleForm.desc"}})],1),r("el-form-item",{attrs:{label:"是否可购买",prop:"buy"}},[r("el-radio-group",{on:{change:function(t){return e.handleBuyChange(e.ruleForm.buy)}},model:{value:e.ruleForm.buy,callback:function(t){e.$set(e.ruleForm,"buy",t)},expression:"ruleForm.buy"}},[r("el-radio",{attrs:{label:"0"}},[e._v("是")]),r("el-radio",{attrs:{label:"1"}},[e._v("否")])],1)],1),"0"===e.ruleForm.buy?r("el-form-item",{attrs:{label:"商品出售期限"}},e._l(e.ruleForm.price,(function(t,a){return r("div",{key:a,staticClass:"sellItem",staticStyle:{display:"flex"}},[r("el-input-number",{attrs:{placeholder:"请输入时间",min:1,precision:0,controls:!1,clearable:""},model:{value:t.day,callback:function(r){e.$set(t,"day",r)},expression:"item.day"}}),r("el-input-number",{attrs:{placeholder:"请输入价格（钻石）",min:1,precision:0,controls:!1,clearable:""},model:{value:t.price,callback:function(r){e.$set(t,"price",r)},expression:"item.price"}}),e.ruleForm.price.length-1<=a?r("el-button",{attrs:{type:"primary"},on:{click:e.handleAdd}},[e._v("添加")]):e.ruleForm.price.length-1>a?r("el-button",{attrs:{type:"danger"},on:{click:e.handleDel}},[e._v("删除")]):e._e()],1)})),0):e._e()],1),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(t){return e.resetForm("ruleForm")}}},[e._v("取 消")]),r("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm")}}},[e._v("确 定")])],1)],1)],1)},n=[],i=r("c7eb"),o=r("5530"),s=r("1da1"),u=(r("d3b7"),r("159b"),r("d9e2"),r("b64b"),r("e9c4"),r("25f0"),r("14d9"),r("a434"),r("a630"),r("3ca3"),r("13d5"),r("b0c0"),r("1a72")),l=r("279a"),c=r("ed08"),d={computed:{title:function(){return"add"===this.status?"新增商品":"update"===this.status?"修改商品":"查看商品"},StartPicker:function(){return{disabledDate:function(e){return e.getTime()<(new Date).getTime()-864e5}}},EndPicker:function(){return{disabledDate:function(e){return e.getTime()<(new Date).getTime()-864e5}}},limitRules:function(){var e=this.ruleForm.price,t=!1;e.forEach((function(e,r){e.day&&e.money||(t=!0)}));var r={};return r={required:!0,validator:function(e,r,a){t?a(new Error("请填写所有数据")):a()}},r}},data:function(){var e=function(e,t,r){t?t.length+""==="1"?r(new Error("长度不能为一位数")):r():r(new Error("密码不能为空"))},t=function(e,t,r){t?r():r(new Error("密码不能为空"))};return{dialogVisible:!1,goodsNumTypeList:l["a"].GOODNUMTYPE,goodsNumClassList:[],shopList:[],status:"add",oldParams:{},ruleForm:{category:"",type_id:"",number:"",buy:"0",price:[{day:void 0,price:void 0}],start_time:null,end_time:null},rules:{category:[{required:!0,message:"请选择商品类别",trigger:"change"}],type_id:[{required:!0,message:"请选择商品分类",trigger:"change"}],number:[{required:!0,message:"请输入商品名称",trigger:"blur"}],buy:[{required:!0,message:"请选择是否可购买",trigger:"change"}]},validateNumber:e,validateNumber1:t}},methods:{handleClose:function(){this.close()},load:function(e,t){if(this.status=e,"add"!==e){this.oldParams=t;var r=JSON.parse(JSON.stringify(t));r.buy=r.buy+"",r.start_time=1e3*r.start_time,r.end_time=1e3*r.end_time,this.$set(this.$data,"ruleForm",r),this.getPrettyNumTypeList(t.category)}},submitForm:Object(c["b"])(Object(s["a"])(Object(i["a"])().mark((function e(){var t,r,a,n=this;return Object(i["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t=this.ruleForm.price.some((function(e){return""===e.day||null==e.day||""===e.price||null==e.price})),r=this.ruleForm.price.every((function(e){return e.price>0})),a=this.ruleForm.number.toString(),0!=this.ruleForm.category){e.next=9;break}if(5===a.length||7===a.length||9===a.length){e.next=7;break}return this.$message.error("用户靓号只支持5位、7位、9位"),e.abrupt("return");case 7:e.next=13;break;case 9:if(1!=this.ruleForm.category){e.next=13;break}if(4===a.length||6===a.length||8===a.length){e.next=13;break}return this.$message.error("房间靓号只支持4位、6位、8位"),e.abrupt("return");case 13:if(!t||"0"!==this.ruleForm.buy){e.next=16;break}return this.$message.error("请确保商品出售期限没有空值！"),e.abrupt("return",!1);case 16:if(r||"0"!==this.ruleForm.buy){e.next=19;break}return this.$message.error("请确保商品价格在0以上！"),e.abrupt("return",!1);case 19:"1"===this.ruleForm.buy&&(this.ruleForm.price=[]),this.$refs["ruleForm"].validate((function(e){if(!e)return console.log("error submit!!"),!1;var t=Object(o["a"])({},n.ruleForm);t.start_time=Math.floor(t.start_time/1e3),t.end_time=Math.floor(t.end_time/1e3);var r=Object(o["a"])(Object(o["a"])({},t),{},{price:t.price,type_id:t.type_id+"",category:t.category+"",buy:t.buy+"",number:t.number+"",start_time:t.start_time+"",end_time:t.end_time+""});"add"===n.status?Object(u["d"])(r).then((function(e){2e3===e.code&&(n.dialogVisible=!1,n.$emit("onSearch"))})).catch((function(e){n.$message.error(e)})):"update"===n.status&&(r.id=t.id+"",Object(u["lc"])(r).then((function(e){2e3===e.code&&(n.dialogVisible=!1,n.$emit("onSearch"))})).catch((function(e){n.$message.error(e)})))}));case 21:case"end":return e.stop()}}),e,this)}))),500),handleAdd:function(){var e=this.ruleForm;e.price.length<3&&e.price.push({day:void 0,price:void 0})},handleDel:function(e){var t=this.ruleForm;t.price.splice(e,1)},resetForm:function(){this.close()},close:function(){var e=this;this.$confirm("关闭后数据不会保存，确定关闭吗？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){e.dialogVisible=!1,e.$emit("onSearch")})).catch((function(){}))},destoryComp:function(){this.$emit("destoryComp")},validateField:function(e){this.$refs.ruleForm.validateField([e])},timeChange:function(e){console.log("生效时间:",e)},timeChange2:function(e){console.log("失效时间:",e)},handleChange:function(e){this.getPrettyNumTypeList(e)},getPrettyNumTypeList:function(e){var t=this;return Object(s["a"])(Object(i["a"])().mark((function r(){var a,n;return Object(i["a"])().wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,Object(u["jb"])({category:e});case 2:a=r.sent,2e3===a.code&&(n=Array.from(Array.isArray(a.data)?a.data:[]),t.goodsNumClassList=n.reduce((function(e,t){return e.push({name:t.name,value:t.type_id}),e}),[])||[]);case 4:case"end":return r.stop()}}),r)})))()},handleBuyChange:function(e){("1"===e||"0"===e&&"[]"===JSON.stringify(this.ruleForm.price))&&this.$set(this.ruleForm,"price",[{day:void 0,price:void 0}])}},mounted:function(){}},m=d,p=(r("3bd6"),r("2877")),b=Object(p["a"])(m,a,n,!1,null,null,null);t["a"]=b.exports},"1fe8":function(e,t,r){e.exports=r.p+"static/img/error.e53687be.png"},2708:function(e,t,r){"use strict";var a=r("5530"),n=r("2f62"),i={data:function(){return{tabIndex:"0",page:1,size:10,limit:10,searchParams:{},dataParams:{}}},computed:Object(a["a"])({},Object(n["c"])({permissionArr:function(e){return e.permission.permissionArr}})),mounted:function(){console.log(this.permissionArr,"permissionArr")}};t["a"]=i},"3bd6":function(e,t,r){"use strict";r("4aa8")},"4aa8":function(e,t,r){},"52f2":function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"number-box"},[r("div",{staticClass:"searchParams"},[r("SearchPanel",{attrs:{forms:e.forms,"show-reset":!0,"show-search-btn":!0,"show-add":!0},on:{onReset:e.reset,onSearch:e.onSearch,add:e.add},model:{value:e.searchParams,callback:function(t){e.searchParams=t},expression:"searchParams"}})],1),r("div",{staticClass:"tableList"},[r("tableList",{ref:"tableList",attrs:{cfgs:e.cfgs},on:{saleAmunt:e.saleAmunt}})],1),e.isDestoryComp?r("add",{ref:"add",on:{onSearch:e.onSearch,destoryComp:e.destoryComp}}):e._e()],1)},n=[],i=r("5530"),o=(r("7db0"),r("d3b7"),r("b0c0"),r("4e82"),r("4053")),s=r("04a2"),u=r("2708"),l=r("8daa"),c=r("e5de"),d=r("cf45"),m=r("279a"),p=r("0852"),b={components:{tableList:o["a"],SearchPanel:s["a"],add:p["a"]},mixins:[u["a"]],computed:{forms:function(){return[{name:"number",type:"input",value:"",label:"商品名称",isNum:!0,placeholder:"请输入商品名称"},{name:"type",type:"select",value:null,keyName:"value",optionLabel:"name",label:"商品类型",placeholder:"请选择",clearable:!0,options:m["a"].GOODNUMTYPE},{name:"status",type:"select",value:null,keyName:"value",optionLabel:"name",label:"商品分类",placeholder:"请选择",clearable:!0,options:m["a"].GOODNUMCLASS},{name:"status",type:"select",value:null,keyName:"value",optionLabel:"name",label:"状态",placeholder:"请选择",clearable:!0,options:m["a"].RACKSATUS}]},cfgs:function(){var e=this;return{vm:this,url:l["a"].shopping.list,columns:[{label:"创建时间",render:function(e,t){return e("span",t.row.up_time?Object(d["h"])(t.row.up_time,"YYYY-MM-DD HH:mm:ss",!0):"--")}},{label:"商品名称",isimg:!0,prop:"face",imgWidth:"50px",imgHeight:"50px"},{label:"商品类型",render:function(e,t){var r=m["a"].SHOPPING.find((function(e){return e.value===t.row.goods_type}));return e("div",{class:{bounce_fa:!0}},[e("span",r?r.name:"--")])}},{label:"商品分类",render:function(e,t){var r=m["a"].SHOPPING.find((function(e){return e.value===t.row.goods_type}));return e("div",{class:{bounce_fa:!0}},[e("span",r?r.name:"--")])}},{label:"修改时间",render:function(e,t){return e("span",t.row.up_time?Object(d["h"])(t.row.up_time,"YYYY-MM-DD HH:mm:ss",!0):"--")}},{label:"显示状态",render:function(e,t){var r=m["a"].RACKSATUS.find((function(e){return e.value===t.row.goods_type}));return e("div",{class:{bounce_fa:!0}},[e("span",r?r.name:"--")])}},{label:"操作",width:"260px",render:function(t,r){return t("div",[t("el-button",{props:{type:"primary"},on:{click:function(){e.update(r.row)}}},"修改"),t("el-button",{props:{type:"danger"},on:{click:function(){e.down(r.row)}}},"下架"),t("el-button",{props:{type:"danger"},style:{display:2===r.row.status?"none":"unset"},on:{click:function(){e.down(r.row,2)}}},"删除")])}}]}}},data:function(){return{ruleForm:{alreadyMoney:null,deductMoney:null},isDestoryComp:!1}},methods:{getList:function(){this.$refs.tableList.getData()},beforeSearch:function(e){var t=Object(i["a"])(Object(i["a"])({},this.searchParams),this.dateTimeParams);return{page:e.page,status:t.status,user_number:t.user_number,start_time:Math.floor(t.start_time/1e3),end_time:Math.floor(t.end_time/1e3),user_id:t.user_id,order_id:t.order_id,sort:t.sort,goods_type:t.goods_type}},setDateTime:function(e){var t=e?{start_time:e[0],end_time:e[1]}:{};this.$set(this,"dateTimeParams",t)},emptyDateTime:function(){this.dateTimeParams={}},reset:function(){this.searchParams={},this.dateTimeParams={activity_type_id:1},this.getList()},onSearch:function(){this.getList()},saleAmunt:function(e){},add:function(){this.load("add")},update:function(e){this.load("update",e)},down:function(e,t){var r=this,a={id:e.id,status:t};Object(c["b"])(a).then((function(e){2e3===e.code&&r.onSearch()}))},load:function(e,t){var r=this;this.isDestoryComp=!0,setTimeout((function(){r.$refs.add.dialogVisible=!0,r.$refs.add.load(e,t)}),100)},destoryComp:function(){this.isDestoryComp=!1}}},f=b,h=(r("6134"),r("2877")),g=Object(h["a"])(f,a,n,!1,null,null,null);t["default"]=g.exports},6134:function(e,t,r){"use strict";r("ed9e")},e5de:function(e,t,r){"use strict";r.d(t,"a",(function(){return i})),r.d(t,"b",(function(){return o})),r.d(t,"c",(function(){return s})),r.d(t,"d",(function(){return u}));var a=r("829b"),n=r("8daa");function i(e){return Object(a["a"])({url:n["a"].shopping.add,method:"post",data:e})}function o(e){return Object(a["a"])({url:n["a"].shopping.down,method:"post",data:e})}function s(e){return Object(a["a"])({url:n["a"].shopping.list,method:"post",data:e})}function u(e){return Object(a["a"])({url:n["a"].shopping.send,method:"post",data:e})}},ed9e:function(e,t,r){}}]);