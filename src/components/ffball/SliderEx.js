/* eslint-disable react/prop-types */

import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';

export default class SliderEx extends React.Component{
  render() {
    const createSliderWithTooltip = Slider.createSliderWithTooltip;
    const Range = createSliderWithTooltip(Slider.Range);
    const Handle = Slider.Handle;
    const wrapperStyle = { width: 400, margin: 50 };

    const handle = (props) => {
      const { value, dragging, index, ...restProps } = props;
      return (
        <Tooltip
          prefixCls="rc-slider-tooltip"
          overlay={value}
          visible={dragging}
          placement="top"
          key={index}
        >
          <Handle {...restProps} />
        </Tooltip>
      );
    };

    
    return (
      <div>
        <div style={wrapperStyle}>
          <p>Range with custom handle</p>
          <Range min={0} max={20} defaultValue={[3, 10]} tipFormatter={value => `${value}%`} />
        </div>
      </div>
    )
  }
}