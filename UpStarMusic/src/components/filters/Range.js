import React, { Component } from 'react';
import Slider from 'react-input-range';

class Range extends Component {
  onChange(component, values) {
    const { input: { onChange } } = this.props;

    onChange(values);
  }

  render() {
    const { input: { value } } = this.props;

    return (
      <div className="range-slider">
        <label>{this.props.label}</label>
        <Slider
          onChange={this.onChange.bind(this)}
          minValue={parseInt(this.props.range.min)}
          maxValue={parseInt(this.props.range.max)}
          value={value || this.props.range}
        />
      </div>
    );
  }
};

Range.defaultProps = {
  range: { min: 0, max: 100 }
};

export { Range };
