(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5a9ff161"],{"56fb":function(e,t,a){},c779:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"gameList-box"},[a("div",{staticClass:"conBox"},[a("div",{staticClass:"game-type"},[a("div",{staticClass:"leftBox"},[a("span",[e._v("游戏类型：")]),a("el-select",{attrs:{multiple:"",placeholder:"请选择"},on:{change:e.gameChange},model:{value:e.value1,callback:function(t){e.value1=t},expression:"value1"}},e._l(e.gameList,(function(e){return a("el-option",{key:e.value,attrs:{label:e.name,value:e.value}})})),1)],1)]),a("div",{staticClass:"gameBox"},e._l(e.selectList,(function(t,s){return a("div",{key:t.value},[a("div",{staticClass:"uploadBox"},[a("img",{attrs:{src:t.url,alt:""}})]),a("span",{staticClass:"name"},[a("span",[e._v("名称：")]),e._v(" "+e._s(t.name))]),a("span",{staticClass:"nickname"},[a("span",[e._v("昵称：")]),e._v(" "+e._s(t.nickname))]),a("span",[a("span",[e._v("特色：")]),e._v(" "+e._s(t.feature))]),a("span",{staticClass:"closeBox",on:{click:function(t){return e.deleteParams(s)}}},[e._v("删除")])])})),0)])])},n=[],i=a("40bd"),c=a("7e8c"),l=(a("8bda"),a("0f77"),a("ee6e"),a("23dc"),a("ed70"),a("2910"),a("9dcb"),a("c24f")),u=a("279a"),o={data:function(){return{value1:"",gameList:u["a"].PARTYGAMELIST,selectList:[]}},methods:{gameChange:function(e){var t={ids:e.toString()};this.getRoomGame(t)},setGame:function(e){var t=this,a=[];e&&e.length>0&&e.forEach((function(e){var s=t.gameList.find((function(t){return t.value===e}));a.push(s)})),this.selectList=a},deleteParams:function(e){this.selectList.splice(e,1),this.value1.splice(e,1),this.gameChange(this.value1)},getRoomGame:function(e){var t=this;return Object(c["a"])(Object(i["a"])().mark((function a(){var s,n;return Object(i["a"])().wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,Object(l["o"])(e);case 2:s=a.sent,s.data.ids&&(n=s.data.ids.split(","),t.value1=n.map((function(e){return e})),t.setGame(t.value1));case 4:case"end":return a.stop()}}),a)})))()}},mounted:function(){this.getRoomGame()}},r=o,v=(a("f269"),a("e607")),f=Object(v["a"])(r,s,n,!1,null,null,null);t["default"]=f.exports},f269:function(e,t,a){"use strict";a("56fb")}}]);