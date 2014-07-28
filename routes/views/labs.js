var keystone = require('keystone')
var _ = require('underscore')
var config = require("config")
var IntimacyLab = keystone.list("IntimacyLab")
var Texts = keystone.list("Texts")
var async = require("async")

module.exports = function (req, res) {

  var locals = res.locals
  var view = new keystone.View(req, res)
  locals.moment = require("moment")
  locals.config = config
  locals._ = _

  var dbTasks = [
    function (cb) {
      IntimacyLab.model
        .find({"date": {"$gte": new Date()}})
        .sort({"date": "1"})
        .exec(cb)
    },
    function (cb) {
      Texts.model
        .findOne({name: "Labs list" })
        .exec(cb)
    }
  ]

  async.parallel(dbTasks, function (err, results) {
    locals.labs = results[0]
    locals.texts = {}
    locals.texts.labs = results[1]

    view.render('labs')
  })
}