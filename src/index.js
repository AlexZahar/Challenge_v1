import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import sortReducer from './store/reducers/sort';
import filterReducer from './store/reducers/filter';
import resultReducer from './store/reducers/result';

const rootReducer = combineReducers({
    sort: sortReducer,
    filter: filterReducer,
    res: resultReducer
})


// Enabling Redux devtools for this project
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Middleware that does Logging into the console when actions dispatch

// const logger = (store) => {
//     return (next) => {
//         return (action) => {
//                 console.log('Middleware dispatching:', action);
//                 const result = next(action)
//                 console.log('middleware next state', store.getState())
//                 return result
//         }
//     }
// };

const store = createStore(rootReducer, composeEnhancers(applyMiddleware( thunk)));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
