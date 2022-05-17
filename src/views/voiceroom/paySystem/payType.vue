<template>
    <div class="payType-Box">
        <div class="FuncBox" v-for="(item,index) in FuncList" :key="index">
            <span>{{ item.name }}</span>
            <el-radio-group v-model="item.value" @change="(v) => setPayFunc(v, index)">
                <el-radio :label="2">四方</el-radio>
                <el-radio :label="1">爱意</el-radio>
            </el-radio-group>
        </div>
    </div>
</template>

<script>
// 引入api
import { getPayType, setPayType } from '@/api/pay.js'

export default {
    data() {
        return {
            FuncList: [
                {
                    label: '安卓',
                    name: '安卓',
                    value: 1
                },
                {
                    label: '公众号h5',
                    name: 'H5',
                    value: 1
                },
                {
                    label: '小程序',
                    name: '小程序',
                    value: 1
                }
            ]
        };
    },
    methods: {
        // 获取支付方式
        async getPayFunc() {
            let res = await getPayType()
            let back = res.data.data
            back.forEach(item => {
                this.FuncList.forEach(a => {
                    if(item.title === a.label) {
                        a.id = item.id
                        a.value = item.mer_id
                    }
                })
            })
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
    .FuncBox {
        display: flex;
        align-items: center;
        margin-bottom: 30px;
        >span {
            display: flex;
            width: 100px;
            font-weight: 600;
        }

        .el-radio-group {
            .el-radio {
                margin-right: 80px;
                .el-radio__label {

                }
            }
        }
    }
}
</style>