import React, { Component } from "react";
import "./App.css";
import Spotify from "spotify-web-api-js";

const spotifyWebApi = new Spotify();

class App extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    this.state = {
      loggedIn: params.access_token ? true : false,
      nowPlaying: {
        name: "Not Checked",
        image: "",
      },
      chosenPlaylistTitle: "May 2020",
      chosenPlaylist: {},
      chosenPlaylistTracks: [],
    };
    if (params.access_token) {
      spotifyWebApi.setAccessToken(params.access_token);
    }
    this.getNowPlaying = this.getNowPlaying.bind(this);
  }

  async componentDidMount() {
    await this.getNowPlaying();

    const playlists = await spotifyWebApi.getUserPlaylists();
    const chosenPlaylist = await playlists.items.find(
      (playlist) => playlist.name === this.state.chosenPlaylistTitle
    );
    await this.setState({ chosenPlaylist });
    const tracksResponse = await spotifyWebApi.getPlaylistTracks(
      this.state.chosenPlaylist.id
    );
    await this.setState({ chosenPlaylistTracks: tracksResponse.items });
  }

  // async componentDidUpdate(prevProps, prevState) {
  //   const currentSong = await spotifyWebApi.getMyCurrentPlayingTrack();
  //   console.log(this.state.nowPlaying.name);
  //   // if (currentSong.item.name !== this.state.nowPlaying.name) {
  //   //   console.log("changed");
  //   // }
  // }

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

  getNowPlaying() {
    spotifyWebApi.getMyCurrentPlaybackState().then((response) => {
      this.setState({
        nowPlaying: {
          name: response.item.name,
          image: response.item.album.images[0].url,
        },
      });
    });
  }

  async skip() {
    await spotifyWebApi.skipToNext();
    // const newSong = await spotifyWebApi.getMyCurrentPlayingTrack();
    // await this.setState({
    //   name: newSong.item.name,
    //   image: newSong.item.album.images[0].url,
    // });
  }

  render() {
    if (!this.state.loggedIn) {
      return (
        <div>
          <a href="http://localhost:8888">
            <button>Login With Spotify</button>
          </a>
        </div>
      );
    }
    return (
      <div className="App">
        <a href="http://localhost:8888">
          <button>Login With Spotify</button>
        </a>
        <div>Now Playing: {this.state.nowPlaying.name}</div>
        <div>
          <img src={this.state.nowPlaying.image} style={{ width: 100 }} />
        </div>
        <button onClick={() => this.getNowPlaying()}>Check Now Playing</button>
        <button onClick={() => spotifyWebApi.seek(0)}>Previous</button>
        <button onClick={() => spotifyWebApi.pause()}>Pause</button>
        <button onClick={() => spotifyWebApi.play()}>Play</button>
        <button onClick={this.skip}>Skip</button>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Artist</th>
              <th>Album</th>
            </tr>
          </thead>
          <tbody>
            {this.state.chosenPlaylistTracks.map((trackObject) => {
              return (
                <tr key={trackObject.track.id}>
                  <td>{trackObject.track.name}</td>
                  <td>
                    {trackObject.track.artists.map((artist, idx) =>
                      idx === trackObject.track.artists.length - 1
                        ? `${artist.name}`
                        : `${artist.name}, `
                    )}
                  </td>
                  {/* <td>{trackObject.track.artist}</td> */}
                  <td>{trackObject.track.album.name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
