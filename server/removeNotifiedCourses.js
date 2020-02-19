const {pool} = require('../database/index.js');

const removeNotifiedCourses = (phoneNumber, subject, courseNum, section, restricted, general) => {
  const queryString = 'delete FROM course WHERE phone_number = $ 1 AND subject_code = $2 AND course_number = $3 AND section_number = $4 AND restricted_seat = $5 AND general_seat = $6';
  pool
      .connect()
      .then(client => {
        return client
          .query(queryString, [phoneNumber, subject, courseNum, section, restricted, general])
          .then(res => {
            console.log('From removeNotifications:', res.rowCount);
            client.release();
          })
      })
      .catch(e => {
        client.release()
        console.log(e);
      })
}

module.exports =  {
  removeNotifiedCourses: removeNotifiedCourses
}

