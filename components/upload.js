import React, { Component } from 'react';
import request from 'axios';
import Dropzone from 'react-dropzone';

class Upload extends Component {

  state = {
    message: 'Drop files or select it.',
    uploadProgress: '',
    files: []
  }

  getDriveUrl = (e) => {
		if(e) e.preventDefault();
		const token = localStorage.getItem('folk-token');
		const { user } = this.props;
		const state = encodeURIComponent(JSON.stringify({id: user.id}));

		const config = {
			headers: {'Authorization': `Bearer ${token}`}
		};

		request
  		.post('/gaoauth-url', { state }, config)
  		.then(res => window.location = res.data.url);
	}

  handleDrop = (acceptedFiles, rejectedFiles) => {
    const _this = this;
    const token = localStorage.getItem('folk-token');
    const { data } = this.props;
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      onUploadProgress(progressEvent) {
        const uploadProgress = Math.round(progressEvent.loaded / progressEvent.total * 100);
        _this.setState({ uploadProgress });
      }
    };

    this.setState({message: 'uploading files'});

    const requests = acceptedFiles.map(file => {
			const formdata = new FormData();
      Object.keys(data).forEach(key => {
        formdata.append(key, data[key]);
      });
			formdata.append('file', file);
			return request.post('/upload', formdata, config);
		});

		request.all(requests)
			.then(res => {
        const files = res.map(file => file.data);

        if(typeof this.props.onUploaded == 'function') {
          this.props.onUploaded(files.concat(this.state.files));
        }

        this.setState({
          message: 'Drop files or select',
          files: this.state.files.concat(files)
        });

      })
      .catch(error => {
        if(error.hasOwnProperty('response') && error.response.status == 500) {
          this.getDriveUrl();
        } else {
          console.log(error);
        }
      });
  }

  render() {
    const { message, uploadProgress } = this.state;

    return (
      <Dropzone
        style={{textAlign: 'center', paddingTop: '20px', background: 'rgba(0,0,0,.1)', color: '#fff'}}
        onDrop={this.handleDrop}
        className="form-control"
        activeClassName="form-control--drop"
      >
         <p>{message}</p>
     </Dropzone>
    )
  }
}

export default Upload;
