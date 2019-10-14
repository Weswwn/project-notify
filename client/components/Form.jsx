import React from 'react';

class Form extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            subject: '',
            course: '',
            section: '',
        }
        this.handleOnChange = this.handleOnChange.bind(this);
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

    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <h2>Course Information</h2>
                <label>Enter Subject Code: </label>
                <input onChange={this.handleOnChange} id="subject" type="text" name="Subject Code" placeholder="COMM" autoCapitalize="on"></input>
                <div>
                    <label>Enter Course Code: </label>
                    <input onChange={this.handleOnChange} id="course" type="text" name="Course Code" placeholder="100"></input>
               </div>
    
               <div>
                    <label>Enter Section Code: </label>
                    <input onChange={this.handleOnChange} id="section" type="text" name="Course Code" placeholder="201"></input>
               </div>
               <h2>Notification Information</h2>
               <div>
                    <label>Provide Phone Number: </label>
                    <input onChange={this.handleOnChange} id="section" type="text" name="Course Code" placeholder="7781112222"></input>
               </div>
               <input type="submit" />
            </form>
        )
    }
}

export default Form;