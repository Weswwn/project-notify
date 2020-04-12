import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

const NotificationStyle = styled.div`
  color: red;
`
class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      subject: '',
      course: '',
      section: '',
      term: '',
      generalSeat: false,
      restrictedSeat: false,
      phoneNumber: '',
      courseNotValid: false,
      alreadyRegistered: false,
      courseFull: false,
      success: false
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
        course: e.target.value.toUpperCase()
      })
    }
    if (e.target.id === 'section') {
      this.setState({
        section: e.target.value.toUpperCase()
      })
    }
    if (e.target.id === 'phoneNumber') {
      this.setState({
        phoneNumber: Number(e.target.value)
      })
    }
    this.setState({
      courseNotValid: false,
      alreadyRegistered: false,
      courseFull: false,
      success: false
    })
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
    axios.post('/api/webscrape', {
      data: data
    })
    .then((response) => {
      if (response.data === 'NotEmpty') {
        this.setState({
          courseFull: true,
          success: false
        })
      }
      if (response.data === 'alreadyRegistered') {
        this.setState({
          alreadyRegistered: true,
          success: false
        })
      }
      if (response.data.rowCount === 1) {
        this.setState({
          courseFull: false,
          courseNotValid: false,
          alreadyRegistered: false,
          success: true
        })
      }
    })
    .catch((error) => {
      this.setState({
        courseNotValid: true,
      })
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
          <NotificationStyle>
            {this.state.courseNotValid ? 'The course you have added is not valid! Try Again.' : null}
          </NotificationStyle>
          <NotificationStyle>
            {this.state.courseFull ? 'The course is not full!' : null}
          </NotificationStyle>
          <input type="text" onChange={this.handleOnChange} id="subject" name="Subject Code" placeholder="COMM" required maxLength="4" />
          <input type="text" onChange={this.handleOnChange} id="course" name="Course Number" placeholder="101" required maxLength="4" />
          <input type="text" onChange={this.handleOnChange} id="section" name="Course Section" placeholder="100" required maxLength="4" />

          <br/>
            Select Term:
            <select id="term">
              <option selected value="winter">Winter</option>
              <option value="summer">Summer</option>
            </select>

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
          <NotificationStyle>
            {this.state.alreadyRegistered ? 'You have already registered!' : null}
          </NotificationStyle>
          <label id="phoneNumber">Phone Number: </label>
          <input type="text" onChange={this.handleOnChange} id="phoneNumber" name="phoneNumbertext" placeholder="7781234567" required minLength="10" />
          </center>
        </div>

        <div className="LastStep">
          <br/>
          <center>
          <input id="submitButton" type="submit"/>
          <NotificationStyle>
            {this.state.success ? 'You have been registered! Expected a text when the course opens up!': null}
          </NotificationStyle>
          </center>
        </div>

      </form>
    )
  }
}

export default Form;