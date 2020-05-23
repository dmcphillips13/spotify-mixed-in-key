import React, { Component } from "react";
import "./App.css";
import Spotify from "spotify-web-api-js";

const spotifyWebApi = new Spotify();

class SingleTrack extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      artists: [],
      tempo: undefined,
      key: undefined,
      energy: undefined,
      danceability: undefined,
      chosenPlaylistTracks: [],
    };
  }

  async componentDidMount() {
    const track = await spotifyWebApi.getTrack(this.props.match.params.id);
    const {
      tempo,
      key,
      energy,
      danceability,
      chosenPlaylistTracks,
    } = this.props.location.state;

    await chosenPlaylistTracks.map((trackObject) => {
      this.fetchAudioFeatures(trackObject);
    });

    this.setState({
      name: track.name,
      artists: track.artists,
      tempo,
      key,
      energy,
      danceability,
      chosenPlaylistTracks,
    });
  }

  async fetchAudioFeatures(trackObject) {
    const audioFeatures = await spotifyWebApi.getAudioFeaturesForTrack(
      trackObject.track.id
    );

    trackObject.track.audioFeatures = audioFeatures;
  }

  render() {
    const {
      name,
      artists,
      tempo,
      key,
      energy,
      danceability,
      chosenPlaylistTracks,
    } = this.state;
    console.log(chosenPlaylistTracks);
    if (
      !name ||
      !artists ||
      !tempo ||
      !key ||
      !energy ||
      !danceability ||
      !chosenPlaylistTracks
    ) {
      return <h1>Loading...</h1>;
    }
    return (
      <div>
        <h1>{name}</h1>
        <h2>
          {artists.map((artist, idx) =>
            idx === artists.length - 1 ? `${artist.name}` : `${artist.name}, `
          )}
        </h2>
        <h3>Tempo: {parseInt(tempo)}</h3>
        <h3>Key: {key}</h3>
        <h3>Energy: {parseInt(energy * 10)}</h3>
        <h3>Danceability: {parseInt(danceability * 10)}</h3>
      </div>
    );
  }
}

export default SingleTrack;
