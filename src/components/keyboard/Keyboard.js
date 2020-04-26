import React, {
  createRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import OscillatorContext from '../../context/oscillatorContext/oscillatorContext';
import Wad from 'web-audio-daw';
import Key from './Key';
import styles from './Keyboard.module.scss';

const Keyboard = () => {
  const oscillatorContext = useContext(OscillatorContext);

  const {
    oscillators,
    notePitch,
    setNotePitch,
    setOscillatorPitch,
    notePlaying,
    setNotePlaying,
    setNoteVolume,
  } = oscillatorContext;

  // Component Loading State
  const [componentLoading, setComponentLoading] = useState(true);

  // Setup the keyboard
  const [keyNamesType, setKeyNamesType] = useState('none'); // Note labels default to off

  const keyNames = Object.keys(Wad.pitches); // Get all the key names from Wad. This array includes both Sharp and Flat names, as well as notes that don't exist, like E#

  const [keyboardOctave, setKeyboardOctave] = useState('4'); // Default current octave

  // Get the window width. Used to determine whether a big or small logo is rendered.
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const getWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  // // Trying to throttle the resize event but don't think it's doing much
  // const getWindowWidth = () => {
  //   let timeout;
  //   // If there's a timer, cancel it
  //   if (timeout) {
  //     window.cancelAnimationFrame(timeout);
  //   }
  //   // Setup the new requestAnimationFrame()
  //   timeout = window.requestAnimationFrame(function () {
  //     // Run the function
  //     setWindowWidth(window.innerWidth);
  //     console.log('resized');
  //   });
  // };
  // // console.log('timeout: ' + timeout);

  // Add and Remove the resize event listener
  useEffect(() => {
    window.addEventListener('resize', getWindowWidth);
    return () => {
      window.removeEventListener('resize', getWindowWidth);
    };
  }, []);

  // This Filters all the keys for Sharps and Flats
  const keyNamesSharps = keyNames.filter((keyName) => {
    // To get the Natural and Sharp key names, filter out all flats, and sharps that don't exist
    return !keyName.match(/b|B#|E#/);
  });

  const keyNamesFlats = keyNames.filter((keyName) => {
    // To get the Natural and Flat key names, filter out all sharps, and flats that don't exist
    return !keyName.match(/#|Cb|Fb/);
  });

  // Select type of key label
  const handleKeyNameSelect = (e) => {
    setKeyNamesType(e.target.value);
  };

  // Update the current Octave. Default is 4 (see above)
  const handleSetKeyboardOctave = (e) => {
    setKeyboardOctave(e.target.value);
  };

  // Move the keyboard so that the current octave is centered
  const keyboardRef = createRef();
  const [keyboardOffset, setKeyboardOffset] = useState(0); // Y position of the keyboard
  useEffect(() => {
    // Get the G key of the current octave
    let keyboardRefG = keyboardRef.current.querySelector(
      `[data-keyname="G${keyboardOctave}"]`
    );
    // Do some math to move the keyboard so that the current G is in the middle of the viewport
    let tempKeyboardOffset = windowWidth / 2 - keyboardRefG.offsetLeft + 2;
    // Update the Y position of the keyboard
    setKeyboardOffset(tempKeyboardOffset);
    // Using setTimeout to fade the keyboard in after it's location has been set, just the first time it loads
    setTimeout(() => {
      setComponentLoading(false);
    }, 1000);
  }, [componentLoading, keyboardRef, keyboardOctave, windowWidth]);

  const opacity = componentLoading ? '0' : '1';

  // Associate physical keyboard keys with virtual keys
  const [qwertyNotes, setQwertyNotes] = useState();
  useEffect(() => {
    setQwertyNotes({
      a: `C${keyboardOctave}`,
      w: `C#${keyboardOctave}`,
      s: `D${keyboardOctave}`,
      e: `D#${keyboardOctave}`,
      d: `E${keyboardOctave}`,
      f: `F${keyboardOctave}`,
      t: `F#${keyboardOctave}`,
      g: `G${keyboardOctave}`,
      y: `G#${keyboardOctave}`,
      h: `A${keyboardOctave}`,
      u: `A#${keyboardOctave}`,
      j: `B${keyboardOctave}`,
      k: `C${+keyboardOctave + 1}`,
    });
  }, [keyboardOctave]);

  // If a physical key is pressed, store in the state
  // Need to use useRef in order to access the state in the event listeners
  const [qwertyPressed, _setQwertyPressed] = useState(null);
  const qwertyPressedRef = useRef(qwertyPressed);
  const setQwertyPressed = (qwertyKey) => {
    qwertyPressedRef.current = qwertyKey;
    _setQwertyPressed(qwertyKey);
  };

  // Do stuff when a key is pressed
  const handleQwertyNoteOn = (e) => {
    // If there's not a note currently playing, just play the new note
    if (qwertyPressedRef.current === null) {
      setQwertyPressed(e.key);
    }
    // If a key pressed while a note is already playing, stop the old note and play the new one
    else if (
      qwertyPressedRef.current !== null &&
      qwertyPressedRef.current !== e.key
    ) {
      setQwertyPressed(null); // Reset the state
      setNotePlaying(false); // Update the context
      setQwertyPressed(e.key); // Set the new state
    }
  };

  // Get the note values and update the context
  // async function playThisNote(keyName) {
  //   await setNotePitch(keyName); // First, set the Pitch
  //   // await setNoteVolume(0.3); // TODO: Make sure this works with Oscillator volumes
  //   await setNotePlaying(true); // Then set playing to True
  // }

  async function playThisNote(keyName) {
    let frequency;
    // If the qwerty note (keyName) matches a note in Wad.pitches, get the note's frequency value
    Object.entries(Wad.pitches).map(([key, value]) => {
      if (key === keyName) {
        return (frequency = value);
      } else {
        return false;
      }
    });
    await oscillators.map(
      (oscillator) =>
        setOscillatorPitch(oscillator.id, frequency * oscillator.octave) // Update each oscillator's pitch with the played frequency multiplied by that oscillator's octave value
    );
    // await setNoteVolume(0.3); // TODO: Make sure this works with Oscillator volumes
    await setNotePlaying(true); // Then set playing to True
  }

  useEffect(() => {
    // Make sure the notes loaded, that a key has been pressed, and that there isn't a note already playing
    if (qwertyNotes && qwertyPressed !== null && !notePlaying) {
      // Loop through the key/value pairs in the qwertyNotes
      Object.entries(qwertyNotes).forEach(([key, value]) => {
        key === qwertyPressed && playThisNote(value); // if a key matches the pressed key, play its value
      });
    }
    // eslint-disable-next-line
  }, [qwertyNotes, qwertyPressed, notePlaying]);

  // Stop playing the note
  const handleQwertyNoteOff = (e) => {
    // Only let a keyup event corresponding to the currently playing note stop the current note
    if (e.key === qwertyPressedRef.current) {
      setQwertyPressed(null); // Reset the qwertyPressed state
      setNotePlaying(false); // Update the context
    }
  };

  // Add and remove the event listeners
  useEffect(() => {
    document.addEventListener('keydown', handleQwertyNoteOn);
    document.addEventListener('keyup', handleQwertyNoteOff);
    return () => {
      document.removeEventListener('keydown', handleQwertyNoteOn);
      document.addEventListener('keyup', handleQwertyNoteOff);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className={`${styles.keyboardComponent}`} ref={keyboardRef}>
      {/* <h2>Keys</h2> */}

      <label htmlFor="keyboardOctaveInput">
        OCT
        <input
          type="number"
          id="keyboardOctaveInput"
          name="keyboardOctaveInput"
          min="1"
          max="7"
          value={keyboardOctave}
          onChange={handleSetKeyboardOctave}
          onKeyDown={(e) => {
            // Disable key input except for the up and down arrows
            if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') {
              return e.preventDefault();
            }
          }}
        />
      </label>
      <label htmlFor="keyNameSelect">
        LBL
        {/* eslint-disable-next-line */}
        <select
          name="keyNameSelect"
          id="keyNameSelect"
          onChange={handleKeyNameSelect}
        >
          <option value="none">None</option>
          <option value="sharps">Sharps</option>
          <option value="flats">Flats</option>
          <option value="qwerty">Qwerty</option>
        </select>
      </label>
      <div className={`${styles.keyboardContainer}`}>
        <ul
          className={`${styles.keyboard}`}
          style={{ left: `${keyboardOffset}px`, opacity }} // The keyboard position shifts to keep the current octave centered
        >
          {keyNamesType === 'none' ||
          keyNamesType === 'sharps' ||
          keyNamesType === 'qwerty'
            ? keyNamesSharps.map((keyName, index) => (
                <Key
                  key={index}
                  index={index}
                  keyName={keyName}
                  keyboardOctave={keyboardOctave}
                  keyNamesType={keyNamesType}
                />
              ))
            : keyNamesFlats.map((keyName, index) => (
                <Key
                  key={index}
                  index={index}
                  keyName={keyName}
                  keyboardOctave={keyboardOctave}
                  keyNamesType={keyNamesType}
                />
              ))}
        </ul>
      </div>
    </div>
  );
};

export default Keyboard;
