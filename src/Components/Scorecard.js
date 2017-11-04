import React, {Component} from 'react';
import '../Styles/Box.css';
import '../Styles/Board.css';
import '../Styles/Scorecard.css';
import '../Styles/DifficultyRadioButtonsGroup.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {store} from '../AppStore';
import Button from 'material-ui/Button';
import Replay from 'material-ui-icons/Replay';
import DifficultyRadioButtonsGroup from './DifficultyRadioButtonsGroup';

export class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {playerName: this.props.playerName || 'You', showTextField: false};
        this.makePlayerNameEditable = this.makePlayerNameEditable.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);

        store.subscribe(() => {
            const winCount = store.getState().boardReducer.winCount;
            this.setState({score: winCount[this.props.playerSymbol]});
        });
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
            <div className='row player' onDoubleClick={this.makePlayerNameEditable}>
                <div className='col-8'>{!this.state.showTextField && `${this.state.playerName}: `} </div>
                <div className='col-4'>{this.state.score || 0}</div>
                {this.state.showTextField &&
                <input type="text" value={this.state.playerName} onblur={this.handleClickOutside}/>}
            </div>
        )
    }
}

export default class Scorecard extends Component {
    constructor() {
        super();
        this.state = {hasWon: false, difficultyLevel: false};
        this.restartGame = this.restartGame.bind(this);
        this.onToggle = this.onToggle.bind(this);
    }

    restartGame() {
        store.dispatch({
            type: 'UPDATE_BOARD_MATRIX',
            payload: [[], [], []],
        });
        store.dispatch({
            type: 'TOGGLE_PLAYER',
            payload: false,
        });
        store.dispatch({
            type: 'SHOW_END_GAME_ALERT',
            payload: false,
        });
    }

    onToggle() {
        const nextToggleValue = !this.state.difficultyLevel;
        this.setState({difficultyLevel: nextToggleValue});
        store.dispatch({
            type: 'TOGGLE_DIFFICULTY',
            payload: nextToggleValue,
        });
    }

    render() {
        return (
            <div className='container'>
                <div className='row reset-button'>
                    <Button dense color="default" aria-label="add" onClick={this.restartGame}>
                        <Replay/>
                    </Button>
                </div>
                <DifficultyRadioButtonsGroup/>
                <div>
                    <Player playerSymbol='x'/>
                    <Player playerName='Computer' playerSymbol='o'/>
                    <Player playerName='Draw' playerSymbol='d'/>
                </div>
            </div>

        )
    }
}