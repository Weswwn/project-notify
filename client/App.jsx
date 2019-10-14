import React from 'react';
import Form from './components/Form.jsx';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            formSubmmited: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(e.target.value);
    }
    render() {
        return (
            <div id="container">
                { !this.state.formSubmmited ? <Form handleSubmit={this.handleSubmit}/> : null }
            </div>
        )
    }
}

export default App;