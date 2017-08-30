import React, { Component } from 'react';
import Header from './header';
import Head from 'next/head';
import Router from 'next/router';

class Main extends Component {
  render() {
    const { url = {}, users = {} } = this.props;
    return (
      <div>
        <Head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta http-equiv="X-UA-Compatible" content="ie=edge" />
          <title>Folkders</title>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css" />
          <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro" rel="stylesheet" />
          <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css" />
          <link rel="stylesheet" href="react-datepicker/dist/react-datepicker.css" />
        </Head>
        <Header user={users.current} />

        <div className="container-fluid">
          {React.cloneElement(this.props.children, { url } )}
        </div>

        <style global jsx>{`
          body {
            background:  #4A32D2;
            font-size: 14px;
            font-family: 'Source Sans Pro', sans-serif;
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
  }
}


export default Main;
