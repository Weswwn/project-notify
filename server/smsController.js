const { client } = require('./twilioController.js');
const { removeNotifiedCourses } = require('./removeNotifiedCourses.js');

const sendSMSMessage = (phoneNumber, subject, courseNum, section, restricted_seat, general_seat) => {
  let capitalSubject = subject.toUpperCase();
  console.log(capitalSubject);
  client.messages
  .create({
    body: `Hi! This is Project Notify. The course (${capitalSubject} ${courseNum} ${section}) you requested has a spot that just opened up. Hurry and get it!`,
    from: '+12017293373',
    to: `${Number(phoneNumber)}`
  })
  .then(message => {
    console.log(message.sid);
    removeNotifiedCourses(subject, courseNum, section, restricted_seat, general_seat);
  });
}

module.exports = {
  sendSMSMessage: sendSMSMessage
}