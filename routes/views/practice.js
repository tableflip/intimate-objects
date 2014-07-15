var keystone = require('keystone')
var config = require("config")
var _ = require('underscore')

module.exports = function (req, res) {

  var locals = res.locals
  var view = new keystone.View(req, res)
  locals.config = config
  locals._ = _

  view.render("practice")
}