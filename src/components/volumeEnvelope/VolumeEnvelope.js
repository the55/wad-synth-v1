import React, { useContext, useState } from 'react';
import VolumeEnvelopeContext from '../../context/volumeEnvelopeContext/volumeEnvelopeContext';
import OscillatorContext from '../../context/oscillatorContext/oscillatorContext';
import { scaleLog, scalePow } from 'd3-scale';
import SliderTime from '../uiElements/SliderTime';
import SliderLevel from '../uiElements/SliderLevel';

const VolumeEnvelope = () => {
  const volumeEnvelopeContext = useContext(VolumeEnvelopeContext);
  const {
    volumeEnvelopeAttack,
    volumeEnvelopeDecay,
    volumeEnvelopeSustain,
    volumeEnvelopeHold,
    volumeEnvelopeRelease,
    setVolumeEnvelopeAttack,
    setVolumeEnvelopeDecay,
    setVolumeEnvelopeSustain,
    setVolumeEnvelopeHold,
    setVolumeEnvelopeRelease,
  } = volumeEnvelopeContext;

  const oscillatorContext = useContext(OscillatorContext);
  const { notePlaying } = oscillatorContext;

  // console.log(volumeEnvelopeAttack);
  // console.log(volumeEnvelopeDecay);

  // const [release, setRelease] = useState('1');

  let disabled = notePlaying ? true : false;

  // Convert the linear scale of the slider to a Power Scale, so that there's more detail in the low numbers
  // let scale = scalePow()
  //   .range([volumeEnvelopeAttack.min, volumeEnvelopeAttack.max])
  //   .domain([volumeEnvelopeAttack.min, volumeEnvelopeAttack.max])
  //   .exponent(3);

  let newSliderScale;
  let scaledValue;
  // const newSliderScale = (min, max) => {
  //   return (newScale = scalePow()
  //     .range([min, max])
  //     .domain([min, max])
  //     .exponent(3));
  // };
  const getScaledValue = (min, max, value, exponent) => {
    newSliderScale = scalePow()
      .range([min, max])
      .domain([min, max])
      .exponent(exponent);
    return (scaledValue = newSliderScale(value));
  };

  const handleAttack = (e) => {
    getScaledValue(
      volumeEnvelopeAttack.min,
      volumeEnvelopeAttack.max,
      e.target.value,
      3
    );
    // console.log(scaledValue);
    setVolumeEnvelopeAttack(parseFloat(e.target.value), scaledValue);
  };

  const handleDecay = (e) => {
    getScaledValue(
      volumeEnvelopeDecay.min,
      volumeEnvelopeDecay.max,
      e.target.value,
      3
    );
    // console.log(scaledValue);
    setVolumeEnvelopeDecay(parseFloat(e.target.value), scaledValue);
  };

  // const handleSustain = (e) => {
  //   setVolumeEnvelopeSustain(parseFloat(e.target.value));
  // };

  const handleSustain = (e) => {
    getScaledValue(
      volumeEnvelopeSustain.min,
      volumeEnvelopeSustain.max,
      e.target.value,
      1
    );
    // console.log(scaledValue);
    setVolumeEnvelopeSustain(parseFloat(e.target.value), scaledValue);
  };

  const handleHold = (e) => {
    getScaledValue(
      volumeEnvelopeHold.min,
      volumeEnvelopeHold.max,
      e.target.value,
      3
    );
    // console.log(scaledValue);
    setVolumeEnvelopeHold(parseFloat(e.target.value), scaledValue);
  };

  const handleRelease = (e) => {
    getScaledValue(
      volumeEnvelopeRelease.min,
      volumeEnvelopeRelease.max,
      e.target.value,
      3
    );
    // console.log(scaledValue);
    setVolumeEnvelopeRelease(parseFloat(e.target.value), scaledValue);
  };

  return (
    <div>
      <h2>Volume Envelope</h2>
      <SliderTime
        label={volumeEnvelopeAttack.label}
        id={volumeEnvelopeAttack.id}
        min={volumeEnvelopeAttack.min}
        max={volumeEnvelopeAttack.max}
        step={volumeEnvelopeAttack.step}
        sliderValue={volumeEnvelopeAttack.sliderValue}
        scaledValue={volumeEnvelopeAttack.scaledValue}
        onChange={handleAttack}
        disabled={disabled}
      />
      <SliderTime
        label={volumeEnvelopeDecay.label}
        id={volumeEnvelopeDecay.id}
        min={volumeEnvelopeDecay.min}
        max={volumeEnvelopeDecay.max}
        step={volumeEnvelopeDecay.step}
        sliderValue={volumeEnvelopeDecay.sliderValue}
        scaledValue={volumeEnvelopeDecay.scaledValue}
        onChange={handleDecay}
        disabled={disabled}
      />

      {/* <SliderLevel  
        label={'Sustain'}
        id={'sustain'}
        min={'0'}
        max={'1'}
        step={'any'}
        value={volumeEnvelopeSustain}
        onChange={handleSustain}
      /> */}

      <SliderLevel
        label={volumeEnvelopeSustain.label}
        id={volumeEnvelopeSustain.id}
        min={volumeEnvelopeSustain.min}
        max={volumeEnvelopeSustain.max}
        step={volumeEnvelopeSustain.step}
        sliderValue={volumeEnvelopeSustain.sliderValue}
        scaledValue={volumeEnvelopeSustain.scaledValue}
        onChange={handleSustain}
        disabled={disabled}
      />

      {/* <SliderTime
        label={volumeEnvelopeHold.label}
        id={volumeEnvelopeHold.id}
        min={volumeEnvelopeHold.min}
        max={volumeEnvelopeHold.max}
        step={volumeEnvelopeHold.step}
        sliderValue={volumeEnvelopeHold.sliderValue}
        scaledValue={volumeEnvelopeHold.scaledValue}
        onChange={handleHold}
      /> */}
      <SliderTime
        label={volumeEnvelopeRelease.label}
        id={volumeEnvelopeRelease.id}
        min={volumeEnvelopeRelease.min}
        max={volumeEnvelopeRelease.max}
        step={volumeEnvelopeRelease.step}
        sliderValue={volumeEnvelopeRelease.sliderValue}
        scaledValue={volumeEnvelopeRelease.scaledValue}
        onChange={handleRelease}
        disabled={disabled}
      />
    </div>
  );
};

export default VolumeEnvelope;