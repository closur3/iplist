const vinyl = require('vinyl')
const IPDB = require('ipdb')
const ipdb_range = require('@ipdb/range')
const ipdb_cac = require('./cac')
const ProgressBar = require('progress')

// 云服务商 ISP 列表
const CLOUD_ISP_LIST = [
  'aliyun.com',      // 阿里云
  'tencent.com',     // 腾讯云
  'cloudflare.com',  // Cloudflare
  'huawei.com',      // 华为云
  'microsoft.com',   // Microsoft Azure
  'bytedance.com',   // 字节跳动
  'volcengine.com',  // 火山引擎
  'cloud.google.com',// Google Cloud
  'digitalocean.com' // DigitalOcean
]

const plugin = (through2, file, cb) => {
  console.log('Parse ipdb')

  const ipdb = new IPDB(file.contents, {
    patches: [ipdb_range, ipdb_cac]
  })

  let bar = new ProgressBar(':bar :current/:total', { total: ipdb.meta.node_count })

  // 用于存储每个省的 IP 段
  let result = {}
  let ip = '0.0.0.0'
  while (true) {
    const info = ipdb.find(ip).data

    // 跳过云服务商IP
    if (info.isp_domain && CLOUD_ISP_LIST.includes(info.isp_domain)) {
      bar.tick()
      ip = info.range.next
      if (ip === '0.0.0.0') break
      continue
    }

    const china_admin_code = info.china_admin_code
    if (china_admin_code?.length === 6) {
      // 取前两位省级代码
      const province_code = `${china_admin_code.substr(0, 2)}0000`
      if (!result[province_code]) {
        result[province_code] = []
      }
      result[province_code].push(`${info.range.from}/${info.bitmask}`)
    }
    bar.tick()
    ip = info.range.next
    if (ip === '0.0.0.0') break
  }

  console.log()

  for (let [province_code, cidrs] of Object.entries(result)) {
    let temp = new vinyl({
      cwd: '/',
      base: '/',
      path: `/${province_code}.txt`,
      contents: Buffer.from(cidrs.join('\n'))
    })
    through2.push(temp)
  }

  cb()
}

module.exports = plugin
