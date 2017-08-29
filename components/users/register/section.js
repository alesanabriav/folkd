import React, { Component } from 'react';
import request from 'axios';
import Team from './team';
import Company from './company';
import Invitations from './invitations';
import User from './basic';

class Register extends Component {
  state = {
    company: {},
    user: {},
    showTeam: true,
    showCompany: false,
    showUser: false,
    showInvitations: false,
    omitInvitations: false
  }

  addTeam = (data) => {
    if(data.team_name) {
      request
      .post('register/team', data)
      .then(res => {
        if(res.data.name !== null || res.data.name !== '') {
          this.setState({
            company: res.data,
            showTeam: false,
            showUser: true,
            omitInvitations: true
          })
        } else {
          this.setState({
            company: res.data,
            showTeam: false,
            showCompany: true
          })
        }

      })
    }

  }

  addCompany = (data) => {
    data = {...this.state.company, ...data};
    request
    .post('register/company', data)
    .then(res => {
      this.setState({
        company: data,
        showCompany: false,
        showUser: true
      });
    })
  }

  addUser = (data) => {
    data = {...data, company_id: this.state.company.id};
    request
    .post('register/user', data)
    .then(res => {
      const {token, user} = res.data;
      localStorage.setItem('folk-token', token);
      if(this.state.omitInvitations) {
        return window.location = '/login?verified=0';
      }
      this.setState({
        user: user,
        showUser: false,
        showInvitations: true
      });
    })
  }

  sendInvitations = (data) => {
    window.location = '/';
  }

  render() {
    const {
      company,
      user,
      showTeam,
      showCompany,
      showUser,
      showInvitations
    } = this.state;

    return (
      <div className="register">
        <div className="col-lg-4 register__container">
          <h3>Register Team</h3>
          <div className={showTeam ? "register__section--show" : "register__section"}>
            <Team
              onSubmit={this.addTeam}
            />
          </div>
          <div className={showCompany ? "register__section--show" : "register__section"}>
            <Company
              onSubmit={this.addCompany}
            />
          </div>
          <div className={showUser ? "register__section--show" : "register__section"}>
            <User
              onSubmit={this.addUser}
            />
          </div>
          <div className={showInvitations ? "register__section--show" : "register__section"}>
            <Invitations
              onSubmit={this.sendInvitations}
            />
          </div>
        </div>

        <style jsx>{`
            .register__container {
              padding: 20px;
              background: rgba(0,0,0,.2);
              height: calc(100vh - 60px);
              margin-left: -15px;
              box-shadow: 0 0 20px rgba(0,0,0,.1)
            }

            .register__container h3 {
              color: #fff;
              margin-bottom: 20px;
            }

            .register__section {
              display: none;
            }

            .register__section--show {
              display: block;
            }


        `}</style>
      </div>
    )
  }
}

export default Register;
