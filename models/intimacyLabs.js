var _ = require('underscore')
var keystone = require('keystone')
var Types = keystone.Field.Types

/**
 * Users
 * =====
 */

var IntimacyLab = new keystone.List('IntimacyLab')

IntimacyLab.add({
  name: { type: String, initial: true },
  date: { type: Types.Date, initial: true, required: true, index: true },
  location: { type: Types.Location, initial: true } 
})

/**
 * Registration
 */

IntimacyLab.defaultColumns = 'name, date'
IntimacyLab.register()