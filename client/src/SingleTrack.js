import React, { Component } from "react";
import "./App.css";
import TrackInfo from "./TrackInfo";
import { connect } from "react-redux";
import { loadSelectedTrack } from "./store";
import { Link } from "react-router-dom";

class SingleTrack extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getSelectedTrack(id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      const id = this.props.match.params.id;
      this.props.getSelectedTrack(id);
    }
  }

  render() {
    const { selectedTrack, tracksAudioFeatures, playlistTracks } = this.props;
    if (!selectedTrack.artists) {
      return <h1>Loading...</h1>;
    }
    const audioFeatures = tracksAudioFeatures.find(
      (tAF) => tAF.id === selectedTrack.id
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

    return (
      <div>
        <Link to={`/${this.props.match.params.accessToken}`}>Home</Link>
        <h1>{selectedTrack.name}</h1>
        <h2>
          {selectedTrack.artists.map((artist, idx) =>
            idx === selectedTrack.artists.length - 1
              ? `${artist.name}`
              : `${artist.name}, `
          )}
        </h2>
        <h3>BPM: {parseInt(audioFeatures.tempo)}</h3>
        <h3>Key: {camelotKey}</h3>
        <h3>Energy: {parseInt(audioFeatures.energy * 10)}</h3>
        <h3>Danceability: {parseInt(audioFeatures.danceability * 10)}</h3>
        <h3>Same Key</h3>
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
            {tracksAudioFeatures
              .filter(
                (tAF) =>
                  tAF.key === audioFeatures.key &&
                  tAF.mode === audioFeatures.mode &&
                  tAF.id !== selectedTrack.id
              )
              .map((tAF) =>
                playlistTracks.find(
                  (playlistTrack) => playlistTrack.track.id === tAF.id
                )
              )
              .map((trackObject) => {
                return (
                  <TrackInfo
                    key={trackObject.track.id}
                    {...this.props}
                    {...trackObject.track}
                  />
                );
              })}
          </tbody>
        </table>
        <h3>Up, Down, Around</h3>
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
            {tracksAudioFeatures
              .filter((tAF) => {
                if (
                  (audioFeatures.key - tAF.key > 0 &&
                    audioFeatures.key - tAF.key === 5 &&
                    audioFeatures.mode === tAF.mode) ||
                  (audioFeatures.key - tAF.key > 0 &&
                    audioFeatures.key - tAF.key === 7 &&
                    audioFeatures.mode === tAF.mode)
                ) {
                  return tAF;
                } else if (
                  (audioFeatures.key - tAF.key < 0 &&
                    12 - Math.abs(audioFeatures.key - tAF.key) === 5 &&
                    audioFeatures.mode === tAF.mode) ||
                  (audioFeatures.key - tAF.key < 0 &&
                    12 - Math.abs(audioFeatures.key - tAF.key) === 7 &&
                    audioFeatures.mode === tAF.mode)
                ) {
                  return tAF;
                } else if (
                  (audioFeatures.mode === 1 &&
                    audioFeatures.key - tAF.key > 0 &&
                    audioFeatures.key - tAF.key === 3 &&
                    audioFeatures.mode !== tAF.mode) ||
                  (audioFeatures.mode === 1 &&
                    audioFeatures.key - tAF.key < 0 &&
                    12 - Math.abs(audioFeatures.key - tAF.key) === 3 &&
                    audioFeatures.mode !== tAF.mode)
                ) {
                  return tAF;
                } else if (
                  (audioFeatures.mode === 0 &&
                    audioFeatures.key - tAF.key > 0 &&
                    audioFeatures.key - tAF.key === 9 &&
                    audioFeatures.mode !== tAF.mode) ||
                  (audioFeatures.mode === 0 &&
                    audioFeatures.key - tAF.key < 0 &&
                    12 - Math.abs(audioFeatures.key - tAF.key) === 9 &&
                    audioFeatures.mode !== tAF.mode)
                ) {
                  return tAF;
                }
              })
              .map((tAF) =>
                playlistTracks.find(
                  (playlistTrack) => playlistTrack.track.id === tAF.id
                )
              )
              .map((trackObject) => {
                return (
                  <TrackInfo
                    key={trackObject.track.id}
                    {...this.props}
                    {...trackObject.track}
                  />
                );
              })}
          </tbody>
        </table>
        <h3>Energy Boost</h3>
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
            {tracksAudioFeatures
              .filter((tAF) => {
                if (
                  audioFeatures.key - tAF.key > 0 &&
                  audioFeatures.key - tAF.key === 10 &&
                  audioFeatures.mode === tAF.mode
                ) {
                  return tAF;
                } else if (
                  audioFeatures.key - tAF.key < 0 &&
                  12 - Math.abs(audioFeatures.key - tAF.key) === 10 &&
                  audioFeatures.mode === tAF.mode
                ) {
                  return tAF;
                }
              })
              .map((tAF) =>
                playlistTracks.find(
                  (playlistTrack) => playlistTrack.track.id === tAF.id
                )
              )
              .map((trackObject) => {
                return (
                  <TrackInfo
                    key={trackObject.track.id}
                    {...this.props}
                    {...trackObject.track}
                  />
                );
              })}
          </tbody>
        </table>
        <h3>Skrillex Style</h3>
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
            {tracksAudioFeatures
              .filter((tAF) => {
                if (
                  audioFeatures.key - tAF.key > 0 &&
                  audioFeatures.key - tAF.key === 11 &&
                  audioFeatures.mode === tAF.mode &&
                  audioFeatures.energy < tAF.energy
                ) {
                  return tAF;
                } else if (
                  audioFeatures.key - tAF.key < 0 &&
                  12 - Math.abs(audioFeatures.key - tAF.key) === 11 &&
                  audioFeatures.mode === tAF.mode &&
                  audioFeatures.energy < tAF.energy
                ) {
                  return tAF;
                }
              })
              .map((tAF) =>
                playlistTracks.find(
                  (playlistTrack) => playlistTrack.track.id === tAF.id
                )
              )
              .map((trackObject) => {
                return (
                  <TrackInfo
                    key={trackObject.track.id}
                    {...this.props}
                    {...trackObject.track}
                  />
                );
              })}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = ({
  playlistTracks,
  tracksAudioFeatures,
  selectedTrack,
}) => {
  return {
    playlistTracks,
    tracksAudioFeatures,
    selectedTrack,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSelectedTrack: (id) => dispatch(loadSelectedTrack(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleTrack);
