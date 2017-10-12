/*
 * Created by ab.ermakof on 11.10.2017.
 */

import Dispatcher from '../class/event/Dispatcher'
import {
    DISPATCHER_EVENT,
    DISPATCHER_FIRE
} from '../constants/DipatcherConnector'
import Listener from "../class/event/Listener"

/**
 * Инициализация событийной шины
 * @type {Dispatcher}
 */
let dispatcher = new Dispatcher();

export default (function () {
    let connector = null;
    return store => next => action => {
        function sendDispatcherEvent2ReduxEvent(event){
            const {type} = event;
            store.dispatch({
                type: DISPATCHER_EVENT,
                payload: event,
                originalType: type
            });
        }

        if (!connector) {
            connector = true;
            console.log(dispatcher);
            dispatcher.addListener(new Listener(sendDispatcherEvent2ReduxEvent, "*"));
        }

        switch (action.type) {
            case DISPATCHER_FIRE: {
                const {payload, originalType} = action
                    , event = payload;
                dispatcher.event(originalType, event);
                return next(action);
            }

            default:
                return next(action);
        }
    }
})();