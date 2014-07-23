var keystone = require('keystone')
var async = require("async")
var moment = require("moment")
var _ = require('underscore')
var pad = require('pad')
var Sculpture = keystone.list("Sculpture")

module.exports = function(req, res) {
  var humanId = parseInt(req.params.humanId, 10)
  
  if (!humanId) return res.status(404).render('errors/404')

  async.parallel({
    sculpture: function (cb) {
      Sculpture.model.findOne({humanId: humanId}).exec(cb)
    },
    next: function (cb) {
      Sculpture.model.find({humanId: {$gt: humanId}}).sort('humanId').limit(1).exec(function (er, sculptures) {
        if (er) return cb(er)
        cb(null, sculptures[0])
      })
    },
    prev: function (cb) {
      Sculpture.model.find({humanId: {$lt: humanId}}).sort('-humanId').limit(1).exec(function (er, sculptures) {
        if (er) return cb(er)
        cb(null, sculptures[0])
      })
    }
  }, function (err, results) {
    if (err) return res.status(500).render('errors/500')
    if (!results.sculpture) return res.status(404).render('errors/404')

    var view = new keystone.View(req, res)
    var locals = res.locals

    locals.pad = pad 
    locals.moment = moment
    locals.bodyClass = ['sculpture']

    _.extend(locals, results)

    view.render('sculpture')
  })
}
