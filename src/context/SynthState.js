import React, { useReducer } from 'react';
import SynthContext from './synthContext';
import synthReducer from './synthReducer';
import {} from './synthTypes';

const SynthState = (props) => {
  const initialState = {};

  //All of our actions involving state go below. The type of action is dispatched to the Reducer.
  const [state, dispatch] = useReducer(synthReducer, initialState);

  return (
    <SynthContext.Provider value={{}}>{props.children}</SynthContext.Provider>
  );
};

export default SynthState;
