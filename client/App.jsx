import React from 'react';
import Form from './components/Form.jsx';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            formSubmmited: false
        }
    }

    
    render() {
        return (
            <div className="container">
                { !this.state.formSubmmited ? <Form /> : null }
            </div>
        )
    }
}

export default App;