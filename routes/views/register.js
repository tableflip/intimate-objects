var keystone = require('keystone')

module.exports = function (req, res) {
  
  var locals = res.locals
  var view = new keystone.View(req, res)

  view.render("register")
}