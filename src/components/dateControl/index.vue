<template>
    <div class="dateControl-box">
        <div class="dateBox">
            <div class="start_time_box">
                <div class="leftBox">
                    <div class="yearBox">
                        <el-input ref="start_year" v-model="ruleForm.start_time.year" placeholder="YYYY" @input="verifyTime('year', 'start_time', 'start_month')" oninput="this.value=this.value.replace(/[^\d]/g,'');" maxlength="4"></el-input>
                    </div>
                    <div class="lineBox">-</div>
                    <div class="monthBox">
                        <el-input ref="start_month" v-model="ruleForm.start_time.month" placeholder="MM" @input="verifyTime('month', 'start_time', 'start_day')" oninput="this.value=this.value.replace(/[^\d]/g,'');" maxlength="2">></el-input>
                    </div>
                    <div class="lineBox">-</div>
                    <div class="dayBox">
                        <el-input ref="start_day" v-model="ruleForm.start_time.day" placeholder="DD" @input="verifyTime('day', 'start_time', 'start_hour')" oninput="this.value=this.value.replace(/[^\d]/g,'');" maxlength="2"></el-input>
                    </div>
                </div>
                <div class="rightBox">
                    <div class="hoursBox">
                        <el-input ref="start_hour" v-model="ruleForm.start_time.hour" placeholder="HH" @input="verifyTime('hour', 'start_time', 'start_minute')" oninput="this.value=this.value.replace(/[^\d]/g,'');" maxlength="2"></el-input>
                    </div>
                    <div class="lineBox">:</div>
                    <div class="minutesBox">
                        <el-input ref="start_minute" v-model="ruleForm.start_time.minute" placeholder="mm" @input="verifyTime('minute', 'start_time', 'start_second')" oninput="this.value=this.value.replace(/[^\d]/g,'');" maxlength="2"></el-input>
                    </div>
                    <div class="lineBox">:</div>
                    <div class="secondsBox">
                        <el-input ref="start_second" v-model="ruleForm.start_time.second" placeholder="ss" @input="verifyTime('second', 'start_time', 'end_year')" oninput="this.value=this.value.replace(/[^\d]/g,'');" maxlength="2"></el-input>
                    </div>
                </div>
            </div>
            <div class="lineBox"> 至 </div>
            <div class="end_time_box">
                <div class="start_time_box">
                    <div class="leftBox">
                        <div class="yearBox">
                            <el-input ref="end_year" v-model="ruleForm.end_time.year" placeholder="YYYY" @input="verifyTime('year', 'end_time', 'end_month')" oninput="this.value=this.value.replace(/[^\d]/g,'');" maxlength="4"></el-input>
                        </div>
                        <div class="lineBox">-</div>
                        <div class="monthBox">
                            <el-input ref="end_month" v-model="ruleForm.end_time.month" placeholder="MM" @input="verifyTime('month', 'end_time', 'end_day')" oninput="this.value=this.value.replace(/[^\d]/g,'');" maxlength="2"></el-input>
                        </div>
                        <div class="lineBox">-</div>
                        <div class="dayBox">
                            <el-input ref="end_day" v-model="ruleForm.end_time.day" placeholder="DD" @input="verifyTime('day', 'end_time', 'end_hour')" oninput="this.value=this.value.replace(/[^\d]/g,'');" maxlength="2"></el-input>
                        </div>
                    </div>
                    <div class="rightBox">
                        <div class="hoursBox">
                            <el-input ref="end_hour" v-model="ruleForm.end_time.hour" placeholder="HH" @input="verifyTime('hour', 'end_time', 'end_minute')" oninput="this.value=this.value.replace(/[^\d]/g,'');" maxlength="2"></el-input>
                        </div>
                        <div class="lineBox">:</div>
                        <div class="minutesBox">
                            <el-input ref="end_minute" v-model="ruleForm.end_time.minute" placeholder="mm" @input="verifyTime('minute', 'end_time', 'end_second')" oninput="this.value=this.value.replace(/[^\d]/g,'');" maxlength="2"></el-input>
                        </div>
                        <div class="lineBox">:</div>
                        <div class="secondsBox">
                            <el-input ref="end_second" v-model="ruleForm.end_time.second" placeholder="ss" @input="verifyTime('second', 'end_time', '')" oninput="this.value=this.value.replace(/[^\d]/g,'');" maxlength="2"></el-input>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// 引入公共方法
import { timeFormat } from '@/utils/common'
export default {
    data() {
        return {
            ruleForm: {
                start_time: {
                    year: '',
                    month: '',
                    day: '',
                    hour: '',
                    minute: '',
                    second: ''
                },
                end_time: {
                    year: '',
                    month: '',
                    day: '',
                    hour: '',
                    minute: '',
                    second: ''
                }
            },
            days: null
        };
    },
    watch: {
        ruleForm: {
            handler(n) {
                if(n) {
                    console.log(n, 'n----------2020')
                    let s = n.start_time
                    let a = n.end_time
                    let start = ''
                    let end = ''
                    if(!s.year && !s.month && !s.day) {
                        start = ''
                    } else {
                        start = `${s.year || '0000'}-${s.month || '01'}-${s.day || '01'} ${s.hour || '00'}:${s.minute || '00'}:${s.second || '00'}`
                    }
                    if(!a.year && !a.month && !a.day) {
                        end = ''
                    } else {
                        end = `${s.year || '0000'}-${s.month || '01'}-${s.day || '01'} ${s.hour || '23'}:${s.minute || '59'}:${s.second || '59'}`
                    }
                    this.$emit('input', [start, end]);
                    console.log([start, end], 'time---------2020')
                }
            },
            deep: true
        }
    },
    methods: {
        // 校验时间
        verifyTime(name, form, comp) {
            switch (name) {
                case 'year':
                    this.next(name, form, comp, 4)
                    break;
                case 'month':
                    this.next(name, form, comp, 2, 12)
                    break;
                case 'day':
                    this.next(name, form, comp, 2, this.days)
                    break;
                case 'hour':
                    this.next(name, form, comp, 2, 23)
                    break;
                case 'minute':
                    this.next(name, form, comp, 2, 59)
                    break;
                case 'second':
                    this.next(name, form, comp, 2, 59)
                    break;
                default:
                    break;
            }
        },
        // 跳转到下一步
        next(name, form, comp, num, num2) {
            let a = Number(this.ruleForm[form][name])
            if(num2) {
                if(a > num2) {
                    this.ruleForm[form][name] = num2 + ''
                }
            }
            if(comp && this.ruleForm[form][name].length >= num) {
                this.$refs[comp].focus()
            }
        }
    },
    mounted() {
        this.$refs.start_year.focus()

        let year = timeFormat(new Date(), 'YYYY')
        let month = timeFormat(new Date(), 'MM')
        let date = new Date(year, month, 0)
        this.days = date.getDate()
    }
}
</script>

<style lang="scss">
.dateControl-box {
    display: inline-block;
    margin-bottom: 20px;
    .dateBox {
        background: #F5F7FA;
        padding: 5px 10px;
        box-sizing: border-box;
        display: flex;
        .start_time_box, .end_time_box {
            display: flex;
            .leftBox, .rightBox {
                display: flex;
                .el-input {
                    input {
                        padding: 0px;
                        text-align: center;
                        height: 30px;
                        line-height: 30px;
                    }
                }
                .yearBox {
                    width: 50px;
                }
                .monthBox {
                    width: 40px;
                }
                .dayBox {
                    width: 40px;
                }
                .hoursBox {
                    width: 40px;
                }
                .minutesBox {
                    width: 40px;
                }
                .secondsBox {
                    width: 40px;
                }
            }
            .leftBox {
                margin-right: 20px;
            }
            .lineBox {
                line-height: 30px;
                margin: 0px 5px;
            }
        }
        .lineBox {
            line-height: 30px;
            margin: 0px 10px;
        }
    }
    
}
</style>