(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-658e6b0c"],{"006a":function(e,t,r){},"1fe8":function(e,t,r){e.exports=r.p+"static/img/error.e53687be.png"},2708:function(e,t,r){"use strict";var a=r("5530"),n=r("2f62"),s={data:function(){return{tabIndex:"0",page:1,size:10,limit:10,searchParams:{},dataParams:{}}},computed:Object(a["a"])({},Object(n["c"])({permissionArr:function(e){return e.permission.permissionArr}})),mounted:function(){console.log(this.permissionArr,"permissionArr")}};t["a"]=s},"3a0e":function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"app-container systemConfig-guild-class-box"},[r("menuComp",{ref:"menuComp",attrs:{menuList:e.menuList},model:{value:e.tabIndex,callback:function(t){e.tabIndex=t},expression:"tabIndex"}}),r(e.comp,{ref:e.comp,tag:"component"})],1)},n=[],s=r("3923"),o=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"systemConfig-guild-class-box"},[r("div",{staticClass:"searchParams"},[r("SearchPanel",{attrs:{forms:e.forms,"show-reset":!0,"show-search-btn":!0,"show-add":!0},on:{onReset:e.reset,onSearch:e.onSearch,add:e.add},model:{value:e.searchParams,callback:function(t){e.searchParams=t},expression:"searchParams"}})],1),r("tableList",{ref:"tableList",attrs:{cfgs:e.cfgs,isHidePage:!0}}),e.isDestoryComp?r("classComp",{ref:"classComp",on:{destoryComp:e.destoryComp,getList:e.getList}}):e._e()],1)},i=[],u=r("c7eb"),l=r("1da1"),c=r("5530"),d=(r("7db0"),r("d3b7"),r("b0c0"),r("8593")),m=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"systemConfig-guild-class-classComp-box"},[r("el-dialog",{attrs:{title:e.title,visible:e.dialogVisible,width:"610px","before-close":e.handleClose},on:{"update:visible":function(t){e.dialogVisible=t},closed:e.closed}},[r("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"110px"}},[r("div",{staticClass:"formBox"},[r("el-form-item",{attrs:{label:"公会等级",prop:"code"}},[r("el-select",{attrs:{placeholder:"请选择"},model:{value:e.ruleForm.code,callback:function(t){e.$set(e.ruleForm,"code",t)},expression:"ruleForm.code"}},e._l(e.codeList,(function(e){return r("el-option",{key:e.value,attrs:{label:e.name,value:e.value}})})),1)],1),r("el-form-item",{attrs:{label:"周返点比例",prop:"week_rebate",rules:e.rebateRules}},[r("el-input",{attrs:{onkeydown:"this.value=this.value.replace(/^0+/,'');",oninput:"this.value=this.value.replace(/[^\\d]/g,'');"},model:{value:e.ruleForm.week_rebate,callback:function(t){e.$set(e.ruleForm,"week_rebate",t)},expression:"ruleForm.week_rebate"}})],1)],1),r("div",{staticClass:"formBox"},[r("el-form-item",{attrs:{label:"起始流水",prop:"start",rules:e.startRules}},[r("el-input",{attrs:{onkeydown:"this.value=this.value.replace(/^0+/,'');",oninput:"this.value=this.value.replace(/[^\\d]/g,'');",maxlength:"10",placeholder:"起始流水"},model:{value:e.ruleForm.start,callback:function(t){e.$set(e.ruleForm,"start",t)},expression:"ruleForm.start"}})],1),r("el-form-item",{attrs:{label:"结束流水",prop:"end",rules:e.endRules}},[r("el-input",{attrs:{onkeydown:"this.value=this.value.replace(/^0+/,'');",oninput:"this.value=this.value.replace(/[^\\d]/g,'');",maxlength:"10",placeholder:"结束流水"},model:{value:e.ruleForm.end,callback:function(t){e.$set(e.ruleForm,"end",t)},expression:"ruleForm.end"}})],1)],1),r("div",{staticClass:"formBox"},[r("el-form-item",{attrs:{label:"评级奖励类型",prop:"rewards_type"}},[r("el-select",{attrs:{placeholder:"请选择"},model:{value:e.ruleForm.rewards_type,callback:function(t){e.$set(e.ruleForm,"rewards_type",t)},expression:"ruleForm.rewards_type"}},e._l(e.rewards_typeList,(function(e){return r("el-option",{key:e.value,attrs:{label:e.name,value:e.value}})})),1)],1),r("el-form-item",{attrs:{label:"评级奖励",prop:"rewards"}},[r("el-input",{attrs:{onkeydown:"this.value=this.value.replace(/^0+/,'');",oninput:"this.value=this.value.replace(/[^\\d]/g,'');"},model:{value:e.ruleForm.rewards,callback:function(t){e.$set(e.ruleForm,"rewards",t)},expression:"ruleForm.rewards"}})],1)],1)]),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")]),r("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm")}}},[e._v("确 定")])],1)],1)],1)},f=[],p=(r("d9e2"),r("a9e3"),r("b64b"),r("e9c4"),r("279a")),b={computed:{title:function(){return"add"===this.status?"新增公会等级配置":"update"===this.status?"修改公会等级配置":void 0},startRules:function(){var e=this,t={};return t={required:!0,validator:function(t,r,a){e.ruleForm.start?e.ruleForm.end&&Number(e.ruleForm.start)>=Number(e.ruleForm.end)?a(new Error("起始流水不可大于等于结束流水")):a():a(new Error("请输入起始流水"))}},t},endRules:function(){var e=this,t={};return t={required:!0,validator:function(t,r,a){e.ruleForm.end?e.ruleForm.start&&Number(e.ruleForm.end)<=Number(e.ruleForm.start)?a(new Error("结束流水不可小于等于起始流水")):a():a(new Error("请输入结束流水"))}},t},rebateRules:function(){var e=this,t={};return t={required:!0,validator:function(t,r,a){e.ruleForm.week_rebate?Number(e.ruleForm.week_rebate)>15?a(new Error("周返点比例最大为15")):a():a(new Error("请输入周返点比例"))}},t}},data:function(){return{status:"add",dialogVisible:!1,codeList:p["a"].CLASSLIST,rewards_typeList:p["a"].GUILDCONFIGURATIONRATETYPELIST,ruleForm:{id:null,code:null,start:"",end:"",week_rebate:"",rewards:"",rewards_type:null},rules:{code:[{required:!0,message:"请选择公会等级",trigger:"change"}],week_rebate:[{required:!0,message:"请输入周返点比例",trigger:"blur"}],start:[{required:!0,message:"请输入起始流水",trigger:"blur"}],end:[{required:!0,message:"请输入结束流水",trigger:"blur"}],rewards_type:[{required:!0,message:"请选择评级奖励类型",trigger:"change"}],rewards:[{required:!0,message:"请输入评级奖励",trigger:"blur"}]}}},methods:{handleClose:function(){this.dialogVisible=!1},loadParams:function(e,t){if(this.status=e,this.dialogVisible=!0,"add"!==e){var r=JSON.parse(JSON.stringify(t));this.$set(this.$data,"ruleForm",r)}},submitForm:function(e){var t=this;return Object(l["a"])(Object(u["a"])().mark((function r(){return Object(u["a"])().wrap((function(r){while(1)switch(r.prev=r.next){case 0:t.$refs[e].validate(function(){var e=Object(l["a"])(Object(u["a"])().mark((function e(r){var a,n;return Object(u["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!r){e.next=8;break}return a=Object(c["a"])({},t.ruleForm),e.next=4,Object(d["g"])(a);case 4:n=e.sent,2e3===n.code&&("add"===t.status?t.$success("新增成功"):t.$success("修改成功"),t.dialogVisible=!1,t.$emit("getList")),e.next=10;break;case 8:return console.log("error submit!!"),e.abrupt("return",!1);case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 1:case"end":return r.stop()}}),r)})))()},resetForm:function(e){this.$refs[e].resetFields()},closed:function(){this.$emit("destoryComp")}}},h=b,g=(r("485b"),r("2877")),v=Object(g["a"])(h,m,f,!1,null,null,null),w=v.exports,y=r("04a2"),_=r("4053"),k=r("8daa"),C=r("2708"),x=r("cf45"),O={mixins:[C["a"]],components:{SearchPanel:y["a"],tableList:_["a"],classComp:w},computed:{forms:function(){return[{name:"code",type:"select",value:null,keyName:"value",optionLabel:"name",label:"公会等级",placeholder:"请选择",options:p["a"].CLASSLIST}]},cfgs:function(){var e=this;return{vm:this,url:k["a"].system.guild.rebateConfig,columns:[{label:"公会评级",render:function(e,t){var r=p["a"].CLASSLIST.find((function(e){return e.value===t.row.code}));return e("span",r?r.name:"无")}},{label:"流水范围",render:function(e,t){return e("span",Object(x["f"])(t.row.start)+"~"+Object(x["f"])(t.row.end))}},{label:"周返点比例",prop:"week_rebate"},{label:"评级奖励类型",prop:"rebate",render:function(e,t){var r=p["a"].GUILDCONFIGURATIONRATETYPELIST.find((function(e){return e.value===t.row.rewards_type}));return e("span",r?r.name:"无")}},{label:"评级奖励",prop:"rewards"},{label:"操作",minWidth:"120px",fixed:"right",render:function(t,r){return t("div",[t("el-button",{props:{type:"primary"},on:{click:function(){e.update(r.row)}}},"修改"),t("el-button",{props:{type:"danger"},on:{click:function(){e.deleteParams(r.row.id,1)}}},"删除")])}}]}}},data:function(){return{isDestoryComp:!1}},methods:{beforeSearch:function(e){var t=Object(c["a"])({},this.searchParams);return{page:e.page,pagesize:e.size,code:t.code}},getList:function(){this.$refs.tableList.getData()},reset:function(){this.searchParams={},this.getList()},onSearch:function(){this.getList()},add:function(){this.load("add")},update:function(e){this.load("update",e)},load:function(e,t){var r=this;this.isDestoryComp=!0,setTimeout((function(){r.$refs.classComp.loadParams(e,t)}),50)},destoryComp:function(){this.isDestoryComp=!1},deleteParams:function(e){var t=this;return Object(l["a"])(Object(u["a"])().mark((function r(){return Object(u["a"])().wrap((function(r){while(1)switch(r.prev=r.next){case 0:t.$confirm("确认删除当前公会等级配置吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(l["a"])(Object(u["a"])().mark((function r(){var a;return Object(u["a"])().wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,Object(d["h"])({id:e});case 2:a=r.sent,2e3===a.code&&(t.$success("删除成功"),t.getList());case 4:case"end":return r.stop()}}),r)})))).catch((function(){}));case 1:case"end":return r.stop()}}),r)})))()}}},F=O,j=(r("f048"),Object(g["a"])(F,o,i,!1,null,null,null)),L=j.exports,S=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"systemConfig-guild-class-duration-box"},[r("el-card",[r("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[r("div",{staticClass:"fl",staticStyle:{height:"36px","line-height":"36px"}},[r("span",[e._v("时长奖励配置")])])]),e._l(e.configList,(function(t){return r("div",{staticClass:"configItem"},[r("div",{staticClass:"configLable fl"},[e._v(e._s(t.remark))]),r("div",{staticClass:"configSouce fl"},[r("el-input",{directives:[{name:"input-limit",rawName:"v-input-limit",value:0,expression:"0"}],attrs:{placeholder:"请输入返点比例"},model:{value:t.value,callback:function(r){e.$set(t,"value",r)},expression:"item.value"}},["guild_week_online_reward_online"===t.key?r("template",{slot:"append"},[e._v("小时")]):e._e(),"guild_week_online_reward_flow"===t.key?r("template",{slot:"append"},[e._v("钻石")]):e._e(),"guild_week_online_reward_reward"===t.key?r("template",{slot:"append"},[e._v("喵粮")]):e._e()],2)],1),r("div",{staticClass:"configSave fl"},[r("el-button",{attrs:{type:"primary"},on:{click:function(r){return e.handleConfigSave(t)}}},[e._v("保 存")])],1)])}))],2)],1)},$=[],P=(r("159b"),r("14d9"),r("1a72")),I={name:"platform-rebate",data:function(){return{loading:!1,formLabelWidth:"120px",configList:[]}},created:function(){},mounted:function(){this.getSyetermConfigSource()},methods:{getSyetermConfigSource:function(){var e=this;this.loading=!0,Object(P["hb"])().then((function(t){var r=[],a=["guild_week_online_reward_online","guild_week_online_reward_flow","guild_week_online_reward_reward"];t.data.config&&t.data.config.length>0&&t.data.config.forEach((function(e){a.forEach((function(t){e.key===t&&r.push(e)}))})),e.configList=r,e.loading=!1})).catch((function(t){e.$message.error(t),e.loading=!1}))},handleConfigSave:function(e){var t=this;if(e.value){var r={key:e.key,value:e.value};Object(P["ib"])(r).then((function(r){t.$message.success(e.remark+" 修改成功"),t.getSyetermConfigSource()})).catch((function(e){t.$message.error(e)}))}else this.$warning("请输入"+e.remark)}}},E=I,N=(r("f687"),Object(g["a"])(E,S,$,!1,null,"686d5213",null)),A=N.exports,R={components:{classComp:L,durationComp:A,menuComp:s["a"]},data:function(){return{menuList:[{name:"公会等级配置管理"}],tabIndex:"0"}},computed:{comp:function(){return"0"===this.tabIndex?"classComp":"durationComp"}},methods:{}},T=R,V=(r("56a7"),Object(g["a"])(T,a,n,!1,null,null,null));t["default"]=V.exports},"485b":function(e,t,r){"use strict";r("d919")},"56a7":function(e,t,r){"use strict";r("bedc")},8593:function(e,t,r){"use strict";r.d(t,"j",(function(){return o})),r.d(t,"f",(function(){return i})),r.d(t,"d",(function(){return u})),r.d(t,"i",(function(){return l})),r.d(t,"k",(function(){return c})),r.d(t,"g",(function(){return d})),r.d(t,"h",(function(){return m})),r.d(t,"e",(function(){return f})),r.d(t,"c",(function(){return p})),r.d(t,"a",(function(){return b})),r.d(t,"b",(function(){return h})),r.d(t,"l",(function(){return g})),r.d(t,"m",(function(){return v}));var a=r("829b"),n=r("299b"),s=r("8daa");function o(e){return Object(a["a"])({url:s["a"].system.dummy.deleteVirtualPhone,method:"post",data:e})}function i(e){return Object(a["a"])({url:s["a"].system.dummy.addVirtualPhoneField,method:"post",data:e})}function u(e){return Object(a["a"])({url:s["a"].system.dummy.addPhoneRoll,method:"post",data:e})}function l(e){return Object(a["a"])({url:s["a"].system.dummy.deletePhone,method:"post",data:e})}function c(e){return Object(n["a"])({url:s["a"].system.account.getBanner,method:"post",data:e})}function d(e){return Object(a["a"])({url:s["a"].system.guild.configRebate,method:"post",data:e})}function m(e){return Object(a["a"])({url:s["a"].system.guild.delConfigRebate,method:"post",data:e})}function f(e){return Object(a["a"])({url:s["a"].system.addSysNotice,method:"post",data:e})}function p(e){return Object(a["a"])({url:s["a"].system.addOfficialNotice,method:"post",data:e})}function b(e){return Object(a["a"])({url:s["a"].system.AppruleAdd,method:"post",data:e})}function h(e){return Object(a["a"])({url:s["a"].system.AppruleUpdate,method:"post",data:e})}function g(e){return Object(a["a"])({url:s["a"].system.getChannels,method:"post",data:e})}function v(e){return Object(a["a"])({url:s["a"].system.getSwitchValue,method:"post",data:e})}},bedc:function(e,t,r){},d919:function(e,t,r){},ebf4:function(e,t,r){},f048:function(e,t,r){"use strict";r("006a")},f687:function(e,t,r){"use strict";r("ebf4")}}]);