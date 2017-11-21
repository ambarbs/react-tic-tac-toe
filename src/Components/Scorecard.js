import React, {Component} from 'react';
import '../Styles/Box.css';
import '../Styles/Board.css';
import '../Styles/Scorecard.css';
import '../Styles/DifficultyRadioButtonsGroup.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {store} from '../AppStore';
import {isBoardEmpty} from '../boardProcessor';
import Button from 'material-ui/Button';
import Replay from 'material-ui-icons/Replay';
import Undo from 'material-ui-icons/Undo';
import Tooltip from 'material-ui/Tooltip';
import DifficultyRadioButtonsGroup from './DifficultyRadioButtonsGroup';

class Score extends Component {
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
        this.state = {hasWon: false, difficultyLevel: false, disableButtons: true};
        this.restartGame = this.restartGame.bind(this);
        this.undoMove = this.undoMove.bind(this);
        store.subscribe(() => {
            const {boardMatrix} = store.getState().boardReducer;
            this.setState({disableButtons: isBoardEmpty(boardMatrix)});
        });
    }

    restartGame() {
        store.dispatch({
            type: 'UPDATE_BOARD_MATRICES',
            payload: [],
        });
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

    undoMove() {
        let {boardMatrices} = store.getState().boardReducer;
        let boardMatrix = [[], [], []];

        // if(boardMatrices.length === 0){
        //     return;
        // }
        //
        if (boardMatrices.length <= 2) {
            boardMatrices = [];
        } else {
            boardMatrices.splice(-2);
            boardMatrix = boardMatrices[boardMatrices.length - 1];
        }

        store.dispatch({
            type: 'UPDATE_BOARD_MATRIX',
            payload: boardMatrix,
        });
        store.dispatch({
            type: 'UPDATE_BOARD_MATRICES',
            payload: boardMatrices,
        });
    }

    render() {
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-6 reset-button'>
                        <Tooltip id="tooltip-undo" title="Undo" placement="bottom">
                            <Button dense color="default" disabled={this.state.disableButtons} onClick={this.undoMove}>
                                <Undo/>
                            </Button>
                        </Tooltip>
                    </div>
                    <div className='col-6 row reset-button'>
                        <Tooltip id="tooltip-restart" title="Restart" placement="bottom">
                            <Button dense color="default" disabled={this.state.disableButtons} onClick={this.restartGame}>
                                <Replay/>
                            </Button>
                        </Tooltip>
                    </div>
                </div>
                <DifficultyRadioButtonsGroup/>
                <div>
                    <Score playerSymbol='x'/>
                    <Score playerName='Computer' playerSymbol='o'/>
                    <Score playerName='Draw' playerSymbol='d'/>
                </div>
            </div>

        )
    }
}