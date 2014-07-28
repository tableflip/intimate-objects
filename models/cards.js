var keystone = require('keystone')
var Types = keystone.Field.Types

var Card = new keystone.List('Card', {
  sortable: true
})

var bgs = [
  {label: "Circle", value: "circle"},
  {label: "Diagonal (bottom left to top right)", value: "diagonal-bottom-left-top-right"},
  {label: "Diagonal (top left to bottom right)", value: "diagonal-top-left-bottom-right"},
  {label: "Horizontal", value: "horizontal"},
  {label: "Vertical", value: "vertical"}
]

Card.add({
  createdAt: { type: Date, default: Date.now },
  text: { type: Types.Text, initial: true },
  bg: {
    front: {type: Types.Select, options: bgs, label: "Front Background", initial: true},
    back: {type: Types.Select, options: bgs, label: "Back Background", initial: true}
  }
})

Card.defaultColumns = 'text,createdAt'
Card.register()
