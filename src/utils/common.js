// 引入格式化时间包
import moment from 'moment'

// 格式化时间
export function timeFormat(val, format = 'YYYY-MM-DD HH:mm:ss', boolean) {
    if(boolean) {
        return moment.unix(val).format(format)
    } else {
        return moment(val).format(format)
    }
}

// 礼物 - 错误提示
export function errStatus(list) {
    console.log(list, 'list-------------------')
    let s = list

    let maxGift = s.gifts.filter(item => { return item.type === 1 })
    let minGift = s.gifts.filter(item => { return item.type === 0 })

    let isMax = false
    if(maxGift && maxGift.length > 0) {
        let maxData = maxGift[0]
        maxGift.forEach(item => {
            if(item.probability !== maxData.probability || item.gift_diamond !== maxData.gift_diamond) {
                isMax = true
            }
        })
    }

    let everyGift = false

    let allProbability = false
    let num = 0
    if(!isMax) {
        s.gifts.forEach(item => {
            if(!item.probability || Number(item.probability) <= 0) {
                everyGift = true
            }
        })

        let Array = minGift.concat(maxGift[0])
        Array.forEach(item => {
            num += Number(item.probability)
        })

        console.log(num, 'num----------')
        console.log(num.toFixed(5), 'num----------')
        console.log(Number(num.toFixed(5)), 'num----------')

        if(Number(num.toFixed(5)) != 100) {
            allProbability = true
        }
    }

    return { isMax, everyGift, allProbability }
}

