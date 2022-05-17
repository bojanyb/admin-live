<!--关键字查询股票（含大盘指数）-->
<template>
  <search-input
    :formatter="formatter"
    :data-filter="dataFilter"
    :limit="limit"
    :query="querySearch"
    :perfect="true"
    :value="value"
    value-key="code"
    :readonly="readonly"
    :disabled="disabled"
    :placeholder="placeholder"
    @onSelect="handleSelect"
    @clear="handleClear"
    @input="handleInput"
  >
    <template v-slot:list="{data}">
      <slot name="list" :data="data">
        <div class="suggestion">
          <div class="suggestion-item">
            <div class="cell code">{{ data.code }}.{{ data.ts }}</div>
            <div class="cell name"><div class="text" :title="data.name">{{ data.name }}</div></div>
            <!-- <div class="cell ts">{{data.ts}}</div> -->
          </div>
        </div>
      </slot>
    </template>
  </search-input>
</template>
<script>

import searchInput from '../search/index.vue'

export default {
  name: 'SearchStock',
  components: { searchInput },
  props: {
    value: {
      type: String,
      default: ''
    },
    // 输入多少个字符后 才触发查询
    limit: {
      type: Number,
      default: 1
    },
    defaultStockInfo: {
      type: Object,
      default: function() {
        return {}
      }
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
    // 数据过滤
    dataFilter: {
      type: Function,
      default: function(res) {
        return res
      }
    },
    // 权限
    permission: {
      type: Array,
      default: function() {
        return ['noPermission']
      }
    },
    // 输入字段为空时的占位提示
    placeholder: {
      type: String,
      default: '请输入搜索关键字'
    },
    // 搜索类型
    searchType: {
      type: String,
      default: 'stock'
    },
    // 额外参数
    params: {
      type: Object,
      default: function() {
        return {}
      }
    },
    // 搜索关键字
    keyName: {
      type: String,
      default: 'keyWord'
    }
  },
  data() {
    return {
      keyword: ''
    }
  },
  watch: {
    defaultStockInfo: {
      handler: function(v) {
        this.keyword = v.code ? v.code + '.' + v.ts : ''
      },
      deep: true
    },
    keyword: function(v) {
      console.log(v)
    },
    value: function(v, o) {
      if (v.length === 0) { // 删除字段
        this.$emit('onDelete', v)
      }
    }
  },
  mounted() {
    if (this.defaultStockInfo.code && this.defaultStockInfo.ts) {
      this.keyword = this.defaultStockInfo.code + '.' + this.defaultStockInfo.ts
    }
  },
  methods: {
    formatter(item) {
      return item.code ? item.code + '.' + item.ts : ''
    },
    // 查询
    querySearch(queryString) {
      return queryString
      // return this.test()
    },
    // 选中
    handleSelect(item) {
      this.$emit('onSelect', item)
    },
    handleInput(val) {
      this.$emit('input', val)
    },
    // 清空
    handleClear() {
      this.$emit('clear', null)
    }
  }
}
</script>
<style lang="scss" scoped>
  .search-container{
    ::v-deep .zr-suggestion-input{
      .el-input{
        .el-input__inner{
          background:#fff;
        }
      }
    }
  }
  .zr-suggestion{
    background-color: #fff;
    border:1px solid #000;
    border-radius: 0;
    .suggestion{
      display: table;
      width: 100%;
      .suggestion-item{
        display: table-row;
        .cell{
          display: table-cell;
          font-size: 14px;
          color: #333;
          padding: 5px 0;
          line-height: 1.5;
          &.code{
            width: 50%;
          }
          &.ts{
            width: 10%;
          }
          &.name{
            .text {
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              padding: 0 5px;
            }

          }
        }
      }
    }

  }
</style>
