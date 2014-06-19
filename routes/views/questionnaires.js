var keystone = require('keystone')
var _ = require('underscore')
var config = require("config")
var Questionnaire = keystone.list("Questionnaire")

exports = module.exports = function (req, res) {
  
  var locals = res.locals
  var view = new keystone.View(req, res)
  locals.moment = require("moment")
  locals.config = config

  Questionnaire.model.find().exec(function (err, questionnaires) {
    if (err) console.error(err)

    locals.questionnaires = questionnaires
    view.render("questionnaires")
  })
}