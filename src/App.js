import React from 'react';
import './App.scss';
// State/Context
import OscillatorState from './context/oscillatorContext/OscillatorState';
import VolumeEnvelopeState from './context/volumeEnvelopeContext/VolumeEnvelopeState';
//Components
import Brain from './components/Brain'; // Where Wads are constructed
import Oscillators from './components/oscillators/Oscillators';
import VolumeEnvelope from './components/volumeEnvelope/VolumeEnvelope';
import Keyboard from './components/keyboard/Keyboard';

function App() {
  return (
    <OscillatorState>
      <VolumeEnvelopeState>
        <Brain />
        <main>
          {/* <div className="App"> */}
          <h1>I'm a synth</h1>
          <Oscillators />
          <VolumeEnvelope />
          <Keyboard />
          {/* </div> */}
        </main>
      </VolumeEnvelopeState>
    </OscillatorState>
  );
}

export default App;
