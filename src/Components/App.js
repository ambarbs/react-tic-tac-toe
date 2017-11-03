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
                        <div className='offset-lg-1 col-lg-3'>
                            <div className='d-none d-sm-block blank-div'/>
                            <Scorecard/>
                            <div className='d-none d-sm-block d-xs-none blank-div'/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
