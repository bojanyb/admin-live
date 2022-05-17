<!--下拉选择框 支持新增项目-->
<template>
  <div class="select-wrapper">
    <el-popover
      v-model="showPopover"
      placement="bottom-start"
      trigger="manual"
      :popper-class="popOverClass"
    >
      <div slot="reference">
        <el-select
          v-model="selected"
          :filterable="filterable"
          :allow-create="allowCreate"
          :placeholder="placeholder"
          :disabled="disabled"
          :size="size"
          :collapse-tags="collapseTags"
          popper-class="hide-popper"
          :clearable="clearable"
          :multiple="multiple"
          default-first-option
          @focus="handleFocus"
          @remove-tag="removeTag"
          @clear="clearTag"
          @visible-change="visibleChange"
        >
          <el-option
            v-for="(item, index) in options"
            :key="index"
            :label="item[labelKey]"
            :value="item[valueKey]"
          />
        </el-select>

      </div>
      <div v-clickoutside="hidePopover" class="select-menu-wrapper">
        <slot name="table" />
      </div>
    </el-popover>
  </div>
</template>
<script>
import Clickoutside from '@/utils/clickoutside'
// import { selectInputPositiveInteger } from '@/utils/inputRestrictions.js'
export default {
  name: 'Zselect',
  directives: { Clickoutside },
  props: {
    // 值
    value: {
      type: [String, Number, Array],
      default: null
    },
    // 是否可搜索
    filterable: {
      type: Boolean,
      default: false
    },
    // 是否允许用户创建新条目，需配合 filterable 使用
    allowCreate: {
      type: Boolean,
      default: false
    },
    // allowCreate为True时， 输入框限制的最小值，不填则不限制
    min: {
      type: Number,
      default: -Infinity
    },
    // 设置计数器允许的最大值
    max: {
      type: Number,
      default: Infinity
    },
    // 占位提示
    placeholder: {
      type: String,
      default: '支持用户手输天数'
    },
    // 下拉选项
    options: {
      type: Array,
      default: function() {
        return []
      }
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    },
    // 输入框尺寸
    size: {
      type: String,
      default: ''
    },
    // 多选时是否将选中值按文字的形式展示
    collapseTags: {
      type: Boolean,
      default: false
    },
    //  是否可以清空选项
    clearable: {
      type: Boolean,
      default: false
    },
    // 数据为空时的提示信息
    noDataText: {
      type: String,
      default: '无数据'
    },
    // 需要显示的字段
    labelKey: {
      type: String,
      default: 'label'
    },
    // 作为 value 唯一标识的键名，绑定值为对象类型时必填
    valueKey: {
      type: String,
      default: 'value'
    },
    // 输入类型（number: 只允许输入数字，text: 不限制输入内容）
    type: {
      type: String,
      default: 'number'
    },
    locked: {
      type: Boolean,
      default: false
    },
    // 多选
    multiple: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showPopover: false,
      popOverClass: 'z-select-pop-over',
      selectOptions: [],
      input: '',
      selected: '',
      // 新添加的选项
      newOptions: [],
      // 其他选项
      showInput: false
    }
  },
  computed: {
    // 最终的下拉选项
    opt() {
      return [...this.selectOptions, ...this.newOptions]
    }
  },
  watch: {
    // 下拉选项赋值
    options: {
      handler: function(v) {
        this.selectOptions = v
      },
      immediate: true,
      deep: true
    },
    // 赋值操作
    value: {
      handler: function(v, o) {
        if (v !== o) {
          this.selected = v
        }
      },
      immediate: true,
      deep: true
    },
    // 参数传递到上层
    selected: {
      handler: function(v, o) {
        this.$emit('update:value', v)
      },
      deep: true
    }
  },
  mounted() {

  },
  methods: {
    // 下拉选项隐藏后钩子
    hidePopover(evt) {
      if (!this.locked) {
        this.showPopover = false
        this.$emit('blur', evt)
      }
    },
    hide() {
      this.showPopover = false
    },
    // 选中后隐藏
    visibleChange(visible) {
      if (visible) {
        this.showPopover = true
      }
      this.$emit('visibleChange', visible)
    },
    // 获取焦点钩子
    handleFocus(evt) {
      if (this.disabled) return
      this.$emit('focus', evt)
    },
    // 移除标签
    removeTag(label) {
      this.$emit('removeTag', label)
    },
    // 清空标签
    clearTag() {
      this.$emit('clearTag')
    },
    // 回车提交输入项 并判断值是否存在，存在则选中；不存在则新建
    submitOption({ target }) {
      if (this.input !== '') {
        const select = this.getOption(this.input)
        this.selected = select[this.labelKey]
      }
      this.hideInputHandle()
      this.hidePopover()
    },
    // 选中列表选项
    selectHandle(data) {
      this.selected = data[this.labelKey]
      this.hideInputHandle()
      this.hidePopover()
    },
    // 获取选中值
    getOption(value) {
      // 查找选项
      const option = this.selectOptions.filter(d => d[this.labelKey] + '' === value + '')
      if (option.length > 0) {
        return option[0]
      }
      // 新增选项
      const newOption = this.createOption(value)
      this.$set(this, 'newOptions', [newOption])
      return newOption
    },
    // 创建新选项
    createOption(value) {
      const option = {}
      option[this.labelKey] = value
      option[this.valueKey] = value
      return option
    },
    // 显示其他输入框
    showInputHandle() {
      this.showInput = true
      // 设置输入框焦点
      this.$nextTick(() => {
        this.$refs.input.focus()
      })
    },
    // 隐藏其他输入框
    hideInputHandle() {
      this.input = ''
      this.newOptions = []
      this.showInput = false
    }
  }
}
</script>
<style lang="scss" scoped>
.select-wrapper {
  display: inline-block;
}
  .text-left {
    ::v-deep {
      .el-input__inner {
        text-align: left;
      }
    }
  }
  .select-menu-wrapper {
    .is-empty,
    .option {
      font-size: 14px;
      padding: 0 20px;
      height: 34px;
      line-height: 34px;
    }
    .option {
      position: relative;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #606266;
      box-sizing: border-box;
      cursor: pointer;
      &:hover {
        background-color: #f5f7fa;
      }
      &.selected {
        color: #5A67D9;
        font-weight: bold;
      }
    }
    .is-empty {
      text-align: center;
    }
  }
</style>
