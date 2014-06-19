var keystone = require('keystone'),
  async = require('async'),
  Sculpture = keystone.list('Sculpture');

var sculptures = [
  { name: 'Object 1' },
  { name: 'Object 2' },
  { name: 'Object 3' },
  { name: 'Object 4' },
  { name: 'Object 5' },
  { name: 'Object 6' },
  { name: 'Object 7' },
  { name: 'Object 8' },
  { name: 'Object 9' },
  { name: 'Object 10' },
  { name: 'Object 11' },
  { name: 'Object 12' },
  { name: 'Object 13' },
  { name: 'Object 14' },
  { name: 'Object 15' },
  { name: 'Object 16' },
  { name: 'Object 17' },
  { name: 'Object 18' },
  { name: 'Object 19' },
  { name: 'Object 20' },
  { name: 'Object 21' },
  { name: 'Object 22' },
  { name: 'Object 23' },
  { name: 'Object 24' },
  { name: 'Object 25' },
  { name: 'Object 26' },
  { name: 'Object 27' },
  { name: 'Object 28' }
];

function createSculpture (sculpture, done) {
  var newSculpture = new Sculpture.model(sculpture)
  
  newSculpture.save(function (err) {
    if (err) {
      console.error("Error adding sculpture " + sculpture.name + " to the database:");
      console.error(err);
    } else {
      console.log("Added sculpture " + sculpture.name + " to the database.");
    }
    done();
  });
  
}

exports = module.exports = function (done) {
  async.forEach(sculptures, createSculpture, done);
};