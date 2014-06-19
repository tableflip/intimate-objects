var keystone = require('keystone'),
  async = require('async'),
  Questionnaire = keystone.list('Questionnaire');

var questionnaires = [
  {
    name: 'First questionnaire',
    embedCode: '<!-- Change the width and height values to suit you best --><div class="typeform-widget" data-url="https://liamwooding.typeform.com/to/KBqS6e" data-text="Test questionnaire" style="width:100%;height:500px;"></div><script>(function(){var qs,js,q,s,d=document,gi=d.getElementById,ce=d.createElement,gt=d.getElementsByTagName,id="typef_orm",b="https://s3-eu-west-1.amazonaws.com/share.typeform.com/";if(!gi.call(d,id)){js=ce.call(d,"script");js.id=id;js.src=b+"widget.js";q=gt.call(d,"script")[0];q.parentNode.insertBefore(js,q)}})()</script>'
  },

];

function createQuestionnaire (questionnaire, done) {
  var newQuestionnaire = new Questionnaire.model(questionnaire)
  
  newQuestionnaire.save(function (err) {
    if (err) {
      console.error("Error adding questionnaire " + questionnaire.name + " to the database:");
      console.error(err);
    } else {
      console.log("Added questionnaire " + questionnaire.name + " to the database.");
    }
    done();
  });
  
}

exports = module.exports = function (done) {
  async.forEach(questionnaires, createQuestionnaire, done);
};