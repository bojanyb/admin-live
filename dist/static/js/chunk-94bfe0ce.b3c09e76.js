(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-94bfe0ce"],{"1fe8":function(e,t,r){e.exports=r.p+"static/img/error.e53687be.png"},2708:function(e,t,r){"use strict";var a=r("4672"),n=r("52c1"),o={data:function(){return{tabIndex:"0",page:1,size:10,limit:10,searchParams:{},dataParams:{}}},computed:Object(a["a"])({},Object(n["c"])({permissionArr:function(e){return e.permission.permissionArr}})),mounted:function(){console.log(this.permissionArr,"permissionArr")}};t["a"]=o},"4f36":function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"room-livelist"},[r("menuComp",{ref:"menuComp",attrs:{menuList:e.menuList},on:{tabChange:e.tabChange},model:{value:e.tabIndex,callback:function(t){e.tabIndex=t},expression:"tabIndex"}}),r("div",{staticClass:"searchParams"},[r("SearchPanel",{attrs:{forms:e.forms,"show-add":!0,"show-search-btn":!0},on:{add:e.add,onSearch:e.onSearch},model:{value:e.searchParams,callback:function(t){e.searchParams=t},expression:"searchParams"}})],1),r("tableList",{ref:"tableList",attrs:{cfgs:e.cfgs},on:{saleAmunt:e.saleAmunt}}),e.isDestoryComp?r("editComp",{ref:"editComp",attrs:{tabIndex:e.tabIndex},on:{destoryComp:e.destoryComp,getList:e.getList}}):e._e()],1)},n=[],o=r("40bd"),s=r("7e8c"),i=r("4672"),l=(r("5250"),r("48d4"),r("1a72")),c=r("3923"),u=r("04a2"),m=r("4053"),d=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"dialog_body_box"},[r("el-dialog",{attrs:{title:e.title,width:"600px",visible:e.isEditComp},on:{closed:e.closed,"update:visible":function(t){e.isEditComp=t}}},[r("el-form",{ref:"ruleForm",staticClass:"body_box-line",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"90px","label-suffix":":","hide-required-asterisk":"see"===e.status}},[r("el-row",[r("el-col",{attrs:{span:24}},[r("el-form-item",{attrs:{label:"渠道编号",prop:"code"}},[r("el-select",{attrs:{disabled:"update"===e.status,placeholder:"请选择渠道编号"},model:{value:e.ruleForm.code,callback:function(t){e.$set(e.ruleForm,"code",t)},expression:"ruleForm.code"}},e._l(e.channelsList,(function(e){return r("el-option",{key:e.value,attrs:{label:e.name,value:e.value}})})),1)],1)],1),r("el-col",{attrs:{span:24}},["0"===e.tabIndex?r("el-form-item",{attrs:{label:"用户性别",prop:"sex"}},[r("el-radio-group",{model:{value:e.ruleForm.sex,callback:function(t){e.$set(e.ruleForm,"sex",t)},expression:"ruleForm.sex"}},[r("el-radio",{attrs:{label:"0"}},[e._v("全部")]),r("el-radio",{attrs:{label:"1"}},[e._v("男")]),r("el-radio",{attrs:{label:"2"}},[e._v("女")])],1)],1):r("el-form-item",{attrs:{label:"渠道名称",prop:"name"}},[r("el-input",{attrs:{placeholder:"请输入渠道名称"},model:{value:e.ruleForm.name,callback:function(t){e.$set(e.ruleForm,"name",t)},expression:"ruleForm.name"}})],1)],1)],1),"0"===e.tabIndex&&"1"===e.ruleForm.rule_type?r("el-row",[r("el-col",{attrs:{span:24}},[r("el-form-item",{attrs:{label:"生效日期",prop:"effect_time"}},[r("el-date-picker",{attrs:{type:"datetimerange","value-format":"timestamp","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:e.ruleForm.effect_time,callback:function(t){e.$set(e.ruleForm,"effect_time",t)},expression:"ruleForm.effect_time"}})],1)],1)],1):e._e(),"0"===e.tabIndex&&"1"===e.ruleForm.rule_type?r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"开始时间",prop:"start_time"}},[r("el-time-picker",{attrs:{"value-format":"timestamp",placeholder:"请选择开始时间"},model:{value:e.ruleForm.start_time,callback:function(t){e.$set(e.ruleForm,"start_time",t)},expression:"ruleForm.start_time"}})],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"结束时间",prop:"end_time"}},[r("el-time-picker",{attrs:{"value-format":"timestamp",placeholder:"请选择结束时间"},model:{value:e.ruleForm.end_time,callback:function(t){e.$set(e.ruleForm,"end_time",t)},expression:"ruleForm.end_time"}})],1)],1)],1):e._e(),"0"===e.tabIndex?r("el-form-item",{attrs:{label:"进入人数",prop:"number"}},[r("el-row",[r("el-col",{attrs:{span:16}},[r("el-input",{attrs:{placeholder:"请输入进入人数"},model:{value:e.ruleForm.number,callback:function(t){e.$set(e.ruleForm,"number",t)},expression:"ruleForm.number"}})],1)],1)],1):e._e(),"0"===e.tabIndex?r("el-form-item",{attrs:{label:"房间ID",prop:"room_number"}},[r("el-row",[r("el-col",{attrs:{span:16}},[r("el-input",{attrs:{placeholder:"请输入房间ID"},model:{value:e.ruleForm.room_number,callback:function(t){e.$set(e.ruleForm,"room_number",t)},expression:"ruleForm.room_number"}})],1),r("el-col",{staticStyle:{"margin-left":"10px"},attrs:{span:6}},[r("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.handlerAdd(e.ruleForm.room_number)}}},[e._v("添加")])],1)],1)],1):e._e(),"0"===e.tabIndex?r("div",{staticClass:"body_box-table"},[r("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,border:"","max-height":"250"}},[r("el-table-column",{attrs:{fixed:"",prop:"create_time",label:"添加时间",width:"200"}}),r("el-table-column",{attrs:{prop:"live_number",label:"直播间ID",width:"200"}}),r("el-table-column",{attrs:{fixed:"right",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-button",{attrs:{type:"text",size:"small"},nativeOn:{click:function(r){return r.preventDefault(),e.deleteRow(t.$index,e.tableData)}}},[e._v(" 移除 ")])]}}],null,!1,219484507)})],1)],1):e._e(),"1"===e.tabIndex?r("el-form-item",{attrs:{label:"渠道ID",prop:"channels"}},[r("el-input",{attrs:{placeholder:"请输入渠道ID"},model:{value:e.ruleForm.channels,callback:function(t){e.$set(e.ruleForm,"channels",t)},expression:"ruleForm.channels"}})],1):e._e()],1),r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:e.cancel}},[e._v("取 消")]),r("el-button",{attrs:{type:"primary"},on:{click:e.submitForm}},[e._v("确 定")])],1)],1)],1)},p=[],f=(r("00e5"),r("65c4"),r("9d95"),r("8bda"),r("ed70"),r("2910"),r("afb1"),r("15f2"),r("1e6d"),r("9dcb"),r("ed08"),r("279a")),b=r("2f42"),h=r.n(b),_={components:{},props:{tabIndex:{type:String,default:""}},data:function(){return{status:"add",isEditComp:!1,rankList:f["a"].CLASSLIST,guildTypeList:f["a"].GUILDCONFIGTYPELIST,ruleForm:{code:"",sex:"0",start_time:null,end_time:null,room_ids:[],rule_type:"1",effect_time:[]},oldParams:{},rules:{code:[{required:!0,message:"请输入渠道编号",trigger:"blur"}],room_number:[{required:!1,message:"请输入房间ID",trigger:"blur"}],sex:[{required:!0,message:"请输入用户性别",trigger:"blur"}],start_time:[{type:"date",required:!0,message:"请选择开始时间",trigger:"change"}],end_time:[{type:"date",required:!0,message:"请选择结束时间",trigger:"change"}],name:[{required:!0,message:"请输入渠道名称",trigger:"blur"}],channels:[{required:!0,message:"请输入渠道ID",trigger:"blur"}],rule_type:[{required:!0,message:"请选择是否限时",trigger:"blur"}],effect_time:[{required:!0,message:"请选择生效日期",trigger:"change"}],number:[{required:!0,message:"请输入进入人数",trigger:"blur"}]},tableData:[],sexList:[{name:"男",value:"1"},{name:"女",value:"2"}],channelsList:[]}},computed:{StartRules:function(){var e={},t=this.ruleForm.start_time;return e={required:!0,validator:function(e,r,a){t<(new Date).getTime()?a(new Error("开始时间不能小于当前时间!")):a()}},e},EndRules:function(){var e={},t=this.ruleForm.start_time,r=this.ruleForm.end_time;return e={required:!0,validator:function(e,a,n){r<(new Date).getTime()&&n(new Error("结束时间不能小于当前时间!")),t&&r<=t?n(new Error("结束时间不能小于开始时间!")):n()}},e},StartPicker:function(){return{disabledDate:function(e){return e.getTime()<(new Date).getTime()-864e5}}},EndPicker:function(){var e=this;return{disabledDate:function(t){return e.ruleForm.start_time?t.getTime()<e.ruleForm.start_time-864e5:t.getTime()<(new Date).getTime()-864e5}}},disabled:function(){return"see"===this.status},title:function(){return"0"===this.tabIndex?"渠道进房":"渠道设置"}},methods:{loadParams:function(e,t){var r=this;return Object(s["a"])(Object(o["a"])().mark((function a(){var n,s,i,l;return Object(o["a"])().wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(r.openComp(),r.status=e,"add"===e){a.next=20;break}return n=JSON.parse(JSON.stringify(t)),s={},i=new Date((new Date).toLocaleDateString()).getTime(),s.code=n.code||"",s.name=n.name||"",s.number=n.number||"",s.channels=n.channels||"",s.sex=n.sex+""||"",s.rule_type=n.rule_type+""||"2","1"===s.rule_type&&(s.start_time=i+1e3*n.start_time,s.end_time=i+1e3*n.end_time,s.effect_time=[1e3*n.valid_at,1e3*n.invalid_at]),a.next=15,r.handlerGetHasConfigRoom(n.id);case 15:l=a.sent,s.room_ids=l.data.rooms.reduce((function(e,t){return e.push({id:t.id+"",live_number:t.room_number+"",create_time:h()(1e3*t.create_time).format("YYYY-MM-DD HH:mm:ss")}),e}),[]),r.$set(r.$data,"ruleForm",s),r.tableData=s.room_ids,r.ruleForm.id=n.id;case 20:r.oldParams=JSON.parse(JSON.stringify(r.ruleForm)),r.getChannelsList();case 22:case"end":return a.stop()}}),a)})))()},openComp:function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];this.isEditComp=e},cancel:function(){var e=this;JSON.stringify(this.oldParams)!==JSON.stringify(this.ruleForm)?this.$confirm("关闭弹窗将不会保留您的更改, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){e.openComp(!1)})).catch((function(){})):this.openComp(!1)},update:function(){this.status="update"},submitForm:function(){var e=this;return Object(s["a"])(Object(o["a"])().mark((function t(){return Object(o["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.$refs.ruleForm.validate(function(){var t=Object(s["a"])(Object(o["a"])().mark((function t(r){var a,n,s,c,u,m;return Object(o["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!r){t.next=45;break}if(a=Object(i["a"])({},e.ruleForm),a.room_ids=e.tableData.reduce((function(e,t){return e.push(t.id),e}),[]),a.room_ids&&a.room_ids.length||"0"!==e.tabIndex){t.next=6;break}return e.$message.error("直播间ID不能为空"),t.abrupt("return",!1);case 6:if((a.room_number||""===a.room_number)&&delete a.room_number,n=new Date((new Date).toLocaleDateString()).getTime()/1e3,s=Math.floor(a.start_time/1e3),c=Math.floor(a.end_time/1e3),a.start_time=s-n-1>=0?s-n-1:0,a.end_time=c-n-1>=0?c-n-1:0,a&&a.effect_time&&(a.valid_at=a.effect_time[0]/1e3,a.invalid_at=a.effect_time[1]/1e3),delete a.effect_time,console.log(a.start_time,a.end_time),u={code:a.code,name:a.name,channels:a.channels},"add"!==e.status){t.next=29;break}if("0"!==e.tabIndex){t.next=23;break}return t.next=20,Object(l["a"])(a);case 20:m=t.sent,t.next=27;break;case 23:if("1"!==e.tabIndex){t.next=27;break}return t.next=26,Object(l["Fb"])(u);case 26:m=t.sent;case 27:t.next=40;break;case 29:if("0"!==e.tabIndex){t.next=35;break}return t.next=32,Object(l["cc"])(a);case 32:m=t.sent,t.next=40;break;case 35:if("1"!==e.tabIndex){t.next=40;break}return u.id=a.id,t.next=39,Object(l["ec"])(u);case 39:m=t.sent;case 40:2e3===m.code&&e.$success("保存成功"),e.openComp(!1),e.$emit("getList"),t.next=47;break;case 45:return console.log("error submit!!"),t.abrupt("return",!1);case 47:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}());case 1:case"end":return t.stop()}}),t)})))()},resetForm:function(){this.openComp(!1)},validateField:function(e){this.$refs.ruleForm.validateField([e])},closed:function(){this.$emit("destoryComp")},deleteRow:function(e,t){t.splice(e,1)},handlerAdd:function(e){var t=this;if(!e)return this.$message.error("请检查房间ID是否为空"),!1;this.$confirm("此操作将添加渠道进房, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(s["a"])(Object(o["a"])().mark((function r(){var a;return Object(o["a"])().wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,Object(l["l"])({room_number:e});case 2:a=r.sent,2e3===+a.code&&t.tableData.push({id:a.data.id+"",live_number:a.data.room_number+"",create_time:h()((new Date).getTime()).format("YYYY-MM-DD HH:mm:ss")});case 4:case"end":return r.stop()}}),r)}))))},handlerGetHasConfigRoom:function(e){return new Promise(function(){var t=Object(s["a"])(Object(o["a"])().mark((function t(r){var a;return Object(o["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(l["W"])({id:e});case 2:a=t.sent,2e3===+a.code&&r(a);case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())},getChannelsList:function(){var e=this;return Object(s["a"])(Object(o["a"])().mark((function t(){var r,a,n,s;return Object(o["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return r={page:1,pagesize:100},t.next=3,Object(l["J"])(r);case 3:a=t.sent,2e3==a.code&&(n=Array.from(Array.isArray(a.data.list)?a.data.list:[]),e.channelsList=n.reduce((function(e,t){return e.push({name:t.name,value:t.code}),e}),[])||[],s=e.channelsList.map((function(e){return console.log(e.value),e.value})).join(","),e.channelsList.unshift({name:"全部",value:s}));case 5:case"end":return t.stop()}}),t)})))()}}},x=_,g=(r("9a82"),r("e607")),v=Object(g["a"])(x,d,p,!1,null,"7ce77763",null),w=v.exports,k=r("8daa"),F=r("cf45"),y=r("2708"),O={name:"channelRoom",mixins:[y["a"]],components:{SearchPanel:u["a"],tableList:m["a"],editComp:w,menuComp:c["a"]},data:function(){return{isDestoryComp:!1,ruleForm:{},tabIndex:"0",menuList:[{name:"渠道进房配置"},{name:"渠道设置"}]}},computed:{forms:function(){var e=[{name:"code",type:"input",value:"",label:"渠道编号",placeholder:"请输入渠道编号"}],t=[{name:"name",type:"input",value:"",label:"渠道名称",placeholder:"请输入渠道名称"}];return"0"===this.tabIndex?[].concat(e):[].concat(t)},cfgs:function(){var e,t=this,r=[{label:"渠道编号",prop:"code"},{label:"渠道名称",prop:"name"},{label:"渠道ID",prop:"channels"},{label:"进房ID",prop:"room_number"},{label:"推荐状态",prop:"is_effect",render:function(e,t){switch(t.row.is_effect){case 0:return e("span","未生效");case 1:return e("span","已生效");default:return e("span","无")}}},{label:"操作",minWidth:"120px",fixed:"right",render:function(e,r){return e("div",[e("el-button",{props:{type:"primary"},on:{click:function(){t.update(r.row)}}},"修改"),e("el-button",{props:{type:"danger"},on:{click:function(){t.deleteParams(r.row.id)}}},"删除")])}}],a=[{label:"添加时间",render:function(e,t){return e("span",t.row.create_time?Object(F["h"])(t.row.create_time,"YYYY-MM-DD HH:mm:ss",!0):"--")}},{label:"渠道编号",prop:"code"},{label:"渠道名称",prop:"name"},{label:"渠道ID",prop:"channels"},{label:"操作",minWidth:"120px",fixed:"right",render:function(e,r){return e("div",[e("el-button",{props:{type:"primary"},on:{click:function(){t.update(r.row)}}},"修改"),e("el-button",{props:{type:"danger"},on:{click:function(){t.deleteParams(r.row.id)}}},"删除")])}}];return e="0"===this.tabIndex?"getAutoJoinRule":"getChannels",{vm:this,url:k["a"].room[e],columns:"0"===this.tabIndex?[].concat(r):[].concat(a)}}},methods:{beforeSearch:function(e){var t=Object(i["a"])(Object(i["a"])({},this.searchParams),this.dateTimeParams);return{page:e.page,pagesize:e.size,code:t.code,name:t.name}},getList:function(){this.$refs.tableList.getData()},setDateTime:function(e){var t=e?{start_time:e[0],end_time:e[1]}:{};this.$set(this,"dateTimeParams",t)},emptyDateTime:function(){this.dateTimeParams={}},add:function(){this.load("add")},update:function(e){this.load("update",e)},load:function(e,t){var r=this;this.isDestoryComp=!0,setTimeout((function(){r.$refs.editComp.loadParams(e,t)}),50)},onSearch:function(){this.getList()},destoryComp:function(){this.isDestoryComp=!1},saleAmunt:function(e){var t=e.total_cost,r=e.user_count,a=e.count;this.ruleForm={total_cost:t,user_count:r,count:a}},deleteParams:function(e){var t=this;return Object(s["a"])(Object(o["a"])().mark((function r(){return Object(o["a"])().wrap((function(r){while(1)switch(r.prev=r.next){case 0:t.$confirm("确认删除当前动态吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(s["a"])(Object(o["a"])().mark((function r(){var a;return Object(o["a"])().wrap((function(r){while(1)switch(r.prev=r.next){case 0:if("0"!==t.tabIndex){r.next=6;break}return r.next=3,Object(l["r"])({id:e});case 3:a=r.sent,r.next=10;break;case 6:if("1"!==t.tabIndex){r.next=10;break}return r.next=9,Object(l["s"])({id:e});case 9:a=r.sent;case 10:2e3===a.code&&(t.$success("删除成功"),t.getList());case 11:case"end":return r.stop()}}),r)})))).catch((function(){}));case 1:case"end":return r.stop()}}),r)})))()},tabChange:function(){this.searchParams.code=""}}},D=O,j=(r("5d4c"),Object(g["a"])(D,a,n,!1,null,null,null));t["default"]=j.exports},"5d4c":function(e,t,r){"use strict";r("7cb1")},"7cb1":function(e,t,r){},"9a82":function(e,t,r){"use strict";r("f2cc")},f2cc:function(e,t,r){}}]);