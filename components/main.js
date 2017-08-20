import React, { Component } from 'react';
import Header from './header';
import Head from 'next/head';

const Main = (props) => (
  <div>
    <Head>

    </Head>
		<Header />
    {props.children}
  </div>
)

export default Main;
