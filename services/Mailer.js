// capital M in file naming convention because a class will be exported

const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

class Mailer extends helper.Mail {}

module.exports = Mailer;
