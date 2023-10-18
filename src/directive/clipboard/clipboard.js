// Inspired by https://github.com/Inndy/vue-clipboard2
const Clipboard = require('clipboard')
if (!Clipboard) {
  throw new Error('you should npm install `clipboard` --save at first ')
}

export default {
  bind(el, binding) {
      const clipboard = new Clipboard(el, {
        text() { return binding.value?.text },
        action() { return binding.arg === 'cut' ? 'cut' : 'copy' }
      })
      clipboard.on('success', e => {
        binding.value?.onSuccess(e)
      })
      clipboard.on('error', e => {
        binding.value?.onError(e)
      })
  },
}
