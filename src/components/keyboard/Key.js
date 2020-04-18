import React, { useContext, useEffect, createRef, useState } from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import OscillatorContext from '../../context/oscillatorContext/oscillatorContext';
import styles from './Keyboard.module.scss';

const Key = ({
  index,
  keyName,
  windowWidth,
  currentOctave,
  keyNamesType,
  // qwertyLabel,
  // setQwertyLabel,
}) => {
  const oscillatorContext = useContext(OscillatorContext);
  const { setNotePitch, setNotePlaying, setNoteVolume } = oscillatorContext;

  // const keyRef = createRef();

  // const [keyRefPosition, setKeyRefPosition] = useState();

  // useEffect(() => {
  //   let keyRefPosition = keyRef.current.getBoundingClientRect().right;
  //   setKeyRefPosition(keyRefPosition);
  // }, [keyRef]);

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
  const cNatural = keyIsCNatural ? `${styles.cNatural}` : ``;
  const keyIsCSharp = keyName.match(/C#|Db/);
  const cSharp = keyIsCSharp ? `${styles.cSharp}` : ``;
  // const keyIsDSharp = keyName.match(/D#/);
  // const dSharp = keyIsDSharp ? `${styles.dSharp}` : ``;
  const keyIsFSharp = keyName.match(/F#|Gb/);
  const fSharp = keyIsFSharp ? `${styles.fSharp}` : ``;
  // const keyIsGSharp = keyName.match(/G#/);
  // const gSharp = keyIsGSharp ? `${styles.gSharp}` : ``;
  // const keyIsASharp = keyName.match(/A#/);
  // const aSharp = keyIsASharp ? `${styles.aSharp}` : ``;

  // TODO: can probably remove the currentOctave stuff, because it's being handled by Keyboard.js
  // Center the current octave on the screen
  let currentOctaveGRegEx = new RegExp(`G${currentOctave}`);
  const keyIsCurrentOctaveG = keyName.match(currentOctaveGRegEx);
  // console.log(keyIsCurrentOctaveG);

  // const keyNamesCurrentOctave = keyNames.filter((keyName) => {
  //   // Get only the notes with the current octave number
  //   let currentOctaveRegEx = new RegExp(currentOctave);
  //   return keyName.match(currentOctaveRegEx);
  // });

  // Hide the keys if they go off screen, so that partial keys aren't shown
  // This is using the VisibilitySensor package, which includes a throttle on the resize event and stuff
  // It would be nice if I only rendered the ones I need, but can't figure that out right now
  const [isVisible, setIsVisible] = useState(true);
  const onVisibilityChange = (isVisible) => {
    // console.log('Element is now %s', isVisible ? 'visible' : 'hidden');
    setIsVisible(isVisible);
  };

  let opacity = isVisible ? '1' : '0';

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
      className={`${styles.key} ${keyColor} ${noFlat} ${firstSharp} ${cSharp} ${fSharp}`}
      style={{ opacity }}
      // ref={keyRef}
      data-keyname={keyName}
      onMouseDown={handleNoteOn}
      onMouseUp={handleNoteOff}
      onContextMenu={handleRightClick}
      onTouchStart={handleNoteOn}
      onTouchEnd={handleNoteOff}
    >
      {/* TODO: make this a button? Remove the role="button" above.  */}
      {/* {keyIsCNatural && !keyIsCSharp && <p>{keyName}</p>} */}
      {/* {keyNamesType === 'none' ? '' : <p>{keyName}</p>} */}
      <p>{keyLabel}</p>
    </li>
    //   <VisibilitySensor
    //   key={index}
    //   onChange={onVisibilityChange}
    //   partialVisibility={true}
    //   resizeThrottle="1000"
    // >
    //   {/* eslint-disable-next-line */}
    //   <li
    //     className={`${styles.key} ${keyColor} ${noFlat} ${firstSharp} ${cSharp} ${dSharp} ${fSharp} ${gSharp} ${aSharp}`}
    //     style={{ opacity }}
    //     // ref={keyRef}
    //     data-keyname={keyName}
    //     onMouseDown={handleNoteOn}
    //     onMouseUp={handleNoteOff}
    //   >
    //     {/* TODO: make this a button? Remove the role="button" above. */}
    //     {/* <p>{keyName}</p> */}
    //   </li>
    // </VisibilitySensor>
  );
};

export default Key;
