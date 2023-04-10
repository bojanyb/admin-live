<template>
  <div class="app-version-config">
    <div class="searchParams">
      <!-- <el-button class="add" type="success" @click="handleAdd">新增</el-button> -->
      <SearchPanel v-model="searchParams" :forms="forms" :show-search-btn="true" :show-add="true" @add="handleAdd" @onSearch="onSearch"></SearchPanel>
    </div>
    <div class="tableList">
      <tableList :cfgs="cfgs" ref="tableList"></tableList>
    </div>

    <!--弹窗界面-->
    <el-dialog :title="title" :visible.sync="FormVisible" :close-on-click-modal="false">
      <div class="navBox">
        <div class="navItem" v-for="item in navList" :key="item.key" :class="item.isActive == true ? 'active' : ''"
          @click="handlerNav(item)">{{ item.label }}</div>
      </div>
      <el-form :model="Form" label-width="120px" :rules="FormRules" ref="Form">
        <el-form-item>
          <el-radio-group class="platformType" v-model="platform" :disabled="isAdd == false">
            <el-radio-button label="2">Android</el-radio-button>
            <el-radio-button label="1">iOS</el-radio-button>
            <el-radio-button label="3">模拟器</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="任务名" prop="title">
          <el-input v-model="Form.title" placeholder="输入任务名"></el-input>
        </el-form-item>
        <el-form-item label="升级类型">
          <el-radio-group v-model="is_mandatory">
            <el-radio :label="10">建议升级</el-radio>
            <el-radio :label="20">强制升级</el-radio>
            <el-radio :label="30" v-if="platform !== '1'">热更新</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="下载链接" prop="download_url" v-if="is_mandatory !== 30">
          <el-input v-model="Form.download_url" placeholder="输入下载链接"></el-input>
        </el-form-item>
        <el-form-item label="版本号" prop="version">
          <el-input v-model="Form.version" placeholder="如: 1.0.1"></el-input>
        </el-form-item>
        <el-form-item label="安卓Code" prop="version_code" v-if="platform !== '1'">
          <el-input v-model="Form.version_code"></el-input>
        </el-form-item>
        <el-form-item label="热更新code" prop="hotfix" v-if="is_mandatory === 30 && platform !== '1'"
        :rules="[ { required: true, pattern: /^[0-9]+([.]{1}[0-9]{1,2})?$/, message: '请输入正整数', trigger: 'blur' }]"
        >
          <el-input v-model="Form.hotfix" placeholder="如: 1.0.1"></el-input>
        </el-form-item>
        <el-form-item label="更新说明" prop="content">
          <el-input v-model="Form.content" type="textarea" rows="3" placeholder="输入更新内容"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="FormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="submitFn" :loading="addLoading">{{ btnTip }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
// 引入列表组件
import tableList from '@/components/tableList/TableList.vue'
// 引入菜单组件
import SearchPanel from '@/components/SearchPanel/final.vue'
// 引入请求
import request from '@/utils/request2'
// 引入api
import REQUEST from '@/request/index.js'
import mixins from '@/utils/mixins'
// 引入时间插件
import moment from 'moment'
export default {
  mixins: [mixins],
  data() {
    return {
      persent: 0,
      title: '新增',
      btnTip: '提交',
      page: {
        current: 1,
        size: 10,
      },
      isAdd: true, //弹窗是否新增
      FormVisible: false, //新增界面是否显示
      addLoading: false,
      //界面数据
      platform: '2', //平台 IOS/ANDROID
      is_mandatory: 10, //是否强制更新(0否 1是)
      Form: {
        id: '', // 版本id
        title: '', // 任务名
        version: '', //版本号
        content: '', //更新内容
        download_url: '', //文件下载链接
        package_name: '', // 包名 喵喵星球、声撩语音
        version_code: '', // 安卓code
        hotfix: "" // 热更新code
      },
      FormRules: {
        version: [{
          required: true,
          message: '请输入版本号',
          trigger: 'blur'
        }],
        version_code: [{
          required: (this.platform !== 1 ? true : false),
          message: '请输入安卓Code',
          trigger: 'blur'
        }],
        // hotfix:[{
        //   required: true,
        //   message: '请输入热更新Code',
        //   trigger: 'blur'
        // }],
        content: [{
          required: true,
          message: '请输入更新内容',
          trigger: 'blur'
        }],
        download_url: [{
          required: (this.is_mandatory !== 30 ? true : false),
          message: '请输入文件下载链接',
          trigger: 'blur'
        }]
      },
      platformArr: [{
        "label": "苹果",
        "key": "1",
      },
      {
        "label": "安卓",
        "key": "2",
      },
      {
        "label": "模拟器",
        "key": "3",
      }],
      searchParams: {
        title: "",
        package_name: "",
      },
      fileUrl: "",
      progress: 0,
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
        },
        {
          key: "com.hdb.kaihei",
          isActive: false,
          label: "开黑语音",
          value: "com.hdb.kaihei",
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
          label: "多多cp",
          value: "com.jlsd.duoduo",
        },
        {
          key: "com.hdb.kaihei",
          label: "开黑语音",
          value: "com.hdb.kaihei",
        }
      ],
      dateTimeParams: {
        start_time: null,
        end_time: null
      },
    }
  },
  components: {
    tableList,
    SearchPanel
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
              this.searchParams.package_name = v.value
              this.$refs.tableList.getData();
            },
          }
        },
        {
          name: 'title',
          type: 'input',
          value: '',
          label: '任务名称',
          placeholder: '',
          handler: {
            enter: (v) => {
              this.searchParams.title = v.title
              this.$refs.tableList.getData();
            }
          }
        },
        {
          name: 'dateTimeParams',
          type: 'datePicker',
          dateType: 'datetimerange',
          format: "yyyy-MM-dd HH:mm:ss",
          clearable: true,
          class: 'message-history-dateTimeParams',
          label: '时间选择',
          value: '',
          handler: {
            change: v => {
              this.emptyDateTime()
              this.setDateTime(v)
            },
            selectChange: (v, key) => {
              this.emptyDateTime()
            }
          }
        }
      ]
    },
    cfgs() {
      return {
        vm: this,
        url: REQUEST.system.Appversion,
        method: "post",
        columns: [
          {
            label: '创建时间',
            prop: 'start_time',
            width: '180px',
            render: (h, params) => {
              return h('span', params.row.start_time > 0 ? moment(params.row.start_time * 1000).format('YYYY-MM-DD HH:mm:ss') : "")
            }
          },
          {
            label: '任务名',
            prop: 'title',
            width: '120px',
            render: (h, params) => {
              return h('span', params.row.title || '无')
            }
          },
          {
            label: '设备类型',
            prop: 'platform',
            width: '120px',
            render: (h, params) => {
              let platformName = ""
              switch (params.row.platform) {
                case 1:
                  platformName = "iOS";
                  break;
                case 2:
                  platformName = "Android";
                  break;
                case 3:
                  platformName = "模拟器";
                  break;
                default:
                  platformName = "其他";
                  break;
              }
              return h('span', platformName)
            }
          },
          {
            label: '版本号',
            prop: 'version',
            width: '120px',
            render: (h, params) => {
              return h('span', params.row.version)
            }
          },
          {
            label: '热更新code',
            prop: 'hotfix',
            width: '120px',
            render: (h, params) => {
              return h('span', params.row.version)
            }
          },
          {
            label: '升级类型',
            prop: 'download_url',
            width: '120px',
            render: (h, params) => {
              let isMandatoryText = ""
              switch (params.row.is_mandatory) {
                case 10:
                  isMandatoryText = "建议升级";
                  break;
                case 20:
                  isMandatoryText = "强制升级";
                  break;
              }
              return h('span', isMandatoryText)
            }
          },
          // {
          // 	label: '更新内容',
          // 	prop: 'content',
          // 	render: (h, params) => {
          // 		return h('span', params.row.content)
          // 	}
          // },
          {
            label: '文件下载链接',
            prop: 'download_url',
            render: (h, params) => {
              return h('span', params.row.download_url)
            }
          },
          {
            label: '操作',
            width: '260',
            render: (h, params) => {
              return h('div', [
                h('el-button', { props: { type: 'primary' }, on: { click: () => { this.handleEdit(params.row) } } }, '修改'),
                h('el-button', {
                  props: { type: 'success' },
                  style: { display: params.row.status === 0 ? 'unset' : 'none' },
                  on: { click: () => { this.handleOPenOrClose(params.row) } }
                }, '启动'),
                h('el-button', {
                  props: { type: 'danger' },
                  style: { display: params.row.status === 1 ? 'unset' : 'none' },
                  on: { click: () => { this.handleOPenOrClose(params.row) } }
                }, '停止'),
                // h('el-button', { props: { type: 'danger'}, on: {click:()=>{this.handleDelete(params.row.id)}}},'删除'),
              ])
            }
          },
        ]
      }
    }
  },
  watch: {
    // 'searchParams.version': {
    // 	handler(v) {
    // 		this.$set(this.searchParams, 'version', v.trim())
    // 	},
    // 	deep: true
    // },
    'Form.download_url': {
      handler(v) {
        this.$set(this.Form, 'download_url', v.trim())
      },
      deep: true
    }
  },
  methods: {
    // 新增 应用类型切换
    handlerNav(row) {
      // 修改状态下不可操作
      if (this.isAdd == false) {
        return
      }
      this.navList.map(res => {
        res.isActive = false
        if (res.key == row.key) {
          res.isActive = true
        }
      })
    },
    // 开启、停止
    handleOPenOrClose(row) {
      let statusText = row.status == 0 ? "启动" : "停止"
      let params = {
        id: row.id,
        status: row.status == 0 ? 1 : 0
      }
      this.$confirm('确认' + statusText + '吗？', '提示').then(() => {
        request({
          url: REQUEST.system.changeStatus,
          method: "post",
          data: params
        }).then(res => {
          this.$message.success(statusText + "成功");
          this.$refs.tableList.getData();
          this.FormVisible = false;
        }).catch(err => {
          this.$message.error(err);
        })
      });
    },
    // 删除
    handleDelete(id) {
      this.$confirm('确认删除吗？', '提示').then(() => {
        request({
          url: REQUEST.system.AppversionDel,
          method: "post",
          data: { id: id }
        }).then(res => {
          this.$message.success("删除成功");
          this.$refs.tableList.getData();
          this.FormVisible = false;
        }).catch(err => {
          this.$message.error(err);
        })
      });
    },
    handleEdit(item) {
      this.Form = JSON.parse(JSON.stringify(item));
      this.isAdd = false;
      this.title = '修改';
      this.btnTip = '修改';
      this.Form.id = item.id;
      this.is_mandatory = item.is_mandatory;
      this.fileUrl = item.download_url;
      this.progress = 100;
      this.platform = JSON.stringify(item.platform);
      this.addLoading = false;
      this.navList.map(res=>{
        res.isActive = false
        if(res.key == item.package_name){
          res.isActive = true
        }
      })
      this.FormVisible = true;

    },
    //点击改变分页条数
    handleSizeChange(val) {
      this.page.size = val;
      this.getList();
    },
    //点击当前分页
    handleCurrentChange(val) {
      this.page.current = val;
      this.getList();
    },
    //显示新增界面
    handleAdd: function () {
      this.title = '新增';
      this.btnTip = '提交';
      this.Form = {
        version: '',
        content: '',
        download_url: '',
        // version_code: ''
      };
      this.platform = "2";
      this.navList.map((res,i)=>{
        res.isActive = false
        if(i == 0){
          res.isActive = true
        }
      })
      this.FormVisible = true;
      this.isAdd = true;
    },
    //提交按钮
    submitFn: function () {
      this.$refs.Form.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.addLoading = true;
            this.Form.platform = this.platform;
            this.Form.is_mandatory = this.is_mandatory;
            this.Form.download_url = this.Form.download_url.trim()
            this.navList.map(res => {
              if (res.isActive == true) {
                this.Form.package_name = res.value
              }
            })
            request({
              url: REQUEST.system.AppversionAChange,
              method: "post",
              data: this.Form
            }).then(res => {
              this.$message.success(this.title + "成功");
              this.addLoading = false;
              this.$refs.tableList.getData();
              this.FormVisible = false;
            }).catch(err => {
              this.addLoading = false;
              this.$message.error(err);
            })
          });
        }
      });
    },
    //传递参数
    beforeSearch(params) {
      let s = { ...this.searchParams, ...this.dateTimeParams }
      return {
        size: params.size,
        page: params.page,
        title: s.title,
        package_name: s.package_name,
        start_time: s.start_time ? Math.floor(s.start_time / 1000) : '',
        end_time: s.end_time ? Math.floor(s.end_time / 1000) : '',
      };
    },
    // 查询
    onSearch(val) {
      this.searchParams.title = val.title;
      this.searchParams.package_name = val.package_name;
      this.$refs.tableList.getData();
    },
    // 上传文件反馈信息
    getUpLoadFile(fileRow) {
      this.Form.version = fileRow.fileName;
      this.Form.download_url = fileRow.url;
    },
    // 设置时间段
    setDateTime(arr) {
      const date = arr ? {
        start_time: arr[0],
        end_time: arr[1]
      } : {}
      this.$set(this, 'dateTimeParams', date)
    },
    // 清空日期选择
    emptyDateTime() {
      this.dateTimeParams = {}
    },
    // 获取包名
    getPackageName(id) {
      this.navList.map(res => {
        if (id == res.id) {
          return res.value
        }
      })
    }
  }
};
</script>

<style scoped lang="scss">
::v-deep.navBox {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 55px;
  line-height: 55px;
  font-size: 25px;
  font-weight: bold;
  border-bottom: solid 5px #DCDFE6;
  margin-bottom: 22px;

  .navItem {
    width: 150px;
    text-align: center;
  }

  .navItem.active {
    color: #1890ff;
  }
}

::v-deep.el-radio-group.platformType {
  .el-radio-button {
    .el-radio-button__inner {
      width: 120px;
    }
  }

  .el-radio-button:first-child {
    .el-radio-button__inner {
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
    }
  }

  .el-radio-button:last-child {
    .el-radio-button__inner {
      border-top-right-radius: 20px;
      border-bottom-right-radius: 20px;
    }
  }
}

:v-deep .el-upload--text {
  width: 178px !important;
  position: relative;
}

.app-version-config {
  padding: 20px;
}

.share-filter-grid-box {
  float: left;
}

.tips {
  position: absolute;
  left: 20px;
  top: 110px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
