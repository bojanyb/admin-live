(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-701af960"],{"1f18":function(e,t,n){"use strict";n("75d6")},"1fe8":function(e,t,n){e.exports=n.p+"static/img/error.e53687be.png"},"20d6":function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"guild-apply-list-box"},[n("menuComp",{ref:"menuComp",attrs:{menuList:e.menuList},model:{value:e.tabIndex,callback:function(t){e.tabIndex=t},expression:"tabIndex"}}),n(e.comp,{tag:"component"})],1)},s=[],a=n("3923"),i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"guild-apply-list-box"},[n("SearchPanel",{attrs:{forms:e.forms,"show-reset":!0,"show-search-btn":!0},on:{onReset:e.reset,onSearch:e.onSearch,add:e.add},model:{value:e.searchParams,callback:function(t){e.searchParams=t},expression:"searchParams"}}),n("tableList",{ref:"tableList",attrs:{cfgs:e.cfgs}})],1)},c=[],o=n("c7eb"),u=n("1da1"),l=n("5530"),d=(n("14d9"),n("caad"),n("2532"),n("ac1f"),n("841c"),n("1a72")),p=n("c24f"),m=n("4053"),h=n("04a2"),f=n("2708"),b=n("8daa"),g=n("cf45"),w=n("279a"),v={data:function(){return{}},components:{menuComp:a["a"],tableList:m["a"],SearchPanel:h["a"]},mixins:[f["a"]],computed:{forms:function(){return[{name:"guild_number",type:"input",value:"",label:"公会ID",isNum:!0,placeholder:"请输入公会ID"},{name:"user_number",type:"input",value:"",label:"主播ID",isNum:!0,placeholder:"请输入主播ID"}]},cfgs:function(){var e=this,t=[{label:"加入时间",render:function(e,t){return e("span",t.row.create_time?Object(g["h"])(t.row.create_time,"YYYY-MM-DD HH:mm:ss",!0):"无")}},{label:"主播ID",showOverFlow:!0,render:function(e,t){return e("span",t.row.user_number||"无")}},{label:"主播昵称",showOverFlow:!0,render:function(e,t){return e("span",t.row.nickname||"无")}},{label:"公会",showOverFlow:!0,render:function(e,t){return e("div",[e("div",t.row.guild_nickname),e("div","(".concat(t.row.guild_number,")")||!1)])}},{label:"主播等级",showOverFlow:!0,render:function(e,t){return e("span",t.row.live_rank||"0")}},{label:"主播状态",showOverFlow:!0,render:function(e,t){return e("span",{style:{color:1==+t.row.status?"#67C23A":2==t.row.status?"#E6A23C":"#F56C6C"}},1==t.row.status?"正常":(2==t.row.status?"封禁":"注销")||"")}},{label:"私聊权限",headIcon:n("2f1d"),render:function(t,n){var r=[];return r.push(t("el-switch",{props:{value:n.row.is_private_chat,activeValue:1},on:{change:function(){e.change(n.row)}}})),t("div",{style:{display:e.permissionArr.includes("Guild@changePrivateChat")?"unset":"none"}},r)}},{label:"操作",fixed:"right",minWidth:"100px",render:function(t,n){return t("div",[t("el-button",{props:{type:"danger"},style:{display:e.permissionArr.includes("Guild@rmGuildUser")?"unset":"none"},on:{click:function(){e.clickDel(n.row)}}},"移除")])}}];return{vm:this,url:b["a"].guild.getGuildUsers,columns:this.permissionArr.includes("Guild@guildUsers")?t:[]}}},methods:{getList:function(){this.$refs.tableList.getData()},beforeSearch:function(e){var t=Object(l["a"])({},this.searchParams);return{page:e.page,pagesize:e.size,guild_number:t.guild_number,user_number:t.user_number,status:t.status,guild_type:2}},reset:function(){this.searchParams={},this.getList()},onSearch:function(){this.getList()},add:function(){this.$prompt("用户ID","提示",{confirmButtonText:"确定",cancelButtonText:"取消",inputPattern:/^d+$/,inputErrorMessage:"用户ID格式不正确"}).then((function(e){var t=e.value;console.log(t)})).catch((function(){}))},clickDel:function(e){var t=this,n="确认移除 [ "+e.nickname+" ] 吗？";this.$confirm(n,"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(u["a"])(Object(o["a"])().mark((function n(){var r;return Object(o["a"])().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,Object(p["n"])({id:e.id,guild_type:2});case 2:r=n.sent,2e3===r.code&&(t.$message({type:"success",message:"移除成功!"}),t.getList());case 4:case"end":return n.stop()}}),n)})))).catch((function(){}))},change:function(e){var t=this,n={id:e.id,is_private_chat:0==e.is_private_chat?1:0,guild_type:2};Object(d["j"])(n).then((function(e){var r="";r=1==n.is_private_chat?"私聊权限已开启":"私聊权限已关闭",t.$message({message:r,type:"success"});var s=t.$refs.tableList.search.page;t.$refs.tableList.handlePageChange(s)})).catch((function(e){console.log(e)}))}}},A=v,y=(n("1f18"),n("2877")),k=Object(y["a"])(A,i,c,!1,null,null,null),O=k.exports,x=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"guild-apply-list-box"},[n("SearchPanel",{attrs:{forms:e.forms,"show-reset":!0,"show-search-btn":!0},on:{onReset:e.reset,onSearch:e.onSearch,add:e.add},model:{value:e.searchParams,callback:function(t){e.searchParams=t},expression:"searchParams"}}),n("tableList",{ref:"tableList",attrs:{cfgs:e.cfgs}})],1)},_=[],I={data:function(){return{}},components:{menuComp:a["a"],tableList:m["a"],SearchPanel:h["a"]},mixins:[f["a"]],computed:{forms:function(){return[{name:"user_number",type:"input",value:"",label:"主播ID",isNum:!0,placeholder:"请输入主播ID"},{name:"guild_number",type:"input",value:"",label:"公会ID",isNum:!0,placeholder:"请输入公会ID"}]},cfgs:function(){var e=this,t=[{label:"加入时间",render:function(e,t){return e("span",t.row.create_time?Object(g["h"])(t.row.create_time,"YYYY-MM-DD HH:mm:ss",!0):"无")}},{label:"主播ID",showOverFlow:!0,render:function(e,t){return e("span",t.row.user_number||"无")}},{label:"主播昵称",showOverFlow:!0,render:function(e,t){return e("span",t.row.nickname||"无")}},{label:"公会",showOverFlow:!0,render:function(e,t){return e("div",[e("div",t.row.guild_nickname||"无"),e("div","("+t.row.guild_number+")"||!1)])}},{label:"主播等级",showOverFlow:!0,render:function(e,t){return e("span",t.row.live_rank||"0")}},{label:"主播状态",showOverFlow:!0,render:function(e,t){return e("span",{style:{color:1==+t.row.status?"#67C23A":2==t.row.status?"#E6A23C":"#F56C6C"}},1==t.row.status?"正常":(2==t.row.status?"封禁":"注销")||"")}},{label:"私聊权限",headIcon:n("2f1d"),render:function(t,n){var r=[];return r.push(t("el-switch",{props:{value:n.row.is_private_chat,activeValue:1},on:{change:function(){e.change(n.row)}}})),t("div",{style:{display:e.permissionArr.includes("Guild@changePrivateChat")?"unset":"none"}},r)}},{label:"操作",fixed:"right",minWidth:"100px",render:function(t,n){return t("div",[t("el-button",{props:{type:"danger"},style:{display:e.permissionArr.includes("Guild@rmGuildUser")?"unset":"none"},on:{click:function(){e.clickDel(n.row)}}},"移除")])}}];return{vm:this,url:b["a"].guild.getGuildUsers,columns:this.permissionArr.includes("Guild@guildUsers")?t:[]}}},methods:{getList:function(){this.$refs.tableList.getData()},beforeSearch:function(e){var t=Object(l["a"])({},this.searchParams);return{page:e.page,pagesize:e.size,guild_number:t.guild_number,user_number:t.user_number,status:t.status,guild_type:1}},reset:function(){this.searchParams={},this.getList()},onSearch:function(){this.getList()},add:function(){this.$prompt("用户ID","提示",{confirmButtonText:"确定",cancelButtonText:"取消",inputPattern:/^d+$/,inputErrorMessage:"用户ID格式不正确"}).then((function(e){var t=e.value;console.log(t)})).catch((function(){}))},clickDel:function(e){var t=this,n="确认移除 [ "+e.nickname+" ] 吗？";this.$confirm(n,"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(u["a"])(Object(o["a"])().mark((function n(){var r;return Object(o["a"])().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,Object(p["n"])({id:e.id,guild_type:1});case 2:r=n.sent,2e3===r.code&&(t.$message({type:"success",message:"移除成功!"}),t.getList());case 4:case"end":return n.stop()}}),n)})))).catch((function(){}))},change:function(e){var t=this,n={id:e.id,is_private_chat:0==e.is_private_chat?1:0,guild_type:1};Object(d["j"])(n).then((function(e){var r="";r=1==n.is_private_chat?"私聊权限已开启":"私聊权限已关闭",t.$message({message:r,type:"success"});var s=t.$refs.tableList.search.page;t.$refs.tableList.handlePageChange(s)})).catch((function(e){console.log(e)}))}}},D=I,j=(n("e01ac"),Object(y["a"])(D,x,_,!1,null,null,null)),C=j.exports,L=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"guild-apply-list-box"},[n("SearchPanel",{attrs:{forms:e.forms,"show-reset":!0,"show-search-btn":!0},on:{onReset:e.reset,onSearch:e.onSearch,add:e.add},model:{value:e.searchParams,callback:function(t){e.searchParams=t},expression:"searchParams"}}),n("tableList",{ref:"tableList",attrs:{cfgs:e.cfgs}})],1)},S=[],B={data:function(){return{}},components:{menuComp:a["a"],tableList:m["a"],SearchPanel:h["a"]},mixins:[f["a"]],computed:{forms:function(){return[{name:"type",type:"select",value:0,keyName:"value",optionLabel:"name",label:"申请类型",placeholder:"请选择",options:w["a"].GUILDAPPLYTYPE},{name:"guild_number",type:"input",value:"",label:"公会ID",isNum:!0,placeholder:"请输入公会ID"},{name:"user_number",type:"input",value:"",label:"主播ID",isNum:!0,placeholder:"请输入主播ID"}]},cfgs:function(){var e=this,t=[{label:"申请时间",render:function(e,t){return e("span",t.row.create_time?Object(g["h"])(t.row.create_time,"YYYY-MM-DD HH:mm:ss",!0):"无")}},{label:"申请类型",showOverFlow:!0,render:function(e,t){return e("span",0==t.row.type?"入会申请":"退会申请")}},{label:"主播ID",showOverFlow:!0,render:function(e,t){return e("span",t.row.user_number)}},{label:"主播昵称",showOverFlow:!0,render:function(e,t){return e("span",t.row.nickname||"无")}},{label:"公会ID",showOverFlow:!0,render:function(e,t){return e("span",t.row.guild_number||"无")}},{label:"公会昵称",showOverFlow:!0,render:function(e,t){return e("span",t.row.guild_nickname||"无")}},{label:"公会类型",showOverFlow:!0,render:function(e,t){return e("span",t.row.guild_nickname||"无")}},{label:"主播性别",showOverFlow:!0,render:function(e,t){return e("span",1==t.row.sex?"男":2==t.row.sex?"女":"未知")}},{label:"手机号码",showOverFlow:!0,render:function(e,t){var n=t.row.phone.substr(0,3)+"****"+t.row.phone.substr(7);return e("span",n||"无")}},{label:"操作",fixed:"right",minWidth:"100px",render:function(t,n){return t("div",[t("el-button",{props:{type:"primary"},style:{display:0===n.row.status&&e.permissionArr.includes("Guild@guildUserApplyCheck")?"unset":"none"},on:{click:function(){e.clickFunc(n.row,1)}}},"通过"),t("el-button",{props:{type:"danger"},style:{display:0===n.row.status&&e.permissionArr.includes("Guild@guildUserApplyCheck")?"unset":"none"},on:{click:function(){e.clickFunc(n.row,2)}}},"拒绝"),t("el-button",{props:{type:"primary"},style:{display:1===n.row.status?"unset":"none"},on:{click:function(){}}},"已通过"),t("el-button",{props:{type:"danger"},style:{display:2===n.row.status?"unset":"none"},on:{click:function(){}}},"已拒绝")])}}];return{vm:this,url:b["a"].guild.guildUserApply,columns:this.permissionArr.includes("Guild@guildUsers")?t:[]}}},methods:{getList:function(){this.$refs.tableList.getData()},beforeSearch:function(e){var t=Object(l["a"])({},this.searchParams);return{page:e.page,pagesize:e.size,guild_number:t.guild_number,user_number:t.user_number,type:t.type?t.type:0,status:0}},reset:function(){this.searchParams={},this.getList()},onSearch:function(){this.getList()},add:function(){this.$prompt("用户ID","提示",{confirmButtonText:"确定",cancelButtonText:"取消",inputPattern:/^d+$/,inputErrorMessage:"用户ID格式不正确"}).then((function(e){var t=e.value;console.log(t)})).catch((function(){}))},handelAdd:function(){var e=this;this.$refs.ruleForm.validate((function(t){t&&(e.isAdd=!1)}))},clickFunc:function(e,t){var n=this;return Object(u["a"])(Object(o["a"])().mark((function r(){var s,a,i;return Object(o["a"])().wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(1!==t){r.next=8;break}return s={id:e.id,status:t},r.next=4,Object(p["l"])(s);case 4:a=r.sent,2e3===a.code&&(n.$message.success("操作成功"),n.$nextTick((function(e){n.getList()}))),r.next=10;break;case 8:i="是否拒绝 【"+e.nickname+"】的退会申请?",n.$confirm(i,"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(u["a"])(Object(o["a"])().mark((function r(){var s,a;return Object(o["a"])().wrap((function(r){while(1)switch(r.prev=r.next){case 0:return s={id:e.id,status:t},r.next=3,Object(p["l"])(s);case 3:a=r.sent,2e3===a.code&&(n.$message.success("操作成功"),n.getList());case 5:case"end":return r.stop()}}),r)})))).catch((function(){}));case 10:case"end":return r.stop()}}),r)})))()}}},P=B,F=(n("d0e0"),Object(y["a"])(P,L,S,!1,null,null,null)),G=F.exports,E={data:function(){return{isAdd:!1,tabIndex:"0",menuList:[{name:"派对主播"},{name:"直播主播"},{name:"主播申请列表"}]}},components:{menuComp:a["a"],memberComp:O,anchorApplyComp:G,liveAnchorComp:C},mixins:[f["a"]],computed:{comp:function(){var e="";switch(this.tabIndex){case"0":e="memberComp";break;case"1":e="liveAnchorComp";break;case"2":e="anchorApplyComp";break;default:break}return e}},methods:{}},Y=E,U=(n("deb6"),Object(y["a"])(Y,r,s,!1,null,null,null));t["default"]=U.exports},2708:function(e,t,n){"use strict";var r=n("5530"),s=n("2f62"),a={data:function(){return{tabIndex:"0",page:1,size:10,limit:10,searchParams:{},dataParams:{}}},computed:Object(r["a"])({},Object(s["c"])({permissionArr:function(e){return e.permission.permissionArr}})),mounted:function(){console.log(this.permissionArr,"permissionArr")}};t["a"]=a},"2dc5":function(e,t,n){},"2f1d":function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAA+VJREFUaEPtWUtu2zAQJWF1k1MkJ2gvUDS5Qi+QGN23i0AMsoq8CkLBi3RfNLlAr1AHvUB7gvoU2VSEijFIgxoPOUNZqBGgAoIAtky+N28+5IxWL/zRLxy/+k8gKHh7e3tcVdV53/fHSqn4b+3fgf9rrTX8f6rrejWF+nspEIG+8KBLMAGRldb6cR8yowhEwJsSxIl3N0Scc4vr6+uglnjZYgJt2970fU8BB/d48Ds/dV23BkBAFj6rqurYu9c7pRQohp/N7+u6XojRKyUPYgAym82+KqVO0QbgBosSN/AKAqFzgszaOXcmVUOkgAf/Hfk5WGxeApyybMIwYhIsAb/B73hzrXVTKjXnFoRrigyUJUBZXmt9JrW6tfYC0maIBwGJ077vQenwsEpkCVhrYbGtz0vAe0um0urcObfK+Teh+NoYc5IinySAJeXAZ4Ic7w0pc54jAcoppSBhhOfBGDOnSJAEsBUkPo/V8ptBWo2rcsDAkkAGTLoSScBaC+xDrl4ZY85y/itRC7vWCKOQKuwQaNt2EEic6wAxa20fEZwbY0JBG/DGRJ1zJzlXQljIrLRDoNT6yN2yAefJQkreVGeOgH8/TiQ7KlAEthtIrB9bVegWsXsm1QrSYRVwRhoQwO5jjGELHcoYLKBYYQlhIqEM6tAAIAKTTF04oIE4fMYVOA5MKlHEGQ6TxgSK5OUqa/w9UdXZeAm/R4YdZEVMYBswEv+XEqCKXMn6yLWzBIoyhITAvuBhj1ymwwps87kkxUkIjDlP4XVHEZBkII6ApEJza0RxsDVujA0rUFQDcpuPOU+l1itRYLIg5gqQ1PLwXkkQT5ZGSyt0jlCuPuFKHHcc2FOo9IQqqbgMgaRhBwRKD2b/kEAyO1KHuUnioPSMlDlGDG5nODtS94HJ3MiTUKn7gSSQUR3hj9NjD1wSMKXvSC5Xkiul+NBVCpB7n7M+/H6ySz0F5u7u7j18fnV19Y0DSxzRBz3Y1NFG2laBrvGixJfbtr3v+/7jxkpaf67r+pOUBOE6yU5gkgBxihS1+gDkcrl87Zz7GQOezWZvLi8vf3EkiMZWth6VthZFLfCmaaqjo6M/Mdjn5+dXTdN0TO3YaS3munLJGIg3oVp9kj6+tfatUuqLX+uDMeaHtPCF9ySXHvbSDosdor0ubd2LCEQkboiBxMOYOVduYMJ1AmMlxQQCCT+JJEdMMOuCCaSfRG66FPGISSkF4yWVGFFBtiqeOxQRCMwnHvKNAr6NEy6t5b6PiEBfCM/OuKU3Ga3rukfpPIxacJQC1EIRGXbQvS/o0THAmfQQ30+mwCHAiwrZoYBJ9/0LrzwBXu98kQwAAAAASUVORK5CYII="},3138:function(e,t,n){},4974:function(e,t,n){},"75d6":function(e,t,n){},d0e0:function(e,t,n){"use strict";n("2dc5")},deb6:function(e,t,n){"use strict";n("4974")},e01ac:function(e,t,n){"use strict";n("3138")}}]);