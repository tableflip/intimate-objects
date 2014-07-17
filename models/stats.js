var _ = require('underscore')
var keystone = require('keystone')
var Types = keystone.Field.Types

var Stats = new keystone.List('Stats')

Stats.add({
  createdAt: { type: Date, default: Date.now },
  name: { type: String, initial: true },
  number: { type: Types.Number, initial: true },
  description: { type: String, initial: true }
})

Stats.defaultColumns = 'name, number'
Stats.register()
