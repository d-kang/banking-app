/**
 * @Date:   11.12.2017
 * @Filename: Github.jsx
 * @Last modified time: 11.16.2017 02:56pm
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextInput from '../ui/TextInput';
import { fetchRepoAction } from '../../actions';
import Loader from '../ui/Loader';

const styling = {
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    flexFlow: 'row wrap',
    alignContent: 'flex-end',
  },
  sample: {
    display: 'flex; display: -webkit-box',
    marginTop: '10px',
    color: 'red',
  },
  colorings: {
    color: 'yellow',
  },
};

class GithubRepos extends Component {
  fetchAction = (val) => {
    this.props.fetchRepoAction(val);
  }
  render() {
    const {
      fetchRepoResponse,
      isLoading,
      value
    } = this.props;
    const mapped = fetchRepoResponse.map((repo, i) => (
      <div>
        <hr/>
        {console.log('repo', repo)}
        <div>Repo Name: {repo.repo_name}</div>
        <div>Repo URL: {repo.repo_url}</div>
        <div>Repo Description{repo.description}</div>
        <div>Repo Commits {repo.commits}</div>
      </div>
    ))
    // .map(repo => ({
    //   repo_name: repo.name,
    //   username: repo.owner.login,
    //   avatar: repo.owner.avatar,
    //   repo_url: repo.html_url,
    //   description: repo.description,
    //   commits: repo.commits_url,
    // }))
    return (
      <div>
        <TextInput
          fetchUserAction={this.fetchAction}
          label="Github Repos"
        />
        {
          isLoading
            ? <Loader isLoading={isLoading} />
            : fetchRepoResponse.length > 0
            && <div>
                <div><img src={fetchRepoResponse[0].avatar + '&s=88'} alt=""/></div>
                <div>Username: {fetchRepoResponse[0].username}</div>
                { mapped }
              </div>

        }
      </div>
    );
  }
}


const mapState = state => ({
  fetchRepoResponse: state.fetchRepoReducer.fetchRepoResponse,
  isLoading: state.fetchRepoReducer.isLoading,
  value: state.fetchRepoReducer.value,
});

export default connect(mapState, { fetchRepoAction })(GithubRepos);
