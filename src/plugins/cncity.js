const vinyl = require('vinyl')
const IPDB = require('ipdb')
const ipdb_range = require('@ipdb/range')
const ipdb_cac = require('./cac')
const ProgressBar = require('progress')

const ISP_KEYWORDS = [
  { domain: 'chinatelecom.com.cn', keyword: '电信', id: 'chinatelecom' },
  { domain: 'chinaunicom.com',    keyword: '联通', id: 'chinaunicom' },
  { domain: 'chinamobile.com',    keyword: '移动', id: 'chinamobile' }
]

function isThreeMainISPs(info) {
  // 明确的isp_domain
  if (info.isp_domain) {
    return ISP_KEYWORDS.some(i => info.isp_domain.includes(i.domain))
  }
  // 其他字段模糊判断
  const fields = [info.isp, info.owner, info.org, info.name].filter(Boolean).join('|')
  return ISP_KEYWORDS.some(i => fields.includes(i.keyword))
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

    // 只保留三大运营商
    if (china_admin_code?.length === 6 && isThreeMainISPs(info)) {
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
