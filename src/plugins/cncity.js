const vinyl = require('vinyl')
const IPDB = require('ipdb')
const ipdb_range = require('@ipdb/range')
const ipdb_cac = require('./cac')
const ProgressBar = require('progress')

const plugin = (through2, file, cb) => {
  console.log('Parse ipdb')

  const ipdb = new IPDB(file.contents, {
    patches: [ipdb_range, ipdb_cac]
  })

  let bar = new ProgressBar(':bar :current/:total', { total: ipdb.meta.node_count })

  // 只要这三家
  const ALLOWED_ISP = [
    'chinatelecom.com.cn', // 中国电信
    'chinamobile.com',     // 中国移动
    'chinaunicom.com'      // 中国联通
  ]
  // 只要浙江省
  const TARGET_REGION = '330000'

  let result = []
  let ip = '0.0.0.0'
  while (true) {
    const info = ipdb.find(ip).data
    const region = info.region_code
    const isp = info.isp_domain || ''
    // 只保留浙江省三大运营商
    if (region === TARGET_REGION && ALLOWED_ISP.includes(isp)) {
      if (!result[region]) {
        result[region] = []
      }
      result[region].push(`${info.range.from}/${info.bitmask}`)
    }
    bar.tick()
    ip = info.range.next
    if (ip === '0.0.0.0') break
  }

  console.log()

  // 只输出浙江省数据
  if (result[TARGET_REGION]) {
    let temp = new vinyl({
      cwd: '/',
      base: '/',
      path: `/${TARGET_REGION}/${TARGET_REGION}.txt`,
      contents: new Buffer.from(result[TARGET_REGION].join('\n'))
    })
    through2.push(temp)
  }

  cb()
}

module.exports = plugin
