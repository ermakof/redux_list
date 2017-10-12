/**
 * Created by ab.ermakof on 12.10.17.
 */

import Listener from "./Listener";

"use strict";
/**
 * Dispatcher
 * Интерфейс генерации событий
 */
class Dispatcher {
    /**
     * @constructor
     */
    constructor() {
        this.streamList = [];
        this.listenerList = {};
    }

    /**
     * Генерация события системы
     * @param {string} type
     * @param {object} event
     */
    event(type, event = {}) {
        event.type = type;
        this.fire(event)
    }

    /**
     * Вызов события системы
     * @param {object} event
     */
    fire(event) {
        this._send2Listeners(event)
    }

    /**
     * Метод отправки события
     * @param {object} event
     * @private
     */
    _send2Listeners(event) {
        let listeners = this.listenerList;
        if (event.reply) {
            let listener = listeners[event.reply];
            if (listener) {
                listener.fire(event);
                this.deleteListener(listener);
            }
        }
        let type = event.type;
        if (listeners && listeners[type])
            for (let key in listeners[type])
                if (listeners[type].hasOwnProperty(key)) {
                    const id = key;
                    setTimeout(function () {
                        if (listeners[type].hasOwnProperty(id))
                            listeners[type][id].fire(event);
                    }, 0);
                }

        for (let key in listeners['*']) {
            if (listeners['*'].hasOwnProperty(key)) {
                const id = key;
                setTimeout(function () {
                    if (listeners['*'].hasOwnProperty(id))
                        listeners['*'][id].fire(event);
                }, 0);
            }
        }
    }

    /**
     * Метод добавления слушателя системы
     * @param {Listener} listener
     */
    addListener(listener) {
        if (listener.type) {
            if (!this.listenerList[listener.type])
                this.listenerList[listener.type] = {};
            this.listenerList[listener.type][listener.id] = listener;
        } else {
            this.listenerList[listener.id] = listener;
        }
    }

    /**
     * Метод добавления массива слушателей
     * @param {Listener[]} listeners
     */
    addListeners(listeners) {
        let self = this;
        for (let listener of listeners) {
            setTimeout(function () {
                self.addListener(listener)
            })
        }
    }

    /**
     * Метод удаления слушателя
     * @param {Listener} listener
     */
    deleteListener(listener) {
        if (this.listenerList[listener.type] && this.listenerList[listener.type][listener.id])
            delete this.listenerList[listener.type];
        else
            delete this.listenerList[listener.id]
    }

    /**
     * Метод удаления массива слушателей
     * @param {Listener[]} listeners
     */
    deleteListeners(listeners) {
        let self = this;
        for (let listener of listeners) {
            setTimeout(function () {
                self.deleteListener(listener)
            })
        }
    }

}

export default Dispatcher;
