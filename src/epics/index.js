import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { ajax } from 'rxjs/observable/dom/ajax';
import { Observable } from 'rxjs';
import * as types from '../actions/actionTypes';
import * as creators from '../actions';
import 'rxjs/add/operator/map';

const headers = {
  Accept: 'application/json, text/plain, */*',
  'Content-Type': 'application/json',
};


// .do(items => console.log('do log items 1', items))
// api v3 with using search api and updated
// `https://api.github.com/search/repositories?q=user:${value}+sort:updated`
// `https://api.github.com/users/${value}/repos?per_page=100`

const fetchYoutubeEpic = action$ => (
  action$.ofType(types.FETCH_YOUTUBE)
    .map(({ payload }) => payload)
    .mergeMap(payload => (
      ajax({
        url: 'http://localhost:3500/api/youtube',
        method: 'POST',
        headers,
        body: JSON.stringify({ payload }),
      })
        .map(({ response }) => response)
        .map(({ items }) => items)
        .map(creators.fetchYoutubeFullfilled)
    ))
    // .takeUntil(action$.ofType(FETCH_USER_CANCELLED))
);

const fetchUserEpic = action$ => (
  action$.ofType(types.FETCH_USER)
    .mergeMap(({ value }) => (
      ajax.getJSON(`https://api.github.com/users/${value}`)
        .map(creators.fetchUserFullfilled)
        .takeUntil(action$.ofType(types.FETCH_USER_CANCELLED))
        .catch(err => Observable.of(creators.fetchRejected(err)))
    ))
);


const fetchRepoEpic = action$ => (
  action$.ofType(types.FETCH_REPO)
    .map(({ value }) => value)
    .mergeMap(value => (
      ajax.getJSON(`https://api.github.com/search/repositories?q=user:${value}+sort:updated`)
        .map((response: any) => response.items.map(repo => ({
          repo_name: repo.name,
          username: repo.owner.login,
          avatar: repo.owner.avatar_url,
          repo_url: repo.html_url,
          description: repo.description,
          commits: repo.commits_url,
        })))
        .map(creators.fetchRepoFullfilled)
        .catch(err => Observable.of(creators.fetchRejected(err)))
    ))
);

const listCommitsEpic = action$ => (
  action$.ofType(types.LIST_COMMITS)
    .mergeMap(({ apiUrl }) => (
      ajax.getJSON(`${apiUrl}?per_page=100`)
        .map((response: any[]) => response.map(({ commit, comments_url }) => ({
          message: commit.message,
          timeStamp: new Date(commit.author.date).toLocaleDateString(),
          dateStamp: new Date(commit.author.date).toLocaleTimeString(),
          url: comments_url,
        })))
        .map(creators.listCommitsFullfilled)
    ))
);

const pingEpic = action$ => (
  action$.ofType(types.PING)
    .mergeMap(() => (
      ajax.getJSON('http://localhost:3500/api/ping')
        .mapTo({ type: types.PONG })
    ))
);

const beepEpic = action$ => (
  action$.ofType(types.BEEP)
    .mergeMap(() => (
      ajax.getJSON('http://localhost:3500/api/ping')
        .mapTo({ type: types.BOOP })
    ))
);

const rootEpic = combineEpics(
  pingEpic,
  beepEpic,
  fetchUserEpic,
  fetchRepoEpic,
  fetchYoutubeEpic,
  listCommitsEpic,
);

const epicMiddleware = createEpicMiddleware(rootEpic);

export default epicMiddleware;
