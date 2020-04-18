import React, { useContext, useEffect, useState } from 'react';
import OscillatorContext from '../../context/oscillatorContext/oscillatorContext';
import Wad from 'web-audio-daw';

const Oscillator = ({ oscillatorId }) => {
  const oscillatorContext = useContext(OscillatorContext);
  const { oscillatorOutput, notePlaying } = oscillatorContext;

  const [componentLoading, setComponentLoading] = useState(true);
  const [thisOscillator, setThisOscillator] = useState();
  const [oscillatorWad, setOscillatorWad] = useState();

  // Get the current oscillator using the oscillatorId prop passed from Oscillators.js
  // useEffect(() => {
  //   oscillatorOutput.map(
  //     (oscillator) =>
  //       oscillatorId === oscillator.oscId && setThisOscillator(oscillator)
  //   );
  //   setComponentLoading(false);
  // }, [oscillatorId, oscillatorOutput]);

  return (
    <div>
      <h2>Oscillator {oscillatorId}</h2>

      {/* <button type="button" onClick={handlePlay}>
        Play
      </button>
      <button type="button" onClick={handleStop}>
        Stop
      </button> */}
    </div>
  );
};

export default Oscillator;
