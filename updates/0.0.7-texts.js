var keystone = require('keystone'),
  async = require('async'),
  Texts = keystone.list('Texts');

var items = [
  {
    name: "About",
    content: {
      md:"We know that the idea of ‘intimate objects’ will mean something very different to everyone that arrives here. It might bring to mind sex, sexual intimacy, or intimacy that exists beyond or outside either of those things. We’ve created this space for each person to interpret and explore what that means for them and where they’d like to, sharing that with others.\n\nThe questions that brought us here were these - Where are the conversations about sex that value it as a space for life-long learning, or that allow us to acknowledge the fluidity of our sexual identities throughout our lives, and potential of this? Where are the conversations that link our sexual expression to wellbeing - the emotional and physiological wellbeing that has a different quality and necessity to it than ‘sexual health’? And where is the space that lets us really imagine and craft our own sexual exprience's away from the glare of what we are told we should be like or should prefer?\n\nIt was all very focussed on sex and sexual intimacy.\n\nThen as the idea developed and as we also developed the Intimacy Labs, we realised that what people were designing wasn’t always so easily categorised as being about sex. People were also designing objects and having ideas about how to just connect with one another. These objects were about building and deepening intimacy.\n\nWe really care about sex, and about breaking through all the taboo because we stand for a world that is open and accepting . But we don’t want to ignore those moments of intimacy, that can exist across our lives, and not just in relation to sex.\n\nExplore, play, tinker, question, listen, be aware and come with curiosity. You can also take part in our research."
    }
  },
  {
    name: "Lab intro",
    content:{
      md:"The Intimacy Lab is a space for you to come and explore, question and make. There are materials for you to design with, write with, draw with, talk with, record with and make with. There are private spaces and social spaces. You can book a time to go in to the design area (with alone, with friends or with a partner(s), or you can just hang out and find out more about what we are doing, and even sign up for a home kit."
    }
  },
  {
    name: "Labs list",
    content:{
      md:"The Intimacy Lab is a space for you to come and explore, question and make. There are materials for you to design with, write with, draw with, talk with, record with and make with. There are private spaces and social spaces. You can book a time to go in to the design area (with alone, with friends or with a partner(s), or you can just hang out and find out more about what we are doing, and even sign up for a home kit."
    }
  },
  {
    name: "Question",
    content: {
      md:"Intimate Objects is currently a prototype and is being part-funded as a research project by the [REACT Hub](http://www.react-hub.org.uk/intimate-objects) in Bristol. \n\nWe really value that the work is being informed and shaped by anthropological research because anthropology does not impose models but develops understanding from the ground up - real people, and their ideas, practices and desires. \n\nThe research is being lead by Mwenza Blell and Sarah Winkler Reid."
    }
  }
];

function create (item, done) {
  var model = new Texts.model(item)

  model.save(function (err) {
    if (err) {
      console.error("Error adding stat " + item.name + " to the database:");
      console.error(err);
    } else {
      console.log("Added text " + item.name + " to the database.");
    }
    done();
  });
}

exports = module.exports = function (done) {
  async.forEach(items, create, done);
};