import {
  SET_OSCILLATOR_OUTPUT,
  SET_NOTE_PITCH,
  SET_NOTE_PLAYING,
  SET_NOTE_VOLUME,
  SET_OSCILLATOR_HOLD,
} from './oscillatorTypes';

export default (state, action) => {
  switch (action.type) {
    case SET_OSCILLATOR_OUTPUT:
      return {
        ...state,
        oscillatorOutput: action.payload,
      };
    // case SET_NOTE_PITCH:
    //   return {
    //     ...state,
    //     oscillatorOutput: state.oscillatorOutput.map((oscillator) => {
    //       return {
    //         ...oscillator,
    //         pitch: action.payload,
    //       };
    //     }),
    //   };
    case SET_NOTE_PITCH:
      return {
        ...state,
        notePitch: action.payload,
      };
    case SET_NOTE_PLAYING:
      return {
        ...state,
        notePlaying: action.payload,
      };
    case SET_NOTE_VOLUME:
      return {
        ...state,
        noteVolume: action.payload,
      };
    case SET_OSCILLATOR_HOLD:
      return {
        ...state,
        oscillatorHold: action.payload,
      };
    default:
      return state;
  }
};
