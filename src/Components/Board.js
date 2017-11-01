import React, {Component} from 'react';
import '../Styles/Box.css'
import '../Styles/Board.css'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Symbol from './Symbols';
import {store} from '../AppStore';
import {findBestMove} from '../minimax';


class Box extends Component {

    constructor(props) {
        super(props);

        this.state = {active: false};

        this.onClick = this.onClick.bind(this);
        this.computerTakeTurn = this.computerTakeTurn.bind(this);

        const that = this;
        store.subscribe(() => {
            const boardMatrix = store.getState().boardReducer.boardMatrix;
            // if (boardMatrix[that.props.rowIndex][that.props.colIndex] && !this.state.active) {
                this.setState({active: true, symbol: boardMatrix[this.props.rowIndex][this.props.colIndex]});
            // }
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
        const toggleIsFirstPlayer = store.getState().boardReducer.isFirstPlayer;
        store.dispatch({
            type: 'TOGGLE_PLAYER',
            payload: !toggleIsFirstPlayer,
        });

        const boardMatrix = store.getState().boardReducer.boardMatrix;
        const addSymbolToBoardMatrix = !toggleIsFirstPlayer ? 'x' : 'o';
        boardMatrix[this.props.rowIndex][this.props.colIndex] = addSymbolToBoardMatrix;

        // update board matrix with human player's move
        store.dispatch({
            type: 'UPDATE_BOARD_MATRIX',
            payload: boardMatrix,
        });

        this.computerTakeTurn(boardMatrix, toggleIsFirstPlayer);
    }

    computerTakeTurn(boardMatrix, toggleIsFirstPlayer) {
        // const {boardReducer} = store.getState();
        // const boardMatrix = boardReducer.boardMatrix;
        const addSymbolToBoardMatrix = toggleIsFirstPlayer ? 'x' : 'o';

        const bestMove = findBestMove(boardMatrix);
        console.log(bestMove);

        if (bestMove.col === -1 || bestMove.row === -1)
            return;

        boardMatrix[bestMove.row][bestMove.col] = addSymbolToBoardMatrix;

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
            </div>
        )
    }
}