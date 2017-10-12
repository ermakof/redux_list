/**
 * Created by ab.ermakof on 12.10.17.
 */
'use strict';

/**
 * Listener
 * Описание объекта подписки
 */
class Listener {
    /**
     * Генератор id для слушателя
     * @private
     * @returns {string}
     */
    static generateListenerId() {
        return ("" + Math.random()).replace("0.", "") + Date.now()
    };

    /**
     * @constructor
     * @param {function} callback
     * @param {string} type
     * @param {object} context
     */
    constructor(callback, type, context) {
        this.id = Listener.generateListenerId();
        this.type = type || null;
        this.callback = callback;
        this.context = context;
    };

    /**
     * Метод вызова слушателя
     * @param {object} event
     */
    fire(event) {
        this.callback(event, this.context);
        if (event.reply == this.id)
            this.delete();
    }

    /**
     * Метод удаления слушателя
     */
    delete() {
        delete this;
    };
}

export default Listener