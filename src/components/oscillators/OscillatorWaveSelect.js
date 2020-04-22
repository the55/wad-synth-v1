import React from 'react';

const OscillatorWaveSelect = ({ id, handleSelectWave, waveSelected }) => {
  return (
    <div>
      <h4>Wave Form</h4>

      <label htmlFor={`${id}WaveTriangle`}>
        <input
          type="radio"
          id={`${id}WaveTriangle`}
          name={`${id}WaveSelect`}
          value="triangle"
          onChange={handleSelectWave}
          checked={waveSelected === 'triangle'}
        />{' '}
        Triangle
      </label>
      <label htmlFor={`${id}WaveSawtooth`}>
        <input
          type="radio"
          id={`${id}WaveSawtooth`}
          name={`${id}WaveSelect`}
          value="sawtooth"
          onChange={handleSelectWave}
          checked={waveSelected === 'sawtooth'}
        />{' '}
        Sawtooth
      </label>
      <label htmlFor={`${id}WaveSquare`}>
        <input
          type="radio"
          id={`${id}WaveSquare`}
          name={`${id}WaveSelect`}
          value="square"
          onChange={handleSelectWave}
          checked={waveSelected === 'square'}
        />{' '}
        Square
      </label>
      <label htmlFor={`${id}WaveSine`}>
        <input
          type="radio"
          id={`${id}WaveSine`}
          name={`${id}WaveSelect`}
          value="sine"
          onChange={handleSelectWave}
          checked={waveSelected === 'sine'}
        />{' '}
        Sine
      </label>
    </div>
  );
};

export default OscillatorWaveSelect;
