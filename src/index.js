import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import {Provider} from 'react-redux'
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';

const boardReducer = (state = {
    isFirstPlayer: true,
}, action) => {
    switch (action.type) {
        case 'TOGGLE_PLAYER':
            state = {
                ...state,
                isFirstPlayer: action.payload,
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
})

ReactDOM.render(
    <Provider store={store}>
        <App store={store}/>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();

