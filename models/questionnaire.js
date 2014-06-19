var _ = require('underscore')
var keystone = require('keystone')
var Types = keystone.Field.Types

var Questionnaire = new keystone.List('Questionnaire')

Questionnaire.add({
  name: { type: String, required: true, initial: true },
  embedCode: { type: Types.Html, initial: true }
})

Questionnaire.defaultColumns = 'name'
Questionnaire.register()