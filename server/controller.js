const {pool} = require('../database/index.js');
const cheerio = require('cheerio');
const axios = require('axios');

const checkIfCourseIsValid = (userFormData) => {
  return new Promise((resolve, reject) => {
    const { subject, course, section, generalSeat, restrictedSeat, phoneNumber } = userFormData.data
    axios.get(`https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-section&dept=${subject}&course=${course}&section=${section}`, {
      params: {
        generalSeat: generalSeat,
        restrictedSeat: restrictedSeat,
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
            console.log($(this).text());
            resolve(true);
            return;
          } else if ($(this).text() === 'Seat Summary' && classEmpty === false) {
            console.log('Not Empty Error: ', $(this).text());
            resolve('NotEmpty');
            return;
          }
        })
        // If the class doesn't exist
        reject(false);
      })
      .catch((error) => {
        reject(error);
      })
  })
}

const checkIfNumberExists = (userFormData) => {
  return new Promise((resolve, reject) => {
    let queryString = 
    'SELECT * FROM course WHERE phone_number = $1 AND subject_code = $2 AND course_number = $3 AND section_number = $4';
    let { subject, course, section, generalSeat, restrictedSeat, phoneNumber } = userFormData.data
    pool
    .connect()
    .then(client => {
      return client
        .query(queryString, [phoneNumber, subject, course, section])
        .then(res => {
          client.release()
          if (res.rows.length === 0) {
            resolve(true)
          } else {
            resolve('alreadyRegistered')
          }
        })
        .catch(e => {
          client.release()
          reject(e.stack);
        })
    })
  })
}

const registerNumber = (userFormData) => {
  return new Promise((resolve, reject) => {
    let queryString = 
    'INSERT INTO course(subject_code, course_number, section_number, phone_number) VALUES($1, $2, $3, $4)';
    let { subject, course, section, generalSeat, restrictedSeat, phoneNumber } = userFormData.data
    pool
    .connect()
    .then(client => {
      return client
        .query(queryString, [subject, course, section, phoneNumber])
        .then(res => {
          resolve(res);
        })
        .catch(e => {
          client.release()
          reject(e.stack);
        })
      })
  })
}

const getAccounts = (subject, course, section) => {
  return new Promise((resolve, reject) => {
    let queryString = 'SELECT phone_number FROM course WHERE subject_code = $1 AND course_number = $2 AND section_number = $3';
    pool
      .connect()
      .then(client => {
        return client
          .query(queryString, [subject, course, section])
          .then(res => {
            resolve(res.rows)
            client.release();
          })
      })
      .catch(e => {
        client.release()
        reject(e.stack);
      })
  })
}

module.exports = {
  checkIfNumberExists: checkIfNumberExists,
  checkIfCourseIsValid: checkIfCourseIsValid,
  registerNumber: registerNumber,
  getAccounts: getAccounts
}