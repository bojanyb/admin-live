// 引入格式化时间包
import moment from 'moment'
// 引入提示组件
import { Notification } from 'element-ui';

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

export function formatTimeMinutes(time, format) {
  let data = null
  if (time > 60) {
    data = parseInt(time / 60) + '分钟 ' + (time % 60) + '秒钟'
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

// 成功提示
export function success(msg) {
    Notification({
		type: 'success',
		title: '成功',
		message: msg,
		duration: 1500
	})
}

// 错误提示
export function error(msg) {
    Notification({
		type: 'error',
		title: '失败',
		message: msg,
		duration: 1500
	})
}

// 警告提示
export function warning(msg) {
    Notification({
		type: 'warning',
		title: '警告',
		message: msg,
		duration: 1500
	})
}

// json格式化
export function transitionJsonToString(jsonObj, callback) {
    // 转换后的jsonObj受体对象
    var _jsonObj = null;
    // 判断传入的jsonObj对象是不是字符串，如果是字符串需要先转换为对象，再转换为字符串，这样做是为了保证转换后的字符串为双引号
    if (Object.prototype.toString.call(jsonObj) !== '[object String]') {
      try {
        _jsonObj = JSON.stringify(jsonObj);
      } catch (error) {
        // 转换失败错误信息
        console.error('您传递的json数据格式有误，请核对...');
        console.error(error);
        callback(error);
      }
    } else {
      try {
        jsonObj = jsonObj.replace(/(\')/g, '"');
        _jsonObj = JSON.stringify(JSON.parse(jsonObj));
      } catch (error) {
        // 转换失败错误信息
        console.error('您传递的json数据格式有误，请核对...');
        console.error(error);
        callback(error);
      }
    }
    return _jsonObj;
  }


export function  formatJson(jsonObj, callback) {
    // 正则表达式匹配规则变量
    var reg = null;
    // 转换后的字符串变量
    var formatted = '';
    // 换行缩进位数
    var pad = 0;
    // 一个tab对应空格位数
    var PADDING = '&nbsp;&nbsp;&nbsp;&nbsp;';
    // json对象转换为字符串变量
    var jsonString = transitionJsonToString(jsonObj, callback);
    if (!jsonString) {
      return jsonString;
    }
    // 存储需要特殊处理的字符串段
    var _index = [];
    // 存储需要特殊处理的“再数组中的开始位置变量索引
    var _indexStart = null;
    // 存储需要特殊处理的“再数组中的结束位置变量索引
    var _indexEnd = null;
    // 将jsonString字符串内容通过\r\n符分割成数组
    var jsonArray = [];
    // 正则匹配到{,}符号则在两边添加回车换行
    jsonString = jsonString.replace(/([\{\}])/g, '\r\n$1\r\n');
    // 正则匹配到[,]符号则在两边添加回车换行
    jsonString = jsonString.replace(/([\[\]])/g, '\r\n$1\r\n');
    // 正则匹配到,符号则在两边添加回车换行
    jsonString = jsonString.replace(/(\,)/g, '$1\r\n');
    // 正则匹配到要超过一行的换行需要改为一行
    jsonString = jsonString.replace(/(\r\n\r\n)/g, '\r\n');
    // 正则匹配到单独处于一行的,符号时需要去掉换行，将,置于同行
    jsonString = jsonString.replace(/\r\n\,/g, ',');
    // 特殊处理双引号中的内容
    jsonArray = jsonString.split('\r\n');
    jsonArray.forEach(function (node, index) {
      // 获取当前字符串段中"的数量
      var num = node.match(/\"/g) ? node.match(/\"/g).length : 0;
      // 判断num是否为奇数来确定是否需要特殊处理
      if (num % 2 && !_indexStart) {
        _indexStart = index;
      }
      if (num % 2 && _indexStart && _indexStart != index) {
        _indexEnd = index;
      }
      // 将需要特殊处理的字符串段的其实位置和结束位置信息存入，并对应重置开始时和结束变量
      if (_indexStart && _indexEnd) {
        _index.push({
          start: _indexStart,
          end: _indexEnd,
        });
        _indexStart = null;
        _indexEnd = null;
      }
    });
    // 开始处理双引号中的内容，将多余的"去除
    _index.reverse().forEach(function (item, index) {
      var newArray = jsonArray.slice(item.start, item.end + 1);
      jsonArray.splice(
        item.start,
        item.end + 1 - item.start,
        newArray.join('')
      );
    });
    // 奖处理后的数组通过\r\n连接符重组为字符串
    jsonString = jsonArray.join('\r\n');
    // 将匹配到:后为回车换行加大括号替换为冒号加大括号
    jsonString = jsonString.replace(/\:\r\n\{/g, ':{');
    // 将匹配到:后为回车换行加中括号替换为冒号加中括号
    jsonString = jsonString.replace(/\:\r\n\[/g, ':[');
    // 将上述转换后的字符串再次以\r\n分割成数组
    jsonArray = jsonString.split('\r\n');
    // 将转换完成的字符串根据PADDING值来组合成最终的形态
    jsonArray.forEach(function (item, index) {
      // console.log(item);
      var i = 0;
      // 表示缩进的位数，以tab作为计数单位
      var indent = 0;
      // 表示缩进的位数，以空格作为计数单位
      var padding = '';
      if (item.match(/\{$/) || item.match(/\[$/)) {
        // 匹配到以{和[结尾的时候indent加1
        indent += 1;
      } else if (
        item.match(/\}$/) ||
        item.match(/\]$/) ||
        item.match(/\},$/) ||
        item.match(/\],$/)
      ) {
        // 匹配到以}和]结尾的时候indent减1
        if (pad !== 0) {
          pad -= 1;
        }
      } else {
        indent = 0;
      }
      for (i = 0; i < pad; i++) {
        padding += PADDING;
      }
      formatted += padding + item + '<br />';
      pad += indent;
    });
    // 返回的数据需要去除两边的空格
    return formatted.trim();
}

// 转base64
export function base64(s) {
  return window.btoa(unescape(encodeURIComponent(s)))
}

// 封装列表数据导出
export function exportTableData(list, nameList, title) {
  let str = ''
  str += '<tr>'
  for (let index = 0; index < nameList.length; index++) {
    str+=`<td style="text-align:center;height: 40px;">${ nameList[index] }</td>`
  }
  str+='</tr>';

  // 循环遍历，每行加入tr标签，每个单元格加td标签
  for(let i = 0 ; i < list.length ; i++ ){
    str+='<tr>';
    for(const key in list[i]){
      // 增加  为了不让表格显示科学计数法或者其他格式
      if(key === 'trade_no' || key === 'order_id') {
        str+=`<td style="text-align:center;height: 40px;">${ ('单号:' + list[i][key] || '无') + '  '}</td>`;
      } else {
        str+=`<td style="text-align:center;height: 40px;">${ (list[i][key] || '无') + '  '}</td>`;
      }
    }
    str+='</tr>';
  }
  // Worksheet名
  const worksheet = timeFormat(new Date(), 'YYYY-MM-DD', false) + ' - ' + title
  // data:text/csv;charset=utf-8,ufeff
  // data:application/vnd.ms-excel;base64,
  const uri = 'data:application/vnd.ms-excel;base64,';

  // 下载的表格模板数据
  const template = `<html xmlns:o="urn:schemas-microsoft-com:office:office"
  xmlns:x="urn:schemas-microsoft-com:office:excel"
  xmlns="http://www.w3.org/TR/REC-html40">
  <head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>
  <x:Name>${worksheet}</x:Name>
  <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>
  </x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
  </head><body><table>${str}</table></body></html>`;
  // 下载模板
  // window.location.href = uri + this.base64(template);
  const link = document.createElement("a");
  link.href = uri + base64(template);
  // link.download = timeFormat(new Date(), 'YYYY-MM-DD', false) + title + '.xls';
  link.download = title + '.xls';
  link.click();
}

// 数值千分位转换
export function numChangeThousand(num){
  let reg = /\d{1,3}(?=(\d{3})+$)/g;
  return String(num).replace(reg, '$&,');
}

/**
 * 将秒数转换为时分秒格式（HH:MM:SS）
 * @param {number} seconds - 总秒数
 * @returns {string} 格式化后的时间字符串
 */
export function convertSecondsToTime(seconds) {
  const hours = Math.floor(seconds / 3600); // 计算小时数
  const minutes = Math.floor((seconds % 3600) / 60); // 计算分钟数
  const remainingSeconds = seconds % 60; // 计算剩余的秒数

  const formattedHours = String(hours).padStart(2, "0"); // 将小时数转换为两位数，并在不足两位时填充零
  const formattedMinutes = String(minutes).padStart(2, "0"); // 将分钟数转换为两位数，并在不足两位时填充零
  const formattedSeconds = String(remainingSeconds).padStart(2, "0"); // 将剩余的秒数转换为两位数，并在不足两位时填充零

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`; // 返回格式化后的时间字符串
}