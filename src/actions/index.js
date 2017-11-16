/**
 * @Author: wiz
 * @Date:   11.15.2017 08:19pm
 * @Filename: actionTypes.js
 * @Last modified by:   wiz
 * @Last modified time: 11.16.2017 02:01pm
 */

export const PING = 'PING';
export const PONG = 'PONG';
export const BEEP = 'BEEP';
export const BOOP = 'BOOP';
export const FETCH_USER = 'FETCH_USER';
export const FETCH_USER_FULFILLED = 'FETCH_USER_FULFILLED';
export const FETCH_REPO = 'FETCH_REPO';
export const FETCH_REPO_FULFILLED = 'FETCH_REPO_FULFILLED';

export const ping = () => ({ type: PING });

export const beep = () => ({ type: BEEP });

export const fetchUserAction = (value) => ({
  type: FETCH_USER,
  isFetching: false,
  value,
});

// const fetchUser = (username) => ({
//   type: FETCH_USER,
//   isLoading: true,
//   value: username,
// });

export const fetchUserFullfilled = (payload) => ({
  logger: console.log('logger payload fetchUserFullfilled', payload),
  type: FETCH_USER_FULFILLED,
  payload,
});


export const fetchRepoFullfilled = (payload) => ({
  logger: console.log('logger payload fetchRepoFullfilled', payload),
  type: FETCH_REPO_FULFILLED,
  payload,
});
