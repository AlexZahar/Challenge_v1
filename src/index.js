
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'

// import sortReducer from './store/reducers/sort';
// import filterReducer from './store/reducers/filter';
import reducer from './store/reducers/reducer';

const rootReducer = reducer


// Enabling Redux devtools for this project
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
serviceWorker.unregister();




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
