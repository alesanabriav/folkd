import React, { Component } from 'react';
import withRedux from "next-redux-wrapper";
import store from '../store';
import Main from '../components/main';
import Login from '../components/users/login';

class LoginPage extends Component {
  render() {
    console.log(this.props)
    return (
      <div>
        <Main>
          <Login/>
        </Main>
      </div>
    )
  }
}

export default withRedux(store, state => state)(LoginPage);
