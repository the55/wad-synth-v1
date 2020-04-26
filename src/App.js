import React from 'react';
import './App.scss';
// State/Context
import OscillatorState from './context/oscillatorContext/OscillatorState';
import VolumeEnvelopeState from './context/volumeEnvelopeContext/VolumeEnvelopeState';
//Components
import Brain from './components/Brain'; // Where Wads are constructed
import SynthModules from './components/SynthModules';
// import Oscillators from './components/oscillators/Oscillators';
// import VolumeEnvelope from './components/volumeEnvelope/VolumeEnvelope';
// import Keyboard from './components/keyboard/Keyboard';

function App() {
  return (
    <OscillatorState>
      <VolumeEnvelopeState>
        <Brain />
        <SynthModules />
      </VolumeEnvelopeState>
    </OscillatorState>
  );
}

export default App;
