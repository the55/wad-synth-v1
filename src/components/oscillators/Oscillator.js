import React, {
  createRef,
  useContext,
  useEffect,
  useRef,
  useState,
  Fragment,
} from 'react';
import OscillatorContext from '../../context/oscillatorContext/oscillatorContext';
import { scalePow } from 'd3-scale';
import throttle from 'lodash.throttle';
import SliderTime from '../uiElements/SliderTime';
import SliderLevel from '../uiElements/SliderLevel';

const Oscillator = ({ oscillator }) => {
  const oscillatorContext = useContext(OscillatorContext);
  const {
    setOscillatorVolume,
    setOscillatorOctave,
    setOscillatorDetuneCoarse,
    setOscillatorDetuneFine,
  } = oscillatorContext;

  const [componentLoading, setComponentLoading] = useState(true);
  const [thisOscillator, setThisOscillator] = useState();
  const [oscillatorWad, setOscillatorWad] = useState();

  const {
    id,
    volume,
    volumeControl,
    detuneControlCoarse,
    detuneControlFine,
  } = oscillator; // These things are set in OscillatorState.js, but since they're specific to one oscillator they're being passed as a prop instead of from Context

  // Get the current oscillator using the oscillatorId prop passed from Oscillators.js
  // useEffect(() => {
  //   oscillators.map(
  //     (oscillator) =>
  //       oscillatorId === oscillator.idd && setThisOscillator(oscillator)
  //   );
  //   setComponentLoading(false);
  // }, [oscillatorId, oscillators, thisOscillator]);

  // !componentLoading && console.log(thisOscillator.volume.label);

  let newSliderScale;
  let scaledValue;
  const getScaledValue = (min, max, value, exponent) => {
    newSliderScale = scalePow()
      .range([min, max])
      .domain([min, max])
      .exponent(exponent);
    return (scaledValue = newSliderScale(value));
  };

  // const handleVolume = (e) => {
  //   getScaledValue(volumeControl.min, volumeControl.max, e.target.value, 1);
  //   // console.log(scaledValue);
  //   setOscillatorVolume(id, parseFloat(e.target.value), scaledValue);
  //   console.log(scaledValue);
  // };

  // const handleVolumeThrottled = useRef(throttle(handleVolume, 1000)).current;

  // Throttle the slider event
  // Throttle needs to use useRef, otherwise react just makes a new event
  // See https://medium.com/trabe/react-syntheticevent-reuse-889cd52981b6 for how the onChange works
  const handleVolumeThrottled = useRef(
    throttle(function handleVolume(value) {
      getScaledValue(volumeControl.min, volumeControl.max, value, 1);
      setOscillatorVolume(id, parseFloat(value), scaledValue);
    }, 50)
  ).current;

  // const handleDetuneCoarseThrottled = useRef(
  //   throttle(function handleDetune(value) {
  //     getScaledValue(detuneControl.min, detuneControl.max, value, 1);
  //     setOscillatorDetune(id, parseFloat(value), scaledValue);
  //   }, 50)
  // ).current;

  // Store the Detune values with useRef, so that the event handlers can access the current state
  // --- Detune Coarse State
  // ------ Create a Ref with the initial state (from a prop/context)
  const updatedDetuneCoarseRef = useRef(detuneControlCoarse.scaledValue);
  // Create a function to update both the Ref and the state. It is passed our updated value
  const setUpdatedDetuneCoarse = (updatedValue) => {
    updatedDetuneCoarseRef.current = updatedValue;
  };
  // ------ Run the update function (and pass it the updated value) when the state changes
  useEffect(() => {
    setUpdatedDetuneCoarse(detuneControlCoarse.scaledValue);
  }, [detuneControlCoarse]);

  // --- Detune Fine State
  // ------ Create a Ref with the initial state (from a prop/context)
  const updatedDetuneFineRef = useRef(detuneControlFine.scaledValue);
  // Create a function to update both the Ref and the state. It is passed our updated value
  const setUpdatedDetuneFine = (updatedValue) => {
    updatedDetuneFineRef.current = updatedValue;
  };
  // ------ Run the update function (and pass it the updated value) when the state changes
  useEffect(() => {
    setUpdatedDetuneFine(detuneControlFine.scaledValue);
  }, [detuneControlFine]);

  const handleDetuneCoarseThrottled = useRef(
    throttle(function handleDetuneCoarse(value) {
      let detuneValue;
      getScaledValue(
        detuneControlCoarse.min,
        detuneControlCoarse.max,
        value,
        1
      );
      detuneValue = scaledValue + updatedDetuneFineRef.current; // Add the value of the Fine slider to the current value of the Coarse slider. To get the updated state in an event handler we need to use a Ref, see above for the setup.

      setOscillatorDetuneCoarse(
        id,
        parseFloat(value),
        scaledValue,
        detuneValue
      );
    }, 50)
  ).current;

  const handleDetuneFineThrottled = useRef(
    throttle(function handleDetuneFine(value) {
      let detuneValue;
      getScaledValue(detuneControlFine.min, detuneControlFine.max, value, 1);
      detuneValue = scaledValue + updatedDetuneCoarseRef.current; // Add the value of the Fine slider to the current value of the Coarse slider. To get the updated state in an event handler we need to use a Ref, see above for the setup.
      setOscillatorDetuneFine(id, parseFloat(value), scaledValue, detuneValue);
    }, 50)
  ).current;

  // Transpose the pitch for different octave settings
  const [octaveSelected, setOctaveSelected] = useState('octave0');

  const handleSelectOctave = (e) => {
    setOctaveSelected(e.target.value);
    switch (e.target.value) {
      case 'octaveMinus2':
        setOscillatorOctave(id, 0.25);
        break;
      case 'octaveMinus1':
        setOscillatorOctave(id, 0.5);
        break;
      case 'octave0':
        setOscillatorOctave(id, 1);
        break;
      case 'octavePlus1':
        setOscillatorOctave(id, 2);
        break;
      case 'octavePlus2':
        setOscillatorOctave(id, 4);
        break;
      default:
      //
    }
  };

  return (
    <div>
      <h3>Oscillator {oscillator.legend}</h3>
      <div>
        <h4>Octave</h4>

        <label htmlFor={`${id}octaveMinus2`}>
          <input
            type="radio"
            id={`${id}octaveMinus2`}
            name={`${id}OctaveSelect`}
            value="octaveMinus2"
            onChange={handleSelectOctave}
            checked={octaveSelected === 'octaveMinus2'}
          />{' '}
          -2
        </label>
        <label htmlFor={`${id}octaveMinus1`}>
          <input
            type="radio"
            id={`${id}octaveMinus1`}
            name={`${id}OctaveSelect`}
            value="octaveMinus1"
            onChange={handleSelectOctave}
            checked={octaveSelected === 'octaveMinus1'}
          />{' '}
          -1
        </label>
        <label htmlFor={`${id}octave0`}>
          <input
            type="radio"
            id={`${id}octave0`}
            name={`${id}OctaveSelect`}
            value="octave0"
            onChange={handleSelectOctave}
            checked={octaveSelected === 'octave0'}
          />{' '}
          0
        </label>
        <label htmlFor={`${id}octavePlus1`}>
          <input
            type="radio"
            id={`${id}octavePlus1`}
            name={`${id}OctaveSelect`}
            value="octavePlus1"
            onChange={handleSelectOctave}
            checked={octaveSelected === 'octavePlus1'}
          />{' '}
          +1
        </label>
        <label htmlFor={`${id}octavePlus2`}>
          <input
            type="radio"
            id={`${id}octavePlus2`}
            name={`${id}OctaveSelect`}
            value="octavePlus2"
            onChange={handleSelectOctave}
            checked={octaveSelected === 'octavePlus2'}
          />{' '}
          +2
        </label>
      </div>
      <SliderLevel
        label={volumeControl.label}
        id={volumeControl.id}
        min={volumeControl.min}
        max={volumeControl.max}
        step={volumeControl.step}
        sliderValue={volumeControl.sliderValue}
        scaledValue={volumeControl.scaledValue}
        multiplier={100}
        decimal={0}
        // onChange={handleVolumeThrottled}
        onChange={({ target: { value } }) => handleVolumeThrottled(value)} // See the handleVolumeThrottled definition for an explanation
        // disabled={disabled}
      />
      <SliderLevel
        label={detuneControlCoarse.label}
        id={detuneControlCoarse.id}
        min={detuneControlCoarse.min}
        max={detuneControlCoarse.max}
        step={detuneControlCoarse.step}
        sliderValue={detuneControlCoarse.sliderValue}
        scaledValue={detuneControlCoarse.scaledValue}
        multiplier={0.01}
        decimal={0}
        // onChange={handleVolumeThrottled}
        onChange={({ target: { value } }) => handleDetuneCoarseThrottled(value)} // See the handleVolumeThrottled definition for an explanation
        // disabled={disabled}
      />
      <SliderLevel
        label={detuneControlFine.label}
        id={detuneControlFine.id}
        min={detuneControlFine.min}
        max={detuneControlFine.max}
        step={detuneControlFine.step}
        sliderValue={detuneControlFine.sliderValue}
        scaledValue={detuneControlFine.scaledValue}
        multiplier={1}
        decimal={0}
        // onChange={handleVolumeThrottled}
        onChange={({ target: { value } }) => handleDetuneFineThrottled(value)} // See the handleVolumeThrottled definition for an explanation
        // disabled={disabled}
      />
    </div>
  );
};

export default Oscillator;
