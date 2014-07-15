var keystone = require('keystone')
var async = require("async")
var moment = require("moment")

module.exports = function(req, res) {

  var view = new keystone.View(req, res)
  var locals = res.locals
  locals.moment = moment
  locals.bodyClass = ['field-guide']

  var dbTasks = [
    function (cb) {
    },
    function (cb) {
    }
  ]

//  async.parallel(dbTasks, function (err, results) {
//    locals.upcomingLabs = results[0]
//    locals.objectCount = results[1]
//
//    view.render('field-guide')
//  })

  view.render('discover')

}
