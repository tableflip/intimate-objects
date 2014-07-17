var keystone = require('keystone')
var config = require("config")
var Questionnaire = keystone.list("Questionnaire")

module.exports = function (req, res) {
  
  var locals = res.locals
  var view = new keystone.View(req, res)

  Questionnaire.model.findOne()
  .sort({"createdAt": "-1"})
  .exec(function (err, questionnaire) {
    if (err) console.error(err)

    locals.questionnaire = questionnaire
  
    view.render("questionnaire")
  })
}
