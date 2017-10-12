/*
 * Created by ab.ermakof on 12.10.2017.
 */
import {createStore, applyMiddleware, compose} from "redux";
import rootReducer from "../reducers/index";
import createLogger from "redux-logger";
import thunk from "redux-thunk";
import dispatcher from '../middleware/DispatcherConnector'

export default function configureStore(initialState) {
    const logger = createLogger();
    let store = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(dispatcher, thunk, logger),
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        )
    );
    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers/index');
            store.replaceReducer(nextRootReducer)
        })
    }

    return store
}
