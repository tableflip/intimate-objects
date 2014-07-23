var path = require('path')
var _ = require('underscore')
var mkdirp = require('mkdirp')
var keystone = require('keystone')
var Types = keystone.Field.Types

//autoIncrement.initialize(keystone.mongoose.connection)

var Sculpture = new keystone.List('Sculpture', {
  defaultSort: '+createdAt'
})

var imagePath = path.resolve(path.join(__dirname, '..', 'public', 'images', 'sculptures'))

mkdirp(imagePath, function (er) {
  if (er) console.error("Failed to create image dir", imagePath)
})

var audioPath = path.resolve(path.join(__dirname, '..', 'public', 'audio', 'sculptures'))

mkdirp(audioPath, function (er) {
  if (er) console.error("Failed to create audio dir", audioPath)
})

var humanId = 0

function nextHumanId () {
  return humanId
}

Sculpture.add({
  name: { type: String, initial: true },
  humanId: { type: Types.Number, noedit: true, 'default': nextHumanId, label: 'ID Number' },
  img: { type: Types.LocalFile, label: 'Image', datePrefix: "YYYYMMDDHHmm", dest: imagePath },
  tags: { type: String },
  parts: { type: String },
  audio: { type: Types.LocalFile, label: 'Audio', datePrefix: "YYYYMMDDHHmm", dest: audioPath },
  tips: { type: Types.Textarea },
  description: { type: Types.Textarea },
  inspiration: { type: Types.Textarea },
  narrative: { type: Types.Textarea },
  addedBy: { type: Types.Relationship, ref: 'User' },
  creator: { type: String },
  createdAt: { type: Date, default: Date.now }
})

Sculpture.defaultColumns = 'humanId, name'
Sculpture.register()

// When a new sculpture is saved, increment the humanId
Sculpture.schema.pre('save', function (next) {
  if (this.isNew) humanId++
  next()
})

Sculpture.model.find().sort({humanId: -1}).limit(1).exec(function (er, sculptures) {
  if (sculptures.length) humanId = sculptures[0].humanId + 1
  console.log("Next sculpture human ID is", humanId)
})