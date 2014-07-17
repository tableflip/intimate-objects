var keystone = require('keystone'),
  async = require('async'),
  Sculpture = keystone.list('Sculpture');

exports = module.exports = function (done) {
  Sculpture.model.find().remove(function (err) {
    if (err) console.error(err)
    done()
  })
};
