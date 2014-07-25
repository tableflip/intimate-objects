var keystone = require('keystone'),
  async = require('async'),
  Card = keystone.list('Card')

var items = [
  {
    text: "What kind of sensations do you like?",
    bg: {
      front: "diagonal-top-left-bottom-right",
      back: "diagonal-top-left-bottom-right"
    },
    createdAt: Date.now()
  },
  {
    text: "How might you like to explore your partner(s) body?",
    bg: {
      front: "vertical",
      back: "vertical"
    },
    createdAt: Date.now()
  },
  {
    text: "What parts of your body feel unexplored?",
    bg: {
      front: "diagonal-bottom-left-top-right",
      back: "diagonal-bottom-left-top-right"
    },
    createdAt: Date.now()
  },
  {
    text: "How do you like to be touched?",
    bg: {
      front: "horizontal",
      back: "horizontal"
    },
    createdAt: Date.now()
  },
  {
    text: "Are there any emotions or experiences you want to feel/have that you think an intimate object could facilitate?",
    bg: {
      front: "diagonal-top-left-bottom-right",
      back: "diagonal-top-left-bottom-right"
    },
    createdAt: Date.now()
  },
  {
    text: "Could an object help you to explore in a new or different way?",
    bg: {
      front: "vertical",
      back: "vertical"
    },
    createdAt: Date.now()
  },
  {
    text: "Have any objects ever featured in your desires or fantasies?",
    bg: {
      front: "diagonal-bottom-left-top-right",
      back: "diagonal-bottom-left-top-right"
    },
    createdAt: Date.now()
  },
  {
    text: "Have you ever used an intimate object before?",
    bg: {
      front: "horizontal",
      back: "horizontal"
    },
    createdAt: Date.now()
  },
  {
    text: "What questions do you have about your body?",
    bg: {
      front: "diagonal-top-left-bottom-right",
      back: "diagonal-top-left-bottom-right"
    },
    createdAt: Date.now()
  },
  {
    text: "What kind of sensations do you like?",
    bg: {
      front: "vertical",
      back: "vertical"
    },
    createdAt: Date.now()
  },
  {
    text: "Is there a texture(s), a smell(s), a sound(s), or an object(s) that you associate with sexual intimacy?",
    bg: {
      front: "diagonal-bottom-left-top-right",
      back: "diagonal-bottom-left-top-right"
    },
    createdAt: Date.now()
  },
  {
    text: "How do you communicate with your partner(s) about your desires? What feels difficult or easy about that?",
    bg: {
      front: "horizontal",
      back: "horizontal"
    },
    createdAt: Date.now()
  },
  {
    text: "Is there something that symbolises sexual intimacy for you?",
    bg: {
      front: "diagonal-top-left-bottom-right",
      back: "diagonal-top-left-bottom-right"
    },
    createdAt: Date.now()
  },
  {
    text: "Why is it important? What meaning does it have?",
    bg: {
      front: "circle",
      back: "circle"
    },
    createdAt: Date.now()
  },
  {
    text: "How would you describe it?",
    bg: {
      front: "circle",
      back: "circle"
    },
    createdAt: Date.now()
  },
  {
    text: "Who will use it?",
    bg: {
      front: "circle",
      back: "circle"
    },
    createdAt: Date.now()
  },
  {
    text: "What shape is it? Is it just one shape? Or one object?",
    bg: {
      front: "circle",
      back: "circle"
    },
    createdAt: Date.now()
  },
  {
    text: "What colour is it?",
    bg: {
      front: "circle",
      back: "circle"
    },
    createdAt: Date.now()
  },
  {
    text: "What size is it?",
    bg: {
      front: "circle",
      back: "circle"
    },
    createdAt: Date.now()
  },
  {
    text: "What will it DO?",
    bg: {
      front: "circle",
      back: "circle"
    },
    createdAt: Date.now()
  },
  {
    text: "How will it be used?",
    bg: {
      front: "circle",
      back: "circle"
    },
    createdAt: Date.now()
  },
  {
    text: "How will it make you feel?",
    bg: {
      front: "circle",
      back: "circle"
    },
    createdAt: Date.now()
  },
  {
    text: "Does it have a texture?",
    bg: {
      front: "circle",
      back: "circle"
    },
    createdAt: Date.now()
  },
  {
    text: "Does it have a sound?",
    bg: {
      front: "circle",
      back: "circle"
    },
    createdAt: Date.now()
  },
  {
    text: "Do you use it alone?",
    bg: {
      front: "circle",
      back: "circle"
    },
    createdAt: Date.now()
  }
]

function create (item, done) {
  var model = new Card.model(item)

  model.save(function (err) {
    if (err) {
      console.error("Error adding card " + item.text + " to the database:", err)
    } else {
      console.log("Added card " + item.text + " to the database.")
    }
    done()
  })
}

exports = module.exports = function (done) {
  async.forEach(items, create, done)
}