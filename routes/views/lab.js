var keystone = require('keystone')
var _ = require('underscore')
var config = require("config")
var IntimacyLab = keystone.list("IntimacyLab")

exports = module.exports = function (req, res) {
  
  var locals = res.locals
  var view = new keystone.View(req, res)
  locals.moment = require("moment")
  locals.config = config
  locals._ = _

  var labId = req.params.labId

  IntimacyLab.model.findOne({ _id: labId }).exec(function (err, lab) {
    if (err) console.error(err)

    locals.lab = lab

    view.render("lab")
  })
}