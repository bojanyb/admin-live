(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-19c193e7"],{"1fe8":function(e,t,r){e.exports=r.p+"static/img/error.e53687be.png"},2708:function(e,t,r){"use strict";var a=r("5530"),s=r("2f62"),n={data:function(){return{tabIndex:"0",page:1,size:10,limit:10,searchParams:{},dataParams:{}}},computed:Object(a["a"])({},Object(s["c"])({permissionArr:function(e){return e.permission.permissionArr}})),mounted:function(){console.log(this.permissionArr,"permissionArr")}};t["a"]=n},c5bf:function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"app-container"},[r("div",{staticClass:"searchParams"},[r("SearchPanel",{attrs:{forms:e.forms,"show-reset":!0,"show-search-btn":!0},on:{onReset:e.reset,onSearch:e.onSearch},model:{value:e.searchParams,callback:function(t){e.searchParams=t},expression:"searchParams"}})],1),r("tableList",{ref:"tableList",attrs:{cfgs:e.cfgs}})],1)},s=[],n=r("c7eb"),c=r("1da1"),i=r("5530"),o=(r("7db0"),r("d3b7"),r("b0c0"),r("4e82"),r("1a72")),u=r("04a2"),l=r("4053"),p=r("8daa"),m=r("cf45"),f=r("2708"),b=r("279a"),h={name:"user-not-logOut-list",mixins:[f["a"]],components:{SearchPanel:u["a"],tableList:l["a"]},computed:{forms:function(){return[{name:"sort",type:"select",value:"",keyName:"value",optionLabel:"name",label:"排序查看",placeholder:"请选择",options:b["a"].LOGOUTUNTREATEDSORTLIST}]},cfgs:function(){var e=this;return{vm:this,url:p["a"].logout.list,columns:[{label:"用户昵称",prop:"nickname"},{label:"用户ID",prop:"user_id"},{label:"手机号",prop:"phone"},{label:"申请注销时间",render:function(e,t){return e("span",t.row.create_time?Object(m["h"])(t.row.create_time,"YYYY-MM-DD HH:mm:ss",!0):"无")}},{label:"状态",render:function(e,t){var r=b["a"].LOGOUTUNTREATEDSTATUSLIST.find((function(e){return t.row.status===e.value}));return e("span",r?r.name:"无")}},{label:"操作",render:function(t,r){return t("div",[t("el-button",{props:{type:"primary"},on:{click:function(){e.passFunc(r.row.id,1)}}},"通过"),t("el-button",{props:{type:"danger"},on:{click:function(){e.reject(r.row.id,2)}}},"拒绝")])}}]}}},data:function(){return{searchParams:{sort:0}}},methods:{beforeSearch:function(e){var t=Object(i["a"])({},this.searchParams);return{page:e.page,pagesize:e.size,status:0,sort:t.sort}},getList:function(){this.$refs.tableList.getData()},reset:function(){this.searchParams={sort:0},this.getList()},onSearch:function(){this.getList()},passFunc:function(e,t){var r=this;return Object(c["a"])(Object(n["a"])().mark((function a(){var s;return Object(n["a"])().wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,Object(o["nb"])({id:e,status:t});case 2:s=a.sent,2e3===s.code&&r.$message.success("处理成功"),r.getList();case 5:case"end":return a.stop()}}),a)})))()},reject:function(e,t){var r=this;return Object(c["a"])(Object(n["a"])().mark((function a(){var s;return Object(n["a"])().wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,Object(o["nb"])({id:e,status:t});case 2:s=a.sent,2e3===s.code&&r.$message.success("驳回成功"),r.getList();case 5:case"end":return a.stop()}}),a)})))()}}},d=h,g=r("2877"),v=Object(g["a"])(d,a,s,!1,null,null,null);t["default"]=v.exports}}]);