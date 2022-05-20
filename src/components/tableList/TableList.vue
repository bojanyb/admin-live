<template>
  <article class="share-table-list-box">
    <el-table :data="data" style="width: 100%;" :size="cfgs.size ? cfgs.size : 'medium'" :stripe="cfgs.stripe" :border="cfgs.border || true"
      ref="table" @sort-change="handleSortChange" @selection-change="handleSelectionChange" v-loading="loading">
      <!-- checkbox -->
      <el-table-column type="selection" width="55" align="center" v-if="cfgs.isShowCheckbox"></el-table-column>
      <!-- 表格序号 -->
      <el-table-column type="index" v-if="cfgs.isShowIndex" label="序号" width="80" align="center"></el-table-column>
      <!-- 自定义渲染列 -->
      <el-table-column v-for="item in cfgs.columns" :prop="item.prop" :sortable="item.sortable ? item.sortable : false"
        align="center" :header-align="item.headerAlign" :label="item.label" :fixed="item.fixed" :width="item.width"
        :min-width="item.minWidth" :key="item.label" :show-overflow-tooltip="item.showOverFlow" v-if="heckoutGoodsField(item.label)">
        <template slot-scope="scope">
          <WeTableCustomColumn :renderContent="item.render" v-if="!item.isimg" :scope="scope" :prop="item.prop"></WeTableCustomColumn>
          <el-image v-if="item.isimg" :src="scope.row.img || $store.state.defaultImg" :style="{width:item.imgWidth,height:item.imgHeight}"
            :preview-src-list="[scope.row.img||$store.state.defaultImg]">
            <div slot="error" class="image-slot">
              <img :src="$store.state.loadingError" />
            </div>
          </el-image>
          
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination" v-if="data.length != 0">
      <el-pagination background @size-change="handleSizeChange" @current-change="handlePageChange" :page-size="search.size"
        :current-page="search.page" layout="total, prev, pager, next, jumper" :page-sizes="cfgs.search ? cfgs.search.sizes:search.sizes"
        :total="search.total" class="fr">
      </el-pagination>
    </div>
  </article>
</template>
<script>

  import WeTableCustomColumn from './WeTableCustomColumn.vue';
  import request from '@/utils/request2'

  // 获得元素的top位置
  function getTop(e) {
    let offset = e.offsetTop;
    if (e.offsetParent !== null) offset += getTop(e.offsetParent);
    return offset;
  }

  export default {
    name: 'TableList',
    components: {
      WeTableCustomColumn
    },
    props: {
      cfgs: {
        type: Object,
        required: true
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
        tableHeight: 0
      };
    },
    methods: {
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
        }

        if (this.cfgs.url) {
          request({
            url: this.cfgs.url,
            method: this.cfgs.method || 'post',
            data: params
          }).then(res => {
            this.loading = false;
            if (res.data.list === null) {
              res.data.list = [];
            }
            // 标准数据处理
            this.dataProcessing(res);
          }).catch(err => {
            this.loading = false;
            this.$message.error(err || '获取数据失败');
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
          if (res.data && res.data.list.length !== 0) {
            for (const i in res.data.list) {
              if (typeof res.data.list[i] === 'object') {
                stData.data = res.data.list || res.data.data;
                stData.total = res.data.count;
              } else {
                // stData.data = [res.data];
                stData.total = res.data.count || 1;
              }
            }
          }
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
        background: rgba(250, 250, 250, 1);
        >.cell {
          font-size: 14px;
          font-weight: 600;
          color: rgba(102, 102, 102, 1);
        }
      }
      tbody td {
        padding: 0;
        height: 45px;
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
