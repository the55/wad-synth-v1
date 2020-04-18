import React from 'react';

const SliderLevel = ({
  label,
  id,
  min,
  max,
  step,
  sliderValue,
  scaledValue,
  onChange,
  disabled,
}) => {
  return (
    <label htmlFor={id}>
      <h3>{label}</h3>
      <input
        type="range"
        id={id}
        name={id}
        min={min}
        max={max}
        step={step}
        value={sliderValue}
        onChange={onChange}
        disabled={disabled} // Most sliders need to be disabled while a note is playing
      />
      {/* {scaledValue ? scaledValue.toFixed(4) : sliderValue} */}
      {/* {scaledValue < 1
        ? `${(scaledValue * 1000).toFixed(0)} ms`
        : `${scaledValue.toFixed(1)} s`} */}
      {(scaledValue * 100).toFixed(0)}
    </label>
  );
};

export default SliderLevel;
