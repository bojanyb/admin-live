(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-325588a1"],{"1fe8":function(e,t,a){e.exports=a.p+"static/img/error.e53687be.png"},"7c1f":function(e,t,a){"use strict";a("b0ea")},b0ea:function(e,t,a){},b286:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"page-container"},[a("tableList",{ref:"tableList",attrs:{cfgs:e.cfgs,isHidePage:!0}})],1)},i=[],r=a("5530"),s=a("4053"),c=a("8daa"),o=a("2708"),u={mixins:[o["a"]],components:{tableList:s["a"]},data:function(){return{dateTimeParams:{}}},computed:{cfgs:function(){return{vm:this,url:c["a"].dragonBoat.getRanking,columns:[{label:"排名",width:"100px",prop:"ranking"},{label:"用户ID",prop:"user_number"},{label:"用户昵称",prop:"nickname"},{label:"礼物总价值",prop:"value"}]}}},mounted:function(){},methods:{beforeSearch:function(e){Object(r["a"])({},this.dateTimeParams);return{page:e.page,pagesize:e.size,type:2}},onSearch:function(){this.getList()}}},p=u,l=(a("7c1f"),a("2877")),f=Object(l["a"])(p,n,i,!1,null,"cd77a7ea",null);t["default"]=f.exports}}]);