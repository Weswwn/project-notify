const express = require('express')
const app = express()
const morgan = require('morgan');
const { checkIfNumberExists, checkIfCourseIsValid } = require('../database/controller.js');
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
      res.send(response);
    })
    .catch((error) => {
      res.status(400).send(error);
    })
})

app.listen(port, () => console.log(`Notification App listening on port ${port}!`))