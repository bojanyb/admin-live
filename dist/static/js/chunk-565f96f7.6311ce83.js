(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-565f96f7"],{"17f2":function(t,e,n){"use strict";n("c19f")},"1fe8":function(t,e,n){t.exports=n.p+"static/img/error.e53687be.png"},2708:function(t,e,n){"use strict";var a=n("4672"),r=n("52c1"),o={data:function(){return{tabIndex:"0",page:1,size:10,limit:10,searchParams:{},dataParams:{}}},computed:Object(a["a"])({},Object(r["c"])({permissionArr:function(t){return t.permission.permissionArr}})),mounted:function(){console.log(this.permissionArr,"permissionArr")}};e["a"]=o},a357:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"app-container"},[n("div",{staticClass:"searchParams"},[n("SearchPanel",{attrs:{forms:t.forms,"show-reset":!0,"show-search-btn":!0},on:{onReset:t.reset,onSearch:t.onSearch},model:{value:t.searchParams,callback:function(e){t.searchParams=e},expression:"searchParams"}})],1),"0"===t.tabIndex?n("el-card",{staticClass:"box-card",attrs:{shadow:"always"}},[n("div",{staticClass:"box-card-inner"},[n("div",[t._v("抽奖人数："+t._s(t.sumSource.user_count||0)+"人")]),n("div",[t._v("抽奖次数："+t._s(t.sumSource.lottery_count||0)+"次")]),n("div",[t._v("消费金额："+t._s(t.sumSource.lottery_cost_count||0)+"钻石")]),n("div",[t._v("产出金额："+t._s(t.sumSource.lottery_output_count||0)+"钻石")]),n("div",[t._v("利润值："+t._s(t.sumSource.profit_value||0)+"钻石")]),n("div",[t._v("产出比："+t._s(t.sumSource.profit_margin||0)+"%")])])]):t._e(),n("tableList",{ref:"tableList",attrs:{cfgs:t.cfgs},on:{saleAmunt:t.saleAmunt}})],1)},r=[],o=n("40bd"),i=n("7e8c"),u=n("4672"),c=n("ca41"),s=n("04a2"),d=n("4053"),l=n("8daa"),m=n("2708"),f=n("cf45"),p={mixins:[m["a"]],components:{tableList:d["a"],SearchPanel:s["a"]},data:function(){return{giftNameList:[{id:0,title:"全部"},{id:1,title:"礼物"},{id:2,title:"抽奖道具"}],lotteryTypeList:[],roundList:[],sumSource:{}}},computed:{forms:function(){var t=this;return[{name:"user_number",type:"input",value:"",label:"用户ID",isNum:!0,linkage:!0,placeholder:"请输入用户ID"},{name:"remark",type:"input",value:"",label:"奖品名称",linkage:!0,placeholder:"请输入奖品名称"},{name:"gift_type",type:"select",value:"全部",keyName:"id",optionLabel:"title",label:"奖品类型",placeholder:"请选择",options:this.giftNameList,clearable:!0},{name:"type",type:"select",value:"",keyName:"key",optionLabel:"value",label:"奖池类型",placeholder:"请选择",options:this.lotteryTypeList,clearable:!0,linkage:!0,handler:{change:function(e){t.getRoundSource(e)}}},{name:"round",type:"select",value:"全部",keyName:"round_number",optionLabel:"title",label:"奖池轮次",placeholder:"请选择",options:this.roundList,clearable:!0},{name:"dateTimeParams",type:"datePicker",dateType:"datetimerange",format:"yyyy-MM-dd HH:mm:ss",label:"时间选择",value:"",linkage:!0,handler:{change:function(e){t.emptyDateTime(),t.setDateTime(e)},selectChange:function(e,n){t.emptyDateTime()}}}]},cfgs:function(){return{vm:this,url:l["a"].activity.poolDetailV5,columns:[{label:"时间",width:"180px",render:function(t,e){var n=""!==e.row.create_time?Object(f["h"])(1e3*e.row.create_time):"--";return t("span",n||"--")}},{label:"用户ID",prop:"user_number"},{label:"用户昵称",prop:"nickname"},{label:"奖品类型",prop:"type_desc"},{label:"奖品ID",prop:"gift_id"},{label:"奖品名称",prop:"remark"},{label:"抽奖消耗",prop:"lottery_cost"},{label:"奖品价值",prop:"gift_diamond"},{label:"利润值",render:function(t,e){return t("span",e.row.profit)}}]}}},mounted:function(){this.getPoolNameSource(),this.getRoundSource()},methods:{beforeSearch:function(t){var e=Object(u["a"])(Object(u["a"])({},this.searchParams),this.dateTimeParams);return{page:t.page,pagesize:t.size,start_time:e.start_time?Math.floor(e.start_time/1e3):e.start_time,end_time:e.end_time?Math.floor(e.end_time/1e3):e.end_time,user_number:e.user_number,remark:e.remark,gift_type:0==e.gift_type||"全部"==e.gift_type?"":e.gift_type,type:0==e.type||"全部"==e.type?"":e.type,round:0==e.round||"全部"==e.round?"":e.round}},getList:function(){this.$refs.tableList.getData()},setDateTime:function(t){var e=t?{start_time:t[0],end_time:t[1]}:{};this.$set(this,"dateTimeParams",e)},emptyDateTime:function(){this.dateTimeParams={}},reset:function(){this.searchParams={},this.dateTimeParams={},this.getList()},onSearch:function(){this.getList()},saleAmunt:function(t){this.sumSource=t.data},getPoolNameSource:function(){var t=this;return Object(i["a"])(Object(o["a"])().mark((function e(){var n,a;return Object(o["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(c["s"])();case 2:n=e.sent,2e3==n.code&&(t.lotteryTypeList=n.data.pool,a={key:0,value:"全部"},t.lotteryTypeList.unshift(a));case 4:case"end":return e.stop()}}),e)})))()},getRoundSource:function(t){var e=this;return Object(i["a"])(Object(o["a"])().mark((function n(){var a,r,i;return Object(o["a"])().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return a={},t&&(a.type=t),n.next=4,Object(c["A"])(a);case 4:r=n.sent,2e3==r.code&&(e.roundList=r.data.round,t||(i={round_number:0,title:"全部"},e.roundList.unshift(i)));case 6:case"end":return n.stop()}}),n)})))()}}},h=p,b=(n("17f2"),n("e607")),g=Object(b["a"])(h,a,r,!1,null,null,null);e["default"]=g.exports},c19f:function(t,e,n){},ca41:function(t,e,n){"use strict";n.d(e,"a",(function(){return o})),n.d(e,"d",(function(){return i})),n.d(e,"b",(function(){return u})),n.d(e,"G",(function(){return c})),n.d(e,"o",(function(){return s})),n.d(e,"v",(function(){return d})),n.d(e,"p",(function(){return l})),n.d(e,"x",(function(){return m})),n.d(e,"H",(function(){return f})),n.d(e,"E",(function(){return p})),n.d(e,"q",(function(){return h})),n.d(e,"y",(function(){return b})),n.d(e,"r",(function(){return g})),n.d(e,"z",(function(){return y})),n.d(e,"h",(function(){return v})),n.d(e,"w",(function(){return _})),n.d(e,"k",(function(){return j})),n.d(e,"s",(function(){return O})),n.d(e,"A",(function(){return P})),n.d(e,"F",(function(){return S})),n.d(e,"t",(function(){return L})),n.d(e,"B",(function(){return k})),n.d(e,"i",(function(){return w})),n.d(e,"g",(function(){return R})),n.d(e,"n",(function(){return T})),n.d(e,"m",(function(){return N})),n.d(e,"l",(function(){return V})),n.d(e,"D",(function(){return x})),n.d(e,"f",(function(){return D})),n.d(e,"e",(function(){return A})),n.d(e,"u",(function(){return C})),n.d(e,"c",(function(){return G})),n.d(e,"j",(function(){return z})),n.d(e,"C",(function(){return I}));var a=n("829b"),r=n("8daa");function o(t){return Object(a["a"])({url:r["a"].activity.addResourceConfig,method:"post",data:t})}function i(t){return Object(a["a"])({url:r["a"].activity.editResource,method:"post",data:t})}function u(t){return Object(a["a"])({url:r["a"].activity.delResource,method:"post",data:t})}function c(t){return Object(a["a"])({url:r["a"].activity.posList,method:"post",data:t})}function s(t){return Object(a["a"])({url:r["a"].activity.getPoolName,method:"post",data:t})}function d(t){return Object(a["a"])({url:r["a"].activity.getRound,method:"post",data:t})}function l(t){return Object(a["a"])({url:r["a"].activity.getPoolNameV2,method:"post",data:t})}function m(t){return Object(a["a"])({url:r["a"].activity.getRoundV2,method:"post",data:t})}function f(t){return Object(a["a"])({url:r["a"].activity.sourceType,method:"post",data:t})}function p(t){return Object(a["a"])({url:r["a"].activity.getTraveListDetail,method:"post",data:t})}function h(t){return Object(a["a"])({url:r["a"].activity.getPoolNameV3,method:"post",data:t})}function b(t){return Object(a["a"])({url:r["a"].activity.getRoundV3,method:"post",data:t})}function g(t){return Object(a["a"])({url:r["a"].activity.getPoolNameV4,method:"post",data:t})}function y(t){return Object(a["a"])({url:r["a"].activity.getRoundV4,method:"post",data:t})}function v(t){return Object(a["a"])({url:r["a"].activity.getGiftList,method:"post",data:t})}function _(t){return Object(a["a"])({url:r["a"].activity.getRoundList,method:"post",data:t})}function j(t){return Object(a["a"])({url:r["a"].activity.getLabourGiftList,method:"post",data:t})}function O(t){return Object(a["a"])({url:r["a"].activity.getPoolNameV5,method:"post",data:t})}function P(t){return Object(a["a"])({url:r["a"].activity.getRoundV5,method:"post",data:t})}function S(t){return Object(a["a"])({url:r["a"].activity.luckyConfigV5,method:"post",data:t})}function L(t){return Object(a["a"])({url:r["a"].activity.getPoolNameV520,method:"post",data:t})}function k(t){return Object(a["a"])({url:r["a"].activity.getRoundV520,method:"post",data:t})}function w(t){return Object(a["a"])({url:r["a"].activity.getGiftV520,method:"post",data:t})}function R(t){return Object(a["a"])({url:r["a"].dragonBoat.getGift,method:"post",data:t})}function T(t){return Object(a["a"])({url:r["a"].activity.getPizzaGift,method:"post",data:t})}function N(t){return Object(a["a"])({url:r["a"].monthStar.getRound,method:"post",data:t})}function V(t){return Object(a["a"])({url:r["a"].monthStar.getGift,method:"post",data:t})}function x(t){return Object(a["a"])({url:r["a"].summerSign.getSummerAddUser,method:"post",data:t})}function D(t){return Object(a["a"])({url:r["a"].summerSign.getAuditPass,method:"post",data:t})}function A(t){return Object(a["a"])({url:r["a"].summerSign.getAuditNoPass,method:"post",data:t})}function C(t){return Object(a["a"])({url:r["a"].activity.getPoolNameV6,method:"post",data:t})}function G(t){return Object(a["a"])({url:r["a"].summerSign.editPowerRanking,method:"post",data:t})}function z(t){return Object(a["a"])({url:r["a"].summerSign.getGift,method:"post",data:t})}function I(t){return Object(a["a"])({url:r["a"].activity.getRoundV6,method:"post",data:t})}}}]);