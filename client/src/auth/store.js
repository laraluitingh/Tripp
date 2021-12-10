/// code obtained from https://www.youtube.com/watch?v=HCnHYz6TXA4&list=PLk8gdrb2DmChrL50moKeFNAVnFqZ3GLF7&index=4

import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

import {sessionService} from 'redux-react-session';

const initialState = {};
const middlewares = [thunk];

const store = createStore(rootReducer, initialState, compose(applyMiddleware(...middlewares)));

sessionService.initSessionService(store);

export default store;