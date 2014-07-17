var _ = require('underscore')
var shortId = require('shortid')
var autoIncrement = require('mongoose-auto-increment')
var keystone = require('keystone')
var Types = keystone.Field.Types

//autoIncrement.initialize(keystone.mongoose.connection)

var Sculpture = new keystone.List('Sculpture', {
  defaultSort: '+createdAt'
})

Sculpture.add({
  _id: {
    type: String,
    unique: true,
    'default': shortId.generate
  },
  humanId: { type: String },
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

//Sculpture.schema.plugin(autoIncrement.plugin, {
//  model: 'Sculpture',
//  field: 'humanId',
//  startAt: 1,
//  incrementBy: 1
//})
