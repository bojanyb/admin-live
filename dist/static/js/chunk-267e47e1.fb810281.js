(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-267e47e1"],{2708:function(e,n,t){"use strict";var a=t("4672"),i=t("52c1"),c={data:function(){return{tabIndex:"0",page:1,size:10,limit:10,searchParams:{},dataParams:{}}},computed:Object(a["a"])({},Object(i["c"])({permissionArr:function(e){return e.permission.permissionArr}})),mounted:function(){console.log(this.permissionArr,"permissionArr")}};n["a"]=c},"2d16":function(e,n,t){},"7c08":function(e,n,t){"use strict";t.r(n);var a=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"app-container"},[t("menuComp",{ref:"menuComp",attrs:{menuList:e.menuList},on:{tabChange:e.tabChange},model:{value:e.tabIndex,callback:function(n){e.tabIndex=n},expression:"tabIndex"}}),"0"==e.tabIndex?t("giftListPage",{ref:"giftListPage"}):e._e(),"1"==e.tabIndex?t("cpRankPage",{ref:"cpRankPage"}):e._e(),"2"==e.tabIndex?t("loveTreePage",{ref:"loveTreePage"}):e._e()],1)},i=[],c=(t("8bda"),t("15f2"),t("0ea2"),t("2708")),s=t("3923"),o={mixins:[c["a"]],components:{menuComp:s["a"],giftListPage:function(){return Promise.all([t.e("chunk-commons"),t.e("chunk-35d6bd7c"),t.e("chunk-326e84fe")]).then(t.bind(null,"9f3d"))},cpRankPage:function(){return Promise.all([t.e("chunk-commons"),t.e("chunk-35d6bd7c"),t.e("chunk-273f0e9b")]).then(t.bind(null,"2c7c"))},loveTreePage:function(){return Promise.all([t.e("chunk-commons"),t.e("chunk-35d6bd7c"),t.e("chunk-1adb47b6")]).then(t.bind(null,"c4e1"))}},data:function(){return{menuList:[{id:1,name:"礼物数据"},{id:2,name:"制作披萨数据"},{id:3,name:"披萨兑换数据"}],tabIndex:"0"}},computed:{},mounted:function(){},methods:{tabChange:function(){this.$refs.tableList&&this.$refs.tableList.getData()}}},r=o,u=(t("d854"),t("e607")),d=Object(u["a"])(r,a,i,!1,null,null,null);n["default"]=d.exports},d854:function(e,n,t){"use strict";t("2d16")}}]);