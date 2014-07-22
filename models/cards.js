var keystone = require('keystone')
var Types = keystone.Field.Types

var Card = new keystone.List('Card', {
  sortable: true
})

Card.add({
  createdAt: { type: Date, default: Date.now },
  text: { type: Types.Text, initial: true }
})

Card.defaultColumns = 'text,createdAt'
Card.register()
