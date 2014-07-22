var keystone = require('keystone')
var config = require('config')
var async = require('async')
var _ = require('underscore')

var Card = keystone.list('Card')
var InspirationImage = keystone.list('InspirationImage')

module.exports = function (req, res) {
  var locals = res.locals
  var view = new keystone.View(req, res)
  locals.config = config
  locals.bodyClass = ['practice']

  async.parallel({
    cards: function (cb) {
      Card.model.find().sort('sortOrder').exec(cb)
    },
    images: function (cb) {
      InspirationImage.model.find().sort('sortOrder').exec(cb)
    }
  }, function (er, results) {
    if (er) return res.status(500).render('errors/500')
    _.extend(locals, results)
    view.render('practice')
  })
}