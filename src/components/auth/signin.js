import React, { Component }from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';     
import * as actions from '../../actions'
class Signin extends Component {
  handleFormValues = ({ email, password }) => {
    console.log('form sign in values : ',email, password);
    this.props.signinUser({ email, password })
  };
  renderInput({ label, ...field }) {
    const type = label == "Password" ? "password" : "text";
    return (
      <fieldset className="form-group">
        <label>
          {label}:
        </label> 
        <input {...field.input} type={type} className="form-control" />
      </fieldset>
    );
  }

  renderAlert(){
    if(this.props.errorMessage){
      return(
        <div className="alert alert-danger">
          <strong> Please check your email and the password </strong>
        </div>
      )
    }
    return;
  }
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormValues)}>
        <Field name="email" component={this.renderInput} label="Email" />
        <Field name="password" component={this.renderInput} label="Password" />
        {this.renderAlert()}
        <button className="btn btn-primary" action="submit">
          Sign in
        </button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error }
}
export default reduxForm({ form: 'signin'})(connect(mapStateToProps, actions)(Signin));