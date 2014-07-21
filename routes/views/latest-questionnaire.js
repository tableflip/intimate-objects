var keystone = require('keystone')
var config = require("config")
var Questionnaire = keystone.list("Questionnaire")
var Texts = keystone.list("Texts")
var async = require("async")

module.exports = function (req, res) {
  
  var locals = res.locals
  var view = new keystone.View(req, res)

  var dbTasks = [
    function (cb) {
      Questionnaire.model
        .findOne()
        .sort({"createdAt": "-1"})
        .exec(cb)
    },
    function (cb) {
      Texts.model
        .findOne({name: "Question" })
        .exec(cb)
    }
  ]

  async.parallel(dbTasks, function (err, results) {
    if (results[0] === null) return view.render("no-questions")

    locals.questionnaire = results[0]
    locals.texts = {}
    locals.texts.question = results[1]
    view.render("questionnaire")
  })
}
