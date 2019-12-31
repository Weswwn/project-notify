const {pool} = require('../database/index.js');
const cheerio = require('cheerio');
const axios = require('axios');

const checkIfCourseIsValid = (userFormData) => {
  return new Promise((resolve, reject) => {
    const { subject, course, section, generalSeat, restrictedSeat } = userFormData.data
    axios.get(`https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-section&dept=${subject}&course=${course}&section=${section}`, {
      params: {
        generalSeat: generalSeat,
        restrictedSeat: restrictedSeat,
      }
    })
      .then((response) => {
        const html = response.data
        const $ = cheerio.load(html);
        
        // Check if the course being requested is valid
        // Check if the course being requested is actually empty
        const list = [];
        if ($('td strong').text().length === 0) {
          reject(error);
          return;
        }
        $('td strong').each(function(i, e) {
          list[i] = $(this).text();
        })
        if (generalSeat && restrictedSeat) {
          if (list[2] == '0' && list[3] == '0') {
            resolve(true);
          } else {
            resolve('NotEmpty');
          }
        } else if (generalSeat == false && restrictedSeat == false) {
          if (list[2] == '0' && list[3] == '0') {
            resolve(true);
          } else {
            resolve('NotEmpty');
          }
        } else if (generalSeat) {
          if (list[2] == '0') {
            resolve(true);
          } else {
            resolve('NotEmpty');
          }
        } else if (restrictedSeat) {
          if (list[3] == '0') {
            resolve(true);
          } else {
            resolve('NotEmpty');
          }
        }
      })
      .catch((error) => {
        reject(error);
      })
  })
}

const checkIfNumberExists = (userFormData) => {
  return new Promise((resolve, reject) => {
    let queryString = 
    'SELECT * FROM course WHERE phone_number = $1 AND subject_code = $2 AND course_number = $3 AND section_number = $4 AND general_seat = $5 AND restricted_seat = $6';
    let { subject, course, section, generalSeat, restrictedSeat, phoneNumber } = userFormData.data
    pool
    .connect()
    .then(client => {
      return client
        .query(queryString, [phoneNumber, subject, course, section, generalSeat, restrictedSeat])
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
          console.log(e);
          reject(e.stack);
        })
    })
  })
}

const registerNumber = (userFormData) =>
  new Promise((resolve, reject) => {
    let queryString = 
    'INSERT INTO course(subject_code, course_number, section_number, phone_number, restricted_seat, general_seat) VALUES($1,$2,$3,$4,$5,$6)';
    const { subject, course, section, generalSeat, restrictedSeat, phoneNumber } = userFormData.data;
    pool
    .connect()
    .then(client => {
      return client
        .query(queryString, [subject, course, section, phoneNumber, restrictedSeat, generalSeat])
        .then(res => {
          client.release();
          resolve(res);
        })
        .catch(e => {
          console.log(e);
          client.release()
          reject(e.stack);
        })
      })
    })

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