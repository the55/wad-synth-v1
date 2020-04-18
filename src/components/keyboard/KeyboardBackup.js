import React, {
  createRef,
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import OscillatorContext from '../../context/oscillatorContext/oscillatorContext';
import Wad from 'web-audio-daw';
import Key from './Key';
import styles from './Keyboard.module.scss';

const Keyboard = () => {
  const oscillatorContext = useContext(OscillatorContext);

  const {
    setNotePitch,
    notePlaying,
    setNotePlaying,
    setNoteVolume,
  } = oscillatorContext;

  // Component Loading State
  const [componentLoading, setComponentLoading] = useState(true);

  // Setup the keyboard
  const [keyNamesType, setKeyNamesType] = useState('none'); // Note labels default to off

  const keyNames = Object.keys(Wad.pitches); // Get all the key names from Wad. This array includes both Sharp and Flat names, as well as notes that don't exist, like E#

  const [currentOctave, setCurrentOctave] = useState('4'); // Default current octave

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
  // console.log('timeout: ' + timeout);

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

  const handleKeyNameSelect = (e) => {
    setKeyNamesType(e.target.value);
  };

  // Update the current Octave. Default is 4 (see above)
  const handleSetCurrentOctave = (e) => {
    setCurrentOctave(e.target.value);
  };

  // Move the keyboard so that the current octave is centered
  const keyboardRef = createRef();
  const [keyboardOffset, setKeyboardOffset] = useState(0); // Y position of the keyboard
  useEffect(() => {
    // Get the G key of the current octave
    let keyboardRefG = keyboardRef.current.querySelector(
      `[data-keyname="G${currentOctave}"]`
    );
    // Do some math to move the keyboard so that the current G is in the middle of the viewport
    let tempKeyboardOffset = windowWidth / 2 - keyboardRefG.offsetLeft;
    // Update the Y position of the keyboard
    setKeyboardOffset(tempKeyboardOffset);
    // Using setTimeout to fade the keyboard in after it's location has been set, just the first time it loads
    setTimeout(() => {
      setComponentLoading(false);
    }, 1000);
  }, [componentLoading, keyboardRef, currentOctave, windowWidth]);

  const opacity = componentLoading ? '0' : '1';

  const [qwertyNotes, setQwertyNotes] = useState();

  useEffect(() => {
    setQwertyNotes({
      a: `C${currentOctave}`,
      w: `C#${currentOctave}`,
      s: `D${currentOctave}`,
      e: `D#${currentOctave}`,
      d: `E${currentOctave}`,
      f: `F${currentOctave}`,
      t: `F#${currentOctave}`,
      g: `G${currentOctave}`,
      y: `G#${currentOctave}`,
      h: `A${currentOctave}`,
      u: `A#${currentOctave}`,
      j: `B${currentOctave}`,
      k: `C${+currentOctave + 1}`,
    });
  }, [currentOctave]);

  const [qwertyPressed, setQwertyPressed] = useState(null); // This stores the pressed key

  // When a key is pressed, save its value in the qwertyPressed state
  const handleQwertyNoteOn = (e) => {
    if (e.key === 'a' || e.key === 's') {
      setQwertyPressed(e.key);
    }
  };

  // Get the note values and update the context
  async function playThisNote(keyName) {
    await setNotePitch(keyName); // First, set the Pitch
    await setNoteVolume(0.3);
    await setNotePlaying(true); // Then set playing to True
  }

  // Watch for changes in qwertyPressed, and play the appropriate note
  useEffect(() => {
    // make sure the notes loaded
    if (qwertyNotes && !notePlaying) {
      // if (qwertyNotes) {
      // console.log('started playing');
      // If a key press matches a key in qwertyNotes, play that note
      switch (qwertyPressed) {
        case 'a':
          console.log('a pressed');
          console.log(qwertyPressed);
          playThisNote(qwertyNotes.a);
          break;
        case 'w':
          playThisNote(qwertyNotes.w);
          break;
        case 's':
          console.log('s pressed');
          console.log(qwertyPressed);
          playThisNote(qwertyNotes.s);
          break;
        case 'e':
          playThisNote(qwertyNotes.e);
          break;
        case 'd':
          playThisNote(qwertyNotes.d);
          break;
        case 'f':
          playThisNote(qwertyNotes.f);
          break;
        case 't':
          playThisNote(qwertyNotes.t);
          break;
        case 'g':
          playThisNote(qwertyNotes.g);
          break;
        case 'y':
          playThisNote(qwertyNotes.y);
          break;
        case 'h':
          playThisNote(qwertyNotes.h);
          break;
        case 'u':
          playThisNote(qwertyNotes.u);
          break;
        case 'j':
          playThisNote(qwertyNotes.j);
          break;
        case 'k':
          playThisNote(qwertyNotes.k);
          break;
        default:
        //;
      }
    }
    // else if (qwertyPressed !== null) {
    //   setNotePlaying(false);
    // }
    // eslint-disable-next-line
    // }, [qwertyNotes, qwertyPressed, notePlaying]);
  }, [qwertyNotes, qwertyPressed, notePlaying]);

  // Stop playing the note
  // const handleQwertyNoteOff = useCallback(() => {
  //   setNotePlaying(false); // Update the context
  //   // setQwertyPressed(null); // Reset the qwertyPressed state
  //   console.log('note off');
  //   // eslint-disable-next-line
  // }, []);

  // const handleQwertyNoteOff = useCallback(
  //   (e) => {
  //     if (e.key === qwertyPressed) {
  //       console.log('note off');
  //     }
  //     console.log(qwertyPressed);
  //     // setNotePlaying(false); // Update the context
  //     // setQwertyPressed(null); // Reset the qwertyPressed state
  //     // console.log('note off');
  //     // eslint-disable-next-line
  //   },
  //   [qwertyPressed]
  // );

  const handleQwertyNoteOff = (e) => {
    return console.log(qwertyPressed);

    // if (e.key === qwertyPressed) {
    //   console.log('note off');
    // }
    // console.log(qwertyPressed);
    // setNotePlaying(false); // Update the context
    // setQwertyPressed(null); // Reset the qwertyPressed state
    // console.log('note off');
    // eslint-disable-next-line
  };
  // console.log(handleQwertyNoteOff);

  useEffect(() => {
    if (qwertyPressed === null) {
      setNotePlaying(false);
    }
  }, [qwertyPressed]);

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
      <h2>Keyboard</h2>

      <label htmlFor="currentOctaveInput">
        OCT
        <input
          type="number"
          id="currentOctaveInput"
          name="currentOctaveInput"
          min="1"
          max="7"
          value={currentOctave}
          onChange={handleSetCurrentOctave}
          onKeyDown={(e) => {
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
                  currentOctave={currentOctave}
                  keyNamesType={keyNamesType}
                />
              ))
            : keyNamesFlats.map((keyName, index) => (
                <Key
                  key={index}
                  index={index}
                  keyName={keyName}
                  currentOctave={currentOctave}
                  keyNamesType={keyNamesType}
                />
              ))}
        </ul>
      </div>
    </div>
  );
};

export default Keyboard;
