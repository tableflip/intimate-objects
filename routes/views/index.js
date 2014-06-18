var keystone = require('keystone')
var async = require("async")
var IntimacyLab = keystone.list("IntimacyLab")
var Sculpture = keystone.list("Sculpture")

exports = module.exports = function(req, res) {
	
	var locals = res.locals
	var view = new keystone.View(req, res)
	
  var dbTasks = [
    function (cb) {
      IntimacyLab.model.find()
      .sort({"date": "-1"})
      .limit(3)
      .exec(function (err, labs) {
        cb(err, labs)
      })  
    },
    function (cb) {
      Sculpture.model.count()
      .exec(function (err, count) {
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
