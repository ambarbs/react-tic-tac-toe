import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';

const boardReducer = (state = {
    isFirstPlayer: false,
    boardMatrix: [[], [], []],
    minimax: {row: 0, col: 0}
}, action) => {
    switch (action.type) {
        default:
        case 'TOGGLE_PLAYER':
            state = {
                ...state,
                isFirstPlayer: action.payload,
            };
            break;
        case 'UPDATE_BOARD_MATRIX':
            state = {
                ...state,
                boardMatrix: action.payload,
            };
            break;
        case 'UPDATE_MINIMAX':
            state = {
                ...state,
                minimax: action.payload,
            };
            break;

    }
    return state;
}

export const store = createStore(
    combineReducers({boardReducer}),
    {},
    applyMiddleware(createLogger())
);

store.subscribe(() => {
    // console.log('Store updated ', store.getState() );
});