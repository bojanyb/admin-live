(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-326e84fe"],{"0fa7":function(t,e,a){},"1fe8":function(t,e,a){t.exports=a.p+"static/img/error.e53687be.png"},"7f3e":function(t,e,a){"use strict";a("0fa7")},"9f3d":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page-container"},[a("div",{staticClass:"searchParams"},[a("SearchPanel",{attrs:{forms:t.forms,"show-reset":!0,"show-search-btn":!0},on:{onReset:t.reset,onSearch:t.onSearch},model:{value:t.searchParams,callback:function(e){t.searchParams=e},expression:"searchParams"}})],1),"0"===t.tabIndex?a("el-card",{staticClass:"box-card",attrs:{shadow:"always"}},[a("div",{staticClass:"box-card-inner"},[a("div",[t._v("送礼人数："+t._s(t.sumSource.user_count||0)+"人")]),a("div",[t._v("收礼人数："+t._s(t.sumSource.live_user_count||0)+"人")]),a("div",[t._v("礼物总金额："+t._s(t.sumSource.gift_diamond_total||0)+"钻石")])])]):t._e(),a("tableList",{ref:"tableList",attrs:{cfgs:t.cfgs},on:{saleAmunt:t.saleAmunt}})],1)},r=[],i=a("40bd"),u=a("7e8c"),o=a("4672"),c=a("ca41"),s=a("04a2"),d=a("4053"),m=a("8daa"),f=a("2708"),l={mixins:[f["a"]],components:{tableList:d["a"],SearchPanel:s["a"]},data:function(){return{tabIndex:"0",giftNameList:[],dateTimeParams:{},sumSource:{}}},computed:{forms:function(){var t=this;return[{name:"user_number",type:"input",value:"",label:"送礼人ID",isNum:!0,linkage:!0,placeholder:"请输入送礼人ID"},{name:"live_user_number",type:"input",value:"",label:"收礼人ID",linkage:!0,placeholder:"请输入收礼人ID"},{name:"gift_id",type:"select",value:"全部",keyName:"gift_id",optionLabel:"gift_name",label:"礼物名称",placeholder:"请选择",options:this.giftNameList},{name:"dateTimeParams",type:"datePicker",dateType:"datetimerange",format:"yyyy-MM-dd HH:mm:ss",label:"时间选择",value:"",linkage:!0,handler:{change:function(e){t.emptyDateTime(),t.setDateTime(e)},selectChange:function(e,a){t.emptyDateTime()}}}]},cfgs:function(){return{vm:this,url:m["a"].activity.getPizzaGiftLog,columns:[{label:"时间",width:"180px",prop:"create_time"},{label:"送礼人ID",prop:"user_number"},{label:"送礼人昵称",prop:"nickname"},{label:"收礼人ID",prop:"live_user_number"},{label:"收礼人昵称",prop:"live_nickname"},{label:"礼物名称",prop:"gift_name"},{label:"数量",prop:"gift_num"},{label:"单价",prop:"gift_diamond"},{label:"礼物总价值",render:function(t,e){return t("span",e.row.gift_diamond*e.row.gift_num)}}]}}},mounted:function(){this.getPoolNameSource()},methods:{beforeSearch:function(t){var e=Object(o["a"])(Object(o["a"])({},this.searchParams),this.dateTimeParams);return{page:t.page,pagesize:t.size,start_time:e.start_time?Math.floor(e.start_time/1e3):e.start_time,end_time:e.end_time?Math.floor(e.end_time/1e3):e.end_time,user_number:e.user_number,live_user_number:e.live_user_number,gift_id:-1==e.gift_id||"全部"==e.gift_id?"":e.gift_id}},setDateTime:function(t){var e=t?{start_time:t[0],end_time:t[1]}:{};this.$set(this,"dateTimeParams",e)},emptyDateTime:function(){this.dateTimeParams={}},getList:function(){this.$refs.tableList.getData()},reset:function(){this.searchParams={},this.dateTimeParams={},this.getList()},onSearch:function(){this.getList()},saleAmunt:function(t){this.sumSource=t.data},getPoolNameSource:function(){var t=this;return Object(u["a"])(Object(i["a"])().mark((function e(){var a,n;return Object(i["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(c["n"])();case 2:a=e.sent,2e3==a.code&&(t.giftNameList=a.data.list,n={gift_id:0,gift_name:"全部"},t.giftNameList.unshift(n));case 4:case"end":return e.stop()}}),e)})))()}}},p=l,h=(a("7f3e"),a("e607")),b=Object(h["a"])(p,n,r,!1,null,"5b814498",null);e["default"]=b.exports},ca41:function(t,e,a){"use strict";a.d(e,"a",(function(){return i})),a.d(e,"d",(function(){return u})),a.d(e,"b",(function(){return o})),a.d(e,"G",(function(){return c})),a.d(e,"o",(function(){return s})),a.d(e,"v",(function(){return d})),a.d(e,"p",(function(){return m})),a.d(e,"x",(function(){return f})),a.d(e,"H",(function(){return l})),a.d(e,"E",(function(){return p})),a.d(e,"q",(function(){return h})),a.d(e,"y",(function(){return b})),a.d(e,"r",(function(){return g})),a.d(e,"z",(function(){return v})),a.d(e,"h",(function(){return _})),a.d(e,"w",(function(){return y})),a.d(e,"k",(function(){return j})),a.d(e,"s",(function(){return O})),a.d(e,"F",(function(){return P})),a.d(e,"A",(function(){return S})),a.d(e,"t",(function(){return L})),a.d(e,"B",(function(){return w})),a.d(e,"i",(function(){return N})),a.d(e,"g",(function(){return k})),a.d(e,"n",(function(){return D})),a.d(e,"m",(function(){return R})),a.d(e,"l",(function(){return T})),a.d(e,"D",(function(){return V})),a.d(e,"f",(function(){return x})),a.d(e,"e",(function(){return G})),a.d(e,"c",(function(){return C})),a.d(e,"j",(function(){return I})),a.d(e,"u",(function(){return z})),a.d(e,"C",(function(){return A}));var n=a("829b"),r=a("8daa");function i(t){return Object(n["a"])({url:r["a"].activity.addResourceConfig,method:"post",data:t})}function u(t){return Object(n["a"])({url:r["a"].activity.editResource,method:"post",data:t})}function o(t){return Object(n["a"])({url:r["a"].activity.delResource,method:"post",data:t})}function c(t){return Object(n["a"])({url:r["a"].activity.posList,method:"post",data:t})}function s(t){return Object(n["a"])({url:r["a"].activity.getPoolName,method:"post",data:t})}function d(t){return Object(n["a"])({url:r["a"].activity.getRound,method:"post",data:t})}function m(t){return Object(n["a"])({url:r["a"].activity.getPoolNameV2,method:"post",data:t})}function f(t){return Object(n["a"])({url:r["a"].activity.getRoundV2,method:"post",data:t})}function l(t){return Object(n["a"])({url:r["a"].activity.sourceType,method:"post",data:t})}function p(t){return Object(n["a"])({url:r["a"].activity.getTraveListDetail,method:"post",data:t})}function h(t){return Object(n["a"])({url:r["a"].activity.getPoolNameV3,method:"post",data:t})}function b(t){return Object(n["a"])({url:r["a"].activity.getRoundV3,method:"post",data:t})}function g(t){return Object(n["a"])({url:r["a"].activity.getPoolNameV4,method:"post",data:t})}function v(t){return Object(n["a"])({url:r["a"].activity.getRoundV4,method:"post",data:t})}function _(t){return Object(n["a"])({url:r["a"].activity.getGiftList,method:"post",data:t})}function y(t){return Object(n["a"])({url:r["a"].activity.getRoundList,method:"post",data:t})}function j(t){return Object(n["a"])({url:r["a"].activity.getLabourGiftList,method:"post",data:t})}function O(t){return Object(n["a"])({url:r["a"].activity.getPoolNameV5,method:"post",data:t})}function P(t){return Object(n["a"])({url:r["a"].activity.luckyConfigV5,method:"post",data:t})}function S(t){return Object(n["a"])({url:r["a"].activity.getRoundV5,method:"post",data:t})}function L(t){return Object(n["a"])({url:r["a"].activity.getPoolNameV520,method:"post",data:t})}function w(t){return Object(n["a"])({url:r["a"].activity.getRoundV520,method:"post",data:t})}function N(t){return Object(n["a"])({url:r["a"].activity.getGiftV520,method:"post",data:t})}function k(t){return Object(n["a"])({url:r["a"].dragonBoat.getGift,method:"post",data:t})}function D(t){return Object(n["a"])({url:r["a"].activity.getPizzaGift,method:"post",data:t})}function R(t){return Object(n["a"])({url:r["a"].monthStar.getRound,method:"post",data:t})}function T(t){return Object(n["a"])({url:r["a"].monthStar.getGift,method:"post",data:t})}function V(t){return Object(n["a"])({url:r["a"].summerSign.getSummerAddUser,method:"post",data:t})}function x(t){return Object(n["a"])({url:r["a"].summerSign.getAuditPass,method:"post",data:t})}function G(t){return Object(n["a"])({url:r["a"].summerSign.getAuditNoPass,method:"post",data:t})}function C(t){return Object(n["a"])({url:r["a"].summerSign.editPowerRanking,method:"post",data:t})}function I(t){return Object(n["a"])({url:r["a"].summerSign.getGift,method:"post",data:t})}function z(t){return Object(n["a"])({url:r["a"].activity.getPoolNameV6,method:"post",data:t})}function A(t){return Object(n["a"])({url:r["a"].activity.getRoundV6,method:"post",data:t})}}}]);