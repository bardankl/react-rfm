import React, {Component} from 'react';
import './App.css';
import Test from './components/test'
import Test2 from './components/test2'
import SheetJSApp from './components/test'

class App extends Component {
    render() {
        return (
            <div className="App">
                <SheetJSApp/>
                <Test2/>
            </div>
        );
    }
}

export default App;
