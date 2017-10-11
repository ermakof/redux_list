/**
 * Created by Sinires on 18.07.2016.
 */
import {createStore, applyMiddleware, compose} from "redux";
import rootReducer from "../reducers/index";
import createLogger from "redux-logger";
import thunk from "redux-thunk";
import dispatcher from '../middleware/DispatcherConnector'

export default function configureStore(initialState) {
    const logger = createLogger();
    let store = {};
    store = createStore(rootReducer,
        initialState,
        applyMiddleware(dispatcher, thunk)
    );

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers/index')
            store.replaceReducer(nextRootReducer)
        })
    }

    return store
}
