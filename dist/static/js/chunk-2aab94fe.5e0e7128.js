(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2aab94fe"],{"48f6":function(e,t,r){"use strict";r.r(t);var i=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"chartRecordPgae"}},[r("el-col",{staticClass:"toolbar",staticStyle:{"padding-bottom":"0px"},attrs:{span:24}},[r("el-form",{attrs:{inline:!0,model:e.filters},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleSearch(t)}}},[r("el-form-item",{attrs:{label:"用户ID"}},[r("el-input",{directives:[{name:"input-limit",rawName:"v-input-limit",value:0,expression:"0"}],attrs:{placeholder:"请输入发送消息用户ID",clearable:""},model:{value:e.filters.user_number,callback:function(t){e.$set(e.filters,"user_number",t)},expression:"filters.user_number"}})],1),r("el-form-item",{attrs:{label:"房间ID"}},[r("el-input",{directives:[{name:"input-limit",rawName:"v-input-limit",value:0,expression:"0"}],attrs:{placeholder:"请输入房间ID",clearable:""},model:{value:e.filters.to_id,callback:function(t){e.$set(e.filters,"to_id",t)},expression:"filters.to_id"}})],1),r("el-form-item",{attrs:{label:"选择时间"}},[r("el-date-picker",{attrs:{type:"datetimerange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},on:{change:e.handleSearch},model:{value:e.timer,callback:function(t){e.timer=t},expression:"timer"}})],1),r("el-form-item",[r("el-button",{attrs:{type:"primary"},on:{click:e.handleSearch}},[e._v("查询")])],1)],1)],1),r("div",{attrs:{id:"chartRecord"}},[r("el-card",{staticClass:"phoneMode"},[e.chatList.length>0?r("div",{staticClass:"chatListBox"},e._l(e.chatList,(function(t){return r("div",{staticClass:"chatItem"},[""!==t.create_timeText?r("div",{staticClass:"timeBox"},[e._v(e._s(t.create_timeText))]):e._e(),r("div",[1==t.isShow?r("div",{staticClass:"userImg fl"},[r("img",{attrs:{src:t.remark.face}})]):e._e(),r("div",{staticClass:"userChat fl"},[1==t.isShow?r("div",{staticClass:"userChatHead"},[r("div",{staticClass:"userName fl"},[e._v(e._s(t.remark.nickname))])]):e._e(),1==t.type||8==t.type?r("div",{staticClass:"userChatMsg"},[e._v(e._s(t.content)+" ")]):2==t.type?r("div",{staticClass:"userChatMsg imgBox"},[r("el-image",{staticStyle:{"max-width":"239px"},attrs:{src:t.content.remoteUrl,"preview-src-list":e.srcShowList}})],1):4==t.type?r("div",{staticClass:"userChatMsg videoBox"},[""!==t.content.remoteUrl?r("video",{ref:"videoPlayer"+e.index,refInFor:!0,class:"videoPlayer"+e.index,attrs:{controls:"true"}},[r("source",{attrs:{src:t.content.remoteUrl,type:"video/mp4"}})]):e._e()]):e._e()])])])})),0):r("div",{staticClass:"emptyBox"},[r("div",{staticClass:"emptyImgBox"},[r("div",{staticClass:"emptyTextBox"},[e._v("暂无数据")])])])])],1)],1)},a=[],s=(r("65c4"),r("8bda"),r("ee6e"),r("ed70"),r("1a72")),n=r("2f42"),c=r.n(n),o={name:"chat-record",data:function(){return{listLoading:!1,filters:{type:"",notice:"52",start_time:"",end_time:"",user_number:"",to_id:""},timer:"",page:{page:1},chatList:[],currentChatList:[],isFinished:!1,srcShowList:[],currentTime:""}},created:function(){this.getChatRecordList()},methods:{getChatRecordList:function(){var e=this,t={user_number:this.filters.user_number,to_id:this.filters.to_id,notice:this.filters.notice,start_time:this.timer?JSON.stringify(new Date(this.timer[0]).getTime()/1e3):"",end_time:this.timer?JSON.stringify(new Date(this.timer[1]).getTime()/1e3):"",page:this.page.page,pagesize:this.page.limit};Object(s["J"])(t).then((function(t){2e3==t.code&&(e.currentChatList=t.data.list,e.currentChatList.length>0&&(e.currentChatList.forEach((function(t,r){if(0==r)1==e.page.page?(e.currentTime=t.create_time,t.create_timeText=c()(1e3*t.create_time).format("YYYY-MM-DD HH:mm:ss")):t.create_timeText="";else{var i=(t.create_time-e.currentTime)/60;i>5?(e.currentTime=t.create_time,t.create_timeText=c()(1e3*t.create_time).format("YYYY-MM-DD HH:mm:ss")):t.create_timeText=""}if(t.remark=JSON.parse(t.remark),2!=t.remark.genre&&5!=t.remark.genre&&6!=t.remark.genre||1!=t.type||(t.content="( 用户: "+t.user_number+" ) "+t.content),4==t.remark.genre){var a="";switch(t.remark.action){case"1":a="邀请上麦";break;case"2":a="申请上麦";break;case"3":a="上麦";break;case"4":a="下麦";break;case"5":a="自己闭麦";break;case"6":a="开麦";break;case"7":a="禁麦";break}t.content="( 用户: "+t.user_number+" ) "+a}2!==t.remark.genre&&4!==t.remark.genre&&5!==t.remark.genre&&6!==t.remark.genre?t.isShow=!0:t.isShow=!1,2!=t.type&&4!=t.type||(t.content=JSON.parse(t.content),2==t.type&&e.srcShowList.push(t.content.remoteUrl)),e.chatList.push(t)})),e.chatList.length>0&&e.handleWatchChatDivBottom()))})).catch((function(e){}))},handleWatchChatDivBottom:function(){var e=this;this.$nextTick((function(){var t=document.querySelector(".chatListBox"),r=t.offsetHeight;t.onscroll=function(){var i=t.scrollTop,a=t.scrollHeight;r+i-a>=-1&&(e.currentChatList.length>0?(e.page.page++,e.getChatRecordList()):0==e.isFinished&&(e.$message.success("已全部加载完毕！"),e.isFinished=!0))}}))},handleSearch:function(){""!=this.filters.to_id?(this.chatList=[],this.page.page=1,this.getChatRecordList()):this.$message.error("群ID参数为必填！")}}},l=o,m=(r("e58b"),r("e607")),h=Object(m["a"])(l,i,a,!1,null,"ea45f38e",null);t["default"]=h.exports},c9a1:function(e,t,r){},e58b:function(e,t,r){"use strict";r("c9a1")}}]);