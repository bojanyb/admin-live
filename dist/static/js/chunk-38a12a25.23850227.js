(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-38a12a25"],{"15c0":function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"user-endAudit-box"},[r("div",{staticClass:"searchParams"},[r("SearchPanel",{attrs:{forms:e.forms,"show-reset":!0,"show-search-btn":!0},on:{onReset:e.reset,onSearch:e.onSearch},model:{value:e.searchParams,callback:function(t){e.searchParams=t},expression:"searchParams"}})],1),r("tableList",{ref:"tableList",attrs:{cfgs:e.cfgs}})],1)},a=[],i=r("5530"),s=(r("7db0"),r("d3b7"),r("b0c0"),r("04a2")),o=r("4053"),c=r("8daa"),u=r("cf45"),p=r("2708"),m=r("279a"),d={mixins:[p["a"]],components:{SearchPanel:s["a"],tableList:o["a"]},data:function(){return{}},computed:{forms:function(){return[{name:"user_number",type:"input",value:"",label:"用户ID",isNum:!0,placeholder:"请输入用户ID"}]},cfgs:function(){return{vm:this,url:c["a"].audit.auditedList,columns:[{label:"用户ID",width:"100px",render:function(e,t){return e("span",t.row.user_number||"")}},{label:"昵称",width:"130px",render:function(e,t){return e("span",t.row.nickname||"")}},{label:"头像",isimg:!0,prop:"face",imgWidth:"50px",imgHeight:"50px",width:"100px"},{label:"个性签名",width:"100px",render:function(e,t){return e("span",t.row.autograph||"")}},{label:"背景图片",isimg:!0,prop:"pic",imgWidth:"50px",imgHeight:"50px",width:"100px"},{label:"录制声音",isimg:!0,prop:"sound",imgWidth:"50px",imgHeight:"50px",width:"300px"},{label:"动态内容",width:"180px",render:function(e,t){return e("span",t.row.moments_content||"")}},{label:"动态图片/视频",isimgList:!0,prop:"moments_media_list",type:"moments_media_type",imgWidth:"70px",imgHeight:"70px",width:"200px"},{label:"上传时间",width:"180px",render:function(e,t){return e("span",t.row.create_time?Object(u["h"])(t.row.create_time,"YYYY-MM-DD HH:mm:ss",!0):"")}},{label:"状态",width:"100px",render:function(e,t){var r=m["a"].AUDITSTATUSLIST.find((function(e){return e.value===t.row.status}));return e("span",r?r.name:"无")}},{label:"处理时间",width:"180px",render:function(e,t){return e("span",t.row.update_time?Object(u["h"])(t.row.update_time,"YYYY-MM-DD HH:mm:ss",!0):"")}},{label:"处理人",width:"100px",render:function(e,t){return e("span",t.row.admin_name||"")}}]}}},methods:{beforeSearch:function(e){var t=Object(i["a"])({},this.searchParams);return{page:e.page,pagesize:e.size,user_number:t.user_number}},getList:function(){this.$refs.tableList.getData()},reset:function(){this.searchParams={},this.getList()},onSearch:function(){this.getList()}}},l=d,h=(r("dd36"),r("2877")),f=Object(h["a"])(l,n,a,!1,null,"72c1ce7e",null);t["default"]=f.exports},"1fe8":function(e,t,r){e.exports=r.p+"static/img/error.e53687be.png"},2227:function(e,t,r){},2708:function(e,t,r){"use strict";var n=r("5530"),a=r("2f62"),i={data:function(){return{tabIndex:"0",page:1,size:10,limit:10,searchParams:{},dataParams:{}}},computed:Object(n["a"])({},Object(a["c"])({permissionArr:function(e){return e.permission.permissionArr}})),mounted:function(){console.log(this.permissionArr,"permissionArr")}};t["a"]=i},dd36:function(e,t,r){"use strict";r("2227")}}]);