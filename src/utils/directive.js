// 自定义指令
import Vue from 'vue'
import Clipboard from '@/directive/clipboard/clipboard'

const directives = {}

// 限制输入数字 - 且携带小数
directives.limit = Vue.directive('input-limit', {
	bind(el, binding) {
		var wins_0 = /[^\d]/g // 整数判断
		var wins_1 = /[^\d^\.]/g // 小数判断
		var flag = true
		var points = 0
		var lengths = 0
		var remainder = 0
		var no_int = 0
		const target = el instanceof HTMLInputElement ? el : el.querySelector('input')
		target.addEventListener('compositionstart', e => {
			flag = false
		})
		target.addEventListener('compositionend', e => {
			flag = true
		})
		target.addEventListener('input', e => {
			setTimeout(function() {
				if (flag) {
					if (binding.value == 0) {
						if (wins_0.test(e.target.value)) {
							e.target.value = e.target.value.replace(wins_0, '')
							e.target.dispatchEvent(new Event('input')) // 手动更新v-model值
						}
					}
					if (binding.value == 1) {
						if (wins_0.test(e.target.value.toString().replace(/\d+\.(\d*)/,
								'$1'))) {
							remainder = true
						}
						if ((e.target.value.split('.')).length - 1 > 1) {
							points = true
						}
						if (e.target.value.toString().split('.')[1] != undefined) {
							if (e.target.value.toString().split('.')[1].length > 1) {
								lengths = true
							}
						}
						if (e.target.value.toString().indexOf('.') != -1) {
							no_int = false
						} else {
							no_int = true
						}
						if (wins_1.test(e.target.value) || lengths || points || remainder) {
							if (!no_int) {
								e.target.value = e.target.value.replace(wins_1, '').replace('.',
										'$#$').replace(/\./g, '').replace(
										'$#$', '.').replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3')
									.substring(0, e.target.value.indexOf(
										'.') + 2)
							} else {
								e.target.value = e.target.value.replace(wins_0, '')
							}
							e.target.dispatchEvent(new Event('input'))
						}
					}

					let num = binding.value
					if (binding.value == num) {
						if (wins_0.test(e.target.value.toString().replace(/\d+\.(\d*)/,
								'$1'))) {
							remainder = true
						}
						if ((e.target.value.split('.')).length - 1 > 1) {
							points = true
						}
						if (e.target.value.toString().split('.')[1] != undefined) {
							if (e.target.value.toString().split('.')[1].length > num) {
								lengths = true
							}
						}
						if (e.target.value.toString().indexOf('.') != -1) {
							no_int = false
						} else {
							no_int = true
						}
						let numText = ""
						for (var i = 0; i < num; i++) {
							numText += '\\d'
						}
						if (wins_1.test(e.target.value) || lengths || points || remainder) {
							if (!no_int) {
								e.target.value = e.target.value.replace(wins_1, '').replace('.',
										'$#$').replace(/\./g, '').replace(
										'$#$', '.').replace(/^(\-)*(\d+)\.(numText).*$/,
										'$1$2.$3')
									.substring(0, e.target.value.indexOf(
										'.') + (num + 1))
								return
							} else {
								e.target.value = e.target.value.replace(wins_0, '')
								return
							}
							e.target.dispatchEvent(new Event('input'))
						}
					}
				}
			}, 0)
		})
	}
})

// 只能输入数字
directives.num = Vue.directive('input-num', {
	bind(el, binding) {
		var flag = true

		const target = el instanceof HTMLInputElement ? el : el.querySelector('input')

		target.addEventListener('compositionstart', e => {
			flag = false
		})
		target.addEventListener('compositionend', e => {
			flag = true
		})

		target.addEventListener('input', e => {
			setTimeout(function() {
				if (flag && binding.value) {
					target.value = target.value.replace(/[^\d]/g,'');
				}
			}, 0)
		})
	}
})


directives.downLoad = Vue.directive('downLoad', {
  inserted(el, binding) {
    el.addEventListener('click', () => {
      const a = document.createElement('a');
      const url = binding.value; // 完整的url则直接使用
      // 这里是将url转成blob地址，
      fetch(url).then(res => res.blob()).then(blob => { // 将链接地址字符内容转变成blob地址
        a.href = URL.createObjectURL(blob);
        // 下载文件的名字
        a.download = url.split('/')[url.split('/').length - 1];
        document.body.appendChild(a);
        a.click();
        return a
      }).then(doc => {
        //最后把新建的节点删除
        document.body.removeChild(doc);
      });
    });
  },
});
Vue.directive('clipboard', Clipboard)
