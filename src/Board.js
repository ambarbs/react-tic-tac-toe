import React, {Component} from 'react';
import './Box.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


class Box extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        let borderClass = 'col box';

        // if (this.props.rowIndex === 0 && this.props.colIndex === 0) {
        //     borderClass += ` box-top-left`;
        // } else if (this.props.rowIndex === 2 && this.props.colIndex === 2) {
        //     borderClass += ` box-bottom-right`;
        // } else {
        //     if (this.props.colIndex === 0) {
        //         borderClass += ` box-left`;
        //     }
        //     if (this.props.colIndex === 2) {
        //         borderClass += ` box-right`;
        //     }
        //     if (this.props.rowIndex === 0) {
        //         borderClass += ` box-top`;
        //     }
        //     if (this.props.rowIndex === 2) {
        //         borderClass += ` box-bottom`;
        //     }
        // }

        return (
            <div className={borderClass}>

            </div>
        )
    }
}

class Row extends Component {

    render() {
        const noOfCols = 3;
        let boxes = [];
        for (let i = 0; i < noOfCols; i++) {
            boxes.push(<Box key={i} rowIndex={this.props.rowIndex} colIndex={i}/>)
        }
        return (
            <div className='row'>
                {boxes}
            </div>
        )
    }
}


export default class Board extends Component {


    render() {
        const noOfRows = 3;
        let rows = [];
        for (let i = 0; i < noOfRows; i++) {
            rows.push(<Row key={i} rowIndex={i}/>)
        }
        return (
            <div className='container'>
                {rows}
            </div>
        )
    }
}