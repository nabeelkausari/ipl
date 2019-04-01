import React, { Component } from 'react';

export default ComposedComponent => {
  class UnAuth extends Component {

    checkUnAuth = () => {
      let token = localStorage.getItem('token');
      if (token) {
        this.props.history.push('/home');
      }
    }

    componentDidMount() {
      this.checkUnAuth()
    }

    componentDidUpdate() {
      this.checkUnAuth()
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  return UnAuth
}

