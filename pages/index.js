import React from 'react';
import withRedux from "next-redux-wrapper";
import strore from '../store';
import Main from '../components/main';
import Dashboard from '../components/dashboard';

const Main = () => (
  <div>
    <Main>
      <Dashboard/>
    </Main>
  </div>
)

export default withRedux(store)(Main);
