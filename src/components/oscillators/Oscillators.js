import React, { Fragment, useContext, useEffect, useState } from 'react';
import Wad from 'web-audio-daw';
import OscillatorContext from '../../context/oscillatorContext/oscillatorContext';
import Oscillator from './Oscillator';

const Oscillators = () => {
  const oscillatorContext = useContext(OscillatorContext);
  const { oscillators } = oscillatorContext;

  const [osc1, osc2, osc3] = oscillators;

  return (
    <Fragment>
      <Oscillator oscillator={osc1} />
      <Oscillator oscillator={osc2} />
      <Oscillator oscillator={osc3} />

      {/* {oscillators.map((oscillator) => (
        <Oscillator oscillatorId={oscillator.id} key={oscillator.id} />
      ))} */}
      {/* <Oscillator oscillatorId={'osc1'} />
      <Oscillator oscillatorId={'osc2'} />
      <Oscillator oscillatorId={'osc3'} /> */}
    </Fragment>
  );
};

export default Oscillators;
