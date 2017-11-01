import React, {Component} from 'react';
import '../Styles/Box.css';
import '../Styles/Board.css';
import '../Styles/Scorecard.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {store} from '../AppStore';

export class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {playerName: this.props.playerName || 'Human', showTextField: false};
        this.makePlayerNameEditable = this.makePlayerNameEditable.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        // document.addEventListener('mousedown', this.handleClickOutside);
    }

    makePlayerNameEditable() {
        this.setState({showTextField: true});
    }

    handleClickOutside() {
        this.setState({playerName: 'New player'});
    }

    render() {
        return (
            <div onDoubleClick={this.makePlayerNameEditable}>
                <div className='player'>
                    {!this.state.showTextField && this.state.playerName}
                    {this.state.showTextField &&
                    <input type="text" value={this.state.playerName} onblur={this.handleClickOutside}/>}
                </div>
            </div>

        )
    }
}

export default class Scorecard extends Component {
    constructor() {
        super();
        this.restartGame = this.restartGame.bind(this);
    }

    restartGame() {
        store.dispatch({
            type: 'UPDATE_BOARD_MATRIX',
            payload: [[], [], []],
        });
    }

    render() {
        return (
            <div>
                <button className='btn' onClick={this.restartGame}>
                    Restart
                </button>
                <Player/>
                <Player playerName='Computer'/>
            </div>

        )
    }
}