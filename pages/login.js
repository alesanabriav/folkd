import React from 'react';
import withRedux from "next-redux-wrapper";
import store from '../store';
import Main from '../components/main';
import Login from '../components/users/login';

const LoginPage = () => (
  <div>
    <Main>
      <Login/>
    </Main>
  </div>
)

export default withRedux(store)(LoginPage);
