import React from 'react';
import withRedux from "next-redux-wrapper";
import store from '../store';
import Main from '../components/main';
import Register from '../components/users/register/section';

const Index = () => (
  <div>
    <Main>
      <Register />
    </Main>
  </div>
)

export default withRedux(store)(Index);
