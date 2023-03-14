const OSS = require('ali-oss')
import md5 from 'js-md5'

const OSSConfig = {
  // uploadHost: 'https://oss-cn-shenzhen.aliyuncs.com/user_cover', //OSS上传地址
  ossParams: {
    region: 'oss-cn-shenzhen',
    success_action_status: '200', // 默认200
    accessKeyId: 'LTAI5tFTcRH7h3RXKoYmnWMk',
	  // accessKeyId: 'LTAI5tE2XCgmxzoieUVxf71U',
    accessKeySecret: 'qdx4B8jIh2VjBgBDG5fNfG0Oj21GSP',
    bucket: 'live-huidapay-net'
  },
}

function random_string(file) {
  let tmpArr = file.name.split('.')
  let tmpName = md5(Date.now() + tmpArr[0])
  tmpName = tmpName + '.' + tmpArr[tmpArr.length - 1]
  return tmpName
}

function uploadOSS(file) {
  return new Promise(async (resolve, reject) => {
    const fileName = random_string(file)
    let client = new OSS({
      region: OSSConfig.ossParams.region,
      accessKeyId: OSSConfig.ossParams.accessKeyId,
      accessKeySecret: OSSConfig.ossParams.accessKeySecret,
      bucket: OSSConfig.ossParams.bucket,
    })

    const res = await client.multipartUpload(fileName, file)

    // resolve(res)
    // 或者返回如下：
    resolve({
        url: 'https://photo.aiyi.live/' + fileName
    })
  })
}

export { uploadOSS }

