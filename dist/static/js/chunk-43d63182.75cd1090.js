(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-43d63182"],{"09f4":function(t,e,i){"use strict";i.d(e,"a",(function(){return s})),Math.easeInOutQuad=function(t,e,i,a){return t/=a/2,t<1?i/2*t*t+e:(t--,-i/2*(t*(t-2)-1)+e)};var a=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)}}();function o(t){document.documentElement.scrollTop=t,document.body.parentNode.scrollTop=t,document.body.scrollTop=t}function r(){return document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop}function s(t,e,i){var s=r(),n=t-s,l=20,p=0;e="undefined"===typeof e?500:e;var m=function t(){p+=l;var r=Math.easeInOutQuad(p,s,n,e);o(r),p<e?a(t):i&&"function"===typeof i&&i()};m()}},"0ef1":function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"invite-join-us"},[i("div",{staticClass:"searchParams"},[0===t.count?i("el-button",{staticClass:"add",attrs:{type:"success"},on:{click:t.handleAdd}},[t._v("新增")]):t._e()],1),i("div",{staticClass:"tableList"},[i("tableList",{ref:"tableList",attrs:{cfgs:t.cfgs},on:{saleAmunt:t.saleAmunt}})],1),i("el-dialog",{attrs:{"close-on-click-modal":!1,title:t.editTitle,visible:t.editPop,"before-close":t.handleCancel},on:{"update:visible":function(e){t.editPop=e}}},[i("div",{staticClass:"header-title",staticStyle:{height:"40px"},attrs:{slot:"title"},slot:"title"},[i("div",{staticClass:"fl"},[t._v(t._s(t.editTitle))])]),i("el-form",{ref:"popForm",attrs:{model:t.popForm,rules:t.popFormRules}},[i("el-form-item",{attrs:{label:"活动名称",prop:"name","label-width":t.formLabelWidth}},[i("el-col",{attrs:{span:17}},[i("el-input",{staticStyle:{width:"335px"},attrs:{disabled:""},model:{value:t.popForm.name,callback:function(e){t.$set(t.popForm,"name",e)},expression:"popForm.name"}})],1)],1),i("el-form-item",{attrs:{label:"活动图标",prop:"icon","label-width":t.formLabelWidth}},[i("el-col",{attrs:{span:17}},[i("ossFile",{attrs:{picImg:t.imageUrl,type:"img",play_type:1},on:{getUpLoadImg:t.getUpLoadImg}})],1)],1),i("el-form-item",{attrs:{label:"活动类型",prop:"type","label-width":t.formLabelWidth}},[i("el-col",{attrs:{span:17}},[i("el-select",{staticStyle:{width:"335px"},attrs:{disabled:"Detail"==t.popForm.typeName,placeholder:"请选择活动类别"},model:{value:t.popForm.type,callback:function(e){t.$set(t.popForm,"type",e)},expression:"popForm.type"}},t._l(t.dwActivityList,(function(t,e){return i("el-option",{key:e,attrs:{label:t.name,value:t.value}})})),1)],1)],1),i("el-form-item",{attrs:{label:"单次消耗",prop:"cost","label-width":t.formLabelWidth}},[i("el-input",{directives:[{name:"input-limit",rawName:"v-input-limit",value:0,expression:"0"}],staticStyle:{width:"335px"},attrs:{placeholder:"最低100",clearable:"",autocomplete:"off",disabled:"Detail"==t.popForm.typeName},model:{value:t.popForm.cost,callback:function(e){t.$set(t.popForm,"cost",e)},expression:"popForm.cost"}}),t._v(" "),i("span",{staticStyle:{"margin-left":"5px"}},[t._v("喵粮")])],1),i("el-form-item",{attrs:{label:"开始时间",prop:"start_time","label-width":t.formLabelWidth}},[i("el-date-picker",{staticStyle:{width:"335px"},attrs:{type:"datetime",placeholder:"选择时间","picker-options":t.pickerBeginDateBefore,"value-format":"yyyy-MM-dd HH:mm:ss",format:"yyyy-MM-dd HH:mm:ss",clearable:"",disabled:"Detail"==t.popForm.typeName},model:{value:t.popForm.start_time,callback:function(e){t.$set(t.popForm,"start_time",e)},expression:"popForm.start_time"}})],1),i("el-form-item",{attrs:{label:"结束时间",prop:"end_time","label-width":t.formLabelWidth}},[i("el-date-picker",{staticStyle:{width:"335px"},attrs:{type:"datetime",placeholder:"选择时间","picker-options":t.pickerBeginDateBefore,"value-format":"yyyy-MM-dd HH:mm:ss",format:"yyyy-MM-dd HH:mm:ss",clearable:"",disabled:"Detail"==t.popForm.typeName},model:{value:t.popForm.end_time,callback:function(e){t.$set(t.popForm,"end_time",e)},expression:"popForm.end_time"}})],1),i("el-form-item",{attrs:{label:"添加礼物","label-width":t.formLabelWidth}},[i("div",{staticClass:"fl"},[i("el-button",{attrs:{type:"primary",disabled:!(t.popForm.gifts.length<10&&"Detail"!==t.popForm.typeName)},on:{click:function(e){return t.$refs.gift.handleAddGiftShow()}}},[t._v("添 加 ")])],1)]),i("gift",{ref:"gift",attrs:{status:t.status,isShowLocation:!0,activityType:t.popForm.code,list:t.popForm.gifts}})],1),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},["Detail"!==t.popForm.typeName?i("el-button",{on:{click:t.handleCancel}},[t._v("取 消")]):t._e(),i("el-button",{attrs:{loading:t.loading,type:"primary"},on:{click:t.handleConfirm}},[t._v("确 定")])],1)],1)],1)},o=[],r=(i("b0c0"),i("d9e2"),i("7db0"),i("d3b7"),i("d81d"),i("4e82"),i("a9e3"),i("14d9"),i("4053")),s=i("829b"),n=i("8daa"),l=i("c1df"),p=i.n(l),m=i("899e"),c=i("f300"),d=(i("4362"),i("279a")),u={components:{tableList:r["a"],gift:m["a"],ossFile:c["a"]},data:function(){var t=this;return{status:"add",count:0,editTitle:"新增",editPop:!1,imageUrl:"",formLabelWidth:"100px",loading:!1,dwActivityList:d["a"].DWACTIVITYTYPE,popForm:{id:"",typeName:"",code:"dzp",name:"大转盘",icon:"",animation:"",type:"",cost:"",start_time:"",end_time:"",gifts:[]},popFormRules:{type:[{required:!0,message:"请选择活动类型",trigger:"change"}],name:[{required:!0,trigger:"blur",validator:function(e,i,a){return t.popForm.name&&""!=t.popForm.name?t.popForm.name.length>4?a(new Error("活动名称必须是四个字以内!")):a():a(new Error("活动名称不能为空!"))}}],icon:[{required:!0,trigger:"change",validator:function(e,i,a){return t.imageUrl?a():a(new Error("活动图片不能为空!"))}}],cost:[{required:!0,trigger:"blur",validator:function(e,i,a){return!t.popForm.cost||t.popForm.cost<100?a(new Error("单次消耗喵粮数量不能小于 100!")):a()}}],start_time:[{required:!0,trigger:"change",validator:function(e,i,a){var o=p()(t.popForm.start_time,"YYYY-MM-DD HH:mm:ss").valueOf(),r=p()(t.popForm.end_time,"YYYY-MM-DD HH:mm:ss").valueOf();return t.popForm.start_time&&""!=t.popForm.start_time?o>r?a(new Error("开始时间不能大于结束时间!")):a():a(new Error("活动生效时间不能为空!"))}}],end_time:[{required:!0,trigger:"change",validator:function(e,i,a){var o=p()(t.popForm.start_time,"YYYY-MM-DD HH:mm:ss").valueOf(),r=p()(t.popForm.end_time,"YYYY-MM-DD HH:mm:ss").valueOf();return t.popForm.end_time&&""!=t.popForm.end_time?o>r?a(new Error("开始时间不能大于结束时间!")):a():a(new Error("活动结束时间不能为空!"))}}]},pickerBeginDateBefore:{disabledDate:function(t){return new Date(t).getTime()+864e5<(new Date).getTime()}}}},computed:{forms:function(){return[]},cfgs:function(){var t=this;return{vm:this,url:n["a"].platformActivity.Activityins,method:"post",columns:[{label:"活动名称",minWidth:"100px",prop:"name",render:function(t,e){return t("span",e.row.name)}},{label:"礼物种类数量",minWidth:"120px",prop:"gift_count",render:function(t,e){return t("span",e.row.gift_count)}},{label:"投入",minWidth:"100px",prop:"in",render:function(t,e){return t("span",e.row.in)}},{label:"产出",minWidth:"100px",prop:"out",render:function(t,e){return t("span",e.row.out)}},{label:"单次消耗喵粮数",minWidth:"120px",prop:"cost",render:function(t,e){return t("span",e.row.cost)}},{label:"活动状态",prop:"status",width:"80",render:function(t,e){var i=parseInt((new Date).getTime()/1e3),a=e.row.start_time,o=e.row.end_time;return(i<a||i>o)&&(e.row.status=2),1===e.row.status?t("span",{style:{color:"green"}},"开始"):t("span",{style:{color:"red"}},"暂停")}},{label:"开始时间",minWidth:"160px",prop:"start_time",render:function(t,e){return t("span",e.row.start_time>0?p()(1e3*e.row.start_time).format("YYYY-MM-DD HH:mm:ss"):"")}},{label:"结束时间",minWidth:"160px",prop:"end_time",render:function(t,e){return t("span",e.row.end_time>0?p()(1e3*e.row.end_time).format("YYYY-MM-DD HH:mm:ss"):"")}},{label:"操作",width:"260",fixed:"right",render:function(e,i){return e("div",[e("el-button",{props:{type:"primary"},on:{click:function(){t.hanldeEdit(i.row)}}},"修改"),e("el-button",{props:{type:"primary"},on:{click:function(){t.hanldeShow(i.row)}}},"查看"),e("el-button",{props:{type:1==i.row.status?"danger":"success"},on:{click:function(){t.handleChange(i.row)}}},1==i.row.status?"暂停":"开始")])}}]}}},methods:{beforeSearch:function(t){return{size:t.size,page:t.page,code:"dzp"}},handleAdd:function(){this.status="add",this.popForm={id:"",code:"dzp",name:"大转盘",icon:"",animation:"",cost:"",start_time:"",end_time:"",type:"",gifts:[]},this.imageUrl="",this.popForm.typeName="",this.$refs["popForm"]&&this.$refs["popForm"].resetFields(),this.editPop=!0},saleAmunt:function(t){this.count=t.count},hanldeEdit:function(t){this.status="update",this.popForm.id=t.id,this.popForm.name=t.name,this.imageUrl=t.icon,this.popForm.cost=t.cost,this.popForm.type=t.type,this.popForm.start_time=t.start_time>0?p()(1e3*t.start_time).format("YYYY-MM-DD HH:mm:ss"):"",this.popForm.end_time=t.end_time>0?p()(1e3*t.end_time).format("YYYY-MM-DD HH:mm:ss"):"",this.handleGetGift(t.id),this.popForm.typeName="",this.editTitle="修改",this.editPop=!0},hanldeShow:function(t){this.status="see",this.popForm.id=t.id,this.popForm.name=t.name,this.imageUrl=t.icon,this.popForm.cost=t.cost,this.popForm.type=t.type,this.popForm.start_time=t.start_time>0?p()(1e3*t.start_time).format("YYYY-MM-DD HH:mm:ss"):"",this.popForm.end_time=t.end_time>0?p()(1e3*t.end_time).format("YYYY-MM-DD HH:mm:ss"):"",this.popForm.typeName="Detail",this.handleGetGift(t.id),this.editTitle="查看",this.editPop=!0},handleChange:function(t){var e=this,i=parseInt((new Date).getTime()/1e3),a=t.start_time,o=t.end_time;if(i<a||o<i)this.$message.error("未在活动时间范围内");else{var r={id:t.id,status:1==t.status?2:1};Object(s["a"])({url:n["a"].platformActivity.stop,method:"post",data:r}).then((function(t){e.$message.success("操作成功"),e.$refs.tableList.getData()})).catch((function(t){e.$message.error(t.msg)}))}},getUpLoadImg:function(t){"img"==t.type?this.imageUrl=t.url:"animation"==t.type&&(this.imageSvgUrl=t.url)},handleConfirm:function(){var t=this;if("查看"!=this.editTitle)if(10===this.popForm.gifts.length){var e=this.popForm.gifts.find((function(t){return!t.gift_number}));if(e)this.$message.error("请先输入礼物数量");else{var i=[],a=!0;if(this.popForm.gifts.map((function(t){var e={id:t.id,sort:t.sort,gift_number:Number(t.gift_number)};i.push(e),t.sort||(a=!1)})),0!=a){var o={id:this.popForm.id,code:this.popForm.code,name:this.popForm.name,icon:this.imageUrl,animation:this.popForm.animation,cost:this.popForm.cost,type:this.popForm.type,start_time:p()(this.popForm.start_time,"YYYY-MM-DD HH:mm:ss").valueOf()/1e3,end_time:p()(this.popForm.end_time,"YYYY-MM-DD HH:mm:ss").valueOf()/1e3,gifts:i};Object(s["a"])({url:n["a"].platformActivity.configXYZP,method:"post",data:o}).then((function(e){t.$message.success("操作成功"),t.handleCancel(),t.$refs.tableList.getData()})).catch((function(e){t.$message.error(e)}))}else this.$message.error("请选择有效的礼物位置")}}else this.$message.error("固定配置10个礼物！");else this.handleCancel()},handleCancel:function(){this.editPop=!1},handleGetGift:function(t){var e=this,i={activity_id:t};Object(s["a"])({url:n["a"].platformActivity.getHasAddGift,method:"post",data:i}).then((function(t){e.popForm.gifts=t.data.list})).catch((function(t){}))}}},f=u,h=(i("266c"),i("2877")),g=Object(h["a"])(f,a,o,!1,null,"42f5bf93",null);e["default"]=g.exports},"1fe8":function(t,e,i){t.exports=i.p+"static/img/error.e53687be.png"},"266c":function(t,e,i){"use strict";i("9e99")},"3db9":function(t,e,i){},"75f3":function(t,e,i){"use strict";i("fe35")},9799:function(t,e,i){"use strict";i("3db9")},"9e99":function(t,e,i){},f300:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticStyle:{width:"178px",height:"178px"}},["img"==t.type?i("el-upload",{staticClass:"aliUpload avatar-uploader",attrs:{action:"#","show-file-list":!1,"on-change":t.doUpload,"auto-upload":!1}},[""!==t.imageUrl?i("img",{staticClass:"avatar",attrs:{src:t.imageUrl}}):i("i",{staticClass:"el-icon-plus avatar-uploader-icon"})]):t._e(),"animation"==t.type?i("el-upload",{staticClass:"aliUpload avatar-uploader",attrs:{action:"#","show-file-list":!1,"on-change":t.doUpload,"auto-upload":!1}},[""!==t.imageSvgUrl&&t.imageSvgUrl.indexOf(".zip")>-1?i("i",[t._v("已选择")]):t.imageSvgUrl.indexOf("svga")>-1?i("svgaplayer",{attrs:{"data-title":t.imageSvgUrl,height:178,width:178,"show-img":t.imageSvgUrl}}):t._e(),""==t.imageSvgUrl?i("i",{staticClass:"el-icon-plus avatar-uploader-icon"}):t._e()],1):t._e(),"file"==t.type?i("el-upload",{staticClass:"aliUpload avatar-uploader",attrs:{action:"#","show-file-list":!1,"on-change":t.doUpload,"auto-upload":!1}},[""==t.fileUrl&&t.progressNum<100&&t.progressNum>0?i("i",[t._v("上传进度: "+t._s(t.progressNum)+" %")]):""!==t.fileUrl&&100==t.progressNum?i("i",[t._v("上传完成")]):i("i",{staticClass:"el-icon-plus avatar-uploader-icon"})]):t._e()],1)},o=[],r=i("c7eb"),s=i("1da1"),n=(i("a9e3"),i("b0c0"),i("ac1f"),i("00b4"),i("9b15")),l=i.n(n),p=i("8237"),m=i.n(p),c=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{ref:"canvas",staticClass:"svga",style:{width:t.width,height:t.height},attrs:{id:"demoCanvas"}})},d=[],u=i("d871"),f=i.n(u),h={name:"Svgaplayer",props:{showImg:{type:String,default:""},height:{type:Number,default:178},width:{type:Number,default:178}},data:function(){return{}},created:function(){},mounted:function(){var t=this,e=document.getElementById("demoCanvas");this.$nextTick((function(i){e.style.width=t.width+"px",e.style.height=t.height+"px";var a=new f.a.Player("#demoCanvas"),o=new f.a.Parser("#demoCanvas");o.load(t.showImg,(function(t){a.setVideoItem(t),a.startAnimation()}))}))}},g=h,y=(i("75f3"),i("2877")),v=Object(y["a"])(g,c,d,!1,null,null,null),b=v.exports,w={name:"aliUpload",data:function(){return{imageUrl:"",imageSvgUrl:"",videoUrl:"",fileUrl:"",fileNme:"",size:"",progressNum:0}},props:{picImg:{type:String,default:""},animationImg:{type:String,default:""},type:{type:String,default:"img"},play_type:{type:Number,default:0},progress:{type:Number,default:0}},watch:{play_type:function(t){this.play_type=t},picImg:{handler:function(t){this.imageUrl=t},deep:!0},animationImg:{handler:function(t){this.imageSvgUrl=t},deep:!0}},components:{svgaplayer:b},mounted:function(){"img"==this.type&&(this.imageUrl=this.picImg),"animation"==this.type&&(this.imageSvgUrl=this.animationImg),this.progress>0&&(this.progressNum=this.progress,this.fileUrl=this.picImg),this.client=new l.a({region:"oss-cn-shenzhen",success_action_status:"200",accessKeyId:"LTAI5tFTcRH7h3RXKoYmnWMk",accessKeySecret:"qdx4B8jIh2VjBgBDG5fNfG0Oj21GSP",bucket:"live-huidapay-net"})},methods:{doUpload:function(t){var e=!1,i=t.raw;if(this.size=i.size,e="animation"!=this.type||this.handleFileType(i.name),1==e){i.name.indexOf(".apk")>-1&&(this.fileNme=i.name.split(".apk")[0]);var a=i.name.split("."),o=m()(Date.now()+a[0]);o=o+"."+a[a.length-1],this.multipartUpload(o,i)}},multipartUpload:function(t,e){var i=this,a=this,o=function(){var t=Object(s["a"])(Object(r["a"])().mark((function t(e){return Object(r["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:a.progressNum=Math.round(100*e);case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();try{a.client.multipartUpload(t,e,{progress:o}).then((function(e){a.videoUrl=e.res.requestUrls[0].split("?")[0];var o={};o.name=e.name,o.size=a.size,o.videoUrl=a.videoUrl;var r="https://photo.aiyi.live/"+o.name,s={type:i.type,url:r,fileName:i.fileNme};switch(i.imageUrl="",i.imageSvgUrl="",i.fileUrl="",i.type){case"animation":i.imageSvgUrl=r;break;case"img":i.imageUrl=r;break;case"file":i.fileUrl=r;break}i.$emit("getUpLoadImg",s);a.client.head(t)})).catch((function(t){console.log(t)}))}catch(n){"ConnectionTimeoutError"===n.code&&console.log("Woops,超时啦!"),console.log(n)}},handleFileType:function(t){var e="",i=!1;switch(this.play_type){case 1:e=/(.zip)$/;break;case 2:e=/(.svg|.svga)$/;break;case 3:e=/(.svg|.svga|.zip)$/;break;default:break}return e.test(t.toLowerCase())?i=!0:1==this.play_type?(this.$message.error("请选择zip格式文件"),i=!1):2==this.play_type&&(this.$message.error("请选择特效svga格式文件"),i=!1),i}}},_=w,F=(i("9799"),Object(y["a"])(_,a,o,!1,null,"6c2cf1db",null));e["a"]=F.exports},fe35:function(t,e,i){}}]);