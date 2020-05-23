import React, { Component } from "react";
import "./App.css";
import { Route, Switch, HashRouter } from "react-router-dom";
import Spotify from "spotify-web-api-js";
import Playlist from "./Playlist";

const spotifyWebApi = new Spotify();

class App extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    this.state = {
      loggedIn: params.access_token ? true : false,
    };
    if (params.access_token) {
      spotifyWebApi.setAccessToken(params.access_token);
    }
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
          <Route path="/" component={Playlist} />
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
