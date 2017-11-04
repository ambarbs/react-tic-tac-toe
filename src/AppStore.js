import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';

const boardReducer = (state = {
    isFirstPlayer: false,
    boardMatrices: [],
    boardMatrix: [[], [], []],
    minimax: {row: 0, col: 0},
    winCount: {x: 0, o: 0, d: 0},
    difficultyLevel: 'Easy',
    showEndGameAlert: false,

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
                boardMatrices: [...state.boardMatrices, JSON.parse(JSON.stringify(action.payload))],
            };
            break;
        case 'UPDATE_MINIMAX':
            state = {
                ...state,
                minimax: action.payload,
            };
            break;
        case 'UPDATE_WIN_COUNT':
            state = {
                ...state,
                winCount: action.payload,
            };
            break;
        case 'TOGGLE_DIFFICULTY':
            state = {
                ...state,
                difficultyLevel: action.payload,
            };
            break;
        case 'SHOW_END_GAME_ALERT':
            state = {
                ...state,
                showEndGameAlert: action.payload,
            };
            break;
        case 'UPDATE_BOARD_MATRICES':
            state = {
                ...state,
                boardMatrices: action.payload,
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