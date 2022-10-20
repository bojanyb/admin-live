<template>
    <div class="guild-apply-list-box">
        <menuComp ref="menuComp" :menuList="menuList" v-model="tabIndex"></menuComp>
         <!-- 组件 -->
         <component :is="comp"></component>
    </div>
</template>

<script>
// 引入tab菜单组件
import menuComp from '@/components/menuComp/index.vue'
// 引入菜单组件
import memberComp from './components/memberComp.vue'
import anchorApplyComp from './components/anchorApplyComp.vue'

// 引入公共参数
import mixins from '@/utils/mixins.js'
export default {
    data() {
        return {
            isAdd: false,
            tabIndex: '0',
            menuList : [
                {
                    name : "公会成员",
                },
                {
                    name : "主播申请列表",
                }
            ],
        }
    },
    components: {
        menuComp,
        memberComp,
        anchorApplyComp
    },
    mixins: [mixins],
    computed: {
        comp() {
            return this.tabIndex === '0' ? 'memberComp' : 'anchorApplyComp'
        }
    },
    methods: {
    }
}
</script>

<style lang="scss">
.guild-apply-list-box {
    padding: 20px;
    box-sizing: border-box;
    .headerBox {
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid #ccc;
		margin-bottom: 30px;
		.select {
			display: flex;
			align-items: center;
			>span {
				display: flex;
				align-items: center;
				justify-content: center;
				width: auto;
				height: 50px;
				margin-left: 20px;
				cursor: pointer;
				border-bottom: 2px solid rgba(0,0,0,0);
				transform: translateY(1px);
			}
			>span.high {
				border-color: blue;
			}
		}
	}
}
</style>