/**
 * @Date:   11.15.2017 08:17am
 * @Filename: reducers.js
 * @Last modified time: 11.18.2017 10:09am
 */

import { combineReducers } from 'redux';
import * as types from '../actions/actionTypes';
import initialState from './initialState';


const fetchYoutubeReducer = (state = initialState.youtube, action) => {
  switch (action.type) {
    case types.FETCH_YOUTUBE:
      return {
        ...state,
        isLoading: true,
      };
    case types.FETCH_YOUTUBE_FULFILLED:
      return {
        ...state,
        fetchYoutubeResponse: [...action.payload],
        isLoading: false,
      };
    default:
      return state;
  }
};


const fetchUserReducer = (state = initialState.githubUser, action) => {
  switch (action.type) {
    case types.FETCH_USER:
      return {
        ...state,
        isLoading: true,
      };
    case types.FETCH_USER_CANCELLED:
      return {
        ...state,
        isLoading: false,
      };
    case types.FETCH_USER_FULFILLED:
      return {
        ...state,
        fetchUserResponse: [action.payload, ...state.fetchUserResponse],
        isLoading: false,
      };
    default:
      return state;
  }
};
const fetchRepoReducer = (state = initialState.githubRepos, action) => {
  switch (action.type) {
    case types.FETCH_REPO:
      return {
        ...state,
        isLoading: true,
      };
    case types.FETCH_REPO_FULFILLED:
      return {
        ...state,
        fetchRepoResponse: [action.payload, ...state.fetchRepoResponse],
        isLoading: false,
      };
    default:
      return state;
  }
};


const pingReducer = (state = initialState.ping, action) => {
  switch (action.type) {
    case types.PING:
      return { isPinging: true };
    case types.PONG:
      return { isPinging: false };
    default:
      return state;
  }
};


const beepReducer = (state = initialState.beep, action) => {
  switch (action.type) {
    case types.BEEP:
      return {
        isBeeping: true,
        someArr: [],
        foo: 'ooooo',
      };
    case types.BOOP:
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
  fetchRepoReducer,
  fetchYoutubeReducer,
};

const rootReducer = combineReducers(reducerObj);

export default rootReducer;
