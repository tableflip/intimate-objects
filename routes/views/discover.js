var keystone = require('keystone')
var async = require("async")
var moment = require("moment")
var pad = require('pad')
var Sculpture = keystone.list("Sculpture")

module.exports = function(req, res) {

  var view = new keystone.View(req, res)
  var locals = res.locals
  
  locals.pad = pad
  locals.moment = moment
  locals.bodyClass = ['discover']

  var dbTasks = [
    function (cb) {
      Sculpture.model.find().sort('-createdAt').exec(cb)
    }
  ]

  async.parallel(dbTasks, function (err, results) {
    locals.objects = results[0]
    view.render('discover')
  })
}
