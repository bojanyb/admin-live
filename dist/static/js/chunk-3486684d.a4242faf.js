(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3486684d"],{"09f4":function(t,e,i){"use strict";i.d(e,"a",(function(){return r})),Math.easeInOutQuad=function(t,e,i,o){return t/=o/2,t<1?i/2*t*t+e:(t--,-i/2*(t*(t-2)-1)+e)};var o=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)}}();function a(t){document.documentElement.scrollTop=t,document.body.parentNode.scrollTop=t,document.body.scrollTop=t}function s(){return document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop}function r(t,e,i){var r=s(),n=t-r,l=20,u=0;e="undefined"===typeof e?500:e;var c=function t(){u+=l;var s=Math.easeInOutQuad(u,r,n,e);a(s),u<e?o(t):i&&"function"===typeof i&&i()};c()}},"1fe8":function(t,e,i){t.exports=i.p+"static/img/error.e53687be.png"},2708:function(t,e,i){"use strict";var o=i("5530"),a=i("2f62"),s={data:function(){return{tabIndex:"0",page:1,size:10,limit:10,searchParams:{},dataParams:{}}},computed:Object(o["a"])({},Object(a["c"])({permissionArr:function(t){return t.permission.permissionArr}})),mounted:function(){console.log(this.permissionArr,"permissionArr")}};e["a"]=s},"3be2":function(t,e,i){"use strict";i("92c5")},4514:function(t,e,i){"use strict";i.r(e);var o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"shopping-givegoods-box"},[i("div",{staticClass:"searchParams"},[i("SearchPanel",{attrs:{forms:t.forms,"show-reset":!0,"show-search-btn":!0,"show-add":!0},on:{onReset:t.reset,onSearch:t.onSearch,add:t.handleAdd},model:{value:t.searchParams,callback:function(e){t.searchParams=e},expression:"searchParams"}})],1),i("div",{staticClass:"tableList"},[i("tableList",{ref:"tableList",attrs:{cfgs:t.cfgs},on:{saleAmunt:t.saleAmunt}})],1),t.isDestoryComp?i("addComp",{ref:"addComp",attrs:{list:t.list},on:{getList:t.getList,destoryComp:t.destoryComp}}):t._e()],1)},a=[],s=(i("7db0"),i("d3b7"),i("b0c0"),i("4053")),r=i("04a2"),n=i("8daa"),l=i("2708"),u=i("cf45"),c=i("279a"),d=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"givegoods-box"},[i("el-dialog",{attrs:{title:t.title,visible:t.dialogVisible,width:"620px","before-close":t.handleClose,"close-on-click-modal":!1},on:{"update:visible":function(e){t.dialogVisible=e},closed:t.closed}},[i("div",{staticClass:"goods"},[i("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:t.ruleForm,rules:t.rules,"label-width":"80px"}},[i("el-form-item",{attrs:{label:"用户ID",prop:"user_number"}},[i("el-input",{attrs:{placeholder:"被赠送用户ID"},model:{value:t.ruleForm.user_number,callback:function(e){t.$set(t.ruleForm,"user_number",e)},expression:"ruleForm.user_number"}})],1),i("el-form-item",{attrs:{label:"赠送商品",prop:"goods_id",rules:t.goodsComputed}},t._l(t.goodsOptions,(function(e){return i("el-button",{key:e.value,attrs:{type:"primary",size:"mini"},on:{click:function(i){return t.selectClick(e.value)}}},[t._v(t._s(e.name))])})),1),t.list.length>0?i("el-form-item",{attrs:{label:""}},[i("div",{staticClass:"goods_List"},t._l(t.list,(function(e,o){return i("div",{key:o,staticClass:"goods_box"},[i("span",[t._v(t._s(e.goods_name))]),i("el-button",{attrs:{type:"danger"},on:{click:function(e){return t.deleteData(o)}}},[t._v("删除")])],1)})),0)]):t._e(),i("el-form-item",{attrs:{label:"赠送时长",prop:"day"}},[i("el-select",{attrs:{placeholder:"请选择赠送时长"},model:{value:t.ruleForm.day,callback:function(e){t.$set(t.ruleForm,"day",e)},expression:"ruleForm.day"}},t._l(t.durationList,(function(t,e){return i("el-option",{key:e,attrs:{label:t.name,value:t.value}})})),1)],1),i("el-form-item",{attrs:{label:"赠送原因",prop:"remark"}},[i("el-input",{attrs:{type:"textarea"},model:{value:t.ruleForm.remark,callback:function(e){t.$set(t.ruleForm,"remark",e)},expression:"ruleForm.remark"}})],1),i("el-form-item",[i("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.submitForm("ruleForm")}}},[t._v("确定")])],1)],1)],1)]),t.goodsBankVisible?i("goodsBank",{ref:"goodsBank",attrs:{list:t.list,goodsType:t.goodsType,isLimit:1},on:{validateField:t.validateField,distoryComp:t.distoryComp}}):t._e()],1)},f=[],m=i("5530"),p=(i("d9e2"),i("a434"),function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"share-goodsBank-box"},[i("el-drawer",{attrs:{"append-to-body":!0,title:"商品库",visible:t.drawer,direction:t.direction,"before-close":t.handleClose,size:"50%"},on:{"update:visible":function(e){t.drawer=e},closed:t.closed}},[i("el-form",{ref:"form",attrs:{model:t.formData,"label-width":"80px"}},[i("el-row",{attrs:{gutter:6}},[i("el-col",{attrs:{span:6}},[i("el-form-item",{attrs:{label:"商品类型"}},[i("el-select",{attrs:{placeholder:"请选择活动区域",clearable:""},model:{value:t.formData.goods_type,callback:function(e){t.$set(t.formData,"goods_type",e)},expression:"formData.goods_type"}},t._l(t.goodsData,(function(t){return i("el-option",{key:t.value,attrs:{value:t.value,label:t.name}})})),1)],1)],1),i("el-col",{attrs:{span:6}},[i("el-form-item",{attrs:{label:"商品名称"}},[i("el-input",{attrs:{clearable:""},model:{value:t.formData.goods_name,callback:function(e){t.$set(t.formData,"goods_name",e)},expression:"formData.goods_name"}})],1)],1),i("el-col",{attrs:{span:6}},[i("el-form-item",{attrs:{label:"商品ID"}},[i("el-input",{attrs:{clearable:""},model:{value:t.formData.goods_id,callback:function(e){t.$set(t.formData,"goods_id",e)},expression:"formData.goods_id"}})],1)],1),i("el-col",{attrs:{span:6}},[i("el-form-item",[i("el-button",{attrs:{type:"primary"},on:{click:t.handleSearch}},[t._v("查询")])],1)],1)],1)],1),i("div",{staticClass:"giftListBox"},[i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.giftLoading,expression:"giftLoading"}],ref:"giftTable",attrs:{data:t.giftListArr,"element-loading-text":"拼命加载中","max-height":"740px",border:"",fit:"","highlight-current-row":""}},[i("el-table-column",{attrs:{label:"商品ID",prop:"id",align:"center",width:"100px","show-overflow-tooltip":""}}),i("el-table-column",{attrs:{label:"商品名称",prop:"goods_name",align:"center","show-overflow-tooltip":""}}),i("el-table-column",{staticStyle:{display:"flex","justify-content":"center"},attrs:{label:"商品图片",prop:"gift_genre",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("div",{staticClass:"imgStyle",staticStyle:{display:"flex","justify-content":"center"}},[e.row.goods_image?i("el-image",{staticStyle:{height:"50px"},attrs:{src:e.row.goods_image}}):t._e(),e.row.goods_animation_path?i("svgComp",{ref:"svgComp",attrs:{src:e.row.goods_animation_path,styleObj:{height:"50px"}}}):t._e()],1)]}}])}),i("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[0==e.row.isSelect?i("el-button",{attrs:{type:"primary"},on:{click:function(i){return t.handleSelect(e.row)}}},[t._v("使用")]):t._e()]}}])})],1),i("pagination",{directives:[{name:"show",rawName:"v-show",value:t.giftTotal>0,expression:"giftTotal>0"}],attrs:{total:t.giftTotal,page:t.giftPage.page,limit:t.giftPage.limit},on:{"update:page":function(e){return t.$set(t.giftPage,"page",e)},"update:limit":function(e){return t.$set(t.giftPage,"limit",e)},pagination:t.giftList}})],1)],1)],1)}),g=[],h=(i("a9e3"),i("159b"),i("d81d"),i("14d9"),i("333d")),b=i("e5de"),v=i("1990"),y={components:{Pagination:h["a"],svgComp:v["a"]},props:{list:{type:Array,default:[]},activityType:{type:String,default:""},status:{type:String,default:""},isLimit:{type:Number,default:1},goodsType:{type:Number,default:null}},data:function(){return{drawer:!1,direction:"rtl",giftLoading:!1,giftListArr:[],giftPage:{page:1,limit:10},giftTotal:0,giftTypeList:c["a"].GIFTTYPE,isDestroyComp:!1,activityList:c["a"].ACTIVITYLIST,formData:{goods_type:null},goodsData:c["a"].SHOPPING}},computed:{gifts:{get:function(){return this.list},set:function(t){return this.$emit("update: list",t)}}},watch:{status:{handler:function(t,e){this.giftPage.page=1,this.giftList()},deep:!0}},mounted:function(){this.formData.goods_type=this.goodsType},methods:{giftList:function(){var t=this,e=Object(m["a"])({page:this.giftPage.page},this.formData);this.giftListArr=[],Object(b["c"])(e).then((function(e){t.giftTotal=e.data.count,t.giftListArr=e.data.list,t.giftSelectSource()})).catch((function(t){}))},deleteData:function(t){var e=t.row;t.index;this.giftListArr.forEach((function(t){t.id===e.id&&(t.isSelect=!1)}))},handleClose:function(t){this.drawer=!1},handleSelect:function(t){var e=this;this.gifts.length<this.isLimit?this.giftListArr.map((function(i){i.id==t.id&&(i.isSelect=!0,e.gifts.push(t))})):(this.$reMessage.error("最多只能赠送一个商品"),this.$emit("validateField"))},giftSelectSource:function(){var t=this;this.giftListArr.map((function(e){e.isSelect=!1,t.gifts.length>0&&t.gifts.map((function(t){t.id!=e.id&&t.id!=e.id||(e.isSelect=!0)}))})),this.$forceUpdate()},closed:function(){this.$emit("distoryComp")},handleSearch:function(){this.giftPage.page=1,this.giftList()}}},_=y,w=(i("5be9"),i("2877")),k=Object(w["a"])(_,p,g,!1,null,null,null),C=k.exports,D={mixins:[l["a"]],components:{goodsBank:C},data:function(){return{list:[],durationList:c["a"].DURATION,ruleForm:{goods_id:"",user_number:"",day:null,remark:""},dialogVisible:!1,rules:{user_number:[{required:!0,message:"请输入用户ID",trigger:"blur"}],remark:[{required:!0,message:"请输入赠送原因",trigger:"blur"}],day:[{required:!0,message:"请选择赠送时长",trigger:"change"}],goods_id:[{required:!0,message:"请选择赠送商品",trigger:"change"}]},goodsOptions:c["a"].SHOPPING,goodsType:null,goodsBankVisible:!1}},computed:{goodsComputed:function(){var t=this,e={};return e={validator:function(e,i,o){t.list.length<1?o(new Error("请选择一个赠送商品")):o()}},e},title:function(){return"add"===this.status?"新增赠送商品":"update"===this.status?"修改赠送商品":"查看赠送商品"}},methods:{loadParams:function(t,e){this.status=t,this.dialogVisible=!0},selectClick:function(t){var e=this;this.goodsType=t,this.goodsBankVisible=!0,setTimeout((function(){e.$refs.goodsBank.drawer=!0,e.$refs.goodsBank.giftList()}),30)},submitForm:function(t){var e=this;this.$refs[t].validate((function(t){if(!t)return console.log("error submit!!"),!1;var i=Object(m["a"])({},e.ruleForm);i.goods_id=e.list[0].id,Object(b["d"])(i).then((function(t){e.handleClose()}))}))},resetForm:function(t){this.$refs[t].resetFields()},deleteData:function(t){this.list.length>0&&this.list.splice(t,1)},validateField:function(){this.$refs.ruleForm.validateField(["goods_id"])},handleClose:function(){this.dialogVisible=!1},closed:function(){this.$emit("destoryComp")},distoryComp:function(){this.goodsBankVisible=!1}}},L=D,x=(i("3be2"),Object(w["a"])(L,d,f,!1,null,null,null)),S=x.exports,T=i("1a72"),$={components:{tableList:s["a"],SearchPanel:r["a"],addComp:S},mixins:[l["a"]],data:function(){return{status:"add",isDestoryComp:!1,list:[]}},computed:{cfgs:function(){return{vm:this,url:n["a"].shopping.sendlog,columns:[{label:"被赠送用户ID",prop:"user_number"},{label:"商品名称",prop:"goods_name"},{label:"赠送时长",prop:"day",render:function(t,e){var i=c["a"].DURATION.find((function(t){return t.value==e.row.day}));return t("span",i?i.name:"--")}},{label:"赠送时间",render:function(t,e){return t("span",e.row.create_time?Object(u["h"])(e.row.create_time,"YYYY-MM-DD HH:mm:ss",!0):"")}},{label:"赠送原因",prop:"remark"},{label:"操作人",prop:"op_user"}]}},forms:function(){return[{name:"user_number",type:"input",value:"",label:"用户ID",isNum:!0,placeholder:"请输入用户ID"}]}},methods:{beforeSearch:function(t){var e=this.searchParams;return{page:t.page,user_number:e.user_number}},getList:function(){this.$refs.tableList.getData()},handleAdd:function(){this.load("add")},update:function(t){this.load("update",t)},see:function(t){this.load("see",t)},load:function(t,e){var i=this;this.isDestoryComp=!0,setTimeout((function(){i.$refs.addComp.loadParams(t,e)}),100)},destoryComp:function(){this.isDestoryComp=!1,this.onSearch()},freeze:function(t){var e=this;this.$confirm("确认冻结当前活动？").then((function(i){t.end_time=Math.floor((new Date).getTime()/1e3),Object(T["E"])({activity_id:t.id}).then((function(i){t.gifts=i.data.list,Object(T["C"])(t).then((function(t){e.$message.success("冻结成功!"),e.getList()})).catch((function(t){e.$message.error("冻结失败!")}))}))})).catch((function(t){}))},deleteFunc:function(t){var e=this;this.$confirm("确认删除当前活动？").then((function(i){Object(T["B"])({id:t.id}).then((function(t){e.$message.success("删除成功!"),e.getList()})).catch((function(t){e.$message.error("删除失败!")}))}))},saleAmunt:function(t){this.list=t.list},onSearch:function(){this.$refs.tableList.getData()},reset:function(){this.searchParams={},this.onSearch()}}},F=$,O=(i("f5b1"),Object(w["a"])(F,o,a,!1,null,null,null));e["default"]=O.exports},"5be9":function(t,e,i){"use strict";i("6f1f")},"6f1f":function(t,e,i){},"92c5":function(t,e,i){},e0d7:function(t,e,i){},e5de:function(t,e,i){"use strict";i.d(e,"a",(function(){return s})),i.d(e,"b",(function(){return r})),i.d(e,"c",(function(){return n})),i.d(e,"d",(function(){return l}));var o=i("829b"),a=i("8daa");function s(t){return Object(o["a"])({url:a["a"].shopping.add,method:"post",data:t})}function r(t){return Object(o["a"])({url:a["a"].shopping.down,method:"post",data:t})}function n(t){return Object(o["a"])({url:a["a"].shopping.list,method:"post",data:t})}function l(t){return Object(o["a"])({url:a["a"].shopping.send,method:"post",data:t})}},f5b1:function(t,e,i){"use strict";i("e0d7")}}]);