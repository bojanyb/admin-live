(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a67a5418"],{2708:function(e,n,t){"use strict";var a=t("5530"),i=t("2f62"),c={data:function(){return{tabIndex:"0",page:1,size:10,limit:10,searchParams:{},dataParams:{}}},computed:Object(a["a"])({},Object(i["c"])({permissionArr:function(e){return e.permission.permissionArr}})),mounted:function(){console.log(this.permissionArr,"permissionArr")}};n["a"]=c},"5aec":function(e,n,t){},"7c08":function(e,n,t){"use strict";t.r(n);var a=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"app-container"},[t("menuComp",{ref:"menuComp",attrs:{menuList:e.menuList},on:{tabChange:e.tabChange},model:{value:e.tabIndex,callback:function(n){e.tabIndex=n},expression:"tabIndex"}}),"0"==e.tabIndex?t("giftListPage",{ref:"giftListPage"}):e._e(),"1"==e.tabIndex?t("cpRankPage",{ref:"cpRankPage"}):e._e(),"2"==e.tabIndex?t("loveTreePage",{ref:"loveTreePage"}):e._e()],1)},i=[],c=(t("d3b7"),t("3ca3"),t("ddb0"),t("2708")),s=t("3923"),o={mixins:[c["a"]],components:{menuComp:s["a"],giftListPage:function(){return Promise.all([t.e("chunk-commons"),t.e("chunk-2758c591"),t.e("chunk-e6406842")]).then(t.bind(null,"9f3d"))},cpRankPage:function(){return Promise.all([t.e("chunk-commons"),t.e("chunk-2758c591"),t.e("chunk-d90863c6")]).then(t.bind(null,"2c7c"))},loveTreePage:function(){return Promise.all([t.e("chunk-commons"),t.e("chunk-2758c591"),t.e("chunk-d0a035f4")]).then(t.bind(null,"c4e1"))}},data:function(){return{menuList:[{id:1,name:"礼物数据"},{id:2,name:"制作披萨数据"},{id:3,name:"披萨兑换数据"}],tabIndex:"0"}},computed:{},mounted:function(){},methods:{tabChange:function(){this.$refs.tableList&&this.$refs.tableList.getData()}}},r=o,u=(t("d854"),t("2877")),m=Object(u["a"])(r,a,i,!1,null,null,null);n["default"]=m.exports},d854:function(e,n,t){"use strict";t("5aec")}}]);