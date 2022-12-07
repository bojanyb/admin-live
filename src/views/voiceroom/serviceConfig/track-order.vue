<template>
  <div class="m-content-card page-tracker">
    <div class="main-content">
      <div class="doc-info-left">
        <el-card class="card">
          <el-row :gutter="20" style="margin-bottom: 10px">
            <el-col :span="10">
              <div class="form-item">
                <div class="form-label">用户ID1</div>
                <el-input
                  v-model="searchChatData.first_user_number"
                  placeholder="请输入内容"
                ></el-input>
              </div>
            </el-col>
            <el-col :span="10">
              <div class="form-item">
                <div class="form-label">用户ID2</div>
                <el-input
                  v-model="searchChatData.second_user_number"
                  placeholder="请输入内容"
                ></el-input>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="20">
              <div class="form-item">
                <div class="form-label">查询时间</div>
                <el-date-picker
                  v-model="chatTimeData"
                  type="datetimerange"
                  value-format="timestamp"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  style="width: 100%"
                >
                </el-date-picker>
              </div>
            </el-col>
            <el-col :span="4">
              <el-button type="primary" @click="onChatSearch">查询</el-button>
            </el-col>
          </el-row>
        </el-card>
        <div
          class="pev-left"
          v-infinite-scroll="onChatLoad"
          infinite-scroll-disabled="chatDisabled"
          :infinite-scroll-distance="10"
          :infinite-scroll-immediate="false"
          :infinite-scroll-delay="200"
        >
          <el-card v-for="item in renderChatList" style="margin-bottom: 10px">
            <div class="pev-inner">
              <div class="pev-header">
                <div class="pev-user-title">
                  <div class="ellipsis">{{ item.from_user_nickname }}</div>
                  <div>{{ `(${item.from_user_number})` }}</div>
                </div>
                <span class="pev-time">{{ item.create_time }}</span>
              </div>
              <div class="pev-footer">{{ `${+item.reply === 0 ? '发送' : '回复'}: ${item.content}`   }}</div>
            </div>
          </el-card>
          <!-- <p v-if="chatLoading">加载中...</p> -->
          <p v-if="chatNoMore">没有更多了</p>
          <div class="empty" v-if="!renderChatList.length">
            <i class="el-icon-document-delete"></i>
            <span>暂无数据</span>
          </div>
        </div>
      </div>
      <div class="doc-info-right">
        <el-card class="card">
          <el-row :gutter="20" style="margin-bottom: 10px">
            <el-col :span="10">
              <div class="form-item">
                <div class="form-label">用户ID</div>
                <el-input
                  v-model="searchRoomData.user_number"
                  placeholder="请输入内容"
                ></el-input>
              </div>
            </el-col>
            <el-col :span="10">
              <div class="form-item">
                <div class="form-label">房间ID</div>
                <el-input
                  v-model="searchRoomData.room_number"
                  placeholder="请输入内容"
                ></el-input>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="20">
              <div class="form-item">
                <div class="form-label">查询时间</div>
                <el-date-picker
                  v-model="roomTimeData"
                  type="datetimerange"
                  value-format="timestamp"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  style="width: 100%"
                >
                </el-date-picker>
              </div>
            </el-col>
            <el-col :span="4">
              <el-button type="primary" @click="onRoomSearch">查询</el-button>
            </el-col>
          </el-row>
        </el-card>
        <div class="pev-right"
          v-infinite-scroll="onRoomLoad"
          infinite-scroll-disabled="roomDisabled"
          :infinite-scroll-distance="10"
          :infinite-scroll-immediate="false"
          :infinite-scroll-delay="200"
        >
          <el-card v-for="item in renderRoomList" style="margin-bottom: 10px">
            <div class="pev-inner">
              <div class="pev-header">
                <div class="pev-user-title">
                  <div class="ellipsis">{{ item.user_nickname }}</div>
                  <div>{{ `(${item.user_number})` }}</div>
                </div>
                <span class="pev-time">{{ item.create_time }}</span>
              </div>
              <div class="pev-section">
                <div class="ellipsis">{{ item.title }}</div>
                <div>{{ `(${item.room_number})` }}</div>
              </div>
              <div class="pev-footer">发送：{{ item.content }}</div>
            </div>
          </el-card>
          <!-- <p v-if="roomLoading">加载中...</p> -->
          <p v-if="roomNoMore">没有更多了</p>
          <div class="empty" v-if="!renderRoomList.length">
            <i class="el-icon-document-delete"></i>
            <span>暂无数据</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { chatTalkList, roomTalkList } from "@/api/risk.js";
import { throttle } from "lodash";
export default {
  data() {
    return {
      searchChatData: {
        first_user_number: "",
        second_user_number: "",
        start_time: "",
        end_time: "",
      },
      chatTimeData: [],
      renderChatList: [],
      chatLoading: false,
      chatNoMore: false,
      chatDisabled: false,
      chatFlag: false,
      chatMaxId: 0,
      chatPagination: {
        size: 10,
        page: 1,
      },

      searchRoomData: {
        user_number: "",
        room_number: "",
        start_time: "",
        end_time: "",
      },
      roomTimeData: [],
      renderRoomList: [],
      roomLoading: false,
      roomNoMore: false,
      roomDisabled: false,
      roomFlag: false,
      roomMaxId: 0,
      roomPagination: {
        size: 10,
        page: 1,
      },
    };
  },
  methods: {
    // 获取私聊消息
    getChatList: throttle(function () {
      // if (this.chatLoading || this.chatNoMore) {
      //   return false;
      // }
      this.chatLoading = true;
      const isTimeVal = this.chatTimeData && this.chatTimeData.length;
      const temp = {
        ...this.searchChatData,
        ...this.chatPagination,
        start_time: isTimeVal ? Math.floor(this.chatTimeData[0] / 1000) : "",
        end_time: isTimeVal ? Math.floor(this.chatTimeData[1] / 1000) : "",
        max_id: this.chatMaxId
      };
    chatTalkList(temp).then(res => {
      this.chatLoading = false;

      if (+res.code !== 2000) {
        this.chatPagination.page = 1;
        this.chatNoMore = false;
        this.chatFlag = false;
        this.renderChatList = [];
        this.$message.error("请求失败");
        return false;
      }
      // debugger
      if (res.data.list.length) {
        this.chatNoMore = false;
        this.chatDisabled = false;
        this.chatMaxId = res.data.max_id;
        const list = (res.data && res.data.list) || [];
        this.renderChatList = [...this.renderChatList, ...list];

        if (this.renderChatList.length < res.data.count) {
          this.chatPagination.page++;
          this.chatFlag = true;
        } else {
          this.chatNoMore = true;
          this.chatDisabled = true;
          this.chatFlag = false;
        }
      } else {
        this.chatNoMore = true;
        this.chatDisabled = true;
        this.chatFlag = false;
      }
    }).catch(err => {
      console.log(err, "err");
      this.chatFlag = false;
    })
    }, 300),
    // 私聊下拉加载
    onChatLoad() {
      if (this.chatFlag) {
        this.getChatList();
      }
    },
    // 获取房间消息
    getRoomList: throttle(function () {
      // if (this.roomLoading || this.roomNoMore) {
      //   return false;
      // }
      this.roomLoading = true;
      const isTimeVal = this.roomTimeData && this.roomTimeData.length;
      const temp = {
        ...this.searchRoomData,
        ...this.roomPagination,
        start_time: isTimeVal ? Math.floor(this.roomTimeData[0] / 1000) : "",
        end_time: isTimeVal ? Math.floor(this.roomTimeData[1] / 1000) : "",
        max_id: this.roomMaxId
      };
      roomTalkList(temp).then(res => {
      this.roomLoading = false;

      if (+res.code !== 2000) {
        this.roomPagination.page = 1;
        this.roomNoMore = false;
        this.roomFlag = false;
        this.renderRoomList = [];
        this.$message.error("请求失败");
        return false;
      }

      if (res.data.list.length) {
        this.roomNoMore = false;
        this.roomDisabled = false;
        this.roomMaxId = res.data.max_id;
        const list = (res.data && res.data.list) || [];
        this.renderRoomList = [...this.renderRoomList, ...list];

        if (this.renderRoomList.length < res.data.count) {
          this.roomPagination.page++;
          this.roomFlag = true;
        } else {
          this.roomNoMore = true;
          this.roomDisabled = true;
          this.roomFlag = false;
        }
      } else {
        this.roomNoMore = true;
        this.roomDisabled = true;
        this.roomFlag = false;
      }
    }).catch(err => {
      console.log(err, "err");
      this.roomFlag = false;
    })
    }, 300),
    // 房间下拉加载
    onRoomLoad() {
      if (this.roomFlag) {
        this.getRoomList();
      }
    },
    // 私聊信息搜索
    onChatSearch() {
      this.renderChatList = [];
      this.chatPagination.page = 1;
      this.getChatList();
    },
    // 房间消息搜索
    onRoomSearch() {
      this.renderRoomList = [];
      this.roomPagination.page = 1;
      this.getRoomList();
    },
  },
};
</script>

<style lang="scss" scoped>
.page-tracker {
  height: calc(100vh - 200px);
  width: 100%;
  display: flex;
  .main-content {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .doc-info-left {
      min-width: 750px;
      flex: 1;
      border: 1px solid #eff2f5;
      border-radius: 10px;
      padding: 24px;
      margin-right: 20px;
      // background: #f0f2f5;
      .card {
        margin-bottom: 20px;
        .form-item {
          display: flex;
          .form-label {
            white-space: nowrap;
            margin-right: 10px;
            font-size: 14px;
          }
        }
      }
      .pev-left {
        width: 414px;
        height: calc(100vh - 400px);
        border: 10px solid #495060;
        background: #ffffff;
        border-radius: 15px;
        padding: 24px;
        margin: 0 auto;
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
        .pev-inner {
          width: 100%;
          display: flex;
          flex-direction: column;
          font-size: 14px;
          line-height: 26px;
          .pev-header {
            display: flex;
            justify-content: space-between;
            .pev-user-title {
              display: flex;
              font-weight: 700;
              color: #58727e;
              .ellipsis {
                max-width: 100px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            }
            .pev-time {
              color: #969799;
              font-size: 12px;
            }
          }
          .pev-footer {
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
    .doc-info-right {
      min-width: 750px;
      flex: 1;
      border: 1px solid #eff2f5;
      border-radius: 10px;
      padding: 24px;
      // background: #f0f2f5;
      .card {
        margin-bottom: 20px;
        .form-item {
          display: flex;
          .form-label {
            white-space: nowrap;
            margin-right: 10px;
            font-size: 14px;
          }
        }
      }
      .pev-right {
        width: 414px;
        height: calc(100vh - 400px);
        border: 10px solid #495060;
        background: #ffffff;
        border-radius: 15px;
        padding: 24px;
        margin: 0 auto;
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
        .pev-inner {
          width: 100%;
          display: flex;
          flex-direction: column;
          font-size: 14px;
          line-height: 26px;
          .pev-header {
            display: flex;
            justify-content: space-between;
            .pev-user-title {
              display: flex;
              font-weight: 700;
              color: #58727e;
              .ellipsis {
                max-width: 100px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            }
            .pev-time {
              color: #969799;
              font-size: 12px;
            }
          }
          .pev-section {
            display: flex;
            font-weight: 700;
            color: #58727e;
            .ellipsis {
              max-width: 150px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
          .pev-footer {
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
