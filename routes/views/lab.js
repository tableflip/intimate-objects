var keystone = require('keystone')
var _ = require('underscore')
var async = require("async")
var config = require("config")
var IntimacyLab = keystone.list("IntimacyLab")

exports = module.exports = function(req, res) {
  
  var locals = res.locals
  var view = new keystone.View(req, res)
  locals.moment = require("moment")
  locals.config = config

  var labId = req.params.labId

  IntimacyLab.model.findOne({ _id: labId }).exec(function (err, lab) {
    if (err) console.error(err)

    locals.lab = lab
    locals.locationString = getGoogleMapsQuery(lab.location)

    view.render("lab")
  })
}

function getGoogleMapsQuery (location) {
  if (location.geo) return location.geo[0] +","+ location.geo[1]
  return location.serialised
}