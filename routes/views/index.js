var keystone = require('keystone')
var async = require("async")
var IntimacyLab = keystone.list("IntimacyLab")
var Sculpture = keystone.list("Sculpture")
var moment = require("moment")

module.exports = function(req, res) {

  var view = new keystone.View(req, res)
  var locals = res.locals
  locals.moment = moment
  locals.bodyClass = ['home']

  var dbTasks = [
    function (cb) {
      IntimacyLab.model.find({"date": {"$gte": new Date()}})
      .sort({"date": "1"})
      .limit(3)
      .exec(function (err, labs) {
        cb(err, labs)
      })  
    },
    function (cb) {
      Sculpture.model.count()
      .exec(function (err, count) {
        // Add leading zeroes to make the count a 5-digit number
        while (count.toString().length < 5) {
          count = "0" + count
        }
        cb(err, count)
      })  
    }
  ]

  async.parallel(dbTasks, function (err, results) {
    locals.upcomingLabs = results[0]
    locals.objectCount = results[1]

    view.render('index')
  })
  
}
