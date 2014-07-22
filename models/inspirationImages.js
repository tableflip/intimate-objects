var path = require('path')
var mkdirp = require('mkdirp')
var keystone = require('keystone')
var Types = keystone.Field.Types

var InspirationImage = new keystone.List('InspirationImage', {
  sortable: true
})

var imagePath = path.resolve(path.join(__dirname, '..', 'public', 'images', 'inspiration'))

mkdirp(imagePath, function (er) {
  if (er) console.error("Failed to create image dir", imagePath)
})

InspirationImage.add({
  createdAt: { type: Date, default: Date.now },
  caption: { type: String, initial: true },
  src: { type: Types.LocalFile, label: 'Image', datePrefix: "YYYYMMDDHHmm", dest: imagePath }
})

InspirationImage.defaultColumns = 'caption,createdAt'
InspirationImage.register()
