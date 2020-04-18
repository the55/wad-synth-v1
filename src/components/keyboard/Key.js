import React, { useContext, useEffect, createRef, useState } from 'react';
import OscillatorContext from '../../context/oscillatorContext/oscillatorContext';
import styles from './Keyboard.module.scss';

const Key = ({ index, keyName, windowWidth, currentOctave, keyNamesType }) => {
  const oscillatorContext = useContext(OscillatorContext);
  const { setNotePitch, setNotePlaying, setNoteVolume } = oscillatorContext;

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
      case `C${currentOctave}`:
        setQwertyLabel('A');
        break;
      case `C#${currentOctave}`:
        setQwertyLabel('W');
        break;
      case `D${currentOctave}`:
        setQwertyLabel('S');
        break;
      case `D#${currentOctave}`:
        setQwertyLabel('E');
        break;
      case `E${currentOctave}`:
        setQwertyLabel('D');
        break;
      case `F${currentOctave}`:
        setQwertyLabel('F');
        break;
      case `F#${currentOctave}`:
        setQwertyLabel('T');
        break;
      case `G${currentOctave}`:
        setQwertyLabel('G');
        break;
      case `G#${currentOctave}`:
        setQwertyLabel('Y');
        break;
      case `A${currentOctave}`:
        setQwertyLabel('H');
        break;
      case `A#${currentOctave}`:
        setQwertyLabel('U');
        break;
      case `B${currentOctave}`:
        setQwertyLabel('J');
        break;
      case `C${+currentOctave + 1}`:
        setQwertyLabel('K');
        break;
      default:
        setQwertyLabel('');
      //
    }
  }, [keyName, currentOctave]);

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

  const handleNoteOn = (e) => {
    (async function playThisNote() {
      await setNotePitch(keyName); // First, set the Pitch
      await setNoteVolume(0.3);
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
