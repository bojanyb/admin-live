(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-cce0c454"],{"127f":function(e,t,a){"use strict";a.d(t,"a",(function(){return l}));var r=a("c7eb"),n=a("1da1"),o=(a("b0c0"),a("d3b7"),a("8237")),s=a.n(o),i=a("9b15"),c={ossParams:{region:"oss-cn-shenzhen",success_action_status:"200",accessKeyId:"LTAI5tFTcRH7h3RXKoYmnWMk",accessKeySecret:"qdx4B8jIh2VjBgBDG5fNfG0Oj21GSP",bucket:"live-huidapay-net"}};function u(e){var t=e.name.split("."),a=s()(Date.now()+t[0]);return a=a+"."+t[t.length-1],a}function l(e){return new Promise(function(){var t=Object(n["a"])(Object(r["a"])().mark((function t(a,n){var o,s;return Object(r["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return o=u(e),s=new i({region:c.ossParams.region,accessKeyId:c.ossParams.accessKeyId,accessKeySecret:c.ossParams.accessKeySecret,bucket:c.ossParams.bucket}),t.next=4,s.multipartUpload(o,e);case 4:t.sent,a({url:"https://photo.aiyi.live/"+o});case 6:case"end":return t.stop()}}),t)})));return function(e,a){return t.apply(this,arguments)}}())}},"1fe8":function(e,t,a){e.exports=a.p+"static/img/error.e53687be.png"},2708:function(e,t,a){"use strict";var r=a("5530"),n=a("2f62"),o={data:function(){return{tabIndex:"0",page:1,size:10,limit:10,searchParams:{},dataParams:{}}},computed:Object(r["a"])({},Object(n["c"])({permissionArr:function(e){return e.permission.permissionArr}})),mounted:function(){console.log(this.permissionArr,"permissionArr")}};t["a"]=o},"325a":function(e,t,a){},"38a4":function(e,t,a){"use strict";a("325a")},"4678a":function(e,t,a){},c8da:function(e,t,a){"use strict";a.d(t,"a",(function(){return r}));a("d3b7");function r(e){return new Promise((function(t){var a=new FileReader;a.onload=function(e){var a=e.target.result,r=new Image;r.onload=function(){var e=r.width,a=r.height;t({width:e,height:a})},r.src=a},a.readAsDataURL(e)}))}},ceaf:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"shop-box"},[a("div",{staticClass:"searchParams"},[a("SearchPanel",{attrs:{forms:e.forms,"show-reset":!0,"show-search-btn":!0,"show-add":!0},on:{onReset:e.reset,onSearch:e.onSearch,add:e.add},model:{value:e.searchParams,callback:function(t){e.searchParams=t},expression:"searchParams"}})],1),a("div",{staticClass:"tableList"},[a("tableList",{ref:"tableList",attrs:{cfgs:e.cfgs},on:{saleAmunt:e.saleAmunt}})],1),e.isDestoryComp?a("add",{ref:"add",on:{onSearch:e.onSearch,destoryComp:e.destoryComp}}):e._e()],1)},n=[],o=a("c7eb"),s=a("1da1"),i=a("5530"),c=(a("7db0"),a("d3b7"),a("b0c0"),a("1a72")),u=a("4053"),l=a("04a2"),d=a("2708"),m=a("8daa"),p=a("e5de"),f=a("cf45"),h=a("279a"),g=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"shop-add-box"},[a("el-dialog",{attrs:{title:e.title,visible:e.dialogVisible,width:"600px","before-close":e.handleClose,"close-on-click-modal":!1},on:{"update:visible":function(t){e.dialogVisible=t},closed:e.destoryComp}},[a("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-suffix":":","label-width":"110px"}},[a("el-form-item",{attrs:{label:"商品类别",prop:"category"}},[a("el-select",{attrs:{placeholder:"请选择商品类别",disabled:"update"===e.status},on:{change:function(t){return e.handleChange(e.ruleForm.category)}},model:{value:e.ruleForm.category,callback:function(t){e.$set(e.ruleForm,"category",t)},expression:"ruleForm.category"}},e._l(e.goodsNumTypeList,(function(e){return a("el-option",{key:e.value,attrs:{label:e.name,value:e.value}})})),1)],1),a("el-form-item",{attrs:{label:"商品分类",prop:"name"}},[a("el-input",{attrs:{placeholder:"请输入商品分类",maxlength:"10",clearable:""},model:{value:e.ruleForm.name,callback:function(t){e.$set(e.ruleForm,"name",t)},expression:"ruleForm.name"}})],1),a("el-form-item",{attrs:{label:"显示状态",prop:"status"}},[a("el-select",{attrs:{placeholder:"请选择显示状态"},model:{value:e.ruleForm.status,callback:function(t){e.$set(e.ruleForm,"status",t)},expression:"ruleForm.status"}},e._l(e.showStatus,(function(e){return a("el-option",{key:e.value,attrs:{label:e.name,value:e.value}})})),1)],1),a("el-form-item",{attrs:{label:"是否默认选中",prop:"selected"}},[a("el-select",{attrs:{placeholder:"请选择是否默认选中"},model:{value:e.ruleForm.selected,callback:function(t){e.$set(e.ruleForm,"selected",t)},expression:"ruleForm.selected"}},e._l(e.checkedStatus,(function(e){return a("el-option",{key:e.value,attrs:{label:e.name,value:e.value}})})),1)],1),a("el-form-item",{attrs:{label:"权重状态",prop:"sort"}},[a("el-input",{attrs:{placeholder:"请输入权重状态",oninput:"this.value=this.value.replace(/[^\\d]/g,'');",clearable:""},model:{value:e.ruleForm.sort,callback:function(t){e.$set(e.ruleForm,"sort",t)},expression:"ruleForm.sort"}})],1),a("el-form-item",{attrs:{label:"icon图片",prop:"icon"}},[a("uploadImg",{ref:"uploadImg",attrs:{imgUrl:e.ruleForm.icon,name:"icon",accept:".png,.jpg,.jpeg"},on:{validateField:e.validateField},model:{value:e.ruleForm.icon,callback:function(t){e.$set(e.ruleForm,"icon",t)},expression:"ruleForm.icon"}})],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){return e.resetForm("ruleForm")}}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm")}}},[e._v("确 定")])],1)],1)],1)},b=[],v=(a("d9e2"),a("159b"),a("e9c4"),a("b64b"),a("a630"),a("3ca3"),a("13d5"),a("14d9"),a("40cb")),y=a("c8da"),w={components:{uploadImg:v["a"]},computed:{title:function(){return"add"===this.status?"新增商品":"update"===this.status?"修改商品":"查看商品"},StartPicker:function(){return{disabledDate:function(e){return e.getTime()<(new Date).getTime()-864e5}}},EndPicker:function(){return{disabledDate:function(e){return e.getTime()<(new Date).getTime()-864e5}}},startTime:function(){var e=this,t=this.ruleForm.start_time,a=(new Date).getTime(),r={};return r={required:!0,validator:function(r,n,o){t<a&&"add"===e.status?o(new Error("商品生效时间不可小于当前时间")):o()}},r},endTime:function(){var e=this,t=this.ruleForm.start_time,a=(new Date).getTime(),r={};return r={required:!0,validator:function(r,n,o){t<a&&"add"===e.status?o(new Error("商品生效时间不可小于当前时间")):o()}},r},limitRules:function(){var e=this.ruleForm.time_limit,t=!1;e.forEach((function(e,a){e.day&&e.money||(t=!0)}));var a={};return a={required:!0,validator:function(e,a,r){t?r(new Error("请填写所有数据")):r()}},a},limitUploadType:function(){return 1===this.ruleForm.play_type?".zip":2===this.ruleForm.play_type?".svg,.svga":void 0}},data:function(){return{dialogVisible:!1,goodsNumTypeList:h["a"].GOODNUMTYPE,goodsNumClassList:[],showStatus:h["a"].SHOWSTATUS,checkedStatus:h["a"].CHECKEDSTATUS,goodsType:1,status:"add",oldParams:{},ruleForm:{},rules:{category:[{required:!0,message:"请选择商品类别",trigger:"change"}],name:[{required:!0,message:"请输入商品分类",trigger:"blur"},{min:1,max:10,message:"长度在 1 到 10 个字符",trigger:"blur"}],status:[{required:!0,message:"请选择显示状态",trigger:"change"}],selected:[{required:!0,message:"请选择是否默认选中",trigger:"change"}],sort:[{required:!0,message:"请输入权重状态",trigger:"blur"}],icon:[{required:!0,message:"请上传icon图标",trigger:"blur"}]}}},methods:{handleClose:function(){this.close()},beforeUpload:function(e){var t=this,a=e,r=230,n=230;return new Promise((function(e,o){Object(y["a"])(a).then((function(s){var i=s.width,c=s.height,u="image/jpeg"===a.type||"image/png"===a.type,l=Object(f["e"])(r,n,i,c);u||t.$message.error("只能上传jpg/png文件"),l||t.$message.error("图片尺寸只能为".concat(r,"*").concat(n,"及同比尺寸"));var d=u&&l;d?e(!0):o(!1)})).catch((function(){o(!1)}))}))},goodsChange:function(e){var t=this.oldParams;1===e?"{}"!==JSON.stringify(t)&&t.goods_animation_path||(this.$refs.goods_animation_path.imageUrl="",this.ruleForm.goods_animation_path=""):"{}"!==JSON.stringify(t)&&t.goods_image||(this.$refs.goods_image.imageUrl="",this.ruleForm.goods_image="")},load:function(e,t){if(console.log(e),this.status=e,"add"!==e){this.oldParams=t;var a=JSON.parse(JSON.stringify(t));a.start_time=1e3*a.start_time,a.end_time=1e3*a.end_time,this.$set(this.$data,"ruleForm",a),this.getPrettyNumTypeList(this.ruleForm.category)}},submitForm:function(e){var t=this;this.$refs[e].validate((function(e){if(!e)return console.log("error submit!!"),!1;var a=Object(i["a"])({},t.ruleForm);a.start_time=Math.floor(a.start_time/1e3),a.end_time=Math.floor(a.end_time/1e3),1===t.goodsType?a.goods_image="":2===t.goodsType&&(a.goods_animation_path=""),"add"===t.status?Object(c["f"])(a).then((function(e){2e3===e.code&&(t.dialogVisible=!1,t.$emit("onSearch"))})).catch((function(e){t.$message.error(e)})):"update"===t.status&&(a.id=a.id+"",Object(c["mc"])(a).then((function(e){2e3===e.code&&(t.dialogVisible=!1,t.$emit("onSearch"))})).catch((function(e){t.$message.error(e)})))}))},resetForm:function(e){this.close()},close:function(){var e=this;this.$confirm("关闭后数据不会保存，确定关闭吗？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){e.dialogVisible=!1,e.$emit("onSearch")})).catch((function(){}))},destoryComp:function(){this.$emit("destoryComp")},validateField:function(e){this.$refs.ruleForm.validateField([e])},handleChange:function(e){this.getPrettyNumTypeList(e)},getPrettyNumTypeList:function(e){var t=this;return Object(s["a"])(Object(o["a"])().mark((function a(){var r,n;return Object(o["a"])().wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(t.goodsNumClassList=[],!e&&0!==e){a.next=6;break}return a.next=4,Object(c["jb"])({category:e});case 4:r=a.sent,2e3===r.code&&(n=Array.from(Array.isArray(r.data)?r.data:[]),t.goodsNumClassList=n.reduce((function(e,t){return e.push({name:t.name,value:t.type_id}),e}),[])||[]);case 6:case"end":return a.stop()}}),a)})))()}},mounted:function(){}},F=w,O=(a("38a4"),a("2877")),_=Object(O["a"])(F,g,b,!1,null,null,null),j=_.exports,T={components:{tableList:u["a"],SearchPanel:l["a"],add:j},mixins:[d["a"]],computed:{forms:function(){return[{name:"name",type:"input",value:"",label:"分类名称",placeholder:"请输入分类名称"},{name:"category",type:"select",value:"",keyName:"value",optionLabel:"name",label:"商品类别",placeholder:"请选择",clearable:!0,options:h["a"].GOODNUMTYPE}]},cfgs:function(){var e=this;return{vm:this,url:m["a"].prettyNumber.prettyNumberType,columns:[{label:"创建时间",prop:"create_time"},{label:"商品类别",prop:"category",render:function(e,t){var a=h["a"].GOODNUMTYPE.find((function(e){return e.value===t.row.category}));return e("span",a?a.name:"无")}},{label:"商品分类",prop:"name"},{label:"图标",isimg:!0,prop:"icon",imgWidth:"50px",imgHeight:"50px"},{label:"权重状态",prop:"sort"},{label:"显示状态",render:function(e,t){var a=h["a"].SHOWSTATUS.find((function(e){return e.value===t.row.status}));return e("div",{class:{bounce_fa:!0}},[e("span",a?a.name:"--")])}},{minWidth:"100px",label:"是否默认选中",prop:"selected",isSwitch:!0,isTrueValue:1,isFalseValue:0,change:function(t,a){e.handleSelectCalculator(a,t)},render:function(e){return e("span","")}},{label:"操作",render:function(t,a){return t("div",[t("el-button",{props:{type:"primary",size:"mini"},on:{click:function(){e.update(a.row)}}},"修改"),t("el-button",{props:{type:"danger",size:"mini"},on:{click:function(){e.deleteParams(a.row.id)}}},"删除")])}}]}}},data:function(){return{ruleForm:{alreadyMoney:null,deductMoney:null},searchParams:{category:0,name:""},isDestoryComp:!1}},methods:{getList:function(){this.$refs.tableList.getData()},beforeSearch:function(e){var t=Object(i["a"])(Object(i["a"])({},this.searchParams),this.dateTimeParams);return{page:e.page,pagesize:e.size,name:t.name,category:t.category,start_time:Math.floor(t.start_time/1e3),end_time:Math.floor(t.end_time/1e3)}},setDateTime:function(e){var t=e?{start_time:e[0],end_time:e[1]}:{};this.$set(this,"dateTimeParams",t)},emptyDateTime:function(){this.dateTimeParams={}},reset:function(){this.searchParams={category:0,name:""},this.dateTimeParams={activity_type_id:1},this.getList()},onSearch:function(){this.getList()},saleAmunt:function(e){},add:function(){this.load("add")},update:function(e){this.load("update",e)},down:function(e,t){var a=this,r={id:e.id,status:t};Object(p["b"])(r).then((function(e){2e3===e.code&&a.onSearch()}))},deleteParams:function(e){var t=this;return Object(s["a"])(Object(o["a"])().mark((function a(){return Object(o["a"])().wrap((function(a){while(1)switch(a.prev=a.next){case 0:t.$confirm("确认删除当前靓号吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(s["a"])(Object(o["a"])().mark((function a(){var r;return Object(o["a"])().wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,Object(c["w"])({id:e+""});case 2:r=a.sent,2e3===r.code&&(t.$success("删除成功"),t.getList());case 4:case"end":return a.stop()}}),a)})))).catch((function(){}));case 1:case"end":return a.stop()}}),a)})))()},load:function(e,t){var a=this;this.isDestoryComp=!0,setTimeout((function(){a.$refs.add.dialogVisible=!0,a.$refs.add.load(e,t)}),100)},destoryComp:function(){this.isDestoryComp=!1},handleSelectCalculator:function(e,t){var a=this;return Object(s["a"])(Object(o["a"])().mark((function t(){var r,n;return Object(o["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return r=Object(i["a"])(Object(i["a"])({},e),{},{category:e.category+"",status:e.status+"",selected:e.selected+"",id:e.id+""}),t.next=3,Object(c["mc"])(r);case 3:n=t.sent,2e3===+n.code&&(a.$success("操作成功"),a.getList());case 5:case"end":return t.stop()}}),t)})))()}}},x=T,P=(a("dd6e"),Object(O["a"])(x,r,n,!1,null,null,null));t["default"]=P.exports},dd6e:function(e,t,a){"use strict";a("4678a")},e5de:function(e,t,a){"use strict";a.d(t,"a",(function(){return o})),a.d(t,"b",(function(){return s})),a.d(t,"c",(function(){return i})),a.d(t,"d",(function(){return c}));var r=a("829b"),n=a("8daa");function o(e){return Object(r["a"])({url:n["a"].shopping.add,method:"post",data:e})}function s(e){return Object(r["a"])({url:n["a"].shopping.down,method:"post",data:e})}function i(e){return Object(r["a"])({url:n["a"].shopping.list,method:"post",data:e})}function c(e){return Object(r["a"])({url:n["a"].shopping.send,method:"post",data:e})}}}]);