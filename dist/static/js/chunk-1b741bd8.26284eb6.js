(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1b741bd8"],{"1fe8":function(t,n,e){t.exports=e.p+"static/img/error.e53687be.png"},2708:function(t,n,e){"use strict";var a=e("4672"),r=e("52c1"),o={data:function(){return{tabIndex:"0",page:1,size:10,limit:10,searchParams:{},dataParams:{}}},computed:Object(a["a"])({},Object(r["c"])({permissionArr:function(t){return t.permission.permissionArr}})),mounted:function(){console.log(this.permissionArr,"permissionArr")}};n["a"]=o},"36a0":function(t,n,e){"use strict";e("944f")},"717d":function(t,n,e){"use strict";e.r(n);var a=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"app-container"},[e("menuComp",{ref:"menuComp",attrs:{menuList:t.menuList},on:{tabChange:t.tabChange},model:{value:t.tabIndex,callback:function(n){t.tabIndex=n},expression:"tabIndex"}}),e("div",{staticClass:"searchParams"},[e("SearchPanel",{attrs:{forms:t.forms,"show-reset":!0,"show-search-btn":!0},on:{onReset:t.reset,onSearch:t.onSearch},model:{value:t.searchParams,callback:function(n){t.searchParams=n},expression:"searchParams"}})],1),e("tableList",{ref:"tableList",attrs:{cfgs:t.cfgs,isHidePage:!0},on:{saleAmunt:t.saleAmunt}})],1)},r=[],o=e("40bd"),u=e("7e8c"),i=e("4672"),c=(e("6166"),e("5250"),e("ca41")),s=e("04a2"),d=e("4053"),f=e("8daa"),m=e("2708"),l=e("3923"),p={mixins:[m["a"]],components:{tableList:d["a"],SearchPanel:s["a"],menuComp:l["a"]},data:function(){return{menuList:[{name:"派对榜排名"},{name:"直播榜排名"},{name:"壕气榜榜单排名"}],tabIndex:"0",giftNameList:[],poolList:[],searchParams:{round:1}}},computed:{forms:function(){return[{name:"round",type:"select",value:"第1轮",keyName:"round_number",optionLabel:"title",label:"活动轮次",placeholder:"请选择",clearable:!0,linkage:!0,options:this.poolList}]},cfgs:function(){var t=[],n=[{label:"时间",width:"310px",render:function(t,n){return t("span",n.row.start_time+" 至 "+n.row.end_time)}},{label:"轮次",prop:"round"},{label:"榜单",prop:"desc"},{label:"排名",prop:"ranking"}],e=[{label:"用户ID",prop:"user_number"},{label:"用户昵称",prop:"nickname"}],a=[{label:"房间ID",prop:"room_number"},{label:"房间昵称",prop:"room_title"}],r=[{label:"礼物总价值",render:function(t,n){return t("span",n.row.value)}}],o="";return Number(this.tabIndex)<2?(t=n.concat(a).concat(r),o="getRoomRanking"):(t=n.concat(e).concat(r),o="getUserRanking"),{vm:this,url:f["a"].monthStar[o],columns:t}}},mounted:function(){this.getRoundSource()},methods:{beforeSearch:function(t){var n=Object(i["a"])({},this.searchParams),e={page:t.page,pagesize:t.size,type:Number(this.tabIndex)+1,round:n.round?n.round:1};return this.tabIndex<2&&(e.room_category=0==this.tabIndex?2:1),e},getList:function(){this.$refs.tableList.getData()},reset:function(){this.searchParams={},this.getList()},onSearch:function(){this.getList()},saleAmunt:function(t){},getRoundSource:function(){var t=this;return Object(u["a"])(Object(o["a"])().mark((function n(){var e;return Object(o["a"])().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,Object(c["m"])();case 2:e=n.sent,2e3==e.code&&(t.searchParams.round=e.data.round[0].round_number,t.poolList=e.data.round);case 4:case"end":return n.stop()}}),n)})))()},tabChange:function(){var t=this;this.$nextTick((function(n){t.searchParams.round=1,t.$refs.tableList&&t.tabIndex<2&&t.$refs.tableList.getData()}))}}},b=p,h=(e("36a0"),e("e607")),g=Object(h["a"])(b,a,r,!1,null,null,null);n["default"]=g.exports},"944f":function(t,n,e){},ca41:function(t,n,e){"use strict";e.d(n,"a",(function(){return o})),e.d(n,"d",(function(){return u})),e.d(n,"b",(function(){return i})),e.d(n,"G",(function(){return c})),e.d(n,"o",(function(){return s})),e.d(n,"v",(function(){return d})),e.d(n,"p",(function(){return f})),e.d(n,"x",(function(){return m})),e.d(n,"H",(function(){return l})),e.d(n,"E",(function(){return p})),e.d(n,"q",(function(){return b})),e.d(n,"y",(function(){return h})),e.d(n,"r",(function(){return g})),e.d(n,"z",(function(){return v})),e.d(n,"h",(function(){return j})),e.d(n,"w",(function(){return O})),e.d(n,"k",(function(){return y})),e.d(n,"s",(function(){return P})),e.d(n,"F",(function(){return L})),e.d(n,"A",(function(){return x})),e.d(n,"t",(function(){return R})),e.d(n,"B",(function(){return w})),e.d(n,"i",(function(){return S})),e.d(n,"g",(function(){return k})),e.d(n,"n",(function(){return V})),e.d(n,"m",(function(){return I})),e.d(n,"l",(function(){return N})),e.d(n,"D",(function(){return A})),e.d(n,"f",(function(){return C})),e.d(n,"e",(function(){return _})),e.d(n,"c",(function(){return G})),e.d(n,"j",(function(){return z})),e.d(n,"u",(function(){return D})),e.d(n,"C",(function(){return $}));var a=e("829b"),r=e("8daa");function o(t){return Object(a["a"])({url:r["a"].activity.addResourceConfig,method:"post",data:t})}function u(t){return Object(a["a"])({url:r["a"].activity.editResource,method:"post",data:t})}function i(t){return Object(a["a"])({url:r["a"].activity.delResource,method:"post",data:t})}function c(t){return Object(a["a"])({url:r["a"].activity.posList,method:"post",data:t})}function s(t){return Object(a["a"])({url:r["a"].activity.getPoolName,method:"post",data:t})}function d(t){return Object(a["a"])({url:r["a"].activity.getRound,method:"post",data:t})}function f(t){return Object(a["a"])({url:r["a"].activity.getPoolNameV2,method:"post",data:t})}function m(t){return Object(a["a"])({url:r["a"].activity.getRoundV2,method:"post",data:t})}function l(t){return Object(a["a"])({url:r["a"].activity.sourceType,method:"post",data:t})}function p(t){return Object(a["a"])({url:r["a"].activity.getTraveListDetail,method:"post",data:t})}function b(t){return Object(a["a"])({url:r["a"].activity.getPoolNameV3,method:"post",data:t})}function h(t){return Object(a["a"])({url:r["a"].activity.getRoundV3,method:"post",data:t})}function g(t){return Object(a["a"])({url:r["a"].activity.getPoolNameV4,method:"post",data:t})}function v(t){return Object(a["a"])({url:r["a"].activity.getRoundV4,method:"post",data:t})}function j(t){return Object(a["a"])({url:r["a"].activity.getGiftList,method:"post",data:t})}function O(t){return Object(a["a"])({url:r["a"].activity.getRoundList,method:"post",data:t})}function y(t){return Object(a["a"])({url:r["a"].activity.getLabourGiftList,method:"post",data:t})}function P(t){return Object(a["a"])({url:r["a"].activity.getPoolNameV5,method:"post",data:t})}function L(t){return Object(a["a"])({url:r["a"].activity.luckyConfigV5,method:"post",data:t})}function x(t){return Object(a["a"])({url:r["a"].activity.getRoundV5,method:"post",data:t})}function R(t){return Object(a["a"])({url:r["a"].activity.getPoolNameV520,method:"post",data:t})}function w(t){return Object(a["a"])({url:r["a"].activity.getRoundV520,method:"post",data:t})}function S(t){return Object(a["a"])({url:r["a"].activity.getGiftV520,method:"post",data:t})}function k(t){return Object(a["a"])({url:r["a"].dragonBoat.getGift,method:"post",data:t})}function V(t){return Object(a["a"])({url:r["a"].activity.getPizzaGift,method:"post",data:t})}function I(t){return Object(a["a"])({url:r["a"].monthStar.getRound,method:"post",data:t})}function N(t){return Object(a["a"])({url:r["a"].monthStar.getGift,method:"post",data:t})}function A(t){return Object(a["a"])({url:r["a"].summerSign.getSummerAddUser,method:"post",data:t})}function C(t){return Object(a["a"])({url:r["a"].summerSign.getAuditPass,method:"post",data:t})}function _(t){return Object(a["a"])({url:r["a"].summerSign.getAuditNoPass,method:"post",data:t})}function G(t){return Object(a["a"])({url:r["a"].summerSign.editPowerRanking,method:"post",data:t})}function z(t){return Object(a["a"])({url:r["a"].summerSign.getGift,method:"post",data:t})}function D(t){return Object(a["a"])({url:r["a"].activity.getPoolNameV6,method:"post",data:t})}function $(t){return Object(a["a"])({url:r["a"].activity.getRoundV6,method:"post",data:t})}}}]);