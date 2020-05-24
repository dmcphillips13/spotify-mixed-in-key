import React, { Component } from "react";
import { connect } from "react-redux";
import "./App.css";
import { Route, Switch, HashRouter } from "react-router-dom";
import Spotify from "spotify-web-api-js";
import Playlist from "./Playlist";
import SingleTrack from "./SingleTrack";
import {
  loadPlaylists,
  loadPlaylistTracks,
  loadTracksAudioFeatures,
} from "./store";

const spotifyWebApi = new Spotify();

class App extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    this.state = {
      loggedIn: params.access_token ? true : false,
      chosenPlaylistTitle: "DJ App Test",
    };
    if (params.access_token) {
      spotifyWebApi.setAccessToken(params.access_token);
    }
  }

  async componentDidMount() {
    await this.props.getPlaylists();

    const chosenPlaylist = await this.props.playlists.items.find(
      (playlist) => playlist.name === this.state.chosenPlaylistTitle
    );

    await this.props.getPlaylistTracks(chosenPlaylist.id);

    const tracksIds = await this.props.playlistTracks.map((trackObject) => {
      return trackObject.track.id;
    });

    await this.props.getTracksAudioFeatures(tracksIds);
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
    // const { playlists, playlistTracks, tracksAudioFeatures } = this.props;
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

const mapStateToProps = ({
  playlists,
  playlistTracks,
  tracksAudioFeatures,
}) => {
  return {
    playlists,
    playlistTracks,
    tracksAudioFeatures,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPlaylists: () => dispatch(loadPlaylists()),
    getPlaylistTracks: (id) => dispatch(loadPlaylistTracks(id)),
    getTracksAudioFeatures: (tracksIds) =>
      dispatch(loadTracksAudioFeatures(tracksIds)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
