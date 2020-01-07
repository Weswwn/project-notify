const axios = require('axios');
const cheerio = require('cheerio');
const { sendSMSMessage } = require('./smsController.js');

const checkCourseStatus = (courseArray) => {
  // Go through each course and check if the number of seats have gone above 0.
    // If it HAS increased then we need to send out a SMS text message to all students (query) that
    // registered for that course and remove them from the database (delete query)
  courseArray.forEach((course, i) => {
    const subject = course.subject_code;
    const courseNum = course.course_number;
    const section = course.section_number;
    const restrictedSeats = course.restricted_seat;
    const generalSeats = course.general_seat;
    axios.get(`https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-section&dept=${subject}&course=${courseNum}&section=${section}`)
      .then((response) => {
        const html = response.data
        const $ = cheerio.load(html);

        // Check if the course being requested is actually empty
        const list = [];
        $('td strong').each(function(i, e) {
          list[i] = $(this).text();
        })

        // if (list[2] == '0' || list[3] == '0') return console.log(i, subject, courseNum, section, restrictedSeats, generalSeats, 'still full'); 
        if (restrictedSeats && generalSeats) {
          if (list[0] !== '0') {
            queryListOfNumbersForCourse(subject, courseNum, section, restrictedSeats, generalSeats);
          } else {
            console.log(i, subject, courseNum, section, restrictedSeats, generalSeats, 'still full');
          }
        } else if (restrictedSeats) {
          if (list[3] !== '0') {
            queryListOfNumbersForCourse(subject, courseNum, section, restrictedSeats, generalSeats);
          } else {
            console.log(i, subject, courseNum, section, restrictedSeats, generalSeats, 'still full');
          }
        } else if (generalSeats) {
          if (list[2] !== '0') {
            queryListOfNumbersForCourse(subject, courseNum, section, restrictedSeats, generalSeats);
          } else {
            console.log(i, subject, courseNum, section, restrictedSeats, generalSeats, 'still full');
          }
        } else if (restrictedSeats === false && generalSeats === false) {
          if (list[0] !== '0') {
            queryListOfNumbersForCourse(subject, courseNum, section, restrictedSeats, generalSeats);
          } else {
            console.log(i, subject, courseNum, section, restrictedSeats, generalSeats, 'still full');
          }
        }
    })
    .catch((error) => {
      console.log(error);
    })
  })
}

const queryListOfNumbersForCourse = (subject, courseNum, section, restricted_seat, general_seat) => {
  axios.get('http://localhost:3000/api/getCourses' , {
    params: {
      subject_code: subject,
      course_number: courseNum,
      section_number: section,
      restricted_seat: restricted_seat,
      general_seat: general_seat
    }
  })
  .then((response) => {
    // Here we need to send out the SMS text messages and remove
    // Those phone numbers from the database
    response.data.forEach(obj => {
      sendSMSMessage(obj.phone_number, subject, courseNum, section, restricted_seat, general_seat);
    })

  })
  .catch((error) => {
    console.log('From sendNotifications', error);
  })
}

module.exports = {
  checkCourseStatus: checkCourseStatus
};
