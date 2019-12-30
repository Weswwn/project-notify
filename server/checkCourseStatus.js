const axios = require('axios');
const cheerio = require('cheerio');

const checkCourseStatus = (courseArray) => {
  // Go through each course and check if the number of seats have gone above 0.
    // If it HAS increased then we need to send out a SMS text message to all students (query) that
    // registered for that course and remove them from the database (delete query)
  courseArray.forEach(course => {
    const subject = course.subject_code;
    const courseNum = course.course_number;
    const section = course.section_number;
    axios.get(`https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-section&dept=${subject}&course=${courseNum}&section=${section}`)
      .then((response) => {
        const html = response.data
        const $ = cheerio.load(html);

        // Check if the course being requested is actually empty
        $('td strong').each(function(i, e) {
          if (i === 0 && $(this).text() !== '0') {
            console.log('empty', $(this).text());
            sendNotification(subject, courseNum, section);
            return;
          }
        })  
    })
    .catch((error) => {
      console.log(error);
    })
  })
}

const sendNotification = (subject, courseNum, section) => {
  axios.get('/api/getCourses' , {
    params: {
      subject_code: subject,
      course_number: courseNum,
      section_number: section
    }
  })
  .then((response) => {

  })
  .catch((error) => {
    
  })
}

module.exports = {
  checkCourseStatus: checkCourseStatus
};
