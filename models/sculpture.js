var _ = require('underscore')
var hat = require('hat')
var keystone = require('keystone')
var Types = keystone.Field.Types


var Sculpture = new keystone.List('Sculpture', {
  defaultSort: '-createdAt'
})

Sculpture.add({
  createdAt: { type: Date, default: Date.now },
  addedBy: { type: Types.Relationship, ref: 'User' },
  creator: { type: String },
  name: { type: String, initial: true },
  description: { type: Types.Textarea },
  inspiration: { type: Types.Textarea },
  puid: { type: String, default: hat(32, 36)}
})

Sculpture.defaultColumns = 'name'
Sculpture.register()