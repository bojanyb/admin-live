(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c0180074"],{"0c4c":function(e,t,r){"use strict";r("9735")},"0d47":function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"app-container"},[r("div",{staticClass:"searchParams"},[r("SearchPanel",{attrs:{forms:e.forms,"show-reset":!0,"show-search-btn":!0},on:{onReset:e.reset,onSearch:e.onSearch},model:{value:e.searchParams,callback:function(t){e.searchParams=t},expression:"searchParams"}})],1),r("tableList",{ref:"tableList",attrs:{cfgs:e.cfgs}}),r("bindStuck",{ref:"bindStuck"}),e.isDestoryComp?r("userEdit",{ref:"userEdit",on:{destoryComp:e.destoryComp,getList:e.getList}}):e._e(),e.isDestoryComp?r("punishComp",{ref:"punishComp",on:{destoryComp:e.destoryComp,getList:e.getList}}):e._e(),e.isDestoryComp?r("upatePassComp",{ref:"upatePassComp",on:{destoryComp:e.destoryComp,getList:e.getList}}):e._e()],1)},s=[],n=r("4672"),i=r("40bd"),o=r("7e8c"),l=(r("23dc"),r("8bda"),r("48d4"),r("65e5"),r("45c1"),r("1a72")),u=r("c24f"),c=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"share-bindStuck-box"},[r("el-dialog",{attrs:{title:"卡列表",visible:e.dialogVisible,width:"500px","close-on-click-modal":!1,"before-close":e.handleClose},on:{"update:visible":function(t){e.dialogVisible=t}}},[r("div",{staticClass:"bindStuck"},e._l(e.list,(function(t,a){return r("div",{key:a},[r("img",{attrs:{src:t.url,alt:""}}),r("span",[e._v(e._s(t.name))]),r("span",[e._v(e._s(t.card_id))])])})),0),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")])],1)])],1)},d=[],m=(r("ee6e"),r("279a")),p={data:function(){return{dialogVisible:!1,list:[]}},methods:{handleClose:function(){this.dialogVisible=!1},getList:function(e){var t=this;Object(l["hb"])({page:1,userid:e}).then((function(e){e.data.list&&e.data.list.length>0&&(e.data.list.forEach((function(e){var t=m["a"].BANKLIST.find((function(e){e.code,e.wallt_id}));e.name=t?t.name:"",e.url=t?t.url:""})),t.list=e.data.list||[])}))}}},f=p,b=(r("e732"),r("e607")),h=Object(b["a"])(f,c,d,!1,null,null,null),v=h.exports,g=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"user-upatePassComp-box"},[r("el-dialog",{attrs:{visible:e.dialogVisible,width:"400px","before-close":e.handleClose,"show-close":!1},on:{"update:visible":function(t){e.dialogVisible=t},closed:e.closed}},[r("div",{staticClass:"mainBox"},[r("div",{staticClass:"tit"},[e._v("更改ID密码")]),r("div",{staticClass:"id"},[e._v("（用户ID："+e._s(e.form.user_number)+"）")])]),r("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"95px"}},[r("el-form-item",{attrs:{label:"ID登录密码",prop:"password"}},[r("el-input",{attrs:{placeholder:"请输入6-12位英文+数字组成的密码"},model:{value:e.ruleForm.password,callback:function(t){e.$set(e.ruleForm,"password",t)},expression:"ruleForm.password"}})],1)],1),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")]),r("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm")}}},[e._v("确 定")])],1)],1)],1)},k=[],_={data:function(){return{dialogVisible:!1,form:{},ruleForm:{password:""},rules:{password:[{required:!0,message:"请输入更改ID密码",trigger:"blur"},{pattern:/^(?=.*\d)(?=.*[a-zA-Z])[\da-zA-Z~!@#$%^&*]{6,20}$/,required:!0,message:"密码只能输入数字和字母, 且只能6-20位之间",trigger:"blur"}]}}},methods:{handleClose:function(){this.dialogVisible=!1},loadParams:function(e){this.dialogVisible=!0,this.form=e},submitForm:function(e){var t=this;return Object(o["a"])(Object(i["a"])().mark((function r(){return Object(i["a"])().wrap((function(r){while(1)switch(r.prev=r.next){case 0:t.$refs[e].validate(function(){var e=Object(o["a"])(Object(i["a"])().mark((function e(r){var a;return Object(i["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!r){e.next=7;break}return e.next=3,Object(u["r"])({user_id:t.form.id,password:t.ruleForm.password});case 3:a=e.sent,2e3===a.code&&(t.$success("修改成功"),t.dialogVisible=!1,t.$emit("getList")),e.next=9;break;case 7:return console.log("error submit!!"),e.abrupt("return",!1);case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 1:case"end":return r.stop()}}),r)})))()},resetForm:function(e){this.$refs[e].resetFields()},closed:function(){this.$emit("destoryComp")}}},x=_,w=(r("c274"),Object(b["a"])(x,g,k,!1,null,null,null)),F=w.exports,y=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"user-punishComp-box"},[r("el-dialog",{attrs:{title:"用户处罚",visible:e.dialogVisible,width:"450px","before-close":e.handleClose},on:{"update:visible":function(t){e.dialogVisible=t}}},[r("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"100px"}},[r("el-form-item",{attrs:{label:"处罚类型",prop:"type"}},[r("el-select",{attrs:{placeholder:"请选择"},model:{value:e.ruleForm.type,callback:function(t){e.$set(e.ruleForm,"type",t)},expression:"ruleForm.type"}},e._l(e.typeList,(function(e){return r("el-option",{key:e.value,attrs:{label:e.name,value:e.value}})})),1)],1),r("el-form-item",{attrs:{label:"处罚时间",prop:"ban_duration"}},[r("el-select",{attrs:{placeholder:"请选择"},model:{value:e.ruleForm.ban_duration,callback:function(t){e.$set(e.ruleForm,"ban_duration",t)},expression:"ruleForm.ban_duration"}},e._l(e.timeList,(function(e,t){return r("el-option",{key:t,attrs:{label:e.name,value:e.value}})})),1)],1),r("el-form-item",{attrs:{label:"处罚备注",prop:"remark"}},[r("el-input",{attrs:{type:"textarea",rows:4},model:{value:e.ruleForm.remark,callback:function(t){e.$set(e.ruleForm,"remark",t)},expression:"ruleForm.remark"}})],1)],1),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")]),r("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm")}}},[e._v("确 定")])],1)],1)],1)},O=[],j=r("9b62"),C={data:function(){return{dialogVisible:!1,timeList:m["a"].DURATION,typeList:m["a"].USERPUNISHTYPELIST,form:{},ruleForm:{type:null,ban_duration:"",remark:""},rules:{type:[{required:!0,message:"请选择处罚类型",trigger:"change"}],ban_duration:[{required:!0,message:"请选择处罚时间",trigger:"change"}],remark:[{required:!0,message:"请输入处罚备注",trigger:"blur"}]}}},methods:{handleClose:function(){this.dialogVisible=!1},loadParams:function(e){this.dialogVisible=!0,this.form=e},submitForm:function(e){var t=this;return Object(o["a"])(Object(i["a"])().mark((function r(){return Object(i["a"])().wrap((function(r){while(1)switch(r.prev=r.next){case 0:t.$refs[e].validate(function(){var e=Object(o["a"])(Object(i["a"])().mark((function e(r){var a,s,o;return Object(i["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!r){e.next=9;break}return a=t.form,s=Object(n["a"])(Object(n["a"])({},t.ruleForm),{},{user_number:a.user_number}),e.next=5,Object(j["p"])(s);case 5:o=e.sent,2e3===o.code&&(t.$success("操作成功"),t.dialogVisible=!1,t.$emit("getList")),e.next=11;break;case 9:return console.log("error submit!!"),e.abrupt("return",!1);case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 1:case"end":return r.stop()}}),r)})))()},resetForm:function(e){this.$refs[e].resetFields()}}},P=C,S=(r("4239"),Object(b["a"])(P,y,O,!1,null,null,null)),$=S.exports,L=r("04a2"),I=r("4053"),T=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"userAdd-box"},[r("drawer",{ref:"drawer",attrs:{size:"660px",title:e.title,isShowUpdate:!0,disabled:e.disabled},on:{cancel:e.cancel,submitForm:e.submitForm,closed:e.closed,update:e.update}},[r("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{slot:"body",model:e.ruleForm,rules:e.rules,"label-width":"100px","label-suffix":":","hide-required-asterisk":"see"===e.status},slot:"body"},[r("div",{staticClass:"userBox"},[r("el-form-item",{class:{mustBox:"see"!==e.status},attrs:{label:"用户ID",prop:"user_number"}},[r("el-input",{attrs:{disabled:!0},model:{value:e.ruleForm.user_number,callback:function(t){e.$set(e.ruleForm,"user_number",t)},expression:"ruleForm.user_number"}})],1),r("el-form-item",{attrs:{label:"昵称",prop:"nickname"}},[r("el-input",{attrs:{disabled:e.disabled},model:{value:e.ruleForm.nickname,callback:function(t){e.$set(e.ruleForm,"nickname",t)},expression:"ruleForm.nickname"}})],1)],1),r("div",{staticClass:"userBox selectBox"},[r("el-form-item",{attrs:{label:"个性签名",prop:"autograph"}},[r("el-input",{attrs:{disabled:e.disabled},model:{value:e.ruleForm.autograph,callback:function(t){e.$set(e.ruleForm,"autograph",t)},expression:"ruleForm.autograph"}})],1),r("el-form-item",{class:{mustBox:"see"!==e.status},attrs:{label:"性别",prop:"sex"}},[r("el-select",{attrs:{placeholder:"请选择性别",disabled:!0},model:{value:e.ruleForm.sex,callback:function(t){e.$set(e.ruleForm,"sex",t)},expression:"ruleForm.sex"}},e._l(e.sexList,(function(e){return r("el-option",{key:e.value,attrs:{label:e.name,value:e.value}})})),1)],1)],1),r("div",{staticClass:"userBox"},[r("el-form-item",{class:{mustBox:"see"!==e.status},attrs:{label:"手机号",prop:"phone"}},[r("el-input",{attrs:{disabled:!0},model:{value:e.ruleForm.phone,callback:function(t){e.$set(e.ruleForm,"phone",t)},expression:"ruleForm.phone"}})],1),r("el-form-item",{class:{mustBox:"see"!==e.status},attrs:{label:"所属公会",prop:"guild_name"}},[r("el-input",{attrs:{disabled:!0},model:{value:e.ruleForm.guild_name,callback:function(t){e.$set(e.ruleForm,"guild_name",t)},expression:"ruleForm.guild_name"}})],1)],1),r("div",{staticClass:"userBox btnBox"},[r("el-form-item",{staticClass:"isBindCard",class:{mustBox:"see"!==e.status},attrs:{label:"是否已绑卡",prop:"is_bindcard"}},[r("el-button",{attrs:{type:"primary",disabled:e.disabled},on:{click:e.isShowBindcard}},[e._v(e._s(e.ruleForm.is_bindcard?"是":"否"))])],1)],1),r("el-form-item",{staticClass:"photoBox",class:{mustBox:"see"!==e.status},attrs:{label:"头像",prop:"face"}},[r("uploadImg",{attrs:{imgUrl:e.ruleForm.face,disabled:!0,isDefault:!0}}),r("el-button",{attrs:{type:"primary",disabled:e.disabled},on:{click:e.replaceImg}},[e._v("替换默认头像")])],1)],1)],1),r("blocked",{ref:"blocked",on:{evaluationFunc:e.evaluationFunc,blockedCancel:e.blockedCancel}}),r("bindStuck",{ref:"bindStuck"})],1)},D=[],V=(r("65c4"),r("0472")),B=r("40cb"),E=r("e60d"),U={components:{uploadImg:B["a"],blocked:E["a"],bindStuck:v,drawer:V["a"]},data:function(){return{dialogVisible:!1,statusList:m["a"].USERSTATUSLISTTWO,sexList:m["a"].SEXLIST,statusIndex:null,status:"see",defaultImg:r("113c"),ruleForm:{user_number:"",nickname:"",autograph:"",sex:"",guild_name:"",phone:"",is_bindcard:0,status:"",face:"",blockedParams:{}},oldParams:{},rules:{nickname:[{required:!0,message:"请输入昵称",trigger:"blur"}],autograph:[{required:!1,message:"请输入个性签名",trigger:"blur"}]}}},computed:{title:function(){return"add"===this.status?"新增用户":"update"===this.status?"修改用户资料":"查看用户资料"},disabled:function(){return"see"===this.status}},methods:{loadParams:function(e,t){this.openComp(),this.status=e;var r=JSON.parse(JSON.stringify(t));r.phone=r.phone?r.phone:"无",r.guild_name=r.guild_name?r.guild_name:"无",this.statusIndex=r.status,r.blockedParams={},this.$set(this.$data,"ruleForm",r),this.oldParams=JSON.parse(JSON.stringify(this.ruleForm))},openComp:function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];this.$refs.drawer.loadParams(e)},handleClose:function(){this.openComp()},cancel:function(){var e=this;JSON.stringify(this.oldParams)!==JSON.stringify(this.ruleForm)?this.$confirm("关闭弹窗将不会保留您的更改, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){e.openComp(!1)})).catch((function(){})):this.openComp(!1)},blockedCancel:function(){this.statusIndex=this.oldParams.status,this.ruleForm.status=this.oldParams.status},update:function(){this.status="update"},isShowBindcard:function(){this.ruleForm.is_bindcard&&(this.$refs.bindStuck.dialogVisible=!0,this.$refs.bindStuck.getList(this.ruleForm.id))},submitForm:function(e){var t=this;return Object(o["a"])(Object(i["a"])().mark((function r(){return Object(i["a"])().wrap((function(r){while(1)switch(r.prev=r.next){case 0:t.$refs[e].validate(function(){var e=Object(o["a"])(Object(i["a"])().mark((function e(r){var a,s,n,o,l;return Object(i["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!r){e.next=21;break}return a=t.ruleForm,s=t.oldParams,n={user_id:a.id,nickname:a.nickname,autograph:a.autograph},e.next=6,Object(u["g"])(n);case 6:if(o=e.sent,2e3!==o.code){e.next=19;break}if(1===t.statusIndex&&1===s.status){e.next=13;break}return l={status:t.statusIndex,remark:a.blockedParams.remark,kill_time:a.blockedParams.kill_time,id:a.id},1===t.statusIndex&&(delete l.kill_time,delete l.remark),e.next=13,Object(u["h"])(l);case 13:if(a.face===s.face){e.next=18;break}return e.next=16,Object(u["e"])({user_id:a.id});case 16:return e.next=18,e.sent;case 18:setTimeout((function(){t.$success("修改成功"),t.openComp(!1),t.$emit("getList")}),50);case 19:e.next=23;break;case 21:return console.log("error submit!!"),e.abrupt("return",!1);case 23:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 1:case"end":return r.stop()}}),r)})))()},resetForm:function(){var e=this;this.$confirm("关闭后数据不会保存，确定关闭吗？").then((function(t){e.dialogVisible=!1})).catch((function(e){}))},replaceImg:function(){this.$set(this.ruleForm,"face",this.defaultImg)},closed:function(){this.$emit("destoryComp")},statusClick:function(e){this.disabled||(this.statusIndex=e,2===e&&this.$refs.blocked.loadParams())},evaluationFunc:function(e){this.ruleForm.blockedParams=e}}},A=U,N=(r("99b1"),Object(b["a"])(A,T,D,!1,null,null,null)),R=N.exports,q=r("8daa"),Y=r("cf45"),H=r("2708"),K={name:"user-list",mixins:[H["a"]],components:{bindStuck:v,tableList:I["a"],SearchPanel:L["a"],userEdit:R,punishComp:$,upatePassComp:F},data:function(){return{isDestoryComp:!1,dateTimeParams:{start_time:null,end_time:null}}},computed:{forms:function(){var e=this;return[{name:"user_number",type:"input",value:"",label:"用户ID",isNum:!0,placeholder:"请输入用户ID"},{name:"phone",type:"input",value:"",label:"手机号",isNum:!0,placeholder:"请输入手机号"},{name:"nickname",type:"input",value:"",label:"昵称",placeholder:"请输入昵称"},{name:"real_name",type:"input",value:"",label:"真实姓名",placeholder:"请输入真实姓名"},{name:"ip",type:"input",value:"",label:"IP",placeholder:"请输入IP"},{name:"reg_device_id",type:"input",value:"",label:"注册设备",placeholder:"请输入注册设备"},{name:"user_rank",type:"select",value:"",keyName:"value",optionLabel:"name",label:"用户等级",placeholder:"请选择",options:m["a"].USERRANKLIST},{name:"register_type",type:"select",value:"",keyName:"value",optionLabel:"name",label:"注册类型",placeholder:"请选择",options:m["a"].USERREGISTERTYPELIST},{name:"dateTimeParams",type:"datePicker",dateType:"datetimerange",format:"yyyy-MM-dd HH:mm:ss",label:"时间选择",value:"",handler:{change:function(t){e.emptyDateTime(),e.setDateTime(t)},selectChange:function(t,r){e.emptyDateTime()}}}]},cfgs:function(){var e=this,t=[{label:"用户ID",width:"95px",prop:"user_number"},{label:"昵称",width:"110px",prop:"nickname",showOverFlow:!0},{label:"头像",isimg:!0,prop:"face",imgWidth:"50px",imgHeight:"50px"},{label:"性别",width:"95px",prop:"sex",render:function(e,t){var r=m["a"].SEXLIST.find((function(e){return e.value===t.row.sex}));return e("span",r?r.name:"无")}},{label:"等级",width:"125px",render:function(e,t){return e("div",[e("div","用户等级："+t.row.user_rank||!1),e("div","魅力等级："+t.row.live_rank||!1)])}},{label:"真实姓名",width:"110px",render:function(e,t){return e("span",t.row.real_name||"无")}},{label:"IP",width:"110px",render:function(e,t){return e("span",t.row.ip||"无")}},{label:"所属派对公会",width:"160px",render:function(e,t){return e("div",[e("div",t.row.party_name||"无"),e("div",t.row.party_number)])}},{label:"所属直播公会",width:"160px",render:function(e,t){return e("div",[e("div",t.row.live_name||"无"),e("div",t.row.live_number)])}},{label:"是否为派对公会长",width:"135px",render:function(e,t){return e("span",t.row.is_party_admin)}},{label:"是否为直播公会长",width:"135px",render:function(e,t){return e("span",t.row.is_live_admin)}},{label:"是否为房主",width:"110px",render:function(e,t){return e("span",0===t.row.is_guild_room?"否":"是")}},{label:"注册渠道",width:"110px",render:function(e,t){return e("span",t.row.register_type||"无")}},{label:"安全手机/邮箱",width:"110px",render:function(e,t){return e("span",t.row.safe_number||"无")}},{label:"已联系",width:"110px",render:function(t,r){return r.row.maintain_admin?t("span",r.row.maintain_admin):t("el-checkbox",{on:{change:function(t){e.relationFunc(r.row.id)}}},"是否联系")}},{label:"状态",width:"95px",render:function(e,t){var r=m["a"].USERSTATUSLISTTWO.find((function(e){return e.value===t.row.status}));return e("span",r?r.name:"无")}},{label:"是否已绑卡",width:"95px",prop:"is_bindcard",render:function(t,r){return t("div",{style:{color:r.row.is_bindcard?"#ff4949":"#666666",cursor:r.row.is_bindcard?"pointer":""},on:{click:function(){e.bindcardFunc(r.row)}}},r.row.is_bindcard?"是":"否")}},{label:"创建时间",width:"180px",render:function(e,t){return e("span",t.row.create_time?Object(Y["h"])(t.row.create_time,"YYYY-MM-DD HH:mm:ss",!0):"无")}},{label:"封禁时间",width:"180px",render:function(e,t){var r="";return r=-1===t.row.kill_time?"永久":t.row.kill_time?Object(Y["h"])(t.row.kill_time,"YYYY-MM-DD HH:mm:ss",!0):"无",e("span",r)}},{label:"封禁备注",width:"200px",render:function(e,t){return e("span",2==t.row.status?t.row.remark:"无")}},{label:"注册设备",width:"200px",prop:"reg_device_id"},{label:"最后一次登录设备",width:"200px",prop:"last_login_device_id"},{label:"操作",width:"230px",fixed:"right",render:function(t,r){return t("div",[t("el-button",{props:{type:"primary"},style:{display:e.permissionArr.includes("User@userEdit")?"unset":"none"},on:{click:function(){e.editFunc(r.row)}}},"修改"),t("el-button",{props:{type:""},style:{display:e.permissionArr.includes("User@updateLoginPwd")?"unset":"none"},on:{click:function(){e.updatePass(r.row)}}},"更改密码")])}}];return{vm:this,url:q["a"].user.list,columns:this.permissionArr.includes("User@index")?t:[]}}},methods:{relationFunc:function(e){var t=this;return Object(o["a"])(Object(i["a"])().mark((function r(){var a;return Object(i["a"])().wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,Object(u["a"])({user_id:e});case 2:a=r.sent,2e3===a.code&&(t.$success("设置成功"),t.getList());case 4:case"end":return r.stop()}}),r)})))()},beforeSearch:function(e){var t=Object(n["a"])(Object(n["a"])({},this.searchParams),this.dateTimeParams);return{page:e?e.page:null,pagesize:e?e.size:null,user_number:t.user_number,nickname:t.nickname,real_name:t.real_name,ip:t.ip,phone:t.phone,reg_device_id:t.reg_device_id,start_time:t.start_time?Math.floor(t.start_time/1e3):t.start_time,end_time:t.end_time?Math.floor(t.end_time/1e3):t.end_time,user_rank:t.user_rank,live_rank:t.live_rank,register_type:t.register_type}},getList:function(){this.$refs.tableList.getData()},setDateTime:function(e){var t=e?{start_time:e[0],end_time:e[1]}:{};this.$set(this,"dateTimeParams",t)},emptyDateTime:function(){this.dateTimeParams={}},reset:function(){this.searchParams={},this.dateTimeParams={},this.getList()},onSearch:function(){this.getList()},editFunc:function(e){this.load("update",e)},load:function(e,t){var r=this;this.isDestoryComp=!0,setTimeout((function(){r.$refs.userEdit.loadParams(e,t)}),50)},updatePass:function(e){var t=this;this.isDestoryComp=!0,setTimeout((function(){t.$refs.upatePassComp.loadParams(e)}),50)},punishFunc:function(e){var t=this;this.isDestoryComp=!0,setTimeout((function(){t.$refs.punishComp.loadParams(e)}),50)},destoryComp:function(){this.isDestoryComp=!1},handleStatistics:function(e){var t=this,r=1==e.statistical_show?"确认关闭该用户房间统计页面？":"确认为该用户开启房间统计页面？",a=1==e.statistical_show?"成功关闭该用户房间统计页面":"成功开启该用户房间统计页面";this.$alert(r,"提示",{confirmButtonText:"确定",callback:function(r){if("confirm"==r){var s={id:e.id,statistical_show:1==e.statistical_show?0:1};Object(l["vb"])(s).then((function(e){console.log(e),t.getUser(),t.$message.success(a)})).catch((function(e){t.$message.error(e)}))}}})},bindcardFunc:function(e){e.is_bindcard&&(this.$refs.bindStuck.dialogVisible=!0,this.$refs.bindStuck.getList(e.id))}}},M=K,J=(r("0c4c"),Object(b["a"])(M,a,s,!1,null,null,null));t["default"]=J.exports},"113c":function(e,t,r){e.exports=r.p+"static/img/default.548866af.png"},1258:function(e,t,r){},"127f":function(e,t,r){"use strict";r.d(t,"a",(function(){return c}));var a=r("40bd"),s=r("7e8c"),n=(r("48d4"),r("8bda"),r("897d")),i=r.n(n),o=r("4109"),l={ossParams:{region:"oss-cn-shenzhen",success_action_status:"200",accessKeyId:"LTAI5tFTcRH7h3RXKoYmnWMk",accessKeySecret:"qdx4B8jIh2VjBgBDG5fNfG0Oj21GSP",bucket:"live-huidapay-net"}};function u(e){var t=e.name.split("."),r=i()(Date.now()+t[0]);return r=r+"."+t[t.length-1],r}function c(e){return new Promise(function(){var t=Object(s["a"])(Object(a["a"])().mark((function t(r,s){var n,i;return Object(a["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=u(e),i=new o({region:l.ossParams.region,accessKeyId:l.ossParams.accessKeyId,accessKeySecret:l.ossParams.accessKeySecret,bucket:l.ossParams.bucket}),t.next=4,i.multipartUpload(n,e);case 4:t.sent,r({url:"https://photo.aiyi.live/"+n});case 6:case"end":return t.stop()}}),t)})));return function(e,r){return t.apply(this,arguments)}}())}},"1f392":function(e,t,r){},"1fe8":function(e,t,r){e.exports=r.p+"static/img/error.e53687be.png"},2708:function(e,t,r){"use strict";var a=r("4672"),s=r("52c1"),n={data:function(){return{tabIndex:"0",page:1,size:10,limit:10,searchParams:{},dataParams:{}}},computed:Object(a["a"])({},Object(s["c"])({permissionArr:function(e){return e.permission.permissionArr}})),mounted:function(){console.log(this.permissionArr,"permissionArr")}};t["a"]=n},4239:function(e,t,r){"use strict";r("ba87")},7435:function(e,t,r){},9735:function(e,t,r){},"99b1":function(e,t,r){"use strict";r("1f392")},"9b62":function(e,t,r){"use strict";r.d(t,"f",(function(){return n})),r.d(t,"p",(function(){return i})),r.d(t,"r",(function(){return o})),r.d(t,"c",(function(){return l})),r.d(t,"n",(function(){return u})),r.d(t,"g",(function(){return c})),r.d(t,"a",(function(){return d})),r.d(t,"d",(function(){return m})),r.d(t,"q",(function(){return p})),r.d(t,"m",(function(){return f})),r.d(t,"j",(function(){return b})),r.d(t,"l",(function(){return h})),r.d(t,"t",(function(){return v})),r.d(t,"k",(function(){return g})),r.d(t,"b",(function(){return k})),r.d(t,"o",(function(){return _})),r.d(t,"e",(function(){return x})),r.d(t,"h",(function(){return w})),r.d(t,"i",(function(){return F})),r.d(t,"s",(function(){return y}));var a=r("829b"),s=r("8daa");function n(e){return Object(a["a"])({url:s["a"].risk.coverCheck,method:"post",data:e})}function i(e){return Object(a["a"])({url:s["a"].risk.save,method:"post",data:e})}function o(e){return Object(a["a"])({url:s["a"].risk.softDelete,method:"post",data:e})}function l(e){return Object(a["a"])({url:s["a"].risk.add,method:"post",data:e})}function u(e){return Object(a["a"])({url:s["a"].risk.review,method:"post",data:e})}function c(e){return Object(a["a"])({url:s["a"].risk.customerServiceList,method:"post",data:e})}function d(e){return Object(a["a"])({url:s["a"].risk.UserPunishLog,method:"post",data:e})}function m(e){return Object(a["a"])({url:s["a"].risk.addUserPunish,method:"post",data:e})}function p(e){return Object(a["a"])({url:s["a"].risk.saveUserPunish,method:"post",data:e})}function f(e){return Object(a["a"])({url:s["a"].risk.removeUserPunish,method:"post",data:e})}function b(e){return Object(a["a"])({url:s["a"].risk.passUserPunish,method:"post",data:e})}function h(e){return Object(a["a"])({url:s["a"].risk.punishStatus,method:"post",data:e})}function v(e){return Object(a["a"])({url:s["a"].risk.updateSource,method:"post",data:e})}function g(e){return Object(a["a"])({url:s["a"].risk.punishOperateLog,method:"post",data:e})}function k(e){return Object(a["a"])({url:s["a"].risk.acceptPunish,method:"post",data:e})}function _(e){return Object(a["a"])({url:s["a"].risk.roomTalkList,method:"post",data:e})}function x(e){return Object(a["a"])({url:s["a"].risk.chatTalkList,method:"post",data:e})}function w(e){return Object(a["a"])({url:s["a"].risk.audioStreamDefyListExport,method:"post",data:e})}function F(e){return Object(a["a"])({url:s["a"].risk.punishWordsList,method:"post",data:e})}function y(e){return Object(a["a"])({url:s["a"].risk.updatePunishWords,method:"post",data:e})}},ba87:function(e,t,r){},c274:function(e,t,r){"use strict";r("1258")},d7ab:function(e,t,r){},de4a:function(e,t,r){"use strict";r("d7ab")},e60d:function(e,t,r){"use strict";var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"blocked-box"},[r("el-dialog",{attrs:{title:"封禁",visible:e.dialogVisible,width:"500px","close-on-click-modal":!1,"before-close":e.handleClose},on:{"update:visible":function(t){e.dialogVisible=t}}},[r("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"80px"}},[r("el-form-item",{attrs:{label:"封禁时间",prop:"kill_time"}},[r("el-select",{attrs:{placeholder:"请选择"},model:{value:e.ruleForm.kill_time,callback:function(t){e.$set(e.ruleForm,"kill_time",t)},expression:"ruleForm.kill_time"}},e._l(e.timerList,(function(e){return r("el-option",{key:e.value,attrs:{label:e.name,value:e.value}})})),1)],1),r("el-form-item",{attrs:{label:"封禁说明",prop:"remark"}},[r("el-input",{attrs:{type:"textarea",rows:5,placeholder:"正常状态可不填",clearable:""},model:{value:e.ruleForm.remark,callback:function(t){e.$set(e.ruleForm,"remark",t)},expression:"ruleForm.remark"}})],1)],1),r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:e.cancel}},[e._v("取 消")]),r("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm")}}},[e._v("确 定")])],1)],1)],1)},s=[],n=r("40bd"),i=r("7e8c"),o=r("279a"),l={data:function(){return{dialogVisible:!1,timerList:o["a"].DURATION,ruleForm:{kill_time:null,remark:""},rules:{kill_time:[{required:!0,message:"请选择封禁时间",trigger:"change"}],remark:[{required:!0,message:"请填写封禁说明",trigger:"blur"}]}}},methods:{loadParams:function(){this.dialogVisible=!0},handleClose:function(){this.dialogVisible=!1},submitForm:function(e){var t=this;return Object(i["a"])(Object(n["a"])().mark((function r(){return Object(n["a"])().wrap((function(r){while(1)switch(r.prev=r.next){case 0:t.$refs[e].validate(function(){var e=Object(i["a"])(Object(n["a"])().mark((function e(r){return Object(n["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!r){e.next=5;break}t.dialogVisible=!1,t.$emit("evaluationFunc",t.ruleForm),e.next=7;break;case 5:return console.log("error submit!!"),e.abrupt("return",!1);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 1:case"end":return r.stop()}}),r)})))()},cancel:function(){this.dialogVisible=!1,this.$emit("blockedCancel")},resetForm:function(e){this.$refs[e].resetFields()}}},u=l,c=(r("de4a"),r("e607")),d=Object(c["a"])(u,a,s,!1,null,"555e1083",null);t["a"]=d.exports},e732:function(e,t,r){"use strict";r("7435")}}]);