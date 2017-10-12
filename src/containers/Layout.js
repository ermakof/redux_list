/**
 * Created by ab.ermakof on 11.10.17.
 */
import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux"

import Layout from "../components/Layout"
import * as actions from '../actions/layout'

function mapStateToProps (state) {
    return {
        layout: state.layout
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch)
}

const layout = connect(
    mapStateToProps,
    mapDispatchToProps
)(Layout);

export default layout