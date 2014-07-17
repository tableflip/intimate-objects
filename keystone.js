// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv')().load();

// Require keystone
var keystone = require('keystone');
var config = require("config")
var autoIncrement = require('mongoose-auto-increment')

var keystoneConfig = {
  
  'name': 'intimate objects',
  'brand': 'intimate objects',
  
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

keystone.init(keystoneConfig);


keystone.import('models');

keystone.set('locals', {
	_: require('underscore'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable
});

keystone.set('routes', require('./routes'));

keystone.set('nav', {
	'users': 'users'
});

keystone.set('default region', 'uk');

keystone.start();

