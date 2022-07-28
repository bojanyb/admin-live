<template>
    <div class="share-bindStuck-box">
        <el-dialog
            title="卡列表"
            :visible.sync="dialogVisible"
            width="500px"
            :close-on-click-modal="false"
            :before-close="handleClose">
            <div class="bindStuck">
                <div v-for="(item,index) in list" :key="index">
                    <img :src="item.url" alt="">
                    <span>{{ item.name }}</span>
                    <span>{{ item.card_id }}</span>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
// 引入MAPDATA数据
import MAPDATA from '@/utils/jsonMap.js'
// 引入api
import { getStuck } from '@/api/videoRoom'

export default {
    data() {
        return {
            dialogVisible: false,
            list: []
        };
    },
    methods: {
        handleClose() {
            this.dialogVisible = false
        },
        // 获取数据
        getList(id) {
            getStuck({page: 1, userid: id}).then(res => {
                if(res.data.list && res.data.list.length > 0) {
                    res.data.list.forEach(item => {
                        let params = MAPDATA.BANKLIST.find(item => { item.code === item.wallt_id })
                        item.name = params ? params.name : ''
                        item.url = params ? params.url : ''
                    })
                    this.list = res.data.list || []
                }
            })
        }
    }
}
</script>

<style lang="scss">
.share-bindStuck-box {
    .bindStuck {
        padding: 10px 20px;
        box-sizing: border-box;
        box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.15);
        >div {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            >img {
                width: 50px;
                height: 50px;
            }
            >span {
                font-size: 16px;
                margin-right: 10px;
            }
        }
        >div:last-child {
            margin-bottom: 0px;
        }
    }
}
</style>