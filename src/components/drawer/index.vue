<template>
    <div class="drawer-box">
        <el-drawer
        :size="size"
        :withHeader="false"
        :append-to-body="appendToBody"
        :close-on-press-escape="closeOnPressEscape"
        :show-close="showClose"
        :wrapperClosable="wrapperClosable"
        :visible.sync="drawer"
        :direction="direction"
        :destroy-on-close="true"
        @closed="closed">
            <div class="mainBox">
                <div class="header">
                    <span>{{ title }}</span>
                </div>
                <div class="body">
                    <slot name="body"></slot>
                </div>
                <div class="footer">
                    <el-button v-show="isCancel" @click="cancel">取消</el-button>
                    <el-button type="primary" v-show="isConfirm && disabled && isShowUpdate" @click="update">修改</el-button>
                    <el-button :disabled="disabled" type="primary" v-show="isConfirm && !disabled" @click="submitForm">确认</el-button>
                </div>
            </div>
        </el-drawer>
    </div>
</template>

<script>
export default {
    props: {
        appendToBody: { // 是否插入至 body 元素
            type: Boolean,
            default: false
        },
        closeOnPressEscape: { // 是否可以通过按下 ESC 关闭
            type: Boolean,
            default: true
        },
        direction: { // Drawer 打开的方向
            type: String,
            default: 'rtl'
        },
        showClose: { // 是否显示关闭按钮
            type: Boolean,
            default: true
        },
        title: { // Drawer 的标题
            type: String,
            default: ''
        },
        wrapperClosable: { // 点击遮罩层是否可以关闭 Drawer
            type: Boolean,
            default: false
        },
        isCancel: { // 是否显示取消按钮
            type: Boolean,
            default: true
        },
        isConfirm: { // 是否显示确认按钮
            type: Boolean,
            default: true
        },
        size: { // 数字就以px 字符串就以百分比
            type: String,
            default: '500px'
        },
        disabled: { // 禁止更改
            type: Boolean,
            default: false
        },
        isShowUpdate: { // 是否需要显示可修改
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            drawer: false
        };
    },
    methods: {
        // 获取数据
        loadParams(status) {
            this.drawer = status
        },
        // 取消
        cancel() {
            this.$emit('cancel')
        },
        // 修改
        update() {
            this.$emit('update')
        },
        // 提交
        submitForm() {
            this.$emit('submitForm', 'ruleForm')
        },
        // 销毁组件
        closed() {
            this.$emit('closed')
        }
    }
}
</script>

<style lang="scss">
.drawer-box {
    .el-drawer__body {
        height: 100%;
        .mainBox {
            height: 100%;
            display: flex;
            flex-direction: column;
            
            >.header {
                flex-basis: 85px;
                display: flex;
                // align-items: center;
                justify-content: center;
                font-size: 22px;
                font-weight: 600;
                padding-top: 30px;
                box-sizing: border-box;
                border-bottom: 1px solid #ccc;
                margin-bottom: 40px;
            }
            >.body {
                padding: 0px 30px;
                box-sizing: border-box;
                flex: 1;
                overflow-y: auto;
            }
            >.body::-webkit-scrollbar {
                display: none;
            }
            >.footer {
                padding: 0px 30px;
                box-sizing: border-box;
                flex-basis: 80px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .el-button {
                    width: 70px;
                    height: 40px;
                }
            }
        }
    }
}
</style>