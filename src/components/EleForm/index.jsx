import Components from './element';
import { getVueOptions, renderGrids, renderFormItem } from './utils';

export default {
  name: 'EleForm',
  props: {
    data: {
      type: Array,
      required: true
    },
    config: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      tagInput: '',
      tagsInputVisible: false,
    }
  },
  methods: {
    showTagInput() {
      this.tagsInputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleTagClose(model, tag) {
      if (Array.isArray(model) && tag) {
        model.splice(model.indexOf(tag), 1);
      }
    },
    handleInputConfirm(model) {
      const tagInput = this.tagInput;
      if (tagInput && Array.isArray(model)) {
        model.push(tagInput);
      }
      this.tagsInputVisible = false;
      this.tagInput = '';
    },
    checkLinkageFn(data, config) { 
      const { model } = config.props
      config.linkage.forEach((item) => {
        const { field, value, type, targetDOM } = item

        const isIndex = data.reduce((pev, cur, index) => {
          if (cur.options.model === targetDOM) pev.push({ index })
          return pev
        }, [])

        const formItem = data[isIndex[0].index]

        // 1.触发 disabled 禁用 / 启用
        let disabled = !!(model[field] === value)
        // 2.触发 v-if 显示 / 隐藏
        let hide = !!(model[field] === value)

        this.$set(formItem.options.props, type, disabled)
        this.$set(formItem, type, hide)

        // 当表单子项 disabled 为 true 时, 子项的值清空
        Object.keys(model).forEach((key) => {
          if (formItem.disabled && formItem.options.model === key) model[key] = null
        })
      })
    },
  },
  render(h) {
    const { data, config } = this
    if (Array.isArray(config.linkage)) this.checkLinkageFn(data, config)

    return (
      <Components.form.index { ...getVueOptions(config) }>
        {
          Array.isArray(config.grid) ? renderGrids.call(this, data, config, h) : renderFormItem.call(this, data, config, h)
        }
      </Components.form.index>
    );
  }
};
