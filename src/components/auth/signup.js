import React, { Component }from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';     
import * as actions from '../../actions';
import * as validation from '../form_validation';
class Signup extends Component {
 
 renderField = ({
    input,
    label,
    type,
    meta: { touched, error, warning }
  }) => (
    <div className="form-group">
      <label>{label}</label>
      <div>
        <input {...input} placeholder={label} type={type} className="form-control"/>
        {touched &&
          ((error && <div className="error" >{error}</div>) ||
            (warning && <span>{warning}</span>))}
      </div>
    </div>
  )

  renderAlert = () => {
    if(this.props.errorMessage)
      return(
        <div className="error">
            {this.props.errorMessage}
        </div>
    )
  }
  submit = (formProps) => {
    this.props.SignupUser(formProps);
  } 
  render() {
    const { handleSubmit } = this.props

    return (
      <form onSubmit={handleSubmit(this.submit)}>
        <Field
          name="email"
          type="email"
          component={this.renderField}
          label="Email"
          validate={validation.email}
        />
        <Field
          name="password"
          type="password"
          component={this.renderField}
          label="Password"       
        />
        <Field
          name="passwordConfirm"
          type="password"
          component={this.renderField}
          label="Confirm Password"
        />
        {this.renderAlert()}
        <button className="btn btn-primary" action="submit">
          Sign up
        </button>
      </form>
    );
  }
}
const validate = values => {
  const errors = {}
  if (values.password !== values.passwordConfirm) {
    errors.password = 'Passwords must match'
  }
  return errors
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error }
}
 
export default reduxForm({ 
form: 'signup',
validate
})(connect(mapStateToProps, actions)(Signup));