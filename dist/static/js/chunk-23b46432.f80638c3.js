(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-23b46432"],{"1fe8":function(e,r,a){e.exports=a.p+"static/img/error.e53687be.png"},2708:function(e,r,a){"use strict";var t=a("4672"),n=a("52c1"),s={data:function(){return{tabIndex:"0",page:1,size:10,limit:10,searchParams:{},dataParams:{}}},computed:Object(t["a"])({},Object(n["c"])({permissionArr:function(e){return e.permission.permissionArr}})),mounted:function(){console.log(this.permissionArr,"permissionArr")}};r["a"]=s},"7d73":function(e,r,a){"use strict";a.r(r);var t=function(){var e=this,r=e.$createElement,a=e._self._c||r;return a("div",{staticClass:"invite-join-us"},[a("div",{staticClass:"searchParams"},[a("SearchPanel",{attrs:{"search-params":e.searchParams,forms:e.forms,"show-search-btn":!0},on:{onSearch:e.onSearch}})],1),a("div",{staticClass:"tableList"},[a("tableList",{ref:"tableList",attrs:{cfgs:e.cfgs}})],1)])},n=[],s=(a("07c1"),a("4053")),i=a("04a2"),o=a("8daa"),c=a("2f42"),m=a.n(c),u=a("2708"),l={mixins:[u["a"]],data:function(){return{}},components:{tableList:s["a"],SearchPanel:i["a"]},computed:{forms:function(){var e=this;return[{name:"user_number",type:"input",value:"",isNum:!0,label:"用户ID",placeholder:"",handler:{enter:function(r){e.searchParams.user_number=r.user_number.trim(),e.$refs.tableList.getData()}}},{name:"gift_id",type:"input",value:"",label:"礼物ID",placeholder:"",handler:{enter:function(r){e.searchParams.gift_id=r.gift_id.trim(),e.$refs.tableList.getData()}}},{name:"relation_trade_no",type:"input",value:"",label:"交易流水号",placeholder:"",handler:{enter:function(r){e.searchParams.relation_trade_no=r.relation_trade_no.trim(),e.$refs.tableList.getData()}}},{name:"dateTimeParams",type:"datePicker",dateType:"daterange",format:"yyyy-MM-dd hh:mm:ss",label:"时间选择",value:"",handler:{change:function(r){e.searchParams.start_time=r?r[0]/1e3:"",e.searchParams.end_time=r?r[1]/1e3:"",e.$refs.tableList.getData()},selectChange:function(e,r){}}}]},cfgs:function(){return{vm:this,url:o["a"].platformActivity.drawFlow,method:"post",isShowIndex:!0,columns:[{label:"用户ID",props:"user_number",render:function(e,r){return e("span",r.row.user_number)}},{label:"参与时间",minWidth:"120px",props:"create_time",render:function(e,r){return e("span",r.row.create_time>0?m()(1e3*r.row.create_time).format("YYYY-MM-DD HH:mm:ss"):"")}},{label:"礼物ID",props:"gift_id",render:function(e,r){return e("span",r.row.gift_id)}},{label:"礼物名称",props:"gift_name",render:function(e,r){return e("span",r.row.gift_name)}},{label:"礼物数量",props:"number",render:function(e,r){return e("span",r.row.number)}},{label:"礼物价值",props:"gift_diamond",render:function(e,r){return e("span",r.row.gift_diamond)}},{label:"交易流水",minWidth:"160px",props:"relation_trade_no",render:function(e,r){return e("span",r.row.relation_trade_no)}}]}}},created:function(){},methods:{beforeSearch:function(e){return{size:e.size,page:e.page,code:"dzp",user_number:this.searchParams.user_number,gift_id:this.searchParams.gift_id,relation_trade_no:this.searchParams.relation_trade_no,start_time:this.searchParams.start_time,end_time:this.searchParams.end_time}},onSearch:function(e){this.searchParams.user_number=e.user_number,this.searchParams.gift_id=e.gift_id,this.searchParams.relation_trade_no=e.relation_trade_no,this.searchParams.start_time=e.dateTimeParams?e.dateTimeParams[0]/1e3:"",this.searchParams.end_time=e.dateTimeParams?e.dateTimeParams[1]/1e3:"",this.$refs.tableList.getData()}}},d=l,f=(a("c7fc"),a("e607")),h=Object(f["a"])(d,t,n,!1,null,null,null);r["default"]=h.exports},c7fc:function(e,r,a){"use strict";a("f613")},f613:function(e,r,a){}}]);