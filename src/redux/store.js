import thunk  from 'redux-thunk';
import { applyMiddleware, createStore, compose } from 'redux';
import rootReducer from './reducres';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;