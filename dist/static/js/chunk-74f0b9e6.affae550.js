(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-74f0b9e6"],{"1fe8":function(t,e,n){t.exports=n.p+"static/img/error.e53687be.png"},2708:function(t,e,n){"use strict";var a=n("5530"),r=n("2f62"),i={data:function(){return{tabIndex:"0",page:1,size:10,limit:10,searchParams:{},dataParams:{}}},computed:Object(a["a"])({},Object(r["c"])({permissionArr:function(t){return t.permission.permissionArr}})),mounted:function(){console.log(this.permissionArr,"permissionArr")}};e["a"]=i},"3b5a":function(t,e,n){"use strict";n("92ee")},"92ee":function(t,e,n){},c6db:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"app-container"},[n("div",{staticClass:"searchParams"},[n("SearchPanel",{attrs:{forms:t.forms,"show-reset":!0,"show-search-btn":!0},on:{onReset:t.reset,onSearch:t.onSearch},model:{value:t.searchParams,callback:function(e){t.searchParams=e},expression:"searchParams"}})],1),"0"===t.tabIndex?n("el-card",{staticClass:"box-card",attrs:{shadow:"always"}},[n("div",{staticClass:"box-card-inner"},[n("div",[t._v("送礼人数："+t._s(t.sumSource.user_count||0)+"人")]),n("div",[t._v("收礼人数："+t._s(t.sumSource.live_user_count||0)+"人")]),n("div",[t._v("礼物总金额："+t._s(t.sumSource.gift_diamond_total||0)+"钻石")])])]):t._e(),n("tableList",{ref:"tableList",attrs:{cfgs:t.cfgs},on:{saleAmunt:t.saleAmunt}})],1)},r=[],i=n("c7eb"),u=n("1da1"),o=n("5530"),c=n("ca41"),s=n("04a2"),d=n("4053"),m=n("8daa"),l=(n("cf45"),n("2708")),f={mixins:[l["a"]],components:{tableList:d["a"],SearchPanel:s["a"]},data:function(){return{giftNameList:[],poolList:[],sumSource:{}}},computed:{forms:function(){var t=this;return[{name:"user_number",type:"input",value:"",label:"送礼人ID",isNum:!0,linkage:!0,placeholder:"请输入送礼人ID"},{name:"live_user_number",type:"input",value:"",label:"收礼人ID",linkage:!0,placeholder:"请输入收礼人ID"},{name:"gift_id",type:"select",value:"全部",keyName:"gift_id",optionLabel:"gift_name",label:"礼物名称",placeholder:"请选择",options:this.giftNameList},{name:"round",type:"select",value:"全部",keyName:"round_number",optionLabel:"title",label:"活动轮次",placeholder:"请选择",clearable:!0,linkage:!0,options:this.poolList},{name:"dateTimeParams",type:"datePicker",dateType:"datetimerange",format:"yyyy-MM-dd HH:mm:ss",label:"时间选择",value:"",linkage:!0,handler:{change:function(e){t.emptyDateTime(),t.setDateTime(e)},selectChange:function(e,n){t.emptyDateTime()}}}]},cfgs:function(){return{vm:this,url:m["a"].activity.giftLogList,columns:[{label:"时间",width:"180px",prop:"create_time"},{label:"活动轮次",prop:"round"},{label:"送礼人ID",prop:"user_number"},{label:"送礼人昵称",prop:"nickname"},{label:"收礼人ID",prop:"live_user_number"},{label:"收礼人昵称",prop:"live_nickname"},{label:"礼物数量",prop:"gift_num"},{label:"礼物总价值",render:function(t,e){return t("span",e.row.gift_diamond*e.row.gift_num)}}]}}},mounted:function(){this.getPoolNameSource(),this.getRoundSource()},methods:{beforeSearch:function(t){var e=Object(o["a"])(Object(o["a"])({},this.searchParams),this.dateTimeParams);return{page:t.page,pagesize:t.size,start_time:e.start_time?Math.floor(e.start_time/1e3):e.start_time,end_time:e.end_time?Math.floor(e.end_time/1e3):e.end_time,round:-1==e.round||"全部"==e.round?"":e.round,user_number:e.user_number,live_user_number:e.live_user_number,gift_id:-1==e.gift_id||"全部"==e.gift_id?"":e.gift_id}},getList:function(){this.$refs.tableList.getData()},setDateTime:function(t){var e=t?{start_time:t[0],end_time:t[1]}:{};this.$set(this,"dateTimeParams",e)},emptyDateTime:function(){this.dateTimeParams={}},reset:function(){this.searchParams={},this.dateTimeParams={},this.getList()},onSearch:function(){this.getList()},saleAmunt:function(t){this.sumSource=t.data},getPoolNameSource:function(){var t=this;return Object(u["a"])(Object(i["a"])().mark((function e(){var n,a;return Object(i["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(c["h"])();case 2:n=e.sent,2e3==n.code&&(t.giftNameList=n.data.list,a={gift_id:0,gift_name:"全部"},t.giftNameList.unshift(a));case 4:case"end":return e.stop()}}),e)})))()},getRoundSource:function(){var t=this;return Object(u["a"])(Object(i["a"])().mark((function e(){var n,a;return Object(i["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(c["w"])();case 2:n=e.sent,2e3==n.code&&(t.searchParams.round=n.data.round[0].round_number,t.poolList=n.data.round,a={round_number:0,title:"全部"},t.poolList.unshift(a));case 4:case"end":return e.stop()}}),e)})))()}}},p=f,b=(n("3b5a"),n("2877")),h=Object(b["a"])(p,a,r,!1,null,null,null);e["default"]=h.exports},ca41:function(t,e,n){"use strict";n.d(e,"a",(function(){return i})),n.d(e,"d",(function(){return u})),n.d(e,"b",(function(){return o})),n.d(e,"G",(function(){return c})),n.d(e,"o",(function(){return s})),n.d(e,"v",(function(){return d})),n.d(e,"p",(function(){return m})),n.d(e,"x",(function(){return l})),n.d(e,"H",(function(){return f})),n.d(e,"E",(function(){return p})),n.d(e,"q",(function(){return b})),n.d(e,"y",(function(){return h})),n.d(e,"r",(function(){return g})),n.d(e,"z",(function(){return v})),n.d(e,"h",(function(){return _})),n.d(e,"w",(function(){return j})),n.d(e,"k",(function(){return O})),n.d(e,"s",(function(){return y})),n.d(e,"F",(function(){return P})),n.d(e,"A",(function(){return L})),n.d(e,"t",(function(){return S})),n.d(e,"B",(function(){return w})),n.d(e,"i",(function(){return k})),n.d(e,"g",(function(){return N})),n.d(e,"n",(function(){return R})),n.d(e,"m",(function(){return x})),n.d(e,"l",(function(){return D})),n.d(e,"D",(function(){return V})),n.d(e,"f",(function(){return T})),n.d(e,"e",(function(){return A})),n.d(e,"c",(function(){return C})),n.d(e,"j",(function(){return G})),n.d(e,"u",(function(){return I})),n.d(e,"C",(function(){return z}));var a=n("829b"),r=n("8daa");function i(t){return Object(a["a"])({url:r["a"].activity.addResourceConfig,method:"post",data:t})}function u(t){return Object(a["a"])({url:r["a"].activity.editResource,method:"post",data:t})}function o(t){return Object(a["a"])({url:r["a"].activity.delResource,method:"post",data:t})}function c(t){return Object(a["a"])({url:r["a"].activity.posList,method:"post",data:t})}function s(t){return Object(a["a"])({url:r["a"].activity.getPoolName,method:"post",data:t})}function d(t){return Object(a["a"])({url:r["a"].activity.getRound,method:"post",data:t})}function m(t){return Object(a["a"])({url:r["a"].activity.getPoolNameV2,method:"post",data:t})}function l(t){return Object(a["a"])({url:r["a"].activity.getRoundV2,method:"post",data:t})}function f(t){return Object(a["a"])({url:r["a"].activity.sourceType,method:"post",data:t})}function p(t){return Object(a["a"])({url:r["a"].activity.getTraveListDetail,method:"post",data:t})}function b(t){return Object(a["a"])({url:r["a"].activity.getPoolNameV3,method:"post",data:t})}function h(t){return Object(a["a"])({url:r["a"].activity.getRoundV3,method:"post",data:t})}function g(t){return Object(a["a"])({url:r["a"].activity.getPoolNameV4,method:"post",data:t})}function v(t){return Object(a["a"])({url:r["a"].activity.getRoundV4,method:"post",data:t})}function _(t){return Object(a["a"])({url:r["a"].activity.getGiftList,method:"post",data:t})}function j(t){return Object(a["a"])({url:r["a"].activity.getRoundList,method:"post",data:t})}function O(t){return Object(a["a"])({url:r["a"].activity.getLabourGiftList,method:"post",data:t})}function y(t){return Object(a["a"])({url:r["a"].activity.getPoolNameV5,method:"post",data:t})}function P(t){return Object(a["a"])({url:r["a"].activity.luckyConfigV5,method:"post",data:t})}function L(t){return Object(a["a"])({url:r["a"].activity.getRoundV5,method:"post",data:t})}function S(t){return Object(a["a"])({url:r["a"].activity.getPoolNameV520,method:"post",data:t})}function w(t){return Object(a["a"])({url:r["a"].activity.getRoundV520,method:"post",data:t})}function k(t){return Object(a["a"])({url:r["a"].activity.getGiftV520,method:"post",data:t})}function N(t){return Object(a["a"])({url:r["a"].dragonBoat.getGift,method:"post",data:t})}function R(t){return Object(a["a"])({url:r["a"].activity.getPizzaGift,method:"post",data:t})}function x(t){return Object(a["a"])({url:r["a"].monthStar.getRound,method:"post",data:t})}function D(t){return Object(a["a"])({url:r["a"].monthStar.getGift,method:"post",data:t})}function V(t){return Object(a["a"])({url:r["a"].summerSign.getSummerAddUser,method:"post",data:t})}function T(t){return Object(a["a"])({url:r["a"].summerSign.getAuditPass,method:"post",data:t})}function A(t){return Object(a["a"])({url:r["a"].summerSign.getAuditNoPass,method:"post",data:t})}function C(t){return Object(a["a"])({url:r["a"].summerSign.editPowerRanking,method:"post",data:t})}function G(t){return Object(a["a"])({url:r["a"].summerSign.getGift,method:"post",data:t})}function I(t){return Object(a["a"])({url:r["a"].activity.getPoolNameV6,method:"post",data:t})}function z(t){return Object(a["a"])({url:r["a"].activity.getRoundV6,method:"post",data:t})}}}]);