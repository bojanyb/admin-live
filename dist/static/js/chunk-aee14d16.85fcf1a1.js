(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-aee14d16"],{2201:function(e,n,t){"use strict";t("66de")},2708:function(e,n,t){"use strict";var a=t("5530"),i=t("2f62"),c={data:function(){return{tabIndex:"0",page:1,size:10,limit:10,searchParams:{},dataParams:{}}},computed:Object(a["a"])({},Object(i["c"])({permissionArr:function(e){return e.permission.permissionArr}})),mounted:function(){console.log(this.permissionArr,"permissionArr")}};n["a"]=c},"2e70":function(e,n,t){"use strict";t.r(n);var a=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"app-container"},[t("menuComp",{ref:"menuComp",attrs:{menuList:e.menuList},on:{tabChange:e.tabChange},model:{value:e.tabIndex,callback:function(n){e.tabIndex=n},expression:"tabIndex"}}),"0"==e.tabIndex?t("giftListPage",{ref:"giftListPage"}):e._e(),"1"==e.tabIndex?t("cpRankPage",{ref:"cpRankPage"}):e._e(),"2"==e.tabIndex?t("loveTreePage",{ref:"loveTreePage"}):e._e()],1)},i=[],c=(t("d3b7"),t("3ca3"),t("ddb0"),t("2708")),s=t("3923"),o={mixins:[c["a"]],components:{menuComp:s["a"],giftListPage:function(){return Promise.all([t.e("chunk-commons"),t.e("chunk-2758c591"),t.e("chunk-06fcd619")]).then(t.bind(null,"b820"))},cpRankPage:function(){return Promise.all([t.e("chunk-commons"),t.e("chunk-2758c591"),t.e("chunk-4fd5bbf8")]).then(t.bind(null,"b670"))},loveTreePage:function(){return Promise.all([t.e("chunk-commons"),t.e("chunk-2758c591"),t.e("chunk-b18e2f98")]).then(t.bind(null,"344a"))}},data:function(){return{menuList:[{id:1,name:"礼物数据"},{id:2,name:"CP排行榜"},{id:3,name:"爱情树抽奖数据"}],tabIndex:"0"}},computed:{},mounted:function(){},methods:{tabChange:function(){this.$refs.tableList&&this.$refs.tableList.getData()}}},r=o,u=(t("2201"),t("2877")),m=Object(u["a"])(r,a,i,!1,null,null,null);n["default"]=m.exports},"66de":function(e,n,t){}}]);