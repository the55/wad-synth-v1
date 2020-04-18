import {
  SET_VOLUME_ENVELOPE_ATTACK,
  SET_VOLUME_ENVELOPE_DECAY,
  SET_VOLUME_ENVELOPE_SUSTAIN,
  SET_VOLUME_ENVELOPE_HOLD,
  SET_VOLUME_ENVELOPE_RELEASE,
} from './volumeEnvelopeTypes';

export default (state, action) => {
  switch (action.type) {
    case SET_VOLUME_ENVELOPE_ATTACK:
      return {
        ...state,
        volumeEnvelopeAttack: {
          ...state.volumeEnvelopeAttack,
          sliderValue: action.payload.sliderValue,
          scaledValue: action.payload.scaledValue,
        },
      };
    case SET_VOLUME_ENVELOPE_DECAY:
      return {
        ...state,
        volumeEnvelopeDecay: {
          ...state.volumeEnvelopeDecay,
          sliderValue: action.payload.sliderValue,
          scaledValue: action.payload.scaledValue,
        },
      };
    case SET_VOLUME_ENVELOPE_SUSTAIN:
      return {
        ...state,
        volumeEnvelopeSustain: {
          ...state.volumeEnvelopeSustain,
          sliderValue: action.payload.sliderValue,
          scaledValue: action.payload.scaledValue,
        },
      };
    // case SET_VOLUME_ENVELOPE_SUSTAIN:
    //   return {
    //     ...state,
    //     volumeEnvelopeSustain: action.payload,
    //   };
    case SET_VOLUME_ENVELOPE_HOLD:
      return {
        ...state,
        volumeEnvelopeHold: {
          ...state.volumeEnvelopeHold,
          sliderValue: action.payload.sliderValue,
          scaledValue: action.payload.scaledValue,
        },
      };
    case SET_VOLUME_ENVELOPE_RELEASE:
      return {
        ...state,
        volumeEnvelopeRelease: {
          ...state.volumeEnvelopeRelease,
          sliderValue: action.payload.sliderValue,
          scaledValue: action.payload.scaledValue,
        },
      };
    default:
      return state;
  }
};
