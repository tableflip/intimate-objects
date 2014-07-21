var keystone = require('keystone')
var config = require("config")
var Questionnaire = keystone.list("Questionnaire")
var Texts = keystone.list("Texts")
var async = require("async")

module.exports = function (req, res) {
  
  var locals = res.locals
  var view = new keystone.View(req, res)

  var questionnaireId = req.params.questionnaireId

  var dbTasks = [
    function (cb) {
      Questionnaire.model
        .findOne({ _id: questionnaireId })
        .exec(cb)
    },
    function (cb) {
      Texts.model
        .findOne({name: "Question" })
        .exec(cb)
    }
  ]

  async.parallel(dbTasks, function (err, results) {
    console.log('questions', results)
    locals.questionnaire = results[0]
    locals.texts = {}
    locals.texts.question = results[1]
    view.render("questionnaire")
  })
}