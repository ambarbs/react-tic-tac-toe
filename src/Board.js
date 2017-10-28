import React, {Component} from 'react';
import './Box.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Cross, Circle} from './Symbols'


class Box extends Component {

    constructor(props) {
        super(props);
        this.state = {active: false};
        this.cross = 'cross';
        this.cross = 'circle';
        this.onClick = this.onClick.bind(this);
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
        this.props.callBackOnClickOnBox();

    }

    getSymbol() {
        if (this.state.active) {
            if (this.state.isFirstPlayer) {
                return <Cross/>
            } else {
                return <Circle/>
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
    constructor(props){
        super(props);
    }

    callBackOnClickOnBox(){
        this.callBackOnClickOnBox();
    }

    render() {
        const noOfCols = 3;
        let boxes = [];
        for (let i = 0; i < noOfCols; i++) {
            boxes.push(<Box key={i} rowIndex={this.props.rowIndex} colIndex={i}
                            isFirstPlayer={this.props.isFirstPlayer} callBackOnClickOnBox={this.callBackOnClickOnBox}/>)
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

    togglePlayer(){
        const isFirstPlayer = !this.state.isFirstPlayer;
        this.setState({
            isFirstPlayer
        });
    }


    render() {
        const noOfRows = 3;
        let rows = [];
        for (let i = 0; i < noOfRows; i++) {
            rows.push(<Row key={i} rowIndex={i} isFirstPlayer={this.state.isFirstPlayer} callBackOnClickOnBox={this.togglePlayer}/>)
        }
        return (
            <div className='container'>
                {rows}
            </div>
        )
    }
}