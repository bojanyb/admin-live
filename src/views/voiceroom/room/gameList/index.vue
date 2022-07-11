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
            </div>

            <div class="gameBox">
                <div v-for="(item,index) in selectList" :key="item.value">
                    <div class="uploadBox">
                        <img :src="item.url" alt="">
                    </div>
                    <span class="name"><span>名称：</span> {{ item.name }}</span>
                    <span class="nickname"><span>昵称：</span> {{ item.nickname }}</span>
                    <span><span>特色：</span> {{ item.feature }}</span>
                    
                    <span class="closeBox" @click="deleteParams(index)">删除</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// 引入api
import { roomGameList } from '@/api/user.js'
// 引入公共map
import MAPDATA from '@/utils/jsonMap.js'
export default {
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
            let params = { ids: v.toString() }
            this.getRoomGame(params)
        },
        // 设置游戏
        setGame(v) {
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
            this.value1.splice(index, 1)
            this.gameChange(this.value1)
        },
        // 限制图片
        beforeUpload() {},
        // 获取所有游戏
        async getRoomGame(params) {
            let res = await roomGameList(params)
            if(res.data.ids) {
                let arr = res.data.ids.split(',')
                this.value1 = arr.map(a => { return Number(a) })
                this.setGame(this.value1)
            }
        }
    },
    mounted() {
        this.getRoomGame()
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
                    >img {
                        width: 50px;
                        height: 50px;
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