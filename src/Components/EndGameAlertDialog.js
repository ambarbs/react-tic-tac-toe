import React, {Component} from 'react';
import Button from 'material-ui/Button';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import {store} from '../AppStore';


function Transition(props) {
    return <Slide direction="up" {...props} />;
}

export default class EndGameAlertDialog extends Component {
    state = {
        open: true,
    };

    static getRandomTexts(array){
        return array[Math.floor(Math.random() * array.length)];
    }

    static get computerWinTexts() {
        return [
            `I was just playing you. Time to go home? ;-)`,
            `That was like a walk in the park...`,
            `You can definitely do better than this!`,
            `Switch to 'easy'.. LOL`,
        ];
    }

    static get humanWinTexts() {
        return [
            `I was just warming up...One more?`,
            `Haven't played for years. Soon I will be unstoppable! Play again?`,
            `You are good! Once more?`,
            `That was brutal! I can beat you. Another?`,
        ];
    }

    handleRequestClose = () => {
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
        this.setState({open: false});
    };

    getTitle() {
        switch (this.props.symbol) {
            case 'x':
                return 'Congrats!';
            case 'o':
                return 'It was me this time .. !';
            default:
            case 'd':
                return 'I hate draws!!';
        }
    }

    getDialogText() {
        switch (this.props.symbol) {
            case 'x':
                return EndGameAlertDialog.getRandomTexts(EndGameAlertDialog.humanWinTexts);
            case 'o':
                return EndGameAlertDialog.getRandomTexts(EndGameAlertDialog.computerWinTexts);
            default:
            case 'd':
                return `Let's try again?`;
        }
    }



    render() {
        return (
            <div>
                <Dialog
                    open={this.state.open}
                    transition={Transition}
                    keepMounted
                    onRequestClose={this.handleRequestClose}
                >
                    <DialogTitle>{this.getTitle()}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {this.getDialogText()}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleRequestClose} color="primary">
                            Later
                        </Button>
                        <Button onClick={this.handleRequestClose} color="primary">
                            Again
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}