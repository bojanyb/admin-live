(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3c74ba04"],{"022c":function(e,t,a){"use strict";a("1147")},1147:function(e,t,a){},"1fe8":function(e,t,a){e.exports=a.p+"static/img/error.e53687be.png"},2708:function(e,t,a){"use strict";var n=a("5530"),r=a("2f62"),i={data:function(){return{tabIndex:"0",page:1,size:10,limit:10,searchParams:{},dataParams:{}}},computed:Object(n["a"])({},Object(r["c"])({permissionArr:function(e){return e.permission.permissionArr}})),mounted:function(){console.log(this.permissionArr,"permissionArr")}};t["a"]=i},"3ed7":function(e,t,a){"use strict";a("72c8")},"3fb1":function(e,t,a){"use strict";a("c55f")},"4cab":function(e,t,a){"use strict";a("f093")},"72c8":function(e,t,a){},8593:function(e,t,a){"use strict";a.d(t,"j",(function(){return o})),a.d(t,"f",(function(){return s})),a.d(t,"d",(function(){return l})),a.d(t,"i",(function(){return c})),a.d(t,"k",(function(){return u})),a.d(t,"g",(function(){return d})),a.d(t,"h",(function(){return m})),a.d(t,"e",(function(){return p})),a.d(t,"c",(function(){return h})),a.d(t,"a",(function(){return f})),a.d(t,"b",(function(){return b})),a.d(t,"l",(function(){return v})),a.d(t,"m",(function(){return g})),a.d(t,"o",(function(){return k})),a.d(t,"n",(function(){return y}));var n=a("829b"),r=a("299b"),i=a("8daa");function o(e){return Object(n["a"])({url:i["a"].system.dummy.deleteVirtualPhone,method:"post",data:e})}function s(e){return Object(n["a"])({url:i["a"].system.dummy.addVirtualPhoneField,method:"post",data:e})}function l(e){return Object(n["a"])({url:i["a"].system.dummy.addPhoneRoll,method:"post",data:e})}function c(e){return Object(n["a"])({url:i["a"].system.dummy.deletePhone,method:"post",data:e})}function u(e){return Object(r["a"])({url:i["a"].system.account.getBanner,method:"post",data:e})}function d(e){return Object(n["a"])({url:i["a"].system.guild.configRebate,method:"post",data:e})}function m(e){return Object(n["a"])({url:i["a"].system.guild.delConfigRebate,method:"post",data:e})}function p(e){return Object(n["a"])({url:i["a"].system.addSysNotice,method:"post",data:e})}function h(e){return Object(n["a"])({url:i["a"].system.addOfficialNotice,method:"post",data:e})}function f(e){return Object(n["a"])({url:i["a"].system.AppruleAdd,method:"post",data:e})}function b(e){return Object(n["a"])({url:i["a"].system.AppruleUpdate,method:"post",data:e})}function v(e){return Object(n["a"])({url:i["a"].system.getChannels,method:"post",data:e})}function g(e){return Object(n["a"])({url:i["a"].system.getSwitchValue,method:"post",data:e})}function k(e){return Object(n["a"])({url:i["a"].system.tabbar.updateStatus,method:"post",data:e})}function y(e){return Object(n["a"])({url:i["a"].system.tabbar.updateConfig,method:"post",data:e})}},c538:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-version-config"},[a("menuComp",{ref:"menuComp",attrs:{menuList:e.menuList},on:{tabChange:e.tabChange},model:{value:e.tabIndex,callback:function(t){e.tabIndex=t},expression:"tabIndex"}}),0==e.tabIndex?a("versionConfig"):e._e(),1==e.tabIndex?a("checkSwitchConfig"):e._e()],1)},r=[],i=a("3923"),o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-version-config"},[a("div",{staticClass:"searchParams"},[a("SearchPanel",{attrs:{forms:e.forms,"show-search-btn":!0,"show-add":!0},on:{add:e.handleAdd,onSearch:e.onSearch},model:{value:e.searchParams,callback:function(t){e.searchParams=t},expression:"searchParams"}})],1),a("div",{staticClass:"tableList"},[a("tableList",{ref:"tableList",attrs:{cfgs:e.cfgs}})],1),a("el-dialog",{attrs:{title:e.title,visible:e.FormVisible,"close-on-click-modal":!1},on:{"update:visible":function(t){e.FormVisible=t}}},[a("div",{staticClass:"navBox"},e._l(e.navSourceList,(function(t){return a("div",{key:t.key,staticClass:"navItem",class:1==t.isActive?"active":"",on:{click:function(a){return e.handlerNav(t)}}},[e._v(e._s(t.label))])})),0),a("el-form",{ref:"Form",attrs:{model:e.Form,"label-width":"120px",rules:e.FormRules}},[a("el-form-item",[a("el-radio-group",{staticClass:"platformType",attrs:{disabled:0==e.isAdd},model:{value:e.platform,callback:function(t){e.platform=t},expression:"platform"}},[a("el-radio-button",{attrs:{label:"2"}},[e._v("Android")]),a("el-radio-button",{attrs:{label:"1"}},[e._v("iOS")]),-1==e.node_env.indexOf("aidoo")?a("el-radio-button",{attrs:{label:"3"}},[e._v("模拟器")]):e._e(),a("el-radio-button",{attrs:{label:"4"}},[e._v("PC")])],1)],1),a("el-form-item",{attrs:{label:"任务名",prop:"title"}},[a("el-input",{attrs:{placeholder:"输入任务名"},model:{value:e.Form.title,callback:function(t){e.$set(e.Form,"title",t)},expression:"Form.title"}})],1),e.node_env.indexOf("aidoo")>-1?a("el-form-item",{attrs:{label:"渠道"}},[a("el-radio-group",{model:{value:e.packet_type,callback:function(t){e.packet_type=t},expression:"packet_type"}},[a("el-radio",{attrs:{label:1}},[e._v("主包")]),a("el-radio",{attrs:{label:2}},[e._v("谷歌")])],1)],1):e._e(),a("el-form-item",{attrs:{label:"升级类型"}},[a("el-radio-group",{model:{value:e.is_mandatory,callback:function(t){e.is_mandatory=t},expression:"is_mandatory"}},[a("el-radio",{attrs:{label:10}},[e._v("建议升级")]),a("el-radio",{attrs:{label:20}},[e._v("强制升级")]),"1"!==e.platform?a("el-radio",{attrs:{label:30}},[e._v("热更新")]):e._e()],1)],1),30!==e.is_mandatory?a("el-form-item",{attrs:{label:"下载链接",prop:"download_url"}},[a("el-input",{attrs:{placeholder:"输入下载链接"},model:{value:e.Form.download_url,callback:function(t){e.$set(e.Form,"download_url",t)},expression:"Form.download_url"}})],1):e._e(),a("el-form-item",{attrs:{label:"版本号",prop:"version"}},[a("el-input",{attrs:{placeholder:"如: 1.0.1"},model:{value:e.Form.version,callback:function(t){e.$set(e.Form,"version",t)},expression:"Form.version"}})],1),"1"!==e.platform?a("el-form-item",{attrs:{label:"4"==e.platform?"PC Code":"安卓Code",prop:"version_code"}},[a("el-input",{model:{value:e.Form.version_code,callback:function(t){e.$set(e.Form,"version_code",t)},expression:"Form.version_code"}})],1):e._e(),30===e.is_mandatory&&"1"!==e.platform?a("el-form-item",{attrs:{label:"热更新code",prop:"hotfix",rules:[{required:!0,pattern:/^[0-9]+([.]{1}[0-9]{1,2})?$/,message:"请输入正整数",trigger:"blur"}]}},[a("el-input",{attrs:{placeholder:"如: 1.0.1"},model:{value:e.Form.hotfix,callback:function(t){e.$set(e.Form,"hotfix",t)},expression:"Form.hotfix"}})],1):e._e(),a("el-form-item",{attrs:{label:"更新说明",prop:"content"}},[a("el-input",{attrs:{type:"textarea",rows:"3",placeholder:"输入更新内容"},model:{value:e.Form.content,callback:function(t){e.$set(e.Form,"content",t)},expression:"Form.content"}})],1)],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{nativeOn:{click:function(t){e.FormVisible=!1}}},[e._v("取消")]),a("el-button",{attrs:{type:"primary",loading:e.addLoading},nativeOn:{click:function(t){return e.submitFn(t)}}},[e._v(e._s(e.btnTip))])],1)],1)],1)},s=[],l=a("5530"),c=(a("99af"),a("498a"),a("d81d"),a("b64b"),a("e9c4"),a("4053")),u=a("04a2"),d=a("829b"),m=a("8daa"),p=a("2708"),h=a("c1df"),f=a.n(h),b={mixins:[p["a"]],data:function(){return{persent:0,title:"新增",btnTip:"提交",page:{current:1,size:10},isAdd:!0,FormVisible:!1,addLoading:!1,platform:"2",is_mandatory:10,packet_type:1,Form:{id:"",title:"",version:"",content:"",download_url:"",package_name:"",version_code:"",hotfix:""},FormRules:{version:[{required:!0,message:"请输入版本号",trigger:"blur"}],version_code:[{required:1!==this.platform,message:"请输入Code",trigger:"blur"}],hotfix:[{required:!0,message:"请输入热更新Code",trigger:"blur"}],content:[{required:!0,message:"请输入更新内容",trigger:"blur"}],download_url:[{required:30!==this.is_mandatory,message:"请输入文件下载链接",trigger:"blur"}]},platformArr:[{label:"苹果",key:"1"},{label:"安卓",key:"2"},{label:"模拟器",key:"3"}],searchParams:{title:"",package_name:""},fileUrl:"",progress:0,navList:[{key:"net.huidapay.live",isActive:!0,label:"喵喵星球",value:"net.huidapay.live"},{key:"com.yhjc.oxygen",isActive:!1,label:"声撩语音",value:"com.yhjc.oxygen"},{key:"com.jlsd.duoduo",isActive:!1,label:"多多cp",value:"com.jlsd.duoduo"},{key:"com.hdb.kaihei",isActive:!1,label:"开黑语音",value:"com.hdb.kaihei"},{key:"com.aiyi.lemon",isActive:!1,label:"柠檬语音",value:"com.aiyi.lemon"}],packageName:[{key:"",label:"全部",value:""},{key:"net.huidapay.live",label:"喵喵星球",value:"net.huidapay.live"},{key:"com.yhjc.oxygen",label:"声撩语音",value:"com.yhjc.oxygen"},{key:"com.jlsd.duoduo",label:"多多cp",value:"com.jlsd.duoduo"},{key:"com.hdb.kaihei",label:"开黑语音",value:"com.hdb.kaihei"},{key:"com.aiyi.lemon",label:"柠檬语音",value:"com.aiyi.lemon"}],dateTimeParams:{start_time:null,end_time:null},packageName_aidoo:[{key:"com.party.aidoo",label:"Aidoo",value:"com.party.aidoo"}],navList_aidoo:[{key:"com.party.aidoo",isActive:!0,label:"Aidoo",value:"com.party.aidoo"}],navSourceList:[],packageSourceList:[],node_env:""}},components:{tableList:c["a"],SearchPanel:u["a"]},computed:{forms:function(){var e=this;return[{name:"package_name",type:"select",options:this.packageSourceList,label:"应用类型",placeholder:"",handler:{enter:function(t){e.searchParams.package_name=t.value,e.$refs.tableList.getData()}}},{name:"title",type:"input",value:"",label:"任务名称",placeholder:"",handler:{enter:function(t){e.searchParams.title=t.title,e.$refs.tableList.getData()}}},{name:"dateTimeParams",type:"datePicker",dateType:"datetimerange",format:"yyyy-MM-dd HH:mm:ss",clearable:!0,class:"message-history-dateTimeParams",label:"时间选择",value:"",handler:{change:function(t){e.emptyDateTime(),e.setDateTime(t)},selectChange:function(t,a){e.emptyDateTime()}}}]},cfgs:function(){var e=this,t=[],a=[{label:"创建时间",prop:"start_time",width:"180px",render:function(e,t){return e("span",t.row.start_time>0?f()(1e3*t.row.start_time).format("YYYY-MM-DD HH:mm:ss"):"")}},{label:"任务名",prop:"title",width:"120px",render:function(e,t){return e("span",t.row.title||"无")}}],n=[{label:"渠道",prop:"packet_type",width:"180px",render:function(e,t){var a="";switch(t.row.packet_type){case 1:a="主包";break;case 2:a="谷歌";break}return e("span",a)}}],r=[{label:"设备类型",prop:"platform",width:"120px",render:function(e,t){var a="";switch(t.row.platform){case 1:a="iOS";break;case 2:a="Android";break;case 3:a="模拟器";break;case 4:a="PC";break;default:a="其他";break}return e("span",a)}},{label:"版本号",prop:"version",width:"120px",render:function(e,t){return e("span",t.row.version)}},{label:"热更新code",prop:"hotfix",width:"120px",render:function(e,t){return e("span",30==t.row.is_mandatory?t.row.hotfix:"--")}},{label:"升级类型",prop:"download_url",width:"120px",render:function(e,t){var a="";switch(t.row.is_mandatory){case 10:a="建议升级";break;case 20:a="强制升级";break;case 30:a="热更新";break}return e("span",a)}},{label:"文件下载链接",prop:"download_url",render:function(e,t){return e("span",t.row.download_url)}},{label:"操作",width:"260",render:function(t,a){return t("div",[t("el-button",{props:{type:"primary"},on:{click:function(){e.handleEdit(a.row)}}},"修改"),t("el-button",{props:{type:"success"},style:{display:0===a.row.status?"unset":"none"},on:{click:function(){e.handleOPenOrClose(a.row)}}},"启动"),t("el-button",{props:{type:"danger"},style:{display:1===a.row.status?"unset":"none"},on:{click:function(){e.handleOPenOrClose(a.row)}}},"停止")])}}];return t=this.node_env.indexOf("aidoo")>-1?a.concat(n).concat(r):a.concat(r),{vm:this,url:m["a"].system.Appversion,method:"post",columns:t}}},watch:{"Form.download_url":{handler:function(e){this.$set(this.Form,"download_url",e.trim())},deep:!0}},mounted:function(){this.node_env="test",this.node_env.indexOf("aidoo")>-1?(this.navSourceList=this.navList_aidoo,this.packageSourceList=this.packageName_aidoo):(this.navSourceList=this.navList,this.packageSourceList=this.packageName)},methods:{handlerNav:function(e){0!=this.isAdd&&this.navSourceList.map((function(t){t.isActive=!1,t.key==e.key&&(t.isActive=!0)}))},handleOPenOrClose:function(e){var t=this,a=0==e.status?"启动":"停止",n={id:e.id,status:0==e.status?1:0};this.$confirm("确认"+a+"吗？","提示").then((function(){Object(d["a"])({url:m["a"].system.changeStatus,method:"post",data:n}).then((function(e){t.$message.success(a+"成功"),t.$refs.tableList.getData(),t.FormVisible=!1})).catch((function(e){t.$message.error(e)}))}))},handleDelete:function(e){var t=this;this.$confirm("确认删除吗？","提示").then((function(){Object(d["a"])({url:m["a"].system.AppversionDel,method:"post",data:{id:e}}).then((function(e){t.$message.success("删除成功"),t.$refs.tableList.getData(),t.FormVisible=!1})).catch((function(e){t.$message.error(e)}))}))},handleEdit:function(e){this.Form=JSON.parse(JSON.stringify(e)),this.isAdd=!1,this.title="修改",this.btnTip="修改",this.Form.id=e.id,this.is_mandatory=e.is_mandatory,this.packet_type=e.packet_type,this.fileUrl=e.download_url,this.progress=100,this.platform=JSON.stringify(e.platform),this.addLoading=!1,this.navSourceList.map((function(t){t.isActive=!1,t.key==e.package_name&&(t.isActive=!0)})),this.FormVisible=!0},handleSizeChange:function(e){this.page.size=e,this.getList()},handleCurrentChange:function(e){this.page.current=e,this.getList()},handleAdd:function(){this.title="新增",this.btnTip="提交",this.Form={version:"",content:"",download_url:""},this.platform="2",this.navSourceList.map((function(e,t){e.isActive=!1,0==t&&(e.isActive=!0)})),this.FormVisible=!0,this.isAdd=!0},submitFn:function(){var e=this;this.$refs.Form.validate((function(t){t&&e.$confirm("确认提交吗？","提示",{}).then((function(){e.addLoading=!0,e.Form.platform=e.platform,e.Form.is_mandatory=e.is_mandatory,e.Form.download_url=e.Form.download_url.trim(),e.navSourceList.map((function(t){1==t.isActive&&(e.Form.package_name=t.value)})),e.node_env.indexOf("aidoo")>-1&&(e.Form.packet_type=e.packet_type),Object(d["a"])({url:m["a"].system.AppversionAChange,method:"post",data:e.Form}).then((function(t){e.$message.success(e.title+"成功"),e.addLoading=!1,e.$refs.tableList.getData(),e.FormVisible=!1})).catch((function(t){e.addLoading=!1,e.$message.error(t)}))}))}))},beforeSearch:function(e){var t=Object(l["a"])(Object(l["a"])({},this.searchParams),this.dateTimeParams);return{size:e.size,page:e.page,title:t.title,package_name:t.package_name,start_time:t.start_time?Math.floor(t.start_time/1e3):"",end_time:t.end_time?Math.floor(t.end_time/1e3):""}},onSearch:function(e){this.searchParams.title=e.title,this.searchParams.package_name=e.package_name,this.$refs.tableList.getData()},getUpLoadFile:function(e){this.Form.version=e.fileName,this.Form.download_url=e.url},setDateTime:function(e){var t=e?{start_time:e[0],end_time:e[1]}:{};this.$set(this,"dateTimeParams",t)},emptyDateTime:function(){this.dateTimeParams={}},getPackageName:function(e){this.navSourceList.map((function(t){if(e==t.id)return t.value}))}}},v=b,g=(a("022c"),a("2877")),k=Object(g["a"])(v,o,s,!1,null,"03270c44",null),y=k.exports,_=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"check-switch-config"},[a("div",{staticClass:"searchParams"},[a("SearchPanel",{attrs:{forms:e.forms,"show-search-btn":!0,"show-add":!0},on:{add:e.handleAdd,onSearch:e.onSearch},model:{value:e.searchParams,callback:function(t){e.searchParams=t},expression:"searchParams"}})],1),a("div",{staticClass:"tableList"},[a("tableList",{ref:"tableList",attrs:{cfgs:e.cfgs}})],1),a("appComp",{ref:"appComp",on:{getList:e.getList}})],1)},x=[],w=(a("7db0"),a("d3b7"),function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"checkConfig--box"},[a("el-dialog",{attrs:{title:e.title,visible:e.dialogVisible,width:"730px","before-close":e.handleClose,"close-on-click-modal":!1},on:{"update:visible":function(t){e.dialogVisible=t},closed:e.closed}},[a("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"100px","label-suffix":":","hide-required-asterisk":"see"===e.status}},[a("div",{staticClass:"inputBox"},[a("el-form-item",{attrs:{label:"应用类型",prop:"package_name"}},[a("el-select",{attrs:{placeholder:"请选择",disabled:"add"!==e.status},model:{value:e.ruleForm.package_name,callback:function(t){e.$set(e.ruleForm,"package_name",t)},expression:"ruleForm.package_name"}},e._l(e.packageSourceList,(function(e){return a("el-option",{key:e.value,attrs:{label:e.name,value:e.value}})})),1)],1),a("el-form-item",{attrs:{label:"系统平台",prop:"platform"}},[a("el-select",{attrs:{placeholder:"请选择",disabled:"add"!==e.status},model:{value:e.ruleForm.platform,callback:function(t){e.$set(e.ruleForm,"platform",t)},expression:"ruleForm.platform"}},e._l(e.platformList,(function(e){return a("el-option",{key:e.value,attrs:{label:e.name,value:e.value}})})),1)],1),a("el-form-item",{attrs:{label:"版本号",prop:"version"}},[a("el-input",{staticStyle:{width:"305px"},attrs:{placeholder:"如: 1.0.1"},model:{value:e.ruleForm.version,callback:function(t){e.$set(e.ruleForm,"version",t)},expression:"ruleForm.version"}})],1),1!==e.ruleForm.platform?a("el-form-item",{attrs:{label:"4"==e.ruleForm.platform?"PC Code":"安卓Code",prop:"version_code"}},[a("el-input",{model:{value:e.ruleForm.version_code,callback:function(t){e.$set(e.ruleForm,"version_code",t)},expression:"ruleForm.version_code"}})],1):e._e(),a("el-form-item",{attrs:{label:"开关状态",prop:"value"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.ruleForm.value,callback:function(t){e.$set(e.ruleForm,"value",t)},expression:"ruleForm.value"}},e._l(e.statusList,(function(e,t){return a("el-option",{key:t,attrs:{label:e.name,value:e.value}})})),1)],1),a("el-form-item",{attrs:{label:"app渠道",prop:"channels"}},["1"==e.ruleForm.platform?a("el-checkbox-group",{model:{value:e.channels,callback:function(t){e.channels=t},expression:"channels"}},e._l(e.channelsList,(function(t,n){return t.channel.indexOf("iOS")>-1?a("el-checkbox",{key:n,attrs:{label:t.channel}}):e._e()})),1):a("el-checkbox-group",{model:{value:e.channels,callback:function(t){e.channels=t},expression:"channels"}},e._l(e.channelsList,(function(t,n){return-1==t.channel.indexOf("iOS")?a("el-checkbox",{key:n,attrs:{label:t.channel}}):e._e()})),1)],1),a("el-form-item",{attrs:{label:"模块开关",prop:"function_switch"}},[a("el-checkbox-group",{model:{value:e.audits,callback:function(t){e.audits=t},expression:"audits"}},e._l(e.auditList,(function(e,t){return a("el-checkbox",{key:t,attrs:{label:e.value,value:e.key}})})),1)],1)],1)]),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){return e.cancel()}}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm")}}},[e._v("确 定")])],1)],1)],1)}),F=[],L=a("c7eb"),O=a("1da1"),j=a("ade3"),S=(a("d9e2"),a("ac1f"),a("00b4"),a("14d9"),a("8593")),$={data:function(){var e;return{dialogVisible:!1,platformList:[{key:1,name:"IOS",value:1},{key:2,name:"Android",value:2}],statusList:[{value:0,name:"关闭"},{value:1,name:"开启"}],packageName:[{key:"net.huidapay.live",name:"喵喵星球",value:"net.huidapay.live"},{key:"com.yhjc.oxygen",name:"声撩语音",value:"com.yhjc.oxygen"},{key:"com.jlsd.duoduo",name:"多多cp",value:"com.jlsd.duoduo"},{key:"com.hdb.kaihei",name:"开黑语音",value:"com.hdb.kaihei"},{key:"com.aiyi.lemon",name:"柠檬语音",value:"com.aiyi.lemon"}],channelsList:[],channels:[],audits:[],auditList:[],status:"add",oldParams:{},ruleForm:{package_name:"",version:"",version_code:"",channels:"",platform:"",key:"show_check",value:"",function_switch:""},rules:(e={version:[{required:!0,trigger:"blur",validator:function(e,t,a){if(!t)return a(new Error("请输入版本号!"));var n=/^[1-9]\d?(\.(0|[1-9]\d?)){2}$/;return n.test(t)?(a(),a()):a(new Error("请输入正确的版本号，示例：x.y.z （数字：x为1-99，y和z为0-99）"))}}],platform:[{required:!0,message:"请选择系统平台",trigger:"change"}],value:[{required:!1,message:"请选择开关状态",trigger:"change"}],package_name:[{required:!0,message:"请选择应用类型",trigger:"change"}]},Object(j["a"])(e,"value",[{required:!0,message:"请选择开关状态",trigger:"change"}]),Object(j["a"])(e,"version_code",[{required:!0,message:"请输入安卓Code",trigger:"blur"}]),e),packageName_aidoo:[{key:"com.party.aidoo",name:"Aidoo",value:"com.party.aidoo"}],packageSourceList:[]}},computed:{title:function(){return"add"===this.status?"新增":"编辑"}},mounted:function(){var e="test";e.indexOf("aidoo")>-1?this.packageSourceList=this.packageName_aidoo:this.packageSourceList=this.packageName},methods:{loadParams:function(e,t){if(this.status=e,"add"!==this.status){var a=JSON.parse(JSON.stringify(t));a.channels=a.channels,this.channels=a.channels,this.audits=a.function_switch,this.$set(this.$data,"ruleForm",a)}else{var n={key:"show_check"};this.$set(this.$data,"ruleForm",n),this.resetForm("ruleForm")}this.dialogVisible=!0,this.oldParams=JSON.parse(JSON.stringify(this.ruleForm)),this.getChannelsList(),this.getSwitchValueList()},getChannelsList:function(){var e=this;return Object(O["a"])(Object(L["a"])().mark((function t(){var a;return Object(L["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(S["l"])();case 2:a=t.sent,2e3==a.code&&(e.channelsList=a.data.list);case 4:case"end":return t.stop()}}),t)})))()},getSwitchValueList:function(){var e=this;return Object(O["a"])(Object(L["a"])().mark((function t(){var a,n;return Object(L["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(S["m"])();case 2:a=t.sent,2e3==a.code&&(e.auditList=a.data.list,"add"!==e.status&&(n=[],e.audits.map((function(t,a){var r=e.auditList.find((function(e){return t===e.key}));r&&n.push(r.value)})),e.audits=n));case 4:case"end":return t.stop()}}),t)})))()},handleClose:function(){this.dialogVisible=!1},submitForm:function(e){var t=this;return Object(O["a"])(Object(L["a"])().mark((function a(){return Object(L["a"])().wrap((function(a){while(1)switch(a.prev=a.next){case 0:t.$refs[e].validate(function(){var e=Object(O["a"])(Object(L["a"])().mark((function e(a){var n,r,i,o;return Object(L["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!a){e.next=33;break}if("add"===t.status){e.next=19;break}if(0!=t.channels.length){e.next=7;break}return t.$message.error("请先选择app渠道"),e.abrupt("return");case 7:t.changeString(t.channels,"channels"),t.changeString(t.audits,"function_switch");case 9:return delete t.ruleForm.create_time,delete t.ruleForm.update_time,delete t.ruleForm.is_delete,n=Object(l["a"])({},t.ruleForm),e.next=15,Object(S["b"])(n);case 15:r=e.sent,2e3===r.code&&(t.$message.success("编辑成功"),t.dialogVisible=!1,t.$nextTick((function(){t.$refs["ruleForm"].resetFields()})),t.channels=[],t.audits=[],t.$emit("getList")),e.next=31;break;case 19:if(0!=t.channels.length){e.next=24;break}return t.$message.error("请先选择app渠道"),e.abrupt("return");case 24:t.changeString(t.channels,"channels"),t.changeString(t.audits,"function_switch");case 26:return i=Object(l["a"])({},t.ruleForm),e.next=29,Object(S["a"])(i);case 29:o=e.sent,2e3===o.code&&(t.$success("添加成功"),t.dialogVisible=!1,t.$nextTick((function(){t.$refs["ruleForm"].resetFields()})),t.channels=[],t.audits=[],t.$emit("getList"));case 31:e.next=34;break;case 33:return e.abrupt("return",!1);case 34:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 1:case"end":return a.stop()}}),a)})))()},resetForm:function(e){this.$refs[e]&&this.$refs[e].resetFields()},closed:function(){this.$emit("destoryComp")},cancel:function(){var e=this;JSON.stringify(this.oldParams)!==JSON.stringify(this.ruleForm)?this.$confirm("关闭弹窗将不会保留您的更改, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){e.dialogVisible=!1})).catch((function(){})):this.dialogVisible=!1,this.$nextTick((function(){e.$refs["ruleForm"].resetFields()})),this.channels=[],this.audits=[]},update:function(){this.status="update"},changeString:function(e,t){var a=this,n="";"channels"==t?e.map((function(e,t){n+=e+","})):"function_switch"==t&&e.map((function(e,t){var r=a.auditList.find((function(t){return e===t.value}));r&&(n+=r.key+",")})),this.ruleForm[t]=n.substr(0,n.length-1)}}},C=$,P=(a("3fb1"),Object(g["a"])(C,w,F,!1,null,null,null)),A=P.exports,N={data:function(){return{page:{current:1,size:10},searchParams:{version:"",package_name:""},navList:[{key:"net.huidapay.live",isActive:!0,label:"喵喵星球",value:"net.huidapay.live"},{key:"com.yhjc.oxygen",isActive:!1,label:"声撩语音",value:"com.yhjc.oxygen"},{key:"com.jlsd.duoduo",isActive:!1,label:"多多cp",value:"com.jlsd.duoduo"},{key:"com.hdb.kaihei",isActive:!1,label:"开黑语音",value:"com.hdb.kaihei"},{key:"com.aiyi.lemon",isActive:!1,label:"柠檬语音",value:"com.aiyi.lemon"}],navList_aidoo:[{key:"com.party.aidoo",isActive:!0,label:"Aidoo",value:"com.party.aidoo"}],packageName:[{key:"",label:"全部",value:""},{key:"net.huidapay.live",label:"喵喵星球",value:"net.huidapay.live"},{key:"com.yhjc.oxygen",label:"声撩语音",value:"com.yhjc.oxygen"},{key:"com.jlsd.duoduo",label:"多多cp",value:"com.jlsd.duoduo"},{key:"com.hdb.kaihei",label:"开黑语音",value:"com.hdb.kaihei"},{key:"com.aiyi.lemon",label:"柠檬语音",value:"com.aiyi.lemon"}],packageName_aidoo:[{key:"com.party.aidoo",label:"Aidoo",value:"com.party.aidoo"}],navSourceList:[],packageSourceList:[]}},components:{tableList:c["a"],SearchPanel:u["a"],appComp:A},computed:{forms:function(){var e=this;return[{name:"package_name",type:"select",options:this.packageSourceList,label:"应用类型",placeholder:"",handler:{enter:function(t){console.log("🚀 ~ file: checkSwitchConfig.vue:83 ~ forms ~ v",t),e.searchParams.package_name=t.value,e.$refs.tableList.getData()}}},{name:"version",type:"input",value:"",label:"版本号",placeholder:"",handler:{enter:function(t){e.searchParams.version=t.version,e.$refs.tableList.getData()}}}]},cfgs:function(){var e=this;return{vm:this,url:m["a"].system.Apprule,method:"post",columns:[{label:"id",prop:"id",render:function(e,t){return e("span",t.row.id||"无")}},{label:"应用类型",render:function(t,a){var n=e.packageSourceList.find((function(e){return e.value===a.row.package_name}));return t("span",n?n.label:"无")}},{label:"版本号",prop:"version",render:function(e,t){return e("span",t.row.version)}},{label:"功能",prop:"key",render:function(e,t){return e("span","show_check"==t.row.key?"审核开关":"无")}},{label:"状态",prop:"value",render:function(e,t){return e("span",0==t.row.value?"关闭":"开启")}},{label:"操作平台",prop:"version",render:function(e,t){var a="";switch(t.row.platform){case 1:a="iOS";break;case 2:a="安卓";break;case 3:a="模拟器";break;case 4:a="PC";break;default:a="其他";break}return e("span",a)}},{label:"操作",render:function(t,a){return t("div",[t("el-button",{props:{type:"primary"},on:{click:function(){e.handleEdit(a.row)}}},"编辑"),t("el-button",{props:{type:"danger"},on:{click:function(){e.handleDelete(a.row.id)}}},"删除")])}}]}}},mounted:function(){var e="test";e.indexOf("aidoo")>-1?(this.navSourceList=this.navList_aidoo,this.packageSourceList=this.packageName_aidoo):(this.navSourceList=this.navList,this.packageSourceList=this.packageName)},methods:{beforeSearch:function(e){var t=Object(l["a"])({},this.searchParams);return{size:e.size,page:e.page,version:t.version,package_name:t.package_name}},onSearch:function(e){this.searchParams.version=e.version,this.searchParams.package_name=e.package_name,this.$refs.tableList.getData()},handleAdd:function(){this.$refs.appComp.loadParams("add")},handleEdit:function(e){this.$refs.appComp.loadParams("edit",e)},handleDelete:function(e){var t=this;this.$confirm("确认删除吗？","提示").then((function(){Object(d["a"])({url:m["a"].system.AppruleDel,method:"post",data:{id:e}}).then((function(e){t.$message.success("删除成功"),t.$refs.tableList.getData()})).catch((function(e){t.$message.error(e)}))}))},getList:function(){this.$refs.tableList.getData()}}},D=N,V=(a("3ed7"),Object(g["a"])(D,_,x,!1,null,null,null)),T=V.exports,q={components:{menuComp:i["a"],versionConfig:y,checkSwitchConfig:T},data:function(){return{tabIndex:0,menuList:[{name:"版本升级"},{name:"审核开关"}]}},computed:{},methods:{tabChange:function(){}},created:function(){},destroyed:function(){}},z=q,J=(a("4cab"),Object(g["a"])(z,n,r,!1,null,null,null));t["default"]=J.exports},c55f:function(e,t,a){},f093:function(e,t,a){}}]);