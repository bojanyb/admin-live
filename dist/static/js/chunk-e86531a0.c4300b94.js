(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e86531a0"],{"127f":function(e,t,r){"use strict";r.d(t,"a",(function(){return u}));var i=r("40bd"),n=r("7e8c"),s=(r("48d4"),r("8bda"),r("897d")),a=r.n(s),o=r("4109"),l={ossParams:{region:"oss-cn-shenzhen",success_action_status:"200",accessKeyId:"LTAI5tFTcRH7h3RXKoYmnWMk",accessKeySecret:"qdx4B8jIh2VjBgBDG5fNfG0Oj21GSP",bucket:"live-huidapay-net"}};function c(e){var t=e.name.split("."),r=a()(Date.now()+t[0]);return r=r+"."+t[t.length-1],r}function u(e){return new Promise(function(){var t=Object(n["a"])(Object(i["a"])().mark((function t(r,n){var s,a;return Object(i["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return s=c(e),a=new o({region:l.ossParams.region,accessKeyId:l.ossParams.accessKeyId,accessKeySecret:l.ossParams.accessKeySecret,bucket:l.ossParams.bucket}),t.next=4,a.multipartUpload(s,e);case 4:t.sent,r({url:"https://photo.aiyi.live/"+s});case 6:case"end":return t.stop()}}),t)})));return function(e,r){return t.apply(this,arguments)}}())}},"1fe8":function(e,t,r){e.exports=r.p+"static/img/error.e53687be.png"},3928:function(e,t,r){"use strict";r("fa0e")},"73f5":function(e,t,r){"use strict";r("f0f2")},9218:function(e,t,r){"use strict";r.d(t,"b",(function(){return s})),r.d(t,"a",(function(){return a}));var i=r("829b"),n=r("8daa");function s(e){return Object(i["a"])({url:n["a"].userActivity.dwActivity.configDW,method:"post",data:e})}function a(e){return Object(i["a"])({url:n["a"].platformActivity.addFirstCharge,method:"post",data:e})}},e618:function(e,t,r){"use strict";r.r(t);var i=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"zzbxActivity-allocation"},[e.list.length<1?r("el-button",{staticClass:"add",attrs:{type:"success"},on:{click:e.handleAdd}},[e._v("新增")]):e._e(),r("div",{staticClass:"tableList"},[r("tableList",{ref:"tableList",attrs:{cfgs:e.cfgs},on:{saleAmunt:e.saleAmunt}})],1),e.isDestoryComp?r("addComp",{ref:"addComp",attrs:{list:e.list},on:{getList:e.getList,destoryComp:e.destoryComp}}):e._e()],1)},n=[],s=(r("48d4"),r("4053")),a=r("8daa"),o=r("cf45"),l=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"zzbxActivity-add"},[r("el-dialog",{attrs:{title:e.title,visible:e.dialogVisible,width:"500px","before-close":e.handleClose,"close-on-click-modal":!1},on:{"update:visible":function(t){e.dialogVisible=t},closed:e.closed}},[r("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"108px"}},[r("el-form-item",{attrs:{label:"活动名称",prop:"name"}},[r("el-input",{attrs:{disabled:!0},model:{value:e.ruleForm.name,callback:function(t){e.$set(e.ruleForm,"name",t)},expression:"ruleForm.name"}})],1),r("el-form-item",{attrs:{label:"活动图片",prop:"icon"}},[r("Upload",{ref:"Upload",attrs:{imgUrl:e.ruleForm.icon,disabled:e.disabled},on:{validateField:e.validateField},model:{value:e.ruleForm.icon,callback:function(t){e.$set(e.ruleForm,"icon",t)},expression:"ruleForm.icon"}})],1),r("el-form-item",{attrs:{label:"活动类型",prop:"type"}},[r("el-select",{attrs:{disabled:e.disabled,placeholder:"请选择活动类别"},model:{value:e.ruleForm.type,callback:function(t){e.$set(e.ruleForm,"type",t)},expression:"ruleForm.type"}},e._l(e.dwActivityList,(function(e,t){return r("el-option",{key:t,attrs:{label:e.name,value:e.value}})})),1)],1),r("el-form-item",{attrs:{label:"活动链接",prop:"url"}},[r("el-input",{attrs:{disabled:e.disabled},model:{value:e.ruleForm.url,callback:function(t){e.$set(e.ruleForm,"url",t)},expression:"ruleForm.url"}})],1),r("el-form-item",{attrs:{label:"开始时间",prop:"start_time"}},[r("el-date-picker",{attrs:{disabled:e.disabled,"value-format":"timestamp",type:"datetime","picker-options":e.StartPicker,placeholder:"请选择开始时间"},model:{value:e.ruleForm.start_time,callback:function(t){e.$set(e.ruleForm,"start_time",t)},expression:"ruleForm.start_time"}})],1),r("el-form-item",{attrs:{label:"结束时间",prop:"end_time",rules:e.EndRules}},[r("el-date-picker",{attrs:{disabled:e.disabled,"picker-options":e.EndPicker,"value-format":"timestamp",type:"datetime",placeholder:"请选择结束时间"},model:{value:e.ruleForm.end_time,callback:function(t){e.$set(e.ruleForm,"end_time",t)},expression:"ruleForm.end_time"}})],1),r("el-form-item",{staticClass:"footer"},[r("el-button",{on:{click:e.resetForm}},[e._v("取 消")]),r("el-button",{attrs:{disabled:e.disabled,type:"primary"},on:{click:function(t){return e.submitForm("ruleForm")}}},[e._v("确 定")])],1)],1)],1)],1)},c=[],u=r("4672"),d=r("40bd"),m=r("7e8c"),p=(r("00e5"),r("65c4"),r("9218")),f=r("279a"),b=r("40cb"),h={components:{Upload:b["a"]},props:{list:{type:Array,default:[]}},computed:{title:function(){return"add"===this.status?"新增":"update"===this.status?"修改":"查看"},StartRules:function(){var e=this,t={},r=this.ruleForm.start_time;return t={required:!0,validator:function(t,i,n){r<(new Date).getTime()&&"update"!==e.status?n(new Error("开始时间不能小于当前时间!")):n()}},t},EndRules:function(){var e=this,t={},r=this.ruleForm.start_time,i=this.ruleForm.end_time;return t={required:!0,validator:function(t,n,s){i<(new Date).getTime()&&"update"!==e.status&&s(new Error("结束时间不能小于当前时间!")),r&&i<=r&&"update"!==e.status?s(new Error("结束时间不能小于开始时间!")):s()}},t},StartPicker:function(){return{disabledDate:function(e){return e.getTime()<(new Date).getTime()-864e5}}},EndPicker:function(){var e=this;return{disabledDate:function(t){return e.ruleForm.start_time?t.getTime()<e.ruleForm.start_time-864e5:t.getTime()<(new Date).getTime()-864e5}}},disabled:function(){return"see"===this.status}},data:function(){return{status:"add",code:"dw",dialogVisible:!1,dwActivityList:f["a"].DWACTIVITYTYPE,ruleForm:{id:null,name:"2022端午活动",icon:"",type:"",url:"",start_time:null,end_time:null,animation:"11"},rules:{name:[{required:!0,message:"请输入活动名称",trigger:"blur"}],icon:[{required:!0,message:"请输入活动图片",trigger:"change"}],type:[{required:!0,message:"请选择活动类型",trigger:"change"}],url:[{required:!0,message:"请输入活动链接",trigger:"blur"}],start_time:[{type:"date",required:!0,message:"请选择开始时间",trigger:"change"}],end_time:[{type:"date",required:!0,message:"请选择结束时间",trigger:"change"}]}}},methods:{handleClose:function(){this.resetForm()},loadParams:function(e,t){var r=this;return Object(m["a"])(Object(d["a"])().mark((function i(){var n;return Object(d["a"])().wrap((function(i){while(1)switch(i.prev=i.next){case 0:r.status=e,"add"!==e&&(n=JSON.parse(JSON.stringify(t)),n.start_time=1e3*n.start_time,n.end_time=1e3*n.end_time,r.ruleForm=n),r.dialogVisible=!0;case 3:case"end":return i.stop()}}),i)})))()},submitForm:function(e){var t=this;this.$refs[e].validate((function(e){if(!e)return console.log("error submit!!"),!1;var r=Object(u["a"])({},t.ruleForm);r.code="dw",r.start_time=Math.floor(r.start_time/1e3),r.end_time=Math.floor(r.end_time/1e3),Object(p["b"])(r).then((function(e){t.dialogVisible=!1,t.$message.success("创建成功!"),t.$emit("getList")})).catch((function(e){t.$message.error(e)}))}))},resetForm:function(){var e=this;"see"!==this.status?this.$confirm("关闭后数据不会保存，确定关闭吗？").then((function(t){e.dialogVisible=!1})).catch((function(e){})):this.dialogVisible=!1},closed:function(){this.$emit("destoryComp")},validateField:function(e){this.$refs.ruleForm.validateField([e])}}},g=h,v=(r("73f5"),r("e607")),y=Object(v["a"])(g,l,c,!1,null,null,null),w=y.exports,_=r("1a72"),F={components:{tableList:s["a"],addComp:w},data:function(){return{status:"add",isDestoryComp:!1,list:[]}},computed:{cfgs:function(){var e=this;return{vm:this,url:a["a"].platformActivity.Activityins,columns:[{label:"活动名称",minWidth:"140px",prop:"name",render:function(e,t){return e("span",t.row.name)}},{label:"活动状态",render:function(e,t){var r=1e3*t.row.start_time,i=1e3*t.row.end_time,n=(new Date).getTime();return r>n&&i>n?e("span",{style:{color:"green"}},"未开始"):r<n&&i>n?e("span",{style:{color:"green"}},"开始中"):i<n?e("span",{style:{color:"red"}},"结束"):void 0}},{label:"活动图",prop:"icon",isimg:!0,imgWidth:"50px"},{label:"外部链接",prop:"url",minWidth:"240px"},{label:"开始时间",prop:"start_time",minWidth:"160px",render:function(e,t){return e("span",t.row.start_time?Object(o["h"])(t.row.start_time,"YYYY-MM-DD HH:mm:ss",!0):"")}},{label:"结束时间",prop:"end_time",width:"160",render:function(e,t){return e("span",t.row.end_time?Object(o["h"])(t.row.end_time,"YYYY-MM-DD HH:mm:ss",!0):"")}},{label:"操作",width:"350",fixed:"right",render:function(t,r){return t("div",[t("el-button",{props:{type:"primary"},on:{click:function(){e.update(r.row)}}},"修改"),t("el-button",{props:{type:"primary"},on:{click:function(){e.see(r.row)}}},"查看"),t("el-button",{props:{type:"danger"},style:{display:(new Date).getTime()<1e3*r.row.end_time?"unset":"none"},on:{click:function(){e.freeze(r.row)}}},"冻结"),t("el-button",{props:{type:"danger"},style:{display:(new Date).getTime()>1e3*r.row.end_time?"unset":"none"},on:{click:function(){e.deleteFunc(r.row)}}},"删除")])}}]}}},methods:{beforeSearch:function(e){return{page:e.page,pagesize:e.size,code:"dw"}},getList:function(){this.$refs.tableList.getData()},handleAdd:function(){this.load("add")},update:function(e){this.load("update",e)},see:function(e){this.load("see",e)},load:function(e,t){var r=this;this.isDestoryComp=!0,setTimeout((function(){r.$refs.addComp.loadParams(e,t)}),100)},destoryComp:function(){this.isDestoryComp=!1},freeze:function(e){var t=this;this.$confirm("确认冻结当前活动？").then((function(r){e.end_time=Math.floor((new Date).getTime()/1e3),Object(p["b"])(e).then((function(r){e.gifts=r.data.list,t.$message.success("冻结成功!"),t.getList()})).catch((function(e){t.$message.error("冻结失败!")}))})).catch((function(e){}))},deleteFunc:function(e){var t=this;this.$confirm("确认删除当前活动？").then((function(r){Object(_["B"])({id:e.id}).then((function(e){t.$message.success("删除成功!"),t.getList()})).catch((function(e){t.$message.error("删除失败!")}))}))},saleAmunt:function(e){this.list=e.list}}},k=F,D=(r("3928"),Object(v["a"])(k,i,n,!1,null,null,null));t["default"]=D.exports},f0f2:function(e,t,r){},fa0e:function(e,t,r){}}]);