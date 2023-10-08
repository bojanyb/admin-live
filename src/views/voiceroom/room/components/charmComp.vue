<template>
  <div class="charmComp-box">
    <el-dialog title="魅力榜" :visible.sync="dialogVisible" width="600px" :before-close="handleClose"
      :close-on-click-modal="false" :show-close="false" @closed="closed">
      <div class="section">
            <div class="time-box"></div>
            <div class="app-container">
              <div class="doc-card">
                <div class="doc-card-inner">
                  <div class="doc-card-info" v-infinite-scroll="onLoad" infinite-scroll-disabled="disabled"
                    infinite-scroll-distance="20">
                    <el-card v-for="item in list" :key="item.id" style="margin-bottom: 10px">
                      <div class="info-inner">
                        <el-avatar :src="item.face"></el-avatar>
                        <div class="info-detail">
                          <div class="info-title">{{ item.nickname }}</div>
                          <div class="info-dec">
                            <div style="margin-right: 10px;">用户ID: {{ item.user_number }}</div>
                            <div>魅力值：{{ item.total_amount }}</div>
                          </div>
                        </div>
                      </div>
                    </el-card>
                    <p v-if="loading">加载中...</p>
                    <p v-if="noMore && list.length">没有更多了</p>
                    <div class="empty" v-if="!list.length">
                      <i class="el-icon-document-delete"></i>
                      <span>暂无数据</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { charmTopByLive } from '@/api/house.js'
import { throttle } from "lodash";
import moment from 'moment';
export default {
  data() {
    return {
      liveId: '',
      dialogVisible: false,
      list: [],
      loading: false,
      noMore: false,
      disabled: false,
      infoParams: {
        size: 10,
        page: 1,
      },
    };
  },
  methods: {
    show(liveId) {
      this.liveId = liveId;
      this.dialogVisible = true;
    },
    onLoad() {
      this.getInfoList();
    },
    // 获取大R用户列表
    getInfoList: throttle(async function () {
      if (this.loading || this.noMore) {
        return false;
      }

      let tabParams = {
        id: this.liveId,
      }

      this.disabled = true;
      const res = await charmTopByLive({ ...this.infoParams, ...tabParams });
      this.loading = false;

      if (+res.code !== 2000) {
        this.$message.error("请求失败");
        this.infoParams.page = 1;
        this.noMore = false;
        this.list = [];
        return false;
      }

      if (res.data.list.length > 0) {
        this.noMore = false;
        this.disabled = false;
        const list = (res.data && res.data.list) || [];
        this.list = [...this.list, ...list];

        if (this.list.length < res.data.count) {
          this.infoParams.page++;
        } else {
          this.noMore = true;
          this.disabled = true;
        }
      } else {
        this.noMore = true;
        this.disabled = true;
      }
    }, 300),
    handleChangeTimer() {
      console.log(this.sreachForm.time);
      this.infoParams = {
        size: 10,
        page: 1,
      };
      this.noMore = false;
      this.loading = false;
      this.disabled = false;
      this.list = [];
      this.getInfoList();
    },
    handleClose() {
      this.dialogVisible = false;
    },
    // 销毁组件
    closed() {
      this.$emit("destoryComp")
    }
  }
}
</script>

<style lang="scss">
.charmComp-box {
  .el-dialog__body {
    padding: 0 20px;
  }
  .userListBox::-webkit-scrollbar {
    display: none;
  }

  .doc-card {
    height: 100%;

    .doc-card-inner {
      display: flex;

      .doc-card-info {
        height: calc(100vh - 500px);
        min-width: 436px;
        flex: 1;
        border: 1px solid #eff2f5;
        border-radius: 10px;
        padding: 24px;
        margin-right: 10px;
        overflow-y: auto;
        position: relative;

        &::-webkit-scrollbar {
          height: 10px;
          width: 10px;
          background: #e8e8e8;
        }

        &::-webkit-scrollbar-thumb {
          background: #c7c7c7;
          border-radius: 5px;
        }

        .info-inner {
          width: 100%;
          display: flex;
          justify-content: space-around;
        }

        .info-detail {
          width: 260px;

          .info-title {
            font-weight: 700;
            font-size: 16px;
            margin-bottom: 10px;
            color: #58727e;
          }

          .info-dec {
            display: flex;
            color: #969799;
            font-size: 14px;
          }
        }

        p {
          text-align: center;
          color: #969799;
        }

        .empty {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: #666;
        }
      }
    }
  }
}
</style>
