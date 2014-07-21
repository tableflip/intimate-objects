var keystone = require('keystone')
var async = require("async")
var IntimacyLab = keystone.list("IntimacyLab")
var Sculpture = keystone.list("Sculpture")
var Stats = keystone.list("Stats")
var Texts = keystone.list("Texts")
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
      Stats.model.findOne()
        .where({"name": "Moments"})
        .exec(function (err, moments) {
          var count = moments.number
          // Add leading zeroes to make the count a 5-digit number
          while (count.toString().length < 5) {
            count = "0" + count
          }
          cb (err, count)
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
    },
    function (cb) {
      Texts.model.find({name: { $in: ["About", "Lab"] }})
        .exec(function (err, items) {
          if (items[0].name !== 'About') items.reverse()
          cb(err, items)
        })
    }
  ]

  async.parallel(dbTasks, function (err, results) {
    locals.upcomingLabs = results[0]
    locals.momentCount = results[1]
    locals.objectCount = results[2]
    locals.texts = {}
    locals.texts.about = results[3][0]
    locals.texts.labs = results[3][1]

    view.render('index')
  })
  
}
