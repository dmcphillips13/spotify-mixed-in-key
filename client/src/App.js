import React, { Component } from "react";
import { connect } from "react-redux";
import "./App.css";
import { Route, Switch, HashRouter } from "react-router-dom";
import Spotify from "spotify-web-api-js";
import Playlist from "./Playlist";
import SingleTrack from "./SingleTrack";
import { loadPlaylists } from "./store";

const spotifyWebApi = new Spotify();

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
    };
  }

  async componentDidMount() {
    const params = await this.getHashParams();
    if (params.access_token) {
      await spotifyWebApi.setAccessToken(params.access_token);
      await this.setState({ loggedIn: true });
    }
    await this.props.loadInitialData();
  }

  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  render() {
    const { loggedIn } = this.state;
    if (!loggedIn) {
      return (
        <div>
          <a href="http://localhost:8888">
            <button>Login With Spotify</button>
          </a>
        </div>
      );
    }
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/:accessToken" component={Playlist} />
          <Route exact path="/:accessToken/:id" component={SingleTrack} />
        </Switch>
      </HashRouter>
    );
  }
}

const mapStateToProps = ({ playlists, playlistTracks, trackAudioFeatures }) => {
  return {
    playlists,
    playlistTracks,
    trackAudioFeatures,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadInitialData: () => {
      dispatch(loadPlaylists());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
