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
    showStepForm: false,
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
      const { project, client, assigned } = this.props;

      const notification = {
        user_id: assigned.id,
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
      .then(() => this.props.getTodo(todo.id))
      .then(() => {
        const { project, client, assigned } = this.props;

        const notification = {
          user_id: assigned.id,
          message: `you were assigned to ${todo.title} on the project ${project.name}`,
          url: `?client=${client.id}&project=${project.id}&todo=${todo.id}`
        };

        this.props.addNotification(notification);
      })
      .then(() => this.setState({showStepForm: false}))
      .catch(err => console.log('addTodoStep', err));
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

  showStepForm = () => {
    const { user, assigned } = this.props;

    return true;
    if(assigned.hasOwnProperty('user') && user.id == assigned.id ) {
      return true;
    } else {
      return false;
    }
  }

  toggleStepForm = (e) => {
    if(e) e.preventDefault();
    this.setState({ showStepForm: !this.state.showStepForm });
  }

  render() {
    const {
      project,
      todo,
      steps,
      attachments,
      assigned,
      users,
      user,
      loading,
      uploading,
      addTodoAttachment,
      addStepAttachment,
      deadline_days,
      deadline_current
    } = this.props;

    const { showTodoForm, showStepForm } = this.state;
    const deadline = 100 - Math.ceil(100 / (parseInt(deadline_days) / parseInt(deadline_current)));

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

        <div className="todos-items">
        {
          todo.hasOwnProperty('id') ?
          <div style={{background: '#4A59D8'}}>
            <div className="todos-items__header">
              <div className="row">
                <div className="col-lg-5">
                  <h3>{todo.title}</h3>
                  <span>
                    {dateFns.format(todo.created_at, 'dddd DD MMM YY HH:mm')} by <i>{todo.author.id == user.id ? 'me' : todo.author.name}</i>
                  </span>

                  <span>
                    Assigned to: <i>{assigned.id == user.id ? 'me' : assigned.name}</i>
                  </span>
                </div>
                <div className="col-lg-4">
                  <div className="deadline">
                    <span className="deadline__start">{dateFns.format(todo.deadline_start, 'DD MMM')}</span>
                    <span className="deadline__end">{dateFns.format(todo.deadline_end, 'DD MMM')}</span>
                    <span className="deadline__line"></span>
                    <span className="deadline__line--fill" style={{width: `${deadline == 0 ? 100 : deadline}%`}}></span>
                  </div>
                </div>
                <div className="col-lg-3">
                  {assigned.id == user.id && steps.length > 0 && todo.is_completed == false ?
                    <button className="btn btn-primary btn-replay" onClick={this.completeTodo}>Finish</button>
                    : ''}
                  {assigned.id == user.id && steps.length == 0 ?
                    <button className="btn btn-primary btn-replay" onClick={this.toggleStepForm}>Replay</button>
                    : ''}
                </div>
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

        { todo.hasOwnProperty('id') && showStepForm
          ? <StepForm
              className="step-form"
              onSubmit={this.handleSubmitStep}
              onCancel={this.toggleStepForm}
              project={project}
              users={users}
            />
          : <div/>
        }

        {steps.length > 0 && steps.map((subtodo, i) =>
          <Step
            main={i == 0}
            key={subtodo.id}
            user={user}
            assigned={assigned}
            subtodo={subtodo}
            onOpenForm={this.toggleStepForm}
            addStepAttachment={addStepAttachment}
          />
        )}
        </div>

        <style jsx>{`
          .todos {
            background: rgba(0,0,0,.55);
            padding-top: 20px;
            height: calc(100vh - 60px);
            color: #fff;
            overflow-y: auto;
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
            height: 70px;
            position: relative;
            z-index: 10;
          }

          .todos header h5 {
            font-weight: 300;
          }

          .step-form {
            position: absolute;
            bottom: 0;
          }

          .todos h5 {
            color: #fff;
            margin-bottom: 20px
          }

          .btn-replay {
            width: 150px;
            float: right;
          }

          .todos-items {
            padding: 0 30px;
          }

          .todos-items__header {
            margin-bottom: 10px;
            padding: 10px 20px;
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
            width: 100%;
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
