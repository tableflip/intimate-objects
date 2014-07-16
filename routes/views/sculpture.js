var keystone = require('keystone')
var async = require("async")
var moment = require("moment")
var Sculpture = keystone.list("Sculpture")

module.exports = function(req, res) {

  var view = new keystone.View(req, res)
  var locals = res.locals
  locals.moment = moment
  locals.bodyClass = ['sculpture']

  var id = req.params.sculptureId

  var dbTasks = [
    function (cb) {
      Sculpture.model.findOne({ _id: id }).exec(cb)
    }
  ]

  async.parallel(dbTasks, function (err, results) {
    locals.obj = results[0]
    view.render('sculpture')
  })
}
