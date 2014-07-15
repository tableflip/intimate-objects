var keystone = require('keystone')
var config = require("config")

module.exports = function (req, res) {

  var locals = res.locals
  var view = new keystone.View(req, res)
  locals.config = config
  locals.bodyClass = ['practice']

  view.render("practice")
}