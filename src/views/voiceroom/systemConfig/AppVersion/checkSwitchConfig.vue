<template>
  <div class="check-switch-config">
    <div class="searchParams">
      <SearchPanel v-model="searchParams" :forms="forms" :show-search-btn="true" :show-add="true" @add="handleAdd" @onSearch="onSearch"></SearchPanel>
    </div>
    <div class="tableList">
      <tableList :cfgs="cfgs" ref="tableList"></tableList>
    </div>
    <!-- 新增、修改 -->
    <appComp ref="appComp" @getList="getList"/>
  </div>
</template>
<script>
// 引入列表组件
import tableList from '@/components/tableList/TableList.vue'
// 引入菜单组件
import SearchPanel from '@/components/SearchPanel/final.vue'
// 引入菜单组件
import appComp from './components/appComp.vue'
// 引入api
import REQUEST from '@/request/index.js'
// 引入请求
import request from '@/utils/request2'
export default {
  data() {
    return {
      page: {
        current: 1,
        size: 10,
      },
      searchParams: {
        version: "",
        package_name: "",
      },
      navList: [
        {
          key: "net.huidapay.live",
          isActive: true,
          label: "喵喵星球",
          value: "net.huidapay.live",
        },
        {
          key: "com.yhjc.oxygen",
          isActive: false,
          label: "声撩语音",
          value: "com.yhjc.oxygen",
        },
        {
          key: "com.jlsd.duoduo",
          isActive: false,
          label: "多多cp",
          value: "com.jlsd.duoduo",
        }
      ],
      packageName: [
        {
          key: "",
          label: "全部",
          value: "",
        },
        {
          key: "net.huidapay.live",
          label: "喵喵星球",
          value: "net.huidapay.live",
        },
        {
          key: "com.yhjc.oxygen",
          label: "声撩语音",
          value: "com.yhjc.oxygen",
        },
        {
          key: "com.jlsd.duoduo",
          isActive: false,
          label: "多多cp",
          value: "com.jlsd.duoduo",
        }
      ],
    }
  },
  components: {
    tableList,
    SearchPanel,
    appComp
  },
  computed: {
    forms() {
      return [
        {
          name: 'package_name',
          type: 'select',
          options: this.packageName,
          label: '应用类型',
          placeholder: '',
          handler: {
            enter: (v) => {
              console.log("🚀 ~ file: checkSwitchConfig.vue:83 ~ forms ~ v", v)
              this.searchParams.package_name = v.value
              this.$refs.tableList.getData();
            },
          }
        },
        {
          name: 'version',
          type: 'input',
          value: '',
          label: '版本号',
          placeholder: '',
          handler: {
            enter: (v) => {
              this.searchParams.version = v.version
              this.$refs.tableList.getData();
            }
          }
        },
      ]
    },
    cfgs() {
      return {
        vm: this,
        url: REQUEST.system.Apprule,
        method: "post",
        columns: [
          {
            label: 'id',
            prop: 'id',
            render: (h, params) => {
              return h('span', params.row.id || '无')
            }
          },
          {
            label: '应用类型',
            render: (h, params) => {
              let package_name = this.navList.find(item => { return item.value === params.row.package_name })
							return h('span', package_name ? package_name.label : '无')
            }
          },
          {
            label: '版本号',
            prop: 'version',
            render: (h, params) => {
              return h('span', params.row.version)
            }
          },
          {
            label: '功能',
            prop: 'key',
            render: (h, params) => {
              return h('span', params.row.key == "show_check" ? "审核开关" : "无")
            }
          },
          {
            label: '状态',
            prop: 'value',
            render: (h, params) => {
              return h('span', params.row.value == 0 ? "关闭" : "开启")
            }
          },
          {
            label: '操作平台',
            prop: 'version',
            render: (h, params) => {
              return h('span', params.row.platform == "2" ? "安卓" : (params.row.platform == "1" ? "IOS" : "模拟器"))
            }
          },
          {
            label: '操作',
            render: (h, params) => {
              return h('div', [
                h('el-button', { props: { type: 'primary' }, on: { click: () => { this.handleEdit(params.row) } } }, '编辑'),
                h('el-button', { props: { type: 'danger'}, on: {click:()=>{this.handleDelete(params.row.id)}}},'删除'),
              ])
            }
          },
        ]
      }
    }
  },
  methods:{
    //传递参数
    beforeSearch(params) {
      let s = { ...this.searchParams}
      return {
        size: params.size,
        page: params.page,
        version: s.version,
        package_name: s.package_name,
      };
    },
    // 查询
    onSearch(val) {
      this.searchParams.version = val.version;
      this.searchParams.package_name = val.package_name;
      this.$refs.tableList.getData();
    },
    // 新增
    handleAdd(){
      this.$refs.appComp.loadParams('add')
    },
    // 编辑
    handleEdit (row){
      this.$refs.appComp.loadParams('edit',row)
    },
    // 删除
    handleDelete (id){
      this.$confirm('确认删除吗？', '提示').then(() => {
        request({
          url: REQUEST.system.AppruleDel,
          method: "post",
          data: { id: id }
        }).then(res => {
          this.$message.success("删除成功");
          this.$refs.tableList.getData();
        }).catch(err => {
          this.$message.error(err);
        })
      })
    },
    // 新增 修改更新
    getList(){
      this.$refs.tableList.getData();
    }
  }
}
</script>
<style lang="scss">
  .check-switch-config{

  }
</style>
