import React, { Component } from "react";
import "./App.css";
import Spotify from "spotify-web-api-js";
import TrackInfo from "./TrackInfo";

const spotifyWebApi = new Spotify();

class Playlist extends Component {
  constructor() {
    super();
    this.state = {
      chosenPlaylistTitle: "May 2020",
      chosenPlaylist: {},
      chosenPlaylistTracks: [],
    };
  }

  async componentDidMount() {
    const playlists = await spotifyWebApi.getUserPlaylists();

    const chosenPlaylist = await playlists.items.find(
      (playlist) => playlist.name === this.state.chosenPlaylistTitle
    );
    await this.setState({ chosenPlaylist });

    const tracksResponse = await spotifyWebApi.getPlaylistTracks(
      this.state.chosenPlaylist.id
    );

    this.setState({ chosenPlaylistTracks: tracksResponse.items });
  }

  render() {
    const { chosenPlaylistTitle, chosenPlaylistTracks } = this.state;
    console.log(chosenPlaylistTracks);
    return (
      <div className="App">
        <h1>{chosenPlaylistTitle}</h1>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Artist</th>
              <th>BPM</th>
              <th>Key</th>
              <th>Energy</th>
              <th>Danceability</th>
            </tr>
          </thead>
          <tbody>
            {chosenPlaylistTracks.map((trackObject) => {
              return (
                <TrackInfo
                  chosenPlaylistTracks={this.state.chosenPlaylistTracks}
                  location={this.props.location}
                  {...trackObject.track}
                  key={trackObject.track.id}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Playlist;
