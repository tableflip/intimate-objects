var keystone = require('keystone'),
  async = require('async'),
  Stats = keystone.list('Stats');

var stats = [
  {
    name: "Objects",
    number: 8,
    description: "Number of objects created"
  },
  {
    name: "Moments",
    number: 1312,
    description: "Number of intimate moments"
  }
];

function createStat (stat, done) {
  var newStat = new Stats.model(stat)

  newStat.save(function (err) {
    if (err) {
      console.error("Error adding stat " + stat.name + " to the database:");
      console.error(err);
    } else {
      console.log("Added stat " + stat.name + " to the database.");
    }
    done();
  });

}

exports = module.exports = function (done) {
  async.forEach(stats, createStat, done);
};