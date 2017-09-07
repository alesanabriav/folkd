import React, { Component } from 'react';
import Header from './header';
import Head from 'next/head';

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
          <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700" rel="stylesheet" />
          <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css" />
          <link rel="stylesheet" href="https://unpkg.com/flatpickr/dist/flatpickr.min.css" />

        </Head>
        <Header user={users.current} />

        <div className="container-fluid">
          {this.props.children}
        </div>

        <style global jsx>{`
          body {
            background: #4A59D8;
            font-size: 14px;
            font-family: 'Roboto', sans-serif;
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
            border-radius: 0;
          }

          .btn-primary {
            background: rgba(0,0,0, .50);
            border: none
          }

          .btn-primary:hover {
            background: rgba(0,0,0, .60);
          }

          .btn-secondary {
            background: rgba(0,0,0, .20);
            border: none
          }

          .btn-secondary:hover {
            background: rgba(0,0,0, .30);
          }

          input.form-control {
            border: none;
            border-radius: 0;
          }

          .btn-outline-light:hover, .btn-light:hover {
            color: #333;
          }

          .form-control--drop {
            opacity: .5;
            border: 2px solid rgba(255,255,255,.8) !important;
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
