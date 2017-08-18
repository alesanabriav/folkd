import React, { Component } from 'react';
import Header from './header';

const Main = () => (
  <div>
		<Header />
    {React.cloneElement(this.props.children, this.props)}
  </div>
)

export default Main;
