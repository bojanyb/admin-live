(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5540fab0"],{e74e:function(e,t,i){"use strict";i("fe27")},f9f5:function(e,t,i){"use strict";i.r(t);var r=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{attrs:{id:"chartRecordPage"}},[i("el-col",{staticClass:"toolbar",staticStyle:{"padding-bottom":"0px"},attrs:{span:24}},[i("el-form",{attrs:{inline:!0,model:e.filters},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleSearch(t)}}},[i("el-form-item",{attrs:{label:"发送消息ID"}},[i("el-input",{directives:[{name:"input-limit",rawName:"v-input-limit",value:0,expression:"0"}],attrs:{placeholder:"请输入发送消息用户ID",clearable:""},model:{value:e.filters.from_id,callback:function(t){e.$set(e.filters,"from_id",t)},expression:"filters.from_id"}})],1),i("el-form-item",{attrs:{label:"接收消息ID"}},[i("el-input",{directives:[{name:"input-limit",rawName:"v-input-limit",value:0,expression:"0"}],attrs:{placeholder:"请输入接收消息用户ID",clearable:""},model:{value:e.filters.to_id,callback:function(t){e.$set(e.filters,"to_id",t)},expression:"filters.to_id"}})],1),i("el-form-item",{attrs:{label:"类型"}},[i("el-select",{attrs:{placeholder:"请选择"},on:{change:e.handleSearch},model:{value:e.filters.type,callback:function(t){e.$set(e.filters,"type",t)},expression:"filters.type"}},e._l(e.typeList,(function(e){return i("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1),i("el-form-item",{attrs:{label:"选择时间"}},[i("el-date-picker",{attrs:{type:"datetimerange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},on:{change:e.handleSearch},model:{value:e.timer,callback:function(t){e.timer=t},expression:"timer"}})],1),i("el-form-item",[i("el-button",{attrs:{type:"primary"},on:{click:e.handleSearch}},[e._v("查询")])],1)],1)],1),i("div",{attrs:{id:"chartRecord"}},[i("el-card",{staticClass:"phoneMode"},[e.chatList.length>0?i("div",{staticClass:"chatListBox"},e._l(e.chatList,(function(t,r){return i("div",{key:r,staticClass:"chatItem"},[""!==t.create_timeText?i("div",{staticClass:"timeBox"},[e._v(e._s(t.create_timeText))]):e._e(),"other"==t.userType?i("div",{staticClass:"otherBox fl"},[1==t.isShow?i("div",{staticClass:"userImg fl"},[i("img",{attrs:{src:t.remark.face}})]):e._e(),i("div",{staticClass:"userChat fl"},[1==t.isShow?i("div",{staticClass:"userChatHead"},[i("div",{staticClass:"userName fl",staticStyle:{margin:"0","margin-left":"5px"}},[e._v(" "+e._s(t.remark.nickname)+" ")])]):e._e(),1==t.type||8==t.type?i("div",{staticClass:"userChatMsg"},[e._v(e._s(t.content)+" ")]):2==t.type?i("div",{staticClass:"userChatMsg imgBox"},[i("el-image",{staticStyle:{"max-width":"239px"},attrs:{src:t.content.remoteUrl,"preview-src-list":e.srcShowList}})],1):4==t.type?i("div",{staticClass:"userChatMsg videoBox"},[""!==t.content.remoteUrl?i("video",{ref:"videoPlayer"+r,refInFor:!0,class:"videoPlayer"+r,attrs:{controls:"true"}},[i("source",{attrs:{src:t.content.remoteUrl,type:"video/mp4"}})]):e._e()]):e._e()])]):(t.userType="self")?i("div",{staticClass:"selfBox fr"},[i("div",{staticClass:"userChat fl"},[1==t.isShow?i("div",{staticClass:"userChatHead"},[i("div",{staticClass:"userName fr",staticStyle:{margin:"0","margin-left":"5px"}},[e._v(" "+e._s(t.remark.nickname)+" ")])]):e._e(),1==t.type||8==t.type?i("div",{staticClass:"userChatMsg"},[e._v(e._s(t.content)+" ")]):2==t.type?i("div",{staticClass:"userChatMsg imgBox"},[i("el-image",{staticStyle:{"max-width":"239px"},attrs:{src:t.content.remoteUrl,"preview-src-list":e.srcShowList}})],1):4==t.type?i("div",{staticClass:"userChatMsg videoBox"},[""!==t.content.remoteUrl?i("video",{ref:"videoPlayer"+r,refInFor:!0,class:"videoPlayer"+r,attrs:{controls:"true"}},[i("source",{attrs:{src:t.content.remoteUrl,type:"video/mp4"}})]):e._e()]):e._e()]),1==t.isShow?i("div",{staticClass:"userImg fl",staticStyle:{margin:"0","margin-left":"5px"}},[i("img",{attrs:{src:t.remark.face}})]):e._e()]):e._e()])})),0):i("div",{staticClass:"emptyBox"},[i("div",{staticClass:"emptyImgBox"},[i("div",{staticClass:"emptyTextBox"},[e._v("暂无数据")])])])])],1)],1)},s=[],a=(i("65c4"),i("8bda"),i("ee6e"),i("ed70"),i("1a72")),n=i("2f42"),c=i.n(n),o={name:"chat-record",data:function(){return{listLoading:!1,filters:{type:"",notice:"5",start_time:"",end_time:"",from_id:"",to_id:""},timer:"",page:{page:1},typeList:[{id:"1",name:"文本"},{id:"2",name:"图片"},{id:"3",name:"语音消息"},{id:"4",name:"视频消息"},{id:"5",name:"表情消息"},{id:"6",name:"位置信息"},{id:"7",name:"文件消息"},{id:"8",name:"礼物消息"}],chatList:[],currentChatList:[],isFinished:!1,srcShowList:[],currentTime:""}},created:function(){this.getChatRecordList()},methods:{getChatRecordList:function(){var e=this,t={from_id:this.filters.from_id,to_id:this.filters.to_id,type:this.filters.type,notice:this.filters.notice,start_time:this.timer?JSON.stringify(new Date(this.timer[0]).getTime()/1e3):"",end_time:this.timer?JSON.stringify(new Date(this.timer[1]).getTime()/1e3):"",page:this.page.page,pagesize:this.page.limit};Object(a["K"])(t).then((function(t){2e3==t.code&&(e.currentChatList=t.data.list,e.currentChatList.length>0&&(e.currentChatList.forEach((function(t,i){if(0==i)1==e.page.page?(e.currentTime=t.create_time,t.create_timeText=c()(1e3*t.create_time).format("YYYY-MM-DD HH:mm:ss")):t.create_timeText="";else{var r=(t.create_time-e.currentTime)/60;r>5?(e.currentTime=t.create_time,t.create_timeText=c()(1e3*t.create_time).format("YYYY-MM-DD HH:mm:ss")):t.create_timeText=""}if(t.remark=JSON.parse(t.remark),2!=t.remark.genre&&5!=t.remark.genre&&6!=t.remark.genre||1!=t.type||(t.content="( 用户: "+t.from_id+" ) "+t.content),4==t.remark.genre){var s="";switch(t.remark.action){case"1":s="邀请上麦";break;case"2":s="申请上麦";break;case"3":s="上麦";break;case"4":s="下麦";break;case"5":s="自己闭麦";break;case"6":s="开麦";break;case"7":s="禁麦";break}t.content="( 用户: "+t.from_id+" ) "+s}2!==t.remark.genre&&4!==t.remark.genre&&5!==t.remark.genre&&6!==t.remark.genre?t.isShow=!0:t.isShow=!1,t.from_id==e.filters.from_id?t.userType="other":t.from_id==e.filters.to_id&&(t.userType="self"),2!=t.type&&4!=t.type||(t.content=JSON.parse(t.content),2==t.type&&e.srcShowList.push(t.content.remoteUrl)),1!=t.type&&2!=t.type||("string"==typeof t.content&&t.content.indexOf("{")>-1&&(t.content=JSON.parse(t.content)),t.content.remoteUrl&&t.content.remoteUrl.indexOf(".mp4")>-1&&(t.type=4)),e.chatList.push(t)})),e.chatList.length>0&&e.handleWatchChatDivBottom()))})).catch((function(e){}))},handleWatchChatDivBottom:function(){var e=this;this.$nextTick((function(){var t=document.querySelector(".chatListBox"),i=t.offsetHeight;t.onscroll=function(){var r=t.scrollTop,s=t.scrollHeight;i+r-s>=-1&&(e.currentChatList.length>0?(e.page.page++,e.getChatRecordList()):0==e.isFinished&&(e.$message.success("已全部加载完毕！"),e.isFinished=!0))}}))},handleSearch:function(){""!=this.filters.to_id?(this.chatList=[],this.isFinished=!1,this.getChatRecordList()):this.$message.error("接收消息ID参数为必填！")}}},l=o,m=(i("e74e"),i("e607")),d=Object(m["a"])(l,r,s,!1,null,"5e7150f8",null);t["default"]=d.exports},fe27:function(e,t,i){}}]);