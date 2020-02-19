const { client } = require('./twilioController.js');
const { removeNotifiedCourses } = require('./removeNotifiedCourses.js');

const sendSMSMessage = (phoneNumber, subject, courseNum, section, restricted_seat, general_seat) => {
  let capitalSubject = subject.toUpperCase();
  client.messages
  .create({
    body: 
    `Hi! This is Project Notify. A spot for ${capitalSubject} ${courseNum} ${section} opened up! Click the link to register: https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-section&dept=${capitalSubject}&course=${courseNum}&section=${section}`,
    from: '+12017293373',
    to: `${Number(phoneNumber)}`
  })
  .then(message => {
    console.log(message.date_sent);
    removeNotifiedCourses(phoneNumber, subject, courseNum, section, restricted_seat, general_seat);
  });
}

module.exports = {
  sendSMSMessage: sendSMSMessage
}