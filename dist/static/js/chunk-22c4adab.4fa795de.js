(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-22c4adab"],{"1fe8":function(e,a,t){e.exports=t.p+"static/img/error.e53687be.png"},2708:function(e,a,t){"use strict";var s=t("4672"),r=t("52c1"),n={data:function(){return{tabIndex:"0",page:1,size:10,limit:10,searchParams:{},dataParams:{}}},computed:Object(s["a"])({},Object(r["c"])({permissionArr:function(e){return e.permission.permissionArr}})),mounted:function(){console.log(this.permissionArr,"permissionArr")}};a["a"]=n},ac91:function(e,a,t){"use strict";t.r(a);var s=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"app-container"},[t("div",{staticClass:"searchParams"},[t("SearchPanel",{attrs:{forms:e.forms,"show-reset":!0,"show-search-btn":!0},on:{onReset:e.reset,onSearch:e.onSearch},model:{value:e.searchParams,callback:function(a){e.searchParams=a},expression:"searchParams"}})],1),t("tableList",{ref:"tableList",attrs:{cfgs:e.cfgs}})],1)},r=[],n=t("4672"),i=(t("23dc"),t("8bda"),t("48d4"),t("04a2")),o=t("4053"),c=t("8daa"),u=t("cf45"),l=t("2708"),m=t("279a"),p={name:"user-old-logOut-list",mixins:[l["a"]],components:{SearchPanel:i["a"],tableList:o["a"]},computed:{forms:function(){return[{name:"user_id",type:"input",value:"",label:"用户ID",isNum:!0,placeholder:"请输入用户ID"},{name:"status",type:"select",value:"",keyName:"value",optionLabel:"name",label:"状态",placeholder:"请选择",options:m["a"].PROCESSEDSTATUSLIST}]},cfgs:function(){return{vm:this,url:c["a"].logout.hasDeal,columns:[{label:"用户昵称",prop:"nickname"},{label:"用户ID",prop:"user_id"},{label:"手机号",prop:"phone"},{label:"申请注销时间",render:function(e,a){return e("span",a.row.create_time?Object(u["h"])(a.row.create_time,"YYYY-MM-DD HH:mm:ss",!0):"无")}},{label:"状态",render:function(e,a){var t=m["a"].PROCESSEDSTATUSLIST.find((function(e){return a.row.status===e.value}));return e("span",t?t.name:"无")}},{label:"处理人",prop:"deal_user_name"},{label:"处理时间",render:function(e,a){return e("span",a.row.update_time?Object(u["h"])(a.row.update_time,"YYYY-MM-DD HH:mm:ss",!0):"无")}}]}}},data:function(){return{searchParams:{status:2,user_id:""}}},methods:{beforeSearch:function(e){var a=Object(n["a"])({},this.searchParams);return{page:e.page,pagesize:e.size,status:a.status,sort:0,user_id:a.user_id}},getList:function(){this.$refs.tableList.getData()},reset:function(){this.searchParams={sort:0,status:2,user_id:""},this.getList()},onSearch:function(){this.getList()}}},d=p,h=t("e607"),f=Object(h["a"])(d,s,r,!1,null,null,null);a["default"]=f.exports}}]);