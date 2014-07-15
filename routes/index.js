var _ = require('underscore'),
  keystone = require('keystone'),
  middleware = require('./middleware'),
  importRoutes = keystone.importer(__dirname)

// Common Middleware
keystone.pre('routes', middleware.initLocals)
keystone.pre('render', middleware.flashMessages)

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
  app.get('/questionnaires/:questionnaireId', routes.views.questionnaire)
  app.get('/questionnaires', routes.views.questionnaires)
  app.get('/practice', routes.views.practice)
  app.get('/field-guide', routes.views['field-guide'])
}
