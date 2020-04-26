import React from 'react';

const OscillatorOctaveSelect = ({ id, handleSelectOctave, octaveSelected }) => {
  return (
    <div>
      <h4 className={`label inline`}>Octave</h4>

      <label htmlFor={`${id}OctaveMinus2`}>
        <input
          type="radio"
          id={`${id}OctaveMinus2`}
          name={`${id}OctaveSelect`}
          value="octaveMinus2"
          onChange={handleSelectOctave}
          checked={octaveSelected === 'octaveMinus2'}
        />{' '}
        -2
      </label>
      <label htmlFor={`${id}OctaveMinus1`}>
        <input
          type="radio"
          id={`${id}OctaveMinus1`}
          name={`${id}OctaveSelect`}
          value="octaveMinus1"
          onChange={handleSelectOctave}
          checked={octaveSelected === 'octaveMinus1'}
        />{' '}
        -1
      </label>
      <label htmlFor={`${id}Octave0`}>
        <input
          type="radio"
          id={`${id}Octave0`}
          name={`${id}OctaveSelect`}
          value="octave0"
          onChange={handleSelectOctave}
          checked={octaveSelected === 'octave0'}
        />{' '}
        0
      </label>
      <label htmlFor={`${id}OctavePlus1`}>
        <input
          type="radio"
          id={`${id}OctavePlus1`}
          name={`${id}OctaveSelect`}
          value="octavePlus1"
          onChange={handleSelectOctave}
          checked={octaveSelected === 'octavePlus1'}
        />{' '}
        +1
      </label>
      <label htmlFor={`${id}OctavePlus2`}>
        <input
          type="radio"
          id={`${id}OctavePlus2`}
          name={`${id}OctaveSelect`}
          value="octavePlus2"
          onChange={handleSelectOctave}
          checked={octaveSelected === 'octavePlus2'}
        />{' '}
        +2
      </label>
    </div>
  );
};

export default OscillatorOctaveSelect;
