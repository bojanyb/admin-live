<template>
    <div class="payType-Box">
        <div class="payType">
            <div class="FuncBox" v-for="(item,index) in FuncListComputed" :key="index">
                <span>{{ index }}</span>
                <div v-for="(a, b) in item" :key="b">
                    <!-- <el-checkbox-group v-model="checkList" @change="(v) => setPayFunc(item, v, index)">
                        <el-checkbox :label="a.id"><span class="tit">{{ a.title }}</span> 
                        <el-button type="primary" @click="editFunc(a.id, 2)">编辑</el-button>
                    </el-checkbox>
                    </el-checkbox-group> -->
                    <el-checkbox v-model="a.checked" :disabled="a.disabled" @change="(v) => setPayFunc(index, a, b, v)"><span class="tit">{{ a.title }}</span>
                        <el-button type="primary" :disabled="a.disabled" @click="editFunc(a.id, 2)">编辑</el-button>
                    </el-checkbox>
                    <!-- <el-radio-group v-model="item.mer_id" @change="(v) => setPayFunc(item, v, index)">
                        <el-radio :label="2"><span class="tit">{{ a.title }}</span> 
                            <el-button type="primary" @click="editFunc(a.id, 2)">编辑</el-button>
                        </el-radio>
                    </el-radio-group> -->
                </div>
            </div>
        </div>

        <indexComp ref="indexComp" v-if="isDestoryComp" @getPayFunc="getPayFunc" @destoryComp="destoryComp"></indexComp>

        <editComp ref="editComp" v-if="isDestoryComp" @getPayFunc="getPayFunc" @destoryComp="destoryComp"></editComp>
    </div>
</template>

<script>
// 引入api
import { getChannelTypeList, setPayType } from '@/api/pay.js'
// 引入编辑组件
import indexComp from './edit/index.vue'
import editComp from './edit/edit.vue'

export default {
    components: {
        indexComp,
        editComp
    },
    filters: {
        titFilter(val) {
            if(val) {
                if(val.indexOf('微信') !== -1) {
                    return '微信支付'
                }
                return '蚂蚁金服'
            }
            return '--'
        }
    },
    data() {
        return {
            checkList: [],
            FuncList: [],
            isDestoryComp: false // 是否销毁组件
        };
    },
    computed: {
        FuncListComputed() {
            let params = JSON.parse(JSON.stringify(this.FuncList))
            if(params) {
                for (const key in params) {
                    params[key].forEach((item,index) => {
                        if(item.title.indexOf('汇付') !== -1 && item.is_check === 1 && key !== 'pc') {
                            params[key][index + 1].disabled = true
                        }
                        if(item.title.indexOf('微信') !== -1 && item.is_check === 1) {
                            params[key][index - 1].disabled = true
                        }
                    })
                }
            }
            return params
        }
    },
    methods: {
        // 获取支付方式
        async getPayFunc() {
            let res = await getChannelTypeList()
            if(res.data) {
                for (const key in res.data) {
                    if(res.data[key] && res.data[key].length > 0) {
                        res.data[key].forEach((item,index) => {
                            item.checked = item.is_check === 1
                            if(item.title.indexOf('汇付') !== -1 && key == 'pc') {
                                item.disabled = true
                            }
                            if(key == 'xcx' && item.title.indexOf('支付宝') !== -1) {
                                item.disabled = true
                            }
                        })
                    }
                }
            }

            this.FuncList = res.data
        },
        // 设置支付方式
        async setPayFunc(key, item, index, v) {
            let val = item.is_check === 1
            this.$set(item, 'checked', val)
            this.$confirm('是否切换？')
            .then(async _ => {
                await this.updatePayType(item, v)
                // if(key === 'h5') {
                //     let data = this.FuncList['gzh'][index]
                //     await this.updatePayType(data, v)
                // } else if(key === 'gzh') {
                //     let data = this.FuncList['h5'][index]
                //     await this.updatePayType(data, v)
                // }
            })
            .catch(_ => {});
        },
        // 修改支付设置
        async updatePayType(item, v) {
            let params = {
                id: item.id,
                is_check: v ? 1 : 0,
                pay_way: item.pay_way
            }
            console.log(item, 'item---------')
            let res = await setPayType(params)
            if(res.code === 2000) {
                // this.$set(item, 'checked', !val)
                this.$message.success('修改成功')
                this.getPayFunc()
            } else {
                this.$message.error('修改失败')
            }
        },
        // 打开编辑
        editFunc(id, mer_id) {
            this.isDestoryComp = true
            setTimeout(() => {
                if(mer_id === 2) {
                    this.$refs.indexComp.dialogVisible = true
                    this.$refs.indexComp.getAdaPayConfigFunc(id)
                } else {
                    this.$refs.editComp.dialogVisible = true
                    this.$refs.editComp.getWxPayFunc(id)
                }
            }, 100);
        },
        // 销毁组件
        destoryComp() {
            this.isDestoryComp = false
        }
    },
    created() {
        this.getPayFunc()
    }
}
</script>

<style lang="scss">
.payType-Box {
    padding: 20px;
    box-sizing: border-box;
    .payType {
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.15);
        padding: 30px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        .FuncBox {
            display: flex;
            flex-direction: column;
            // align-items: center;
            margin-bottom: 30px;
            >span {
                display: flex;
                width: 100px;
                font-weight: 600;
            }
            >div {
                margin-bottom: 30px;
            }
            >div:nth-child(2) {
                margin-top: 50px;
            }
            .el-checkbox {
                display: flex;
                align-items: center;
                .el-checkbox__label {
                    display: flex;
                    align-items: center;
                    >span.tit {
                        display: flex;
                        width: 100px;
                    }
                }
            }
        }
    }
}
</style>