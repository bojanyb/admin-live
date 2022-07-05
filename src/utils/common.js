// 引入格式化时间包
import moment from 'moment'

// 格式化日期
export function timeFormat(val, format = 'YYYY-MM-DD HH:mm:ss', boolean) {
    if(boolean) {
        return moment.unix(val).format(format)
    } else {
        return moment(val).format(format)
    }
}

// 格式化时间
export function formatTime(time, format) {
    let data = null
    if(time > 60) {
        data = parseInt(time / 60) + '小时 ' + (time % 60) + '分钟'
    } else {
        data = time + '分钟'
    }
    return data
}

// 格式化时间 - 二次
export function formatTimeTwo(time, format) {
    let data = null
    if(time > 60) {
        if(time > 3600) {
            let hours = Math.floor(time / 3600)
            let fen = time - (hours * 3600)
            data = hours + '小时 ' + parseInt(fen / 60) + '分钟 ' + (time % 60) + '秒钟'
        } else {
            data = parseInt(time / 60) + '分钟 ' + (time % 60) + '秒钟'
        }
    } else {
        data = time + '秒钟'
    }
    return data
}

// 礼物 - 错误提示
export function errStatus(list) {
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

        if(Number(num.toFixed(5)) != 100) {
            allProbability = true
        }
    }

    return { isMax, everyGift, allProbability }
}

// 手机号脱敏
export function desensitization(value) {
    if (!value) return '';
    let str = value;
            str = str.replace(new RegExp("[^0-9]+","g"),"")
        if(str.length==11){
            str = str.toString().replace(/(\d{3})\d*(\d{4})/ , '$1*******$2')
        }else {
        str = str.toString().replace(/(\d{3})\d*(\d{4})/ , '$1*********$2')
    }
    return str;
}

// 判断图片是否为同比例
export function isProportion(w, h, width, height) {
    if ((Math.floor(w / h * 100) / 100) === (Math.floor(width / height * 100) / 100) && width >= w && height >= h) {
      return true
    }
    return false
}

