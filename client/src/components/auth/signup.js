import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';
import { connect } from 'react-redux';

class Signup extends Component {
    handleForSubmit(values){
        // call action creator to sign up the user!
        this.props.signupUser(values, () => {
            this.props.history.push('/feature');
        });
    }
    renderAlert(){
        if(this.props.errorMessage){
            return(
                <div className="alert alert-danger">
                    <strong>Oops! </strong> {this.props.errorMessage}
                </div>
            );
        }
    }
    renderTextField(field){
        const {meta: { touched, error }} = field;
        const className = `form-control ${touched && error ? 'is-invalid' : ''}`;
        console.log(touched, error);
        return(
            <div className="form-group">
                <label htmlFor="">{field.label}</label>
                <input 
                    type={(field.label === 'Password') || (field.label === 'Confirm Password') ? 'password' : 'text' }
                    className={className}
                    {...field.input}/>
                < div className="text-help invalid-feedback" >
                    {
                        touched ? error : ""
                    }
                </div>
            </div>
        );
    }
    render(){
        const { handleSubmit } = this.props;
        return(
            <div className="container">
                <form action="" onSubmit={handleSubmit(this.handleForSubmit.bind(this))}>
                    <Field
                        label="Email"
                        name="email"
                        component={this.renderTextField}
                    />
                    <Field
                        label="Password"
                        name="password"
                        component={this.renderTextField}
                    />
                    <Field
                        label="Confirm Password"
                        name="confirmPassword"
                        component={this.renderTextField}
                    />
                    {this.renderAlert()}
                    <button className="btn btn-success">Sign up</button>
                </form>
            </div>
        );
    }
}

function validate(values){
    const errors = {};
    if(!values.email){
        errors.email = "Enter a valid email";
    }
    if(!values.password){
        errors.password = "Enter a password";
    }
    if(!values.confirmPassword){
        errors.confirmPassword = "Enter a password confirmation";
    }
    if (values.password !== values.confirmPassword){
        errors.password = 'Passwords must match';
    }
    return errors;
}

function mapStateToProps(state){
    return { errorMessage: state.auth.error }
}

export default reduxForm({
    validate,
    form: 'signup'
})(
    connect(mapStateToProps, actions)(Signup)
);