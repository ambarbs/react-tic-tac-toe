import React, {Component} from 'react';
import '../Styles/App.css';
import Board from './Board';
import Scorecard from './Scorecard';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';


class App extends Component {
    render() {
        return (
            <div className="board-color">
                <div className='container'>
                    <div className='row'>
                        <div className='col-8'>
                            <div className='blank-div'>
                                {/*<div className='offset-8'>*/}
                                    {/*<button className='btn' onClick={this.restartGame}>*/}
                                        {/*Restart*/}
                                    {/*</button>*/}
                                {/*</div>*/}
                            </div>
                            <Board/>
                            <div className='blank-div'/>
                        </div>
                        <div className='col-1 vertical-divider'/>
                        <div className='col-3'>
                            <div className='blank-div'/>
                            <Scorecard/>
                            <div className='blank-div'/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
