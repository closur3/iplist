const { series, src, dest } = require('gulp')
const through2 = require('through2')
const plugin_cncity = require('./plugins/cncity')
const plugin_isp = require('./plugins/isp')
const plugin_cidrmerge = require('./plugins/cidrmerge')

const database = '/tmp/openipdb.ipdb'

const cncity = () => {
  return src(database)
    .pipe(through2.obj(function(file, _, cb) {
      return plugin_cncity(this, file, cb)
    }))
    .pipe(through2.obj(plugin_cidrmerge))
    .pipe(dest('data/cncity'))
}

const isp = () => {
  return src(database)
    .pipe(through2.obj(function(file, _, cb) {
      return plugin_isp(this, file, cb)
    }))
    .pipe(through2.obj(plugin_cidrmerge))
    .pipe(dest('data/isp'))
}

exports.cncity = cncity
exports.isp = isp
exports.build = series(cncity, isp)
