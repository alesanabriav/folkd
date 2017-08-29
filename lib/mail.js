const config = require('../config');
const api_key = config.mailgun.public_apikey;
const domain = 'www.mydomain.com';
const mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

const data = {
  from: 'Excited User <alejandro@samples.mailgun.org>',
  to: 'serobnic@mail.ru',
  subject: 'Hello',
  text: 'Testing some Mailgun awesomness!'
};

mailgun.messages().send(data, function (error, body) {
  console.log(body);
});
