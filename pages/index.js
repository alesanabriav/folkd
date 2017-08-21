import React from 'react';
import withRedux from "next-redux-wrapper";
import store from '../store';
import Main from '../components/main';
import Dashboard from '../components/dashboard';

const Index = () => (
  <div>
    <Main>
      <Dashboard/>
    </Main>
  </div>
)

export default withRedux(store)(Index);
