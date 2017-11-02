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
            `You can definitely do better this`,
            `Switch to 'easy'.. LOL`,
        ];
    }

    static get humanWinTexts() {
        return [
            `I was just warming up...`,
            `Haven't played for years. Soon I will be unstoppable!`,
            `You are good!`,
            `That was brutal!`,
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
                break;
            case 'o':
                return 'It was me this time .. !';
                break;
            default:
            case 'd':
                return 'I hate draws!!';
                break;
        }
    }

    getDialogText() {
        switch (this.props.symbol) {
            case 'x':
                return EndGameAlertDialog.getRandomTexts(EndGameAlertDialog.humanWinTexts);
                break;
            case 'o':
                return EndGameAlertDialog.getRandomTexts(EndGameAlertDialog.computerWinTexts);
                break;
            default:
            case 'd':
                return `Let's try again?`;
                break;
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
                            Sure!
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}