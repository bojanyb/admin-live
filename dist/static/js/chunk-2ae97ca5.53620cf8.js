(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2ae97ca5"],{"1fe8":function(t,e,n){t.exports=n.p+"static/img/error.e53687be.png"},2708:function(t,e,n){"use strict";var a=n("5530"),r=n("2f62"),s={data:function(){return{tabIndex:"0",page:1,size:10,limit:10,searchParams:{},dataParams:{}}},computed:Object(a["a"])({},Object(r["c"])({permissionArr:function(t){return t.permission.permissionArr}})),mounted:function(){console.log(this.permissionArr,"permissionArr")}};e["a"]=s},4480:function(t,e,n){"use strict";n("f557")},"9b62":function(t,e,n){"use strict";n.d(e,"f",(function(){return s})),n.d(e,"n",(function(){return i})),n.d(e,"p",(function(){return c})),n.d(e,"c",(function(){return o})),n.d(e,"l",(function(){return u})),n.d(e,"a",(function(){return d})),n.d(e,"d",(function(){return l})),n.d(e,"o",(function(){return h})),n.d(e,"k",(function(){return m})),n.d(e,"h",(function(){return f})),n.d(e,"j",(function(){return p})),n.d(e,"q",(function(){return b})),n.d(e,"i",(function(){return y})),n.d(e,"b",(function(){return g})),n.d(e,"m",(function(){return k})),n.d(e,"e",(function(){return v})),n.d(e,"g",(function(){return w}));var a=n("829b"),r=n("8daa");function s(t){return Object(a["a"])({url:r["a"].risk.coverCheck,method:"post",data:t})}function i(t){return Object(a["a"])({url:r["a"].risk.save,method:"post",data:t})}function c(t){return Object(a["a"])({url:r["a"].risk.softDelete,method:"post",data:t})}function o(t){return Object(a["a"])({url:r["a"].risk.add,method:"post",data:t})}function u(t){return Object(a["a"])({url:r["a"].risk.review,method:"post",data:t})}function d(t){return Object(a["a"])({url:r["a"].risk.UserPunishLog,method:"post",data:t})}function l(t){return Object(a["a"])({url:r["a"].risk.addUserPunish,method:"post",data:t})}function h(t){return Object(a["a"])({url:r["a"].risk.saveUserPunish,method:"post",data:t})}function m(t){return Object(a["a"])({url:r["a"].risk.removeUserPunish,method:"post",data:t})}function f(t){return Object(a["a"])({url:r["a"].risk.passUserPunish,method:"post",data:t})}function p(t){return Object(a["a"])({url:r["a"].risk.punishStatus,method:"post",data:t})}function b(t){return Object(a["a"])({url:r["a"].risk.updateSource,method:"post",data:t})}function y(t){return Object(a["a"])({url:r["a"].risk.punishOperateLog,method:"post",data:t})}function g(t){return Object(a["a"])({url:r["a"].risk.acceptPunish,method:"post",data:t})}function k(t){return Object(a["a"])({url:r["a"].risk.roomTalkList,method:"post",data:t})}function v(t){return Object(a["a"])({url:r["a"].risk.chatTalkList,method:"post",data:t})}function w(t){return Object(a["a"])({url:r["a"].risk.audioStreamDefyListExport,method:"post",data:t})}},d7b7:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"serviceConfig-message-history-box"},[n("div",{staticClass:"searchParams"},[n("SearchPanel",{attrs:{forms:t.forms,"show-search-btn":!0,"show-reset":!0,showYesterday:!0,showBeforeYesterday:!0,showToday:!0,showBatchPass:!0,showBatchRurn:!0,batchFuncName:"一键通过",batchRurnName:"一键拒绝"},on:{batchPass:t.batchPass,BatchRurn:t.BatchRurn,onSearch:t.onSearch,onReset:t.reset,yesterday:t.yesterday,beforeYesterday:t.beforeYesterday,today:t.today},model:{value:t.searchParams,callback:function(e){t.searchParams=e},expression:"searchParams"}})],1),n("tableList",{ref:"tableList",attrs:{cfgs:t.cfgs},on:{selectionChange:t.selectionChange}})],1)},r=[],s=n("c7eb"),i=n("1da1"),c=n("5530"),o=(n("7db0"),n("d3b7"),n("b0c0"),n("159b"),n("14d9"),n("9b62")),u=n("04a2"),d=n("4053"),l=n("8daa"),h=n("cf45"),m=n("2708"),f=n("279a"),p={mixins:[m["a"]],components:{SearchPanel:u["a"],tableList:d["a"]},data:function(){return{searchParams:{dateTimeParams:[],rel_type:4,status:2},dateTimeParams:{start_time:null,end_time:null},selectList:[],ids:[]}},computed:{forms:function(){var t=this;return[{name:"inputSelect",value:"",selectName:"iSelect",type:"inputSelect",placeholder:"请输入",selectPlaceholder:"请选择",selctValue:"user_id",selectWidth:"130px",label:"",handler:{change:function(t){}},options:[{key:"user_id",label:"用户ID"},{key:"room_id",label:"房间ID"}]},{name:"rel_type",type:"select",value:4,keyName:"value",optionLabel:"name",label:"图片类型",placeholder:"请选择",options:f["a"].RISKMANAGEMENTIMGTYPELIST},{name:"status",type:"select",value:2,keyName:"value",optionLabel:"name",label:"审核状态",placeholder:"请选择",options:f["a"].RISKMANAGEMENTIMGSTATUSLIST},{name:"dateTimeParams",type:"datePicker",dateType:"datetimerange",format:"yyyy-MM-dd HH:mm:ss",label:"时间选择",value:"",handler:{change:function(e){t.emptyDateTime(),t.setDateTime(e)},selectChange:function(e,n){t.emptyDateTime()}}}]},cfgs:function(){var t=this;return{vm:this,isShowCheckbox:!0,url:l["a"].risk.screenImgLog,columns:[{label:"时间",render:function(t,e){return t("span",e.row.create_time||"无")}},{label:"用户ID",render:function(t,e){return t("div",e.row.user_number||"无")}},{label:"用户昵称",render:function(t,e){return t("div",e.row.user_nickname||"无")}},{label:"房间ID",render:function(t,e){return t("div",e.row.room_number||"无")}},{label:"图片类型",render:function(t,e){var n=f["a"].RISKMANAGEMENTIMGTYPELIST.find((function(t){return t.value===e.row.rel_type}));return t("div",n?n.name:"无")}},{label:"图片",isimgList:!0,prop:"img_path",type:1,imgWidth:"50px",imgHeight:"50px",minWidth:"150px"},{label:"审核状态",render:function(t,e){var n=f["a"].RISKMANAGEMENTIMGSTATUSLIST.find((function(t){return t.value===e.row.status}));return t("div",n?n.name:"无")}},{label:"操作",render:function(e,n){return e("div",[e("el-button",{props:{type:"primary"},style:{display:0===n.row.status?"unset":"none"},on:{click:function(){t.func(n.row.id,1,"通过",1)}}},"通过"),e("el-button",{props:{type:"danger"},style:{display:0===n.row.status?"unset":"none"},on:{click:function(){t.func(n.row.id,-1,"拒绝",1)}}},"拒绝"),e("el-button",{props:{type:"success"},style:{display:1===n.row.status?"unset":"none"},on:{click:function(){}}},"已通过"),e("el-button",{props:{type:"danger"},style:{display:-1===n.row.status?"unset":"none"},on:{click:function(){}}},"已拒绝")])}}]}}},methods:{today:function(){this.changeIndex(0),this.getList()},yesterday:function(){this.changeIndex(1),this.getList()},beforeYesterday:function(){this.changeIndex(2),this.getList()},changeIndex:function(t){var e,n,a,r,s=new Date;switch(t){case 0:n=Object(h["h"])(s,"YYYY-MM-DD",!1),e=Object(h["h"])(s,"YYYY-MM-DD",!1);break;case 1:n=Object(h["h"])(s-864e5,"YYYY-MM-DD",!1),e=Object(h["h"])(s-864e5,"YYYY-MM-DD",!1);break;case 2:n=Object(h["h"])(s-1728e5,"YYYY-MM-DD",!1),e=Object(h["h"])(s-1728e5,"YYYY-MM-DD",!1);break}a=new Date(e+" 00:00:00"),r=new Date(n+" 23:59:59");var i=[a.getTime(),r.getTime()];this.searchParams.dateTimeParams=i,this.dateTimeParams.start_time=i[0],this.dateTimeParams.end_time=i[1]},beforeSearch:function(t){var e=Object(c["a"])(Object(c["a"])({},this.searchParams),this.dateTimeParams),n={page:t.page,pagesize:t.size,start_time:e.start_time?Math.floor(e.start_time/1e3):"",end_time:e.end_time?Math.floor(e.end_time/1e3):"",status:e.status,rel_type:e.rel_type};return"user_id"===e.iSelect?n.user_number=e.inputSelect:"room_id"===e.iSelect&&(n.room_number=e.inputSelect),n},getList:function(){this.$refs.tableList&&this.$refs.tableList.getData()},setDateTime:function(t){var e=t?{start_time:t[0],end_time:t[1]}:{};this.$set(this,"dateTimeParams",e)},emptyDateTime:function(){this.dateTimeParams={}},reset:function(){this.searchParams={rel_type:4,status:2},this.dateTimeParams={},this.changeIndex(0),this.getList()},onSearch:function(){this.getList()},destoryComp:function(){this.isDestoryComp=!1},func:function(t,e,n,a){var r=this;return Object(i["a"])(Object(s["a"])().mark((function c(){return Object(s["a"])().wrap((function(c){while(1)switch(c.prev=c.next){case 0:r.$confirm("是否确认".concat(n,"?"),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(i["a"])(Object(s["a"])().mark((function i(){var c,u;return Object(s["a"])().wrap((function(s){while(1)switch(s.prev=s.next){case 0:return c={ids:1==a?[t]:t,status:e},s.next=3,Object(o["l"])(c);case 3:u=s.sent,2e3===u.code&&(r.$success(n+"成功"),r.getList());case 5:case"end":return s.stop()}}),i)})))).catch((function(){}));case 1:case"end":return c.stop()}}),c)})))()},selectionChange:function(t){this.selectList=t;var e=[];this.selectList.forEach((function(t){0==t.status&&e.push(t.id)})),this.ids=e},batchPass:function(){0!=this.selectList.length&&0!=this.ids.length?this.func(this.ids,1,"一键通过",2):this.$error("请先选择待审核数据")},BatchRurn:function(){0!=this.selectList.length&&0!=this.ids.length?this.func(this.ids,-1,"一键拒绝",2):this.$error("请先选择待审核数据")}},created:function(){this.changeIndex(0)}},b=p,y=(n("4480"),n("2877")),g=Object(y["a"])(b,a,r,!1,null,null,null);e["default"]=g.exports},f557:function(t,e,n){}}]);