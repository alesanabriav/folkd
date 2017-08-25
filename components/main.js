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
      <link rel="stylesheet" href="react-datepicker/dist/react-datepicker.css" />
    </Head>
		<Header />

    <div className="container-fluid">
      {props.children}
    </div>

    <style global jsx>{`
      body {
        background: #54558D;
        font-size: 14px;
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

      .btn {
        cursor: pointer;
      }

      .btn-outline-light:hover, .btn-light:hover {
        color: #333;
      }

      .todo-result {
        margin-top: 20px;
        padding: 20px;
        background: rgba(255,255,255,.8);
        color: #333;
      }

      .todo-result img {
        max-width: 100%;
      }

      .todo-result pre {
        color: #444;
      }

      .todo__item__content img {
        max-width: 100%;
      }

      .react-datepicker-wrapper, .react-datepicker__input-container {
        width: 100%;
      }
      .react-datepicker__day--keyboard-selected {
        background-color: rgba(0,0,0,.5)
      }
    `}</style>
  </div>
)

export default Main;
