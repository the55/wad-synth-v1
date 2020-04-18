import React, { Fragment, useContext, useEffect, useState } from 'react';
import Wad from 'web-audio-daw';
import OscillatorContext from '../../context/oscillatorContext/oscillatorContext';
import VolumeEnvelopeContext from '../../context/volumeEnvelopeContext/volumeEnvelopeContext';
import Oscillator from './Oscillator';

const Oscillators = () => {
  const oscillatorContext = useContext(OscillatorContext);
  const {
    oscillatorOutput,
    notePlaying,
    notePitch,
    noteVolume,
    oscillatorHold,
    setOscillatorHold,
  } = oscillatorContext;

  // const volumeEnvelopeContext = useContext(VolumeEnvelopeContext);
  // const {
  //   volumeEnvelopeAttack,
  //   volumeEnvelopeDecay,
  //   volumeEnvelopeSustain,
  //   volumeEnvelopeHold,
  //   volumeEnvelopeRelease,
  // } = volumeEnvelopeContext;

  return (
    <Fragment>
      {oscillatorOutput.map((oscillator) => (
        <Oscillator oscillatorId={oscillator.oscId} key={oscillator.oscId} />
      ))}
      {/* <Oscillator oscillatorId={'osc1'} />
      <Oscillator oscillatorId={'osc2'} />
      <Oscillator oscillatorId={'osc3'} /> */}
    </Fragment>
  );
};

export default Oscillators;
