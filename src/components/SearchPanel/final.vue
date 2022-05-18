<!-- 列表搜索栏 -->
<template>
  <div class="share-filter-grid-box">
    <slot name="left" />
    <div class="container">
      <div class="center">
        <el-form ref="dataForm" :model="form" :rules="rules" label-position="right" label-width="auto" :inline="true" style="width: 100%;">
          <el-form-item v-for="(item, index) in finalForms" :key="index" :label="item.label" :prop="item.name">
            <!--下拉框 -->
            <el-select
              v-if="item.type === 'select'"
              v-model="form[item.name]"
              :placeholder="item.placeholder"
              class="filter-item"
              :style="{width: (item.width || '100%')}"
              :disabled="cDisabled(item)"
              :clearable="item.clearable || false"
              :multiple="item.multiple || false"
              @change="mergeEvent(arguments, item)"
            >
              <el-option
                v-for="option in item.options"
                :key="option[item.keyName || 'key']"
                :label="option[item.optionLabel || 'label']"
                :value="option[item.keyName || 'key']"
              />
            </el-select>
            <!-- 下拉框带输入建议 -->
            <el-autocomplete
              v-else-if="item.type === 'autocomplete'"
              v-model="form[item.name]"
              class="inline-input"
              :fetch-suggestions="querySearch"
              :placeholder="item.placeholder || ''"
              :trigger-on-focus="false"
              @select="mergeEvent(arguments, item, 'select')"
            />
            <!--带下拉框选项切换的输入框-->
            <el-input
              v-else-if="item.type === 'inputSelect'"
              v-model="form[item.name]"
              :placeholder="item.placeholder"
              clearable
              class="input-with-select"
              style="width: 100%;"
              :disabled="cDisabled(item)"
              @change="mergeEvent(arguments, item)"
              @blur="mergeEvent(arguments, item, 'blur')"
              @focus="mergeEvent(arguments, item, 'focus')"
              @clear="mergeEvent(arguments, item, 'clear')"
            >
              <el-select
                slot="prepend"
                v-model="form[item.selectName]"
                :disabled="cDisabled(item)"
                :placeholder="item.selectPlaceholder"
                @change="item.handler.change"
              >
                <el-option v-for="option in item.options" :key="option[item.keyName||'key']" :label="option[item.optionLabel||'label']" :value="option[item.keyName||'key']" />
              </el-select>
              <el-button v-if="item.showButton" slot="append" icon="el-icon-search" @click="item.handler.onSearch(form[item.name], form[item.selectName])" />
            </el-input>
            <!--datePicker -->
            <template v-else-if="item.type === 'datePicker'">
              <div class="datePicker">
                <div v-if="item.options && item.options.length > 0">
                  <el-select
                    v-model="form[item.selectName]"
                    :disabled="cDisabled(item)"
                    value-key="key"
                    :placeholder="item.selectPlaceholder || ''"
                    :style="{width: (item.selectWidth || 110) + 'px'}"
                    @change="mergeEvent(arguments, item, 'selectChange')"
                  >
                    <el-option
                      v-for="option in item.options"
                      :key="option[item.keyName || 'key']"
                      :label="option[item.optionLabel||'label']"
                      :value="option[item.keyName || 'key']"
                    />
                  </el-select>
                </div>
                <el-date-picker
                  v-model="form[item.name]"
                  :disabled="cDisabled(item)"
                  :type="item.dateType || dateParams.dateType"
                  :picker-options="dateParams.pickerOptions"
                  range-separator="-"
                  :start-placeholder="item.startPlaceholder || '开始时间'"
                  :end-placeholder="item.endPlaceholder || '结束时间'"
                  clearable
                  :format="item.format || 'yyyy-MM-dd HH:mm:ss'"
                  :value-format="item.valueFormat || 'timestamp'"
                  :default-time="item.defaultTime || ['00:00:00', '23:59:59']"
                  @change="mergeEvent(arguments, item)"
                  @blur="mergeEvent(arguments, item, 'blur')"
                  @focus="mergeEvent(arguments, item, 'focus')"
                  @clear="mergeEvent(arguments, item, 'clear')"
                />
              </div>
            </template>
            <!--searchCode-->
            <search-code
              v-else-if="item.type === 'searchCode'"
              v-model="form[item.name]"
              :placeholder="item.placeholder || '请输入股票代码或名称'"
              :data-filter="dataFilter"
              @onSelect="onSelectStock(arguments, item)"
              @clear="mergeEvent(arguments, item, 'clear')"
            />
            <zr-search
              v-else-if="item.type === 'popupSearch'"
              v-model="form[item.name]"
              class="search"
              popper-class="popup-search"
              :init-search="true"
              :query="item.handler.search"
              :limit="1"
              @onSelect="searchSelect(...arguments,item)"
            >
              <template slot="list" :data="item">
                <slot name="popup-search" :data="item" />
              </template>
            </zr-search>
            <!-- 下拉框 可以创建并选中选项中不存在的条目-->
            <z-select
              v-else-if="item.type === 'selectWithInput'"
              v-model="form[item.name]"
              :options="item.options"
              :allow-create="true"
              :label-key="item.optionLabel || 'name'"
              :value-key="item.keyName || 'value'"
              :clearable="item.clearable || false"
              :type="item.selectType || 'number'"
              :min="item.min"
              @input="mergeEvent(arguments, item)"
            />
            <!--级联选择器-->
            <el-cascader
              v-else-if="item.type === 'cascader'"
              v-model="form[item.name]"
              :options="item.options"
              :props="item.props"
              :disabled="cDisabled(item)"
              :placeholder="item.placeholder"
              :clearable="item.clearable || false"
              @change="mergeEvent(arguments, item)"
            />

            <!--输入框-->
            <!--新增输入过滤和输入长度限制-->
            <!--{inputType}值必须为 inputLimited中fnType的键名-->
            <el-input
              v-else
              v-model="form[item.name]"
              :maxlength="item.maxlength|| '--'"
              :placeholder="item.placeholder"
              :disabled="cDisabled(item)"
              :clearable="item.clearable || false"
              @focus="onFocus"
              @change="mergeEvent(arguments, item)"
            >
              <template v-if="item.append" slot="append">{{ item.append }}</template>
            </el-input>

          </el-form-item>
          <el-form-item v-if="showSearchBtn || showReset">
            <el-button v-if="showSearchBtn" type="primary" @click="onSearch">查询</el-button>
            <el-button v-if="showReset" icon="el-icon-refresh" @click="reset">重置</el-button>
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
export default {
  name: 'TableSearch',
  components: {
    SearchCode,
    ZrSearch,
    zSelect
  },
  props: {
    // 列表数据
    value: {
      type: Object,
      default: function() {
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
      default: function() {
        return []
      }
    },
    // 按钮
    buttons: {
      type: Array,
      default: function() {
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
      }
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
                this.$set(this.form, form.name, '')
              })
            }
            if (form.type === 'datePicker') {
              let dateType = 'datetimerange'
              let pickerOptions = {
                disabledDate(time) {}
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
            this.$set(this.form, form.name, form.value)
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
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {
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
      const evTypeArr = ['datePicker', 'select', 'searchCode']
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
    }
	}
</style>