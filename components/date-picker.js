import React, { Component } from 'react';
import Flatpickr from 'flatpickr';

class DatePicker extends Component {

  componentDidMount() {
    const _this = this;
    let options = {
      altInput: true,
      onChange(selectedDates, dateStr, instance) {
        return _this.props.onChange(dateStr, selectedDates);
      }
    };

    options = {...options, ...this.props.options};

    this.flatpickr = new Flatpickr(this.node, options);

    if (this.props.hasOwnProperty('value')) {
      this.flatpickr.setDate(this.props.value, false)
    }
  }

  componentWillReceiveProps(props) {
    if (this.props.hasOwnProperty('value')) {
      this.flatpickr.setDate(this.props.value, false)
    }
  }

  componentWillUnmount() {
    this.flatpickr.destroy();
  }

  render() {
    const { placeholderText } = this.props;

    return (
        <input
          ref={node => this.node = node}
          type="text"
          placeholder={placeholderText}
          className="form-control"
        />

    )
  }
}

export default DatePicker;
