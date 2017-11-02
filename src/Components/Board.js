import React, {Component} from 'react';
import '../Styles/Box.css'
import '../Styles/Board.css'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Symbol from './Symbols';
import {store} from '../AppStore';
import EndGameAlertDialog from './EndGameAlertDialog';
import {findBestMove, findEasyMove, isWin, isDraw} from '../boardProcessor';

class Box extends Component {

    constructor(props) {
        super(props);

        this.state = {active: false, showEndGameAlert: false};

        this.onClick = this.onClick.bind(this);
        store.subscribe(() => {
            const boardMatrix = store.getState().boardReducer.boardMatrix;
            this.setState({active: true, symbol: boardMatrix[this.props.rowIndex][this.props.colIndex]});
        });
    }

    getStyle() {
        let borderClass = 'col box';

        if (this.props.colIndex === 0) {
            borderClass += ` box-left`;
        }
        if (this.props.colIndex === 2) {
            borderClass += ` box-right`;
        }
        if (this.props.rowIndex === 0) {
            borderClass += ` box-top`;
        }
        if (this.props.rowIndex === 2) {
            borderClass += ` box-bottom`;
        }
        return borderClass;
    }

    onClick() {

        const {boardMatrix} = store.getState().boardReducer;
        if (boardMatrix[this.props.rowIndex][this.props.colIndex] === undefined) {
            const toggleIsFirstPlayer = store.getState().boardReducer.isFirstPlayer;
            const addSymbolToBoardMatrix = !toggleIsFirstPlayer ? 'x' : 'o';
            store.dispatch({
                type: 'TOGGLE_PLAYER',
                payload: !toggleIsFirstPlayer,
            });

            boardMatrix[this.props.rowIndex][this.props.colIndex] = addSymbolToBoardMatrix;
            this.updateWinCounter(boardMatrix, addSymbolToBoardMatrix);

            // update board matrix with human player's move
            store.dispatch({
                type: 'UPDATE_BOARD_MATRIX',
                payload: boardMatrix,
            });

            setTimeout(() => {
                this.computerTakeTurn(boardMatrix, toggleIsFirstPlayer)
            }, 200);
        }
    }

    computerTakeTurn(boardMatrix, toggleIsFirstPlayer) {
        const addSymbolToBoardMatrix = toggleIsFirstPlayer ? 'x' : 'o';

        const moveFunction = store.getState().boardReducer.isDifficult ? findBestMove : findEasyMove;
        const move = moveFunction(boardMatrix);

        if (move.col === -1 || move.row === -1)
            return;

        boardMatrix[move.row][move.col] = addSymbolToBoardMatrix;

        store.dispatch({
            type: 'UPDATE_BOARD_MATRIX',
            payload: boardMatrix,
        });

        store.dispatch({
            type: 'TOGGLE_PLAYER',
            payload: toggleIsFirstPlayer,
        });

        // store.dispatch({
        //     type: 'UPDATE_MINIMAX',
        //     payload: bestMove,
        // });

        this.updateWinCounter(boardMatrix, addSymbolToBoardMatrix);
    }

    updateWinCounter(boardMatrix, symbol) {
        const {winCount} = store.getState().boardReducer;
        let update =false;
        if (isWin(boardMatrix, symbol)) {
            update = true;
        } else if (isDraw(boardMatrix)) {
            symbol = 'd';
            update = true;
        }
        if(update) {
            winCount[symbol] = winCount[symbol] += 1;
            store.dispatch({
                type: 'SHOW_END_GAME_ALERT',
                payload: symbol,
            });
            store.dispatch({
                type: 'UPDATE_WIN_COUNT',
                payload: winCount,
            });
        }
    }

    getSymbol() {
        if (this.state.active) {
            return <Symbol symbol={this.state.symbol}/>;
        }
    }

    render() {
        return (
            <div className={this.getStyle()} onClick={this.onClick}>
                {this.getSymbol()}
            </div>
        )
    }
}

class Row extends Component {

    render() {
        const noOfCols = 3;
        let boxes = [];
        for (let i = 0; i < noOfCols; i++) {
            boxes.push(<Box key={i} rowIndex={this.props.rowIndex} colIndex={i}
                            isFirstPlayer={this.props.isFirstPlayer}/>)
        }
        return (
            <div className='row'>
                {boxes}
            </div>
        )
    }
}


export default class Board extends Component {

    constructor(props) {
        super(props);
        this.state = {isFirstPlayer: true};
        store.subscribe(() => {
            const {showEndGameAlert} = store.getState().boardReducer;
            this.setState({showEndGameAlert});
        });
    }


    render() {
        const noOfRows = 3;
        let rows = [];
        for (let i = 0; i < noOfRows; i++) {
            rows.push(<Row key={i} rowIndex={i} isFirstPlayer={this.state.isFirstPlayer}/>)
        }
        return (
            <div className='container'>
                {rows}
                {this.state.showEndGameAlert && <EndGameAlertDialog symbol={this.state.showEndGameAlert}/>}
            </div>
        )
    }
}