(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2b65dc7c"],{"16ad":function(e,r,t){"use strict";t.r(r);var a=function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",{staticClass:"giftHistory-list-box"},[t("div",{staticClass:"searchParams"},[t("SearchPanel",{attrs:{forms:e.forms,"show-reset":!0,"show-search-btn":!0,"show-add":!0,"add-name":"增发"},on:{onReset:e.reset,onSearch:e.onSearch,add:e.add},model:{value:e.searchParams,callback:function(r){e.searchParams=r},expression:"searchParams"}})],1),t("tableList",{ref:"tableList",attrs:{cfgs:e.cfgs}}),e.isDestoryComp?t("giveHistoryComp",{ref:"giveHistoryComp",on:{destoryComp:e.destoryComp,getList:e.getList}}):e._e()],1)},n=[],s=t("4672"),i=(t("23dc"),t("8bda"),t("48d4"),function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",{staticClass:"activity-giveHistoryComp-box"},[t("el-dialog",{attrs:{title:"后台增发",visible:e.dialogVisible,width:"750px","before-close":e.handleClose},on:{"update:visible":function(r){e.dialogVisible=r},closed:e.closed}},[t("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"90px"}},[t("div",{staticClass:"leftBox"},[t("el-form-item",{attrs:{label:"增发类型",prop:"currency"}},[t("el-select",{attrs:{placeholder:"请选择增发类型"},model:{value:e.ruleForm.currency,callback:function(r){e.$set(e.ruleForm,"currency",r)},expression:"ruleForm.currency"}},e._l(e.currencyComp,(function(e,r){return t("el-option",{key:r,attrs:{label:e.name,value:e.value}})})),1)],1),t("el-form-item",{staticClass:"numberBox",attrs:{label:"用户ID",prop:"user_number"}},[t("el-input",{on:{blur:e.seeUser},model:{value:e.ruleForm.user_number,callback:function(r){e.$set(e.ruleForm,"user_number",r)},expression:"ruleForm.user_number"}}),t("el-button",{attrs:{type:"success"},on:{click:e.seeUser}},[e._v("查询")])],1),t("el-form-item",{attrs:{label:"增发数额",prop:"amount",rules:e.verifyAmount}},[t("el-input",{on:{input:e.amountInput},model:{value:e.ruleForm.amount,callback:function(r){e.$set(e.ruleForm,"amount",r)},expression:"ruleForm.amount"}})],1),t("el-form-item",{attrs:{label:"增发说明",prop:"remark"}},[t("el-input",{attrs:{rows:4,type:"textarea"},model:{value:e.ruleForm.remark,callback:function(r){e.$set(e.ruleForm,"remark",r)},expression:"ruleForm.remark"}})],1)],1),e._l(e.userList,(function(r,a){return e.userList.length>0?t("div",{key:a,staticClass:"right_Con_Box"},[t("div",{staticClass:"upBox"},[t("img",{attrs:{src:r.face,alt:""}}),t("div",{staticClass:"rightBox"},[t("div",{staticClass:"name"},[e._v(e._s(r.nickname))]),t("div",{staticClass:"id"},[e._v("ID："+e._s(r.user_number))])])]),t("div",{staticClass:"downBox"},[t("p",[e._v("用户等级："),t("span",[e._v(e._s(r.user_rank))])]),t("p",[e._v("魅力等级："),t("span",[e._v(e._s(r.live_rank))])]),t("p",[e._v("实名信息："),t("span",[e._v(e._s(r.real_name?r.real_name:"无"))])]),t("p",[e._v("公会ID："),t("span",[e._v(e._s(r.guild_number?r.guild_number:"无"))])]),t("p",[e._v("公会名称："),t("span",[e._v(e._s(r.guild_name?r.guild_name:"无"))])]),t("p",[e._v("注册时间："),t("span",[e._v(e._s(r.create_time))])]),t("p",[e._v("用户余额："),t("span",{staticStyle:{color:"#ff4949","font-size":"17px"}},[e._v(e._s(e.form.balance))])])])]):e._e()})),e.userList.length<=0?t("div",{staticClass:"right_Con_Box emptyBox"},[e._v("暂无数据")]):e._e()],2),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(r){e.dialogVisible=!1}}},[e._v("取 消")]),t("el-button",{attrs:{type:"primary"},on:{click:function(r){return e.submitForm("ruleForm")}}},[e._v("确 定")])],1)],1)],1)}),o=[],u=t("40bd"),c=t("7e8c"),l=(t("65c4"),t("96c5"),t("00e5"),t("ee6e"),t("ed70"),t("6166"),t("430a"),t("eb5c"),t("1a72")),m=t("c24f"),p=t("cf45"),d=t("279a"),f={data:function(){return{dialogVisible:!1,userList:[],ruleForm:{currency:null,user_number:"",amount:"",remark:""},form:{},rules:{user_number:[{required:!0,message:"请输入用户ID",trigger:"blur"}],currency:[{required:!0,message:"请选择增发类型",trigger:"change"}],amount:[{required:!0,message:"请输入增发数额",trigger:"blur"}],remark:[{required:!0,message:"请输入增发说明",trigger:"blur"},{min:1,max:100,message:"增发说明最大限制为100个字符",trigger:"blur"}]},isSubmit:!1}},computed:{currencyComp:function(){var e=JSON.parse(JSON.stringify(d["a"].FINANCEGIVETYPELIST));return e.filter((function(e){return"全部"!==e.name}))},verifyAmount:function(){var e=this,r={};return r={required:!0,validator:function(r,t,a){if(e.ruleForm.amount){var n=e.ruleForm.amount.split(""),s=[],i=[],o="";n.forEach((function(e,r){"-"===e&&s.push(e),"+"===e&&i.push(e),("+"!==n[0]&&"-"!==n[0]||0!==r)&&(o+=e)})),Number(e.ruleForm.amount)>1e7?a(new Error("充值数量最大范围10000000")):"-"===n[0]||"+"===n[0]?"-"===n[0]||"+"===n[0]&&1==i.length&&0==s.length?"+"===n[0]||"-"===n[0]&&1==s.length&&0==i.length?"-"===n[0]&&Number(o)&&Number(o)>e.form.balance?a(new Error("您要扣除的金额大于用户余额")):a():a(new Error('请输入正确数额，只能有一个"-", 且必须在第一位')):a(new Error('请输入正确数额，只能有一个"+", 且必须在第一位')):a()}else a(new Error("请输入增发数额"))}},r}},methods:{amountInput:function(){this.ruleForm.amount=this.ruleForm.amount.replace(/[\u4E00-\u9FA5A-Za-z_^%&'\\*\/;.,=?$\[\]!@#()\\~]/g,"")},handleClose:function(){this.dialogVisible=!1},loadParams:function(){this.dialogVisible=!0},submitForm:function(e){var r=this;return Object(c["a"])(Object(u["a"])().mark((function t(){return Object(u["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(0!=r.isSubmit){t.next=4;break}r.isSubmit=!0,t.next=5;break;case 4:return t.abrupt("return");case 5:r.$refs[e].validate(function(){var e=Object(c["a"])(Object(u["a"])().mark((function e(t){return Object(u["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!t){e.next=5;break}return e.next=3,Object(l["kb"])(r.ruleForm).then((function(e){-1!==r.ruleForm.amount.indexOf("-")?r.$success("扣除成功"):r.$success("增发成功"),r.dialogVisible=!1,r.$emit("getList")})).catch((function(e){r.isSubmit=!1}));case 3:e.next=7;break;case 5:return r.isSubmit=!1,e.abrupt("return",!1);case 7:case"end":return e.stop()}}),e)})));return function(r){return e.apply(this,arguments)}}());case 6:case"end":return t.stop()}}),t)})))()},resetForm:function(e){this.$refs[e].resetFields()},seeUser:function(){var e=this;return Object(c["a"])(Object(u["a"])().mark((function r(){var t;return Object(u["a"])().wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(e.ruleForm.user_number){r.next=3;break}return e.$warning("请输入用户ID"),r.abrupt("return",!1);case 3:return r.next=5,Object(m["s"])({user_number:e.ruleForm.user_number});case 5:t=r.sent,2e3===t.code&&(t.data.list.length<=0?(e.$warning("查询不到数据"),e.userList=[]):(t.data.list[0].create_time=Object(p["h"])(t.data.list[0].create_time,"YYYY-MM-DD HH:mm:ss",!0),e.userList=t.data.list||[]),e.userList.length>0&&e.handleUserInfo());case 7:case"end":return r.stop()}}),r)})))()},handleUserInfo:function(){var e=this;return Object(c["a"])(Object(u["a"])().mark((function r(){var t,a;return Object(u["a"])().wrap((function(r){while(1)switch(r.prev=r.next){case 0:return t={user_number:e.ruleForm.user_number},r.next=3,Object(l["ub"])(t);case 3:a=r.sent,e.form=Object(s["a"])({},a.data),e.form.balance=Number(e.form.diamond)+Number(e.form.gain);case 6:case"end":return r.stop()}}),r)})))()},closed:function(){this.$emit("destoryComp")}}},b=f,h=(t("b5d2"),t("e607")),_=Object(h["a"])(b,i,o,!1,null,null,null),v=_.exports,g=t("04a2"),y=t("4053"),w=t("8daa"),x=t("2708"),C={name:"giftHistoryList",mixins:[x["a"]],components:{SearchPanel:g["a"],tableList:y["a"],giveHistoryComp:v},computed:{forms:function(){var e=this;return[{name:"user_number",type:"input",value:"",label:"用户ID",isNum:!0,placeholder:"请输入用户ID"},{name:"currency",type:"select",value:"",keyName:"value",optionLabel:"name",label:"增发类型",placeholder:"请选择",options:d["a"].FINANCEGIVETYPELIST},{name:"dateTimeParams",type:"datePicker",dateType:"datetimerange",format:"yyyy-MM-dd HH:mm:ss",label:"时间选择",value:"",handler:{change:function(r){e.emptyDateTime(),e.setDateTime(r)},selectChange:function(r,t){e.emptyDateTime()}}}]},cfgs:function(){return{vm:this,url:w["a"].finance.platformTopUp,columns:[{label:"赠送时间",render:function(e,r){return e("span",r.row.create_time?Object(p["h"])(r.row.create_time,"YYYY-MM-DD HH:mm:ss",!0):"无")}},{label:"用户ID",prop:"user_number"},{label:"用户昵称",prop:"nickname"},{label:"增发类型",render:function(e,r){var t=d["a"].FINANCEGIVETYPELIST.find((function(e){return e.value===r.row.currency}));return e("span",t?t.name:"无")}},{label:"增发数额",prop:"diamond",render:function(e,r){return e("span",{style:{color:1===r.row.genre?"#13CE66":"#ff4949"}},1===r.row.genre?"+"+r.row.diamond:"-"+r.row.diamond)}},{label:"赠送人",prop:"op_user"},{label:"赠送说明",prop:"remark",showOverFlow:!0}]}}},data:function(){return{isDestoryComp:!1}},methods:{beforeSearch:function(e){var r=Object(s["a"])(Object(s["a"])({},this.searchParams),this.dateTimeParams);return{page:e.page,pagesize:e.size,user_number:r.user_number,start_time:r.start_time?Math.floor(r.start_time/1e3):"",end_time:r.end_time?Math.floor(r.end_time/1e3):"",currency:r.currency}},getList:function(){this.$refs.tableList.getData()},setDateTime:function(e){var r=e?{start_time:e[0],end_time:e[1]}:{};this.$set(this,"dateTimeParams",r)},emptyDateTime:function(){this.dateTimeParams={}},reset:function(){this.searchParams={},this.dateTimeParams={},this.getList()},onSearch:function(){this.getList()},add:function(){var e=this;this.isDestoryComp=!0,setTimeout((function(){e.$refs.giveHistoryComp.loadParams()}),50)},destoryComp:function(){this.isDestoryComp=!1}}},k=C,F=(t("3b50"),Object(h["a"])(k,a,n,!1,null,null,null));r["default"]=F.exports},"1fe8":function(e,r,t){e.exports=t.p+"static/img/error.e53687be.png"},2708:function(e,r,t){"use strict";var a=t("4672"),n=t("52c1"),s={data:function(){return{tabIndex:"0",page:1,size:10,limit:10,searchParams:{},dataParams:{}}},computed:Object(a["a"])({},Object(n["c"])({permissionArr:function(e){return e.permission.permissionArr}})),mounted:function(){console.log(this.permissionArr,"permissionArr")}};r["a"]=s},"3b50":function(e,r,t){"use strict";t("e96e")},b5d2:function(e,r,t){"use strict";t("e1d5")},e1d5:function(e,r,t){},e96e:function(e,r,t){}}]);