(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-b4f29d9e"],{"1fe8":function(e,t,a){e.exports=a.p+"static/img/error.e53687be.png"},2708:function(e,t,a){"use strict";var n=a("5530"),r=a("2f62"),s={data:function(){return{tabIndex:"0",page:1,size:10,limit:10,searchParams:{},dataParams:{}}},computed:Object(n["a"])({},Object(r["c"])({permissionArr:function(e){return e.permission.permissionArr}})),mounted:function(){console.log(this.permissionArr,"permissionArr")}};t["a"]=s},f2c7:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("div",{staticClass:"searchParams"},[a("SearchPanel",{attrs:{forms:e.forms,"show-reset":!0,"show-search-btn":!0,"show-export":!0,customType:"danger"},on:{onReset:e.reset,onSearch:e.onSearch,export:e.handleExport},model:{value:e.searchParams,callback:function(t){e.searchParams=t},expression:"searchParams"}})],1),a("tableList",{ref:"tableList",attrs:{cfgs:e.cfgs}})],1)},r=[],s=a("c7eb"),c=a("1da1"),i=a("5530"),o=a("ade3"),u=(a("7db0"),a("d3b7"),a("b0c0"),a("ac1f"),a("841c"),a("1a72")),l=a("04a2"),m=a("4053"),p=a("8daa"),d=a("cf45"),f=a("2708"),h=a("279a"),b={name:"user-not-logOut-list",mixins:[f["a"]],components:{SearchPanel:l["a"],tableList:m["a"]},computed:{forms:function(){var e=this;return[{name:"user_number",type:"input",value:"",label:"用户ID",isNum:!0,placeholder:"请输入用户ID"},{name:"status",type:"select",value:0,keyName:"value",optionLabel:"name",label:"注销状态",placeholder:"请选择",options:h["a"].LOGOUTSTATUS},{name:"dateTimeParams",type:"datePicker",dateType:"datetimerange",format:"yyyy-MM-dd HH:mm:ss",label:"时间选择",value:"",handler:{change:function(t){e.emptyDateTime(),e.setDateTime(t)},selectChange:function(t,a){e.emptyDateTime()}}}]},cfgs:function(){var e=this;return{vm:this,url:p["a"].logout.listV2,columns:[{label:"注销时间",render:function(e,t){return e("span",t.row.create_time?Object(d["h"])(t.row.create_time,"YYYY-MM-DD HH:mm:ss",!0):"无")}},{label:"用户ID",prop:"user_number"},{label:"用户昵称",prop:"nickname"},{label:"用户角色",prop:"role_name"},{label:"所属公会",minWidth:"100px",render:function(e,t){return e("div",[e("div",t.row.guild_name),e("div",t.row.guild_number||"-")])}},{label:"等级",render:function(e,t){return e("div",[e("span","用户:".concat(t.row.user_rank)),e("span","主播:".concat(t.row.live_rank))])}},{label:"注销状态",render:function(e,t){var a=h["a"].LOGOUTUNTREATEDSTATUSLIST.find((function(e){return t.row.status===e.value}));return e("span",a?a.name:"无")}},{label:"操作",render:function(t,a){return t("div",[t("el-button",{props:{type:"primary"},style:{display:0===a.row.status?"unset":"none"},on:{click:function(){e.passFunc(a.row.id,1)}}},"通过"),t("el-button",{props:{type:"danger"},style:{display:0===a.row.status?"unset":"none"},on:{click:function(){e.reject(a.row.id,2)}}},"拒绝")])}}]}}},data:function(){return Object(o["a"])({searchParams:{status:0,user_number:"",dateTimeParams:[]},dateTimeParams:{start_time:null,end_time:null}},"searchParams",{status:0})},methods:{beforeSearch:function(e){var t=Object(i["a"])(Object(i["a"])({},this.searchParams),this.dateTimeParams);return{page:e?e.page:null,pagesize:e?e.size:null,status:t.status,user_number:t.user_number,start_time:t.start_time?Math.floor(t.start_time/1e3):"",end_time:t.end_time?Math.floor(t.end_time/1e3):""}},getList:function(){this.$refs.tableList.getData()},reset:function(){this.searchParams={status:0},this.dateTimeParams={},this.getList()},onSearch:function(){this.getList()},passFunc:function(e,t){var a=this;this.$confirm("确定通过当前操作?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(c["a"])(Object(s["a"])().mark((function n(){var r;return Object(s["a"])().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,Object(u["lb"])({id:e,status:t});case 2:r=n.sent,2e3===r.code&&a.$message({type:"success",message:"处理成功"}),a.getList();case 5:case"end":return n.stop()}}),n)})))).catch((function(){a.$message({type:"info",message:"已取消"})}))},reject:function(e,t){var a=this;return Object(c["a"])(Object(s["a"])().mark((function n(){return Object(s["a"])().wrap((function(n){while(1)switch(n.prev=n.next){case 0:a.$confirm("确定拒绝当前操作?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(c["a"])(Object(s["a"])().mark((function n(){var r;return Object(s["a"])().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,Object(u["lb"])({id:e,status:t});case 2:r=n.sent,2e3===r.code&&a.$message({type:"success",message:"拒绝成功"}),a.getList();case 5:case"end":return n.stop()}}),n)})))).catch((function(){a.$message({type:"info",message:"已取消"})}));case 1:case"end":return n.stop()}}),n)})))()},setDateTime:function(e){var t=e?{start_time:e[0],end_time:e[1]}:{};this.$set(this,"dateTimeParams",t)},emptyDateTime:function(){this.dateTimeParams={}},handleExport:function(){var e=this;return Object(c["a"])(Object(s["a"])().mark((function t(){var a,n,r,c,i,o;return Object(s["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a=e.beforeSearch(),n=e.$refs.tableList.search,a.page=n?n.page:null,a.pagesize=n?n.size:null,r=e.$loading({lock:!0,text:"Loading",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)"}),t.next=7,Object(u["Cb"])(a);case 7:c=t.sent;try{i=c.data.url,o=document.createElement("a"),o.href=i,o.download="用户注销",-1===i.indexOf("?")&&(i+="?download"),o.click(),o.remove(),r.close()}catch(s){console.log(s),r.close()}case 9:case"end":return t.stop()}}),t)})))()}}},g=b,w=a("2877"),v=Object(w["a"])(g,n,r,!1,null,null,null);t["default"]=v.exports}}]);