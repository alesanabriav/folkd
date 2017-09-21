import React, { Component } from 'react';
import dateFns from 'date-fns';
import MarkdownIt from 'markdown-it';
import taskLists from 'markdown-it-task-lists';
import Upload from '../upload';

class Step extends Component {

  handleUploaded(files) {
    files.forEach(file => {
      this.props.addStepAttachment(file);
    })
  }

  handleReply = (e) => {
    e.preventDefault();
    this.props.onOpenForm();
  }

  render() {
    const { subtodo, user, assigned, main } = this.props;
    const uploadData = { user_id: user.id, step_id: subtodo.id };

   return (
     <section className="todo__item">
       <header>
         <div className="row">
           <div className="col-lg-9">
             <span><h4>Step: {subtodo.position}</h4></span>
             <span>By: {subtodo.author.name}</span>
             <span>Date: {dateFns.format(subtodo.created_at, 'dddd DD MMM YY HH:mm')}</span>
           </div>
           <div className="col-lg-3">
             {main && assigned.id == user.id ?
               <button className="btn btn-main" onClick={this.handleReply}>Reply</button>
             : ''}
           </div>
         </div>
       </header>
        <div className="todo__item__content">
          <div dangerouslySetInnerHTML={{__html: subtodo.content}}/>
       </div>

       <div className="todo__item__upload">

         <Upload
          customStyle={{color: '#3D3D3D'}}
          data={uploadData}
          user={user}
          onUploaded={this.handleUploaded.bind(this)}
        />

         <ul className="todo__item__uploads">
           {subtodo.attachments.map(attachment =>
             <li>
               <a target="blank" href={attachment.url}>{attachment.name}</a>
             </li>
           )}
         </ul>
       </div>
       <style jsx>{`
         .todo__item {
           background: #F7F7F7;
           margin-bottom: 4px;
           margin-bottom: 20px;
         }

         .todo__item header {
           font-size: 13px;
           color: #3D3D3D;
           padding: 10px 20px;
           background: #fff;
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
           background: #F7F7F7;
           padding: 20px;
           color: #1F293B;
         }

         .todo__item__upload {
           padding: 20px;
         }

         .todo__item__uploads {
           margin-top: 20px;
         }
       `}</style>
     </section>
   )
  }
}

export default Step;
