import React, { Component } from 'react';
import Header from './header';
import Head from 'next/head';

const Main = (props) => (
  <div>
    <Head>
      <meta charset="UTF-8" />
    	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
    	<meta http-equiv="X-UA-Compatible" content="ie=edge" />
    	<title>Folkders</title>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css" />
      <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" />
    	<link rel="stylesheet" href="http://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css" />
    </Head>
		<Header />

    <div className="container-fluid">
      {props.children}
    </div>

    <style global jsx>{`
      body {
        background: #54558D;
      }
      ul {
        padding: 0;
      }

      li {
        list-style: none
      }

      a:hover {
        text-decoration: none;
      }
    `}</style>
  </div>
)

export default Main;
