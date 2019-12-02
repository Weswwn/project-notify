const {pool} = require('./index.js');
const cheerio = require('cheerio');
const axios = require('axios');

let checkIfCourseIsValid = (userFormData) => {
  return new Promise((resolve, reject) => {
    let { subject, course, section, generalSeat, restrictedSeat } = userFormData.data
    axios.get(`https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-section&dept=${subject}&course=${course}&section=${section}`, {
      params: {
        generalSeat: generalSeat,
        restrictedSeat: restrictedSeat
      }
    })
      .then((response) => {
        const html = response.data
        const $ = cheerio.load(html);
        let classEmpty = false;
        
        // Check if the course being requested is actually empty
        $('td strong').each(function(i, e) {
          if (i === 0 && $(this).text() === '0') {
            classEmpty = true;
          }
        })
        // Check if the course being requested is valid
        $('strong').each(function(i, e) {
          if($(this).text() === 'Seat Summary' && classEmpty) {
            resolve(true);
            return;
          }
        })
        reject(false);
      })
    .catch((error) => {
      console.log(error);
      reject(error);
    })
  })
}

let checkIfNumberExists = (userFormData) => {
  let queryString = 
  'SELECT * FROM course WHERE phone_number = $1 AND subject_code = $2 AND course_number = $3 AND section_number = $4'
  pool
  .connect()
  .then(client => {
    return client
      .query(queryString, [1])
      .then(res => {
        client.release()
        console.log(res.rows[0])
      })
      .catch(e => {
        client.release()
        console.log(e.stack)
      })
  })
}

module.exports = {
  checkIfNumberExists: checkIfNumberExists,
  checkIfCourseIsValid: checkIfCourseIsValid
}