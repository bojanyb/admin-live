(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-bf84868e"],{"302e":function(t,e,a){},"72cc":function(t,e,a){},"82d9":function(t,e,a){"use strict";a("302e")},9406:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"dashboard-box"},[a("div",{staticClass:"headerBox"},[a("div",{staticClass:"select"},t._l(t.selectList,(function(e,n){return a("span",{key:n,class:{high:t.selectIndex===n},on:{click:function(e){return t.selectChange(n)}}},[t._v(t._s(e.name))])})),0),a("div",{directives:[{name:"show",rawName:"v-show",value:0===t.selectIndex,expression:"selectIndex === 0"}],staticClass:"date"},[a("span",[t._v("选择时间: ")]),a("el-date-picker",{staticClass:"selectTime",attrs:{type:"datetimerange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":t.pickerOptions,"default-time":["00:00:00","23:59:59"]},on:{change:t.dateChange},model:{value:t.timer,callback:function(e){t.timer=e},expression:"timer"}})],1),a("div",{directives:[{name:"show",rawName:"v-show",value:1===t.selectIndex,expression:"selectIndex === 1"}],staticClass:"date"},[a("span",[t._v("选择时间: ")]),a("el-date-picker",{attrs:{type:"date",placeholder:"选择日期","value-format":"yyyy-MM-dd"},on:{change:t.timeChange},model:{value:t.timer,callback:function(e){t.timer=e},expression:"timer"}})],1)]),a("div",{staticClass:"contentBox"},[a("item",{ref:"item"})],1)])},i=[],o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"dashboard-item-box"},[a("ul",t._l(t.dashboardList,(function(e,n){return a("li",{key:n},t._l(e.children,(function(e,n){return a("div",{key:n,staticClass:"Con"},[a("span",[t._v(t._s(e.tit))]),a("div",{staticClass:"num"},["total_top_up_diamond"==e.val?a("span",{staticClass:"total",staticStyle:{"font-size":"18px"}},[a("span",{directives:[{name:"format",rawName:"v-format",value:"#,##0",expression:"'#,##0'"}]},[t._v(t._s(Number(t.ruleForm[e.val])||0))]),t._v(" = 安卓:"),a("span",{directives:[{name:"format",rawName:"v-format",value:"#,##0",expression:"'#,##0'"}]},[t._v(t._s(Number(t.ruleForm.android_top_up_diamond)||0))]),t._v(" + 苹果:"),a("span",{directives:[{name:"format",rawName:"v-format",value:"#,##0",expression:"'#,##0'"}]},[t._v(t._s(Number(t.ruleForm.apple_top_up_diamond)||0))])]):a("span",{directives:[{name:"format",rawName:"v-format",value:"#,##0",expression:"'#,##0'"}],staticClass:"total"},[t._v(t._s(Number(t.ruleForm[e.val])||0))]),"total_top_up_diamond"!==e.val?a("span",{staticClass:"unit"},[t._v(t._s(e.unit))]):t._e()])])})),0)})),0)])},r=[],s=a("c7eb"),l=a("1da1"),c=(a("a9e3"),a("1a72")),u=[{children:[{tit:"钻石总数:",val:"total_diamond",unit:"（钻石）"},{tit:"喵粮总数:",val:"total_gain",unit:"（喵粮）"},{tit:"总数:",val:"total_num"}]},{children:[{tit:"平台总流水:",val:"platform_total_flow"},{tit:"礼物总分成:",val:"platform_gift_income"},{tit:"商城总收益:",val:"goods_income"}]},{children:[{tit:"礼物总分成:",val:"platform_gift_income"},{tit:"公会总返点:",val:"guild_rebates"},{tit:"平台流水收益:",val:"platform_income"}]},{children:[{tit:"背包总价值:",val:"bag_total_value"},{tit:"背包总流水:",val:"bag_total_flow"},{tit:"背包余价值:",val:"bag_left_value"}]},{children:[{tit:"充值总数:",val:"total_top_up_diamond",unit:"（钻石）"},{tit:"充值笔数:",val:"total_top_up_count",unit:"（笔）"},{tit:"成功笔数:",val:"total_success_top_up_count",unit:"（笔）"}]},{children:[{tit:"提现中数量:",val:"cashing",unit:"（喵粮）"},{tit:"提现总数:",val:"has_cash",unit:"（喵粮）"},{tit:"手续费:",val:"has_cash_rate",unit:"（喵粮）"}]},{children:[{tit:"赠送钻石:",val:"incDiamond",unit:"（钻石）"},{tit:"赠送喵粮:",val:"incGain",unit:"（喵粮）"},{tit:"赠送总数:",val:"total_incGain"}]},{children:[{tit:"扣除钻石:",val:"decDiamond",unit:"（钻石）"},{tit:"扣除喵粮:",val:"decGain",unit:"（喵粮）"},{tit:"扣除总数:",val:"total_decGain"}]}],d={dashboardList:u},m=a("cf45"),v={data:function(){return{ruleForm:{},dashboardList:d.dashboardList}},methods:{getRoomWalletInfo:function(){var t=arguments,e=this;return Object(l["a"])(Object(s["a"])().mark((function a(){var n,i,o,r,l,u;return Object(s["a"])().wrap((function(a){while(1)switch(a.prev=a.next){case 0:return n=t.length>0&&void 0!==t[0]?t[0]:"",i=t.length>1&&void 0!==t[1]?t[1]:"",""==n&&""==i&&(o=new Date,r=Object(m["h"])(o,"YYYY-MM-DD",!1),n=Date.parse(r+" 00:00:00")/1e3,i=Date.parse(r+" 23:59:59")/1e3),l={start_time:n,end_time:i},a.next=6,Object(c["Kb"])(l);case 6:u=a.sent,e.dataHandle(u.data);case 8:case"end":return a.stop()}}),a)})))()},overviewDayDataFunc:function(t){var e=this;return Object(l["a"])(Object(s["a"])().mark((function a(){var n;return Object(s["a"])().wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,Object(c["Lb"])({time:t});case 2:n=a.sent,e.dataHandle(n.data.log_json);case 4:case"end":return a.stop()}}),a)})))()},dataHandle:function(t){var e=t;e.total_num=Number(e.total_diamond)+Number(e.total_gain),e.total_incGain=Number(e.incDiamond)+Number(e.incGain),e.total_decGain=Number(e.decDiamond)+Number(e.decGain),e.android_top_up_diamond=Number(e.android_top_up_diamond),e.apple_top_up_diamond=Number(e.apple_top_up_diamond),e.guild_rebates=Number(e.weekBate1)+Number(e.weekBate2)+Number(e.weekBate3)+Number(e.weekBate4),this.ruleForm=t}},mounted:function(){this.getRoomWalletInfo()}},_=v,h=(a("c7b0"),a("2877")),p=Object(h["a"])(_,o,r,!1,null,null,null),f=p.exports,D={components:{item:f},data:function(){return{selectList:[{name:"总览数据"},{name:"日终数据"}],selectIndex:0,pickerOptions:{shortcuts:[{text:"今天",onClick:function(t){var e=new Date,a=e.getFullYear(),n=e.getMonth(),i=e.getDate();n+1<=12?n+=1:n=1;var o=new Date(a+"-"+n+"-"+i+" 00:00:00"),r=new Date(a+"-"+n+"-"+i+" 23:59:59");t.$emit("pick",[o,r])}},{text:"最近三天",onClick:function(t){var e=new Date,a=Object(m["h"])(e-864e5,"YYYY-MM-DD",!1),n=Object(m["h"])(e-2592e5,"YYYY-MM-DD",!1);t.$emit("pick",[new Date(n+" 00:00:00"),new Date(a+" 23:59:59")])}},{text:"最近七天",onClick:function(t){var e=new Date,a=Object(m["h"])(e-864e5,"YYYY-MM-DD",!1),n=Object(m["h"])(e-6048e5,"YYYY-MM-DD",!1);t.$emit("pick",[new Date(n+" 00:00:00"),new Date(a+" 23:59:59")])}},{text:"最近十五天",onClick:function(t){var e=new Date,a=Object(m["h"])(e-864e5,"YYYY-MM-DD",!1),n=Object(m["h"])(e-1296e6,"YYYY-MM-DD",!1);t.$emit("pick",[new Date(n+" 00:00:00"),new Date(a+" 23:59:59")])}}]},timer:[]}},mounted:function(){this.getCurretnDayTimer()},methods:{selectChange:function(t){var e,a;if(this.selectIndex=t,this.timer=[],1===t){var n=Object(m["h"])((new Date).getTime()-864e5,"YYYY-MM-DD",!1);this.timer=new Date(n),e=Math.floor(new Date(n+" 00:00:00").getTime()/1e3),this.overviewDayDataFunc(e)}else this.getCurretnDayTimer(),this.getRoomWalletInfo(e,a)},dateChange:function(t){var e,a,n=t?Object(m["h"])(t[0],"YYYY-MM-DD HH:mm:ss",!1):"",i=t?Object(m["h"])(t[1],"YYYY-MM-DD HH:mm:ss",!1):"";e=n?Math.floor(new Date(n).getTime()/1e3):"",a=i?Math.floor(new Date(i).getTime()/1e3):"",this.getRoomWalletInfo(e,a)},timeChange:function(t){var e;e=t?Math.floor(new Date(t+" 00:00:00")/1e3):"",this.overviewDayDataFunc(e)},getRoomWalletInfo:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";this.$refs.item.getRoomWalletInfo(t,e)},overviewDayDataFunc:function(t,e){this.$refs.item.overviewDayDataFunc(t,e)},getCurretnDayTimer:function(){var t=new Date,e=t.getFullYear(),a=t.getMonth(),n=t.getDate();a+1<=12?a+=1:a=1;var i=new Date(e+"-"+a+"-"+n+" 00:00:00"),o=new Date(e+"-"+a+"-"+n+" 23:59:59"),r=[i,o];this.timer=r}}},b=D,w=(a("82d9"),Object(h["a"])(b,n,i,!1,null,null,null));e["default"]=w.exports},c7b0:function(t,e,a){"use strict";a("72cc")}}]);