// 读取图片数据 宽高
export function fileReader(fileData) {
  return new Promise(resolve => {
    const reader = new FileReader()
    reader.onload = function(e) {
      const data = e.target.result
      // 加载图片获取图片真实宽度和高度
      const image = new Image()
      image.onload = function() {
        const width = image.width
        const height = image.height
        resolve({
          width,
          height
        })
      }
      image.src = data
    }
    reader.readAsDataURL(fileData)
  })
}

export function fileReaderForUrl(url) {
  return new Promise(resolve => {
    const image = new Image()
    /*  image.onload = function() {
      const width = image.width
      const height = image.height
      debugger
      resolve({
        width,
        height
      })
    }*/
    image.src = url
    if (image.complete) {
      debugger
    }
  })
}
