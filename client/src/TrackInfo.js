import React, { Component } from "react";
import "./App.css";
import Spotify from "spotify-web-api-js";

const spotifyWebApi = new Spotify();

class TrackInfo extends Component {
  constructor() {
    super();
    this.state = {
      tempo: undefined,
      key: undefined,
      energy: undefined,
      danceability: undefined,
    };
  }

  async componentDidMount() {
    const audioFeatures = await spotifyWebApi.getAudioFeaturesForTrack(
      this.props.id
    );

    console.log(audioFeatures);

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

    this.setState({
      tempo: audioFeatures.tempo,
      key: camelotKey,
      energy: audioFeatures.energy,
      danceability: audioFeatures.danceability,
    });
  }

  render() {
    const { tempo, key, energy, danceability } = this.state;
    const { id, name, artists } = this.props;
    if (!tempo || !key || !energy) {
      return (
        <tr>
          <td>Loading...</td>
        </tr>
      );
    }
    return (
      <tr>
        <td>
          <button>Select</button>
        </td>
        <td>{name}</td>
        <td>
          {artists.map((artist, idx) =>
            idx === artists.length - 1 ? `${artist.name}` : `${artist.name}, `
          )}
        </td>
        <td>{parseInt(tempo)}</td>
        <td>{key}</td>
        <td>{parseInt(energy * 10)}</td>
        <td>{parseInt(danceability * 10)}</td>
      </tr>
    );
  }
}

export default TrackInfo;
