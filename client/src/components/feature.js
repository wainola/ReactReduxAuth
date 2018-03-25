import React, { Component } from 'react';
import { connect} from 'react-redux';
import * as actions from '../actions';

class Feature extends Component{
    componentWillMount(){
        this.props.fetchMessage();
    }
    render(){
        return(
            <div>
                <h1>Feature</h1>
                <div>
                    {this.props.message}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return { message: state.auth.message };
}

export default connect(mapStateToProps, actions)(Feature);