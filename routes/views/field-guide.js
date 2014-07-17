var keystone = require('keystone')
var async = require('async')
var moment = require('moment')
var Sculpture = keystone.list('Sculpture')

module.exports = function(req, res) {

  var view = new keystone.View(req, res)
  var locals = res.locals
  locals.moment = moment
  locals.bodyClass = ['field-guide']

  // var dbTasks = [
  //   function (cb) {
  //   },
  //   function (cb) {
  //   }
  // ]

//  async.parallel(dbTasks, function (err, results) {
//    locals.upcomingLabs = results[0]
//    locals.objectCount = results[1]
//
//    view.render('field-guide')
//  })

  Sculpture.model.findOne()
  .sort({'createdAt': '-1'})
  .exec(function (err, sculpture) {
    if (err) console.error(err)

    if (sculpture == null) {
      view.render('no-objects')
    } else {
      locals.obj = sculpture
      view.render('field-guide')
    }
  
  })

  

}
