(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-31bb6612"],{"1fe8":function(e,t,r){e.exports=r.p+"static/img/error.e53687be.png"},2708:function(e,t,r){"use strict";var a=r("5530"),s=r("2f62"),n={data:function(){return{tabIndex:"0",page:1,size:10,limit:10,searchParams:{},dataParams:{}}},computed:Object(a["a"])({},Object(s["c"])({permissionArr:function(e){return e.permission.permissionArr}})),mounted:function(){console.log(this.permissionArr,"permissionArr")}};t["a"]=n},"2b70":function(e,t,r){},"586f":function(e,t,r){"use strict";r("a83d")},"8ca1":function(e,t,r){"use strict";r("2b70")},a83d:function(e,t,r){},da1a:function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"usermusic-list-box"},[r("div",{staticClass:"searchParams"},[r("SearchPanel",{attrs:{forms:e.forms,"show-reset":!0,"show-search-btn":!0},on:{onReset:e.reset,onSearch:e.onSearch},model:{value:e.searchParams,callback:function(t){e.searchParams=t},expression:"searchParams"}})],1),r("tableList",{ref:"tableList",attrs:{cfgs:e.cfgs,layout:"total, sizes, prev, pager, next, jumper"}}),e.isDestoryComp?r("upMusic",{ref:"upMusic",on:{destoryComp:e.destoryComp,getList:e.getList}}):e._e()],1)},s=[],n=r("c7eb"),i=r("1da1"),o=r("5530"),l=(r("4e82"),r("1a72")),u=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"usermusic-upMusic-box"},[r("drawer",{ref:"drawer",attrs:{size:"470px",title:e.title,isShowUpdate:!0,disabled:e.disabled},on:{cancel:e.cancel,submitForm:e.submitForm,closed:e.closed,update:e.update}},[r("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{slot:"body",model:e.ruleForm,rules:e.rules,"label-width":"60px","label-suffix":":","hide-required-asterisk":"see"===e.status},slot:"body"},[r("el-form-item",{attrs:{label:"歌名",prop:"name"}},[r("el-input",{attrs:{disabled:e.disabled},model:{value:e.ruleForm.name,callback:function(t){e.$set(e.ruleForm,"name",t)},expression:"ruleForm.name"}})],1),r("el-form-item",{attrs:{label:"歌手",prop:"singer"}},[r("el-input",{attrs:{disabled:e.disabled},model:{value:e.ruleForm.singer,callback:function(t){e.$set(e.ruleForm,"singer",t)},expression:"ruleForm.singer"}})],1),r("el-form-item",{attrs:{label:"语种",prop:"language"}},[r("el-select",{attrs:{placeholder:"请选择语种",disabled:e.disabled},model:{value:e.ruleForm.language,callback:function(t){e.$set(e.ruleForm,"language",t)},expression:"ruleForm.language"}},e._l(e.languageList,(function(e){return r("el-option",{key:e.name,attrs:{label:e.name,value:e.name}})})),1)],1),r("el-form-item",{attrs:{label:"曲风",prop:"melody"}},[r("el-select",{attrs:{placeholder:"请选择",disabled:e.disabled},model:{value:e.ruleForm.melody,callback:function(t){e.$set(e.ruleForm,"melody",t)},expression:"ruleForm.melody"}},e._l(e.melodyList,(function(e){return r("el-option",{key:e.name,attrs:{label:e.name,value:e.name}})})),1)],1),r("el-form-item",{attrs:{label:"年代",prop:"age"}},[r("el-select",{attrs:{placeholder:"请选择",disabled:e.disabled},model:{value:e.ruleForm.age,callback:function(t){e.$set(e.ruleForm,"age",t)},expression:"ruleForm.age"}},e._l(e.ageList,(function(e){return r("el-option",{key:e.name,attrs:{label:e.name,value:e.name}})})),1)],1),r("el-form-item",{attrs:{label:"铃声",prop:"bells"}},[r("el-select",{attrs:{placeholder:"请选择",disabled:e.disabled},model:{value:e.ruleForm.bells,callback:function(t){e.$set(e.ruleForm,"bells",t)},expression:"ruleForm.bells"}},e._l(e.bellsList,(function(e){return r("el-option",{key:e.name,attrs:{label:e.name,value:e.name}})})),1)],1)],1)],1)],1)},c=[],m=(r("b64b"),r("e9c4"),r("b0c0"),r("d3b7"),r("25f0"),r("0472")),p=r("279a"),d={components:{drawer:m["a"]},data:function(){return{status:"see",languageList:p["a"].USERLANGUAGELIST,melodyList:p["a"].USERMUSICSTYLELIST,ageList:p["a"].USERMUSICAGELIST,bellsList:p["a"].USERMUSICBELLSLIST,ruleForm:{name:"",singer:"",language:"",melody:"",age:"",bells:""},oldParams:{},rules:{name:[{required:!0,message:"请输入歌名",trigger:"blur"}],singer:[{required:!0,message:"请输入歌手",trigger:"blur"}]}}},computed:{title:function(){return"update"===this.status?"修改用户音乐详情":"see"===this.status?"查看用户音乐详情":void 0},disabled:function(){return"see"===this.status}},methods:{handleClose:function(){this.openComp(!1)},loadParams:function(e,t){this.openComp(),this.status=e;var r=JSON.parse(JSON.stringify(t));this.$set(this.$data,"ruleForm",r),this.oldParams=JSON.parse(JSON.stringify(this.ruleForm))},openComp:function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];this.$refs.drawer.loadParams(e)},cancel:function(){var e=this;JSON.stringify(this.oldParams)!==JSON.stringify(this.ruleForm)?this.$confirm("关闭弹窗将不会保留您的更改, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){e.openComp(!1)})).catch((function(){})):this.openComp(!1)},update:function(){this.status="update"},submitForm:function(e){var t=this;return Object(i["a"])(Object(n["a"])().mark((function r(){return Object(n["a"])().wrap((function(r){while(1)switch(r.prev=r.next){case 0:t.$refs[e].validate(function(){var e=Object(i["a"])(Object(n["a"])().mark((function e(r){var a,s,i,o;return Object(n["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!r){e.next=10;break}return a=t.ruleForm,s=[a.language,a.melody,a.age,a.bells],i={id:a.id,name:a.name,singer:a.singer,tags:s.toString()},e.next=6,Object(l["pb"])(i);case 6:o=e.sent,2e3===o.code&&(t.$success("修改成功"),t.openComp(!1),t.$emit("getList")),e.next=12;break;case 10:return console.log("error submit!!"),e.abrupt("return",!1);case 12:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 1:case"end":return r.stop()}}),r)})))()},resetForm:function(e){this.$refs[e].resetFields()},closed:function(){this.$emit("destoryComp")}}},b=d,f=(r("8ca1"),r("2877")),h=Object(f["a"])(b,u,c,!1,null,"fa6c957e",null),g=h.exports,w=r("04a2"),v=r("4053"),y=r("8daa"),x=r("cf45"),F=r("2708"),L={mixins:[F["a"]],components:{SearchPanel:w["a"],tableList:v["a"],upMusic:g},data:function(){return{searchParams:{sort:""},isDestoryComp:!1}},computed:{forms:function(){return[{name:"sort",type:"select",value:"",keyName:"value",optionLabel:"name",label:"排序查看",placeholder:"请选择",options:p["a"].SORTLIST},{name:"status",type:"select",value:"",keyName:"value",optionLabel:"name",label:"筛选查看",placeholder:"请选择",options:p["a"].USERMUSICUPLIST},{name:"user_number",type:"input",value:"",label:"用户ID",isNum:!0,placeholder:"请输入用户ID"},{name:"keywords",type:"input",value:"",label:"歌手/歌曲",placeholder:"请输入歌手/歌曲"}]},cfgs:function(){var e=this;return{vm:this,url:y["a"].user.musicList,search:{sizes:[10,20,30]},columns:[{label:"上传用户昵称",minWidth:"120px",prop:"nickname"},{label:"上传用户ID",minWidth:"120px",prop:"user_number"},{label:"上传时间",minWidth:"180px",render:function(e,t){return e("span",t.row.create_time?Object(x["h"])(t.row.create_time,"YYYY-MM-DD HH:mm:ss",!0):"无")}},{label:"音乐",isimg:!0,prop:"url",nameProp:"name",subNameProp:"singer",tagProp:"tags",width:"300px"},{label:"处理时间",minWidth:"180px",render:function(e,t){return e("span",t.row.update_time?Object(x["h"])(t.row.update_time,"YYYY-MM-DD HH:mm:ss",!0):"无")}},{label:"处理人",render:function(e,t){return e("span",t.row.deal_user_name||"无")}},{label:"操作",minWidth:"200px",render:function(t,r){return t("div",[t("el-button",{props:{type:"primary"},on:{click:function(){e.editFunc(r.row)}}},"修改"),t("el-button",{style:{display:1===r.row.status?"none":"unset"},on:{click:function(){e.up(r.row)}}},"上架"),t("el-button",{props:{type:"danger"},style:{display:2===r.row.status?"none":"unset"},on:{click:function(){e.down(r.row)}}},"下架")])}}]}}},methods:{beforeSearch:function(e){var t=Object(o["a"])({},this.searchParams);return{page:e.page,pagesize:e.size,user_number:t.user_number,keywords:t.keywords,status:t.status,sort:t.sort}},getList:function(){this.$refs.tableList.getData()},reset:function(){this.searchParams={},this.getList()},onSearch:function(){this.getList()},editFunc:function(e){this.load("update",e)},load:function(e,t){var r=this;this.isDestoryComp=!0,setTimeout((function(){r.$refs.upMusic.loadParams(e,t)}),50)},destoryComp:function(){this.isDestoryComp=!1},up:function(e){var t=this;return Object(i["a"])(Object(n["a"])().mark((function r(){return Object(n["a"])().wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,Object(l["Kb"])({id:e.id});case 2:t.$success("上架成功"),t.getList();case 4:case"end":return r.stop()}}),r)})))()},down:function(e){var t=this;return Object(i["a"])(Object(n["a"])().mark((function r(){return Object(n["a"])().wrap((function(r){while(1)switch(r.prev=r.next){case 0:t.$confirm("确定要下架该音乐？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(i["a"])(Object(n["a"])().mark((function r(){return Object(n["a"])().wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,Object(l["ob"])({id:e.id});case 2:t.$success("下架成功"),t.getList();case 4:case"end":return r.stop()}}),r)})))).catch((function(){}));case 1:case"end":return r.stop()}}),r)})))()}}},O=L,S=(r("586f"),Object(f["a"])(O,a,s,!1,null,null,null));t["default"]=S.exports}}]);