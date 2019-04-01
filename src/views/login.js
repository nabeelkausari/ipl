import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import keydown from 'react-keydown';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import {ip_address} from "../constants"

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
    axios.post(`${ip_address}/vote/login`, this.state)
      .then(({ data: { token, email, fullname, score }}) => {
        toast('🦄 Login Success')
        localStorage.setItem('token', token);
        localStorage.setItem('email', email);
        localStorage.setItem('fullname', fullname);
        localStorage.setItem('score', score);
        this.props.history.push('/')
      })
      .catch(err => toast.error(` 😱 ${err.response.data.message}`))
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
