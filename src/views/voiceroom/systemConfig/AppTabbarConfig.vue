<template>
  <div class="app-tabbar-config-box app-container">
    <div class="searchParams">
      <div class="formBox">
        <div class="sunBox">
          <span>时间选择</span>
          <el-date-picker
            v-model="dateTimeParams"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="timestamp"
            :default-time="['00:00:00', '23:59:59']"
            @change="changeDate"
          >
          </el-date-picker>
        </div>
		<div class="refreshBox">
		<el-switch
			v-model="isRefresh"
			active-text="启用"
			inactive-text="停用"
			@change="switchChange"
		>
		</el-switch>
        </div>
      </div>
    </div>

    <tableList :cfgs="cfgs" ref="tableList" :is-hide-page="true"></tableList>

    <!-- 修改组件 -->
    <tabbarComp
      v-if="isDestoryComp"
      ref="tabbarComp"
      @destoryComp="destoryComp"
      @getList="getList"
    ></tabbarComp>
  </div>
</template>

<script>
// 引入api
import { updateTabbarStatus } from '@/api/system'
// 引入修改组件
import tabbarComp from "./tabbarComp/index.vue";
// 引入列表组件
import tableList from "@/components/tableList/TableList.vue";
// 引入api
import REQUEST from "@/request/index.js";
// 引入公共方法
import { timeFormat } from "@/utils/common.js";
// 引入公共参数
import mixins from "@/utils/mixins.js";
export default {
  name: "banner-list",
  mixins: [mixins],
  components: {
    tabbarComp,
    tableList,
  },
  data() {
    return {
      isDestoryComp: false, // 是否销毁组件
      isRefresh: false, // 是否启用
      dateTimeParams: [],
    };
  },
  computed: {
    cfgs() {
      return {
        vm: this,
        url: REQUEST.system.tabbar.getConfigList,
        columns: [
          {
            label: "位置",
            prop: "id",
          },
          {
            label: "文字",
            prop: "name",
          },
          {
            label: "图片",
            prop: "icon",
			isimg: true,
			imgWidth: '50px',
			imgHeight: '50px'
          },  
          {
            label: "操作",
            render: (h, params) => {
              return h("div", [
                h(
                  "el-button",
                  {
                    props: { type: "primary" },
                    on: {
                      click: () => {
                        this.update(params.row);
                      },
                    },
                  },
                  "修改"
                ),
              ]);
            },
          },
        ],
      };
    },
  },
  methods: {
    // 配置参数
    beforeSearch(params) {
      return {
        page: params.page,
        pagesize: params.size,
      };
    },
	// 请求完回调
	onSearchSuccess(res) {
		const data = res.data;
		return {
			data: data.list || [],
		}
	},
    // 刷新列表
    getList() {
      this.$refs.tableList.getData();
    },
    // 修改
    update(row) {
      this.load("update", row);
    },
    load(status, row) {
      this.isDestoryComp = true;
      setTimeout(() => {
        this.$refs.tabbarComp.loadParams(status, row);
      }, 50);
    },
    // 销毁组件
    destoryComp() {
      this.isDestoryComp = false;
    },
    // 日期更改
    changeDate() {},
    // 是否启用配置
    switchChange(value) {
		const params = {
			type: 1, // 类型: 1- 更新状态/2-更新生效时间
			status: value ? 0 : 1
		}
		updateTabbarStatus().then(res => {
			if(res.code !== 20000) return;
			this.$success("已开启");
		})
    },
  },
};
</script>

<style lang="scss">
.app-tabbar-config-box {
  .formBox {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .sunBox {
      margin-right: 12px;
      margin-bottom: 20px;
      > span {
        font-size: 14px;
        color: #606266;
        font-weight: 700;
        margin-right: 12px;
      }
      .el-input {
        width: 180px;
        input {
          border: none;
          background: #f5f7fa;
        }
      }
      .el-date-editor {
        border: none;
        background: #f5f7fa;
        input {
          background: #f5f7fa;
        }
      }
    }
	.refreshBox {
		margin-bottom: 20px;
		margin-left: 10px;
	}
  }
}
</style>
