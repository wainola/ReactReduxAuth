import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';
import { connect } from 'react-redux';

class Signin extends Component{
    renderTextField(field){
        const {meta: {touched, error}} = field;
        const className = `form-control ${touched && error ? 'is-invalid' : '' }`;
        console.log(touched, error);
        return(
            <div className="form-group">
                <label htmlFor="">{field.label}</label>
                <input 
                    type={field.label === 'password' ? 'password' : 'text'}
                    className={className}
                    {...field.input}
                />
            </div>
        )
    }
    handleFormSubmit({email, password}){
        this.props.signinUser({email, password}, () => {
            // programatic navegation if the signin is correct
            this.props.history.push('/feature');
        });
    }
    renderAlert(){
        if(this.props.errorMessage){
            return(
                <div className="alert alert-danger">
                    <strong>Ooop!</strong> {this.props.errorMessage}
                </div>
            );
        }
    }
    render(){
        const {handleSubmit} = this.props;
        console.log(this.props.signinUser);
        return(
            <div className="container">
                <form action="" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                    <Field
                        label="email"
                        name="email"
                        component={this.renderTextField}
                    />
                    <Field
                        label="password"
                        name="password"
                        component={this.renderTextField}
                    />
                    {this.renderAlert()}
                    <button className="btn btn-success">Sign in</button>
                </form>
            </div>
        );
    }
}

function validate(values){
    const errors = {};
    if(!values.email){
        errors.email = 'Enter some email';
    }
    if(!values.password){
        errors.password = "Enter correct password";
    }
    return errors;
}

function mapStateToProps(state){
    return { errorMessage: state.auth.error };
}

export default reduxForm({
    validate,
    form: 'signin'
})(
    connect(mapStateToProps, actions)(Signin)
);