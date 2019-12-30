const {pool} = require('../database/index.js');
const axios = require('axios');
const { sendNotifications } = require('./sendNotifications.js');

setInterval(function() {
    console.log('invoked');
      let queryString = 
        'SELECT DISTINCT subject_code, course_number, section_number FROM course';
      pool
      .connect()
      .then(client => {
        return client
          .query(queryString)
          .then(res => {
            // client.release()
            if (res.rows.length > 0) {
              console.log(res.rows);
              sendNotifications(res.rows)
            }
          })
          .catch(e => {
            client.release()
            console.log(e.stack);
          })
      })
}, 10000)

// module.exports.checkDatabase = checkDatabase;