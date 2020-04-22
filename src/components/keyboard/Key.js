import React, { useContext, useEffect, createRef, useState } from 'react';
import OscillatorContext from '../../context/oscillatorContext/oscillatorContext';
import Wad from 'web-audio-daw';
import styles from './Keyboard.module.scss';

const Key = ({ index, keyName, windowWidth, keyboardOctave, keyNamesType }) => {
  const oscillatorContext = useContext(OscillatorContext);
  const {
    oscillators,
    setOscillatorPitch,
    setNotePitch,
    setNotePlaying,
    setNoteVolume,
    notePitch,
  } = oscillatorContext;

  // Style the keys
  const keyIsAccidental = keyName.match(/#|b/); // Get the sharps and flats
  const keyColor = keyIsAccidental // White keys and black keys get a different style
    ? `${styles.blackKey}`
    : `${styles.whiteKey}`;

  // C and F need different margins since they don't have a flat
  const keyIsCOrF = keyName.match(/C|F/);
  const noFlat = keyIsCOrF ? `${styles.noFlat}` : ``;
  // C# and F# also need a different style
  const keyIsFirstSharp = keyName.match(/C#|Db|F#|Gb/);
  const firstSharp = keyIsFirstSharp ? `${styles.firstSharp}` : ``;
  const keyIsCNatural = keyName.match(/C/);
  const keyIsCSharp = keyName.match(/C#|Db/);
  const cSharp = keyIsCSharp ? `${styles.cSharp}` : ``;
  const keyIsFSharp = keyName.match(/F#|Gb/);
  const fSharp = keyIsFSharp ? `${styles.fSharp}` : ``;

  // Set up the Qwerty key labels
  const [qwertyLabel, setQwertyLabel] = useState('');
  useEffect(() => {
    switch (keyName) {
      case `C${keyboardOctave}`:
        setQwertyLabel('A');
        break;
      case `C#${keyboardOctave}`:
        setQwertyLabel('W');
        break;
      case `D${keyboardOctave}`:
        setQwertyLabel('S');
        break;
      case `D#${keyboardOctave}`:
        setQwertyLabel('E');
        break;
      case `E${keyboardOctave}`:
        setQwertyLabel('D');
        break;
      case `F${keyboardOctave}`:
        setQwertyLabel('F');
        break;
      case `F#${keyboardOctave}`:
        setQwertyLabel('T');
        break;
      case `G${keyboardOctave}`:
        setQwertyLabel('G');
        break;
      case `G#${keyboardOctave}`:
        setQwertyLabel('Y');
        break;
      case `A${keyboardOctave}`:
        setQwertyLabel('H');
        break;
      case `A#${keyboardOctave}`:
        setQwertyLabel('U');
        break;
      case `B${keyboardOctave}`:
        setQwertyLabel('J');
        break;
      case `C${+keyboardOctave + 1}`:
        setQwertyLabel('K');
        break;
      default:
        setQwertyLabel('');
      //
    }
  }, [keyName, keyboardOctave]);

  const [keyLabel, setKeyLabel] = useState(``);
  useEffect(() => {
    switch (true) {
      // If "None" is selected, show labels only on the C keys
      case keyNamesType === 'none' && keyIsCNatural && !keyIsCSharp:
        setKeyLabel(`${keyName}`);
        break;
      // Show Sharps and Flats
      case keyNamesType === 'sharps' || keyNamesType === 'flats':
        setKeyLabel(`${keyName}`);
        break;
      case keyNamesType === 'qwerty':
        setKeyLabel(`${qwertyLabel}`);
        break;
      default:
        setKeyLabel(``);
    }
  }, [keyIsCNatural, keyIsCSharp, keyName, keyNamesType, qwertyLabel]);

  const handleRightClick = (e) => {
    e.preventDefault();
  };

  // The frequency of a note is set when the component mounts/has its keyName prop
  const [frequency, setFrequency] = useState();

  useEffect(() => {
    Object.entries(Wad.pitches).map(([key, value]) => {
      if (key === keyName) {
        return setFrequency(value);
      } else {
        return false;
      }
    });
  }, [keyName]);

  const handleNoteOn = (e) => {
    (async function playThisNote() {
      // await setNotePitch(keyName); // First, set the Pitch
      // await setNotePitch(frequency); // First, set the Pitch. Using the frequency instead of the keyName so that I can do math on it with the oscillator octave
      await oscillators.map(
        (oscillator) =>
          setOscillatorPitch(oscillator.id, frequency * oscillator.octave) // Update each oscillator's pitch with the played frequency multiplied by that oscillator's octave value
      );
      // await setNoteVolume(0.3); // TODO: Make sure this works with Oscillator volumes
      await setNotePlaying(true); // Then set playing to True
    })();
  };

  const handleNoteOff = (e) => {
    e.preventDefault(); // This seems to fix a React/Chrome bug where onTouchStart also triggers onMouseDown
    setNotePlaying(false);
  };

  return (
    // eslint-disable-next-line
    <li
      // TODO: make this a button?
      className={`${styles.key} ${keyColor} ${noFlat} ${firstSharp} ${cSharp} ${fSharp}`}
      data-keyname={keyName}
      onMouseDown={handleNoteOn}
      onMouseUp={handleNoteOff}
      onContextMenu={handleRightClick}
      onTouchStart={handleNoteOn}
      onTouchEnd={handleNoteOff}
    >
      <p>{keyLabel}</p>
    </li>
  );
};

export default Key;
