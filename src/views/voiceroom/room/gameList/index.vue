<template>
    <div class="gameList-box">
        <div class="conBox">
            <div class="game-type">
                <div class="leftBox">
                    <span>游戏类型：</span>
                    <el-select v-model="value1" multiple placeholder="请选择" @change="gameChange">
                        <el-option
                        v-for="item in gameList"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <!-- <el-button type="primary">编辑</el-button> -->
            </div>

            <div class="gameBox">
                <div v-for="(item,index) in selectList" :key="item.value">
                    <div class="uploadBox">
                        <uploadImg v-model="item.img" :imgUrl="item.img" ref="uploadImg" accept=".png,.jpg,.jpeg" :beforeUpload="beforeUpload"></uploadImg>
                    </div>
                    <span class="name"><span>名称：</span> {{ item.name }}</span>
                    <span class="nickname"><span>昵称：</span> {{ item.nickname }}</span>
                    <span><span>特色：</span> {{ item.feature }}</span>
                    
                    <span class="closeBox" @click="deleteParams(index)">删除</span>
                    <!-- <div class="statisticsBox">
                        <span><span>统计：</span><span>50</span></span>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// 引入公共map
import MAPDATA from '@/utils/jsonMap.js'
// 引入图片上传组件
import uploadImg from '@/components/uploadImg/index.vue'
export default {
    components: {
        uploadImg
    },
    data() {
        return {
            value1: '',
            gameList: MAPDATA.PARTYGAMELIST,
            selectList: []
        };
    },
    methods: {
        // 选择游戏
        gameChange(v) {
            let array = []
            if(v && v.length > 0) {
                v.forEach(item => {
                    let params = this.gameList.find(data => { return data.value === item })
                    array.push(params)
                })
            }
            this.selectList = array
        },
        // 删除
        deleteParams(index) {
            this.selectList.splice(index, 1)
        },
        // 限制图片
        beforeUpload() {}
    }
}
</script>

<style lang="scss">
.gameList-box {
    padding: 20px;
    box-sizing: border-box;
    .conBox {
        padding: 20px;
        box-sizing: border-box;
        box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.15);
        .game-type {
            display: flex;
            justify-content: space-between;
            .leftBox {
                .el-select {
                    width: 450px;
                    margin-left: 20px;
                }
            }
        }
        .gameBox {
            margin-top: 50px;
            >div {
                width: 100%;
                padding: 20px 30px;
                box-sizing: border-box;
                box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.15);
                margin-bottom: 20px;
                display: flex;
                align-items: center;
                position: relative;
                overflow: hidden;
                .uploadBox {
                    margin-right: 20px;
                    .uploadImg {
                        width: 50px !important;
                        height: 50px !important;
                        .el-form-item__content {
                            width: 50px !important;
                            height: 50px !important;
                        }
                        .el-upload--text {
                            width: 50px !important;
                            height: 50px !important;
                        }
                        .avatar-uploader-icon {
                            width: 50px !important;
                            height: 50px !important;
                            line-height: 50px !important;
                        }
                        .el-upload {
                            width: 50px !important;
                            height: 50px !important;
                            border: none !important;
                        }
                        .avatar-uploader {
                            width: 50px !important;
                            height: 50px !important;
                        }
                        .avatar {
                            width: 50px !important;
                            height: 50px !important;
                        }
                    }
                }
                .nickname {
                    margin: 0px 20px;
                }
                >span {
                    >span {
                        color: #D20A0A;
                    }
                }
                >span.name, >span.nickname {
                    white-space: nowrap;
                }
                .closeBox {
                    position: absolute;
                    right: -100px;
                    top: 0px;
                    z-index: 3;
                    color: #fff;
                    font-size: 20px;
                    width: 100px;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    transition: all 0.7s;
                    cursor: pointer;
                    border-radius: 0px 5px 5px 0px;
                }
            }
            >div:hover {
                box-shadow: 0px 0px 5px 0px rgba(210, 10, 10, 0.5);

                .closeBox {
                    right: 0px;
                }
            }
            
        }
    }
}
</style>