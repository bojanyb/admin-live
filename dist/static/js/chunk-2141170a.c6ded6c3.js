(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2141170a"],{"1fe8":function(e,t,r){e.exports=r.p+"static/img/error.e53687be.png"},"231d":function(e,t,r){"use strict";r("651c")},2708:function(e,t,r){"use strict";var n=r("4672"),a=r("52c1"),i={data:function(){return{tabIndex:"0",page:1,size:10,limit:10,searchParams:{},dataParams:{}}},computed:Object(n["a"])({},Object(a["c"])({permissionArr:function(e){return e.permission.permissionArr}})),mounted:function(){console.log(this.permissionArr,"permissionArr")}};t["a"]=i},"651c":function(e,t,r){},f566:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"room-historylist"},[r("div",{staticClass:"searchParams"},[r("SearchPanel",{attrs:{forms:e.forms,"show-reset":!0,"show-search-btn":!0},on:{onReset:e.reset,onSearch:e.onSearch},model:{value:e.searchParams,callback:function(t){e.searchParams=t},expression:"searchParams"}})],1),r("tableList",{ref:"tableList",attrs:{cfgs:e.cfgs}})],1)},a=[],i=r("40bd"),s=r("7e8c"),o=r("4672"),c=(r("23dc"),r("8bda"),r("48d4"),r("65c4"),r("1a72")),u=r("04a2"),l=r("4053"),m=r("8daa"),p=r("cf45"),d=r("2708"),b=r("279a"),h={name:"RoomList",mixins:[d["a"]],components:{SearchPanel:u["a"],tableList:l["a"]},data:function(){return{list:[],listLoading:!0,total:0,multipleSelection:[],filters:{room_number:"",is_live:"",guild_number:null},page:{page:1,limit:10}}},computed:{forms:function(){return[{name:"inputSelect",value:"",selectName:"iSelect",type:"inputSelect",placeholder:"请输入ID",selectPlaceholder:"请选择",selctValue:"room",keyName:"key",optionLabel:"label",selectWidth:"130px",handler:{change:function(e){}},options:[{key:"room",label:"房间ID"},{key:"user",label:"房主ID"}]},{name:"guild_id",type:"input",value:"",label:"公会",isNum:!0,placeholder:"请输入公会ID"}]},cfgs:function(){return{vm:this,url:m["a"].room.liveRoomHistory,isShowIndex:!0,columns:[{label:"直播场次ID",width:"100px",prop:"id"},{label:"房间ID",prop:"room_number"},{label:"房间名称",width:"150px",prop:"room_name"},{label:"房间类型",prop:"room_genre_name"},{label:"房主ID",width:"100px",prop:"user_number"},{label:"所属公会",width:"100px",render:function(e,t){return e("div",[e("div",t.row.guild_number),e("div",t.row.guild_name||"无")])}},{label:"开播时间",width:"180px",render:function(e,t){return e("span",t.row.start_time?Object(p["h"])(t.row.start_time,"YYYY-MM-DD HH:mm:ss",!0):"无")}},{label:"结束时间",width:"180px",render:function(e,t){return e("span",t.row.end_time?Object(p["h"])(t.row.end_time,"YYYY-MM-DD HH:mm:ss",!0):"无")}},{label:"开播时长",width:"180px",render:function(e,t){var r=t.row.end_time-t.row.start_time,n=Object(p["d"])(r);return e("span",n||"无")}},{label:"进入房间人数",width:"120px",prop:"enter_user_count"},{label:"付费人数",width:"95px",prop:"consume_user_count"},{label:"本场流水（喵粮）",width:"140px",prop:"total_gain"},{label:"解散方式",width:"95px",prop:"people",render:function(e,t){var r=b["a"].DISSOLUTIONTYPELIST.find((function(e){return t.row.disband_type===e.value}));return e("span",r?r.name:"无")}},{label:"解散人",width:"95px",prop:"disband_username"}]}}},methods:{beforeSearch:function(e){var t=Object(o["a"])({},this.searchParams);return t.room_number=t.inputSelect,t.user_number=t.inputSelect,"room"===t.iSelect?delete t.user_number:"user"===t.iSelect&&delete t.room_number,{page:e.page,pagesize:e.size,room_number:t.room_number,user_number:t.user_number,guild_id:t.guild_id}},getList:function(){this.$refs.tableList.getData()},reset:function(){this.searchParams={iSelect:"room",inputSelect:""},this.getList()},onSearch:function(){this.getList()},handleRoom:function(e){var t=this,r=1==e.status?"确定冻结当前房间吗?":"确定解冻当前房间吗?";this.$alert(r,"提示",{confirmButtonText:"确定",callback:function(r){if("confirm"==r){var n={room_number:JSON.stringify(e.room_number),status:1==e.status?"3":"1"};Object(c["eb"])(n).then((function(e){t.$message.success("操作成功"),t.getList()})).catch((function(e){t.$message.error("操作失败")}))}}})},roomHideFunc:function(e,t){var r=this;return Object(s["a"])(Object(i["a"])().mark((function n(){var a;return Object(i["a"])().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return a={id:e,is_hide:t},n.next=3,Object(c["Qb"])(a);case 3:r.getList();case 4:case"end":return n.stop()}}),n)})))()},roomTopFunc:function(e,t){var r=this;return Object(s["a"])(Object(i["a"])().mark((function n(){var a;return Object(i["a"])().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return a={id:e,top:t},n.next=3,Object(c["Rb"])(a);case 3:r.getList();case 4:case"end":return n.stop()}}),n)})))()}}},f=h,_=(r("231d"),r("e607")),w=Object(_["a"])(f,n,a,!1,null,null,null);t["default"]=w.exports}}]);