import React, { Component } from "react";
import "./App.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class TrackInfo extends Component {
  render() {
    const { id, name, artists, tracksAudioFeatures } = this.props;
    if (!tracksAudioFeatures.length) {
      return (
        <tr>
          <td>Loading...</td>
        </tr>
      );
    } else {
      const audioFeatures = tracksAudioFeatures.find((tAF) => tAF.id === id);
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
        <tr>
          <td>
            <Link to={`/${this.props.match.params.accessToken}/${id}`}>
              Select
            </Link>
          </td>
          <td>{name}</td>
          <td>
            {artists.map((artist, idx) =>
              idx === artists.length - 1 ? `${artist.name}` : `${artist.name}, `
            )}
          </td>
          <td>{parseInt(audioFeatures.tempo)}</td>
          <td>{camelotKey}</td>
          <td>{parseInt(audioFeatures.energy * 10)}</td>
          <td>{parseInt(audioFeatures.danceability * 10)}</td>
        </tr>
      );
    }
  }
}

const mapStateToProps = ({ tracksAudioFeatures }) => {
  return {
    tracksAudioFeatures,
  };
};

export default connect(mapStateToProps)(TrackInfo);
