(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-cd8f890a"],{"1fe8":function(e,t,r){e.exports=r.p+"static/img/error.e53687be.png"},2708:function(e,t,r){"use strict";var n=r("4672"),a=r("52c1"),s={data:function(){return{tabIndex:"0",page:1,size:10,limit:10,searchParams:{},dataParams:{}}},computed:Object(n["a"])({},Object(a["c"])({permissionArr:function(e){return e.permission.permissionArr}})),mounted:function(){console.log(this.permissionArr,"permissionArr")}};t["a"]=s},"5f7f":function(e,t,r){},a224:function(e,t,r){"use strict";r("5f7f")},c024:function(e,t,r){"use strict";r.d(t,"c",(function(){return s})),r.d(t,"d",(function(){return u})),r.d(t,"a",(function(){return i})),r.d(t,"b",(function(){return c})),r.d(t,"e",(function(){return o}));var n=r("829b"),a=r("8daa");function s(e){return Object(n["a"])({url:a["a"].system.super.handlePunish,method:"post",data:e})}function u(e){return Object(n["a"])({url:a["a"].system.super.setSuperUser,method:"post",data:e})}function i(e){return Object(n["a"])({url:a["a"].system.super.add,method:"post",data:e})}function c(e){return Object(n["a"])({url:a["a"].system.super.del,method:"post",data:e})}function o(e){return Object(n["a"])({url:a["a"].system.super.update,method:"post",data:e})}},cb0c:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"superAdminHistory-history-box"},[r("div",{staticClass:"searchParams"},[r("SearchPanel",{attrs:{forms:e.forms,"show-reset":!0,"show-search-btn":!0},on:{onReset:e.reset,onSearch:e.onSearch},model:{value:e.searchParams,callback:function(t){e.searchParams=t},expression:"searchParams"}})],1),r("div",{staticClass:"tableList"},[r("tableList",{ref:"tableList",attrs:{cfgs:e.cfgs}})],1)])},a=[],s=r("40bd"),u=r("7e8c"),i=r("4672"),c=(r("23dc"),r("8bda"),r("48d4"),r("c024")),o=r("4053"),m=r("04a2"),l=r("2708"),d=r("8daa"),p=r("cf45"),f=r("279a"),h={components:{tableList:o["a"],SearchPanel:m["a"]},mixins:[l["a"]],computed:{forms:function(){return[{name:"super_username",type:"input",value:"",label:"处置人",placeholder:"处置人id"},{name:"room_username",type:"input",value:"",label:"被处罚厅主",placeholder:"被处罚厅主名称或id"},{name:"admin_username",type:"input",value:"",label:"处理人",placeholder:"处理人名称"}]},cfgs:function(){return{vm:this,url:d["a"].system.super.punishHistory,columns:[{label:"处罚类型",prop:"punish_category"},{label:"处罚时间",render:function(e,t){return e("span",t.row.create_time?Object(p["h"])(t.row.create_time,"YYYY-MM-DD HH:mm:ss",!0):"无")}},{label:"被处罚厅主",render:function(e,t){return e("div",[e("div",t.row.room_username),e("div",t.row.room_user_number||"无")])}},{label:"处置人ID",prop:"super_user_number"},{label:"状态",prop:"status",render:function(e,t){var r=f["a"].SUPERSTATUSLIST.find((function(e){return t.row.status===e.value}));return e("span",r?r.name:"无")}},{label:"处理人",render:function(e,t){return e("span",t.row.admin_nickname||"无")}},{label:"处理时间",render:function(e,t){return e("span",t.row.handle_time?Object(p["h"])(t.row.handle_time,"YYYY-MM-DD HH:mm:ss",!0):"无")}}]}}},data:function(){return{}},methods:{getList:function(){this.$refs.tableList.getData()},beforeSearch:function(e){var t=Object(i["a"])({},this.searchParams);return{page:e.page,pagesize:e.size,super_username:t.super_username,room_username:t.room_username,admin_username:t.admin_username}},reset:function(){this.searchParams={},this.getList()},onSearch:function(){this.getList()},handlePunishFunc:function(e,t){var r=this;return Object(u["a"])(Object(s["a"])().mark((function n(){return Object(s["a"])().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,Object(c["c"])({id:e,status:t});case 2:r.getList();case 3:case"end":return n.stop()}}),n)})))()}}},b=h,_=(r("a224"),r("e607")),v=Object(_["a"])(b,n,a,!1,null,null,null);t["default"]=v.exports}}]);