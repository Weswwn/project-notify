const axios = require('axios');

const sendNotifications = (courseArray) => {
  // Go through each course and check if the number of seats have gone above 0.
    // If it HAS increased then we need to send out a SMS text message to all students (query) that
    // registered for that course and remove them from the database (delete query)

  
}

module.exports = {
  sendNotifications: sendNotifications
};
