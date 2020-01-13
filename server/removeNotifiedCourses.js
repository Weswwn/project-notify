const {pool} = require('../database/index.js');

const removeNotifiedCourses = (subject, courseNum, section, restricted, general) => {
  const queryString = 'delete FROM course WHERE subject_code = $1 AND course_number = $2 AND section_number = $3 AND restricted_seat = $4 AND general_seat = $5';
  pool
      .connect()
      .then(client => {
        return client
          .query(queryString, [subject, courseNum, section, restricted, general])
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

