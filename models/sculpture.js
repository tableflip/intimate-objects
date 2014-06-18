var _ = require('underscore')
var keystone = require('keystone')
var Types = keystone.Field.Types

/**
 * Users
 * =====
 */

var Sculpture = new keystone.List('Sculpture')

Sculpture.add({
  name: { type: String, initial: true }
})

/**
 * Registration
 */

Sculpture.defaultColumns = 'name'
Sculpture.register()