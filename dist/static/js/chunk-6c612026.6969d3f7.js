(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6c612026"],{"0412":function(e,t,s){},"127f":function(e,t,s){"use strict";s.d(t,"a",(function(){return c}));var r=s("40bd"),a=s("7e8c"),i=(s("48d4"),s("8bda"),s("897d")),n=s.n(i),o=s("4109"),u={ossParams:{region:"oss-cn-shenzhen",success_action_status:"200",accessKeyId:"LTAI5tFTcRH7h3RXKoYmnWMk",accessKeySecret:"qdx4B8jIh2VjBgBDG5fNfG0Oj21GSP",bucket:"live-huidapay-net"}};function l(e){var t=e.name.split("."),s=n()(Date.now()+t[0]);return s=s+"."+t[t.length-1],s}function c(e){return new Promise(function(){var t=Object(a["a"])(Object(r["a"])().mark((function t(s,a){var i,n;return Object(r["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return i=l(e),n=new o({region:u.ossParams.region,accessKeyId:u.ossParams.accessKeyId,accessKeySecret:u.ossParams.accessKeySecret,bucket:u.ossParams.bucket}),t.next=4,n.multipartUpload(i,e);case 4:t.sent,s({url:"https://photo.aiyi.live/"+i});case 6:case"end":return t.stop()}}),t)})));return function(e,s){return t.apply(this,arguments)}}())}},"1fe8":function(e,t,s){e.exports=s.p+"static/img/error.e53687be.png"},2708:function(e,t,s){"use strict";var r=s("4672"),a=s("52c1"),i={data:function(){return{tabIndex:"0",page:1,size:10,limit:10,searchParams:{},dataParams:{}}},computed:Object(r["a"])({},Object(a["c"])({permissionArr:function(e){return e.permission.permissionArr}})),mounted:function(){console.log(this.permissionArr,"permissionArr")}};t["a"]=i},3744:function(e,t,s){"use strict";s("8227")},6436:function(e,t,s){"use strict";s("0412")},8227:function(e,t,s){},d529:function(e,t,s){"use strict";s.r(t);var r=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"app-container"},[s("div",{staticClass:"searchParams"},[s("SearchPanel",{attrs:{forms:e.forms,"show-reset":!0,"show-search-btn":!0,"show-add":!0},on:{onReset:e.reset,onSearch:e.onSearch,add:e.add},model:{value:e.searchParams,callback:function(t){e.searchParams=t},expression:"searchParams"}})],1),s("tableList",{ref:"tableList",attrs:{cfgs:e.cfgs}}),e.isDestoryComp?s("roomBgEdit",{ref:"roomBgEdit",on:{destoryComp:e.destoryComp,getList:e.getList}}):e._e()],1)},a=[],i=s("40bd"),n=s("7e8c"),o=s("4672"),u=(s("48d4"),s("23dc"),s("8bda"),s("1a72")),l=s("04a2"),c=s("4053"),m=s("40cb"),p=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"roomBgEdit-box"},[s("drawer",{ref:"drawer",attrs:{size:"500px",title:e.title,isShowUpdate:!0,disabled:e.disabled},on:{cancel:e.cancel,submitForm:e.submitForm,closed:e.closed,update:e.update}},[s("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{slot:"body",model:e.ruleForm,rules:e.rules,"label-width":"100px","label-suffix":":","hide-required-asterisk":"see"===e.status},slot:"body"},[s("el-form-item",{attrs:{label:"业务类型",prop:"room_business_type"}},[s("el-select",{attrs:{placeholder:"请选择"},model:{value:e.ruleForm.room_business_type,callback:function(t){e.$set(e.ruleForm,"room_business_type",t)},expression:"ruleForm.room_business_type"}},e._l(e.roomTypeList,(function(e){return s("el-option",{key:e.value,attrs:{label:e.name,value:e.value}})})),1)],1),s("el-form-item",{attrs:{label:"图片名称",prop:"name"}},[s("el-input",{attrs:{placeholder:"请输入背景图名称"},model:{value:e.ruleForm.name,callback:function(t){e.$set(e.ruleForm,"name",t)},expression:"ruleForm.name"}})],1),s("el-form-item",{attrs:{label:"排序权重",prop:"sort"}},[s("el-input",{attrs:{placeholder:"请输入排序权重",oninput:"this.value=this.value.replace(/[^\\d]/g,'');"},model:{value:e.ruleForm.sort,callback:function(t){e.$set(e.ruleForm,"sort",t)},expression:"ruleForm.sort"}})],1),s("el-form-item",{attrs:{label:"图片类型",prop:"assign_status"}},[s("el-select",{attrs:{placeholder:"请选择"},model:{value:e.ruleForm.assign_status,callback:function(t){e.$set(e.ruleForm,"assign_status",t)},expression:"ruleForm.assign_status"}},e._l(e.assignList,(function(e){return s("el-option",{key:e.value,attrs:{label:e.name,value:e.value}})})),1)],1),1===e.ruleForm.assign_status?s("el-form-item",{attrs:{label:"房间ID",prop:"assign_room"}},[s("el-input",{attrs:{type:"textarea",rows:4,placeholder:"请输入房间ID，输入多个房间ID请用逗号隔开"},on:{input:function(t){return e.roomInput(1)}},model:{value:e.ruleForm.assign_room,callback:function(t){e.$set(e.ruleForm,"assign_room",t)},expression:"ruleForm.assign_room"}})],1):e._e(),2===e.ruleForm.assign_status?s("el-form-item",{attrs:{label:"公会ID",prop:"assign_guild"}},[s("el-input",{attrs:{type:"textarea",rows:4,placeholder:"请输入公会ID，输入多个公会ID请用逗号隔开"},on:{input:function(t){return e.roomInput(2)}},model:{value:e.ruleForm.assign_guild,callback:function(t){e.$set(e.ruleForm,"assign_guild",t)},expression:"ruleForm.assign_guild"}})],1):e._e(),s("el-form-item",{attrs:{label:"图片",prop:"url"}},[s("el-upload",{ref:"upload",class:{hide:e.hideUpload},attrs:{action:"","show-file-list":"add"===e.status,"file-list":e.fileList,limit:e.limit,"on-change":e.beforeAvatarUpload,"on-exceed":e.masterFileMax,"before-remove":e.beforeRemove,"on-remove":e.handleRemove,"list-type":"picture-card",accept:e.accept,"http-request":e.upLoadFile,multiple:""}},["add"!==e.status&&""!==e.url?s("img",{staticClass:"avatar",attrs:{src:e.url}}):e._e(),"add"!=e.status||e.url&&""!=e.url?e._e():s("i",{staticClass:"el-icon-plus avatar-uploader-icon"}),s("div",{staticClass:"form-tips",staticStyle:{"margin-top":"10px"},attrs:{slot:"tip"},slot:"tip"},[s("el-tag",{attrs:{type:"warning"}},[e._v("最多上传"+e._s(e.limit)+"张，最大上传大小2MB")])],1)])],1)],1)],1)],1)},d=[],f=(s("00e5"),s("65c4"),s("96c5"),s("430a"),s("eb5c"),s("ed70"),s("1af9"),s("1e6d"),s("9dcb"),s("0472")),g=s("279a"),h=s("127f"),b={components:{uploadImg:m["a"],drawer:f["a"]},data:function(){var e=this;return{status:"add",typeList:g["a"].ROOMTYPELIST,defaultList:g["a"].USERINVITE,ruleForm:{sort:"",url:"",name:"",is_default:null,assign_status:null,room_business_type:null},oldParams:{},rules:{room_business_type:[{required:!0,message:"请选择业务类型",trigger:"change"}],name:[{required:!0,message:"请输入背景图名称",trigger:"blur"},{min:1,max:5,message:"长度在 1 到 5 个字符",trigger:"blur"}],sort:[{required:!0,message:"请输入排序权重",trigger:"blur"}],assign_room:[{required:!0,message:"请输入房间ID",trigger:"blur"}],assign_guild:[{required:!0,message:"请输入公会ID",trigger:"blur"}],assign_status:[{required:!0,message:"请选择背景类型",trigger:"change"}],url:[{required:!0,message:"请上传图片",trigger:"change",validator:function(t,s,r){return 0===e.imgList.length?r(new Error("请上传图片!")):r()}}]},roomTypeList:[{name:"派对",value:0},{name:"直播",value:1}],fileList:[],imgs:[],limit:1,hideUpload:!1,isAdd:!0,construction:{images:"",addImages:""},accept:".png,.jpg,.jpeg",imgList:[],url:"",showList:[]}},computed:{title:function(){return"add"===this.status?"新增房间背景图":"update"===this.status?"修改房间背景图":void 0},disabled:function(){return!1},assignList:function(){var e=JSON.parse(JSON.stringify(g["a"].ROOMBACKGROUNDSELECTLIST));return e.filter((function(e){return"全部"!==e.name}))}},watch:{"ruleForm.assign_status":{handler:function(e){this.limit=2==e?5:1,this.fileList=[],this.imgList=[]}}},methods:{roomInput:function(e){var t=1==e?this.ruleForm.assign_room:this.ruleForm.assign_guild;t=t.replace(/[\u4E00-\u9FA5A-Za-z_^%&'\-\*\ /;.，。、‘；、】【=?$\[\]!@#()\\~]/g,""),this.ruleForm[1==e?"assign_room":"assign_guild"]=t},loadParams:function(e,t){if(this.openComp(),this.status=e,"add"!==e){var s=JSON.parse(JSON.stringify(t));s.room_business_type=+s.room_business_type,this.$set(this.$data,"ruleForm",s),this.limit=1}this.url=this.ruleForm.url,this.imgList.push(this.ruleForm.url),this.oldParams=JSON.parse(JSON.stringify(this.ruleForm))},submitForm:function(e){var t=this;return Object(n["a"])(Object(i["a"])().mark((function s(){return Object(i["a"])().wrap((function(s){while(1)switch(s.prev=s.next){case 0:0==t.fileList.length&&t.imgList.push(t.ruleForm.url),t.$refs[e].validate(function(){var e=Object(n["a"])(Object(i["a"])().mark((function e(s){var r,a,n;return Object(i["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!s){e.next=12;break}return r=t.ruleForm,a={id:r.id||null,sort:r.sort,url:t.imgList.join(),name:r.name,assign_status:r.assign_status,room_business_type:r.room_business_type,assign_room:r.assign_room?r.assign_room:"",assign_guild:r.assign_guild?r.assign_guild:""},1===r.assign_status&&(a.assign_room=r.assign_room),e.next=6,Object(u["ab"])(a);case 6:n=e.sent,2e3===n.code&&t.$success("操作成功"),t.openComp(!1),t.$emit("getList"),e.next=14;break;case 12:return console.log("error submit!!"),e.abrupt("return",!1);case 14:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 2:case"end":return s.stop()}}),s)})))()},openComp:function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];this.$refs.drawer.loadParams(e)},cancel:function(){var e=this;JSON.stringify(this.oldParams)!==JSON.stringify(this.ruleForm)?this.$confirm("关闭弹窗将不会保留您的更改, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){e.openComp(!1)})).catch((function(){})):this.openComp(!1)},update:function(){this.status="update"},resetForm:function(){this.openComp(!1)},closed:function(){this.$emit("destoryComp")},validateField:function(e){this.$refs.ruleForm.validateField([e])},beforeAvatarUpload:function(e,t){var s=e.size/1024/1024<2;if(!s)return t=t.filter((function(t){return t!==e})),this.fileList=t,void this.$message.warning("上传头像图片大小不能超过 2MB!");var r=this,a=new FileReader;a.readAsDataURL(e.raw),a.onload=function(e){r.imgs.push(this.result)},this.hideUpload=t.length>=this.limit},beforeRemove:function(e){return this.$confirm("确定移除 ".concat(e.name,"？"))},handleRemove:function(e,t){var s=this;this.hideUpload=t.length>=this.limit,this.imgList=[],t.map((function(e){e.file=e.raw,s.upLoadFile(e)}))},masterFileMax:function(e,t){this.$message.warning("请最多上传 ".concat(this.limit," 个文件。"))},upLoadFile:function(e){var t=e.file.type,s=JSON.parse(JSON.stringify(this.accept));if(s=s.replace(".",""),-1==t.indexOf(s)&&1==this.isFileType)return this.$message.warning("上传图片只能是"+s+"格式!"),!1;this.uploadImg(e)},uploadImg:function(e){var t=this;this.isShowSvg=!1,this.$store.commit("app/SET_LOADING",!0),Object(h["a"])(e.file).then((function(s){"add"!==t.status?t.url=s.url:t.url="",s.url&&(t.$emit("input",s.url),t.$emit("getFile",e),t.$store.commit("app/SET_LOADING",!1),t.isShowSvg=!0,t.$emit("validateField",t.name),t.imageUrl=s.url,t.imgList.push(s.url))})).catch((function(e){t.$message.error(e)}))}}},v=b,_=(s("3744"),s("e607")),y=Object(_["a"])(v,p,d,!1,null,null,null),w=y.exports,F=s("8daa"),L=(s("cf45"),s("2708")),O={name:"room-background-list",mixins:[L["a"]],components:{SearchPanel:l["a"],tableList:c["a"],uploadImg:m["a"],roomBgEdit:w},data:function(){return{isDestoryComp:!1,searchParams:{assign_status:-1},roomTypeList:[{name:"派对",value:0},{name:"直播",value:1}]}},computed:{forms:function(){return[{name:"room_business_type",type:"select",value:"",keyName:"value",optionLabel:"name",label:"业务类型",placeholder:"请选择",options:this.roomTypeList},{name:"assign_status",type:"select",value:-1,keyName:"value",optionLabel:"name",label:"图片类型",placeholder:"请选择图片类型",options:g["a"].ROOMBACKGROUNDSELECTLIST},{name:"name",type:"input",value:"",label:"图片名称",placeholder:"请输入图片名称"}]},cfgs:function(){var e=this;return{vm:this,url:F["a"].room.roomBg,columns:[{label:"添加时间",prop:"create_time"},{label:"图片名称",render:function(e,t){return e("span",t.row.name||"无")}},{label:"排序权重",prop:"sort"},{label:"业务类型",render:function(t,s){var r=e.roomTypeList.find((function(e){return e.value===+s.row.room_business_type}));return t("span",r?r.name:"无")}},{label:"图片类型",render:function(e,t){var s=g["a"].ROOMBACKGROUNDSELECTLIST.find((function(e){return e.value===t.row.assign_status}));return e("span",s?s.name:"无")}},{label:"图片",prop:"url",isimg:!0,imgWidth:"50px",imgHeight:"50px"},{label:"操作",render:function(t,s){return t("div",[t("el-button",{props:{type:"primary"},on:{click:function(){e.update(s.row)}}},"修改"),t("el-button",{props:{type:"danger"},on:{click:function(){e.handleDel(s.row.id)}}},"删除")])}}]}}},methods:{beforeSearch:function(e){var t=Object(o["a"])({},this.searchParams);return{page:e.page,pagesize:e.size,name:t.name,assign_status:t.assign_status,room_business_type:t.room_business_type}},getList:function(){this.$refs.tableList.getData()},reset:function(){this.searchParams={assign_status:-1},this.getList()},onSearch:function(){this.getList()},add:function(){this.load("add")},update:function(e){this.load("update",e)},load:function(e,t){var s=this;this.isDestoryComp=!0,setTimeout((function(){s.$refs.roomBgEdit.loadParams(e,t)}),50)},destoryComp:function(){this.isDestoryComp=!1},handleDel:function(e){var t=this;return Object(n["a"])(Object(i["a"])().mark((function s(){return Object(i["a"])().wrap((function(s){while(1)switch(s.prev=s.next){case 0:t.$confirm("是否确定删除该房间背景图?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(n["a"])(Object(i["a"])().mark((function s(){var r;return Object(i["a"])().wrap((function(s){while(1)switch(s.prev=s.next){case 0:return s.next=2,Object(u["bb"])({id:e});case 2:r=s.sent,2e3===r.code&&t.$message.success("删除成功"),t.getList();case 5:case"end":return s.stop()}}),s)})))).catch((function(){}));case 1:case"end":return s.stop()}}),s)})))()}}},x=O,S=(s("6436"),Object(_["a"])(x,r,a,!1,null,"3377b725",null));t["default"]=S.exports}}]);