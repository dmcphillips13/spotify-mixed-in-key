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
      chosenPlaylistTracks: [],
    };
    // this.fetchAudioFeatures = this.fetchAudioFeatures.bind(this);
  }

  async componentDidMount() {
    const playlists = await spotifyWebApi.getUserPlaylists();

    const chosenPlaylist = await playlists.items.find(
      (playlist) => playlist.name === this.state.chosenPlaylistTitle
    );

    const tracksResponse = await spotifyWebApi.getPlaylistTracks(
      chosenPlaylist.id
    );

    await tracksResponse.items.map((trackObject) =>
      this.fetchAudioFeatures(trackObject)
    );

    this.setState({
      chosenPlaylistTracks: tracksResponse.items,
    });
  }

  async fetchAudioFeatures(trackObject) {
    const audioFeatures = await spotifyWebApi.getAudioFeaturesForTrack(
      trackObject.track.id
    );

    let camelotKey = audioFeatures.key;
    if (audioFeatures.key === 0) {
      audioFeatures.mode === 1 ? (camelotKey = "8B") : (camelotKey = "5A");
    }
    if (audioFeatures.key === 1) {
      audioFeatures.mode === 1 ? (camelotKey = "3B") : (camelotKey = "12A");
    }
    if (audioFeatures.key === 2) {
      audioFeatures.mode === 1 ? (camelotKey = "10B") : (camelotKey = "7A");
    }
    if (audioFeatures.key === 3) {
      audioFeatures.mode === 1 ? (camelotKey = "5B") : (camelotKey = "2A");
    }
    if (audioFeatures.key === 4) {
      audioFeatures.mode === 1 ? (camelotKey = "12B") : (camelotKey = "9A");
    }
    if (audioFeatures.key === 5) {
      audioFeatures.mode === 1 ? (camelotKey = "7B") : (camelotKey = "4A");
    }
    if (audioFeatures.key === 6) {
      audioFeatures.mode === 1 ? (camelotKey = "2B") : (camelotKey = "11A");
    }
    if (audioFeatures.key === 7) {
      audioFeatures.mode === 1 ? (camelotKey = "9B") : (camelotKey = "6A");
    }
    if (audioFeatures.key === 8) {
      audioFeatures.mode === 1 ? (camelotKey = "4B") : (camelotKey = "1A");
    }
    if (audioFeatures.key === 9) {
      audioFeatures.mode === 1 ? (camelotKey = "11B") : (camelotKey = "8A");
    }
    if (audioFeatures.key === 10) {
      audioFeatures.mode === 1 ? (camelotKey = "6B") : (camelotKey = "3A");
    }
    if (audioFeatures.key === 11) {
      audioFeatures.mode === 1 ? (camelotKey = "1B") : (camelotKey = "10A");
    }

    trackObject.track.camelotKey = camelotKey;

    trackObject.track.audioFeatures = audioFeatures;
  }

  render() {
    // const { fetchAudioFeatures } = this;
    const { chosenPlaylistTitle, chosenPlaylistTracks } = this.state;
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
