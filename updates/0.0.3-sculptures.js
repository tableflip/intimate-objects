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
  { name: 'Object 10' }
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