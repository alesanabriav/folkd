import React, { Component } from 'react';
import Flatpickr from 'flatpickr';

class DatePicker extends Component {

  componentDidMount() {
    const _this = this;

    this.flatpickr = new Flatpickr(this.node, {
      onChange(selectedDates, dateStr, instance) {
        return _this.props.onChange(dateStr, selectedDates);
      }
    });

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
      <div className="form-group">
        <input
          ref={node => this.node = node}
          type="text"
          placeholder={placeholderText}
          className="form-control"
        />
      </div>

    )
  }
}

export default DatePicker;