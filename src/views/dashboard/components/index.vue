// 总览
<template>
    <div class="dashboard-item-box">
        <ul>
            <li v-for="(item,index) in dashboardList" :key="index">
                <div class="Con" v-for="(a,b) in item.children" :key="b">
                    <span>{{ a.tit }}</span>
                    <div class="num">
                        <span class="total">{{ ruleForm[a.val] || 0 }}</span>
                        <span class="unit">{{ a.unit }}</span>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>

// 引入api
import { overview, overviewDayData } from '@/api/videoRoom'
// 引入数据
import DATA from './index.js'

export default {
    data() {
        return {
            ruleForm: {},
            dashboardList: DATA.dashboardList
        };
    },
    methods: {
        async getRoomWalletInfo(start_time = '',end_time = '') {
			var params = {
				start_time,
                end_time
			}
			let res = await overview(params)
            this.dataHandle(res.data)
		},
        // 日终数据
        async overviewDayDataFunc(time) {
			let res = await overviewDayData({ time })
            this.dataHandle(res.data)
        },
        // 数据处理
        dataHandle(row) {
            let s = row
            s.total_num = Number(s.total_diamond) + Number(s.total_gain)
            s.total_incGain = Number(s.incDiamond) + Number(s.incGain)
            s.total_decGain = Number(s.decDiamond) + Number(s.decGain)
            this.ruleForm = row;
        }
    },
    mounted() {
        this.getRoomWalletInfo()
    }
}
</script>

<style lang="scss">
.dashboard-item-box {
    >ul {
        padding: 0;
        >li {
            list-style: none;
            box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.15);
            padding: 20px;
            box-sizing: border-box;
            display: flex;
            margin-bottom: 20px;
            cursor: pointer;
            transition: all 0.8s;
            .Con {
                display: flex;
                align-items: center;
                >span {
                }
                .num {
                    margin-left: 10px;
                    >span.total {
                        display: inline-block;
                        font-size: 30px;
                        font-weight: 600;
                    }
                    >span.unit {
                        display: inline-block;
                        transform: translateY(-3px);
                    }
                }
            }
            >div {
                flex: 0.333;
            }

            @media (max-width: 1366px) {
                >div:nth-child(1) {
                    flex: 0.345;
                }
                >div:nth-child(2) {
                    flex: 0.37;
                }
                >div:nth-child(3) {
                    flex: 0.285;
                }
            }
        }
        >li:hover {
            box-shadow: 0px 0px 5px 0px rgba(210, 10, 10,0.5);
        }
        >li:last-child {
            margin-bottom: 0px;
        }
    }
}
</style>