var keystone = require('keystone')
var IntimacyLab = keystone.list("IntimacyLab")
var config = require('config')

var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

module.exports = function (req, res) {
  var labId = req.params.labId

  IntimacyLab.model.findOne({ _id: labId}).exec(function (err, lab) {
    if (err) return res.json(500, {message: 'Failed to retrieve lab'})
    if (!lab) return res.json(404, {message: 'Unknown lab'})

    var email = req.body.email

    if (!email) {
      return res.json(400, {message: 'Please specify an email address', field: 'email'})
    }

    if (!emailRegex.test(email)) {
      return res.json(400, {message: 'Please specify a valid email address', field: 'email'})
    }

    var adminEmail = new keystone.Email('lab-admin')

    adminEmail.send({
      from: email,
      to: config.labEmail,
      subject: lab.name + " attendance requested",
      lab: lab
    }, function (err) {
      if (err) return console.error('Failed to send lab attendance email to admin', err)
      console.log('Successfully sent attendance email to admin', config.labEmail)
    })

    var attendeeEmail = new keystone.Email('lab-attendee')

    attendeeEmail.send({
      from: config.labEmail,
      to: email,
      subject: "Please confirm attendance at " + lab.name,
      lab: lab
    }, function (err) {
      if (err) return console.error('Failed to send lab attendance email to attendee', err)
      console.log('Successfully sent attendance email to attendee', email)
    })

    res.json({message: 'Successfully registered'})
  })
}