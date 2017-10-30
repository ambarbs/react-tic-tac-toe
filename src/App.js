import React, {Component} from 'react';
import './App.css';
import Board from './Board';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


class App extends Component {
    render() {
        return (
            <div className="App board">
                {/*<header className="App-header">*/}
                {/*<img src={logo} className="App-logo" alt="logo"/>*/}
                {/*<h1 className="App-title">Welcome to React</h1>*/}
                {/*</header>*/}
                {/*<p className="App-intro">*/}
                {/*To get started, edit <code>src/App.js</code> and save to reload.*/}
                {/*</p>*/}
                <div className='container'>
                    <div className='row'>
                        <div className='col-8'>
                            <div className='blank-div'/>
                            <Board/>
                            <div className='blank-div'/>
                        </div>
                        <div className='col-1 vertical-divider'/>
                        <div className='col-3'>
                            <div className='blank-div'/>
                            Scorecard
                            <div className='blank-div'/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
