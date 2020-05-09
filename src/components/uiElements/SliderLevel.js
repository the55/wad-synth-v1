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
  handleNumberInput,
  handleOnBlur,
  disabled,
  multiplier,
  decimal,
  unit,
}) => {
  // console.log(min);
  // console.log(max);
  // console.log(step);

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
      {/* {(scaledValue * multiplier).toFixed(decimal)} */}
      <input
        type="number"
        id={id}
        name={id}
        min={min * multiplier}
        max={max * multiplier}
        step={isNaN(step) ? step : step * multiplier} // if step is not "any", multiply the step by the multiplier
        value={
          // sliderValue !== 0 &&
          sliderValue !== '' ? (scaledValue * multiplier).toFixed(decimal) : ''
        }
        onChange={handleNumberInput}
        onBlur={handleOnBlur}
        // readOnly
        // disabled={disabled} // Most sliders need to be disabled while a note is playing
      />
      {unit}
    </label>
  );
};

export default SliderLevel;
