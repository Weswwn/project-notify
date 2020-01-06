const {pool} = require('../database/index.js');
const { checkCourseStatus } = require('./checkCourseStatus.js');

setInterval(function() {
    console.log('invoked');
      let queryString = 
        'SELECT DISTINCT subject_code, course_number, section_number, general_seat, restricted_seat FROM course';
      pool
      .connect()
      .then(client => {
        return client
          .query(queryString)
          .then(res => {
            if (res.rows.length > 0) {
              checkCourseStatus(res.rows)
            }
            client.release()
          })
          .catch(e => {
            client.release()
            console.log('From getRequested', e.stack);
          })
      })
}, 10000);