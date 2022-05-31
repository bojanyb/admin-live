<template>
    <div class="payType-Box">
        <div class="payType">
            <div class="FuncBox" v-for="(item,index) in FuncList" :key="index">
                <span>{{ item.title }}</span>
                <el-radio-group v-model="item.mer_id" @change="(v) => setPayFunc(v, index)">
                    <el-radio :label="2"><span class="tit">汇付</span> <el-button type="primary" @click="editFunc(item.id, 2)">编辑</el-button></el-radio>
                    <el-radio :label="1"><span class="tit">{{ item.title | titFilter }}</span> <el-button type="primary" @click="editFunc(item.id, 1)">编辑</el-button></el-radio>
                </el-radio-group>
            </div>
        </div>

        <indexComp ref="indexComp" v-if="isDestoryComp" @getPayFunc="getPayFunc" @destoryComp="destoryComp"></indexComp>

        <editComp ref="editComp" v-if="isDestoryComp" @getPayFunc="getPayFunc" @destoryComp="destoryComp"></editComp>
    </div>
</template>

<script>
// 引入api
import { getPayType, setPayType } from '@/api/pay.js'
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
            FuncList: [],
            isDestoryComp: false // 是否销毁组件
        };
    },
    methods: {
        // 获取支付方式
        async getPayFunc() {
            let res = await getPayType()
            // let back = res.data.data
            // back.forEach(item => {
            //     this.FuncList.forEach(a => {
            //         if(item.title === a.label) {
            //             a.id = item.id
            //             a.value = item.mer_id
            //         }
            //     })
            // })

            this.FuncList = res.data.data
        },
        // 设置支付方式
        async setPayFunc(v, index) {
            let data = this.FuncList[index]
            let params = {
                id: data.id,
                mer_id: v
            }
            let res = await setPayType(params)
            if(res.code === 2000) {
                this.$message.success('修改成功')
            } else {
                this.$message.error('修改失败')
            }
        },
        // 打开编辑
        editFunc(id, mer_id) {
            console.log(mer_id, 'mer_id----------')
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
            .el-radio-group {
                display: flex;
                flex-direction: column;
                margin-top: 50px;
                .el-radio {
                    // margin-right: 80px;
                    width: 200px;
                    height: 50px;
                    margin-bottom: 30px;
                    display: flex;
                    align-items: center;
                    .el-radio__label {
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
}
</style>