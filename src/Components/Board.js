import React, {Component} from 'react';
import '../Styles/Box.css'
import '../Styles/Board.css'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Symbol from './Symbols';
import {store} from '../AppStore';
import {findBestMove, isWin} from '../boardProcessor';
class Box extends Component {

    constructor(props) {
        super(props);

        this.state = {active: false};

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
        if(boardMatrix[this.props.rowIndex][this.props.colIndex] === undefined) {
            const toggleIsFirstPlayer = store.getState().boardReducer.isFirstPlayer;
            store.dispatch({
                type: 'TOGGLE_PLAYER',
                payload: !toggleIsFirstPlayer,
            });

            const addSymbolToBoardMatrix = !toggleIsFirstPlayer ? 'x' : 'o';
            boardMatrix[this.props.rowIndex][this.props.colIndex] = addSymbolToBoardMatrix;

            // update board matrix with human player's move
            store.dispatch({
                type: 'UPDATE_BOARD_MATRIX',
                payload: boardMatrix,
            });

            setTimeout(() => {
                Box.computerTakeTurn(boardMatrix, toggleIsFirstPlayer)
            }, 200);
        }
    }

    static computerTakeTurn(boardMatrix, toggleIsFirstPlayer) {
        // const {boardReducer} = store.getState();
        // const boardMatrix = boardReducer.boardMatrix;
        const addSymbolToBoardMatrix = toggleIsFirstPlayer ? 'x' : 'o';


        const bestMove = findBestMove(boardMatrix);

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

        if(isWin(boardMatrix, addSymbolToBoardMatrix)){
            const winCount = store.getState().boardReducer.winCount;
            winCount[addSymbolToBoardMatrix] = winCount[addSymbolToBoardMatrix]+=1;
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