import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Radio from 'material-ui/Radio';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../Styles/Scorecard.css';
import {store} from '../AppStore';

const styles = theme => ({
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing.unit * 3,
    },
    group: {
        margin: `${theme.spacing.unit}px 0`,
    },
});

class DifficultyRadioButtonsGroup extends React.Component {
    state = {
        selectedValue: 'Medium',
    };

    handleChange = event => {
        this.setState({selectedValue: event.target.value});
        store.dispatch({
            type: 'TOGGLE_DIFFICULTY',
            payload: event.target.value,
        });
    };

    render() {
        return (
            <div className='row player'>
                <div className='col-3'>
                    <label className=''>{this.state.selectedValue}</label>
                </div>
                <div className='col-9 radio-group-margin-top'>
                    <Radio
                        checked={this.state.selectedValue === 'Easy'}
                        onChange={this.handleChange}
                        value="Easy"
                        name="radio button demo"
                        aria-label="A"
                    />
                    <Radio
                        checked={this.state.selectedValue === 'Medium'}
                        onChange={this.handleChange}
                        value="Medium"
                        name="radio button demo"
                        aria-label="B"
                    />
                    <Radio
                        checked={this.state.selectedValue === 'Hard'}
                        onChange={this.handleChange}
                        value="Hard"
                        name="radio button demo"
                        aria-label="C"
                    />
                </div>
            </div>
        );
    }
}

DifficultyRadioButtonsGroup.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DifficultyRadioButtonsGroup);