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

  // let oscillatorWadTest = new Wad(
  //   oscillatorOutput.map((oscillator) => {
  //     return (
  //       oscillatorId === oscillator.oscId &&
  //       {
  //         // source: oscillator.source, // Oscillator type needs to be set before the sound is played
  //         // // volume: 1.0, // Peak volume can range from 0 to an arbitrarily high number, but you probably shouldn't set it higher than 1.
  //         // // pitch: 'A4', // Set a default pitch on the constructor if you don't want to set the pitch on <code>play()</code>.
  //         // // detune: 0, // Set a default detune on the constructor if you don't want to set detune on <code>play()</code>. Detune is measured in cents. 100 cents is equal to 1 semitone.
  //         // // panning: -0.5, // Horizontal placement of the sound source. Possible values are from 1 to -1.
  //         // env: {
  //         //   // This is the ADSR envelope.
  //         //   attack: 0.0, // Time in seconds from onset to peak volume.  Common values for oscillators may range from 0.05 to 0.3.
  //         //   decay: 0.0, // Time in seconds from peak volume to sustain volume.
  //         //   sustain: 1.0, // Sustain volume level. This is a percent of the peak volume, so sensible values are between 0 and 1.
  //         //   hold: 2, // Time in seconds to maintain the sustain volume level. If set to -1, the sound will be sustained indefinitely until you manually call stop().
  //         //   release: 0, // Time in seconds from the end of the hold period to zero volume, or from calling stop() to zero volume.
  //         // },
  //       }
  //     );
  //   })
  // );

  // TODO: Update the context with the new Wad, so that it can be accessed in Oscillators.js to create a PolyWad

  // // Create a new Wad so that we can play it
  // useEffect(() => {
  //   let newWad;
  //   if (!componentLoading) {
  //     newWad = new Wad({
  //       source: thisOscillator.source, // The oscillator type (sine, saw, etc) provided by oscillatorContext. Must be set before a note is played.
  //       pitch: 'C3',
  //       // Other default values go here
  //       // Values such as Voluem and Pitch are set when the note is played
  //       env: {
  //         // This is the ADSR envelope.
  //         attack: 0.0, // Time in seconds from onset to peak volume.  Common values for oscillators may range from 0.05 to 0.3.
  //         decay: 0.0, // Time in seconds from peak volume to sustain volume.
  //         sustain: 1.0, // Sustain volume level. This is a percent of the peak volume, so sensible values are between 0 and 1.
  //         hold: 2, // Time in seconds to maintain the sustain volume level. If set to -1, the sound will be sustained indefinitely until you manually call stop().
  //         release: 0, // Time in seconds from the end of the hold period to zero volume, or from calling stop() to zero volume.
  //       },
  //     });
  //     setOscillatorWad(newWad);
  //   }
  // }, [componentLoading, thisOscillator]);

  // useEffect(() => {
  //   // Playing state from the oscillator context
  //   if (notePlaying) {
  //     oscillatorWad && // Check that oscillatorWad exists
  //       oscillatorWad.play({
  //         volume: thisOscillator.volume,
  //         detune: thisOscillator.detune,
  //         panning: thisOscillator.panning,
  //         pitch: thisOscillator.pitch, // A4 is 440 hertz.
  //         label: thisOscillator.pitch, // Used for stopping Notes
  //       });
  //     // console.log(notePlaying);
  //     !componentLoading && console.log(thisOscillator.pitch);
  //   }
  // }, [notePlaying]);

  return (
    <div>
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
