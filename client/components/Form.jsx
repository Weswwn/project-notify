import React from 'react';
import axios from 'axios';

class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      subject: '',
      course: '',
      section: '',
      generalSeat: false,
      restrictedSeat: false,
      phoneNumber: ''
    }
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onClick = this.onClick.bind(this);
  }
  handleOnChange(e) {  
    if (e.target.id === 'subject') {
      this.setState({
        subject: e.target.value.toUpperCase()
      })
    }
    if (e.target.id === 'course') {
      this.setState({
        course: e.target.value
      })
    }
    if (e.target.id === 'section') {
      this.setState({
        section: e.target.value
      })
    }
    if (e.target.id === 'phoneNumber') {
      this.setState({
        phoneNumber: Number(e.target.value)
      })
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    let { subject, course, section, generalSeat, restrictedSeat, phoneNumber } = this.state;
    let data = {
      subject: subject,
      course: course,
      section: section,
      generalSeat: generalSeat,
      restrictedSeat: restrictedSeat,
      phoneNumber: phoneNumber
    }
    console.log(data);
    axios.post('/api/webscrape', {
      data: data
    })
    .then((response) => {
      if (response.data === 'alreadyRegistered') {
        alert('You have already registered for this course');
      } else if (response.data === 'NotEmpty') {
        alert('The course is not empty!');
      }
    })
    .catch((error) => {
      console.log(error);
    })
  }
  
  onClick(e) {
    if (e.target.id === 'generalSeats') {
      this.setState(prevState => ({
        generalSeat: !prevState.generalSeat
      }))
    }
    if (e.target.id === 'restrictedSeats') {
      this.setState(prevState => ({
          restrictedSeat: !prevState.restrictedSeat
      }))
    }
  }

  render() {
    return (
      <form id="userForm" onSubmit={this.handleSubmit}>
        <div className="FirstStep">
        <center>
          <h2>Step 1: Enter the course you want to track</h2>
          <input type="text" onChange={this.handleOnChange} id="subject" name="Subject Code" placeholder="COMM" maxLength="4" />
          <input type="text" onChange={this.handleOnChange} id="course" name="Course Number" placeholder="101" maxLength="4" />
          <input type="text" onChange={this.handleOnChange} id="section" name="Course Section" placeholder="100" maxLength="4" />

          <br/>
          General Seats: <input onClick={this.onClick} type="checkbox" name="seat" id="generalSeats"/>
          <br/>
          Restricted Seats: <input onClick={this.onClick} type="checkbox" name="seat" id="restrictedSeats"/>
        </center>
        </div>

        <div className="SecondStep">
          <br/>
          <center>
          <h2>Step 2: Provide your Phone Number</h2>
          <label id="phoneNumber">Phone Number: </label>
          <input type="text" onChange={this.handleOnChange} id="phoneNumber" name="phoneNumbertext" placeholder="7781234567" maxLength="10" />
          </center>
        </div>

        <div className="LastStep">
          <br/>
          <center>
          <input id="submitButton" type="submit"/>
          </center>
        </div>

      </form>
    )
  }
}

export default Form;