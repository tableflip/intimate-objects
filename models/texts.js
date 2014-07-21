var _ = require('underscore')
var keystone = require('keystone')
var Types = keystone.Field.Types

var Texts = new keystone.List('Texts')

Texts.add({
  createdAt: { type: Date, default: Date.now },
  name: { type: String, initial: true },
  content: { type: Types.Markdown, initial: true }
})

Texts.defaultColumns = 'name'
Texts.register()
