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
  multiplier,
  decimal,
}) => {
  return (
    <label htmlFor={id} className={`labelLayout`}>
      {label}
      <input
        type="range"
        id={id}
        name={id}
        min={min}
        max={max}
        step={step}
        value={sliderValue}
        onChange={onChange}
        // disabled={disabled} // Most sliders need to be disabled while a note is playing
      />
      {/* {scaledValue ? scaledValue.toFixed(4) : sliderValue} */}
      {/* {scaledValue < 1
        ? `${(scaledValue * 1000).toFixed(0)} ms`
        : `${scaledValue.toFixed(1)} s`} */}
      {(scaledValue * multiplier).toFixed(decimal)}
    </label>
  );
};

export default SliderLevel;
