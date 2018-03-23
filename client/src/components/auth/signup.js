import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';
import { connect } from 'react-redux';

class Signup extends Component {
    renderTextField(field){
        const {meta: { touched, error }} = field;
        const className = `form-control ${touched && error ? 'is-invalid' : ''}`;
        console.log(touched, error);
        return(
            <div className="form-group">
                <label htmlFor="">{field.label}</label>
                <input 
                    type={field.label === 'Password' || 'Confirm Password' ? 'password' : 'text' }
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
                <form action="">
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
                    <button className="btn btn-success">Sign up</button>
                </form>
            </div>
        );
    }
}

function validate(values){
    const errors = {};
    console.log(values);
    if(!values.email){
        errors.email = "Enter a valid email";
    }
    if(values.confirPassword !== values.password){
        errors.confirmPassword = 'Passwords must match';
    }
    return errors;
}

export default reduxForm({
    validate,
    form: 'signup'
})(
    connect(null, actions)(Signup)
);