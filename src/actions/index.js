/**
 * @Author: wiz
 * @Date:   11.15.2017 08:19pm
 * @Filename: actionTypes.js
 * @Last modified by:   wiz
 * @Last modified time: 11.15.2017 08:49pm
 */

export const PING = 'PING';
export const PONG = 'PONG';
export const BEEP = 'BEEP';
export const BOOP = 'BOOP';
export const FETCH_USER = 'FETCH_USER';
export const FETCH_USER_FULFILLED = 'FETCH_USER_FULFILLED';

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
  logger: console.log('payload', payload),
  type: FETCH_USER_FULFILLED,
  payload,
});