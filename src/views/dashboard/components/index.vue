// 总览
<template>
    <div class="dashboard-item-box">
        <ul>
            <li v-for="(item,index) in dashboardList" :key="index">
                <div class="Con" v-for="(a,b) in item.children" :key="b">
                    <span>{{ a.tit }}</span>
                    <div class="num">
                        <span class="total" v-if="a.val == 'total_top_up_diamond'" style="font-size: 18px">
                            <span v-format="'#,##0'">{{ Number(ruleForm[a.val]) || 0 }}</span>
                           = 安卓:<span v-format="'#,##0'">{{ Number(ruleForm.android_top_up_diamond) || 0 }}</span>
                           + 苹果:<span v-format="'#,##0'">{{ Number(ruleForm.apple_top_up_diamond) || 0 }}</span>
                        </span>
                        <span class="total" v-else v-format="'#,##0'">{{ Number(ruleForm[a.val]) || 0 }}</span>
                        <span class="unit" v-if="a.val !== 'total_top_up_diamond'">{{ a.unit }}</span>
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
import { timeFormat } from '@/utils/common'

export default {
    data() {
        return {
            ruleForm: {},
            dashboardList: DATA.dashboardList
        };
    },
    methods: {
        async getRoomWalletInfo(start_time = '',end_time = '') {
            if(start_time == '' && end_time ==''){
                let date = new Date()
                let currentDate = timeFormat(date, 'YYYY-MM-DD', false)
                start_time = Date.parse(currentDate + ' 00:00:00') / 1000
                end_time = Date.parse(currentDate + ' 23:59:59') / 1000
            }
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
            this.dataHandle(res.data.log_json)
        },
        // 数据处理
        dataHandle(row) {
            let s = row
            s.total_num = Number(s.total_diamond) + Number(s.total_gain)
            s.total_incGain = Number(s.incDiamond) + Number(s.incGain)
            s.total_decGain = Number(s.decDiamond) + Number(s.decGain)
            s.android_top_up_diamond = Number(s.android_top_up_diamond)
            s.apple_top_up_diamond = Number(s.apple_top_up_diamond)
            s.guild_rebates = Number(s.weekBate1) + Number(s.weekBate2) + Number(s.weekBate3) + Number(s.weekBate4)
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