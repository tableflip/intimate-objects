// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').load()


var keystone = require('keystone')
var config = require('config')

var keystoneConfig = {
  
  'name': 'intimate objects',
  'brand': 'intimate objects',
  
  'host': config.host,
  'port': config.port,
  
  'less': 'public',
  'static': 'public',
  'favicon': 'public/favicon.ico',
  
  'views': 'templates/views',
  'view engine': 'jade',
  
  'auto update': true,
  
  'session': true,
  'auth': true,
  'user model': 'User',
  'cookie secret': 'Nv9GQf,"?Id*!W7)!e4QR,;Olq@`^%t,T^5JW7?8r,pt,#%S,b%uW+lo{p#F&KqT',

  'emails': 'templates/emails'
}

if (config.mongo) {
  keystoneConfig.mongo = config.mongo
}

if (config.mandrillApiKey) {
  keystoneConfig['mandrill api key'] = config.mandrillApiKey
  keystoneConfig['mandrill username'] = config.mandrillUsername
} else {
  console.warn("Missing SMTP server config!")
}

keystone.init(keystoneConfig)

keystone.import('models')

keystone.set('locals', {
  _: require('underscore'),
  env: keystone.get('env'),
  utils: keystone.utils,
  editable: keystone.content.editable
})

keystone.set('logger', 'default')
keystone.set('routes', require('./routes'))

keystone.set('nav', {
  users: 'users',
  Practice: ['Card', 'InspirationImage']
})

keystone.set('default region', 'uk')


if (config.basicAuth && config.basicAuth.enabled) {
  keystone.pre('routes', keystone.express.basicAuth(function(user, pass){
    return config.basicAuth.user == user && config.basicAuth.password == pass
  }))
  console.log('BasicAuth enabled')
}

keystone.start()

// remote debugging via repl-client
var replify = require('replify')
replify('io', keystone)
