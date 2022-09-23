<template>
    <div class="systemConfig-merchants-box">
        <div class="mainBox">
            <div class="sunBox">
                <span>密码</span>
                <el-input v-model="password" clearable placeholder="请输入密码（最少9位数，字母和数字）" @change="passChange"></el-input>
                <el-button type="primary" :disabled="password.length < 9" @click="getBannerFunc">确定</el-button>
            </div>

            <div class="passwordBox">
                <div class="sunBox" v-for="(item,index) in passList">{{ item }}</div>
            </div>
        </div>
    </div>
</template>

<script>
// 引入api
import { getBanner } from '@/api/system'
export default {
    data() {
        return {
            password: '',
            passList: []
        };
    },
    methods: {
        async getBannerFunc() {
            if(this.password && this.password.trim()) {
                let params = {
                    'admin-token': this.$store.getters.token,
                    password: this.password
                }
                let res = await getBanner(params)
                this.passList = res.data.list || []

            }
            
        },
        // 更改密码
        passChange(v) {
            if(!v) {
                this.passList = []
            }
        }
    }
}
</script>

<style lang="scss">
.systemConfig-merchants-box {
    padding: 20px;
    box-sizing: border-box;
    .mainBox {
        box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.15);
        padding: 20px;
        box-sizing: border-box;
        .sunBox {
            display: flex;
            align-items: center;
            >span {
                font-size: 14px;
                font-weight: 700;
                margin-right: 20px;
            }
            .el-input {
                width: 300px;
            }
            .el-button {
                margin-left: 20px;
            }
        }
        .passwordBox {
            margin-top: 20px;
        }
    }
}
</style>