/**
 * @Date:   11.15.2017 08:17am
 * @Filename: reducers.js
 * @Last modified time: 11.15.2017 08:23am
 */

import { combineReducers } from 'redux';
import {
  PING,
  PONG,
  BEEP,
  BOOP,
  FETCH_USER_FULFILLED,
} from './epics';


const pingState = {
  isPinging: false,
};
const beepState = {
  isBeeping: false,
  someArr: [1, 2, 3, 4, 5],
};

const githubState = {
  isLoading: false,
  value: '',
  githubResponse: [],
};

const fetchUserReducer = (state = githubState, action) => {
  console.log('githubReducer RAN >> action.type >>', action.type, action);
  switch (action.type) {
    case FETCH_USER_FULFILLED:
      return {
        ...state,
        githubResponse: [...state.githubResponse, action.payload],
      };
    default:
      return state;
  }
};


const pingReducer = (state = pingState, action) => {
  switch (action.type) {
    case PING:
      return { isPinging: 'thruth' };
    case PONG:
      return { isPinging: false };
    default:
      return state;
  }
};


const beepReducer = (state = beepState, action) => {
  switch (action.type) {
    case BEEP:
      return {
        isBeeping: true,
        someArr: [],
        foo: 'ooooo',
        log: console.log('BEEP RAN in REDUCER'),
      };
    case BOOP:
      return {
        isBeeping: false,
        someArr: action.foo,
        foo: action.foo,
      };
    default:
      return state;
  }
};

const reducerObj = {
  pingReducer,
  beepReducer,
  fetchUserReducer,
};

const rootReducer = combineReducers(reducerObj);

export default rootReducer;
