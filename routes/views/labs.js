var keystone = require('keystone')
var _ = require('underscore')
var config = require("config")
var IntimacyLab = keystone.list("IntimacyLab")

module.exports = function (req, res) {

  var locals = res.locals
  var view = new keystone.View(req, res)
  locals.moment = require("moment")
  locals.config = config
  locals._ = _

  IntimacyLab.model
    .find({"date": {"$gte": new Date()}})
    .sort({"date": "1"})
    .limit(3)
    .exec(function (err, labs) {
      if (err) return console.error(err)
      locals.labs = labs
      view.render("labs")
    })
}