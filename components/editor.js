import React, { Component } from 'react';
import DOMPurify from 'dompurify';
import ColorPicker from './colorPicker';

class Editor extends Component {

  state = {
    bold: false,
    list: false,
    align: {},
    showFontsize: false,
    showTextAlign: false,
    showTextColor: false
  }

  componentDidMount() {
    const node = this.editorNode;
		const Squire = require('squire-rte');
		this.editor = new Squire(node);
		this.editor.addEventListener('keydown', (e) => {
      this.handleResult(this.editor.getHTML());
		});

    this.editor.addEventListener('input', () => {
      this.handleResult(this.editor.getHTML());
    });


    // document.addEventListener('click', this.handleGlobalClick, true)
  }

  handleGlobalClick = (e) => {
    const el = this.editorNode;
    console.log(el, e.target);
    if (el.contains(e.target)) {
      console.log('inside');
    }
  }

  handleResult = (html) => {
    const result = DOMPurify.sanitize(html);
    this.props.onChange(result);
  }

  handleFontSize = (sizeName, e) => {
    if(e) e.preventDefault();
    let size = '14px';
    if(sizeName == 'small') size = '10px';
    if(sizeName == 'normal') size = '14px';
    if(sizeName == 'large') size = '22px';
    this.editor.setFontSize(size);
    this.toggleFontSize();
  }

  handleBold = (e) => {
    e.preventDefault();
    this.setState({ bold: !this.state.bold });
    if(this.editor.hasFormat('b')) {
      this.editor.removeBold();
    } else {
      this.editor.bold();
    }
  }

  handleList = (e) => {
    e.preventDefault();
    this.setState({ list: !this.state.list });
    if(this.editor.hasFormat('ul') && this.editor.hasFormat('li')) {
      this.editor.removeList();
    } else {
      this.editor.makeUnorderedList();
    }
  }

  handleAlign = (position, e) => {
    e.preventDefault();
    console.log(this.editor.hasFormat('text-align: center'));
    this.editor.setTextAlignment(position);
    this.toggleTextAlign();
  }

  handleItalic = (e) => {
    if(e) e.preventDefault();
    this.editor.italic()
  }

  handleClean = (e) => {
    if(e) e.preventDefault();
    this.editor.removeAllFormatting();
  }

  toggleFontSize = (e) => {
    if(e) e.preventDefault();
    this.setState({ showFontsize: !this.state.showFontsize })
  }

  toggleTextAlign = (e) => {
    if(e) e.preventDefault();
    this.setState({ showTextAlign: !this.state.showTextAlign })
  }

  toggleTextColor = (e) => {
    if(e) e.preventDefault();
      this.setState({ showTextColor: !this.state.showTextColor })
  }

  handleTextColor = (color) => {
    if(this.hasOwnProperty('editor')) {
      this.editor.setTextColour(color);
    }
  }

  render() {
    return (
      <div ref={container => this.container = container}>
        <div className="editor-toolbar">
          <div className="dropdown">
            <button className="btn btn-sm dropdown-toggle" onClick={this.toggleFontSize}>
              <span className="fa fa-font"></span>
            </button>
            <div className={`dropdown-menu ${this.state.showFontsize ? 'show' : ''}`} aria-labelledby="dropdownMenuButton">
              <a className="dropdown-item" onClick={this.handleFontSize.bind(null, 'small')}>Small</a>
              <a className="dropdown-item" onClick={this.handleFontSize.bind(null, 'normal')}>Normal</a>
              <a className="dropdown-item" onClick={this.handleFontSize.bind(null, 'large')}>Large</a>
            </div>
          </div>

          <button className="btn btn-sm" onClick={this.handleBold}><span className="fa fa-bold"></span></button>
          <button className="btn btn-sm" onClick={this.handleItalic}><span className="fa fa-italic"></span></button>
          <button className="btn btn-sm" onClick={this.handleList}><span className="fa fa-list"></span></button>
          <div className="dropdown">
            <button className="btn btn-sm dropdown-toggle" onClick={this.toggleTextAlign}>
              <span className="fa fa-align-left"></span>
            </button>
            <div className={`dropdown-menu ${this.state.showTextAlign ? 'show' : ''}`} aria-labelledby="dropdownMenuButton">
              <a className="dropdown-item" onClick={this.handleAlign.bind(null, 'left')}>left</a>
              <a className="dropdown-item" onClick={this.handleAlign.bind(null, 'center')}>center</a>
              <a className="dropdown-item" onClick={this.handleAlign.bind(null, 'right')}>right</a>
            </div>
          </div>
          <button className="btn btn-sm" onClick={this.handleClean}><span className="fa fa-eraser"></span></button>
          <div className="dropdown">
            <button className="btn dropdown-toggle" onClick={this.toggleTextColor}><span className="ion-android-color-palette"></span></button>
            <div className={`dropdown-menu ${this.state.showTextColor ? 'show' : ''}`}>
              <ColorPicker onChange={this.handleTextColor} />
            </div>
          </div>
        </div>

        <div className="editor" ref={editor => this.editorNode = editor }></div>
        <style jsx>{`
          .editor {
            color: #333;
            min-height: 200px;
            background: #fff;
            padding: 20px;
          }

          .editor:focus {
            outline: none;
          }

          .editor-toolbar {
            width: 100%;
            background: #fff;
          }

          .editor-toolbar .btn {
            background: #fff;
          }

          .dropdown {
            display: inline-block;
          }


        `}</style>
      </div>
    )
  }
}

export default Editor;
