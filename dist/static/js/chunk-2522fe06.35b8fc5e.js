(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2522fe06"],{"1fe8":function(e,r,n){e.exports=n.p+"static/img/error.e53687be.png"},2708:function(e,r,n){"use strict";var a=n("4672"),s=n("52c1"),t={data:function(){return{tabIndex:"0",page:1,size:10,limit:10,searchParams:{},dataParams:{}}},computed:Object(a["a"])({},Object(s["c"])({permissionArr:function(e){return e.permission.permissionArr}})),mounted:function(){console.log(this.permissionArr,"permissionArr")}};r["a"]=t},"4b2f":function(e,r,n){"use strict";n("ac9c")},ac9c:function(e,r,n){},c5cd:function(e,r,n){"use strict";n.r(r);var a=function(){var e=this,r=e.$createElement,n=e._self._c||r;return n("div",{staticClass:"recommend-box"},[n("div",{staticClass:"searchParams"},[n("SearchPanel",{attrs:{forms:e.forms,"show-reset":!0},on:{onReset:e.reset},model:{value:e.searchParams,callback:function(r){e.searchParams=r},expression:"searchParams"}})],1),n("tableList",{ref:"tableList",attrs:{cfgs:e.cfgs},on:{saleAmunt:e.saleAmunt}})],1)},s=[],t=n("4672"),i=(n("23dc"),n("8bda"),n("48d4"),n("04a2")),o=n("4053"),c=n("2708"),u=n("8daa"),l=n("279a"),m={components:{SearchPanel:i["a"],tableList:o["a"]},mixins:[c["a"]],computed:{forms:function(){return[]},cfgs:function(){var e=this;return{vm:this,url:u["a"].userHistory.NewUserStat,columns:[{label:"注册时间",width:"180px",prop:"create_time"},{label:"ID",render:function(e,r){return e("span",r.row.user_number||"无")}},{label:"用户名字",render:function(e,r){return e("span",r.row.nickname||"无")}},{label:"性别",prop:"sex",render:function(e,r){var n=l["a"].SEXLIST.find((function(e){return e.value===r.row.sex}));return e("span",n?n.name:"未知")}},{label:"地区",prop:"addr"},{label:"在线状态",prop:"is_online",render:function(r,n){var a=e.onlineList.find((function(e){return e.value===n.row.is_online}));return r("span",a?a.name:"未知")}},{label:"充值金额",prop:"recharge",sortable:!0},{label:"消费金额",prop:"consume",sortable:!0}]}}},data:function(){return{onlineList:[{name:"在线",value:1},{name:"离线",value:0}],searchParams:{query_id:0,is_online:1}}},methods:{getList:function(){this.$refs.tableList.getData()},beforeSearch:function(e){var r=Object(t["a"])({},this.searchParams);return{page:e.page,pagesize:e.size,query_id:r.query_id,is_online:r.is_online}},reset:function(){this.searchParams={query_id:0,is_online:1},this.$refs.tableList.handlePageChange(1)},saleAmunt:function(e){if(1===+e.page)return this.searchParams.query_id,!1;this.searchParams.query_id=e.query_id}}},f=m,p=(n("4b2f"),n("e607")),d=Object(p["a"])(f,a,s,!1,null,null,null);r["default"]=d.exports}}]);