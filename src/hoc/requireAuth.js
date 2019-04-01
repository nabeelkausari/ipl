import React, { Component } from 'react';

export default ComposedComponent => {
  class Authentication extends Component {

    checkAuth = () => {
      let token = localStorage.getItem('token');
      if (!token) {
        this.props.history.push('/')
      }
    }

    componentDidMount() {
      this.checkAuth()
    }

    componentDidUpdate() {
      this.checkAuth()
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  return Authentication
}
