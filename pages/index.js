import React from 'react';
import withRedux from "next-redux-wrapper";
import store from '../store';
import Main from '../components/main';
import Dashboard from '../components/dashboard';

class Index extends React.Component {
  render() {
    console.log(this.props.url);

    return (
      <div>
        <Main {...this.props}>
          <Dashboard />
        </Main>
      </div>
    )
  }
}

export default withRedux(store)(Index);
