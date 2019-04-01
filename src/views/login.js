import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import keydown from 'react-keydown';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Login extends Component {
  state = {
    email: '',
    password: ''
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  onSubmit = (e) => {
    e.preventDefault()
    console.log(this.state)
    toast.error('🦄 Successfully fetched the data.');
    // localStorage.setItem('token', 'some');
    // this.props.history.push('/')
  }

  render() {
    const { email, password } = this.state;
    return (
      <div className="layout">
        <div className="left-panel">
          <div className="menu">
            <div className="message">
              <span>ENTER</span>
              <span>THE</span>
              <span>THRILL</span>
            </div>
          </div>
          <div className="ipl-logo"/>
        </div>

        <div className="right-panel">
          <div className="login">
            <form className="form" onSubmit={this.onSubmit}>
              <input onChange={this.onChange} name="email" value={email} type="text" placeholder="Email"/>
              <input onChange={this.onChange} name="password" value={password} type="password" placeholder="Password"/>
              <button type="submit">LOGIN</button>
            </form>

          </div>

          <div className="footer">
            <div className="logo"/>
          </div>
        </div>
        <ToastContainer/>
      </div>
    )
  }
}



export default withRouter(keydown(Login));
