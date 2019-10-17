import React from 'react';
import axios from 'axios';

class Form extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            formData: {
                subject: '',
                course: '',
                section: '',
            }
        }
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleOnChange(e) {
                
        if (e.target.id === 'subject') {
            this.setState({
                subject: e.target.value
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
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log('hi');
    }

    render() {
        return (
            <form id="userForm" onSubmit={this.handleSubmit}>
                <div class="FirstStep">
                <center>
                    <h2>Step 1: Enter the course you want to track</h2>
                    <input type="text" onChange={this.handleOnChange} id="subject" name="Subject Code" placeholder="COMM" maxLength="4" />
                    <input type="text" onChange={this.handleOnChange} id="course" name="Course Number" placeholder="101" maxLength="4" />
                    <input type="text" onChange={this.handleOnChange} id="section" name="Course Section" placeholder="100" maxLength="4" />

                    <br/>
                    General Seats: <input type="checkbox" name="seat" id="generalSeats"/>
                    <br/>
                    Restricted Seats: <input type="checkbox" name="seat" id="restrictedSeats"/>
                </center>
                </div>

                <div class="SecondStep">
                    <br/>
                    <center>
                    <h2>Step 2: Provide your Phone Number</h2>
                    <label for="phoneNumber">Phone Number: </label>
                    <input type="text" id="phoneNumbertext" name="phoneNumbertext" placeholder="7781234567" maxLength="10" />
                    </center>
                </div>

                <div class="LastStep">
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