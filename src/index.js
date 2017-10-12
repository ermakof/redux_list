/*
 * Created by ab.ermakof on 11.10.2017.
 */

import "babel-polyfill";
import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";

import configureStore from "./store/configureStore";
import Layout from "./containers/Layout";

import {DISPATCHER_INIT} from './constants/DipatcherConnector'

const store = configureStore();

render(
    <Provider store={store}>
      	<Layout />
    </Provider>,
    document.getElementById('root')
);

store.dispatch({type: DISPATCHER_INIT});