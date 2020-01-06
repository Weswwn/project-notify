const { client } = require('./twilioController.js');

const sendSMSMessage = (phoneNumber, course) => {
  client.messages
  .create({
    body: `Hi! This is Project Notify. The course ${course}, you requested has a spot that just opened up. Hurry and get it!`,
    from: '+12017293373',
    to: `${phoneNumber}`
  })
  .then(message => console.log(message.sid));
}

module.exports = {
  sendSMSMessage: sendSMSMessage
}