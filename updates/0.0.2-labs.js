var keystone = require('keystone'),
  async = require('async'),
  IntimacyLab = keystone.list('IntimacyLab');

var labs = [
  {
    name: 'Lab 1',
    date: new Date()+(1000*60*60*24*3),
    location: {
      name: "The Mermaid Conference & Events Centre",
      street1: "Puddle Dock",
      street2: "Blackfriars",
      suburb: "London",
      postCode: "EC4V 3DB",
      description: "<p>It's the first of many Labs we hope and future Labs may emphasise other experiences and aspects of intimacy.</p>"
    }
  },
  {
    name: 'Lab 2',
    date: new Date()+(1000*60*60*24*5),
    location: {
      name: "HMS President",
      street1: "Victoria Embankment",
      suburb: "London",
      postCode: "EC4Y 0HJ",
      description: "<p>It's an elusive and beguiling state, existing between people rather than within people and hard to pin down, so we think we may be trying to discover it for a while. </p>"
    }
  }
];

function createLab(lab, done) {
  var newLab = new IntimacyLab.model(lab)
  
  newLab.save(function(err) {
    if (err) {
      console.error("Error adding lab " + lab.name + " to the database:");
      console.error(err);
    } else {
      console.log("Added lab " + lab.name + " to the database.");
    }
    done();
  });
  
}

exports = module.exports = function(done) {
  async.forEach(labs, createLab, done);
};