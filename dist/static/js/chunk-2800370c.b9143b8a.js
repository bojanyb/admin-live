(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2800370c"],{"09f4":function(t,e,n){"use strict";n.d(e,"a",(function(){return u})),Math.easeInOutQuad=function(t,e,n,a){return t/=a/2,t<1?n/2*t*t+e:(t--,-n/2*(t*(t-2)-1)+e)};var a=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)}}();function r(t){document.documentElement.scrollTop=t,document.body.parentNode.scrollTop=t,document.body.scrollTop=t}function o(){return document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop}function u(t,e,n){var u=o(),i=t-u,c=20,s=0;e="undefined"===typeof e?500:e;var l=function t(){s+=c;var o=Math.easeInOutQuad(s,u,i,e);r(o),s<e?a(t):n&&"function"===typeof n&&n()};l()}},"15a0":function(t,e,n){"use strict";n("8279")},"1fe8":function(t,e,n){t.exports=n.p+"static/img/error.e53687be.png"},2708:function(t,e,n){"use strict";var a=n("5530"),r=n("2f62"),o={data:function(){return{tabIndex:"0",page:1,size:10,limit:10,searchParams:{},dataParams:{}}},computed:Object(a["a"])({},Object(r["c"])({permissionArr:function(t){return t.permission.permissionArr}})),mounted:function(){console.log(this.permissionArr,"permissionArr")}};e["a"]=o},8279:function(t,e,n){},a9fe:function(t,e,n){"use strict";n("abcd")},abcd:function(t,e,n){},b1b2:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"banner-box"},[n("div",{staticClass:"searchParams"},[n("SearchPanel",{attrs:{forms:t.forms,"show-reset":!0,"show-search-btn":!0},on:{onReset:t.reset,onSearch:t.onSearch},model:{value:t.searchParams,callback:function(e){t.searchParams=e},expression:"searchParams"}})],1),"0"===t.tabIndex?n("el-card",{staticClass:"box-card",attrs:{shadow:"always"}},[n("div",{staticClass:"box-card-inner"},[n("div",[t._v("到达景点旅行团："+t._s(t.sumSource.group_count||0)+"个")]),n("div",[t._v("旅行团总人数："+t._s(t.sumSource.users_count||0)+"人")]),n("div",[t._v("打卡人数："+t._s(t.sumSource.check_count||0)+"人")]),n("div",[t._v("总里程值："+t._s(t.sumSource.level_value_count||0))]),n("div",[t._v("总流水："+t._s(t.sumSource.money_count||0))])])]):t._e(),n("div",{staticClass:"tableList"},[n("tableList",{ref:"tableList",attrs:{cfgs:t.cfgs},on:{saleAmunt:t.saleAmunt}})],1),n("lookComp",{ref:"lookComp"})],1)},r=[],o=n("5530"),u=(n("7db0"),n("d3b7"),n("b0c0"),n("4053")),i=n("04a2"),c=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"guildReportComp-box"},[n("el-dialog",{attrs:{visible:t.dialogVisible,width:"800px","close-on-click-modal":!1,"before-close":t.handleClose},on:{"update:visible":function(e){t.dialogVisible=e},closed:t.closed}},[n("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData}},[n("el-table-column",{attrs:{prop:"user_number",label:"团员ID",align:"center"}}),n("el-table-column",{attrs:{prop:"nickname",label:"团员昵称",align:"center"}}),n("el-table-column",{attrs:{prop:"level_value",label:"里程值",align:"center"}}),n("el-table-column",{attrs:{prop:"money_count",label:"总流水",align:"center"}})],1)],1)],1)},s=[],l=n("c7eb"),d=n("1da1"),m=n("ca41"),f=n("333d"),p={components:{Pagination:f["a"]},data:function(){return{dialogVisible:!1,tableData:[],lookTotal:0,lookPage:{page:1,pagesize:10}}},methods:{handleClose:function(){this.dialogVisible=!1},load:function(t){var e=this;return Object(d["a"])(Object(l["a"])().mark((function n(){var a;return Object(l["a"])().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return e.dialogVisible=!0,n.next=3,Object(m["E"])(Object(o["a"])(Object(o["a"])({},e.lookPage),{},{group_id:t.id||""}));case 3:a=n.sent,e.tableData=a.data||[];case 5:case"end":return n.stop()}}),n)})))()},closed:function(){this.$emit("destoryComp")}}},b=p,h=(n("a9fe"),n("2877")),v=Object(h["a"])(b,c,s,!1,null,null,null),g=v.exports,y=n("2708"),_=n("8daa"),O=n("cf45"),j={components:{tableList:u["a"],SearchPanel:i["a"],lookComp:g},mixins:[y["a"]],computed:{forms:function(){var t=this;return[{name:"group_id",type:"input",value:"",label:"旅行团ID",isNum:!0,placeholder:"请输入用户ID"},{name:"user_number",type:"input",value:"",label:"团长ID",isNum:!0,placeholder:"请输入团长ID"},{name:"level_id",type:"select",value:null,keyName:"value",optionLabel:"name",label:"到达景点",placeholder:"请选择到达景点",clearable:!0,options:this.sourceType},{name:"dateTimeParams",type:"datePicker",dateType:"datetimerange",format:"yyyy-MM-dd HH:mm:ss",label:"时间选择",value:"",linkage:!0,handler:{change:function(e){t.emptyDateTime(),t.setDateTime(e)},selectChange:function(e,n){t.emptyDateTime()}}}]},cfgs:function(){var t=this;return{vm:this,url:_["a"].activity.getTraveList,columns:[{label:"时间",render:function(t,e){return t("span",e.row.create_time?Object(O["h"])(e.row.create_time,"YYYY/MM/DD HH:mm:ss",!0):"--")}},{label:"团长ID",prop:"user_number"},{label:"团长昵称",prop:"nickname"},{label:"旅行团ID",prop:"id"},{label:"旅行团名称",prop:"group_name"},{label:"到达景点",prop:"level_id",render:function(e,n){var a=t.sourceType.find((function(t){return t.value===n.row.level_id}));return e("span",a?a.name:"未到达")}},{label:"团队人数",prop:"member"},{label:"打卡人数",prop:"check_count"},{label:"旅行团里程值",prop:"level_value"},{label:"流水",prop:"money_count"},{label:"旅行团明细",render:function(e,n){return e("div",[e("el-button",{props:{type:"primary"},on:{click:function(){t.see(n.row)}}},"查看")])}}]}}},data:function(){return{sumSource:{user_count:0,exchange_count:0,fu_value:0,gift_value:0,profit_value:0},ruleForm:{alreadyMoney:null,deductMoney:null},msg_id:"",sourceType:[{name:"亚洲泰姬陵",value:1},{name:"欧洲埃尔非铁塔",value:2},{name:"非洲埃及金字塔",value:3},{name:"北美洲自由女神",value:4},{name:"南美洲智利复活节",value:5},{name:"大洋洲悉尼歌剧院",value:6},{name:"南极洲南极长城站",value:7},{name:"亚洲北京天坛",value:8}]}},methods:{getList:function(){this.$refs.tableList.getData()},beforeSearch:function(t){var e=Object(o["a"])(Object(o["a"])({},this.searchParams),this.dateTimeParams);return console.log("🚀 ~ file: travel-scenic-data.vue:224 ~ beforeSearch ~ s",e),{page:t?t.page:null,pagesize:10,start_time:e.start_time?Math.floor(e.start_time/1e3):e.start_time,end_time:e.end_time?Math.floor(e.end_time/1e3):e.end_time,group_id:e.group_id,user_number:e.user_number,level_id:e.level_id}},setDateTime:function(t){var e=t?{start_time:t[0],end_time:t[1]}:{};this.$set(this,"dateTimeParams",e)},emptyDateTime:function(){this.dateTimeParams={}},reset:function(){this.searchParams={},this.dateTimeParams={},this.getList()},onSearch:function(){this.getList()},saleAmunt:function(t){this.sumSource=t.data},see:function(t){this.$refs.lookComp.dialogVisible=!0,this.load(t)},load:function(t,e){var n=this;setTimeout((function(){n.$refs.lookComp.load(t,e)}),100)}}},w=j,P=(n("15a0"),Object(h["a"])(w,a,r,!1,null,null,null));e["default"]=P.exports},ca41:function(t,e,n){"use strict";n.d(e,"a",(function(){return o})),n.d(e,"d",(function(){return u})),n.d(e,"b",(function(){return i})),n.d(e,"G",(function(){return c})),n.d(e,"o",(function(){return s})),n.d(e,"v",(function(){return l})),n.d(e,"p",(function(){return d})),n.d(e,"x",(function(){return m})),n.d(e,"H",(function(){return f})),n.d(e,"E",(function(){return p})),n.d(e,"q",(function(){return b})),n.d(e,"y",(function(){return h})),n.d(e,"r",(function(){return v})),n.d(e,"z",(function(){return g})),n.d(e,"h",(function(){return y})),n.d(e,"w",(function(){return _})),n.d(e,"k",(function(){return O})),n.d(e,"s",(function(){return j})),n.d(e,"A",(function(){return w})),n.d(e,"F",(function(){return P})),n.d(e,"t",(function(){return k})),n.d(e,"B",(function(){return T})),n.d(e,"i",(function(){return S})),n.d(e,"g",(function(){return D})),n.d(e,"n",(function(){return V})),n.d(e,"m",(function(){return C})),n.d(e,"l",(function(){return R})),n.d(e,"D",(function(){return x})),n.d(e,"f",(function(){return L})),n.d(e,"e",(function(){return A})),n.d(e,"u",(function(){return N})),n.d(e,"c",(function(){return I})),n.d(e,"j",(function(){return M})),n.d(e,"C",(function(){return G}));var a=n("829b"),r=n("8daa");function o(t){return Object(a["a"])({url:r["a"].activity.addResourceConfig,method:"post",data:t})}function u(t){return Object(a["a"])({url:r["a"].activity.editResource,method:"post",data:t})}function i(t){return Object(a["a"])({url:r["a"].activity.delResource,method:"post",data:t})}function c(t){return Object(a["a"])({url:r["a"].activity.posList,method:"post",data:t})}function s(t){return Object(a["a"])({url:r["a"].activity.getPoolName,method:"post",data:t})}function l(t){return Object(a["a"])({url:r["a"].activity.getRound,method:"post",data:t})}function d(t){return Object(a["a"])({url:r["a"].activity.getPoolNameV2,method:"post",data:t})}function m(t){return Object(a["a"])({url:r["a"].activity.getRoundV2,method:"post",data:t})}function f(t){return Object(a["a"])({url:r["a"].activity.sourceType,method:"post",data:t})}function p(t){return Object(a["a"])({url:r["a"].activity.getTraveListDetail,method:"post",data:t})}function b(t){return Object(a["a"])({url:r["a"].activity.getPoolNameV3,method:"post",data:t})}function h(t){return Object(a["a"])({url:r["a"].activity.getRoundV3,method:"post",data:t})}function v(t){return Object(a["a"])({url:r["a"].activity.getPoolNameV4,method:"post",data:t})}function g(t){return Object(a["a"])({url:r["a"].activity.getRoundV4,method:"post",data:t})}function y(t){return Object(a["a"])({url:r["a"].activity.getGiftList,method:"post",data:t})}function _(t){return Object(a["a"])({url:r["a"].activity.getRoundList,method:"post",data:t})}function O(t){return Object(a["a"])({url:r["a"].activity.getLabourGiftList,method:"post",data:t})}function j(t){return Object(a["a"])({url:r["a"].activity.getPoolNameV5,method:"post",data:t})}function w(t){return Object(a["a"])({url:r["a"].activity.getRoundV5,method:"post",data:t})}function P(t){return Object(a["a"])({url:r["a"].activity.luckyConfigV5,method:"post",data:t})}function k(t){return Object(a["a"])({url:r["a"].activity.getPoolNameV520,method:"post",data:t})}function T(t){return Object(a["a"])({url:r["a"].activity.getRoundV520,method:"post",data:t})}function S(t){return Object(a["a"])({url:r["a"].activity.getGiftV520,method:"post",data:t})}function D(t){return Object(a["a"])({url:r["a"].dragonBoat.getGift,method:"post",data:t})}function V(t){return Object(a["a"])({url:r["a"].activity.getPizzaGift,method:"post",data:t})}function C(t){return Object(a["a"])({url:r["a"].monthStar.getRound,method:"post",data:t})}function R(t){return Object(a["a"])({url:r["a"].monthStar.getGift,method:"post",data:t})}function x(t){return Object(a["a"])({url:r["a"].summerSign.getSummerAddUser,method:"post",data:t})}function L(t){return Object(a["a"])({url:r["a"].summerSign.getAuditPass,method:"post",data:t})}function A(t){return Object(a["a"])({url:r["a"].summerSign.getAuditNoPass,method:"post",data:t})}function N(t){return Object(a["a"])({url:r["a"].activity.getPoolNameV6,method:"post",data:t})}function I(t){return Object(a["a"])({url:r["a"].summerSign.editPowerRanking,method:"post",data:t})}function M(t){return Object(a["a"])({url:r["a"].summerSign.getGift,method:"post",data:t})}function G(t){return Object(a["a"])({url:r["a"].activity.getRoundV6,method:"post",data:t})}}}]);