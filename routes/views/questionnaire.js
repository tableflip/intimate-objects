var keystone = require('keystone')
var config = require("config")
var Questionnaire = keystone.list("Questionnaire")

module.exports = function (req, res) {
  
  var locals = res.locals
  var view = new keystone.View(req, res)

  var questionnaireId = req.params.questionnaireId

  Questionnaire.model.findOne({ _id: questionnaireId }).exec(function (err, questionnaire) {
    if (err) console.error(err)

    locals.questionnaire = questionnaire
  
    view.render("questionnaire")
  })
}