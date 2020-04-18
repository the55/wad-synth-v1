import React, { useReducer } from 'react';
import OscillatorContext from './oscillatorContext';
import oscillatorReducer from './oscillatorReducer';
import {
  SET_OSCILLATOR_OUTPUT,
  SET_NOTE_PITCH,
  SET_NOTE_PLAYING,
  SET_OSCILLATOR_HOLD,
  SET_NOTE_VOLUME,
} from './oscillatorTypes';

const OscillatorState = (props) => {
  const initialState = {
    oscillatorOutput: [
      {
        oscId: '1',
        source: 'sawtooth',
        volume: 0.3, // Peak volume can range from 0 to an arbitrarily high number, but you probably shouldn't set it higher than 1.
        detune: 0, // Set a default detune on the constructor if you don't want to set detune on <code>play()</code>. Detune is measured in cents. 100 cents is equal to 1 semitone.
        panning: 0, // Horizontal placement of the sound source. Possible values are from 1 to -1.
        // pitch: 'A3', // Set a default pitch on the constructor if you don't want to set the pitch on <code>play()</code>.
        env: {
          // Init settings for the Volume envelope.
          // These are overridden when a note plays by VolumeEnvelope.js
          attack: 0.0, // Time in seconds from onset to peak volume.  Common values for oscillators may range from 0.05 to 0.3.
          decay: 0.0, // Time in seconds from peak volume to sustain volume.
          sustain: 1.0, // Sustain volume level. This is a percent of the peak volume, so sensible values are between 0 and 1.
          hold: 0, // Time in seconds to maintain the sustain volume level. If set to -1, the sound will be sustained indefinitely until you manually call stop().
          release: 1, // Time in seconds from the end of the hold period to zero volume, or from calling stop() to zero volume.
        },
      },
      {
        oscId: '2',
        source: 'sawtooth',
        volume: 0.3, // Peak volume can range from 0 to an arbitrarily high number, but you probably shouldn't set it higher than 1.
        detune: -10, // Set a default detune on the constructor if you don't want to set detune on <code>play()</code>. Detune is measured in cents. 100 cents is equal to 1 semitone.
        panning: 0, // Horizontal placement of the sound source. Possible values are from 1 to -1.
        // pitch: 'A3', // Set a default pitch on the constructor if you don't want to set the pitch on <code>play()</code>.
        env: {
          // Init settings for the Volume envelope.
          // These are overridden when a note plays by VolumeEnvelope.js
          attack: 0.0, // Time in seconds from onset to peak volume.  Common values for oscillators may range from 0.05 to 0.3.
          decay: 0.0, // Time in seconds from peak volume to sustain volume.
          sustain: 1.0, // Sustain volume level. This is a percent of the peak volume, so sensible values are between 0 and 1.
          hold: 0, // Time in seconds to maintain the sustain volume level. If set to -1, the sound will be sustained indefinitely until you manually call stop().
          release: 1, // Time in seconds from the end of the hold period to zero volume, or from calling stop() to zero volume.
        },
      },
      {
        oscId: '3',
        source: 'square',
        volume: 0.3, // Peak volume can range from 0 to an arbitrarily high number, but you probably shouldn't set it higher than 1.
        detune: -20, // Set a default detune on the constructor if you don't want to set detune on <code>play()</code>. Detune is measured in cents. 100 cents is equal to 1 semitone.
        panning: 0, // Horizontal placement of the sound source. Possible values are from 1 to -1.
        // pitch: 'A3', // Set a default pitch on the constructor if you don't want to set the pitch on <code>play()</code>.
        env: {
          // Init settings for the Volume envelope.
          // These are overridden when a note plays by VolumeEnvelope.js
          attack: 0.0, // Time in seconds from onset to peak volume.  Common values for oscillators may range from 0.05 to 0.3.
          decay: 0.0, // Time in seconds from peak volume to sustain volume.
          sustain: 1.0, // Sustain volume level. This is a percent of the peak volume, so sensible values are between 0 and 1.
          hold: 0, // Time in seconds to maintain the sustain volume level. If set to -1, the sound will be sustained indefinitely until you manually call stop().
          release: 1, // Time in seconds from the end of the hold period to zero volume, or from calling stop() to zero volume.
        },
      },
    ],
    notePitch: 'A2',
    notePlaying: false,
    noteVolume: 0,
  };

  //All of our actions involving state go below. The type of action is dispatched to the Reducer.
  const [state, dispatch] = useReducer(oscillatorReducer, initialState);

  const setOscillatorOutput = (oscillatorOutputArray) => {
    dispatch({ type: SET_OSCILLATOR_OUTPUT, payload: oscillatorOutputArray });
  };

  const setNotePitch = (keyName) => {
    dispatch({ type: SET_NOTE_PITCH, payload: keyName });
  };

  const setNotePlaying = (bool) => {
    dispatch({ type: SET_NOTE_PLAYING, payload: bool });
  };

  const setNoteVolume = (num) => {
    dispatch({ type: SET_NOTE_VOLUME, payload: num });
  };

  const setOscillatorHold = (seconds) => {
    dispatch({ type: SET_OSCILLATOR_HOLD, payload: seconds });
  };

  return (
    <OscillatorContext.Provider
      value={{
        oscillatorOutput: state.oscillatorOutput,
        notePitch: state.notePitch,
        notePlaying: state.notePlaying,
        noteVolume: state.noteVolume,
        oscillatorHold: state.oscillatorHold,
        setOscillatorOutput,
        setNotePitch,
        setNotePlaying,
        setOscillatorHold,
        setNoteVolume,
      }}
    >
      {props.children}
    </OscillatorContext.Provider>
  );
};

export default OscillatorState;
