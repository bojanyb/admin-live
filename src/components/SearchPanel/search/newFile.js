export default (await import('vue')).defineComponent({
name: 'SearchInput',
inheritAttrs: false,
props: {
value: {
type: String,
default: ''
},
valType: {
type: String,
default: 'text'
},
// 查询方法
query: {
type: Function,
default: null
},
// 显示字段
formatter: {
type: Function,
default: function (item) {
return item.text || '';
}
},
// 默认显示 废弃
defaultValue: {
type: String,
default: ''
},
// 输入字段为空时的占位提示
placeholder: {
type: String,
default: '请输入搜索关键字'
},
// 是否仅读
readonly: {
type: Boolean,
default: false
},
// 是否禁用
disabled: {
type: Boolean,
default: false
},
// 输入多少个字符后 才触发查询
limit: {
type: Number,
default: 1
},
// 而外参数
params: {
type: Object,
default: function () {
return {};
}
},
// 输入建议对象中用于显示的键名
valueKey: {
type: String,
default: 'value'
},
// Autocomplete 下拉列表的类名
popperClass: {
type: String,
default: 'zr-suggestion'
},
// 是否在输入框 focus 时显示建议列表
triggerOnFocus: {
type: Boolean,
default: true
},
// 开启完美匹配(当下拉选项只有一条时才可以通过回车选中)
perfect: {
type: Boolean,
default: false
},
// 数据过滤
dataFilter: {
type: Function,
default: function (res) {
return res;
}
}
},
data() {
return {
keyword: '',
// 是否默认突出显示远程搜索建议中的第一项
highlightFirst: false,
valTypeList: {
versionNumber: /[^\d+(\.?)]|(\.[0-9]{3,})|\.{2,}/g
},
// 输入动作开始
writeStart: false,
dataList: [],
targetItem: null
};
},
computed: {},
watch: {
defaultValue: function (v) {
this.keyword = v;
}
},
created() {
},
mounted() {
// this.keyword = this.defaultValue
},
methods: {
// 查询
querySearch(queryString, cb) {
const str = this.filterQuery(queryString);
if (str.length < this.limit) {
this.dataList = [];
cb([]);
return;
}
// cb([]) 如果加上 loading将不会显示
this.searchFunc(str)
.then(res => {
res = Array.isArray(res) ? res : Array.isArray(res.list) ? res.list : [];
const _res = this.dataFilter(res);
this.dataList = _res;
cb(_res);
})
.catch(() => {
this.dataList = [];
cb([]);
});
},
// 查询方法
searchFunc(data) {
return new Promise((resolve, reject) => {
this.query(data, this.params)
.then(res => {
// 开启完美匹配(当下拉选项只有一条时才可以通过回车选中)
if (this.perfect) {
if (res.data.length === 1) {
this.highlightFirst = true;
} else {
this.highlightFirst = false;
}
}
resolve(res.data);
})
.catch(e => {
reject();
// this.$refs.auticomplete.close()
});
});
},
// 选中
handleSelect(item) {
/* if (this.perfect && this.$refs.auticomplete.suggestions.length !== 1) {
debugger
return
}*/
this.keyword = this.formatter(item);
this.targetItem = item;
this.$emit('onSelect', item);
},
handleInput(v) {
const str = this.filterQuery(v);
this.writeStart = true;
this.$emit('input', str);
},
// 清空
handleClear() {
this.$emit('clear', null);
},
// 失去焦点
handleBlur() {
setTimeout(() => {
if (this.writeStart) {
this.writeStart = false;
if (!this.targetItem || this.dataList.length === 0) {
// 清空输入框
this.$emit('input', '');
} else {
this.targetItem = null;
this.dataList = [];
}
}
}, 200);
},
filterQuery(queryString = '') {
if (this.valType !== 'text') {
const reg = this.valTypeList[this.valType];
return queryString.replace(reg, '');
}
return queryString;
}
}
});
