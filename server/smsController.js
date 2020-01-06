const { client } = require('./twilioController.js');

const sendSMSMessage = (phoneNumber, subject, courseNum, section, restricted_seat, general_seat) => {
  console.log(Number(phoneNumber));
  client.messages
  .create({
    body: `Hi! This is Project Notify. The course (${subject.toUpperCase(), section}) you requested has a spot that just opened up. Hurry and get it!`,
    from: '+12017293373',
    to: `${Number(phoneNumber)}`
  })
  .then(message => {
    removeNotifiedCourses(subject, courseNum, section, restricted_seat, general_seat);
  });
}

module.exports = {
  sendSMSMessage: sendSMSMessage
}