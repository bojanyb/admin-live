(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6dca890c"],{"107f":function(e,a,t){"use strict";t("34bc")},1564:function(e,a,t){"use strict";t.r(a);var n=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"dwActivity-index-box"},[t("div",{staticClass:"searchParams"},[t("SearchPanel",{attrs:{forms:e.forms,"show-reset":!0,"show-search-btn":!0},on:{onReset:e.reset,onSearch:e.onSearch},model:{value:e.searchParams,callback:function(a){e.searchParams=a},expression:"searchParams"}})],1),t("div",{staticClass:"tableList"},[t("tableList",{ref:"tableList",attrs:{cfgs:e.cfgs},on:{saleAmunt:e.saleAmunt}})],1)])},r=[],s=t("04a2"),i=t("4053"),o=t("2708"),c=t("8daa"),l=t("279a"),u={components:{tableList:i["a"],SearchPanel:s["a"]},mixins:[o["a"]],computed:{forms:function(){return[{name:"user_number",type:"input",value:"",label:"用户ID",isNum:!0,placeholder:"请输入用户ID"},{name:"gift_name",type:"select",value:"粽子",keyName:"name",optionLabel:"name",label:"礼物类型",placeholder:"请选择",options:l["a"].GIFTLIST},{name:"relation_trade_no",type:"input",value:"",label:"统计",placeholder:"",disabled:!0},{name:"order",type:"select",value:"live_user_id",keyName:"value",optionLabel:"name",label:"查看",placeholder:"请选择",options:l["a"].GIFTSTATISTICS}]},cfgs:function(){return{vm:this,url:c["a"].userActivity.dwActivity.dragonBoatFestival,isShowIndex:!0,columns:[{label:"用户ID",prop:"user_number"},{label:"用户昵称",prop:"nickname"},{label:"收到（喵粮）",prop:"receive_amount"},{label:"送出（喵粮）",prop:"send_amout"}]}}},data:function(){return{allStatistics:null}},methods:{beforeSearch:function(e){var a=this.searchParams;return{page:e.page,gift_name:a.gift_name?a.gift_name:"粽子",order:a.order?a.order:"live_user_id",user_number:a.user_number}},saleAmunt:function(){},onSearch:function(){this.$refs.tableList.getData()},reset:function(){this.searchParams={},this.onSearch()}}},m=u,p=(t("107f"),t("e607")),d=Object(p["a"])(m,n,r,!1,null,null,null);a["default"]=d.exports},"1fe8":function(e,a,t){e.exports=t.p+"static/img/error.e53687be.png"},2708:function(e,a,t){"use strict";var n=t("4672"),r=t("52c1"),s={data:function(){return{tabIndex:"0",page:1,size:10,limit:10,searchParams:{},dataParams:{}}},computed:Object(n["a"])({},Object(r["c"])({permissionArr:function(e){return e.permission.permissionArr}})),mounted:function(){console.log(this.permissionArr,"permissionArr")}};a["a"]=s},"34bc":function(e,a,t){}}]);