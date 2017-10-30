import React, {Component} from 'react';
import './Box.css'
import './Board.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Symbol from './Symbols';
import {store} from './index';


class Box extends Component {

    constructor(props) {
        super(props);
        this.state = {active: false};
        this.cross = 'cross';
        this.cross = 'circle';
        this.onClick = this.onClick.bind(this);

        const store2 = store;
        const that = this;
        store.subscribe(() => {
            that.isFirstPlayer = store2.getState().boardReducer.isFirstPlayer;
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
        this.setState({
            active: true,
        });

        const isFirstPlayer = !store.getState().boardReducer.isFirstPlayer;
        store.dispatch({
            type: 'TOGGLE_PLAYER',
            payload: isFirstPlayer,
        });
    }

    getSymbol() {
        if (this.state.active) {
            if (this.isFirstPlayer) {
                return <Symbol symbol='X'/>
            } else {
                return <Symbol symbol='O'/>
            }
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