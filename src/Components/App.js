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
                        <div className='col-lg-8'>
                            <div className='blank-div'/>
                            <Board/>
                            <div className='blank-div'/>
                        </div>
                        <div className='col-lg-4'>
                            <div className='offset-lg-1 col-lg-11'>

                                <div className='blank-div'/>
                                <Scorecard/>
                                <div className='blank-div'/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
