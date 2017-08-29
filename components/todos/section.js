import React, { Component } from "react";
import moment from 'moment';
import request from 'axios';
import MarkdownIt from 'markdown-it';
import taskLists from 'markdown-it-task-lists';
import TodoForm from './form';
import StepForm from './stepForm';

class Todos extends Component {
  state = {
    showTodoForm: false,
    showMainTodo: false
  }

  handleSubmit = (variables) => {
    this.props.addTodo(variables).then((todo) => {
      this.props.addProjectTodo(todo);
    })
  }

  handleSubmitStep = (variables) => {
    const { todo, steps } = this.props;
    variables = {...variables, todo_id: todo.id, position: steps.length + 1};
    return this.props.addTodoStep(variables);
  }

  toggleTodoForm = () => {
    this.setState({ showTodoForm: !this.state.showTodoForm });
  }

  renderMD(content) {
    const md = new MarkdownIt();
		md.use(taskLists);
		return md.render(content);
  }

  handleUpload = (e) => {
    const { todo, user } = this.props;
    const token = localStorage.getItem('folk-token');
    const data = new FormData();
    data.append('user_id', user.id);
    data.append('todo_id', todo.id);
    data.append('file', e.target.files[0]);

    const config = {
      headers: {'Authorization': `Bearer ${token}`}
    };

    request.post('/upload', data, config)
    .then((res) => {
      this.props.addTodoAttachment(res.data);
    })
  }

  getDriveUrl = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('folk-token');
    const {user} = this.props;
    const state = encodeURIComponent(JSON.stringify({id: user.id}));
    const config = {
      headers: {'Authorization': `Bearer ${token}`}
    };

    request
    .post('/gaoauth-url', {state}, config)
    .then(res => window.location = res.data.url);
  }

  renderLoading = () => {
    return (<section className="col-lg-6 todos"><h1>loading...</h1></section>);
  }

  render() {
    const { project, todo, steps, attachments, users, user, loading } = this.props;
    const { showTodoForm } = this.state;
    if(loading) return this.renderLoading();

    return (
      <section className="col-lg-6 col-md-6 todos">
        <header>
          <h5>{project.id ? `Task for ${project.name}` : 'Select a project'}</h5>
        </header>

        <section>
          { project.hasOwnProperty('id') && !todo.hasOwnProperty('id') || showTodoForm ?
            <TodoForm
              editTodo={showTodoForm}
              selectTodo={this.selectTodo}
              users={users}
              todo={todo}
              project={project}
              onSubmit={this.handleSubmit}
            />
            : <div/>
          }
        </section>

        <div className="todos-items">
        {
          todo.hasOwnProperty('id') ?
          <div>
            <div className="todos-items__header">
              <h2>
                {todo.title}   {todo.author.id == user.id ?
                  <button className="btn btn-outline-light btn-sm" onClick={this.toggleTodoForm}>Edit</button>
                  : ''}
              </h2>

              <span>
                By: <i>{todo.author.id == user.id ? 'me' : todo.author.name}</i>
              </span>

              <span>
                Assigned: <i>{todo.assigned.name}</i>
              </span>

              <span>
                Created: <i>{moment(todo.created_at).format('dddd DD MMM YY HH:mm')}</i>
              </span>

              <div className="deadline">
                <span className="deadline__start">{moment(todo.deadline_start).format('DD MMM')}</span>
                <span className="deadline__end">{moment(todo.deadline_end).format('DD MMM')}</span>
                <span className="deadline__line"></span>
                <span className="deadline__line--fill" style={{width: `${100 - (100 / (todo.deadline_days / todo.deadline_current))}%`}}></span>
              </div>
            </div>

            <section className="todo__item">
              <div className="todo__item__content">
                <div dangerouslySetInnerHTML={{__html: this.renderMD(todo.content)}}/>
              </div>
              <div className="todo__item__upload">
                <ul>
                {attachments.map(attachment => {
                  return <li><a target="blank" href={attachment.url}>{attachment.url}</a></li>
                })}
                </ul>
                {user.has_drive ?
                <form encType="multipart/form-data">
                  <input type="file" name="file" onChange={this.handleUpload} />
                </form>
                : <a href="#" onClick={this.getDriveUrl}>Upload files</a>}
              </div>
            </section>
          </div>
          : <div/>
        }

        {steps && steps.map((subtodo, ind) =>
          <section key={ind} className="todo__item">
            <header>
              <span><h4>Step: {subtodo.position}</h4></span>
              <span>By: {subtodo.author.name}</span>
              <span>Date: {moment(subtodo.created_at).format('dddd DD MMM YY HH:mm')}</span>
            </header>
             <div className="todo__item__content">
               <div dangerouslySetInnerHTML={{__html: this.renderMD(subtodo.content)}}/>
            </div>
          </section>
        )}
        </div>

        { todo.hasOwnProperty('id') && (user.id == todo.author.id || user.id == todo.assigned.id)
          ? <StepForm onSubmit={this.handleSubmitStep} project={project} />
          : <div/> }

        <style jsx>{`
          .todos {
            background: rgba(0,0,0,.6);
            padding-top: 20px;
            height: calc(100vh - 60px);
            color: #fff;
            overflow-y: auto;
            position: relative;
          }

          @media (max-width: 700px) {
            .todos {
              height: calc(60vh - 60px);
            }

          }

          .todos header {

          }

          .todos h5 {
            color: #fff;
            margin-bottom: 20px
          }

          .todos-items {
            margin-top: 20px;
          }

          .todos-items__header {
            margin-bottom: 10px;
          }

          .todos-items__header span {
            margin-right: 10px;
            font-size: 14px;
          }

          .todos-items__header span i {
            font-weight: 200;
          }

          .todo__item {
            background: rgba(255,255,255, .1);
            margin-bottom: 4px;
            margin-bottom: 20px;
          }

          .todo__item header {
            font-size: 13px;
            margin-bottom: 10px;
            padding: 10px 20px 0 20px;
            display: flex;
            align-items: center;
          }

          .todo__item header span {
            display: inline-block;
            margin-right: 10px;
          }

          .todo__item header span i {
            font-weight: 200;
          }

          .todo__item header button {
            display: inline-block;
            text-align: right;
          }

          .todo__item__content {
            background: rgba(255,255,255,.8);
            padding: 20px;
            color: #1F293B;
          }

          .todo__item__upload {
            padding: 20px;
          }

          .deadline {
            position: relative;
            width: 200px;
            height: 20px;
            margin: 40px 0 0 0;
          }

          .deadline__line {
            position: absolute;
            width: 100%;
            height: 10px;
            background: rgba(255,255, 255, .1);
            z-index: 1;
            left: 0;
          }

          .deadline__line--fill {
            position: absolute;
            width: 50%;
            height: 10px;
            background: rgba(0,0, 0, .5);
            z-index: 2;
            left: 0;
          }

          .deadline__indicator {
            position: absolute;
            width: 10px;
            height: 10px;
            background: rgba(255, 255, 255, .9);
            left: 50%;
          }

          .deadline__start {
            position: absolute;
            left: 0;
            bottom: 20px;
            font-size: 12px;
          }

          .deadline__end {
            position: absolute;
            bottom: 20px;
            right: 0;
            font-size: 12px;
          }



        `}</style>
      </section>
    );
  }
}

export default Todos;
