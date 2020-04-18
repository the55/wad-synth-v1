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

  const volumeEnvelopeContext = useContext(VolumeEnvelopeContext);
  const {
    volumeEnvelopeAttack,
    volumeEnvelopeDecay,
    volumeEnvelopeSustain,
    volumeEnvelopeHold,
    volumeEnvelopeRelease,
  } = volumeEnvelopeContext;

  const [componentLoading, setComponentLoading] = useState(true);

  const [osc1, osc2, osc3] = oscillatorOutput; // Destructure the oscillators into individual objects

  // Setup state for Wads.
  const [oscillator1Wad, setOscillator1Wad] = useState(new Wad(osc1));
  const [oscillator2Wad, setOscillator2Wad] = useState(new Wad(osc2));
  const [oscillator3Wad, setOscillator3Wad] = useState(new Wad(osc3));

  // Setup the PolyWad
  const [allOscillatorWads, setAllOscillatorWads] = useState(new Wad.Poly());

  // Add the Wads to the PolyWad
  useEffect(() => {
    allOscillatorWads
      .add(oscillator1Wad)
      .add(oscillator2Wad)
      .add(oscillator3Wad);
  }, [oscillator1Wad, oscillator2Wad, oscillator3Wad, allOscillatorWads]);

  // Get the data for a note from the context
  const playArgs = {
    volume: noteVolume,
    pitch: notePitch,
    label: notePitch,
    env: {
      attack: volumeEnvelopeAttack.scaledValue,
      decay: volumeEnvelopeDecay.scaledValue,
      sustain: volumeEnvelopeSustain.scaledValue,
      hold: volumeEnvelopeHold,
      release: volumeEnvelopeRelease.scaledValue,
    },
  };

  // Play and stop a note
  useEffect(() => {
    // Playing state from the oscillator context
    if (notePlaying) {
      // PolyWad
      allOscillatorWads.play(playArgs);

      // // Try Individual Oscillators if the Poly Wad doesn't work right
      // oscillator1Wad.play(playArgs);
      // oscillator2Wad.play(playArgs);
      // oscillator3Wad.play(playArgs);
    } else {
      // // PolyWad
      allOscillatorWads.stop(); // calling a general stop(). Stop(notePitch) has a bug where the note keeps playing very quietly, causing high cpu usage.
      // allOscillatorWads.setPitch(0);
      // allOscillatorWads.stop(notePitch);
      // allOscillatorWads.setVolume(0);

      // Try Individual Oscillators if the Poly Wad doesn't work right
      // oscillator1Wad.stop(notePitch); // Really I need to stop the previous note before playing the new one
      // TODO: A very low level of sound continues to play even after the volume envelope closes. .setPitch(0) seems to fix this. I want to do .setPitch(0) after the duration of the Oscillator release.
      // oscillator1Wad.setPitch(0);
      // oscillator1Wad.setVolume(0.0); // Doesn't really have an effect
      // oscillator2Wad.stop(notePitch); // Really I need to stop the previous note before playing the new one
      // oscillator2Wad.setPitch(0);
      // oscillator2Wad.setVolume(0.0);
      // oscillator3Wad.stop(notePitch); // Really I need to stop the previous note before playing the new one
      // oscillator3Wad.setPitch(0);
      // oscillator3Wad.setVolume(0.0);
    }
  }, [
    allOscillatorWads,
    oscillator1Wad,
    oscillator2Wad,
    oscillator3Wad,
    notePitch,
    notePlaying,
    // oscillatorHold,
    // noteVolume,
    // volumeEnvelopeAttack,
    // volumeEnvelopeDecay,
    playArgs,
  ]);

  return (
    <Fragment>
      <Oscillator oscillatorId={'osc1'} />
      <Oscillator oscillatorId={'osc2'} />
      <Oscillator oscillatorId={'osc3'} />
    </Fragment>
  );
};

export default Oscillators;
