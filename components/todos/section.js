import React, { Component } from "react";
import dateFns from 'date-fns';
import request from 'axios';
import TodoForm from './form';
import StepForm from './stepForm';
import Todo from './item';
import Step from './step';

class Todos extends Component {
  state = {
    showTodoForm: false,
    showMainTodo: false,
    files: []
  }

  handleUploaded = (files) => {
    this.setState({ files });
  }

  handleSubmit = (variables) => {
    this.props.addTodo(variables)
    .then((todo) => {
      return this.props.addProjectTodo(todo);
    })
    .then((todo) => {
      const { project, client } = this.props;

      const notification = {
        user_id: todo.assigned.id,
        message: `you were assigned to ${todo.title} on the project ${project.name}`,
        url: `?client=${client.id}&project=${project.id}&todo=${todo.id}`
      };

      this.props.addNotification(notification);
      return todo;
    })
    .then(todo => {
      this.state.files.forEach(attachment => {
        this.props.updateTodoAttachment({...attachment, todo_id: todo.id});
      });
    })
  }

  handleSubmitStep = (variables) => {
    const { todo, steps } = this.props;
    variables = {...variables, todo_id: todo.id, position: steps.length + 1};
    return this.props.addTodoStep(variables)
    .then((step) => {
      console.log('after step created', step);
    })
  }

  toggleTodoForm = () => {
    this.setState({ showTodoForm: !this.state.showTodoForm });
  }

  completeTodo = (e) => {
    e.preventDefault();
    const { todo } = this.props;
    this.props.completeTodo(todo);
  }

  renderLoading = () => {
    return (<section className="col-lg-6 todos"><h1>loading...</h1></section>);
  }

  showStepForm = (steps, todo, user) => {
    if(steps.length > 0 && user.id == steps[0].assigned.id) {
      return true
    } else if(steps.length == 0 && todo.hasOwnProperty('assigned') && user.id == todo.assigned.id ) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const {
      project,
      todo,
      steps,
      attachments,
      users,
      user,
      loading,
      uploading,
      addTodoAttachment,
      addStepAttachment
    } = this.props;

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
              user={user}
              todo={todo}
              project={project}
              onSubmit={this.handleSubmit}
              onUploaded={this.handleUploaded}
            />
            : <div/>
          }
        </section>

        <div className="todos-items" style={this.showStepForm(steps, todo, user) ? {height: '60vh'} : {height: '100vh'}}>
        {
          todo.hasOwnProperty('id') ?
          <div style={{background: '#4A59D8'}}>
            <div className="todos-items__header">
              <h2>
                {todo.title}
              </h2>

              {todo.author.id == user.id ?
                <div style={{float: 'right'}}>
                  <button className="btn btn-outline-light btn-sm" onClick={this.toggleTodoForm}>Edit</button> {'  '}
                  <button className="btn btn-outline-light btn-sm" onClick={this.completeTodo}>Close</button>
                </div>
                : ''}

              <span>
                {dateFns.format(todo.created_at, 'dddd DD MMM YY HH:mm')} by <i>{todo.author.id == user.id ? 'me' : todo.author.name}</i>
              </span>

              <span>
                Assigned to: <i>{todo.assigned.id == user.id ? 'me' : todo.assigned.name}</i>
              </span>


              <div className="deadline">
                <span className="deadline__start">{dateFns.format(todo.deadline_start, 'DD MMM')}</span>
                <span className="deadline__end">{dateFns.format(todo.deadline_end, 'DD MMM')}</span>
                <span className="deadline__line"></span>
                <span className="deadline__line--fill" style={{width: `${100 - (100 / (todo.deadline_days / todo.deadline_current))}%`}}></span>
              </div>
            </div>

            <Todo
              attachments={attachments}
              todo={todo}
              user={user}
              addTodoAttachment={addTodoAttachment}
            />

          </div>
          : <div/>
        }

        {steps.length > 0 && steps.map(subtodo =>
          <Step
            key={subtodo.id}
            user={user}
            subtodo={subtodo}
            addStepAttachment={addStepAttachment}
          />
        )}
        </div>

        { this.showStepForm(steps, todo, user)
          ? <StepForm
              className="step-form"
              onSubmit={this.handleSubmitStep}
              project={project}
              users={users}
            />
          : <div/>
        }

        <style jsx>{`
          .todos {
            background: rgba(0,0,0,.55);
            padding-top: 20px;
            height: calc(100vh - 60px);
            color: #fff;
            overflow: hidden;
            position: relative;
            padding: 0;
          }

          @media (max-width: 700px) {
            .todos {
              height: calc(60vh - 60px);
            }

          }

          .todos header {
            width: 100%;
            display: flex;
            justify-content: space-between;
            padding: 20px;
            box-shadow: 3px 3px 3px 0 rgba(0,0,0, .10);
            height: 80px;
            position: relative;
            z-index: 10;
          }

          .step-form {
            position: absolute;
            bottom: 0;
          }

          .todos h5 {
            color: #fff;
            margin-bottom: 20px
          }

          .todos-items {
            padding: 0 30px;
            overflow-y: auto;
            overflow-x: hidden;

          }

          .todos-items__header {
            margin-bottom: 10px;
            padding: 20px;
          }

          .todos-items__header span {
            margin-right: 10px;
            font-size: 14px;
          }

          .todos-items__header span i {
            font-weight: 200;
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
            height: 5px;
            background: rgba(0,0, 0, .16);
            z-index: 1;
            left: 0;
          }

          .deadline__line--fill {
            position: absolute;
            width: 50%;
            height: 5px;
            background: #fff;
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
