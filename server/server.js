const express = require('express')
const app = express()
const morgan = require('morgan');
const { checkIfNumberExists, checkIfCourseIsValid,
        registerNumber } = require('../database/controller.js');
const port = 3000;
const checkDatabase = require('../database/courseCheck.js');

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
        console.log('check2');
        res.send(response);
      }
    })
    .catch((error) => {
      res.status(400).send(error);
    })
    // Check if Course is valid then and catch block
    .then((response) => {
      if (response === 'alreadyRegistered') {
        res.send(response);
      }
      if (response === true) {
        return registerNumber(req.body);
      }
    })
    .catch((error) => {
      res.send(error);
    })
    // Register number then and catch block
    .then((response) => {
      res.send(response);
    })
    .catch((error) => {
      res.send(error);
    })
})

app.listen(port, () => console.log(`Notification App listening on port ${port}!`))