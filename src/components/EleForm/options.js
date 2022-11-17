
/**
 * 动态表单数据模型
 * @param props
 * @param label 标签文本
 * @param prop 表单域 model 字段,在使用 validate方法的情况下，该属性是必填的
 * 
 * @param options
 * @param component 组件类型
 * @param model 表单项数据类型 v-model
 * @param attrs 原生属性
 * @param props elementUI组件属性 参考elementUI官网文档
 * @param style 组件样式
 * @param data 数据源 网络请求数据
 * @param on 组件事件
 */

export default class componentOptions {
  constructor(tplModel) {
    let result = tplModel.reduce((pev, cur) => {
      let resultData = {
        props: {
          label: cur.label,
          prop: cur.prop
        },
        options: {
          component: cur.tplName,
          model: cur.prop
        }
      }
      pev.push(resultData)
      return pev
    }, [])

    this.renderOptions = result
  }

  getItemOptions(options = []) {
    const resultData = this.renderOptions.reduce((pre, cur) => {
      if (cur) {
        options.map(item => {
          if (cur.props.prop === item.field) {
            pre.push({
              props: {
                ...cur.props
              },
              options: {
                ...cur.options,
                ...item,
                style: {
                  width: '100%'
                }
              }
            })
          }
        })
      }

      return pre
    }, [])
    return resultData
  }
}

