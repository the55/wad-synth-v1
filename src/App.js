import React from 'react';
import './App.scss';
// State/Context
import OscillatorState from './context/oscillatorContext/OscillatorState';
import VolumeEnvelopeState from './context/volumeEnvelopeContext/VolumeEnvelopeState';
//Components
import Oscillators from './components/oscillators/Oscillators';
import VolumeEnvelope from './components/volumeEnvelope/VolumeEnvelope';
import Keyboard from './components/keyboard/Keyboard';

function App() {
  return (
    <OscillatorState>
      <VolumeEnvelopeState>
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
