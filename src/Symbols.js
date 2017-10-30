import React, {Component} from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './Symbols.css'


export default class Symbol extends Component {
    render(){
        const style = this.props.symbol === 'X' ? 'symbol' : 'symbol circle-color';
        return(
            <div className={style}>
                {this.props.symbol}
            </div>
        )
    }
}

export class Circle extends Component {
    render(){
        return(
            <div className='symbol circle-color'>
                O
            </div>
        )
    }
}