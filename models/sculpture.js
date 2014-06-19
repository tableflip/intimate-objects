var _ = require('underscore')
var keystone = require('keystone')
var Types = keystone.Field.Types

var Sculpture = new keystone.List('Sculpture')

Sculpture.add({
  name: { type: String, initial: true }
})

Sculpture.defaultColumns = 'name'
Sculpture.register()