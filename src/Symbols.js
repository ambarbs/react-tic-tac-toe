import React, {Component} from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './Symbols.css'


export class Cross extends Component {
    render(){
        return(
            <div className='symbol'>
                X
            </div>
        )
    }
}

export class Circle extends Component {
    render(){
        return(
            <div className='symbol'>
                O
            </div>
        )
    }
}