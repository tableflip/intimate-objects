var _ = require('underscore'),
  keystone = require('keystone'),
  middleware = require('./middleware'),
  importRoutes = keystone.importer(__dirname),
  Sculpture = keystone.list('Sculpture')

// Common Middleware
keystone.pre('routes', middleware.initLocals)
keystone.pre('render', middleware.flashMessages)
keystone.pre('render', middleware.incrementPageViews)

// Import Route Controllers
var routes = {
  views: importRoutes('./views')
}

// Setup Route Bindings
exports = module.exports = function (app) {
  
  // Views
  app.get('/', routes.views.index)
  app.get('/register-interest', routes.views.register)
  app.get('/labs/:labId', routes.views.lab)
  app.get('/labs', routes.views.labs)
  app.post('/labs/:labId/register', routes.views['lab-register'])
  app.get('/question/:questionnaireId', routes.views.questionnaire)
  app.get('/question', routes.views['latest-questionnaire'])
  app.get('/practice', routes.views.practice)
  app.get('/field-guide', function (req, res) {
    Sculpture.model.findOne()
    .sort({'createdAt': '-1'})
    .exec(function (err, sculpture) {
      req.params.sculptureId = sculpture._id
      routes.views.sculpture(req, res)
    })
  })
  app.get('/discover/:sculptureId', routes.views.sculpture)
  app.get('/discover', routes.views.discover)
}
