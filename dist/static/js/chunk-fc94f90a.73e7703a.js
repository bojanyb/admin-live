(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-fc94f90a"],{"1fe8":function(e,t,n){e.exports=n.p+"static/img/error.e53687be.png"},2708:function(e,t,n){"use strict";var a=n("5530"),r=n("2f62"),s={data:function(){return{tabIndex:"0",page:1,size:10,limit:10,searchParams:{},dataParams:{}}},computed:Object(a["a"])({},Object(r["c"])({permissionArr:function(e){return e.permission.permissionArr}})),mounted:function(){console.log(this.permissionArr,"permissionArr")}};t["a"]=s},4370:function(e,t,n){},8322:function(e,t,n){"use strict";n("4370")},"9b62":function(e,t,n){"use strict";n.d(t,"f",(function(){return s})),n.d(t,"o",(function(){return i})),n.d(t,"q",(function(){return c})),n.d(t,"c",(function(){return o})),n.d(t,"m",(function(){return u})),n.d(t,"g",(function(){return d})),n.d(t,"a",(function(){return l})),n.d(t,"d",(function(){return h})),n.d(t,"p",(function(){return m})),n.d(t,"l",(function(){return f})),n.d(t,"i",(function(){return p})),n.d(t,"k",(function(){return b})),n.d(t,"r",(function(){return y})),n.d(t,"j",(function(){return g})),n.d(t,"b",(function(){return v})),n.d(t,"n",(function(){return k})),n.d(t,"e",(function(){return j})),n.d(t,"h",(function(){return w}));var a=n("829b"),r=n("8daa");function s(e){return Object(a["a"])({url:r["a"].risk.coverCheck,method:"post",data:e})}function i(e){return Object(a["a"])({url:r["a"].risk.save,method:"post",data:e})}function c(e){return Object(a["a"])({url:r["a"].risk.softDelete,method:"post",data:e})}function o(e){return Object(a["a"])({url:r["a"].risk.add,method:"post",data:e})}function u(e){return Object(a["a"])({url:r["a"].risk.review,method:"post",data:e})}function d(e){return Object(a["a"])({url:r["a"].risk.customerServiceList,method:"post",data:e})}function l(e){return Object(a["a"])({url:r["a"].risk.UserPunishLog,method:"post",data:e})}function h(e){return Object(a["a"])({url:r["a"].risk.addUserPunish,method:"post",data:e})}function m(e){return Object(a["a"])({url:r["a"].risk.saveUserPunish,method:"post",data:e})}function f(e){return Object(a["a"])({url:r["a"].risk.removeUserPunish,method:"post",data:e})}function p(e){return Object(a["a"])({url:r["a"].risk.passUserPunish,method:"post",data:e})}function b(e){return Object(a["a"])({url:r["a"].risk.punishStatus,method:"post",data:e})}function y(e){return Object(a["a"])({url:r["a"].risk.updateSource,method:"post",data:e})}function g(e){return Object(a["a"])({url:r["a"].risk.punishOperateLog,method:"post",data:e})}function v(e){return Object(a["a"])({url:r["a"].risk.acceptPunish,method:"post",data:e})}function k(e){return Object(a["a"])({url:r["a"].risk.roomTalkList,method:"post",data:e})}function j(e){return Object(a["a"])({url:r["a"].risk.chatTalkList,method:"post",data:e})}function w(e){return Object(a["a"])({url:r["a"].risk.audioStreamDefyListExport,method:"post",data:e})}},d7b7:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"serviceConfig-message-history-box"},[n("div",{staticClass:"searchParams"},[n("SearchPanel",{attrs:{forms:e.forms,"show-search-btn":!0,"show-reset":!0,showYesterday:!0,showBeforeYesterday:!0,showToday:!0,showBatchPass:!0,showBatchRurn:!0,batchFuncName:"一键通过",batchRurnName:"一键拒绝"},on:{batchPass:e.batchPass,BatchRurn:e.BatchRurn,onSearch:e.onSearch,onReset:e.reset,yesterday:e.yesterday,beforeYesterday:e.beforeYesterday,today:e.today},model:{value:e.searchParams,callback:function(t){e.searchParams=t},expression:"searchParams"}})],1),n("tableList",{ref:"tableList",attrs:{cfgs:e.cfgs,layout:"total, sizes, prev, pager, next, jumper"},on:{selectionChange:e.selectionChange}})],1)},r=[],s=n("c7eb"),i=n("1da1"),c=n("5530"),o=(n("7db0"),n("d3b7"),n("b0c0"),n("159b"),n("14d9"),n("a630"),n("3ca3"),n("13d5"),n("9b62")),u=n("04a2"),d=n("4053"),l=n("8daa"),h=n("cf45"),m=n("2708"),f=n("279a"),p={mixins:[m["a"]],components:{SearchPanel:u["a"],tableList:d["a"]},data:function(){return{searchParams:{dateTimeParams:[],rel_type:4,status:0},dateTimeParams:{start_time:null,end_time:null},selectList:[],ids:[],serviceList:[]}},computed:{forms:function(){var e=this;return[{name:"inputSelect",value:"",selectName:"iSelect",type:"inputSelect",placeholder:"请输入",selectPlaceholder:"请选择",selctValue:"user_id",selectWidth:"130px",label:"",handler:{change:function(e){}},options:[{key:"user_id",label:"用户ID"},{key:"room_id",label:"房间ID"}]},{name:"rel_type",type:"select",value:4,keyName:"value",optionLabel:"name",label:"图片类型",placeholder:"请选择",options:f["a"].RISKMANAGEMENTIMGTYPELIST},{name:"status",type:"select",value:0,keyName:"value",optionLabel:"name",label:"审核状态",placeholder:"请选择",clearable:!0,options:f["a"].RISKMANAGEMENTIMGSTATUSLIST},{name:"admin_id",type:"select",value:"",keyName:"value",optionLabel:"name",label:"审核人",placeholder:"请选择",clearable:!0,options:this.serviceList},{name:"dateTimeParams",type:"datePicker",dateType:"datetimerange",format:"yyyy-MM-dd HH:mm:ss",label:"时间选择",value:"",linkage:!0,handler:{change:function(t){e.emptyDateTime(),e.setDateTime(t)},selectChange:function(t,n){e.emptyDateTime()}}}]},cfgs:function(){var e=this;return{vm:this,isShowCheckbox:!0,url:l["a"].risk.screenImgLog,search:{sizes:[10,30,50,100]},columns:[{label:"时间",prop:"create_time",sortable:"custom",render:function(e,t){return e("span",t.row.create_time||"无")}},{label:"用户ID",render:function(e,t){return e("div",t.row.user_number||"无")}},{label:"用户昵称",render:function(e,t){return e("div",t.row.user_nickname||"无")}},{label:"房间ID",render:function(e,t){return e("div",t.row.room_number||"无")}},{label:"图片类型",render:function(e,t){var n=f["a"].RISKMANAGEMENTIMGTYPELIST.find((function(e){return e.value===t.row.rel_type}));return e("div",n?n.name:"无")}},{label:"图片",isimgList:!0,prop:"img_path",type:1,imgWidth:"50px",imgHeight:"50px",minWidth:"150px"},{label:"审核状态",render:function(e,t){var n=f["a"].RISKMANAGEMENTIMGSTATUSLIST.find((function(e){return e.value===t.row.status}));return e("div",n?n.name:"无")}},{label:"审核人",prop:"username",render:function(e,t){return e("div",t.row.username||"无")}},{label:"操作",minWidth:"100px",render:function(t,n){return t("div",[t("el-button",{props:{type:"primary"},style:{display:0===n.row.status?"unset":"none"},on:{click:function(){e.func(n.row.id,1,"通过",1)}}},"通过"),t("el-button",{props:{type:"danger"},style:{display:0===n.row.status?"unset":"none"},on:{click:function(){e.func(n.row.id,-1,"拒绝",1)}}},"拒绝"),t("el-button",{props:{type:"success"},style:{display:1===n.row.status?"unset":"none"},on:{click:function(){}}},"已通过"),t("el-button",{props:{type:"danger"},style:{display:-1===n.row.status?"unset":"none"},on:{click:function(){}}},"已拒绝")])}}]}}},methods:{today:function(){this.changeIndex(0),this.getList()},yesterday:function(){this.changeIndex(1),this.getList()},beforeYesterday:function(){this.changeIndex(2),this.getList()},changeIndex:function(e){var t,n,a,r,s=new Date;switch(e){case 0:n=Object(h["h"])(s,"YYYY-MM-DD",!1),t=Object(h["h"])(s,"YYYY-MM-DD",!1);break;case 1:n=Object(h["h"])(s-864e5,"YYYY-MM-DD",!1),t=Object(h["h"])(s-864e5,"YYYY-MM-DD",!1);break;case 2:n=Object(h["h"])(s-1728e5,"YYYY-MM-DD",!1),t=Object(h["h"])(s-1728e5,"YYYY-MM-DD",!1);break}a=new Date(t+" 00:00:00"),r=new Date(n+" 23:59:59");var i=[a.getTime(),r.getTime()];this.searchParams.dateTimeParams=i,this.dateTimeParams.start_time=i[0],this.dateTimeParams.end_time=i[1]},beforeSearch:function(e){var t=Object(c["a"])(Object(c["a"])({},this.searchParams),this.dateTimeParams),n={page:e.page,pagesize:e.size,start_time:t.start_time?Math.floor(t.start_time/1e3):"",end_time:t.end_time?Math.floor(t.end_time/1e3):"",status:t.status,rel_type:t.rel_type,admin_id:t.admin_id};return"user_id"===t.iSelect?n.user_number=t.inputSelect:"room_id"===t.iSelect&&(n.room_number=t.inputSelect),n},getList:function(){this.$refs.tableList&&this.$refs.tableList.getData()},setDateTime:function(e){var t=e?{start_time:e[0],end_time:e[1]}:{};this.$set(this,"dateTimeParams",t)},emptyDateTime:function(){this.dateTimeParams={}},reset:function(){this.searchParams={rel_type:4,status:0},this.dateTimeParams={},this.changeIndex(0),this.getList()},onSearch:function(){this.getList()},destoryComp:function(){this.isDestoryComp=!1},func:function(e,t,n,a){var r=this;return Object(i["a"])(Object(s["a"])().mark((function c(){return Object(s["a"])().wrap((function(c){while(1)switch(c.prev=c.next){case 0:r.$confirm("是否确认".concat(n,"?"),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(i["a"])(Object(s["a"])().mark((function i(){var c,u;return Object(s["a"])().wrap((function(s){while(1)switch(s.prev=s.next){case 0:return c={ids:1==a?[e]:e,status:t},s.next=3,Object(o["m"])(c);case 3:u=s.sent,2e3===u.code&&(r.$success(n+"成功"),r.getList());case 5:case"end":return s.stop()}}),i)})))).catch((function(){}));case 1:case"end":return c.stop()}}),c)})))()},selectionChange:function(e){this.selectList=e;var t=[];this.selectList.forEach((function(e){0==e.status&&t.push(e.id)})),this.ids=t},batchPass:function(){0!=this.selectList.length&&0!=this.ids.length?this.func(this.ids,1,"一键通过",2):this.$error("请先选择待审核数据")},BatchRurn:function(){0!=this.selectList.length&&0!=this.ids.length?this.func(this.ids,-1,"一键拒绝",2):this.$error("请先选择待审核数据")},getCustomerServiceList:function(e){var t=this;return Object(i["a"])(Object(s["a"])().mark((function n(){var a,r;return Object(s["a"])().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,Object(o["g"])(e);case 2:a=n.sent,2e3==a.code&&(r=Array.from(Array.isArray(a.data.list)?a.data.list:[]),t.serviceList=r.reduce((function(e,t){return e.push({name:t.username,value:t.id}),e}),[])||[]);case 4:case"end":return n.stop()}}),n)})))()}},created:function(){this.changeIndex(0),this.getCustomerServiceList()}},b=p,y=(n("8322"),n("2877")),g=Object(y["a"])(b,a,r,!1,null,null,null);t["default"]=g.exports}}]);