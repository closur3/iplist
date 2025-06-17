const vinyl = require('vinyl')
const IPDB = require('ipdb')
const ipdb_range = require('@ipdb/range')
const ipdb_cac = require('./cac')
const ProgressBar = require('progress')

// 只保留三大运营商
const ISP_MAP = {
  'chinatelecom.com.cn': 'chinatelecom', // 中国电信
  'chinaunicom.com': 'chinaunicom',     // 中国联通
  'chinamobile.com': 'chinamobile',     // 中国移动
}

const plugin = (through2, file, cb) => {

  console.log('Parse ipdb')

  const ipdb = new IPDB(file.contents, {
    patches: [ipdb_range, ipdb_cac]
  })

  let bar = new ProgressBar(':bar :current/:total', { total: ipdb.meta.node_count })

  let result = []
  let ip = '0.0.0.0'
  while (true) {
    const info = ipdb.find(ip).data
    const china_admin_code = info.china_admin_code
    const isp = info.isp_domain || ''

    // 只保留三大运营商的IP
    if (china_admin_code?.length === 6 && ISP_MAP[isp]) {
      let cac = china_admin_code
      {
        cac = `${cac.substr(0, 4)}00`
        if (!result[cac]) {
          result[cac] = []
        }
        result[cac].push(`${info.range.from}/${info.bitmask}`)
      }
      {
        cac = `${cac.substr(0, 2)}0000`
        if (!result[cac]) {
          result[cac] = []
        }
        result[cac].push(`${info.range.from}/${info.bitmask}`)
      }
    }
    bar.tick()
    ip = info.range.next
    if (ip === '0.0.0.0') break
  }

  console.log()

  for (let [china_admin_code, cidrs] of Object.entries(result)) {
    let temp = new vinyl({
      cwd: '/',
      base: '/',
      path: `/${china_admin_code}.txt`,
      contents: new Buffer.from(cidrs.join('\n'))
    })
    through2.push(temp)
  }

  cb()
}

module.exports = plugin
