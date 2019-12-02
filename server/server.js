const express = require('express')
const app = express()
const morgan = require('morgan');
const { checkIfNumberExists, checkIfCourseIsValid,
        registerNumber } = require('../database/controller.js');
const port = 3000;

app.use(express.static('public'));
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));

app.post('/api/webscrape' , (req, res) => {
  checkIfCourseIsValid(req.body)
    .then((response) => {
      if (response === true) {
        return checkIfNumberExists(req.body)
      } else if (response === 'NotEmpty') {
        res.send(response);
      }
    })
    .catch((error) => {
      res.status(400).send(error);
    })
    .then((response) => {
      if (response === 'alreadyRegistered') {
        res.send(response);
      }
      // Since course is valid, IS empty, and user has NOT
      // already registered, we can now insert them into the db
      registerNumber(req.body)
    })
    .catch((error) => {
      res.status(400).send(error);
    })
})

app.listen(port, () => console.log(`Notification App listening on port ${port}!`))