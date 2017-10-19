import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Feature extends Component {
    componentWillMount(){
        this.props.fetchMessage();
    }
    render(){
        return(
            <div>
                {this.props.message}
            </div>
        )
    }
}
function mapStateToComponent(state) {
    return {message: state.auth.message}
}
export default connect(mapStateToComponent, actions)(Feature);