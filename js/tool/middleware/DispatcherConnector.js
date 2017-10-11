import dispatcher from '../../class/event/Dispatcher'
import {
    DISPATCHER_EVENT,
    DISPATCHER_FIRE
} from '../../constants/DipatcherConnector'
import Listener from "../../class/event/Listener"

export default (function () {
    let connector = null;
    return store => next => action => {
        function sendDispatcherEvent2ReduxEvent(event){
            const {type} = event;
            store.dispatch({
                type: DISPATCHER_EVENT,
                payload: event,
                //originalType хоть и нарушает соглашения по redux, но не протеворечит им, будет использоваться,
                // так как поляна type будет использоваться для однозначной информации о том, что событие пришло извне.
                originalType: type
            });
        }

        if (!connector) {
            connector = true;
            //будущие механизмы фильтрации данных прикручивать здесь
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