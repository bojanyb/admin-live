<template>
  <article class="share-table-list-box">
    <el-table :data="data" style="width: 100%;" :size="cfgs.size ? cfgs.size : 'medium'" :stripe="cfgs.stripe"
    :default-expand-all="cfgs.defaultExpandAll"
    row-key="id"
    :tree-props="{children: cfgs.children}"
      ref="table" @sort-change="handleSortChange" @selection-change="handleSelectionChange"
      v-loading="loading"
      :row-style="{'cursor':'pointer'}">
      <!-- checkbox -->
      <el-table-column type="selection" width="55" align="center" v-if="cfgs.isShowCheckbox"></el-table-column>
      <!-- 表格序号 -->
      <el-table-column type="index" v-if="cfgs.isShowIndex" label="序号" width="80" align="center"></el-table-column>
      <!-- 自定义渲染列 -->
      <el-table-column v-for="item in cfgs.columns" :prop="item.prop" :sortable="item.sortable ? item.sortable : false"
        :align="item.align || 'center'" :header-align="item.headerAlign" :label="item.label" :fixed="item.fixed" :width="item.width"
        :min-width="item.minWidth" :key="item.label" :show-overflow-tooltip="item.showOverFlow" v-if="heckoutGoodsField(item.label)">
        <template slot-scope="scope">
          <WeTableCustomColumn :renderContent="item.render" v-if="!item.isimg && !item.isSwitch && !item.isimgList" :scope="scope" :prop="item.prop"></WeTableCustomColumn>
          <!-- <el-image v-if="item.isimg" :src="scope.row[item.prop] || $store.state.defaultImg" :style="{width:item.imgWidth,height:item.imgHeight}"
            :preview-src-list="[scope.row[item.prop]||$store.state.defaultImg]">
            <div slot="error" class="image-slot">
              <img :src="$store.state.loadingError" />
            </div>
          </el-image> -->

          <imgComp 
          v-if="item.isimg"
          :src="scope.row[item.prop] || scope.row[item.propCopy]"
          :name="item.nameProp ? scope.row[item.nameProp] : ''"
          :tagList="item.tagProp ? scope.row[item.tagProp] : []"
          :width="item.imgWidth"
          :height="item.imgHeight"
          :preview-src-list="scope.row[item.prop]"
          ref="imgComp">
          </imgComp>

          <imgListComp 
          v-if="item.isimgList"
          :srcList="returnImg(scope.row[item.prop])"
          :type="scope.row[item.type] || item.type"
          :width="item.imgWidth"
          :height="item.imgHeight"
          :preview-src-list="scope.row[item.prop]"
          ref="imgComp">
          </imgListComp>

          <el-switch
            v-if="item.isSwitch"
            v-model="scope.row[item.prop]"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="item.isTrueValue"
            :inactive-value="item.isFalseValue"
            :disabled="disabledFunc(item, scope.$index)"
            active-text=""
            inactive-text=""
            @change="(v) => item.change(v, scope.row)">
          </el-switch>
          
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination" v-if="data.length != 0 && !isHidePage">
      <el-pagination background @size-change="handleSizeChange" @current-change="handlePageChange" :page-size="search.size"
        :current-page="search.page" layout="total, prev, pager, next, jumper" :page-sizes="cfgs.search ? cfgs.search.sizes:search.sizes"
        :total="search.total" class="fr">
      </el-pagination>
    </div>
  </article>
</template>
<script>
  // 渲染组件
  import WeTableCustomColumn from './WeTableCustomColumn.vue';
  // 引入api
  import request from '@/utils/request2'
  // 引入图片/svga组件
  import imgComp from './imgComp.vue'
  import imgListComp from './imgListComp.vue'

  // 获得元素的top位置
  function getTop(e) {
    let offset = e.offsetTop;
    if (e.offsetParent !== null) offset += getTop(e.offsetParent);
    return offset;
  }

  export default {
    name: 'TableList',
    components: {
      WeTableCustomColumn,
      imgComp,
      imgListComp
    },
    props: {
      cfgs: {
        type: Object,
        required: true
      },
      isHidePage: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        dialogVisible: false,
        data: [],
        search: {
          size: 10,
          page: 1,
          total: 0,
          sizes: [10, 20, 30]
        },
        isShowSearchMore: false,
        headerTopPoint: 0,
        headerFixed: false,
        loading: false,
        tableHeight: 0,

        oldPage: 0, // 老数据分页  -  用来比对
        oldParams: {}
      };
    },
    methods: {
      // 图片列表显示
      returnImg(val) {
        if(val) {
          if(typeof val === 'string') {
            if(val.indexOf(',') !== -1) {
              let arr = val.split(',')
              return arr
            } else {
              return [val]
            }
          } else {
            return val
          }
        } else {
          return [val]
        }
      },
      // 是否禁止开关
      disabledFunc(item, index) {
        if(item.disabledStatus) {
          return index === item.disabledIndex
        }
        return item.disabled
      },
      // 当某一行被点击
      rowClick(row, column) {
        if(column.label !== '操作') {
          this.$emit('rowClick', row, column)
        }
      },
      handleSortChange(val) {
        if (!val.order) {
          this.search.sort = '';
        } else {
          let order = val.order === 'ascending' ? 'asc' : 'desc';
          this.search.sort = val.prop + ',' + order;
        }
        this.getData();
      },
      handleSelectionChange(val) {
        let vm = this.cfgs.vm;
        if (typeof vm.selectionChange === 'function') {
          vm.selectionChange(val);
        }
        this.$emit('selectionChange', val, this.data.length);
      },
      handleSizeChange(val) {
        this.search.size = val;
        this.search.page = 1;
        this.getData();
      },
      handlePageChange(val) {
        this.search.page = val;
        this.getData();
      },
      getData(status) {
        this.loading = true;
        let search = this.search,
          vm = this.cfgs.vm,
          acstatus = this.cfgs.activistatus;
        let params = {
          size: search.size,
          page: search.page
        };
        if (typeof vm.beforeSearch === 'function') {
          params = vm.beforeSearch(params);
          if(JSON.stringify(this.oldParams) !== JSON.stringify(params) && this.oldPage && this.oldPage == params.page) { // 搜索 - 重置分页
            this.search.page = 1
            params.page = 1
          }
        }

        // 用来比对分页 - 重置分页
        this.oldPage = params.page
        this.oldParams = params

        if (this.cfgs.url) {
          request({
            url: this.cfgs.url,
            method: this.cfgs.method || 'post',
            data: params
          }).then(res => {
            this.loading = false;
            // if (res.data.list === null) {
            //   res.data.list = [];
            // }
            // 标准数据处理
            this.dataProcessing(res);
          }).catch(err => {
            this.data = []
            this.$emit('saleAmunt', { list: [], baoxiang: {}});
            this.loading = false;
            // this.$message.error(err.msg || '获取数据失败');
          })
        } else {
          this.loading = false;
        }
      },
      // 数据处理
      dataProcessing(res) {
        this.$emit('saleAmunt', res.data);
        let vm = this.cfgs.vm;
        let stData = {
          data: [],
          total: 0
        };
        if (typeof vm.onSearchSuccess === 'function') {
          stData = vm.onSearchSuccess(res);
        } else {
          stData.data = res.data.list || res.data.data || res.data || [];
          stData.total = res.data.count || res.count || 0;
        }
        this.data = stData.data;

        this.search.total = stData.total;
        let dataLength = this.data.length;
        // 当删除到最后一个的时候，请求前一页的信息
        if (this.search.page !== 1 && dataLength === 0) {
          this.search.page = this.search.page - 1;
          this.getData();
        }
        this.$forceUpdate();
      },
      handleMore() {
        this.isShowSearchMore = !this.isShowSearchMore;
        setTimeout(() => {
          this.getFixedTop();
        }, 100);
      },
      getFixedTop() {
        let table = this.$refs['table'].$el;
        let header = table.getElementsByClassName('el-table__header-wrapper')[0];
        this.headerTopPoint = getTop(header) - 50;
      },
      listenScroll() {
        this.getFixedTop();
        let timeoutRef;
        if ((document.body.scrollTop || document.documentElement.scrollTop) === 0) {
          this.headerFixed = false;
        }
        document.body.onscroll = () => {
          if (timeoutRef) {
            clearTimeout(timeoutRef);
          }
          timeoutRef = setTimeout(() => {
            let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            this.headerFixed = this.headerTopPoint < scrollTop;
          }, 10);
        };
      },
      heckoutGoodsField(name) {
        let status = true;
        let goodsField = this.cfgs.goodsField;
        if (goodsField && name !== '操作') {
          status = false;
          goodsField.forEach(e => {
            if (this.cfgs.checkList == true) {
              if (name === e) {
                status = true;
              }
            } else {
              if (name === e.value) {
                status = true;
              }
            }
          });
        }
        return status;
      }
    },
    created() {
      this.getData();
    },
    activated() {
      this.$nextTick(() => {
        this.listenScroll();
      });
    },
    mounted() {
      this.$nextTick(() => {
        this.listenScroll();
      });
    },
    computed: {
      newUrl: function() {
        let vm = this.cfgs.vm;
        return vm.cfgs.url;
      }
    },
    watch: {
      newUrl: function(val, oldVal) {
        this.search.page = 1;
        this.getData();
      }
    }
  };
</script>

<style lang="scss">
  .share-table-list-box {
    // border: 1px solid #DCDCDC;
    // border-bottom: none;
    .el-table {
      thead th {
        padding: 0;
        height: 60px;
        background: #F5F7FA;
        >.cell {
          font-size: 14px;
          font-weight: 600;
          // color: rgba(255, 255, 255, 1);
        }
      }
      tbody td {
        padding: 0;
        height: 55px;
        border-right: 1px solid #dfe6ec;
        >.cell {
          font-size: 14px;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          >span.yellow {
            color: #D77E50;
            cursor: pointer;
          }
        }
      }
      tbody {
        td:first-child {
          border-left: 1px solid #dfe6ec;
        }
      }
    }

    .pagination {
      background: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 10px 20px;
      box-sizing: border-box;
    }
  }

  p {
    margin: 0;
  }

  .share-table-list-box .el-table__body-wrapper {
    max-height: 40rem !important;
    overflow-y: auto;
  }
</style>
