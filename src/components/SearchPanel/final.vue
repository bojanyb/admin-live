<!-- 列表搜索栏 -->
<template>
  <div class="share-filter-grid-box">
    <slot name="left" />
    <div class="container">
      <div class="center">
        <el-form ref="dataForm" :model="form" :rules="rules" label-position="right" label-width="auto" :inline="true"
          style="width: 100%;">
          <el-form-item v-for="(item, index) in finalForms" :key="index" :label="item.label" :prop="item.name">
            <!--下拉框 -->
            <el-select v-if="item.type === 'select'" v-model="form[item.name]" :placeholder="item.placeholder"
              class="filter-item" :style="{ width: (item.width || '100%') }" :disabled="cDisabled(item)"
              :clearable="item.clearable || false" :multiple="item.multiple || false"
              @change="mergeEvent(arguments, item)">
              <el-option v-for="option in item.options" :key="option[item.keyName || 'key']"
                :label="option[item.optionLabel || 'label']" :value="option[item.keyName || 'key']" />
            </el-select>
            <!-- 下拉框带输入建议 -->
            <el-autocomplete v-else-if="item.type === 'autocomplete'" v-model="form[item.name]" class="inline-input"
              :fetch-suggestions="querySearch" :placeholder="item.placeholder || ''" :trigger-on-focus="false"
              @select="mergeEvent(arguments, item, 'select')" />
            <!--带下拉框选项切换的输入框-->
            <el-input v-else-if="item.type === 'inputSelect'" v-model="form[item.name]" :placeholder="item.placeholder"
              clearable class="input-with-select" style="width: 100%;" :disabled="cDisabled(item)"
              @change="mergeEvent(arguments, item)" @blur="mergeEvent(arguments, item, 'blur')"
              @focus="mergeEvent(arguments, item, 'focus')" @clear="mergeEvent(arguments, item, 'clear')">
              <el-select slot="prepend" v-model="form[item.selectName]" :disabled="cDisabled(item)"
                :placeholder="item.selectPlaceholder" @change="item.handler.change" :style="{ 'width': item.selectWidth }">
                <el-option v-for="option in item.options" :key="option[item.keyName || 'key']"
                  :label="option[item.optionLabel || 'label']" :value="option[item.keyName || 'key']" />
              </el-select>
              <el-button v-if="item.showButton" slot="append" icon="el-icon-search"
                @click="item.handler.onSearch(form[item.name], form[item.selectName])" />
            </el-input>
            <!--datePicker -->
            <template v-else-if="item.type === 'datePicker'">
              <div class="datePicker">
                <div v-if="item.options && item.options.length > 0">
                  <el-select v-model="form[item.selectName]" :disabled="cDisabled(item)" value-key="key"
                    :placeholder="item.selectPlaceholder || ''" :style="{ width: (item.selectWidth || 110) + 'px' }"
                    @change="mergeEvent(arguments, item, 'selectChange')">
                    <el-option v-for="option in item.options" :key="option[item.keyName || 'key']"
                      :label="option[item.optionLabel || 'label']" :value="option[item.keyName || 'key']" />
                  </el-select>
                </div>
                <el-date-picker :popper-class="item.class" v-model="form[item.name]" :disabled="cDisabled(item)"
                  :type="item.dateType || dateParams.dateType" :picker-options="(preMonth && preMonth > 0) ? pickerOptions : (item.pickerOptions || dateParams.pickerOptions)" range-separator="-"
                  :start-placeholder="item.startPlaceholder || '开始时间'" :end-placeholder="item.endPlaceholder || '结束时间'"
                  :clearable="!item.clearable" :format="item.format || 'yyyy-MM-dd HH:mm:ss'"
                  :value-format="item.valueFormat || 'timestamp'"
                  :default-time="item.defaultTime || ['00:00:00', '23:59:59']" @change="mergeEvent(arguments, item)"
                  @blur="mergeEvent(arguments, item, 'blur')" @focus="mergeEvent(arguments, item, 'focus')"
                  @clear="mergeEvent(arguments, item, 'clear')" />
              </div>
            </template>
            <!--searchCode-->
            <search-code v-else-if="item.type === 'searchCode'" v-model="form[item.name]"
              :placeholder="item.placeholder || '请输入股票代码或名称'" :data-filter="dataFilter"
              @onSelect="onSelectStock(arguments, item)" @clear="mergeEvent(arguments, item, 'clear')" />
            <zr-search v-else-if="item.type === 'popupSearch'" v-model="form[item.name]" class="search"
              popper-class="popup-search" :init-search="true" :query="item.handler.search" :limit="1"
              @onSelect="searchSelect(...arguments, item)">
              <template slot="list" :data="item">
                <slot name="popup-search" :data="item" />
              </template>
            </zr-search>
            <!-- 下拉框 可以创建并选中选项中不存在的条目-->
            <z-select v-else-if="item.type === 'selectWithInput'" v-model="form[item.name]" :options="item.options"
              :allow-create="true" :label-key="item.optionLabel || 'name'" :value-key="item.keyName || 'value'"
              :clearable="item.clearable || false" :type="item.selectType || 'number'" :min="item.min"
              @input="mergeEvent(arguments, item)" />
            <!--级联选择器-->
            <el-cascader
              class="v-cascader"
              v-else-if="item.type === 'cascader'"
              v-model="form[item.name]"
              :options="item.options"
              :props="item.props"
              :disabled="cDisabled(item)"
              :placeholder="item.placeholder"
              :clearable="item.clearable || false"
              :filterable="item.filterable || false"
              :collapse-tags="item.collapse || false"
              @change="mergeEvent(arguments, item)"
            />
            <!--日期控件-->
            <!--日期输入 - 不弹出选择时间弹窗-->
            <dateControl v-else-if="item.type === 'dateControl'" v-model="form[item.name]" ref="dateControl">
            </dateControl>
            <!--输入框-->
            <!--新增输入过滤和输入长度限制-->
            <!--{inputType}值必须为 inputLimited中fnType的键名-->
            <el-input v-else v-model="form[item.name]" :maxlength="item.maxlength || '--'" v-input-num="item.isNum"
              :placeholder="item.placeholder" :disabled="item.disabled" :clearable="item.clearable || false"
              @focus="onFocus" clearable @change="mergeEvent(arguments, item)">
              <template v-if="item.append" slot="append">{{ item.append }}</template>
            </el-input>

          </el-form-item>
          <el-form-item>
            <el-button v-if="showSearchBtn" type="primary" :loading="isLock" @click="onSearch">查询</el-button>
            <el-button v-if="showAdd" type="success" @click="add">{{ addName || '新增' }}</el-button>
            <el-button v-if="showSave" type="success" @click="onSave">保存</el-button>
            <el-button v-if="showToday" @click="today">今天</el-button>
            <el-button v-if="showYesterday" @click="yesterday">昨天</el-button>
            <el-button v-if="showBeforeYesterday" @click="beforeYesterday">前天</el-button>
            <el-button v-if="showRecentSeven" @click="recentSeven">七天</el-button>
            <el-button v-if="showBigBeforeYesterday" @click="bigBeforeYesterday">大前天</el-button>
            <el-button v-if="showCurrentWeek" @click="currentWeek">本周</el-button>
            <el-button v-if="showLastWeek" @click="lastWeek">上周</el-button>
            <el-button v-if="showCurrentMonth" @click="currentMonth">本月</el-button>
            <el-button v-if="showLastMonth" @click="lastMonth">上月</el-button>
            <el-button v-if="showReset" icon="el-icon-refresh" @click="reset">重置</el-button>
            <el-button v-if="showBatchPass" type="success" @click="batchPass">{{ batchFuncName || '批量通过' }}</el-button>
            <el-button v-if="showBatchRurn" type="danger" @click="BatchRurn">{{ batchRurnName || '批量拒绝' }}</el-button>
            <el-button v-if="showExport" :type="customType ||'info'" @click="handleExport">{{ exportName || '导出Excel' }}</el-button>
            <el-button v-if="showCustom" type="warning" @click="handleCustom">{{ customName || '自定义' }}</el-button>
            <el-button v-if="showQuery" type="primary" @click="handleQuery">{{ queryName || '查询' }}</el-button>
          </el-form-item>
        </el-form>
      </div>
      <slot name="bottom" />
    </div>
    <slot name="right" />
  </div>
</template>

<script>
import SearchCode from './searchCode/index.vue'
import ZrSearch from './search/index.vue'
import zSelect from './select/index.vue'
// 引入日期控件
import dateControl from '@/components/dateControl/index.vue'
import moment from 'moment'
export default {
  name: 'TableSearch',
  components: {
    SearchCode,
    ZrSearch,
    zSelect,
    dateControl
  },
  props: {
    // 列表数据
    value: {
      type: Object,
      default: function () {
        return {}
      }
    },
    // 栅格间隔 默认10
    gutter: {
      type: Number,
      default: 20
    },
    // 搜索字段
    forms: {
      type: Array,
      default: function () {
        return []
      }
    },
    // 按钮
    buttons: {
      type: Array,
      default: function () {
        return []
      }
    },
    // 是否显示按钮
    showButton: {
      type: Boolean,
      default: true
    },
    // 是否显示重置按钮
    showReset: {
      type: Boolean,
      default: false
    },
    // 是否显示新增按钮
    showAdd: {
      type: Boolean,
      default: false
    },
    // 是否显示保存按钮
    showSave: {
      type: Boolean,
      default: false
    },
    // 新增 - 名称
    addName: {
      type: String,
      default: ''
    },
    // 是否显示批量通过按钮
    showBatchPass: {
      type: Boolean,
      default: false
    },
    // 是否显示批量拒绝按钮
    showBatchRurn: {
      type: Boolean,
      default: false
    },
    // 是否显示导出按钮
    showExport: {
      type: Boolean,
      default: false
    },
    // 是否显示自定义按钮
    showCustom: {
      type: Boolean,
      default: false
    },
    // 是否显示查询按钮
    showQuery: {
      type: Boolean,
      default: false
    },
    // 显示搜索按钮
    showSearchBtn: {
      type: Boolean,
      default: false
    },
    // 数据搜索项 前后空格过滤搜索开启
    trimOn: {
      type: Boolean,
      default: true
    },
    // 是否在数据变化时直接触发搜索事件
    searchOnChange: {
      type: Boolean,
      default: true
    },
    // 批量操作 - 按钮名称
    batchFuncName: {
      type: String,
      default: ''
    },
    // 批量操作 - 按钮名称
    batchRurnName: {
      type: String,
      default: ''
    },
    // 导出 - 按钮名称
    exportName: {
      type: String,
      default: ''
    },
    // 自定义 - 按钮名称
    customName: {
      type: String,
      default: ''
    },
    // 查询 - 按钮名称
    queryName: {
      type: String,
      default: ''
    },
    // 昨日 - 操作
    showYesterday: {
      type: Boolean,
      default: false
    },
    // 前日 - 操作
    showBeforeYesterday: {
      type: Boolean,
      default: false
    },
    // 大前天 - 操作
    showBigBeforeYesterday: {
      type: Boolean,
      default: false
    },
    // 最近七日 - 操作
    showRecentSeven: {
      type: Boolean,
      default: false
    },
    // 本周 - 操作
    showCurrentWeek: {
      type: Boolean,
      default: false
    },
    // 上周 - 操作
    showLastWeek :{
      type: Boolean,
      default: false
    },
    // 本月 - 操作
    showCurrentMonth :{
      type: Boolean,
      default: false
    },
    // 上月 - 操作
    showLastMonth :{
      type: Boolean,
      default: false
    },
    // 今日 - 操作
    showToday: {
      type: Boolean,
      default: false
    },
    // 时间段 当前时间前几个月，不包含当前月
    preMonth:{
      type: Number,
      default: 0
    },
    // 自定义按钮颜色
    customType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // 表单数据
      form: {},
      // 搜索锁 防止重复提交搜索
      clickLock: false,
      // 焦点锁定 防止在输入当前输入框的时候 点击空格会被替换掉，造成无法输入空格，只有在焦点失去的时候 才触发去除前后空格
      focusLock: false,
      dateParams: {
        dateType: null,
        pickerOptions: null
      },
      pickerOptions: { // 时间选择区间时间限制当前时间前6个月
        onPick: ({ maxDate, minDate }) => {
          this.choiceDate = minDate.getTime();
          if (maxDate) {
            this.choiceDate = ''
          }
        },
        disabledDate: (time) => {
          let preNum = this.preMonth + 1;
          let minTime = new Date(moment().subtract(preNum,'month').format('YYYY-MM-DD') +' 00:00:00').getTime();
          let maxTime = new Date(moment().format("YYYY-MM-DD") + ' 23:59:59').getTime();
          return time.getTime() < minTime || time.getTime() > maxTime
        }
      },
      choiceDate: ''
    }
  },
  computed: {
    // 表单规则
    rules() {
      const arr = this.forms.filter(d => d.rule)
      const rules = {}
      for (let i = 0, len = arr.length; i < len; i++) {
        const item = arr[i]
        rules[item.name] = item.rule
      }
      return rules
    },
    // 获取所有 type === 'inputSelect' 类型的搜索选项
    allInputSelect() {
      const all = {}
      for (const i in this.forms) {
        const item = this.forms[i]
        if (item.type === 'inputSelect') {
          all[item.selectName] = item.name
        }
      }
      return all
    },
    // 获取有权限的表单条目
    finalForms() {
      // return this.forms.filter(button => checkPermission(button.permission || ['noPermission']))
      return this.forms
    },
    // 获取所有数据显示规则
    allDataFilter() {
      const all = {}
      for (const i in this.forms) {
        const item = this.forms[i]
        if (item.dataFilter) {
          all[item.name] = item.dataFilter
        }
      }
      return all
    },
    // 是否
    hasSearchCode() {
      return this.forms.filter(d => d.type === 'searchCode').length > 0
    },
    isLock() {
      return this.$store.state.app.isLock
    }
  },
  watch: {
    // 表单配置
    forms: {
      handler(n, o) {
        if (n.length > 0 && n !== o) {
          // 初始化form数据
          for (const i in n) {
            const form = n[i]
            if (form.type === 'inputSelect') {
              this.$set(this.form, form.selectName, form.selctValue)
              this.$watch(`form.${form.selectName}`, n => {
                if (!form.noClear) {
                  this.$set(this.form, form.name, '')
                }
              })
            }
            if (form.type === 'datePicker') {
              let dateType = 'datetimerange'
              let pickerOptions = {
                disabledDate(time) { }
              }
              let dateOptis = []
              if (form.options && form.options.length > 0) {
                dateOptis = form.options.filter(item => {
                  const k = item[form.optionLabel] || item.key
                  return k === form.selctValue
                })
                this.$set(this.form, form.selectName, form.selctValue)
                this.$watch(`form.${form.selectName}`, n => {
                  this.$set(this.form, form.name, [])
                })
              }
              if (dateOptis.length) {
                dateType = dateOptis[0].dateType ? dateOptis[0].dateType : 'datetimerange'
                pickerOptions = dateOptis[0].pickerOptions ? dateOptis[0].pickerOptions : null
              } else {
                pickerOptions = form.pickerOptions
              }
              this.dateParams = {
                dateType,
                pickerOptions
              }
              // 数据格式扩展
              if (form.dataFilter) {
                // 返回格式化数据
                const ff = form.dataFilter(form.value)
                for (const i in ff) {
                  this.$set(this.form, i, ff[i])
                }
                // 数据监听绑定
                this.$watch(`form.${form.name}`, n => {
                  const keys = Object.keys(ff)
                  if (n && n.length > 0) {
                    for (const j in n) {
                      this.$set(this.form, keys[j], n[j])
                    }
                  } else {
                    // 清空数据
                    for (const j in keys) {
                      this.$set(this.form, keys[j], '')
                    }
                  }
                })
              }
            }
            if (!form.linkage) {
              this.$set(this.form, form.name, form.value)
            }
          }
        }
      },
      deep: true,
      immediate: true
    },
    // 表单数据
    form: {
      handler(n) {
        this.$emit('input', n)
      },
      deep: true
    },
    // 初始化数据
    value: {
      handler(v) {
        for (const i in v) {
          if (v[i] !== this.form[i]) {
            this.form[i] = v[i]
          }
        }
      },
      deep: true,
      immediate: true
    }
  },
  created() { },
  mounted() { },
  beforeDestroy() { },
  methods: {
    // 更新视图
    updateView(val, name) {
      this.$set(this.form, name, val)
    },
    // 今日
    today() {
      this.$emit('today')
    },
    // 昨日
    yesterday() {
      this.$emit('yesterday')
    },
    // 前日
    beforeYesterday() {
      this.$emit('beforeYesterday')
    },
    // 最近七日
    recentSeven() {
      this.$emit('recentSeven')
    },
    // 大前天
    bigBeforeYesterday() {
      this.$emit('bigBeforeYesterday')
    },
    // 本周
    currentWeek() {
      this.$emit('currentWeek')
    },
    // 上周
    lastWeek() {
      this.$emit('lastWeek')
    },
    // 本月
    currentMonth() {
      this.$emit('currentMonth')
    },
    // 上月
    lastMonth() {
      this.$emit('lastMonth')
    },
    // 批量通过
    batchPass() {
      this.$emit('batchPass')
    },
    // 批量拒绝
    BatchRurn() {
      this.$emit('BatchRurn')
    },
    // 导出
    handleExport() {
      this.$emit('export')
    },
    // 自定义
    handleCustom() {
      this.$emit('custom')
    },
    // 查询
    handleQuery() {
      this.$emit('query')
    },
    // 新增
    add() {
      this.$emit('add')
    },
    // 保存
    onSave() {
      this.$emit('save', this.form)
    },
    // 重置
    reset() {
      this.$refs.dataForm.resetFields()
      this.$emit('onReset', null)
    },
    // 搜索
    onSearch() {
      const delay = this.hasSearchCode ? 200 : 0
      setTimeout(() => {
        if (this.searchOnChange && !this.clickLock) {
          this.clickLock = true
          this.$refs.dataForm.validate((valid) => {
            if (valid) {
              const params = this.searchData(this.form)
              if (this.$parent.currentPage) {
                // 重置翻页
                this.$parent.currentPage = 1
              }
              this.$set(this, 'form', params)
              this.$emit('onSearch', params)
            }
          })
          setTimeout(() => {
            this.clickLock = false
          }, 200)
        }
      }, delay)
    },
    // 获取最终搜索数据
    searchData(data) {
      return this.filterData(this.trimData(data))
    },
    // 数据格式化
    filterData(data) {
      const nData = { ...data }
      // for ()
      return nData
    },
    // 过滤数据中的前后空格
    trimData(data) {
      const nData = data
      if (this.trimOn && !this.focusLock) {
        for (const i in nData) {
          const value = nData[i]
          if (typeof value === 'string') {
            nData[i] = value.trim()
          }
        }
      }
      return nData
    },
    // 聚焦
    onFocus() {
      this.focusLock = true
    },
    // 合并事件
    mergeEvent() {
      const arg = arguments
      const val = arg[0][0]
      const argOpt = arg[1]
      const { handler, onSearch, type, options } = argOpt
      const evTypeArr = ['datePicker', 'select', 'searchCode', 'cascader']
      if (!onSearch && !evTypeArr.includes(type)) return
      const event = arg[2] || 'change'
      const focusLockArr = ['change', 'blur']
      if (focusLockArr.indexOf(event) !== -1) {
        this.focusLock = false
      }
      if (handler && handler[event]) {
        if (event === 'change' && options && options.length > 0 && argOpt.selectName) {
          // 带下拉切换的输入框选项
          const keyName = this.form[argOpt.selectName]
          handler[event](val, keyName)
        } else {
          handler[event](val)
        }
      }
      // 会触发搜索的事件
      const searchArr = ['change', 'blur', 'clear']
      if (searchArr.indexOf(event) !== -1) {
        this.$nextTick(() => {
          this.onSearch()
        })
      }
    },
    // 输入建议事件暴露出去
    querySearch(queryString, cb) {
      this.$emit('querySearch', { queryString, cb })
    },
    // 下拉输入框
    searchSelect() {
      const [data, elItem] = arguments
      // if (hasPropertyDeep(elItem, 'handler.select')) {
      //   elItem.handler.select(data)
      // }
    },
    // 查询过滤
    dataFilter(res) {
      return res.filter(d => { return d.status !== 6 || d.status !== 2 })
    },
    // 选中
    onSelectStock(argument, item) {
      if (argument && argument.length) {
        const data = argument[0]
        const textRule = item.textRule || 'code.ts name'
        const val = replaceTextFromData(data, textRule)
        this.form[item.name] = val
        item.handler && item.handler.onSelectStock && item.handler.onSelectStock(data)
        item.onSearch && this.onSearch()
      }
    },
    // 获取时间参数
    getDateOptions(params = {}) {
      return params
    },
    cDisabled(item) {
      if (item.disabled) {
        return item.disabled()
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="scss">
.share-filter-grid-box {
  display: flex;
  justify-content: space-between;

  .container {
    flex: 1;

    .datePicker {
      display: flex;
    }
  }

  .el-form-item__label-wrap {
    margin-left: 0px !important;

    // display: flex;
    .el-form-item__label {
      float: left !important;
    }
  }

  .el-input {
    >input {
      background: #F5F7FA;
      border: none;
      border-radius: 0;
    }
  }

  .el-input-group__prepend {
    border: none;
  }

  .el-date-editor {
    border: none;
    background: #F5F7FA;
    border-radius: 0;

    >input {
      background: #F5F7FA;
    }

    .el-input__icon {
      line-height: 32px;
    }
  }

   .v-cascader {
      margin-right: 30px;
     .el-cascader__search-input {
       background: #F5F7FA;
       border: none;
       border-radius: 0;
     }
     .el-input {
       width: 350px;
     }
     .el-cascader__tags {
       width: 350px;
     }
   }
}
</style>
