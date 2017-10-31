import React, {Component} from 'react';
import './Box.css'
import './Board.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Symbol from './Symbols';
import {store} from './index';
import onClickOutside from 'react-onclickoutside';

export class Player extends Component {
    constructor(){
        super();
        this.state = {playerName: 'Player name', showTextField: false};
        this.makePlayerNameEditable = this.makePlayerNameEditable.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        // document.addEventListener('mousedown', this.handleClickOutside);
    }

    makePlayerNameEditable(){
        this.setState({showTextField: true});
    }

    handleClickOutside(){
        this.setState({playerName: 'New player'});
    }

    render() {
        return (
            <div onDoubleClick={this.makePlayerNameEditable}>
                <div>
                    {!this.state.showTextField && this.state.playerName}
                    {this.state.showTextField && <input type="text" value={this.state.playerName} onblur={this.handleClickOutside}/>}
                </div>
            </div>

        )
    }
}

export default class Scorecard extends Component {
    render() {
        return (
            <div>
                <Player/>
                <Player/>
            </div>

        )
    }
}