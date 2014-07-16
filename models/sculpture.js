var _ = require('underscore')
var shortId = require('shortid');
var keystone = require('keystone')
var Types = keystone.Field.Types


var Sculpture = new keystone.List('Sculpture', {
  defaultSort: '+createdAt'
})

Sculpture.add({
  _id: {
    type: String,
    unique: true,
    'default': shortId.generate
  },
  createdAt: { type: Date, default: Date.now },
  addedBy: { type: Types.Relationship, ref: 'User' },
  creator: { type: String },
  name: { type: String, initial: true },
  img: { type: Types.Url },
  description: { type: Types.Textarea },
  inspiration: { type: Types.Textarea }
})

Sculpture.defaultColumns = 'name'
Sculpture.register()