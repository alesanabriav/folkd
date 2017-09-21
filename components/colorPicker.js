import React, { Component } from 'react';
import SimpleColorPicker from 'simple-color-picker';

class ColorPicker extends Component {
  componentDidMount() {
    const colorPicker = new SimpleColorPicker({
      color: '#333',
      background: '#FFFFFF',
      el: document.body,
      width: 150,
      height: 150
    });

    colorPicker.appendTo(this.colorpicker);

    colorPicker.onChange((color) => {
      this.props.onChange(color);
    })
  }

  render() {
   return (
      <div className="color-picker" ref={colorpicker => this.colorpicker = colorpicker}></div>
   )
  }
}

export default ColorPicker;
